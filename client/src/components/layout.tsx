import { Link, useLocation } from "wouter";
import { Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-primary/25 transition-all">
              TD
            </div>
            <span className="font-display font-semibold text-xl tracking-tight">TechDocs</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className={cn("hover:text-primary transition-colors", location === "/" && "text-primary")}>
              Documentation
            </Link>
            <Link href="/admin" className={cn("hover:text-primary transition-colors", location.startsWith("/admin") && "text-primary")}>
              Administration
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search docs..."
                className="h-9 w-64 rounded-md bg-white/5 border border-white/10 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <Link href="/admin/login" className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </nav>
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <footer className="border-t border-white/10 bg-black/20 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 TechDocs Enterprise System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
