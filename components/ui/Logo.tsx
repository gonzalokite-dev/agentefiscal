import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const heights = { xs: 18, sm: 22, md: 28, lg: 36 };

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const h = heights[size];
  // Approximate 3.4:1 aspect ratio from the image
  const w = Math.round(h * 3.4);

  return (
    <Image
      src="/logo-victoria.png"
      alt="victoria"
      width={w}
      height={h}
      style={{
        height: `${h}px`,
        width: 'auto',
        display: 'inline-block',
        filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none',
        userSelect: 'none',
      }}
      priority
    />
  );
}
