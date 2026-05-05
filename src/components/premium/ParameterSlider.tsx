import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function ParameterSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  unit = "",
  hint,
  className,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="font-mono tabular-nums text-foreground bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
          {Number.isInteger(step) ? value.toFixed(0) : value.toFixed(2)}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
      {hint && <p className="text-[11px] text-muted-foreground/80">{hint}</p>}
    </div>
  );
}
