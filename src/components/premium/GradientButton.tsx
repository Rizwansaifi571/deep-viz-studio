import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Variant = "primary" | "ghost" | "outline";
type Props = HTMLMotionProps<"button"> & { variant?: Variant; size?: "sm" | "md" | "lg" };

export const GradientButton = forwardRef<HTMLButtonElement, Props>(function GradientButton(
  { className, variant = "primary", size = "md", children, ...rest },
  ref,
) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
  }[size];

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-aurora text-primary-foreground shadow-glow-sm hover:shadow-glow",
    ghost:
      "bg-white/5 text-foreground hover:bg-white/10 border border-white/10",
    outline:
      "bg-transparent border border-white/15 text-foreground hover:bg-white/5",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all relative overflow-hidden",
        sizes,
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children as React.ReactNode}
    </motion.button>
  );
});
