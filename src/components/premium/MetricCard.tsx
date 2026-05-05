import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "primary",
  className,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: LucideIcon;
  accent?: "primary" | "accent" | "warning" | "success";
  className?: string;
}) {
  const accents: Record<string, string> = {
    primary: "from-primary/30 to-primary/5 text-primary",
    accent: "from-accent/30 to-accent/5 text-accent",
    warning: "from-warning/30 to-warning/5 text-warning",
    success: "from-success/30 to-success/5 text-success",
  };
  return (
    <div className={cn("glass rounded-2xl p-4 relative overflow-hidden", className)}>
      <div className={cn("absolute -top-10 -right-10 size-32 rounded-full bg-gradient-to-br blur-2xl opacity-40", accents[accent])} />
      <div className="flex items-center justify-between relative">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        {Icon && <Icon className={cn("size-4", accents[accent].split(" ")[2])} />}
      </div>
      <div className="mt-2 font-display text-2xl font-semibold tabular-nums relative">{value}</div>
      {hint && <div className="mt-1 text-[11px] text-muted-foreground relative">{hint}</div>}
    </div>
  );
}
