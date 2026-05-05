import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  description,
  right,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <GlassCard className={cn("p-5", className)} hover={false}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-display font-semibold text-sm">{title}</h3>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {right}
      </div>
      <div className={cn("h-72 w-full", bodyClassName)}>{children}</div>
    </GlassCard>
  );
}
