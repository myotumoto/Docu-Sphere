import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Layout } from "@/components/layout";
import { initialDocuments, Document } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  Copy, 
  Check, 
  Server, 
  Database, 
  Shield, 
  Activity, 
  Layers, 
  RotateCcw,
  Eye,
  EyeOff
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import generatedImage from '@assets/generated_images/technical_architecture_diagram_of_an_oracle_database_system_on_azure.png';

export default function DocumentDetails() {
  const [, params] = useRoute("/docs/:id");
  const [doc, setDoc] = useState<Document | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (params?.id) {
      const found = initialDocuments.find((d) => d.id === params.id);
      setDoc(found || null);
    }
  }, [params?.id]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied.`,
    });
    setTimeout(() => setCopied(""), 2000);
  };

  if (!doc) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Document not found</h1>
          <Link href="/" className="text-primary hover:underline">Return Home</Link>
        </div>
      </Layout>
    );
  }

  // Use the generated image for the specific document, otherwise fallback
  const displayImage = doc.id === "dbadmdes" ? generatedImage : doc.mainImage;

  return (
    <Layout>
      {/* Breadcrumb Header */}
      <div className="border-b border-white/10 bg-black/20">
        <div className="container mx-auto px-4 h-14 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/" className="hover:text-primary transition-colors">Documents</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground font-medium">{doc.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-lg">
                {doc.icon}
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold">{doc.title}</h1>
                <p className="text-muted-foreground">{doc.shortDescription}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {doc.connectionInfo?.environment && <StatusBadge status={doc.connectionInfo.environment} type="environment" />}
              {doc.connectionInfo?.criticality && <StatusBadge status={doc.connectionInfo.criticality} type="criticality" />}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Diagram Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl overflow-hidden p-1"
            >
              <div className="bg-black/40 rounded-lg overflow-hidden aspect-video relative group">
                {displayImage ? (
                  <img src={displayImage} alt="System Architecture" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No diagram available
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-medium">System Architecture Diagram</p>
                </div>
              </div>
            </motion.section>

            {/* Connection Info */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }} 
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Server className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Connection Details</h2>
              </div>

              <div className="grid gap-4">
                {doc.connectionInfo?.host && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="text-muted-foreground text-sm font-medium">Hostname</span>
                    <div className="md:col-span-2 flex items-center justify-between gap-2">
                      <code className="bg-black/30 px-2 py-1 rounded text-sm font-mono text-blue-300">{doc.connectionInfo.host}</code>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white" onClick={() => copyToClipboard(doc.connectionInfo!.host, "Hostname")}>
                        {copied === "Hostname" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                )}

                {doc.connectionInfo?.easyConnect && (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                   <span className="text-muted-foreground text-sm font-medium">Easy Connect</span>
                   <div className="md:col-span-2 flex items-center justify-between gap-2">
                     <code className="bg-black/30 px-2 py-1 rounded text-sm font-mono text-purple-300 break-all">{doc.connectionInfo.easyConnect}</code>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white" onClick={() => copyToClipboard(doc.connectionInfo!.easyConnect!, "Easy Connect")}>
                       {copied === "Easy Connect" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                     </Button>
                   </div>
                 </div>
                )}
              </div>
            </motion.section>

            {/* Connectivity Tests */}
             <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }} 
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Activity className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold">Connectivity Tests</h2>
              </div>

              <Tabs defaultValue="ping" className="w-full">
                <TabsList className="bg-black/30 w-full justify-start mb-4">
                  <TabsTrigger value="ping">Ping</TabsTrigger>
                  <TabsTrigger value="telnet">Telnet</TabsTrigger>
                  {doc.connectivityTests?.dns && <TabsTrigger value="dns">DNS</TabsTrigger>}
                  {doc.connectivityTests?.oci && <TabsTrigger value="oci">OCI CLI</TabsTrigger>}
                </TabsList>
                
                {Object.entries(doc.connectivityTests || {}).map(([key, value]) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="bg-black/50 rounded-lg p-4 border border-white/5 relative group">
                      <pre className="font-mono text-sm text-green-300 overflow-x-auto whitespace-pre-wrap">{value}</pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20"
                        onClick={() => copyToClipboard(value, `${key} command`)}
                      >
                        {copied === `${key} command` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Configuration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-orange-400" />
                <h3 className="font-semibold text-lg">Configuration</h3>
              </div>
              <div className="space-y-4">
                {doc.configuration?.tenancy && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Tenancy</span>
                    <p className="font-medium">{doc.configuration.tenancy}</p>
                  </div>
                )}
                 {doc.configuration?.infrastructure && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Infrastructure</span>
                    <p className="font-medium">{doc.configuration.infrastructure}</p>
                  </div>
                )}
                 {doc.configuration?.location && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Location</span>
                    <p className="font-medium">{doc.configuration.location}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Dependencies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-lg">Dependent Systems</h3>
              </div>
              <div className="space-y-3">
                {doc.dependentSystems?.map((sys, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <div>
                      <p className="text-sm font-medium">{sys.name}</p>
                      <p className="text-xs text-muted-foreground">{sys.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Backup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-6 border-l-4 border-l-blue-500"
            >
              <div className="flex items-center gap-2 mb-4">
                <RotateCcw className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-lg">Backup & Recovery</h3>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                   <span className="text-xs text-muted-foreground uppercase tracking-wider">Method</span>
                   <p>{doc.backupInfo?.method}</p>
                </div>
                 <div>
                   <span className="text-xs text-muted-foreground uppercase tracking-wider">Schedule</span>
                   <p>{doc.backupInfo?.schedule}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
