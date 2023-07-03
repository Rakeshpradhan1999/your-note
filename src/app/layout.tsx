import { ThemeProvider } from "@/components/providers/theme-provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import AuthProvider from "@/components/providers/authprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>
            {/* <SiteHeader /> */}
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
