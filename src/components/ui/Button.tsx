'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden font-mono uppercase tracking-wider'
    
    const variants = {
      primary: 'bg-gradient-to-r from-cyber-blue to-cyber-green text-black hover:shadow-glow transform hover:scale-105 focus:ring-cyber-blue/50 cyber-button',
      secondary: 'bg-dark-400/80 border-2 border-cyber-blue/50 text-white hover:bg-dark-300 hover:border-cyber-blue hover:shadow-glow focus:ring-cyber-blue/50 cyber-button',
      danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-lg focus:ring-red-500/50',
      ghost: 'text-cyber-blue hover:bg-cyber-blue/10 hover:text-cyber-blue focus:ring-cyber-blue/50 border border-transparent hover:border-cyber-blue/30',
      outline: 'border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black focus:ring-cyber-blue/50 cyber-button'
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base'
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          <span className="relative z-10">{children}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
