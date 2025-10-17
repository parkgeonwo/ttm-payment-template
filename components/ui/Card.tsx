import { HTMLAttributes, forwardRef } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  bordered?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = 'md',
      hoverable = false,
      bordered = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      bg-[#141516] rounded-lg
      transition-all duration-200
      ${bordered ? 'border border-[#23252a]' : ''}
      ${hoverable ? 'hover:border-[#34343a] hover:-translate-y-0.5 cursor-pointer' : ''}
    `

    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card sub-components
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`mb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
))

CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className = '', children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-[15px] font-medium text-[#f7f8f8] tracking-[-0.011em] ${className}`}
    {...props}
  >
    {children}
  </h3>
))

CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className = '', children, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-[13px] text-[#8a8f98] mt-1 ${className}`}
    {...props}
  >
    {children}
  </p>
))

CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
))

CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`mt-4 pt-4 border-t border-[#23252a] ${className}`}
    {...props}
  >
    {children}
  </div>
))

CardFooter.displayName = 'CardFooter'

export default Card
