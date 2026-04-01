import { connectDB } from "../src/db/db";
import { prisma } from "../src/lib/prisma";

export const expenseCategories = [
  {
    title: "Food & Dining",
    description: "Expenses related to meals, restaurants, and groceries",
  },
  {
    title: "Transportation",
    description: "Costs for travel including fuel, public transport, and cabs",
  },
  {
    title: "Housing",
    description: "Rent, maintenance, and utility bills",
  },
  {
    title: "Entertainment",
    description: "Movies, games, subscriptions, and leisure activities",
  },
  {
    title: "Healthcare",
    description: "Medical expenses including doctor visits and medicines",
  },
  {
    title: "Education",
    description: "Tuition fees, courses, books, and learning materials",
  },
  {
    title: "Shopping",
    description: "Clothing, gadgets, and other personal purchases",
  },
  {
    title: "Utilities",
    description: "Electricity, water, internet, and other essential services",
  },
  {
    title: "Travel",
    description: "Vacation, hotels, and trip-related expenses",
  },
  {
    title: "Miscellaneous",
    description: "Other uncategorized or unexpected expenses",
  },
];

export const incomeCategories = [
  {
    title: "Salary",
    description: "Monthly income received from employment",
  },
  {
    title: "Freelancing",
    description: "Earnings from freelance projects and gigs",
  },
  {
    title: "Business",
    description: "Income generated from business activities",
  },
  {
    title: "Investments",
    description: "Returns from stocks, mutual funds, or other investments",
  },
  {
    title: "Rental Income",
    description: "Income earned from renting property or assets",
  },
  {
    title: "Interest",
    description: "Interest earned from savings accounts or fixed deposits",
  },
  {
    title: "Dividends",
    description: "Earnings distributed from company shares",
  },
  {
    title: "Side Hustle",
    description: "Additional income from part-time or side activities",
  },
  {
    title: "Gifts",
    description: "Money received as gifts or bonuses",
  },
  {
    title: "Other",
    description: "Miscellaneous or irregular income sources",
  },
];

export const expenses: { amount: number; note: string; paymentMethod: "CARD" | "CASH"; categoryId: number; userId: number }[] = [
  { amount: 250, note: "Lunch at restaurant", paymentMethod: "CASH", categoryId: 1, userId: 1 },
  { amount: 1200, note: "Grocery shopping", paymentMethod: "CARD", categoryId: 1, userId: 1 },
  { amount: 500, note: "Petrol refill", paymentMethod: "CASH", categoryId: 2, userId: 1 },
  { amount: 15000, note: "Monthly house rent", paymentMethod: "CARD", categoryId: 3, userId: 1 },
  { amount: 300, note: "Movie tickets", paymentMethod: "CARD", categoryId: 4, userId: 1 },
  { amount: 800, note: "Doctor consultation", paymentMethod: "CASH", categoryId: 5, userId: 1 },
  { amount: 2000, note: "Online course purchase", paymentMethod: "CARD", categoryId: 6, userId: 1 },
  { amount: 3500, note: "Clothing purchase", paymentMethod: "CARD", categoryId: 7, userId: 1 },
  { amount: 1800, note: "Electricity bill", paymentMethod: "CARD", categoryId: 8, userId: 1 },
  { amount: 6000, note: "Weekend trip", paymentMethod: "CASH", categoryId: 9, userId: 1 },
  { amount: 400, note: "Snacks and coffee", paymentMethod: "CASH", categoryId: 1, userId: 1 },
  { amount: 900, note: "Internet bill", paymentMethod: "CARD", categoryId: 8, userId: 1 },
  { amount: 700, note: "Auto rickshaw rides", paymentMethod: "CASH", categoryId: 2, userId: 1 },
  { amount: 1200, note: "Dining out with friends", paymentMethod: "CARD", categoryId: 1, userId: 1 },
  { amount: 500, note: "Miscellaneous expense", paymentMethod: "CASH", categoryId: 10, userId: 1 },
  { amount: 2200, note: "New shoes", paymentMethod: "CARD", categoryId: 7, userId: 1 },
  { amount: 1300, note: "Gas cylinder refill", paymentMethod: "CASH", categoryId: 8, userId: 1 },
  { amount: 750, note: "Bus and metro travel", paymentMethod: "CASH", categoryId: 2, userId: 1 },
  { amount: 2800, note: "Dinner at cafe", paymentMethod: "CARD", categoryId: 1, userId: 1 },
  { amount: 1000, note: "Pharmacy purchase", paymentMethod: "CARD", categoryId: 5, userId: 1 },
];

