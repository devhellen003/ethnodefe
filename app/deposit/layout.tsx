import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ETH2.0 Funding Pool",
  description: "Users can now earn reward dividends directly from the Ethereum reward pool, eliminating the need to transfer their held tokens to any third-party platform or institution. By securely managing their tokens in a decentralized wallet, investors can enjoy a safe and low-risk method of earning dividends from their savings tokens.",
  openGraph: {
    title: 'ETH2.0 Funding Pool',
    description: 'Users can now earn reward dividends directly from the Ethereum reward pool, eliminating the need to transfer their held tokens to any third-party platform or institution. By securely managing their tokens in a decentralized wallet, investors can enjoy a safe and low-risk method of earning dividends from their savings tokens.',
    images: ['/images/d0ae8ce5d18432880686d1ac114826ca.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </html>
  );
}
