import { Bell, Github, Search, Sparkles } from "lucide-react";
import { GradientButton } from "./GradientButton";

export function PremiumNavbar({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 lg:px-8 h-16 border-b border-white/5 bg-[oklch(0.14_0.02_270/0.6)] backdrop-blur-xl">
      <div className="min-w-0">
        {title && (
          <h1 className="font-display font-semibold text-base sm:text-lg truncate">
            {title}
          </h1>
        )}
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-full glass text-xs text-muted-foreground w-64">
          <Search className="size-3.5" />
          Search modules, formulas…
          <kbd className="ml-auto px-1.5 py-0.5 rounded bg-white/5 text-[10px]">⌘K</kbd>
        </div>
        <button className="size-9 grid place-items-center rounded-full glass hover:bg-white/10 transition">
          <Bell className="size-4" />
        </button>
        <a
          href="https://github.com"
          className="size-9 grid place-items-center rounded-full glass hover:bg-white/10 transition"
        >
          <Github className="size-4" />
        </a>
        <GradientButton size="sm" className="hidden sm:inline-flex">
          <Sparkles className="size-4" />
          Upgrade
        </GradientButton>
      </div>
    </header>
  );
}
