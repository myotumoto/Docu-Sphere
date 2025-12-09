import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-medium mb-6 backdrop-blur-sm">
            v2.0 Documentation Portal
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            Support & <span className="text-gradient">Documentation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Centralized hub for all technical specifications, connection strings, and operational procedures for enterprise systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 blur transition duration-200" />
          <div className="relative flex items-center bg-[#1a1f3a] rounded-xl border border-white/10 shadow-2xl">
            <Search className="w-6 h-6 text-muted-foreground ml-4" />
            <input
              type="text"
              placeholder="Search for systems, databases, or error codes..."
              className="w-full h-14 bg-transparent border-none text-lg px-4 focus:ring-0 focus:outline-none placeholder:text-muted-foreground/50"
            />
            <div className="pr-2">
              <kbd className="hidden sm:inline-flex h-7 items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
