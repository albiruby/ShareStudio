import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShareStudio - Ultimate Athletic Story & Sticker Studio',
  description: 'Convert your running metrics into beautiful, customizable social media stickers & story cards.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-dark-900 text-zinc-100 flex flex-col">
        {children}
      </body>
    </html>
  );
}
