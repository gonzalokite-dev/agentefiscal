const BASE_ID = 'appdYsXZSl6o2hnS5';
let cachedTableId: string | null = null;

export interface AirtableUser {
  id: string;
  email: string;
  name: string;
  password: string;
  status: string;
}

function apiKey(): string {
  const key = process.env.AIRTABLE_API_KEY;
  if (!key) throw new Error('AIRTABLE_API_KEY no configurada');
  return key;
}

async function getUsersTableId(): Promise<string> {
  if (cachedTableId) return cachedTableId;

  const envId = process.env.AIRTABLE_USERS_TABLE_ID;
  if (envId) {
    cachedTableId = envId;
    return envId;
  }

  const key = apiKey();

  // Try to find existing table by name
  const metaRes = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
    headers: { Authorization: `Bearer ${key}` },
  });

  if (metaRes.ok) {
    const meta = await metaRes.json();
    const table = meta.tables?.find((t: { name: string; id: string }) => t.name === 'Usuarios');
    if (table) {
      cachedTableId = table.id;
      return table.id;
    }
  }

  // Auto-create table
  const createRes = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Usuarios',
      fields: [
        { name: 'Name', type: 'singleLineText' },
        { name: 'Email', type: 'singleLineText' },
        { name: 'Password', type: 'singleLineText' },
        {
          name: 'Status',
          type: 'singleSelect',
          options: { choices: [{ name: 'active' }, { name: 'pending' }] },
        },
        { name: 'CreatedAt', type: 'singleLineText' },
      ],
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(`No se pudo crear la tabla Usuarios en Airtable: ${JSON.stringify(err)}`);
  }

  const newTable = await createRes.json();
  cachedTableId = newTable.id;
  return newTable.id;
}

export async function findUserByEmail(email: string): Promise<AirtableUser | null> {
  const key = apiKey();
  const tableId = await getUsersTableId();

  const params = new URLSearchParams({
    filterByFormula: `{Email} = '${email.replace(/'/g, "\\'")}'`,
    maxRecords: '1',
  });

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}?${params}`, {
    headers: { Authorization: `Bearer ${key}` },
  });

  if (!res.ok) return null;

  const data = await res.json();
  const record = data.records?.[0];
  if (!record) return null;

  return {
    id: record.id,
    email: record.fields.Email ?? '',
    name: record.fields.Name ?? '',
    password: record.fields.Password ?? '',
    status: record.fields.Status ?? 'active',
  };
}

export async function createUser(
  name: string,
  email: string,
  hashedPassword: string
): Promise<boolean> {
  const key = apiKey();
  const tableId = await getUsersTableId();

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        Name: name,
        Email: email.toLowerCase().trim(),
        Password: hashedPassword,
        Status: 'active',
        CreatedAt: new Date().toISOString(),
      },
    }),
  });

  return res.ok;
}
