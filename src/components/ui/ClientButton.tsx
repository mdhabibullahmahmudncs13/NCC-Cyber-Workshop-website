'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ClientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export const ClientButton = forwardRef<HTMLButtonElement, ClientButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-gradient-to-r from-cyber-blue to-cyber-green text-black hover:shadow-glow transform hover:scale-105 focus:ring-cyber-blue/50',
      secondary: 'bg-dark-400 border border-gray-600 text-white hover:bg-dark-300 hover:border-cyber-blue focus:ring-cyber-blue/50',
      danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus:ring-red-500/50',
      ghost: 'text-cyber-blue hover:bg-cyber-blue/10 focus:ring-cyber-blue/50',
      outline: 'border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black focus:ring-cyber-blue/50'
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
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
          children
        )}
      </button>
    )
  }
)

ClientButton.displayName = 'ClientButton'
