import { cn } from "@/lib/utils";

export function FormulaBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-primary/90",
        className,
      )}
    >
      {children}
    </div>
  );
}
