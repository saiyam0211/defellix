import * as React from "react";
import { cn } from "../../lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export const Progress = ({ value, className, ...props }: ProgressProps) => (
  <div
    className={cn("h-2 w-full overflow-hidden rounded-full bg-border", className)}
    {...props}
  >
    <div
      className="h-full rounded-full bg-primary transition-all"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);
