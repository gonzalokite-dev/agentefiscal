import { NextResponse } from 'next/server';

const BASE_ID = 'appdYsXZSl6o2hnS5';
const TABLE_ID = 'tblF9cdOYmHSwAWnd';

export async function GET(req: Request) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AIRTABLE_API_KEY no configurada' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get('filter'); // 'negative' | 'pending' | 'all'

  let formula = '';
  if (filter === 'negative') formula = `{Valoración} = '👎 Negativo'`;
  else if (filter === 'pending') formula = `AND({Valoración} = '👎 Negativo', {Estado} = 'Pendiente')`;

  const params = new URLSearchParams({
    'sort[0][field]': 'Fecha',
    'sort[0][direction]': 'desc',
    pageSize: '50',
  });
  if (formula) params.set('filterByFormula', formula);

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?${params}`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    console.error('Airtable list error:', errBody);
    return NextResponse.json(
      { error: errBody?.error?.message ?? `Airtable ${res.status}` },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AIRTABLE_API_KEY no configurada' }, { status: 500 });
  }

  const { recordId, fields } = await req.json();

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}/${recordId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Error al actualizar registro' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
