'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Home, Shield } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-8xl font-bold text-cyber-blue/20 mb-4">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="h-16 w-16 text-cyber-blue animate-pulse" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Page <span className="text-cyber-purple">Not Found</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, even the best hackers sometimes take wrong turns.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Common Links */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-500 text-sm mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/dashboard" className="text-cyber-blue hover:text-cyber-blue/80 transition-colors">
              Dashboard
            </Link>
            <Link href="/login" className="text-cyber-blue hover:text-cyber-blue/80 transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-cyber-blue hover:text-cyber-blue/80 transition-colors">
              Register
            </Link>
            <Link href="/#about" className="text-cyber-blue hover:text-cyber-blue/80 transition-colors">
              About Workshop
            </Link>
          </div>
        </div>

        {/* Cyber Effects */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-cyber-blue rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 border border-cyber-purple rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-cyber-green rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}
