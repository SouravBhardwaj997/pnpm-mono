import * as React from "react";
import { cn } from "../utils/cn";
import { Card } from "./Card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  amount: string | number;
  description?: string;
  trend?: {
    value: string | number;
    type: "up" | "down";
  };
  icon?: LucideIcon;
  variant?: "blue" | "emerald" | "amber" | "rose" | "cyan";
  className?: string;
}

export function StatCard({
  title,
  amount,
  description,
  trend,
  icon: Icon,
  variant = "cyan",
  className,
}: StatCardProps) {
  const variants = {
    blue: "from-blue-500/20 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    emerald: "from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    amber: "from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    rose: "from-rose-500/20 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    cyan: "from-cyan-500/20 to-sky-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-gradient-to-br border shadow-lg transition-transform hover:scale-[1.02]",
        variants[variant],
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-4xl font-bold tracking-tight">{amount}</p>
        </div>
        {Icon && (
          <div className="p-3 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-sm shadow-inner">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center space-x-2">
        {trend && (
          <div
            className={cn(
              "flex items-center text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-md",
              trend.type === "up" 
                ? "bg-emerald-500/10 text-emerald-600" 
                : "bg-rose-500/10 text-rose-600"
            )}
          >
            {trend.type === "up" ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {trend.value}%
          </div>
        )}
        {description && (
          <p className="text-xs font-medium opacity-70">{description}</p>
        )}
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 dark:bg-black/10 rounded-full blur-3xl pointer-events-none" />
    </Card>
  );
}
