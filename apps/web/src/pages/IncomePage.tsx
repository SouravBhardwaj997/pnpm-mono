import * as React from "react";
import { Button, Input, Card } from "@pnpm-mono/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  CreditCard,
  PlusCircle,
  Search,
  Filter,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  Receipt,
  LayoutDashboard,
  LogOut,
  DollarSign,
  FileText,
  Calendar,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorText from "../components/ErrorText";


const INCOME_METHODS = ["CARD", "CASH"] as const;
const INCOME_CATEGORIES = [
  { id: 1, label: "Salary" },
  { id: 2, label: "Freelance" },
  { id: 3, label: "Business" },
  { id: 4, label: "Investment" },
  { id: 5, label: "Rental" },
  { id: 6, label: "Gift" },
  { id: 7, label: "Other" },
];

interface Income {
  id: number;
  amount: number;
  note?: string;
  incomeMethod: "CARD" | "CASH";
  incomeCategoryId: number;
  date: string;
}

const seedIncome: Income[] = [
  { id: 1, amount: 75000, note: "Monthly salary — April", incomeMethod: "CARD", incomeCategoryId: 1, date: "2026-04-01" },
  { id: 2, amount: 15000, note: "Freelance project payment", incomeMethod: "CARD", incomeCategoryId: 2, date: "2026-04-03" },
  { id: 3, amount: 4500, note: "Dividend income", incomeMethod: "CARD", incomeCategoryId: 4, date: "2026-04-05" },
  { id: 4, amount: 12000, note: "Flat rental income", incomeMethod: "CASH", incomeCategoryId: 5, date: "2026-04-02" },
];

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "expenses", label: "Expenses", icon: CreditCard },
  { key: "income", label: "Income", icon: Receipt },
];

type FormDataType = {
  amount: string;
  note: string;
  incomeMethod: "CARD" | "CASH";
  incomeCategoryId: string;
};

const emptyForm: FormDataType = {
  amount: "",
  note: "",
  incomeMethod: "CARD",
  incomeCategoryId: "1",
};

