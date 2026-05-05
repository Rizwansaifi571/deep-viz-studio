import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModuleLayout } from "@/components/premium/ModuleLayout";
import { GlassCard } from "@/components/premium/GlassCard";
import { EduSection } from "@/components/premium/EduSection";
import { MetricCard } from "@/components/premium/MetricCard";
import { ParameterSlider } from "@/components/premium/ParameterSlider";
import { GradientButton } from "@/components/premium/GradientButton";
import { CodePreview } from "@/components/premium/CodePreview";
import { sigmoid } from "@/lib/ml";
import { Wand2, History, Save } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/what-if")({
  head: () => ({
    meta: [
      { title: "What-If Playground — Deep Learning Toolbox" },
      { name: "description", content: "Tweak inputs and watch a model's prediction change live. Save scenarios, compare outcomes." },
    ],
  }),
  component: WhatIfPage,
});

type Scenario = {
  id: number;
  age: number;
  income: number;
  tenure: number;
  activity: number;
  prob: number;
};

function WhatIfPage() {
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(60);
  const [tenure, setTenure] = useState(24);
  const [activity, setActivity] = useState(0.7);
  const [history, setHistory] = useState<Scenario[]>([]);

  // Mock model: weighted sum -> sigmoid
  const z = -2.5 + 0.04 * age - 0.02 * income - 0.05 * tenure + 3.0 * (1 - activity);
  const prob = sigmoid(z);
  const decision = prob > 0.5 ? "Likely to churn" : "Likely to stay";

  const save = () =>
    setHistory((h) => [{ id: Date.now(), age, income, tenure, activity, prob }, ...h].slice(0, 8));

  return (
    <ModuleLayout
      title="What-If Playground"
      subtitle="Counterfactual reasoning: change one input, see how the model reacts."
      tutorial={
        <EduSection
          simple="What-if analysis answers questions like 'what happens to the prediction if this customer was 5 years older?' It builds intuition for model behavior."
          math={<p>For each scenario the model computes z = w·x + b, then σ(z) → probability. We freeze the model and vary only x.</p>}
          realWorld={["Loan officers exploring approval edge cases", "Doctors testing treatment outcomes", "Product teams stress-testing recommendations"]}
          mistakes={["Extrapolating outside the training distribution", "Forgetting feature correlations", "Treating probabilities as ground truth"]}
          challenge="Find the smallest change in 'Activity' that flips the decision. Now do the same with 'Tenure'."
          takeaways={["Models are functions you can probe", "Saving scenarios reveals decision boundaries", "Sensitivity = a proxy for importance"]}
        />
      }
      visualization={
        <>
          <div className="grid sm:grid-cols-3 gap-3">
            <MetricCard label="Predicted probability" value={`${(prob * 100).toFixed(1)}%`} icon={Wand2} accent={prob > 0.5 ? "warning" : "success"} />
            <MetricCard label="Decision" value={decision} accent={prob > 0.5 ? "warning" : "success"} />
            <MetricCard label="Logit (z)" value={z.toFixed(2)} accent="primary" />
          </div>

          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-sm">Live confidence</h3>
                <p className="text-xs text-muted-foreground">Watch the bar swing as you tune.</p>
              </div>
              <span className="font-mono text-3xl font-semibold tabular-nums">{(prob * 100).toFixed(1)}%</span>
            </div>
            <div className="h-3 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-gradient-aurora transition-all duration-300" style={{ width: `${prob * 100}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Stay</span>
              <span>Threshold 50%</span>
              <span>Churn</span>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <History className="size-4 text-primary" />
                <h3 className="font-display font-semibold text-sm">Scenario history</h3>
              </div>
              <span className="text-xs text-muted-foreground">{history.length} saved</span>
            </div>
            {history.length === 0 ? (
              <p className="text-xs text-muted-foreground">Hit "Save scenario" to compare different what-ifs side by side.</p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto scroll-thin">
                {history.map((s) => (
                  <div key={s.id} className="grid grid-cols-5 items-center gap-2 text-xs rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                    <span>Age {s.age}</span>
                    <span>${s.income}k</span>
                    <span>{s.tenure}m</span>
                    <span>Act {s.activity.toFixed(2)}</span>
                    <span className={cn("font-mono text-right", s.prob > 0.5 ? "text-warning" : "text-success")}>
                      {(s.prob * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </>
      }
      controls={
        <GlassCard hover={false} className="space-y-5">
          <div>
            <h3 className="font-display font-semibold text-sm">Customer inputs</h3>
            <p className="text-xs text-muted-foreground">Move any slider — the prediction updates instantly.</p>
          </div>
          <ParameterSlider label="Age (years)" value={age} onChange={(v) => setAge(Math.round(v))} min={18} max={80} step={1} />
          <ParameterSlider label="Income ($k)" value={income} onChange={(v) => setIncome(Math.round(v))} min={10} max={200} step={1} />
          <ParameterSlider label="Tenure (months)" value={tenure} onChange={(v) => setTenure(Math.round(v))} min={1} max={120} step={1} />
          <ParameterSlider label="Activity" value={activity} onChange={setActivity} min={0} max={1} step={0.01} hint="0 = inactive, 1 = power user" />
          <GradientButton onClick={save}><Save className="size-4" /> Save scenario</GradientButton>
        </GlassCard>
      }
      bottom={
        <CodePreview
          code={`features = dict(age=${age}, income=${income}, tenure=${tenure}, activity=${activity})
prob = model.predict_proba([list(features.values())])[0][1]
print(f"Churn probability: {prob:.2%}")`}
          log={[
            `inputs: age=${age}  income=${income}  tenure=${tenure}  activity=${activity}`,
            `z=${z.toFixed(3)}  prob=${(prob * 100).toFixed(2)}%`,
            `decision: ${decision}`,
            ...history.slice(0, 3).map((s) => `saved ↩ prob=${(s.prob * 100).toFixed(1)}%`),
          ]}
        />
      }
    />
  );
}
