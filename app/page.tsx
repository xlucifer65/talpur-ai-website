import { getAllSettings } from "@/lib/db";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import BlogFooter from "@/components/BlogFooter";

export default function Home() {
  const settings = getAllSettings();

  return (
    <main>
      <Nav settings={settings} />
      <Hero settings={settings} />
      <ContactForm settings={settings} />
      <BlogFooter />
    </main>
  );
}
