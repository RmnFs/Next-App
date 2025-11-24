import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SessionWrapper from '@/components/SessionWrapper';

export const metadata: Metadata = {
  title: 'FoodHub',
  description: 'FoodHub - A Next.js App with Authentication and Protected Pages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white">
      <body className="font-sans bg-white text-gray-800 overflow-x-hidden">
        <SessionWrapper>
          <Navbar />
          <main className="bg-white">{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}