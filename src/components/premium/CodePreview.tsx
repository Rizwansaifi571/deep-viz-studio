import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

export function CodePreview({ code, log, className }: { code: string; log?: string[]; className?: string }) {
  return (
    <GlassCard hover={false} className={cn("p-0 overflow-hidden", className)}>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <div>
          <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-warning/70" />
              <span className="size-2.5 rounded-full bg-success/70" />
            </div>
            <span className="text-[11px] text-muted-foreground ml-2 font-mono">model.py</span>
          </div>
          <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono text-foreground/90 max-h-72">
            <code>{code}</code>
          </pre>
        </div>
        <div>
          <div className="px-4 py-2.5 border-b border-white/10 text-[11px] text-muted-foreground font-mono">
            experiment.log
          </div>
          <div className="p-4 text-xs font-mono space-y-1 max-h-72 overflow-y-auto scroll-thin">
            {(log ?? ["▸ ready"]).map((l, i) => (
              <div key={i} className="text-muted-foreground">
                <span className="text-primary mr-2">›</span>
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
