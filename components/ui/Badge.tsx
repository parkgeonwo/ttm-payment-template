import { HTMLAttributes, forwardRef } from 'react'
import { theme } from '@/lib/theme'

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
      default: 'bg-[#f5f5f5] text-[#71717a] border border-[#e5e5e5]',
      primary: `bg-[${theme.colors.primary[100]}] text-[${theme.colors.primary[700]}] border border-[${theme.colors.primary[200]}]`,
      success: `bg-green-50 text-green-700 border border-green-200`,
      warning: `bg-amber-50 text-amber-700 border border-amber-200`,
      error: `bg-red-50 text-red-700 border border-red-200`,
      info: `bg-blue-50 text-blue-700 border border-blue-200`,
    }

    const sizeStyles = {
      sm: 'text-xs px-2 py-0.5 gap-1',
      md: 'text-xs px-2.5 py-1 gap-1.5',
      lg: 'text-sm px-3 py-1.5 gap-2',
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
