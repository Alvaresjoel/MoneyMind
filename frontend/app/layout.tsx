import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar"; // Import TopBar

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MoneyMind: Helps users make smarter investment decisions.",
  description: "MoneyMind: Helps users make smarter investment decisions.",
  keywords: "money, investment, finance, stocks, crypto, portfolio, analysis",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <head></head>
      <body className={`${inter.className} text-base-content h-screen flex`}>
        
        {/* Sidebar: Fixed on the left */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-64"> 
          {/* Top Bar: Positioned at the top */}
          <TopBar />

          {/* Scrollable Main Content */}
          <main className="flex-1 p-6 overflow-auto bg-web3">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
