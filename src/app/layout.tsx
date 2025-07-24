import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta charSet="utf-8"/>
        <title>Cruio Docs</title>
      </Head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="top-center"/>
        </ThemeProvider>
      </body>
    </html>
  );
}
