import { ButtonHTMLAttributes, forwardRef } from 'react'
import { theme } from '@/lib/theme'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium rounded-md
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
    `

    const variantStyles = {
      primary: `
        bg-[${theme.colors.primary[500]}] text-white
        hover:bg-[${theme.colors.primary[600]}]
        active:bg-[${theme.colors.primary[700]}]
        focus:ring-[${theme.colors.primary[500]}]
      `,
      secondary: `
        bg-[${theme.colors.background.tertiary}] text-[${theme.colors.text.primary}]
        hover:bg-[${theme.colors.border.light}]
        active:bg-[${theme.colors.border.medium}]
        focus:ring-[${theme.colors.border.dark}]
      `,
      ghost: `
        bg-transparent text-[${theme.colors.text.secondary}]
        hover:bg-[${theme.colors.semantic.hover}]
        active:bg-[${theme.colors.semantic.pressed}]
        focus:ring-[${theme.colors.border.light}]
      `,
      danger: `
        bg-[${theme.colors.status.error}] text-white
        hover:bg-red-600
        active:bg-red-700
        focus:ring-red-500
      `,
    }

    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-6 py-3 gap-2',
    }

    const styles = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `

    return (
      <button
        ref={ref}
        className={styles}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span>{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span>{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
