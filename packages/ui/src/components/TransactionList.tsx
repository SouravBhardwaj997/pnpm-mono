import * as React from "react";
import { cn } from "../utils/cn";
import { TransactionRow } from "./TransactionRow";
import { motion, AnimatePresence } from "framer-motion";
import { ReceiptText, SearchX } from "lucide-react";

interface Transaction {
  id: string | number;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
  className?: string;
}

export function TransactionList({
  transactions,
  isLoading,
  className,
}: TransactionListProps) {
  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 w-full animate-pulse rounded-3xl bg-zinc-100 dark:bg-zinc-800" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("flex flex-col items-center justify-center p-12 text-center space-y-4", className)}
      >
        <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 shadow-inner">
          <SearchX className="w-10 h-10 text-zinc-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">No transactions found</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Try adding a new expense or changing your filters.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center">
          <ReceiptText className="w-4 h-4 mr-2" />
          Recent Transactions
        </h3>
        <button className="text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors uppercase tracking-tight">
          See All
        </button>
      </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} {...transaction} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
