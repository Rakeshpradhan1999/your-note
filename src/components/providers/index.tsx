import AuthProvider from "./authprovider";
import QueryProvider from "./queryProvider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
