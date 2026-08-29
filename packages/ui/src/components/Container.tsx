import * as React from "react"

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-6 ${className || ''}`}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"
