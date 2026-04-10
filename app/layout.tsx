import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'AsesorIA — Asesoría Fiscal con Inteligencia Artificial',
  description: 'Asistente fiscal con IA especializado en normativa española y de Illes Balears. Consulta el BOE, la DGT y la AEAT en tiempo real.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23EAAA00'/><text x='16' y='22' font-size='13' font-weight='700' font-family='sans-serif' fill='%23002A3A' text-anchor='middle'>AI</text></svg>",
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
