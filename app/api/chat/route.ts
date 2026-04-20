import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '@/lib/systemPrompt';
import { FISCAL_TOOLS, TOOLS_ADDENDUM, executeSearch, getSourceLabel } from '@/lib/searchTool';

export const maxDuration = 300;

interface MessageContent {
  type: string;
  text?: string;
  source?: {
    type: string;
    media_type: string;
    data: string;
  };
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string | MessageContent[];
}

interface FileData {
  name: string;
  type: string;
  base64: string;
}

export async function POST(req: Request) {
  try {
    const { messages, fileData }: { messages: ChatMessage[]; fileData?: FileData } = await req.json();

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Process messages — if last message has a file, build multimodal content
    const processedMessages = messages.map((msg, index) => {
      if (index === messages.length - 1 && msg.role === 'user' && fileData) {
        const content: MessageContent[] = [];

        if (fileData.type === 'application/pdf') {
          content.push({
            type: 'document',
            source: { type: 'base64', media_type: 'application/pdf', data: fileData.base64 },
          });
        } else {
          const mediaType = fileData.type as 'image/jpeg' | 'image/png' | 'image/webp';
          content.push({
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: fileData.base64 },
          });
        }

        content.push({
          type: 'text',
          text: `El asesor ha adjuntado el siguiente documento para que lo analices: ${fileData.name}\n\n${typeof msg.content === 'string' ? msg.content : ''}`,
        });

        return { role: msg.role, content };
      }
      return msg;
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const emit = (payload: object | string) => {
          const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        };

        // Agentic loop: Claude may call tools multiple times before giving a final answer
        const conversationMessages: Anthropic.MessageParam[] = (
          processedMessages as Anthropic.MessageParam[]
        ).filter((m) => {
          if (typeof m.content === 'string') return m.content.trim() !== '';
          if (Array.isArray(m.content)) return m.content.length > 0;
          return true;
        });

        try {
          let continueLoop = true;

          while (continueLoop) {
            const stream = client.messages.stream({
              model: 'claude-opus-4-6',
              max_tokens: 4096,
              system: SYSTEM_PROMPT + TOOLS_ADDENDUM,
              tools: FISCAL_TOOLS,
              messages: conversationMessages,
            });

            // Stream text tokens to the client as they arrive
            for await (const chunk of stream) {
              if (
                chunk.type === 'content_block_delta' &&
                chunk.delta.type === 'text_delta'
              ) {
                emit({ text: chunk.delta.text });
              }
            }

            const finalMsg = await stream.finalMessage();

            if (finalMsg.stop_reason === 'tool_use') {
              // Save the assistant turn (with tool_use blocks) to the conversation
              conversationMessages.push({ role: 'assistant', content: finalMsg.content });

              const toolResults: Anthropic.ToolResultBlockParam[] = [];

              for (const block of finalMsg.content) {
                if (block.type !== 'tool_use') continue;

                const input = block.input as { query: string; fuente?: string };
                const sourceLabel = getSourceLabel(input.fuente);

                // Notify the client that a search is in progress
                emit({ searching: { query: input.query, source: sourceLabel } });

                // Send periodic heartbeats while waiting so the SSE connection stays alive
                const heartbeatInterval = setInterval(() => {
                  try { emit({ heartbeat: true }); } catch {}
                }, 5000);

                const result = await executeSearch(input.query, input.fuente);
                clearInterval(heartbeatInterval);

                // Notify the client that the search is done
                emit({ searched: { query: input.query, source: sourceLabel, count: result.count, urls: result.urls } });

                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: block.id,
                  content: result.text,
                });
              }

              // Add tool results and loop again so Claude can continue
              conversationMessages.push({ role: 'user', content: toolResults });
            } else {
              // stop_reason === 'end_turn' — Claude is done
              continueLoop = false;
            }
          }

          emit('[DONE]');
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Error desconocido';
          emit({ error: msg });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Error al procesar la consulta' }, { status: 500 });
  }
}
