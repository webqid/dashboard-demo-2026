import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'webqid. | frontend, done carefully',
    template: '%s | webqid.',
  },
  description:
    'A calm, precision-focused dashboard built with modern frontend architecture. Next.js, React, TypeScript.',
  keywords: ['dashboard', 'analytics', 'nextjs', 'react', 'typescript', 'webqid'],
  authors: [{ name: 'webqid.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'webqid. | frontend, done carefully',
    description:
      'A calm, precision-focused dashboard built with modern frontend architecture.',
    siteName: 'webqid.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'webqid. | frontend, done carefully',
    description:
      'A calm, precision-focused dashboard built with modern frontend architecture.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('webqid-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-text-primary">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
