import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '@/lib/systemPrompt';

export const maxDuration = 60;

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

    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: processedMessages as Anthropic.MessageParam[],
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              const data = `data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Error desconocido';
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
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
