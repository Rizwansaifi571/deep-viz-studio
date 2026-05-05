import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ModuleLayout } from "@/components/premium/ModuleLayout";
import { GlassCard } from "@/components/premium/GlassCard";
import { EduSection } from "@/components/premium/EduSection";
import { ParameterSlider } from "@/components/premium/ParameterSlider";
import { FormulaBlock } from "@/components/premium/FormulaBlock";
import { MetricCard } from "@/components/premium/MetricCard";
import { ChartCard } from "@/components/premium/ChartCard";
import { CodePreview } from "@/components/premium/CodePreview";
import { GradientButton } from "@/components/premium/GradientButton";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Brain, RefreshCw } from "lucide-react";
import { classifyPoint, makeBlobs, trainPerceptron } from "@/lib/ml";

export const Route = createFileRoute("/perceptron")({
  head: () => ({
    meta: [
      { title: "Perceptron + MLP — Deep Learning Toolbox" },
      { name: "description", content: "Train a perceptron live: tune learning rate, epochs and watch the decision boundary form." },
    ],
  }),
  component: PerceptronPage,
});

function PerceptronPage() {
  const [lr, setLr] = useState(0.05);
  const [epochs, setEpochs] = useState(40);
  const [seed, setSeed] = useState(7);

  const data = useMemo(() => makeBlobs(60, seed), [seed]);
  const trained = useMemo(() => trainPerceptron(data, lr, epochs), [data, lr, epochs]);

  const lossData = trained.losses.map((l, i) => ({ epoch: i, loss: l }));
  const acc = useMemo(() => {
    let c = 0;
    for (const p of data) {
      const pred = classifyPoint(trained.w1, trained.w2, trained.b, p.x, p.y) > 0.5 ? 1 : 0;
      if (pred === p.label) c++;
    }
    return (c / data.length) * 100;
  }, [data, trained]);

  // SVG plot
  const W = 480, H = 320, pad = 24;
  const xMin = -3, xMax = 3, yMin = -3, yMax = 3;
  const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (W - 2 * pad);
  const sy = (y: number) => H - pad - ((y - yMin) / (yMax - yMin)) * (H - 2 * pad);
  const lineY = (x: number) => -(trained.w1 * x + trained.b) / (trained.w2 || 1e-6);

  return (
    <ModuleLayout
      title="Perceptron + MLP"
      subtitle="The simplest neural network — and the foundation of everything else."
      tutorial={
        <EduSection
          simple="A perceptron is a single neuron: it takes inputs, multiplies them by weights, adds a bias, and squashes the result. Training nudges the weights so its predictions match the labels."
          math={
            <div className="space-y-2">
              <FormulaBlock>z = w₁·x + w₂·y + b</FormulaBlock>
              <FormulaBlock>ŷ = σ(z) — Loss = (ŷ − y)²</FormulaBlock>
            </div>
          }
          realWorld={["Spam vs. ham classification", "Fraud detection signals", "Building block of every deep network"]}
          mistakes={["Learning rate too high → diverges", "Too few epochs → underfits", "Non-linearly separable data → can't converge"]}
          challenge="Set LR = 0.5 and 5 epochs — can you still reach 90% accuracy? What happens at LR = 2.0?"
          takeaways={["A neuron is a weighted sum + activation", "Loss measures how wrong the predictions are", "Gradient descent updates weights to reduce loss"]}
        />
      }
      visualization={
        <>
          <div className="grid sm:grid-cols-3 gap-3">
            <MetricCard label="Accuracy" value={`${acc.toFixed(1)}%`} icon={Brain} accent="success" />
            <MetricCard label="Final loss" value={trained.losses.at(-1)?.toFixed(4) ?? "—"} accent="primary" />
            <MetricCard label="Bias" value={trained.b.toFixed(3)} accent="accent" />
          </div>

          <ChartCard title="Decision boundary" description="Points are training samples. The line is what the neuron learned." bodyClassName="h-80">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
              <defs>
                <linearGradient id="db" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 285)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.18 200)" />
                </linearGradient>
              </defs>
              {/* grid */}
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`vx${i}`} x1={pad + i * ((W - 2 * pad) / 6)} y1={pad} x2={pad + i * ((W - 2 * pad) / 6)} y2={H - pad} stroke="oklch(1 0 0 / 0.05)" />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`hy${i}`} x1={pad} y1={pad + i * ((H - 2 * pad) / 6)} x2={W - pad} y2={pad + i * ((H - 2 * pad) / 6)} stroke="oklch(1 0 0 / 0.05)" />
              ))}
              {/* boundary */}
              <line x1={sx(xMin)} y1={sy(lineY(xMin))} x2={sx(xMax)} y2={sy(lineY(xMax))} stroke="url(#db)" strokeWidth="2.5" />
              {/* points */}
              {data.map((p, i) => (
                <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r="4.5"
                  fill={p.label === 1 ? "oklch(0.7 0.18 200)" : "oklch(0.7 0.2 340)"}
                  stroke="oklch(0.14 0.02 270)" strokeWidth="1.5" />
              ))}
            </svg>
          </ChartCard>

          <ChartCard title="Loss curve" description="Mean squared error after each epoch.">
            <ResponsiveContainer>
              <LineChart data={lossData}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="epoch" stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <YAxis stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="loss" stroke="oklch(0.72 0.18 285)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      }
      controls={
        <GlassCard hover={false} className="space-y-5">
          <div>
            <h3 className="font-display font-semibold text-sm">Hyperparameters</h3>
            <p className="text-xs text-muted-foreground">Tweak and watch everything update.</p>
          </div>
          <ParameterSlider label="Learning rate" value={lr} onChange={setLr} min={0.001} max={1} step={0.001} hint="Step size for each weight update." />
          <ParameterSlider label="Epochs" value={epochs} onChange={(v) => setEpochs(Math.round(v))} min={1} max={200} step={1} hint="How many passes over the data." />
          <ParameterSlider label="Random seed" value={seed} onChange={(v) => setSeed(Math.round(v))} min={1} max={50} step={1} hint="Re-shuffle the dataset." />
          <GradientButton variant="ghost" onClick={() => { setLr(0.05); setEpochs(40); setSeed(Math.floor(Math.random() * 50) + 1); }}>
            <RefreshCw className="size-4" /> Reset & re-shuffle
          </GradientButton>
          <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">w₁</span><span className="font-mono">{trained.w1.toFixed(3)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">w₂</span><span className="font-mono">{trained.w2.toFixed(3)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">b</span><span className="font-mono">{trained.b.toFixed(3)}</span></div>
          </div>
        </GlassCard>
      }
      bottom={
        <CodePreview
          code={`import numpy as np

w = np.zeros(2); b = 0.0
for epoch in range(${epochs}):
    for x, y in data:
        z = w @ x + b
        p = 1 / (1 + np.exp(-z))
        err = p - y
        w -= ${lr} * err * x
        b -= ${lr} * err`}
          log={[
            `init: w=[0,0] b=0`,
            `lr=${lr}  epochs=${epochs}`,
            `final w=[${trained.w1.toFixed(3)}, ${trained.w2.toFixed(3)}] b=${trained.b.toFixed(3)}`,
            `accuracy=${acc.toFixed(1)}%  loss=${trained.losses.at(-1)?.toFixed(4)}`,
          ]}
        />
      }
    />
  );
}
