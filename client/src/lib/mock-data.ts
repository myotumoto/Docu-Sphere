
export interface ConnectionInfo {
  host: string;
  port: string;
  easyConnect?: string;
  username?: string;
  password?: string;
  environment: string;
  criticality: string;
}

export interface ConnectivityTests {
  dns?: string;
  ping?: string;
  telnet?: string;
  oci?: string;
}

export interface Configuration {
  tenancy?: string;
  infrastructure?: string;
  location?: string;
  tablespaces?: string[];
}

export interface DependentSystem {
  name: string;
  description: string;
}

export interface BackupInfo {
  method: string;
  schedule: string;
  recovery: string;
}

export interface Document {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  category: "database" | "api" | "service" | "faq";
  mainImage?: string;
  connectionInfo?: ConnectionInfo;
  connectivityTests?: ConnectivityTests;
  configuration?: Configuration;
  dependentSystems?: DependentSystem[];
  backupInfo?: BackupInfo;
}

export const initialDocuments: Document[] = [
  {
    id: "dbadmdes",
    title: "DBADMDES - Database Principal",
    icon: "🗄️",
    shortDescription: "Oracle Database hosted on Azure for administrative management",
    category: "database",
    mainImage: "/attached_assets/generated_images/tech_diagram.png", // Will need to update this path after generation
    connectionInfo: {
      host: "devoralcevaes-ejsly-scan.br-atacadao.corp",
      port: "1922",
      easyConnect: "devoralcevaes-ejsly-scan.br-atacadao.corp:1922/uboumdes_PDD_DBADMDES.paas.oracle.com",
      environment: "Development",
      criticality: "Level 1 (Low)"
    },
    connectivityTests: {
      dns: "nslookup devoralcevaes-ejsly-scan.br-atacadao.corp",
      ping: "ping -c 4 devoralcevaes-ejsly-scan.br-atacadao.corp",
      telnet: "telnet devoralcevaes-ejsly-scan.br-atacadao.corp 1922",
      oci: "oci db database get --database-id <ocid1.database.oc1.br-vinhedo-1...>"
    },
    configuration: {
      tenancy: "carrefourgroup",
      infrastructure: "Oracle@Azure",
      location: "Brazil Southeast (Vinhedo)",
      tablespaces: ["BANC_DATA", "CAIXA_DATA", "CONTABIL_DATA"]
    },
    dependentSystems: [
      { name: "intranethmg", description: "Internal management system" },
      { name: "srvboletoappdes", description: "Boleto application server" },
      { name: "garantido-api", description: "Warranty API" },
      { name: "dbcomdes", description: "Commercial database" },
      { name: "srvnfe003h", description: "Fiscal note server" }
    ],
    backupInfo: {
      method: "Automatic OCI Backup",
      schedule: "Managed by organization OCI policy (Daily)",
      recovery: "Recovery performed via backup restore in OCI Console"
    }
  },
  {
    id: "api-gateway-v2",
    title: "API Gateway V2",
    icon: "🌐",
    shortDescription: "Main entry point for external partner integrations",
    category: "api",
    mainImage: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&auto=format&fit=crop&q=60",
    connectionInfo: {
      host: "api-gw-v2.internal.corp",
      port: "443",
      environment: "Production",
      criticality: "Level 3 (High)"
    },
    connectivityTests: {
      dns: "nslookup api-gw-v2.internal.corp",
      ping: "curl -v https://api-gw-v2.internal.corp/health"
    },
    configuration: {
      tenancy: "carrefourgroup",
      infrastructure: "Kubernetes Cluster",
      location: "Brazil South (São Paulo)"
    },
    dependentSystems: [
      { name: "auth-service", description: "OAuth2 Provider" },
      { name: "partner-portal", description: "Partner management dashboard" }
    ],
    backupInfo: {
      method: "GitOps Configuration + DB Snapshots",
      schedule: "Continuous Sync",
      recovery: "Redeploy via ArgoCD"
    }
  },
  {
    id: "legacy-crm",
    title: "Legacy CRM System",
    icon: "👥",
    shortDescription: "Customer Relationship Management system (Deprecating 2026)",
    category: "service",
    connectionInfo: {
      host: "10.20.30.40",
      port: "8080",
      environment: "Legacy",
      criticality: "Level 2 (Medium)"
    },
    connectivityTests: {
      ping: "ping 10.20.30.40",
      telnet: "telnet 10.20.30.40 8080"
    },
    dependentSystems: [
      { name: "sales-dashboard", description: "Sales reporting tool" }
    ]
  }
];

export const faqs = [
  {
    question: "How do I request access to the Production Database?",
    answer: "Access requests must be submitted via the ITSM portal using the 'Database Access Request' form. Approval from the data owner is required."
  },
  {
    question: "What is the maintenance window for Dev environments?",
    answer: "Development environments are patched every Tuesday between 02:00 AM and 04:00 AM BRT. Services may be unavailable during this time."
  },
  {
    question: "Who do I contact for connection timeouts?",
    answer: "First, verify your VPN connection. If the issue persists, contact the Network Operations Center (NOC) at ext. 5555 or open a high-priority ticket."
  },
  {
    question: "Where can I find the latest API documentation?",
    answer: "The latest Swagger/OpenAPI documentation is available at the /docs endpoint of each service or centrally in the Developer Portal."
  }
];
