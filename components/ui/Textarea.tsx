import { TextareaHTMLAttributes, forwardRef } from 'react'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      resize = 'vertical',
      className = '',
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

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
    `

    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }

    const stateStyles = error
      ? 'border-[#eb5757] focus:border-[#eb5757] focus:ring-[#eb5757]/20'
      : 'border-[#23252a] focus:border-[#5e6ad2] focus:ring-[#5e6ad2]/20 hover:border-[#34343a]'

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[13px] font-medium text-[#d0d6e0] mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`${baseStyles} ${stateStyles} ${resizeStyles[resize]} ${className}`}
          {...props}
        />
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

Textarea.displayName = 'Textarea'

export default Textarea
