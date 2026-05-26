import PageWrapper from "@/components/PageWrapper";
import ContactForm from "@/components/ContactForm";
import { getAllSettings } from "@/lib/db";

export const metadata = { title: "Contact | Talpur.ai" };

export default function ContactPage() {
  const settings = getAllSettings();
  return (
    <PageWrapper>
      <ContactForm settings={settings} />
    </PageWrapper>
  );
}
