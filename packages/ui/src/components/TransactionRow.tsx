import * as React from "react";
import { cn } from "../utils/cn";
import { CategoryBadge } from "./CategoryBadge";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, LucideIcon } from "lucide-react";

interface TransactionRowProps {
  id: string | number;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  icon?: LucideIcon;
  className?: string;
}

export function TransactionRow({
  description,
  category,
  amount,
  date,
  type,
  icon: Icon,
  className,
}: TransactionRowProps) {
  const isIncome = type === "income";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(0,0,0,0.02)" }}
      className={cn(
        "flex items-center justify-between p-4 rounded-3xl border border-white/10 glass-card bg-white/5 backdrop-blur-sm shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-950/20",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        <div 
          className={cn(
            "p-3 rounded-2xl flex items-center justify-center shadow-inner",
            isIncome 
              ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" 
              : "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
          )}
        >
          {Icon ? <Icon className="w-5 h-5" /> : (
            isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />
          )}
        </div>
        <div className="space-y-0.5">
          <p className="font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            {description}
          </p>
          <div className="flex items-center space-x-2">
            <CategoryBadge category={category} className="h-5 text-[10px]" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {date}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p 
          className={cn(
            "text-lg font-bold tracking-tight",
            isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
          )}
        >
          {isIncome ? "+" : "-"}${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
    </motion.div>
  );
}
