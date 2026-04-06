import * as React from "react";
import { cn } from "../utils/cn";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "rounded-3xl border border-white/20 p-6 shadow-xl transition-all duration-300",
          glass
            ? "bg-white/10 backdrop-blur-md dark:bg-black/20"
            : "bg-white dark:bg-zinc-950",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
