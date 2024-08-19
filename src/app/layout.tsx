import React from 'react';
import type { Metadata } from 'next';
import SessionWrapper from '@/components/sessionWrapper';
import ProtectedLayout from '@/components/protectedLayout';
import Toolbar from '@/components/toolbar';
import '../styles/global.scss';

export const metadata: Metadata = {
  title: 'isoall - Next.js test',
  description: 'This is a test project using Next.js for isoall'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <ProtectedLayout>
            <Toolbar />
            <main>{children}</main>
          </ProtectedLayout>
        </body>
      </html>
    </SessionWrapper>
  );
}
