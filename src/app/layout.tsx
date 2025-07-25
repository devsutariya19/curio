import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cruio Docs",
  description: "Curio Docs - your go-to platform for building modern documentation"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="top-center"/>
        </ThemeProvider>
      </body>
    </html>
  );
}
