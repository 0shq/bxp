import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Hanken_Grotesk } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "./providers";
import NavBar from "@/components/UI/NavBar";
import { MainLayout } from "@/components/UI/MainLayout";
import { SolanaWalletProvider } from "@/providers/WalletProvider";

const font = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BXP - Build Experience",
  description: "Web3-native, AI-powered proof of experience platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark text-foreground bg-background"
      suppressHydrationWarning
    >
      <body className={`${font.className}`}>
        <SolanaWalletProvider>
          <Providers>
            <NavBar />
            <MainLayout>{children}</MainLayout>
          </Providers>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
