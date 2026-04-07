import { Suspense } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';

export const metadata = {
  title: 'Chat — Agente Fiscal IA · Benavides Asociados',
};

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatInterface />
    </Suspense>
  );
}
