import "./globals.css";
import { Sidebar } from './components';

export const metadata = {
  title: "Muse",
  description: "Music Streaming Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
