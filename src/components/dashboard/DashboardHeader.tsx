'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface DashboardHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  action?: React.ReactNode
}

export function DashboardHeader({ 
  title, 
  description, 
  breadcrumbs = [], 
  action 
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link 
                href="/dashboard" 
                className="text-gray-400 hover:text-cyber-blue transition-colors"
              >
                <Home className="h-4 w-4" />
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-500 mx-2" />
                {crumb.href ? (
                  <Link 
                    href={crumb.href}
                    className="text-gray-400 hover:text-cyber-blue transition-colors text-sm"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-300 text-sm">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {description && (
            <p className="text-gray-400 mt-2">{description}</p>
          )}
        </div>
        {action && (
          <div>{action}</div>
        )}
      </div>
    </div>
  )
}
