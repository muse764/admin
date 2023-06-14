import { Layout } from './components/lay';
import './globals.css';

export const metadata = {
  title: 'Muse',
  description: 'Music Streaming Service',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
