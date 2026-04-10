'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Email o contraseña incorrectos');
      setLoading(false);
    } else {
      router.push('/chat');
      router.refresh();
    }
  };

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
            <span
              style={{
                fontSize: '26px',
                fontWeight: 700,
                color: '#002A3A',
                letterSpacing: '-0.04em',
                fontFamily: 'Lora, Georgia, serif',
              }}
            >
              Asesor
            </span>
            <span
              style={{
                fontSize: '26px',
                fontWeight: 700,
                color: '#EAAA00',
                letterSpacing: '-0.04em',
                fontFamily: 'Lora, Georgia, serif',
                position: 'relative',
                top: '-2px',
              }}
            >
              IA
            </span>
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
            Iniciar sesión
          </h1>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 24px', fontFamily: 'sans-serif' }}>
            Accede a tu cuenta de AsesorIA
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
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
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
                onFocus={(e) => { e.target.style.borderColor = '#002A3A'; }}
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
                autoComplete="current-password"
                placeholder="••••••••"
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
                onFocus={(e) => { e.target.style.borderColor = '#002A3A'; }}
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
                backgroundColor: loading ? '#9CA3AF' : '#002A3A',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'sans-serif',
                marginTop: '4px',
                transition: 'background-color 0.15s',
              }}
            >
              {loading ? 'Accediendo...' : 'Iniciar sesión'}
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
          ¿No tienes cuenta?{' '}
          <Link href="/register" style={{ color: '#002A3A', fontWeight: 600, textDecoration: 'none' }}>
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
