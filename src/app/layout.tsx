import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import '../styles/design-system.css';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { ToastProvider } from '@/components/ui/Toast/Toast';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BuyWise | India\'s Trusted Real Estate Platform',
  description: 'Make confident property purchase decisions with intelligent verifications and expert services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ToastProvider>
          <Header />
          <div style={{ flex: 1 }}>
            {children}
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
