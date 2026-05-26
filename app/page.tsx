import { getAllPosts, getAllTestimonials, getAllServices, getAllSettings } from "@/lib/db";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Solutions from "@/components/Solutions";
import ProductEdge from "@/components/ProductEdge";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import AuditCTA from "@/components/AuditCTA";
import Blog from "@/components/Blog";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  const services = getAllServices();
  const testimonials = getAllTestimonials();
  const posts = getAllPosts();
  const settings = getAllSettings();

  return (
    <main>
      <Nav settings={settings} />
      <Hero settings={settings} />
      <Services services={services} settings={settings} />
      <HowItWorks />
      <Solutions />
      <ProductEdge settings={settings} />
      <CaseStudies />
      <Testimonials testimonials={testimonials} settings={settings} />
      <AuditCTA />
      <Blog posts={posts} settings={settings} />
      <ContactForm settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
