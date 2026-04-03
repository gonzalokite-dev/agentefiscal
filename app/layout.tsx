import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agente Fiscal IA — Benavides Asociados',
  description: 'Herramienta interna de asesoría fiscal con inteligencia artificial',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23EAAA00'/><text x='16' y='22' font-size='14' font-weight='700' font-family='Georgia,serif' fill='%23002A3A' text-anchor='middle'>BA</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans">{children}</body>
    </html>
  );
}
