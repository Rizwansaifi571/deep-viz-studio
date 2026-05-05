import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Brain,
  Activity,
  TrendingDown,
  Sparkles,
  Wand2,
  ImageIcon,
  Waves,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/perceptron", label: "Perceptron + MLP", icon: Brain },
  { to: "/activations", label: "Activations", icon: Activity },
  { to: "/gradient-descent", label: "Gradient Descent", icon: TrendingDown },
  { to: "/explain", label: "Explain Model", icon: Sparkles },
  { to: "/what-if", label: "What-If Lab", icon: Wand2 },
  { to: "/cnn", label: "CNN + OpenCV", icon: ImageIcon },
  { to: "/rnn", label: "RNN Sequences", icon: Waves },
] as const;

export function PremiumSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-0 h-screen p-4 border-r border-white/5 bg-[oklch(0.13_0.02_270/0.6)] backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-2.5 px-2 py-3">
        <div className="size-9 rounded-xl bg-gradient-aurora grid place-items-center shadow-glow-sm">
          <Brain className="size-5 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <div className="font-display font-semibold text-sm">Deep Learning</div>
          <div className="text-[11px] text-muted-foreground -mt-0.5">Toolbox · v1.0</div>
        </div>
      </Link>

      <nav className="mt-4 flex-1 space-y-1 scroll-thin overflow-y-auto">
        {items.map((it) => {
          const active = path === it.to;
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "text-foreground bg-white/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]",
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/15 to-accent/10 border border-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className={cn("size-4 relative", active && "text-primary")} />
              <span className="relative font-medium">{it.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 glass rounded-2xl p-4 text-xs text-muted-foreground">
        <div className="font-semibold text-foreground mb-1">Pro tip</div>
        Tweak parameters on the right panel to see graphs update in real time.
      </div>
    </aside>
  );
}
