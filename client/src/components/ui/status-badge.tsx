import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  type?: "environment" | "criticality" | "default";
}

export function StatusBadge({ status, type = "default" }: StatusBadgeProps) {
  const getStyles = () => {
    const normalized = status.toLowerCase();
    
    if (type === "environment") {
      if (normalized.includes("prod")) return "bg-red-500/10 text-red-400 border-red-500/20";
      if (normalized.includes("dev")) return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      if (normalized.includes("legacy")) return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
    
    if (type === "criticality") {
      if (normalized.includes("high") || normalized.includes("level 3")) return "bg-red-500/10 text-red-400 border-red-500/20";
      if (normalized.includes("medium") || normalized.includes("level 2")) return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      return "bg-green-500/10 text-green-400 border-green-500/20";
    }

    return "bg-white/10 text-white border-white/20";
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium border",
      getStyles()
    )}>
      {status}
    </span>
  );
}
