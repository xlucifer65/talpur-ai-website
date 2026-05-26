import Nav from "@/components/Nav";
import BlogFooter from "@/components/BlogFooter";
import { getAllSettings } from "@/lib/db";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const settings = getAllSettings();
  return (
    <div className="flex flex-col min-h-screen">
      <Nav settings={settings} />
      <div className="flex-1 pt-16">{children}</div>
      <BlogFooter />
    </div>
  );
}
