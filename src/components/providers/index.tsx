import AuthProvider from "./authprovider";
import QueryProvider from "./queryProvider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <QueryProvider>{children}</QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
