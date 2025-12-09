import { Layout } from "@/components/layout";
import { initialDocuments } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Search, FileText } from "lucide-react";
import { Link } from "wouter";
import { StatusBadge } from "@/components/ui/status-badge";

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage documentation and system records</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
            <Plus className="w-4 h-4" /> Add Document
          </Button>
        </div>

        {/* Filters bar */}
        <div className="glass-card p-4 rounded-xl mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full h-9 rounded-md bg-black/20 border border-white/10 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <select className="h-9 rounded-md bg-black/20 border border-white/10 px-3 text-sm focus:outline-none">
              <option>All Categories</option>
              <option>Database</option>
              <option>API</option>
              <option>Service</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-muted-foreground uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-4">Document</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Environment</th>
                  <th className="px-6 py-4">Criticality</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {initialDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-lg">
                          {doc.icon}
                        </div>
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-xs text-muted-foreground">{doc.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize bg-white/5 px-2 py-1 rounded text-xs border border-white/10">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {doc.connectionInfo?.environment && (
                        <StatusBadge status={doc.connectionInfo.environment} type="environment" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {doc.connectionInfo?.criticality && (
                        <StatusBadge status={doc.connectionInfo.criticality} type="criticality" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-500/20 hover:text-blue-400">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/20 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
