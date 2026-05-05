import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ModuleLayout } from "@/components/premium/ModuleLayout";
import { GlassCard } from "@/components/premium/GlassCard";
import { EduSection } from "@/components/premium/EduSection";
import { FormulaBlock } from "@/components/premium/FormulaBlock";
import { ChartCard } from "@/components/premium/ChartCard";
import { CodePreview } from "@/components/premium/CodePreview";
import { ACTIVATIONS, type ActivationName } from "@/lib/ml";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/activations")({
  head: () => ({
    meta: [
      { title: "Activation Functions — Deep Learning Toolbox" },
      { name: "description", content: "Compare sigmoid, ReLU, tanh and leaky ReLU side by side with live derivative graphs." },
    ],
  }),
  component: ActivationsPage,
});

const NAMES: ActivationName[] = ["sigmoid", "relu", "tanh", "leaky"];

function ActivationsPage() {
  const [active, setActive] = useState<ActivationName>("relu");
  const data = useMemo(() => {
    const arr: any[] = [];
    for (let i = -60; i <= 60; i++) {
      const x = i / 10;
      const row: any = { x };
      for (const n of NAMES) row[n] = ACTIVATIONS[n].f(x);
      arr.push(row);
    }
    return arr;
  }, []);

  const derivData = useMemo(() => {
    const arr: any[] = [];
    for (let i = -60; i <= 60; i++) {
      const x = i / 10;
      arr.push({ x, f: ACTIVATIONS[active].f(x), df: ACTIVATIONS[active].d(x) });
    }
    return arr;
  }, [active]);

  return (
    <ModuleLayout
      title="Activation Functions"
      subtitle="Non-linearities are what give neural networks their power."
      tutorial={
        <EduSection
          simple="Activations decide how strongly a neuron 'fires'. Without them, no matter how deep your network is, it could only learn straight lines."
          math={
            <div className="space-y-2">
              <FormulaBlock>{ACTIVATIONS[active].formula}</FormulaBlock>
              <p className="text-xs text-muted-foreground">The derivative tells gradient descent how to adjust weights.</p>
            </div>
          }
          realWorld={["ReLU dominates modern CNNs and transformers", "Sigmoid is used at output for binary classification", "Tanh is common inside RNN cells"]}
          mistakes={["Sigmoid → vanishing gradients in deep nets", "ReLU → dead neurons (always-zero outputs)", "Mixing activations randomly across layers"]}
          challenge="Switch between the four activations: which one is flat almost everywhere? Why is that a problem?"
          takeaways={["Activations introduce non-linearity", "Their shape directly impacts how gradients flow", "ReLU and its variants are the modern default"]}
        />
      }
      visualization={
        <>
          <ChartCard title="All activations, side by side" description="Hover any line to compare values at the same input.">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="x" stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <YAxis stroke="oklch(0.6 0.03 270)" fontSize={11} domain={[-1.5, 1.5]} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="sigmoid" stroke="oklch(0.72 0.18 285)" strokeWidth={2} dot={false} />
                <Line dataKey="relu" stroke="oklch(0.7 0.18 200)" strokeWidth={2} dot={false} />
                <Line dataKey="tanh" stroke="oklch(0.78 0.16 75)" strokeWidth={2} dot={false} />
                <Line dataKey="leaky" stroke="oklch(0.7 0.2 340)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title={`${ACTIVATIONS[active].label} & its derivative`} description="The derivative drives backpropagation.">
            <ResponsiveContainer>
              <LineChart data={derivData}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="x" stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <YAxis stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="f" name="f(x)" stroke="oklch(0.72 0.18 285)" strokeWidth={2.5} dot={false} />
                <Line dataKey="df" name="f'(x)" stroke="oklch(0.78 0.16 75)" strokeWidth={2.5} strokeDasharray="6 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      }
      controls={
        <GlassCard hover={false} className="space-y-4">
          <div>
            <h3 className="font-display font-semibold text-sm">Activation</h3>
            <p className="text-xs text-muted-foreground">Pick one to inspect its derivative.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {NAMES.map((n) => (
              <button
                key={n}
                onClick={() => setActive(n)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-xs font-medium transition",
                  active === n
                    ? "border-primary/50 bg-primary/15 text-foreground shadow-glow-sm"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground",
                )}
              >
                {ACTIVATIONS[n].label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10 text-xs space-y-2">
            <div className="text-muted-foreground">Formula</div>
            <FormulaBlock>{ACTIVATIONS[active].formula}</FormulaBlock>
          </div>
        </GlassCard>
      }
      bottom={
        <CodePreview
          code={`import torch.nn as nn

activation = nn.${active === "relu" ? "ReLU" : active === "sigmoid" ? "Sigmoid" : active === "tanh" ? "Tanh" : "LeakyReLU(0.1)"}()
x = torch.linspace(-6, 6, 200)
y = activation(x)`}
          log={[`selected: ${ACTIVATIONS[active].label}`, `range checked: x ∈ [-6, 6]`, `derivative computed for backprop`]}
        />
      }
    />
  );
}
