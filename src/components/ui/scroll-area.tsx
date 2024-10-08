import * as React from "react"
import { cn } from "../../lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal"
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, orientation = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-auto",
          orientation === "vertical" ? "h-full" : "w-full",
          className
        )}
        {...props}
      >
        {children}
        <div className={cn(
          "absolute",
          orientation === "vertical"
            ? "right-0 top-0 bottom-0 w-2.5"
            : "bottom-0 left-0 right-0 h-2.5"
        )}>
          <div className={cn(
            "rounded-full bg-[#5C4033] opacity-50 transition-opacity hover:opacity-100",
            orientation === "vertical" ? "w-full" : "h-full"
          )} />
        </div>
      </div>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }