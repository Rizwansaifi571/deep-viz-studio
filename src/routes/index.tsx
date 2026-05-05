import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  ArrowRight,
  Activity,
  TrendingDown,
  ImageIcon,
  Waves,
  Wand2,
  Zap,
  GraduationCap,
  LineChart,
} from "lucide-react";
import { GradientButton } from "@/components/premium/GradientButton";
import { GlassCard } from "@/components/premium/GlassCard";
import { ModuleCard } from "@/components/premium/ModuleCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deep Learning Toolbox — Learn DL Interactively" },
      {
        name: "description",
        content:
          "A premium, interactive learning platform for deep learning. Visualize perceptrons, activations, gradient descent, CNNs and RNNs in real time.",
      },
      { property: "og:title", content: "Deep Learning Toolbox" },
      {
        property: "og:description",
        content:
          "Learn deep learning by changing parameters and watching graphs, losses and predictions update live.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Activity, title: "Live Visualizations", desc: "Every slider re-renders the plot, loss curve and prediction instantly." },
  { icon: GraduationCap, title: "Built to Teach", desc: "Plain-English explanations paired with the math that powers them." },
  { icon: Zap, title: "Zero-Setup Labs", desc: "Run experiments in the browser — no GPUs, no installs, no waiting." },
  { icon: LineChart, title: "Beautiful Charts", desc: "Crisp, animated charts inspired by the best SaaS analytics tools." },
];

function Landing() {
  return (
    <div className="min-h-screen w-full grid-bg">
      {/* Top nav */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-aurora grid place-items-center shadow-glow-sm">
              <Brain className="size-5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold">Deep Learning Toolbox</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#modules" className="hover:text-foreground transition">Modules</a>
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#how" className="hover:text-foreground transition">How it works</a>
          </nav>
          <Link to="/dashboard">
            <GradientButton size="sm">
              Open Dashboard <ArrowRight className="size-4" />
            </GradientButton>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs"
        >
          <Sparkles className="size-3.5 text-primary" />
          <span className="text-muted-foreground">A new way to learn deep learning</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 font-display text-5xl md:text-7xl font-semibold tracking-tight"
        >
          <span className="text-gradient">Master deep learning,</span>
          <br />
          <span className="text-gradient-primary">one slider at a time.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground"
        >
          Nine interactive labs that turn neural networks, activations,
          gradient descent, CNNs and RNNs into something you can{" "}
          <span className="text-foreground">see, touch and tune</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex items-center justify-center gap-3 flex-wrap"
        >
          <Link to="/dashboard">
            <GradientButton size="lg">
              Start exploring <ArrowRight className="size-4" />
            </GradientButton>
          </Link>
          <Link to="/perceptron">
            <GradientButton variant="ghost" size="lg">
              Try the Perceptron Lab
            </GradientButton>
          </Link>
        </motion.div>

        {/* Floating preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-aurora opacity-20 blur-3xl rounded-[3rem]" />
          <GlassCard hover={false} className="relative max-w-5xl mx-auto p-2 md:p-3">
            <div className="rounded-2xl bg-[oklch(0.12_0.02_270)] aspect-[16/9] overflow-hidden grid grid-cols-12 gap-3 p-4">
              <div className="col-span-3 space-y-2">
                {["Tutorial", "Concept", "Math", "Examples"].map((s) => (
                  <div key={s} className="glass rounded-lg px-3 py-2 text-xs text-muted-foreground">{s}</div>
                ))}
              </div>
              <div className="col-span-6 glass rounded-xl flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0%" stopColor="oklch(0.72 0.18 285)" />
                      <stop offset="100%" stopColor="oklch(0.7 0.18 200)" />
                    </linearGradient>
                  </defs>
                  <path d="M0,160 C80,80 160,180 240,90 C300,30 360,120 400,60" stroke="url(#g)" strokeWidth="3" fill="none" />
                  <path d="M0,160 C80,80 160,180 240,90 C300,30 360,120 400,60 L400,200 L0,200 Z" fill="url(#g)" opacity="0.15" />
                </svg>
              </div>
              <div className="col-span-3 space-y-2">
                {["Learning rate", "Epochs", "Hidden units", "Activation"].map((s) => (
                  <div key={s} className="glass rounded-lg p-2">
                    <div className="text-[10px] text-muted-foreground">{s}</div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-aurora" style={{ width: `${30 + Math.random() * 60}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-gradient">Designed for intuition</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Every module follows the same rhythm: read, play, observe, master.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <GlassCard key={f.title}>
              <div className="size-10 rounded-xl bg-gradient-aurora grid place-items-center shadow-glow-sm mb-3">
                <f.icon className="size-5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gradient">Nine premium labs</h2>
            <p className="mt-2 text-muted-foreground">Everything from a single neuron to recurrent sequences.</p>
          </div>
          <Link to="/dashboard" className="text-sm text-primary hover:underline hidden md:flex items-center gap-1">
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ModuleCard to="/perceptron" title="Perceptron + MLP" description="See decision boundaries form as a single neuron learns to separate classes." icon={Brain} tag="Foundations" gradient="from-primary/30 to-accent/20" />
          <ModuleCard to="/activations" title="Activation Functions" description="Compare sigmoid, ReLU, tanh and leaky ReLU with live derivatives." icon={Activity} tag="Theory" gradient="from-accent/30 to-info/20" />
          <ModuleCard to="/gradient-descent" title="Gradient Descent" description="Watch optimization paths descend a loss surface — and explode." icon={TrendingDown} tag="Optimization" gradient="from-warning/30 to-destructive/20" />
          <ModuleCard to="/explain" title="Explain Model" description="Inspect feature importance, confidence, metrics and confusion matrices." icon={Sparkles} tag="Interpretability" gradient="from-success/30 to-accent/20" />
          <ModuleCard to="/what-if" title="What-If Playground" description="Tweak inputs, see predictions change, and replay your scenarios." icon={Wand2} tag="Sandbox" gradient="from-chart-5/30 to-primary/20" />
          <ModuleCard to="/cnn" title="CNN + OpenCV Lab" description="Apply convolution kernels to images and visualize feature maps." icon={ImageIcon} tag="Vision" gradient="from-info/30 to-primary/20" />
          <ModuleCard to="/rnn" title="RNN Sequence Visualizer" description="Track hidden states across time and predict the next value or sentiment." icon={Waves} tag="Sequences" gradient="from-primary/30 to-chart-5/20" />
        </div>
      </section>

      {/* CTA */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-24">
        <GlassCard hover={false} glow className="p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-aurora opacity-10" />
          <h2 className="relative font-display text-3xl md:text-5xl font-semibold text-gradient">
            Ready to think like a neural network?
          </h2>
          <p className="relative mt-4 text-muted-foreground max-w-xl mx-auto">
            Open the dashboard and pick a lab. Every concept is one slider away.
          </p>
          <div className="relative mt-8 flex justify-center gap-3">
            <Link to="/dashboard"><GradientButton size="lg">Launch dashboard <ArrowRight className="size-4" /></GradientButton></Link>
          </div>
        </GlassCard>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-muted-foreground">
        Built with ❤️ — Deep Learning Toolbox · Premium Edition
      </footer>
    </div>
  );
}
