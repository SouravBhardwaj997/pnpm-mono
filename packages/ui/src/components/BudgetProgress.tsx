import * as React from "react";
import { cn } from "../utils/cn";
import { motion } from "framer-motion";
import { Card } from "./Card";

interface BudgetProgressProps {
  category: string;
  spent: number;
  limit: number;
  className?: string;
}

export function BudgetProgress({
  category,
  spent,
  limit,
  className,
}: BudgetProgressProps) {
  const percentage = Math.min(Math.round((spent / limit) * 100), 100);
  const remaining = limit - spent;
  const isOverBudget = remaining < 0;

  return (
    <Card className={cn("p-4 space-y-4 border-zinc-100 dark:border-zinc-800", className)}>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest leading-none">
            {category}
          </h4>
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            ${spent.toLocaleString()} <span className="text-sm font-normal text-zinc-400">/ ${limit.toLocaleString()}</span>
          </p>
        </div>
        <div className="text-right">
          <p className={cn(
            "text-xs font-bold uppercase tracking-tighter",
            isOverBudget ? "text-rose-500" : "text-emerald-500"
          )}>
            {isOverBudget ? `OVER BY $${Math.abs(remaining).toLocaleString()}` : `$${remaining.toLocaleString()} left`}
          </p>
        </div>
      </div>

      <div className="relative h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full transition-all shadow-sm",
            percentage > 90 ? "bg-gradient-to-r from-rose-500 to-pink-500" : 
            percentage > 70 ? "bg-gradient-to-r from-amber-500 to-orange-500" : 
            "bg-gradient-to-r from-emerald-400 to-cyan-400"
          )}
        />
      </div>
    </Card>
  );
}
