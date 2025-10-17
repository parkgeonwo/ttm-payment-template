import { HTMLAttributes, forwardRef } from 'react'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium rounded-full
      transition-colors duration-200
    `

    const variantStyles = {
      default: 'bg-[#232326] text-[#d0d6e0] border border-[#34343a]',
      primary: 'bg-[#18182f] text-[#828fff] border border-[#5e6ad2]/30',
      success: 'bg-[#1a2e26] text-[#4cb782] border border-[#4cb782]/30',
      warning: 'bg-[#2e2716] text-[#f2c94c] border border-[#f2c94c]/30',
      error: 'bg-[#2e1a1a] text-[#eb5757] border border-[#eb5757]/30',
      info: 'bg-[#1a2633] text-[#4ea7fc] border border-[#4ea7fc]/30',
    }

    const sizeStyles = {
      sm: 'text-[11px] px-2 py-0.5 gap-1',
      md: 'text-[11px] px-2.5 py-1 gap-1.5',
      lg: 'text-[13px] px-3 py-1.5 gap-2',
    }

    const dotElement = dot && (
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
    )

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {dotElement}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
