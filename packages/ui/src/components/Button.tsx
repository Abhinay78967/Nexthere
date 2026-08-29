import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
      outline: "border border-border hover:bg-muted hover:text-foreground shadow-sm",
      ghost: "hover:bg-muted hover:text-foreground",
    }
    
    return (
      <button
        className={`${baseStyles} ${variants[variant as keyof typeof variants]} h-10 py-2 px-4 ${className || ''}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
