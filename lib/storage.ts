export interface StoredMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // ISO string for serialization
  attachedFile?: { name: string; type: string; base64: string };
}

export interface Conversation {
  id: string;
  title: string;
  messages: StoredMessage[];
  createdAt: string;
  updatedAt: string;
}

const KEY = 'fiscal_ba_chats';
const MAX_CONVERSATIONS = 100;

export function getConversations(): Conversation[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function saveConversation(conv: Conversation): void {
  if (typeof window === 'undefined') return;

  // Strip base64 from attached files before persisting — they can be several MB each
  // and exceed the 5 MB localStorage quota. The file was already sent to the API.
  const stripped: Conversation = {
    ...conv,
    messages: conv.messages.map((m) =>
      m.attachedFile
        ? { ...m, attachedFile: { name: m.attachedFile.name, type: m.attachedFile.type, base64: '' } }
        : m
    ),
  };

  const all = getConversations().filter((c) => c.id !== conv.id);
  all.unshift(stripped);
  const trimmed = all.slice(0, MAX_CONVERSATIONS);

  try {
    localStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      // Quota full — remove oldest half and retry once
      try {
        localStorage.setItem(KEY, JSON.stringify(trimmed.slice(0, Math.floor(trimmed.length / 2))));
      } catch {
        // If still failing, clear entirely and store just the current conversation
        try {
          localStorage.setItem(KEY, JSON.stringify([stripped]));
        } catch {
          // localStorage completely unavailable — fail silently
        }
      }
    }
  }
}

export function deleteConversation(id: string): void {
  if (typeof window === 'undefined') return;
  const all = getConversations().filter((c) => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function newId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function groupByDate(convs: Conversation[]): [string, Conversation[]][] {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const groups: Record<string, Conversation[]> = {
    Hoy: [],
    Ayer: [],
    'Últimos 7 días': [],
    Anteriores: [],
  };

  for (const c of convs) {
    const d = new Date(c.updatedAt);
    if (d >= startOfToday) groups['Hoy'].push(c);
    else if (d >= startOfYesterday) groups['Ayer'].push(c);
    else if (d >= startOfWeek) groups['Últimos 7 días'].push(c);
    else groups['Anteriores'].push(c);
  }

  return Object.entries(groups).filter(([, v]) => v.length > 0);
}
