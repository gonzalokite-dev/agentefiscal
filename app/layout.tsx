import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Victoria — Copiloto fiscal para asesorías y gestorías',
  description: 'Victoria es tu asistente fiscal con IA. Resuelve consultas, interpreta normativa y ayuda a tus clientes con el BOE, la DGT y la AEAT en tiempo real.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%2300B5AD'/><text x='16' y='22' font-size='12' font-weight='700' font-family='sans-serif' font-style='italic' fill='%23FFFFFF' text-anchor='middle'>vi</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
