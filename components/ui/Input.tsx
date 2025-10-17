import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    const baseStyles = `
      px-3 py-2 text-[13px]
      bg-[#08090a]
      text-[#f7f8f8]
      placeholder:text-[#62666d]
      border rounded-md
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:opacity-40 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
    `

    const stateStyles = error
      ? 'border-[#eb5757] focus:border-[#eb5757] focus:ring-[#eb5757]/20'
      : 'border-[#23252a] focus:border-[#5e6ad2] focus:ring-[#5e6ad2]/20 hover:border-[#34343a]'

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[13px] font-medium text-[#d0d6e0] mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8f98]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${baseStyles} ${stateStyles} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8f98]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-[13px] text-[#eb5757]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-[13px] text-[#8a8f98]">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
