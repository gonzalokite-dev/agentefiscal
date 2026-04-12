import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

// Heights in px — image ratio ≈ 2.1:1
const heights = { xs: 24, sm: 32, md: 42, lg: 56 };

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const h = heights[size];
  const w = Math.round(h * 2.1);

  return (
    <Image
      src="/logo-victoria-transparent.png"
      alt="victoria"
      width={w}
      height={h}
      quality={100}
      style={{
        height: `${h}px`,
        width: 'auto',
        display: 'inline-block',
        // On dark backgrounds render as all-white logo
        filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none',
        userSelect: 'none',
      }}
      priority
    />
  );
}
