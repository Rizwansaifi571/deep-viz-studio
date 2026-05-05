import { createFileRoute } from "@tanstack/react-router";
import { PremiumSidebar } from "@/components/premium/PremiumSidebar";
import { PremiumNavbar } from "@/components/premium/PremiumNavbar";
import { ModuleCard } from "@/components/premium/ModuleCard";
import { GlassCard } from "@/components/premium/GlassCard";
import {
  Brain, Activity, TrendingDown, Sparkles, Wand2, ImageIcon, Waves,
  Cpu, Network, GitMerge, CpuIcon, Infinity, Zap
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Deep Learning Studio" },
      { name: "description", content: "Advanced Neural Network Visualization Platform" },
    ],
  }),
  component: Dashboard,
});

const performanceData = Array.from({ length: 20 }).map((_, i) => ({
  epoch: i * 5,
  loss: Math.max(0.1, 2.5 * Math.exp(-i / 4.0) + Math.random() * 0.1),
  accuracy: Math.min(99.9, 40 + i * 3.5 + Math.random() * 5),
}));

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full">
      <PremiumSidebar />
      <div className="flex-1 min-w-0 grid-bg relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-200px] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <PremiumNavbar title="Neural Studio" subtitle="Interactive Deep Learning Architecture & Visualization" />
        
        <main className="px-4 lg:px-8 py-6 space-y-8 relative z-10">
          {/* Main Status Display */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <GlassCard hover className="p-5 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all" />
              <div className="flex items-center gap-3 text-muted-foreground mb-4">
                <Network className="size-5 text-primary" />
                <span className="text-sm font-medium">Model Architecture</span>
              </div>
              <div>
                <h3 className="text-3xl font-display font-medium text-foreground tracking-tight">Transformer</h3>
                <p className="text-xs text-muted-foreground mt-1">Multi-head Self Attention</p>
              </div>
            </GlassCard>

            <GlassCard hover className="p-5 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-success/10 rounded-full blur-xl group-hover:bg-success/20 transition-all" />
              <div className="flex items-center gap-3 text-muted-foreground mb-4">
                <Cpu className="size-5 text-success" />
                <span className="text-sm font-medium">Compute Engine</span>
              </div>
              <div>
                <h3 className="text-3xl font-display font-medium text-foreground tracking-tight">WebGL Accel.</h3>
                <p className="text-xs text-success mt-1">Running at 60 FPS</p>
              </div>
            </GlassCard>

            <GlassCard hover className="p-5 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-warning/10 rounded-full blur-xl group-hover:bg-warning/20 transition-all" />
              <div className="flex items-center gap-3 text-muted-foreground mb-4">
                <Zap className="size-5 text-warning" />
                <span className="text-sm font-medium">Global LR</span>
              </div>
              <div>
                <h3 className="text-3xl font-display font-medium text-foreground tracking-tight">3e-4</h3>
                <p className="text-xs text-muted-foreground mt-1">AdamW Optimizer</p>
              </div>
            </GlassCard>
            
            <GlassCard hover className="p-5 flex flex-col justify-between overflow-hidden relative group bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
              <div className="flex items-center gap-3 text-primary mb-4">
                <Infinity className="size-5" />
                <span className="text-sm font-semibold">Active Lab</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-medium text-foreground">Gradient Descent</h3>
                <p className="text-xs text-primary/80 mt-1">Currently optimizing cost surface</p>
              </div>
            </GlassCard>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <GlassCard hover={false} className="lg:col-span-2 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-lg flex items-center gap-2">
                    <Activity className="size-5 text-primary" /> Training Simulation Dynamics
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Simulated model convergence (Loss vs Accuracy)</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-primary" /> Loss</div>
                  <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-success" /> Accuracy</div>
                </div>
              </div>
              <div className="flex-1 min-h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorLoss" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.72 0.18 285)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="oklch(0.72 0.18 285)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAcc" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="currentColor" strokeOpacity={0.05} vertical={false} />
                    <XAxis dataKey="epoch" stroke="currentColor" strokeOpacity={0.4} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `Ep ${val}`} />
                    <YAxis stroke="currentColor" strokeOpacity={0.4} fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                    <Area type="step" dataKey="loss" stroke="oklch(0.72 0.18 285)" strokeWidth={3} fill="url(#colorLoss)" activeDot={{ r: 6, fill: "oklch(0.72 0.18 285)" }} />
                    <Area type="monotone" dataKey="accuracy" stroke="oklch(0.7 0.18 200)" strokeWidth={2} fill="url(#colorAcc)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard hover={false} className="p-6">
              <h3 className="font-display font-semibold text-lg flex items-center gap-2 mb-2">
                <GitMerge className="size-5 text-accent" /> Topology
              </h3>
              <p className="text-xs text-muted-foreground mb-6">Real-time architecture snapshot.</p>
              
              {/* Premium abstract neural network visual */}
              <div className="relative h-48 w-full rounded-xl bg-black/20 border border-white/5 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
                <div className="flex gap-8 items-center justify-center w-full z-10">
                  {/* Input Layer */}
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map(i => (
                      <motion.div key={`in-${i}`} initial={{ scale: 0.8 }} animate={{ scale: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="size-4 rounded-full bg-primary/40 border border-primary shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                    ))}
                  </div>
                  {/* Hidden Layer 1 */}
                  <div className="flex flex-col gap-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <motion.div key={`h1-${i}`} initial={{ scale: 0.8 }} animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }} className="size-3 rounded-full bg-accent/40 border border-accent shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                    ))}
                  </div>
                  {/* Output Layer */}
                  <div className="flex flex-col gap-4">
                    {[1, 2].map(i => (
                      <motion.div key={`out-${i}`} initial={{ scale: 0.8 }} animate={{ scale: [0.8, 1.1, 0.8] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }} className="size-5 rounded-full bg-success/40 border border-success shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
                    ))}
                  </div>
                </div>
                {/* Connecting lines overlay - simplified using svg */}
                <svg className="absolute inset-0 w-full h-full mix-blend-screen opacity-30 pointer-events-none">
                  <path d="M 80 80 Q 150 50 180 60" stroke="white" strokeWidth="1" fill="none" />
                  <path d="M 80 120 Q 150 100 180 120" stroke="white" strokeWidth="1" fill="none" />
                  <path d="M 80 160 Q 150 150 180 140" stroke="white" strokeWidth="1" fill="none" />
                  
                  <path d="M 220 60 Q 280 80 320 100" stroke="white" strokeWidth="1" fill="none" />
                  <path d="M 220 140 Q 280 120 320 160" stroke="white" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-muted-foreground">Parameters</div>
                  <div className="font-mono mt-0.5">2.4M</div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-muted-foreground">Layers</div>
                  <div className="font-mono mt-0.5">24</div>
                </div>
              </div>
            </GlassCard>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground/90 flex items-center gap-2">
              <CpuIcon className="size-5 text-accent" /> Analysis Modules
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <ModuleCard to="/perceptron" title="Perceptron + MLP" description="Interactive boundary training." icon={Brain} tag="Core" gradient="from-primary/40 to-accent/30" />
              <ModuleCard to="/activations" title="Activation Functions" description="Gradients & mapping." icon={Activity} tag="Analysis" gradient="from-accent/40 to-info/30" />
              <ModuleCard to="/gradient-descent" title="Gradient Descent" description="Cost surface mapping." icon={TrendingDown} tag="Optimizer" gradient="from-warning/40 to-destructive/30" />
              <ModuleCard to="/what-if" title="What-If Sandbox" description="Live state manipulation." icon={Wand2} tag="Sandbox" gradient="from-chart-5/40 to-primary/30" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
