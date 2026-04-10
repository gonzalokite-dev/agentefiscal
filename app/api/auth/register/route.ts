import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '@/lib/airtableUsers';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: 'Rellena todos los campos' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    const emailLower = email.toLowerCase().trim();

    const existing = await findUserByEmail(emailLower);
    if (existing) {
      return NextResponse.json({ error: 'Este email ya está registrado' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const ok = await createUser(name.trim(), emailLower, hashedPassword);

    if (!ok) {
      return NextResponse.json(
        { error: 'Error al crear el usuario. Inténtalo de nuevo.' },
        { status: 500 }
      );
    }

    await sendWelcomeEmail(emailLower, name.trim());

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Register error:', e);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
