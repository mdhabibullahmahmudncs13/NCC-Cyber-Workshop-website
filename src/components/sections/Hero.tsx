'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Shield, Calendar, Clock, MapPin, Star, ArrowRight, Users, Play } from 'lucide-react'
import { isRegistrationOpen } from '@/lib/utils'
import { useState } from 'react'

export function Hero() {
  const registrationOpen = isRegistrationOpen()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [playVideo, setPlayVideo] = useState(false)

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Matrix grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {[...Array(400)].map((_, i) => (
            <div 
              key={i} 
              className="border border-green-500/20 hover:bg-green-500/5 transition-all duration-300"
              style={{
                animationDelay: `${Math.random() * 5}s`,
                animation: `pulse ${2 + Math.random() * 3}s infinite`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating matrix particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-green-400 font-mono text-xs opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {Math.random().toString(36).substring(7)}
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-left lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 matrix-bg rounded-full px-4 py-2 text-sm matrix-text font-medium hover:animate-matrix-glow transition-all duration-300 cursor-pointer animate-pulse">
              <Star className="h-4 w-4 animate-spin-slow text-green-400" />
              <span className="font-mono">[ PREMIUM CYBERSECURITY TRAINING ]</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight font-mono">
                <span className="matrix-text hover:animate-glow transition-all duration-300 cursor-default block animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-green-400">MASTER</span>
                <br />
                <span className="glitch matrix-text text-6xl sm:text-7xl lg:text-8xl" data-text="CYBERSECURITY">
                  CYBERSECURITY
                </span>
                <br />
                <span className="text-green-300 hover:text-green-400 transition-colors duration-300 cursor-default">IN_ONE_DAY.exe</span>
              </h1>
              
              <p className="text-xl text-green-400 max-w-2xl leading-relaxed hover:text-green-300 transition-colors duration-300 font-mono">
                {"> Initializing Bangladesh's most comprehensive cybersecurity workshop..."}<br/>
                {"> Loading cutting-edge techniques from industry experts..."}<br/>
                {"> Generating professional certificate..."}
                <span className="animate-blink">_</span>
              </p>
            </div>

            {/* Key Stats */}
            <div className="flex items-center space-x-8 text-sm font-mono">
              <div className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-300 cursor-pointer group matrix-border p-2 rounded">
                <Users className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-green-300">[500+ ALUMNI]</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-300 cursor-pointer group matrix-border p-2 rounded">
                <Shield className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-green-300">[CERTIFIED]</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-300 cursor-pointer group matrix-border p-2 rounded">
                <Clock className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-green-300">[9_HOURS]</span>
              </div>
            </div>

            {/* CTA Buttons */}
            {registrationOpen ? (
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/register">
                  <Button size="lg" className="matrix-button px-8 py-4 text-lg font-semibold font-mono rounded-lg transition-all duration-300 hover:scale-105 hover:animate-matrix-glow transform active:scale-95 group">
                    [REGISTER_NOW] - ৳100
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                
                <button
                  onClick={() => setPlayVideo(!playVideo)}
                  className="flex items-center space-x-2 matrix-border matrix-text hover:matrix-bg px-8 py-4 text-lg font-semibold font-mono rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>[WATCH_PREVIEW.mp4]</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-red-400 animate-pulse font-mono matrix-border p-3 rounded">
                  <Clock className="h-5 w-5" />
                  <span className="text-lg font-semibold">[REGISTRATION_CLOSED]</span>
                </div>
                <p className="text-green-400 font-mono">{"> Registration was open from September 6-10, 2025"}</p>
              </div>
            )}
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Main Info Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 hover:text-blue-400 transition-colors duration-300">Workshop Details</h3>
                
                <div className="space-y-4">
                  {/* Date */}
                  <div 
                    className="flex items-start space-x-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    onMouseEnter={() => setHoveredCard(0)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Calendar className={`h-6 w-6 text-blue-400 mt-1 flex-shrink-0 transition-transform duration-300 ${hoveredCard === 0 ? 'scale-110 rotate-12' : ''}`} />
                    <div>
                      <h4 className="font-semibold text-white hover:text-blue-400 transition-colors duration-300">September 11, 2025</h4>
                      <p className="text-gray-400 text-sm">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div 
                    className="flex items-start space-x-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    onMouseEnter={() => setHoveredCard(1)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <MapPin className={`h-6 w-6 text-green-400 mt-1 flex-shrink-0 transition-transform duration-300 ${hoveredCard === 1 ? 'scale-110 animate-bounce' : ''}`} />
                    <div>
                      <h4 className="font-semibold text-white hover:text-green-400 transition-colors duration-300">Notre Dame College</h4>
                      <p className="text-gray-400 text-sm">Computer Lab, Motijheel</p>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div 
                    className="flex items-start space-x-4 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-400/40 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    onMouseEnter={() => setHoveredCard(2)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Shield className={`h-6 w-6 text-purple-400 mt-1 flex-shrink-0 transition-transform duration-300 ${hoveredCard === 2 ? 'scale-110 rotate-12' : ''}`} />
                    <div>
                      <h4 className="font-semibold text-white hover:text-purple-400 transition-colors duration-300">Only ৳100</h4>
                      <p className="text-gray-400 text-sm">Certificate & Materials Included</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            {registrationOpen && (
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                <h4 className="font-semibold text-white mb-3 hover:text-blue-400 transition-colors duration-300">Quick Payment</h4>
                <p className="text-gray-300 text-sm mb-2">Send ৳100 via bKash/Nagad:</p>
                <p 
                  className="text-blue-400 text-2xl font-bold font-mono hover:text-blue-300 transition-colors duration-300 cursor-pointer select-all"
                  onClick={() => navigator.clipboard.writeText('01784275877')}
                  title="Click to copy"
                >
                  01784275877
                </p>
                <p className="text-gray-400 text-xs mt-2">Save transaction ID for registration</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Minimal floating elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </section>
  )
}
