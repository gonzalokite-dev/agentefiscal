import { Suspense } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';

export const metadata = {
  title: 'Chat — Victoria',
};

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatInterface />
    </Suspense>
  );
}
