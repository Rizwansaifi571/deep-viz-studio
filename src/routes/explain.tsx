import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ModuleLayout } from "@/components/premium/ModuleLayout";
import { GlassCard } from "@/components/premium/GlassCard";
import { EduSection } from "@/components/premium/EduSection";
import { ChartCard } from "@/components/premium/ChartCard";
import { MetricCard } from "@/components/premium/MetricCard";
import { ParameterSlider } from "@/components/premium/ParameterSlider";
import { CodePreview } from "@/components/premium/CodePreview";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/explain")({
  head: () => ({
    meta: [
      { title: "Explain Model — Deep Learning Toolbox" },
      { name: "description", content: "Inspect feature importance, confidence, classification metrics and the confusion matrix of a model." },
    ],
  }),
  component: ExplainPage,
});

const FEATURES = ["Age", "Income", "Tenure", "Activity", "Region", "Device"];

function ExplainPage() {
  const [bias, setBias] = useState(0.2);
  const [noise, setNoise] = useState(0.1);

  const importance = useMemo(() => {
    return FEATURES.map((f, i) => ({
      feature: f,
      importance: Math.max(0.02, 0.4 - i * 0.05 + Math.sin(i + bias * 5) * 0.1 + noise * 0.2),
    })).sort((a, b) => b.importance - a.importance);
  }, [bias, noise]);

  const confidence = Math.min(0.99, Math.max(0.5, 0.85 - noise * 0.4 + bias * 0.1));

  // Confusion matrix
  const total = 200;
  const tp = Math.round(total * (0.5 * confidence));
  const tn = Math.round(total * (0.45 * confidence));
  const fp = Math.round(total * (1 - confidence) * 0.55);
  const fn = total - tp - tn - fp;
  const acc = ((tp + tn) / total) * 100;
  const prec = (tp / Math.max(1, tp + fp)) * 100;
  const recall = (tp / Math.max(1, tp + fn)) * 100;
  const f1 = (2 * prec * recall) / Math.max(1, prec + recall);

  const cells = [
    { label: "True Pos", v: tp, accent: "bg-success/20 text-success" },
    { label: "False Pos", v: fp, accent: "bg-warning/20 text-warning" },
    { label: "False Neg", v: fn, accent: "bg-warning/20 text-warning" },
    { label: "True Neg", v: tn, accent: "bg-success/20 text-success" },
  ];

  return (
    <ModuleLayout
      title="Explain Model"
      subtitle="Open the black box: what is the model looking at, and how confident is it?"
      tutorial={
        <EduSection
          simple="Models can be right for the wrong reasons. Explainability tools tell you which inputs mattered most — and how trustworthy the answer is."
          math={<p>Feature importance ≈ how much the loss would increase if we shuffled that feature. Confidence ≈ probability of the predicted class.</p>}
          realWorld={["Healthcare diagnoses (must be auditable)", "Credit scoring fairness", "Debugging silent regressions"]}
          mistakes={["Trusting a 99% confidence on out-of-distribution data", "Confusing correlation with causation", "Reporting accuracy on imbalanced classes"]}
          challenge="Drop confidence below 70% — does precision or recall fall faster? When is each more important?"
          takeaways={["Always look beyond accuracy", "Confusion matrices reveal what's really wrong", "Feature importance is a hint, not a verdict"]}
        />
      }
      visualization={
        <>
          <div className="grid sm:grid-cols-4 gap-3">
            <MetricCard label="Accuracy" value={`${acc.toFixed(1)}%`} icon={Sparkles} accent="success" />
            <MetricCard label="Precision" value={`${prec.toFixed(1)}%`} accent="primary" />
            <MetricCard label="Recall" value={`${recall.toFixed(1)}%`} accent="accent" />
            <MetricCard label="F1 score" value={f1.toFixed(2)} accent="warning" />
          </div>

          <ChartCard title="Feature importance" description="Higher = the model relies on this signal more.">
            <ResponsiveContainer>
              <BarChart data={importance} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" horizontal={false} />
                <XAxis type="number" stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <YAxis dataKey="feature" type="category" stroke="oklch(0.6 0.03 270)" fontSize={11} width={70} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Bar dataKey="importance" fill="oklch(0.72 0.18 285)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <GlassCard hover={false}>
            <h3 className="font-display font-semibold text-sm mb-1">Confusion matrix</h3>
            <p className="text-xs text-muted-foreground mb-4">Predicted vs. actual on a 200-sample test set.</p>
            <div className="grid grid-cols-[80px_1fr_1fr] gap-2 items-center">
              <div />
              <div className="text-center text-[11px] text-muted-foreground">Predicted +</div>
              <div className="text-center text-[11px] text-muted-foreground">Predicted −</div>
              <div className="text-[11px] text-muted-foreground text-right">Actual +</div>
              <Cell {...cells[0]} />
              <Cell {...cells[2]} />
              <div className="text-[11px] text-muted-foreground text-right">Actual −</div>
              <Cell {...cells[1]} />
              <Cell {...cells[3]} />
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-sm">Prediction confidence</h3>
                <p className="text-xs text-muted-foreground">Latest sample · class "Churn = Yes"</p>
              </div>
              <span className="font-mono text-2xl font-semibold">{(confidence * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-gradient-aurora transition-all duration-500" style={{ width: `${confidence * 100}%` }} />
            </div>
          </GlassCard>
        </>
      }
      controls={
        <GlassCard hover={false} className="space-y-5">
          <div>
            <h3 className="font-display font-semibold text-sm">Simulated model</h3>
            <p className="text-xs text-muted-foreground">Adjust calibration to see metrics react.</p>
          </div>
          <ParameterSlider label="Decision bias" value={bias} onChange={setBias} min={-1} max={1} step={0.01} hint="Shift the threshold left/right." />
          <ParameterSlider label="Input noise" value={noise} onChange={setNoise} min={0} max={1} step={0.01} hint="Higher noise erodes confidence." />
        </GlassCard>
      }
      bottom={
        <CodePreview
          code={`from sklearn.metrics import classification_report, confusion_matrix

y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))`}
          log={[
            `accuracy=${acc.toFixed(1)}%`,
            `precision=${prec.toFixed(1)}%  recall=${recall.toFixed(1)}%`,
            `f1=${f1.toFixed(2)}`,
            `top feature: ${importance[0].feature}`,
          ]}
        />
      }
    />
  );
}

function Cell({ label, v, accent }: { label: string; v: number; accent: string }) {
  return (
    <div className={cn("rounded-xl p-4 border border-white/10", accent)}>
      <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
      <div className="font-display text-2xl font-semibold mt-1">{v}</div>
    </div>
  );
}
