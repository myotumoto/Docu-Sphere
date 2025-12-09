import { Link } from "wouter";
import { motion } from "framer-motion";
import { Document } from "@/lib/mock-data";
import { ArrowRight, Database, Server, Globe, FileText } from "lucide-react";

interface QuickFindProps {
  documents: Document[];
}

export function QuickFind({ documents }: QuickFindProps) {
  const getIcon = (category: string) => {
    switch (category) {
      case "database": return <Database className="w-6 h-6 text-primary" />;
      case "api": return <Globe className="w-6 h-6 text-green-400" />;
      case "service": return <Server className="w-6 h-6 text-orange-400" />;
      default: return <FileText className="w-6 h-6 text-muted-foreground" />;
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-semibold">Quickfind Answers</h2>
          <Link href="/docs" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc, index) => (
            <Link key={doc.id} href={`/docs/${doc.id}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-card h-full p-6 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  {getIcon(doc.category)}
                </div>
                
                <div className="mb-4 p-3 bg-white/5 w-fit rounded-lg border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/10 transition-colors">
                  {getIcon(doc.category)}
                </div>
                
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {doc.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {doc.shortDescription}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
