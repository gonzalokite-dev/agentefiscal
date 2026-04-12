'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Error al crear la cuenta');
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2500);
    }
  };

  if (success) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F9FAFB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'rgba(34,197,94,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px',
            }}
          >
            ✓
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 8px', fontFamily: 'sans-serif' }}>
            Cuenta creada
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
            Hemos enviado un email de bienvenida a <strong style={{ color: '#374151' }}>{email}</strong>.
            <br />Redirigiendo al login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <img src="/logo-victoria.png" alt="victoria" style={{ height: '28px', width: 'auto' }} />
          </a>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '36px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#111827',
              margin: '0 0 6px',
              fontFamily: 'sans-serif',
            }}
          >
            Crear cuenta
          </h1>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 24px', fontFamily: 'sans-serif' }}>
            Accede a Victoria con inteligencia artificial fiscal
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '5px',
                  fontFamily: 'sans-serif',
                }}
              >
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                autoComplete="name"
                placeholder="Tu nombre"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E5E7EB',
                  fontSize: '14px',
                  fontFamily: 'sans-serif',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                  color: '#111827',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#0D2E35'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '5px',
                  fontFamily: 'sans-serif',
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E5E7EB',
                  fontSize: '14px',
                  fontFamily: 'sans-serif',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                  color: '#111827',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#0D2E35'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '5px',
                  fontFamily: 'sans-serif',
                }}
              >
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E5E7EB',
                  fontSize: '14px',
                  fontFamily: 'sans-serif',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                  color: '#111827',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#0D2E35'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; }}
              />
            </div>

            {error && (
              <p
                style={{
                  fontSize: '13px',
                  color: '#dc2626',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid rgba(220,38,38,0.2)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  margin: 0,
                  fontFamily: 'sans-serif',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: loading ? '#9CA3AF' : '#0D2E35',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'sans-serif',
                marginTop: '4px',
                transition: 'background-color 0.15s',
              }}
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '13px',
            color: '#6B7280',
            fontFamily: 'sans-serif',
          }}
        >
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" style={{ color: '#0D2E35', fontWeight: 600, textDecoration: 'none' }}>
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
