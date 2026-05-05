import { createFileRoute } from "@tanstack/react-router";
import { PremiumSidebar } from "@/components/premium/PremiumSidebar";
import { PremiumNavbar } from "@/components/premium/PremiumNavbar";
import { ModuleCard } from "@/components/premium/ModuleCard";
import { MetricCard } from "@/components/premium/MetricCard";
import { GlassCard } from "@/components/premium/GlassCard";
import {
  Brain, Activity, TrendingDown, Sparkles, Wand2, ImageIcon, Waves,
  Flame, BookOpen, Trophy, Clock,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Deep Learning Toolbox" },
      { name: "description", content: "Your learning hub: jump into any module, track your progress and see your activity." },
    ],
  }),
  component: Dashboard,
});

const activity = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  xp: Math.round(40 + Math.sin(i / 1.4) * 30 + i * 4 + Math.random() * 10),
}));

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full">
      <PremiumSidebar />
      <div className="flex-1 min-w-0 grid-bg">
        <PremiumNavbar title="Dashboard" subtitle="Welcome back — pick a lab and learn by playing." />
        <main className="px-4 lg:px-8 py-6 space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="Streak" value="7d" hint="Keep it up!" icon={Flame} accent="warning" />
            <MetricCard label="Modules done" value="3 / 9" hint="33% complete" icon={BookOpen} accent="primary" />
            <MetricCard label="Best accuracy" value="96.4%" hint="Perceptron lab" icon={Trophy} accent="success" />
            <MetricCard label="Time today" value="42m" hint="Above average" icon={Clock} accent="accent" />
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <GlassCard hover={false} className="lg:col-span-2 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold">Learning activity</h3>
                  <p className="text-xs text-muted-foreground">XP earned over the last 14 days</p>
                </div>
                <span className="text-xs text-success bg-success/10 border border-success/20 rounded-full px-2.5 py-1">+24% vs prev</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activity}>
                    <defs>
                      <linearGradient id="xp" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.72 0.18 285)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="oklch(0.72 0.18 285)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                    <XAxis dataKey="day" stroke="oklch(0.6 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="oklch(0.6 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                    <Area type="monotone" dataKey="xp" stroke="oklch(0.72 0.18 285)" strokeWidth={2.5} fill="url(#xp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard hover={false} className="p-5">
              <h3 className="font-display font-semibold">Today's path</h3>
              <p className="text-xs text-muted-foreground">Three things to crush.</p>
              <ul className="mt-4 space-y-3">
                {[
                  { t: "Tune learning rate to 0.05", d: "Gradient Descent lab" },
                  { t: "Compare ReLU vs Sigmoid", d: "Activation Functions" },
                  { t: "Apply Sobel kernel", d: "CNN + OpenCV" },
                ].map((q, i) => (
                  <li key={q.t} className="flex items-start gap-3">
                    <span className="size-7 grid place-items-center rounded-full bg-gradient-aurora text-xs font-semibold text-primary-foreground">{i + 1}</span>
                    <div>
                      <div className="text-sm font-medium">{q.t}</div>
                      <div className="text-[11px] text-muted-foreground">{q.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold mb-4">All modules</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <ModuleCard to="/perceptron" title="Perceptron + MLP" description="Train a neuron, watch the boundary." icon={Brain} tag="Foundations" gradient="from-primary/30 to-accent/20" />
              <ModuleCard to="/activations" title="Activation Functions" description="Compare and explore derivatives." icon={Activity} tag="Theory" gradient="from-accent/30 to-info/20" />
              <ModuleCard to="/gradient-descent" title="Gradient Descent" description="Visualize convergence and divergence." icon={TrendingDown} tag="Optimization" gradient="from-warning/30 to-destructive/20" />
              <ModuleCard to="/explain" title="Explain Model" description="Feature importance + metrics." icon={Sparkles} tag="Interpretability" gradient="from-success/30 to-accent/20" />
              <ModuleCard to="/what-if" title="What-If Playground" description="See predictions react live." icon={Wand2} tag="Sandbox" gradient="from-chart-5/30 to-primary/20" />
              <ModuleCard to="/cnn" title="CNN + OpenCV Lab" description="Convolutions on real images." icon={ImageIcon} tag="Vision" gradient="from-info/30 to-primary/20" />
              <ModuleCard to="/rnn" title="RNN Sequence Visualizer" description="Track hidden states over time." icon={Waves} tag="Sequences" gradient="from-primary/30 to-chart-5/20" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
