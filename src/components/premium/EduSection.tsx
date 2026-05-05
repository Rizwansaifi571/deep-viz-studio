import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

export function EduSection({
  simple,
  math,
  realWorld,
  mistakes,
  challenge,
  takeaways,
  className,
}: {
  simple: string;
  math: React.ReactNode;
  realWorld: string[];
  mistakes: string[];
  challenge: string;
  takeaways: string[];
  className?: string;
}) {
  const block = (title: string, body: React.ReactNode, tone: string) => (
    <div className="space-y-2">
      <div className={cn("text-[10px] uppercase tracking-wider font-semibold", tone)}>{title}</div>
      <div className="text-sm text-foreground/90 leading-relaxed">{body}</div>
    </div>
  );

  return (
    <GlassCard hover={false} className={cn("space-y-5", className)}>
      {block("Simple Explanation", simple, "text-primary")}
      {block("Mathematical Intuition", math, "text-accent")}
      {block(
        "Real-World Use",
        <ul className="list-disc pl-4 space-y-1 marker:text-primary/60">
          {realWorld.map((r) => <li key={r}>{r}</li>)}
        </ul>,
        "text-info",
      )}
      {block(
        "Common Mistakes",
        <ul className="list-disc pl-4 space-y-1 marker:text-warning/60">
          {mistakes.map((r) => <li key={r}>{r}</li>)}
        </ul>,
        "text-warning",
      )}
      {block("Mini Challenge", challenge, "text-success")}
      {block(
        "Key Takeaways",
        <ul className="list-disc pl-4 space-y-1 marker:text-primary/60">
          {takeaways.map((r) => <li key={r}>{r}</li>)}
        </ul>,
        "text-primary",
      )}
    </GlassCard>
  );
}
