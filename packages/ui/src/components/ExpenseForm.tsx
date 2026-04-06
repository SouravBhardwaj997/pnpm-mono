import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "./Button";
import { Input } from "./Input";
import { Card } from "./Card";
import { PlusCircle, Wallet, Calendar, Tag, FileText } from "lucide-react";

interface ExpenseFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function ExpenseForm({ onSubmit, isLoading }: ExpenseFormProps) {
  const [formData, setFormData] = React.useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    type: "expense",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, amount: parseFloat(formData.amount) });
  };

  return (
    <Card className="p-8 shadow-2xl border-white/20 dark:border-zinc-800">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-cyan-500 rounded-2xl shadow-lg shadow-cyan-500/20">
          <PlusCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">New Transaction</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Add a new income or expense to your tracker.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative">
              <FileText className="absolute left-4 top-11 w-4 h-4 text-zinc-400" />
              <Input
                label="Description"
                name="description"
                placeholder="Rent, Groceries, etc."
                value={formData.description}
                onChange={handleChange}
                className="pl-11"
                required
              />
            </div>
            
            <div className="relative">
              <Wallet className="absolute left-4 top-11 w-4 h-4 text-zinc-400" />
              <Input
                label="Amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                className="pl-11"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1 flex items-center">
                <Tag className="w-4 h-4 mr-2 text-zinc-400" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-12 rounded-2xl border border-zinc-200 bg-white/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 backdrop-blur-sm transition-all dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-50"
              >
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Salary">Salary</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-11 w-4 h-4 text-zinc-400" />
              <Input
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="pl-11"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button
            type="button"
            variant={formData.type === "expense" ? "danger" : "outline"}
            onClick={() => setFormData(prev => ({ ...prev, type: "expense" }))}
            className="flex-1 rounded-2xl"
          >
            Expense
          </Button>
          <Button
            type="button"
            variant={formData.type === "income" ? "gradient" : "outline"}
            onClick={() => setFormData(prev => ({ ...prev, type: "income" }))}
            className="flex-1 rounded-2xl"
          >
            Income
          </Button>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
          isLoading={isLoading}
        >
          Add {formData.type === "expense" ? "Expense" : "Income"}
        </Button>
      </form>
    </Card>
  );
}
