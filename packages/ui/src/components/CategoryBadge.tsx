import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "./Badge";

const categoryColors: Record<string, "primary" | "secondary" | "success" | "danger" | "warning" | "info"> = {
  Food: "warning",
  Rent: "primary",
  Utilities: "info",
  Transport: "secondary",
  Entertainment: "danger",
  Salary: "success",
  Health: "rose" as any, // fallback to standard if not found
  Shopping: "amber" as any,
};

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const variant = categoryColors[category] || "secondary";
  
  return (
    <Badge 
      variant={variant} 
      className={cn("px-3 py-1 font-medium select-none shadow-sm capitalize", className)}
    >
      {category}
    </Badge>
  );
}
