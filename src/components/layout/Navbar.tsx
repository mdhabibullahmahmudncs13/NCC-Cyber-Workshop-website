'use client'

import Link from 'next/link'
import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              NCC Cyber Workshop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#curriculum" className="text-slate-700 hover:text-blue-600 transition-colors">
              Curriculum
            </Link>
            <Link href="#schedule" className="text-slate-700 hover:text-blue-600 transition-colors">
              Schedule
            </Link>
            <Link href="#instructors" className="text-slate-700 hover:text-blue-600 transition-colors">
              Instructors
            </Link>
            <Link href="#faq" className="text-slate-700 hover:text-blue-600 transition-colors">
              FAQ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              href="#curriculum" 
              className="block px-4 py-2 text-slate-700 hover:bg-white/20 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Curriculum
            </Link>
            <Link 
              href="#schedule" 
              className="block px-4 py-2 text-slate-700 hover:bg-white/20 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule
            </Link>
            <Link 
              href="#instructors" 
              className="block px-4 py-2 text-slate-700 hover:bg-white/20 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Instructors
            </Link>
            <Link 
              href="#faq" 
              className="block px-4 py-2 text-slate-700 hover:bg-white/20 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}