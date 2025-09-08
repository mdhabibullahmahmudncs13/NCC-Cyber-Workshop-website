'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const sectionId = href.slice(1)
    setActiveSection(sectionId)
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#curriculum', label: 'Curriculum' },
    { href: '#overview', label: 'Overview' },
    { href: '#instructors', label: 'Instructors' },
    { href: '#footer', label: 'Contact' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'matrix-bg backdrop-blur-xl matrix-border shadow-2xl shadow-green-500/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:animate-matrix-glow">
              <span className="text-green-400 font-bold text-lg">🛡️</span>
            </div>
            <span className="text-xl font-bold matrix-text group-hover:animate-glow transition-all duration-300 font-mono">
              CYBER_WORKSHOP.exe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`matrix-text hover:animate-glow transition-all duration-300 relative group px-3 py-2 rounded-lg hover:matrix-bg font-mono ${
                  activeSection === item.href.slice(1) ? 'text-green-300 animate-glow' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
              >
                [{item.label.toUpperCase()}]
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link href="/register" className="matrix-button font-mono px-6 py-2 rounded-lg font-semibold hover:scale-105 hover:animate-matrix-glow transition-all duration-300 button-interactive inline-block">
              [REGISTER_NOW]
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden matrix-text hover:animate-glow transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current top-3 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="space-y-2 pt-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="block matrix-text hover:animate-glow hover:matrix-bg px-4 py-3 rounded-lg transition-all duration-300 animate-slideInUp font-mono"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
              >
                [{item.label.toUpperCase()}]
              </Link>
            ))}
            <Link href="/register" className="w-full matrix-button px-6 py-3 rounded-lg font-semibold font-mono transition-all duration-300 mt-4 button-interactive inline-block text-center">
              [REGISTER_NOW]
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
