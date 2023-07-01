import { SiteHeader } from "@/components/site-header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      {children}
    </div>
  );
}
