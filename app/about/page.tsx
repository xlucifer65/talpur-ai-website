import PageWrapper from "@/components/PageWrapper";
import About from "@/components/About";
import { getAllSettings } from "@/lib/db";

export const metadata = { title: "About | Talpur.ai" };

export default function AboutPage() {
  const settings = getAllSettings();
  return (
    <PageWrapper>
      <About settings={settings} />
    </PageWrapper>
  );
}
