import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ModuleLayout } from "@/components/premium/ModuleLayout";
import { GlassCard } from "@/components/premium/GlassCard";
import { EduSection } from "@/components/premium/EduSection";
import { ChartCard } from "@/components/premium/ChartCard";
import { MetricCard } from "@/components/premium/MetricCard";
import { CodePreview } from "@/components/premium/CodePreview";
import { ParameterSlider } from "@/components/premium/ParameterSlider";
import { tanh } from "@/lib/ml";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Waves } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rnn")({
  head: () => ({
    meta: [
      { title: "RNN Sequence Visualizer — Deep Learning Toolbox" },
      { name: "description", content: "Watch hidden states evolve through time, run a sentiment demo and predict the next value in a sequence." },
    ],
  }),
  component: RNNPage,
});

const POSITIVE = ["good", "great", "love", "amazing", "excellent", "happy", "fantastic", "best", "wonderful", "awesome"];
const NEGATIVE = ["bad", "terrible", "hate", "awful", "worst", "sad", "boring", "broken", "horrible", "ugly"];

function RNNPage() {
  const [text, setText] = useState("This product is absolutely amazing and i love it");
  const [hiddenSize] = useState(8);
  const [seqInput, setSeqInput] = useState("1, 2, 3, 4, 5, 6, 7, 8");
  const [decay, setDecay] = useState(0.6);

  // Sentiment per token
  const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
  const tokenScores = tokens.map((t) => {
    if (POSITIVE.includes(t)) return 1;
    if (NEGATIVE.includes(t)) return -1;
    return 0;
  });
  let h = 0;
  const states = tokens.map((t, i) => {
    h = tanh(decay * h + tokenScores[i]);
    return { t: i + 1, token: t, hidden: h };
  });
  const sentiment = states.length ? states[states.length - 1].hidden : 0;

  // Hidden state matrix (mock per-unit activations)
  const grid = useMemo(() => {
    return states.map((s, i) =>
      Array.from({ length: hiddenSize }).map((_, u) => ({
        v: tanh(s.hidden * (0.6 + Math.sin(u + i / 1.5) * 0.5) + Math.cos(u * (i + 1) / 3) * 0.3),
      })),
    );
  }, [states, hiddenSize]);

  // Next-value prediction
  const seq = seqInput.split(",").map((n) => parseFloat(n.trim())).filter((n) => isFinite(n));
  const nextPred = seq.length >= 2
    ? seq[seq.length - 1] + (seq[seq.length - 1] - seq[seq.length - 2])
    : seq[seq.length - 1] ?? 0;
  const seqData = [...seq.map((v, i) => ({ t: i + 1, value: v, kind: "actual" as const })), { t: seq.length + 1, value: nextPred, kind: "pred" as const }];

  return (
    <ModuleLayout
      title="RNN Sequence Visualizer"
      subtitle="See how hidden state carries information across time."
      tutorial={
        <EduSection
          simple="A recurrent net reads a sequence one step at a time and keeps a 'hidden state' — a memory of what it has seen so far. The same weights are reused at every step."
          math={
            <div className="space-y-2">
              <code className="text-xs">hₜ = tanh(Wₕ · hₜ₋₁ + Wₓ · xₜ + b)</code>
              <p className="text-xs text-muted-foreground">Each step blends the new input with the previous memory.</p>
            </div>
          }
          realWorld={["Sentiment & language modeling", "Speech recognition", "Time-series forecasting"]}
          mistakes={["Long sequences → vanishing/exploding gradients", "Forgetting to use LSTM/GRU when needed", "Confusing batch vs. time dimension"]}
          challenge="Type a sentence with a strong word at the start, then a stronger word at the end. Where does the hidden state shift the most?"
          takeaways={["Hidden state is the network's memory", "Same weights reused = parameter efficiency", "Modern LLMs replaced this with attention"]}
        />
      }
      visualization={
        <>
          <div className="grid sm:grid-cols-3 gap-3">
            <MetricCard label="Final hidden" value={sentiment.toFixed(3)} icon={Waves} accent="primary" />
            <MetricCard
              label="Sentiment"
              value={sentiment > 0.2 ? "Positive 😊" : sentiment < -0.2 ? "Negative 😞" : "Neutral 😐"}
              accent={sentiment > 0.2 ? "success" : sentiment < -0.2 ? "warning" : "accent"}
            />
            <MetricCard label="Next value" value={nextPred.toFixed(2)} accent="accent" />
          </div>

          <GlassCard hover={false}>
            <h3 className="font-display font-semibold text-sm mb-1">Hidden-state timeline</h3>
            <p className="text-xs text-muted-foreground mb-4">Each row is a time step, each column a hidden unit.</p>
            <div className="overflow-x-auto scroll-thin">
              <div className="inline-block min-w-full">
                <div className="grid gap-1" style={{ gridTemplateColumns: `120px repeat(${hiddenSize}, 28px)` }}>
                  <div />
                  {Array.from({ length: hiddenSize }).map((_, u) => (
                    <div key={u} className="text-[10px] text-muted-foreground text-center">h{u}</div>
                  ))}
                  {grid.map((row, i) => (
                    <>
                      <div key={`l-${i}`} className="text-[11px] text-muted-foreground truncate pr-2">
                        <span className="text-primary mr-1">t{i + 1}</span>{tokens[i]}
                      </div>
                      {row.map((c, u) => {
                        const v = c.v;
                        const pos = v >= 0;
                        return (
                          <div
                            key={`${i}-${u}`}
                            className={cn("size-7 rounded-md border border-white/10 transition")}
                            style={{
                              background: pos
                                ? `oklch(0.72 0.18 285 / ${Math.abs(v)})`
                                : `oklch(0.7 0.18 25 / ${Math.abs(v)})`,
                            }}
                            title={v.toFixed(2)}
                          />
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          <ChartCard title="Sequence prediction" description="Last point (dashed) is the model's next-value forecast.">
            <ResponsiveContainer>
              <LineChart data={seqData}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="t" stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <YAxis stroke="oklch(0.6 0.03 270)" fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Line dataKey="value" stroke="oklch(0.72 0.18 285)" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      }
      controls={
        <GlassCard hover={false} className="space-y-5">
          <div>
            <h3 className="font-display font-semibold text-sm">Sequence input</h3>
            <p className="text-xs text-muted-foreground">Try a sentence for sentiment.</p>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm focus:outline-none focus:border-primary/50"
          />
          <ParameterSlider label="Memory decay" value={decay} onChange={setDecay} min={0} max={1} step={0.01} hint="Higher = remembers longer." />
          <div className="pt-3 border-t border-white/10 space-y-2">
            <h4 className="text-xs font-semibold">Time-series</h4>
            <input
              value={seqInput}
              onChange={(e) => setSeqInput(e.target.value)}
              className="w-full rounded-xl bg-black/40 border border-white/10 p-2.5 text-sm font-mono focus:outline-none focus:border-primary/50"
              placeholder="comma separated"
            />
            <p className="text-[11px] text-muted-foreground">Naive linear extrapolation predicts the next point.</p>
          </div>
        </GlassCard>
      }
      bottom={
        <CodePreview
          code={`import torch, torch.nn as nn

rnn = nn.RNN(input_size=1, hidden_size=${hiddenSize}, batch_first=True)
out, h = rnn(x)
sentiment = torch.tanh(out[:, -1, :].mean())`}
          log={[
            `tokens: ${tokens.length}`,
            ...states.slice(-5).map((s) => `t${s.t}  ${s.token.padEnd(12)}  h=${s.hidden.toFixed(3)}`),
            `next value pred = ${nextPred.toFixed(3)}`,
          ]}
        />
      }
    />
  );
}
