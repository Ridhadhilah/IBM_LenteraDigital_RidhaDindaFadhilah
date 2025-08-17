import type { Metadata } from 'next';
import './globals.css';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/main-nav';
import { SiteHeader } from '@/components/site-header';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Lentera Digital',
  description: 'Ruang Amanmu di Dunia Maya',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen')}>
        <SidebarProvider>
          <Sidebar>
            <MainNav />
          </Sidebar>
          <SidebarInset>
            <SiteHeader />
            <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
