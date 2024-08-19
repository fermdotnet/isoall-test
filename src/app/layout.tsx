import type { Metadata } from "next";
import SessionWrapper from '@/components/sessionWrapper';
import ProtectedLayout from '@/components/protectedLayout';
import Toolbar from '@/components/toolbar';
import '../styles/global.scss';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <ProtectedLayout>
            <Toolbar />
            <main>
              {children}
            </main>
          </ProtectedLayout>
        </body>
      </html>
    </SessionWrapper>
  );
}
