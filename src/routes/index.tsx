import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  CircuitBoard,
  Cpu,
  Eye,
  GraduationCap,
  ImageIcon,
  Layers3,
  LineChart,
  Lock,
  MousePointer2,
  Play,
  Sparkles,
  TrendingDown,
  Wand2,
  Waves,
  Zap,
} from "lucide-react";
import { GradientButton } from "@/components/premium/GradientButton";
import { GlassCard } from "@/components/premium/GlassCard";
import { ModuleCard } from "@/components/premium/ModuleCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deep Learning Toolbox — Premium Interactive AI Learning" },
      {
        name: "description",
        content:
          "A premium, interactive SaaS-style platform for learning deep learning through real-time visual labs, animated concepts, and hands-on AI experiments.",
      },
      { property: "og:title", content: "Deep Learning Toolbox" },
      {
        property: "og:description",
        content:
          "Learn neural networks, activations, gradient descent, CNNs and RNNs with premium interactive visualizations.",
      },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
    },
  },
};

const features = [
  {
    icon: Activity,
    title: "Live Neural Visuals",
    desc: "Change a slider and instantly watch graphs, losses, decision boundaries and predictions react.",
  },
  {
    icon: GraduationCap,
    title: "Concept-First Learning",
    desc: "Every lab combines intuition, clean explanations and the exact math behind the model.",
  },
  {
    icon: Zap,
    title: "Zero Setup Labs",
    desc: "Run experiments directly in the browser without installing dependencies or configuring GPUs.",
  },
  {
    icon: LineChart,
    title: "Premium Analytics UI",
    desc: "Beautiful dashboards, smooth charts and SaaS-grade module cards for every deep learning topic.",
  },
];

const stats = [
  { value: "09", label: "Interactive labs" },
  { value: "40+", label: "Live visual controls" },
  { value: "0", label: "Setup required" },
  { value: "100%", label: "Browser based" },
];

const storySteps = [
  {
    icon: MousePointer2,
    eyebrow: "01 · Interact",
    title: "Move sliders. Break assumptions.",
    desc: "Start with a concept, then tune the parameters yourself. Learning becomes visual, fast and memorable.",
  },
  {
    icon: Eye,
    eyebrow: "02 · Observe",
    title: "Watch the model think in real time.",
    desc: "See decision boundaries, loss curves, activations and feature maps update as the model changes.",
  },
  {
    icon: Brain,
    eyebrow: "03 · Understand",
    title: "Connect intuition with deep learning math.",
    desc: "Each lab explains what is happening behind the screen so you understand the why, not just the output.",
  },
];

const modules = [
  {
    to: "/perceptron",
    title: "Perceptron + MLP",
    description: "See decision boundaries form as a single neuron learns to separate classes.",
    icon: Brain,
    tag: "Foundations",
    gradient: "from-primary/30 to-accent/20",
  },
  {
    to: "/activations",
    title: "Activation Functions",
    description: "Compare sigmoid, ReLU, tanh and leaky ReLU with live derivatives.",
    icon: Activity,
    tag: "Theory",
    gradient: "from-accent/30 to-info/20",
  },
  {
    to: "/gradient-descent",
    title: "Gradient Descent",
    description: "Watch optimization paths descend a loss surface — and explode when tuned poorly.",
    icon: TrendingDown,
    tag: "Optimization",
    gradient: "from-warning/30 to-destructive/20",
  },
  {
    to: "/explain",
    title: "Explain Model",
    description: "Inspect feature importance, confidence, metrics and confusion matrices.",
    icon: Sparkles,
    tag: "Interpretability",
    gradient: "from-success/30 to-accent/20",
  },
  {
    to: "/what-if",
    title: "What-If Playground",
    description: "Tweak inputs, see predictions change, and replay your model scenarios.",
    icon: Wand2,
    tag: "Sandbox",
    gradient: "from-chart-5/30 to-primary/20",
  },
  {
    to: "/cnn",
    title: "CNN + OpenCV Lab",
    description: "Apply convolution kernels to images and visualize feature maps layer by layer.",
    icon: ImageIcon,
    tag: "Vision",
    gradient: "from-info/30 to-primary/20",
  },
  {
    to: "/rnn",
    title: "RNN Sequence Visualizer",
    description: "Track hidden states across time and predict the next value or sentiment.",
    icon: Waves,
    tag: "Sequences",
    gradient: "from-primary/30 to-chart-5/20",
  },
];

function PremiumBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-muted-foreground shadow-2xl shadow-primary/10 backdrop-blur-xl">
      <Sparkles className="size-3.5 text-primary" />
      {children}
    </div>
  );
}

function FloatingOrb({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        y: [0, -18, 0],
        scale: [1, 1.04, 1],
      }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute rounded-full bg-gradient-aurora opacity-25 blur-3xl ${className}`}
    />
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
      className="relative mx-auto mt-16 max-w-6xl"
    >
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-aurora opacity-20 blur-3xl" />

      <GlassCard hover={false} className="relative overflow-hidden border-white/10 p-2 shadow-2xl shadow-primary/10 md:p-3">
        <div className="rounded-[1.5rem] border border-white/10 bg-[oklch(0.105_0.025_270)] p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-destructive/80" />
              <span className="size-3 rounded-full bg-warning/80" />
              <span className="size-3 rounded-full bg-success/80" />
            </div>
            <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-muted-foreground md:block">
              /dashboard/deep-learning-lab
            </div>
            <div className="flex items-center gap-2 text-xs text-success">
              <span className="size-2 rounded-full bg-success shadow-[0_0_14px_oklch(0.72_0.17_150)]" />
              Live
            </div>
          </div>

          <div className="grid min-h-[520px] gap-4 lg:grid-cols-[240px_1fr_280px]">
            <aside className="hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 lg:block">
              <div className="mb-5 flex items-center gap-2">
                <div className="grid size-9 place-items-center rounded-xl bg-gradient-aurora shadow-glow-sm">
                  <CircuitBoard className="size-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Neural Lab</p>
                  <p className="text-xs text-muted-foreground">Premium workspace</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  ["Perceptron", "active"],
                  ["Activations", ""],
                  ["Gradient Descent", ""],
                  ["CNN Vision", ""],
                  ["RNN Sequence", ""],
                ].map(([item, state]) => (
                  <div
                    key={item}
                    className={`rounded-xl px-3 py-2.5 text-sm transition ${
                      state
                        ? "bg-primary/15 text-foreground ring-1 ring-primary/25"
                        : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-xs text-muted-foreground">Training progress</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: "20%" }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse" }}
                    className="h-full rounded-full bg-gradient-aurora"
                  />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Loss improving · 78%</p>
              </div>
            </aside>

            <main className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 md:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(130,90,255,0.18),transparent_45%)]" />
              <div className="relative flex flex-col gap-4">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-primary">Interactive model</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold">Decision Boundary Visualizer</h3>
                    <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                      Tune weights, bias and learning rate to see how a neural model learns from data.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-muted-foreground">
                    <Cpu className="size-3.5 text-primary" />
                    Epoch 124
                  </div>
                </div>

                <div className="relative mt-2 grid min-h-[320px] place-items-center overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:36px_36px]" />
                  <svg viewBox="0 0 680 340" className="relative h-full min-h-[320px] w-full">
                    <defs>
                      <linearGradient id="boundary" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.72 0.18 285)" />
                        <stop offset="100%" stopColor="oklch(0.7 0.18 200)" />
                      </linearGradient>
                      <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.12" />
                      </radialGradient>
                    </defs>
                    <motion.path
                      d="M40,265 C155,120 230,270 345,155 C455,45 540,190 640,78"
                      stroke="url(#boundary)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                    />
                    <path
                      d="M40,265 C155,120 230,270 345,155 C455,45 540,190 640,78 L640,340 L40,340 Z"
                      fill="url(#boundary)"
                      opacity="0.12"
                    />
                    {[
                      [95, 228],
                      [130, 172],
                      [178, 240],
                      [238, 156],
                      [295, 210],
                      [375, 132],
                      [420, 78],
                      [488, 138],
                      [540, 196],
                      [590, 110],
                    ].map(([cx, cy], index) => (
                      <motion.circle
                        key={`${cx}-${cy}`}
                        cx={cx}
                        cy={cy}
                        r={index % 2 === 0 ? 6 : 8}
                        fill={index % 2 === 0 ? "oklch(0.72 0.18 285)" : "oklch(0.7 0.18 200)"}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.07, duration: 0.35 }}
                      />
                    ))}
                    <circle cx="345" cy="155" r="48" fill="url(#dotGlow)" opacity="0.09" />
                  </svg>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    ["Accuracy", "94.8%", "+12.3%"],
                    ["Loss", "0.084", "-38.2%"],
                    ["Learning Rate", "0.03", "stable"],
                  ].map(([label, value, change]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <div className="mt-2 flex items-end justify-between gap-3">
                        <p className="font-display text-2xl font-semibold">{value}</p>
                        <p className="text-xs text-success">{change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>

            <aside className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Model Controls</p>
                  <p className="text-xs text-muted-foreground">Tune parameters live</p>
                </div>
                <BarChart3 className="size-5 text-primary" />
              </div>

              <div className="space-y-4">
                {[
                  ["Learning rate", "68%"],
                  ["Hidden units", "42%"],
                  ["Regularization", "76%"],
                  ["Confidence", "88%"],
                ].map(([label, width]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-muted-foreground">{label}</span>
                      <span>{width}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-aurora"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/10 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="size-4 text-primary" />
                  AI Insight
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  The model is converging smoothly. Try reducing the learning rate to compare a slower but safer path.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function Landing() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-background text-foreground grid-bg">
      <div className="pointer-events-none fixed inset-0 z-0">
        <FloatingOrb className="left-[-12rem] top-[-10rem] size-[34rem]" />
        <FloatingOrb className="right-[-14rem] top-[20rem] size-[30rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,90,255,0.16),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(30,200,255,0.08),transparent_30%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/45 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-aurora shadow-glow-sm">
              <Brain className="size-5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold tracking-tight">Deep Learning Toolbox</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#product" className="transition hover:text-foreground">Product</a>
            <a href="#features" className="transition hover:text-foreground">Features</a>
            <a href="#scrollytelling" className="transition hover:text-foreground">Experience</a>
            <a href="#modules" className="transition hover:text-foreground">Labs</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/perceptron" className="hidden text-sm text-muted-foreground transition hover:text-foreground sm:block">
              Try demo
            </Link>
            <Link to="/dashboard">
              <GradientButton size="sm">
                Open Dashboard <ArrowRight className="size-4" />
              </GradientButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="product" className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 text-center md:pb-28 md:pt-24">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} transition={{ duration: 0.65 }}>
              <PremiumBadge>Premium AI learning workspace for deep learning</PremiumBadge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.05 }}
              className="mx-auto mt-7 max-w-6xl font-display text-5xl font-semibold tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Learn deep learning through a
              <span className="text-gradient"> premium visual interface.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.12 }}
              className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-xl"
            >
              A polished interactive platform that turns neural networks, gradient descent, CNNs and RNNs into real-time visual labs you can see, touch and tune.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Link to="/dashboard">
                <GradientButton size="lg">
                  Launch Dashboard <ArrowRight className="size-4" />
                </GradientButton>
              </Link>
              <Link to="/perceptron">
                <GradientButton variant="ghost" size="lg">
                  <Play className="size-4" /> Watch Lab Demo
                </GradientButton>
              </Link>
            </motion.div>
          </motion.div>

          <HeroPreview />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
                <p className="font-display text-3xl font-semibold text-gradient-primary">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeUp}>
              <PremiumBadge>Built like a modern SaaS product</PremiumBadge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Everything feels fast, visual and intuitive.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              From the first scroll to the final lab, the experience is designed to feel clean, premium and technically impressive.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeUp} transition={{ duration: 0.55 }}>
                <GlassCard className="h-full p-6">
                  <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-gradient-aurora shadow-glow-sm">
                    <feature.icon className="size-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="scrollytelling" className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <motion.div style={{ y: y1 }} className="absolute left-4 top-24 hidden size-40 rounded-full bg-primary/20 blur-3xl lg:block" />
          <motion.div style={{ y: y2 }} className="absolute bottom-24 right-4 hidden size-48 rounded-full bg-accent/20 blur-3xl lg:block" />

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <PremiumBadge>Scrollytelling learning flow</PremiumBadge>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
                Scroll through the journey of a model learning.
              </h2>
              <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
                Instead of static theory, each section reveals the model lifecycle step by step — interaction, observation and understanding.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                {[
                  "Animated concepts",
                  "Live feedback",
                  "Premium interface",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
                    <CheckCircle2 className="size-4 text-success" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {storySteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 42 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                >
                  <GlassCard className="overflow-hidden p-0">
                    <div className="grid gap-0 md:grid-cols-[1fr_260px]">
                      <div className="p-7 md:p-8">
                        <div className="mb-5 flex items-center gap-3">
                          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-aurora shadow-glow-sm">
                            <step.icon className="size-6 text-primary-foreground" />
                          </div>
                          <p className="text-xs uppercase tracking-[0.28em] text-primary">{step.eyebrow}</p>
                        </div>
                        <h3 className="font-display text-2xl font-semibold md:text-3xl">{step.title}</h3>
                        <p className="mt-3 leading-7 text-muted-foreground">{step.desc}</p>
                      </div>

                      <div className="relative min-h-[220px] overflow-hidden border-t border-white/10 bg-black/20 md:border-l md:border-t-0">
                        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]" />
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                          className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.7, 0.35] }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-aurora blur-xl"
                        />
                        <div className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/10 bg-background/70 backdrop-blur-xl">
                          <step.icon className="size-7 text-primary" />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="modules" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <PremiumBadge>Complete deep learning lab suite</PremiumBadge>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
                Premium labs for every core concept.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
                Move from fundamentals to computer vision and sequence models with a consistent, visual learning system.
              </p>
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-primary transition hover:underline">
              View all labs <ArrowRight className="size-4" />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {modules.map((module) => (
              <motion.div key={module.title} variants={fadeUp} transition={{ duration: 0.55 }}>
                <ModuleCard {...module} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24">
          <GlassCard hover={false} glow className="relative overflow-hidden p-8 text-center md:p-14">
            <div className="absolute inset-0 bg-gradient-aurora opacity-10" />
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
            <div className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-aurora shadow-glow-sm">
              <Layers3 className="size-8 text-primary-foreground" />
            </div>
            <h2 className="relative mx-auto mt-7 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Turn theory into intuition today.
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Open the dashboard, pick a lab and start exploring deep learning through a premium interactive experience.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/dashboard">
                <GradientButton size="lg">
                  Launch Dashboard <ArrowRight className="size-4" />
                </GradientButton>
              </Link>
              <Link to="/cnn">
                <GradientButton variant="ghost" size="lg">
                  Explore CNN Lab
                </GradientButton>
              </Link>
            </div>
          </GlassCard>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center text-xs text-muted-foreground md:flex-row md:text-left">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-gradient-aurora">
              <Brain className="size-4 text-primary-foreground" />
            </div>
            <span>Deep Learning Toolbox · Premium Edition</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="size-3.5" />
            Built for fast, visual and interactive AI learning
          </div>
        </div>
      </footer>
    </div>
  );
}
