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

        // Add file content
        if (fileData.type === 'application/pdf') {
          content.push({
            type: 'document',
            source: {
              type: 'base64',
              media_type: 'application/pdf',
              data: fileData.base64,
            },
          });
        } else {
          const mediaType = fileData.type as 'image/jpeg' | 'image/png' | 'image/webp';
          content.push({
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: fileData.base64,
            },
          });
        }

        // Add text
        content.push({
          type: 'text',
          text: `El asesor ha adjuntado el siguiente documento para que lo analices: ${fileData.name}\n\n${typeof msg.content === 'string' ? msg.content : ''}`,
        });

        return { role: msg.role, content };
      }
      return msg;
    });

    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: processedMessages as Anthropic.MessageParam[],
    });

    return Response.json({
      content: response.content[0].type === 'text' ? response.content[0].text : '',
    });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Error al procesar la consulta' }, { status: 500 });
  }
}
