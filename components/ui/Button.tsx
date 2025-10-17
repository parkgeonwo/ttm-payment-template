import { ButtonHTMLAttributes, forwardRef } from 'react'

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
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#08090a]
      disabled:opacity-40 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
    `

    const variantStyles = {
      primary: `
        bg-[#5e6ad2] text-white
        hover:bg-[#4e5bc2]
        active:bg-[#3e4bb2]
        focus:ring-[#5e6ad2]/30
      `,
      secondary: `
        bg-[#232326] text-[#f7f8f8] border border-[#34343a]
        hover:bg-[#28282c] hover:border-[#3e3e44]
        active:bg-[#1c1c1f]
        focus:ring-[#5e6ad2]/20
      `,
      ghost: `
        bg-transparent text-[#d0d6e0] border border-transparent
        hover:bg-[#141516] hover:text-[#f7f8f8]
        active:bg-[#1c1c1f]
        focus:ring-[#5e6ad2]/20
      `,
      danger: `
        bg-[#eb5757] text-white
        hover:bg-[#db4747]
        active:bg-[#cb3737]
        focus:ring-[#eb5757]/30
      `,
    }

    const sizeStyles = {
      sm: 'text-[13px] px-3 py-1.5 gap-1.5',
      md: 'text-[13px] px-4 py-2 gap-2',
      lg: 'text-[15px] px-6 py-2.5 gap-2',
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
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