export default function IncomePage() {
  const navigate = useNavigate();
  const [incomes, setIncomes] = React.useState<Income[]>(seedIncome);
  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [formData, setFormData] = React.useState<FormDataType>(emptyForm);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("all");
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const getCategoryLabel = (id: number) =>
    INCOME_CATEGORIES.find((c) => c.id === id)?.label ?? "Other";

  const filtered = React.useMemo(() => {
    return incomes.filter((e) => {
      const cat = getCategoryLabel(e.incomeCategoryId);
      const matchSearch =
        (e.note ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat =
        filterCategory === "all" || e.incomeCategoryId === Number(filterCategory);
      return matchSearch && matchCat;
    });
  }, [incomes, searchQuery, filterCategory]);

  const totalFiltered = filtered.reduce((s, e) => s + e.amount, 0);

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (income: Income) => {
    setEditingId(income.id);
    setFormData({
      amount: String(income.amount),
      note: income.note ?? "",
      incomeMethod: income.incomeMethod,
      incomeCategoryId: String(income.incomeCategoryId),
    });
    setErrors({});
    setShowForm(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0)
      newErrors.amount = "Amount must be a positive number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId !== null) {
      setIncomes((prev) =>
        prev.map((inc) =>
          inc.id === editingId
            ? {
                ...inc,
                amount: Number(formData.amount),
                note: formData.note || undefined,
                incomeMethod: formData.incomeMethod,
                incomeCategoryId: Number(formData.incomeCategoryId),
              }
            : inc
        )
      );
    } else {
      setIncomes((prev) => [
        {
          id: Date.now(),
          amount: Number(formData.amount),
          note: formData.note || undefined,
          incomeMethod: formData.incomeMethod,
          incomeCategoryId: Number(formData.incomeCategoryId),
          date: new Date().toISOString().split("T")[0],
        },
        ...prev,
      ]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const confirmDelete = (id: number) => setDeleteId(id);

  const handleDelete = () => {
    if (deleteId !== null) {
      setIncomes((prev) => prev.filter((e) => e.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between py-8 px-3 w-[72px] bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center justify-center mb-10">
            <div className="p-2 bg-cyan-500 rounded-xl shadow-md shadow-cyan-500/30">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => navigate(`/${key}`)}
                title={label}
                className={`w-full flex items-center justify-center p-3 rounded-2xl transition-all ${
                  key === "income"
                    ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500"
                    : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={() => navigate("/login")}
          title="Log Out"
          className="w-full flex items-center justify-center p-3 rounded-2xl text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors lg:hidden"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-emerald-500" />
                <span>Income</span>
              </h1>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">Track your earnings</p>
            </div>
          </div>
          <Button
            variant="gradient"
            size="sm"
            className="rounded-xl font-bold shadow-md shadow-cyan-500/20"
            onClick={openAddForm}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Income
          </Button>
        </header>

        <main className="flex-1 p-6 space-y-5 overflow-auto pb-24 lg:pb-6">
          {/* Summary strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Card className="p-4 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <p className="text-xs text-zinc-400 font-medium mb-1">Total Shown</p>
              <p className="text-2xl font-extrabold text-emerald-500 dark:text-emerald-400">
                ₹{totalFiltered.toLocaleString()}
              </p>
            </Card>
            <Card className="p-4 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <p className="text-xs text-zinc-400 font-medium mb-1">Transactions</p>
              <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">{filtered.length}</p>
            </Card>
            <Card className="p-4 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm col-span-2 sm:col-span-1">
              <p className="text-xs text-zinc-400 font-medium mb-1">Average</p>
              <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
                ₹{filtered.length ? Math.round(totalFiltered / filtered.length).toLocaleString() : 0}
              </p>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search income..."
                className="w-full h-11 pl-10 pr-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="h-11 pl-10 pr-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {INCOME_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Income list */}
          <Card className="border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
                  <Receipt className="w-8 h-8 text-zinc-400" />
                </div>
                <p className="font-semibold text-zinc-500 dark:text-zinc-400">No income found</p>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">Try adjusting your filters or add a new income</p>
              </div>
            ) : (
              <div>
                {/* Table header (desktop) */}
                <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-zinc-100 dark:border-zinc-800 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  <span>Note / Category</span>
                  <span className="text-right">Date</span>
                  <span className="text-right">Method</span>
                  <span className="text-right">Amount</span>
                  <span className="text-right">Actions</span>
                </div>
                <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
                  {filtered.map((income) => (
                    <motion.div
                      key={income.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto_auto] gap-2 sm:gap-4 items-center px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
                          {income.note ?? "—"}
                        </p>
                        <span className="inline-flex items-center mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                          {getCategoryLabel(income.incomeCategoryId)}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 font-medium text-right">{income.date}</span>
                      <span className={`text-xs font-bold text-right ${income.incomeMethod === "CARD" ? "text-blue-500" : "text-emerald-500"}`}>
                        {income.incomeMethod}
                      </span>
                      <span className="text-base font-extrabold text-emerald-500 dark:text-emerald-400 text-right">
                        +₹{income.amount.toLocaleString()}
                      </span>
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditForm(income)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(income.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 px-4 py-3 flex justify-around z-40">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => navigate(`/${key}`)} className={`flex flex-col items-center space-y-1 text-[10px] font-bold ${key === "income" ? "text-cyan-500" : "text-zinc-400"}`}>
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
        <button onClick={() => navigate("/login")} className="flex flex-col items-center space-y-1 text-[10px] font-bold text-zinc-400 hover:text-rose-500 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>

      {/* Add / Edit drawer */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] bg-white dark:bg-zinc-900 shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                    <Receipt className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h2 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
                    {editingId !== null ? "Edit Income" : "Add Income"}
                  </h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-xl text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Amount */}
                <div className="relative">
                  <DollarSign className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
                  <Input
                    label="Amount (₹)"
                    name="amount"
                    type="number"
                    min="1"
                    placeholder="0"
                    className="pl-11"
                    value={formData.amount}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, amount: e.target.value }));
                      if (errors.amount) setErrors((p) => ({ ...p, amount: "" }));
                    }}
                  />
                  {errors.amount && <ErrorText>{errors.amount}</ErrorText>}
                </div>

                {/* Note (optional) */}
                <div className="relative">
                  <FileText className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
                  <Input
                    label="Note (optional)"
                    name="note"
                    placeholder="Describe this income..."
                    className="pl-11"
                    value={formData.note}
                    onChange={(e) => setFormData((p) => ({ ...p, note: e.target.value }))}
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1 flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>Category</span>
                  </label>
                  <select
                    value={formData.incomeCategoryId}
                    onChange={(e) => setFormData((p) => ({ ...p, incomeCategoryId: e.target.value }))}
                    className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950/50 px-4 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
                  >
                    {INCOME_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Income method */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1 flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Income Method</span>
                  </label>
                  <div className="flex space-x-3">
                    {INCOME_METHODS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, incomeMethod: m }))}
                        className={`flex-1 h-12 rounded-2xl border text-sm font-bold transition-all ${
                          formData.incomeMethod === m
                            ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                            : "border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-600"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-cyan-500/20"
                  >
                    {editingId !== null ? "Update Income" : "Add Income"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setDeleteId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl max-w-sm w-full border border-zinc-100 dark:border-zinc-800">
                <div className="w-14 h-14 mx-auto bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-5">
                  <Trash2 className="w-7 h-7 text-rose-500" />
                </div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 text-center mb-2">
                  Delete Income?
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-6">
                  This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => setDeleteId(null)}>
                    Cancel
                  </Button>
                  <Button variant="danger" className="flex-1 rounded-2xl" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
