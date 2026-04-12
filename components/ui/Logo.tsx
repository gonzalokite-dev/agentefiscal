interface LogoProps {
  /** 'light' = wordmark claro (fondos oscuros), 'dark' = wordmark oscuro (fondos claros) */
  variant?: 'light' | 'dark';
  /** Tamaño del wordmark */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const sizes = {
  xs: 15,
  sm: 18,
  md: 22,
  lg: 28,
};

export default function Logo({
  variant = 'dark',
  size = 'md',
}: LogoProps) {
  const fontSize = sizes[size];
  const victorColor = variant === 'light' ? '#FFFFFF' : '#0D2E35';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', lineHeight: 1 }}>
      <span
        style={{
          fontFamily: 'Sora, sans-serif',
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          color: victorColor,
          letterSpacing: '-0.02em',
          fontStyle: 'italic',
          lineHeight: 1,
        }}
      >
        victor
      </span>
      <span
        style={{
          fontFamily: 'Sora, sans-serif',
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          color: '#00B5AD',
          letterSpacing: '-0.02em',
          fontStyle: 'italic',
          lineHeight: 1,
        }}
      >
        ia
      </span>
    </div>
  );
}
