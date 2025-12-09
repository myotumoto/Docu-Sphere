import { Layout } from "@/components/layout";
import { Hero } from "@/components/hero";
import { QuickFind } from "@/components/quickfind";
import { FAQSection } from "@/components/faq";
import { initialDocuments, faqs } from "@/lib/mock-data";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <QuickFind documents={initialDocuments} />
      <FAQSection items={faqs} />
    </Layout>
  );
}
