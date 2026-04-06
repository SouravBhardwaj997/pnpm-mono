import * as React from "react";
import { StatCard, TransactionRow, Card } from "@pnpm-mono/ui";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  PieChart,
  ArrowUpRight,
  Bell,
  Settings,
  LogOut,
  LayoutDashboard,
  Receipt,
  CreditCard,
} from "lucide-react";

const mockTransactions = [
  { id: 1, description: "Netflix Subscription", category: "Entertainment", amount: 499, date: "Today, 10:32 AM", type: "expense" as const },
  { id: 2, description: "Freelance Payment", category: "Salary", amount: 15000, date: "Yesterday, 3:15 PM", type: "income" as const },
  { id: 3, description: "Grocery Store", category: "Food", amount: 1240, date: "Apr 4, 7:00 PM", type: "expense" as const },
  { id: 4, description: "Apartment Rent", category: "Rent", amount: 22000, date: "Apr 1, 12:00 PM", type: "expense" as const },
  { id: 5, description: "Monthly Salary", category: "Salary", amount: 75000, date: "Apr 1, 9:00 AM", type: "income" as const },
];

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "expenses", label: "Expenses", icon: CreditCard },
  { key: "income", label: "Income", icon: Receipt },
];



export default function DashboardPage() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = React.useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleNav = (key: string) => {
    setActivePage(key);
    setSidebarOpen(false);
    navigate(`/${key}`);
  };

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col justify-between py-8 px-3 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden"
      >
        {/* Logo */}
        <div>
          <div
            className="flex items-center space-x-3 mb-10 px-2 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <div className="flex-shrink-0 p-2 bg-cyan-500 rounded-xl shadow-md shadow-cyan-500/30">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-extrabold text-zinc-900 dark:text-white text-lg tracking-tight whitespace-nowrap"
              >
                SpendWise
              </motion.span>
            )}
          </div>

          {/* Nav items */}
          <nav className="space-y-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-2xl transition-all font-medium text-sm group ${
                  activePage === key
                    ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 shadow-sm"
                    : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${activePage === key ? "text-cyan-500" : ""}`} />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="space-y-1">
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-2xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all text-sm font-medium">
            <Settings className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Settings</motion.span>}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all text-sm font-medium"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Log Out</motion.span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Good morning, Sourav 👋
            </h1>
            <p className="text-xs text-zinc-400 font-medium mt-0.5">Here's your financial overview for April 2026</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
              SB
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* KPI cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            <StatCard
              title="Total Balance"
              amount="₹1,24,500"
              description="As of today"
              icon={Wallet}
              variant="cyan"
              trend={{ value: 8.2, type: "up" }}
            />
            <StatCard
              title="Monthly Income"
              amount="₹90,000"
              description="This month"
              icon={TrendingUp}
              variant="emerald"
              trend={{ value: 12.5, type: "up" }}
            />
            <StatCard
              title="Monthly Expenses"
              amount="₹23,739"
              description="This month"
              icon={TrendingDown}
              variant="rose"
              trend={{ value: 3.1, type: "down" }}
            />
            <StatCard
              title="Net Savings"
              amount="₹66,261"
              description="This month"
              icon={DollarSign}
              variant="amber"
              trend={{ value: 5.4, type: "up" }}
            />
          </motion.div>

          {/* Charts + overview row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Spending trend */}
            <Card className="xl:col-span-2 p-6 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-lg tracking-tight">Spending Trend</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Last 6 months</p>
                </div>
                <div className="flex items-center space-x-3 text-xs font-medium">
                  <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-cyan-400 inline-block"/>Income</span>
                  <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-rose-400 inline-block"/>Expense</span>
                </div>
              </div>
              {/* Simple bar chart */}
              <div className="flex items-end space-x-3 h-36">
                {[
                  { month: "Nov", income: 70, expense: 40 },
                  { month: "Dec", income: 85, expense: 60 },
                  { month: "Jan", income: 65, expense: 45 },
                  { month: "Feb", income: 90, expense: 55 },
                  { month: "Mar", income: 78, expense: 48 },
                  { month: "Apr", income: 95, expense: 35 },
                ].map(({ month, income, expense }) => (
                  <div key={month} className="flex-1 flex flex-col items-center space-y-1">
                    <div className="w-full flex items-end justify-center space-x-1">
                      <div
                        className="flex-1 bg-cyan-400/80 dark:bg-cyan-500/60 rounded-t-lg transition-all"
                        style={{ height: `${income}%` }}
                      />
                      <div
                        className="flex-1 bg-rose-400/80 dark:bg-rose-500/60 rounded-t-lg transition-all"
                        style={{ height: `${expense}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">{month}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Category breakdown */}
            <Card className="p-6 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <PieChart className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Top Categories</h3>
                  <p className="text-xs text-zinc-400">This month</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Rent", amount: "₹22,000", pct: 93, color: "bg-rose-400" },
                  { label: "Food", amount: "₹1,240", pct: 52, color: "bg-amber-400" },
                  { label: "Entertainment", amount: "₹499", pct: 21, color: "bg-blue-400" },
                ].map(({ label, amount, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-50">{amount}</span>
                    </div>
                    <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full rounded-full ${color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate("/expenses")}
                  className="flex items-center justify-center space-x-1.5 p-3 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Expenses</span>
                </button>
                <button
                  onClick={() => navigate("/income")}
                  className="flex items-center justify-center space-x-1.5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Income</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Recent transactions */}
          <Card className="p-6 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-lg tracking-tight">Recent Transactions</h3>
              <button
                onClick={() => navigate("/expenses")}
                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {mockTransactions.map((tx) => (
                <TransactionRow
                  key={tx.id}
                  id={tx.id}
                  description={tx.description}
                  category={tx.category}
                  amount={tx.amount}
                  date={tx.date}
                  type={tx.type}
                />
              ))}
            </div>
          </Card>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 px-4 py-3 flex justify-around z-40">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => handleNav(key)}
            className={`flex flex-col items-center space-y-1 text-[10px] font-bold transition-colors ${
              activePage === key
                ? "text-cyan-500"
                : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
        <button
          onClick={() => navigate("/login")}
          className="flex flex-col items-center space-y-1 text-[10px] font-bold text-zinc-400 hover:text-rose-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
