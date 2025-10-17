import { SelectHTMLAttributes, forwardRef } from 'react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    const baseStyles = `
      px-3 py-2 pr-10 text-[13px]
      bg-[#08090a]
      text-[#f7f8f8]
      border rounded-md
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:opacity-40 disabled:cursor-not-allowed
      appearance-none
      ${fullWidth ? 'w-full' : ''}
    `

    const stateStyles = error
      ? 'border-[#eb5757] focus:border-[#eb5757] focus:ring-[#eb5757]/20'
      : 'border-[#23252a] focus:border-[#5e6ad2] focus:ring-[#5e6ad2]/20 hover:border-[#34343a]'

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[13px] font-medium text-[#d0d6e0] mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`${baseStyles} ${stateStyles} ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8a8f98]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
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

Select.displayName = 'Select'

export default Select