export const incomes: { amount: number; note: string; incomeMethod: "CARD" | "CASH"; incomeCategoryId: number; userId: number }[] = [
  { amount: 50000, note: "Monthly salary", incomeMethod: "CARD", incomeCategoryId: 1, userId: 1 },
  { amount: 8000, note: "Freelance project", incomeMethod: "CASH", incomeCategoryId: 2, userId: 1 },
  { amount: 12000, note: "Business earnings", incomeMethod: "CASH", incomeCategoryId: 3, userId: 1 },
  { amount: 15000, note: "Stock market profit", incomeMethod: "CARD", incomeCategoryId: 4, userId: 1 },
  { amount: 7000, note: "Rental income", incomeMethod: "CARD", incomeCategoryId: 5, userId: 1 },
  { amount: 2000, note: "Bank interest", incomeMethod: "CARD", incomeCategoryId: 6, userId: 1 },
  { amount: 3500, note: "Dividend payout", incomeMethod: "CARD", incomeCategoryId: 7, userId: 1 },
  { amount: 6000, note: "Side hustle", incomeMethod: "CASH", incomeCategoryId: 8, userId: 1 },
  { amount: 2500, note: "Gift received", incomeMethod: "CASH", incomeCategoryId: 9, userId: 1 },
  { amount: 1800, note: "Misc income", incomeMethod: "CASH", incomeCategoryId: 10, userId: 1 },
  { amount: 52000, note: "Salary bonus", incomeMethod: "CARD", incomeCategoryId: 1, userId: 1 },
  { amount: 9000, note: "Freelance UI work", incomeMethod: "CASH", incomeCategoryId: 2, userId: 1 },
  { amount: 14000, note: "Small business sales", incomeMethod: "CASH", incomeCategoryId: 3, userId: 1 },
  { amount: 11000, note: "Mutual fund returns", incomeMethod: "CARD", incomeCategoryId: 4, userId: 1 },
  { amount: 8000, note: "Second property rent", incomeMethod: "CARD", incomeCategoryId: 5, userId: 1 },
  { amount: 2200, note: "FD interest", incomeMethod: "CARD", incomeCategoryId: 6, userId: 1 },
  { amount: 4000, note: "Quarterly dividends", incomeMethod: "CARD", incomeCategoryId: 7, userId: 1 },
  { amount: 7500, note: "Part-time gig", incomeMethod: "CASH", incomeCategoryId: 8, userId: 1 },
  { amount: 3000, note: "Festival gift", incomeMethod: "CASH", incomeCategoryId: 9, userId: 1 },
  { amount: 2100, note: "Other earnings", incomeMethod: "CASH", incomeCategoryId: 10, userId: 1 },
];
connectDB().then(() => {
  expenseCategories.map(async category => (
    await prisma.expenseCategory.createMany({ data: { title: category.title, description: category.description }, skipDuplicates: true })
  ));
  incomeCategories.map(async category => (
    await prisma.incomeCategory.createMany({ data: { title: category.title, description: category.description }, skipDuplicates: true })
  ));

  // expenses.map(async expense => (
  //   await prisma.expense.createMany({ data: expense })
  // ));

  incomes.map(async income => (
    await prisma.income.createMany({ data: income })
  ));
}).catch((err) => {
  console.error("Unable to connect DB", err);
});
