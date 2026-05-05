import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Props = HTMLMotionProps<"div"> & { hover?: boolean; glow?: boolean };

export const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  { className, hover = true, glow = false, children, ...rest },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={cn(
        "glass rounded-2xl p-6 shadow-elegant relative overflow-hidden",
        glow && "shadow-glow-sm",
        className,
      )}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children as React.ReactNode}
    </motion.div>
  );
});
