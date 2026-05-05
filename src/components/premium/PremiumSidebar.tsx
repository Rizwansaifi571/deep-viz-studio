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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/hooks/use-sidebar";

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
  const { isOpen, toggle } = useSidebar();

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isOpen ? 256 : 72 }}
      className="hidden lg:flex flex-col shrink-0 sticky top-0 h-screen p-4 border-r border-white/5 bg-[oklch(0.13_0.02_270/0.6)] backdrop-blur-xl relative z-20 overflow-hidden"
    >
      <button 
        onClick={toggle}
        className="absolute top-4 right-4 z-30 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
      >
        {isOpen ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
      </button>

      <Link to="/" className={cn("flex items-center gap-2.5 px-2 py-2 mt-8", !isOpen && "justify-center px-0")}>
        <div className="size-9 shrink-0 rounded-xl bg-gradient-aurora grid place-items-center shadow-glow-sm">
          <Brain className="size-5 text-primary-foreground" />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, w: 0 }}
              animate={{ opacity: 1, w: "auto" }}
              exit={{ opacity: 0, w: 0 }}
              className="leading-tight whitespace-nowrap overflow-hidden"
            >
              <div className="font-display font-semibold text-sm">Deep Learning</div>
              <div className="text-[11px] text-muted-foreground -mt-0.5">Toolbox · v1.0</div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      <nav className="mt-6 flex-1 space-y-1 scroll-thin overflow-y-auto overflow-x-hidden pt-2">
        {items.map((it) => {
          const active = path === it.to;
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "group relative flex items-center rounded-xl p-2.5 text-sm transition-colors",
                isOpen ? "gap-3 px-3" : "justify-center",
                active
                  ? "text-foreground bg-white/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]",
              )}
              title={!isOpen ? it.label : undefined}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/15 to-accent/10 border border-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className={cn("size-4 relative shrink-0", active && "text-primary")} />
              {isOpen && <span className="relative font-medium whitespace-nowrap">{it.label}</span>}
            </Link>
          );
        })}
      </nav>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="mt-4 glass rounded-2xl p-4 text-xs text-muted-foreground whitespace-nowrap overflow-hidden"
        >
          <div className="font-semibold text-foreground mb-1">Pro tip</div>
          Tweak parameters to see<br/>graphs update in real time.
        </motion.div>
      )}
    </motion.aside>
  );
}
