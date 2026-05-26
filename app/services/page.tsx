import PageWrapper from "@/components/PageWrapper";
import Services from "@/components/Services";
import { getAllServices, getAllSettings } from "@/lib/db";

export const metadata = { title: "Services | Talpur.ai" };

export default function ServicesPage() {
  const services = getAllServices();
  const settings = getAllSettings();
  return (
    <PageWrapper>
      <Services services={services} settings={settings} />
    </PageWrapper>
  );
}
