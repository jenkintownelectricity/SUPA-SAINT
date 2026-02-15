import type { Metadata } from 'next';
import '@/theme/globals.css';

export const metadata: Metadata = {
  title: 'PROJECT SAINT — Building Envelope Intelligence',
  description: 'GCP/Saint-Gobain Building Envelope Super App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
