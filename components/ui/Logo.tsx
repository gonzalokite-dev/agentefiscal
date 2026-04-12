interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const sizes = { xs: 17, sm: 20, md: 26, lg: 34 };

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const fontSize = sizes[size];
  const victorColor = variant === 'light' ? '#FFFFFF' : '#0D2E35';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        lineHeight: 1,
        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
        fontStyle: 'italic',
        fontWeight: 700,
        fontSize: `${fontSize}px`,
        letterSpacing: '-0.01em',
        userSelect: 'none',
      }}
    >
      <span style={{ color: victorColor }}>victor</span>
      <span style={{ color: '#00B5AD' }}>ia</span>
    </span>
  );
}
