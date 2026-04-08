interface LogoProps {
  /** 'light' = wordmark blanco (fondos oscuros), 'dark' = wordmark oscuro (fondos claros) */
  variant?: 'light' | 'dark';
  /** Tamaño del conjunto icono + texto */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Ocultar el wordmark y mostrar solo el icono */
  iconOnly?: boolean;
}

const sizes = {
  xs: { icon: 18, font: 13, gap: 6, top: -1 },
  sm: { icon: 22, font: 16, gap: 7, top: -1 },
  md: { icon: 26, font: 20, gap: 8, top: -2 },
  lg: { icon: 32, font: 24, gap: 10, top: -2 },
};

export default function Logo({
  variant = 'light',
  size = 'md',
  iconOnly = false,
}: LogoProps) {
  const s = sizes[size];
  const wordColor = variant === 'light' ? 'white' : '#002A3A';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: s.gap }}>
      {/* ── Icon mark ── */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Amber rounded square */}
        <rect width="28" height="28" rx="7" fill="#EAAA00" />

        {/* Three ascending bars — fiscal analytics motif */}
        <rect x="5"  y="16" width="4.5" height="7"  rx="1.5" fill="#002A3A" />
        <rect x="11.75" y="11" width="4.5" height="12" rx="1.5" fill="#002A3A" />
        <rect x="18.5" y="6"  width="4.5" height="17" rx="1.5" fill="#002A3A" />
      </svg>

      {/* ── Wordmark ── */}
      {!iconOnly && (
        <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1 }}>
          <span
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: s.font,
              color: wordColor,
              letterSpacing: '0.06em',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            ASESOR
          </span>
          <span
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: s.font * 0.7,
              color: '#EAAA00',
              letterSpacing: '0.08em',
              lineHeight: 1,
              position: 'relative',
              top: s.top,
              opacity: 0.9,
            }}
          >
            IA
          </span>
        </div>
      )}
    </div>
  );
}
