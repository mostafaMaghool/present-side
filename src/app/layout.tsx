import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PresentSlide Core',
  description: 'A lightweight presentation and slide builder',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}