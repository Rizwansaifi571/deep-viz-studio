import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "warning" | "success" | "info";

export function WarningBadge({ tone = "warning", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  const map: Record<Tone, { Icon: any; cls: string }> = {
    warning: { Icon: AlertTriangle, cls: "bg-warning/15 text-warning border-warning/30" },
    success: { Icon: CheckCircle2, cls: "bg-success/15 text-success border-success/30" },
    info: { Icon: Info, cls: "bg-info/15 text-info border-info/30" },
  };
  const { Icon, cls } = map[tone];
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium", cls, className)}>
      <Icon className="size-3.5" />
      {children}
    </div>
  );
}
