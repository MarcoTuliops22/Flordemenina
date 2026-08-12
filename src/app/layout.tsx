import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flor de Menina | Semijoias Finas & Elegância',
  description: 'Loja de semijoias exclusivas banhadas a Ouro 18k e Prata 925 com 1 Ano de Garantia e tecnologia antialérgica. Entrega rápida em Palmas/TO e todo o Brasil.',
  keywords: ['semijoias', 'ouro 18k', 'prata 925', 'brincos', 'colares', 'anéis', 'palmas tocantins', 'flor de menina'],
  authors: [{ name: 'Flor de Menina Semijoias' }],
  openGraph: {
    title: 'Flor de Menina | Semijoias Finas & Elegância',
    description: 'Semijoias banhadas com 1 ano de garantia. Compre online com 5% de desconto no Pix e parcelamento em até 6x sem juros.',
    url: 'https://flordemenina.com.br',
    siteName: 'Flor de Menina',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased bg-[#fdfbf7] text-[#1c1917] flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
