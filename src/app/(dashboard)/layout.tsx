import { SiteHeader } from "@/components/site-header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container mt-6">{children}</div>
    </div>
  );
}
