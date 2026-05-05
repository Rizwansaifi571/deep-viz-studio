import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ModuleLayout } from "@/components/premium/ModuleLayout";
import { GlassCard } from "@/components/premium/GlassCard";
import { EduSection } from "@/components/premium/EduSection";
import { FormulaBlock } from "@/components/premium/FormulaBlock";
import { ChartCard } from "@/components/premium/ChartCard";
import { ParameterSlider } from "@/components/premium/ParameterSlider";
import { MetricCard } from "@/components/premium/MetricCard";
import { CodePreview } from "@/components/premium/CodePreview";
import { WarningBadge } from "@/components/premium/WarningBadge";
import { gdLoss, gradientDescent } from "@/lib/ml";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Scatter, ScatterChart, ZAxis } from "recharts";
import { TrendingDown } from "lucide-react";

export const Route = createFileRoute("/gradient-descent")({
  head: () => ({
    meta: [
      { title: "Gradient Descent — Deep Learning Toolbox" },
      { name: "description", content: "Watch gradient descent converge — or explode — as you tune the learning rate." },
    ],
  }),
  component: GDPage,
});

function GDPage() {
  const [lr, setLr] = useState(0.1);
  const [start, setStart] = useState(-3);
  const [steps, setSteps] = useState(30);

  const path = useMemo(() => gradientDescent(start, lr, steps), [start, lr, steps]);

  const surface = useMemo(() => {
    const arr: { x: number; loss: number }[] = [];
    for (let i = -60; i <= 80; i++) {
      const x = i / 10;
      arr.push({ x, loss: gdLoss(x) });
    }
    return arr;
  }, []);

  const last = path.at(-1)!;
  const diverged = !isFinite(last.loss) || Math.abs(last.x) > 100;
  const lrTooHigh = lr > 0.9;
  const lrTooLow = lr < 0.01;

  return (
    <ModuleLayout
      title="Gradient Descent"
      subtitle="The optimizer that powers nearly every deep learning model."
      tutorial={
        <EduSection
          simple="Gradient descent is hill-climbing in reverse: at each step you look at which direction goes downhill (the gradient) and step that way."
          math={
            <div className="space-y-2">
              <FormulaBlock>L(x) = (x − 2)²</FormulaBlock>
              <FormulaBlock>x ← x − η · ∇L(x)</FormulaBlock>
              <p className="text-xs text-muted-foreground">η (eta) is the learning rate. Too big = overshoot. Too small = crawl.</p>
            </div>
          }
          realWorld={["Training every neural network ever", "Linear & logistic regression", "Reinforcement learning policy updates"]}
          mistakes={["Learning rate too high → divergence", "Learning rate too low → endless training", "Forgetting to normalize features"]}
          challenge="Set LR > 1.0 and start = -5. Can you find a value that diverges? Why does it explode?"
          takeaways={["The gradient points uphill — you go opposite", "The learning rate controls step size", "Convex problems converge cleanly; deep nets are messier"]}
        />
      }
      visualization={
        <>
          <div className="grid sm:grid-cols-3 gap-3">
            <MetricCard label="Final x" value={diverged ? "∞" : last.x.toFixed(3)} icon={TrendingDown} accent={diverged ? "warning" : "primary"} />
            <MetricCard label="Final loss" value={diverged ? "∞" : last.loss.toFixed(4)} accent={diverged ? "warning" : "success"} />
            <MetricCard label="Steps taken" value={path.length - 1} accent="accent" />
          </div>

          <div className="flex flex-wrap gap-2">
            {lrTooHigh && <WarningBadge tone="warning">High learning rate — risk of divergence</WarningBadge>}
            {lrTooLow && <WarningBadge tone="info">Very small learning rate — slow convergence</WarningBadge>}
            {diverged && <WarningBadge tone="warning">Optimization diverged — reduce η</WarningBadge>}
            {!diverged && !lrTooHigh && !lrTooLow && <WarningBadge tone="success">Healthy learning rate</WarningBadge>}
          </div>

          <ChartCard title="Loss surface + descent path" description="The line is f(x). Dots show each gradient-descent step." bodyClassName="h-80">
            <ResponsiveContainer>
              <LineChart data={surface}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="x" type="number" stroke="oklch(0.6 0.03 270)" fontSize={11} domain={[-6, 8]} />
                <YAxis stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Line dataKey="loss" stroke="oklch(0.7 0.18 200)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="-mt-72 h-72 pointer-events-none">
              <ResponsiveContainer>
                <ScatterChart>
                  <XAxis dataKey="x" type="number" domain={[-6, 8]} hide />
                  <YAxis dataKey="loss" type="number" hide />
                  <ZAxis range={[80, 80]} />
                  <Scatter data={path.filter((p) => isFinite(p.loss) && Math.abs(p.x) < 100)} fill="oklch(0.72 0.18 285)" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Loss over time" description="Each step's loss value.">
            <ResponsiveContainer>
              <LineChart data={path}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="step" stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <YAxis stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Line dataKey="loss" stroke="oklch(0.72 0.18 285)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      }
      controls={
        <GlassCard hover={false} className="space-y-5">
          <div>
            <h3 className="font-display font-semibold text-sm">Optimizer</h3>
            <p className="text-xs text-muted-foreground">Tune the descent.</p>
          </div>
          <ParameterSlider label="Learning rate (η)" value={lr} onChange={setLr} min={0.001} max={1.5} step={0.001} />
          <ParameterSlider label="Starting point" value={start} onChange={setStart} min={-6} max={8} step={0.1} />
          <ParameterSlider label="Steps" value={steps} onChange={(v) => setSteps(Math.round(v))} min={1} max={100} step={1} />
        </GlassCard>
      }
      bottom={
        <CodePreview
          code={`x = ${start}
for _ in range(${steps}):
    grad = 2 * (x - 2)
    x = x - ${lr} * grad
print(x, (x-2)**2)`}
          log={path.slice(0, 8).map((p) => `step ${p.step}  x=${p.x.toFixed(3)}  loss=${p.loss.toFixed(4)}`)}
        />
      }
    />
  );
}
