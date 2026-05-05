import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function ModuleCard({
  to,
  title,
  description,
  icon: Icon,
  tag,
  gradient = "from-primary/30 to-accent/20",
  className,
}: {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tag?: string;
  gradient?: string;
  className?: string;
}) {
  return (
    <Link to={to}>
      <GlassCard className={cn("h-full group cursor-pointer", className)}>
        <div className={cn("absolute -top-16 -right-16 size-48 rounded-full blur-3xl opacity-50 bg-gradient-to-br", gradient)} />
        <div className="relative flex items-center justify-between mb-4">
          <div className={cn("size-11 rounded-xl bg-gradient-to-br grid place-items-center shadow-glow-sm", gradient)}>
            <Icon className="size-5 text-foreground" />
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground transition" />
        </div>
        <div className="relative">
          {tag && <div className="text-[10px] uppercase tracking-wider text-primary mb-1">{tag}</div>}
          <h3 className="font-display font-semibold text-base">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
        </div>
      </GlassCard>
    </Link>
  );
}
