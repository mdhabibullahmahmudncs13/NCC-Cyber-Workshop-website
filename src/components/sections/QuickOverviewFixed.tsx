'use client'

import { useState, useEffect } from 'react'

export function QuickOverview() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText('01784275877')
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Matrix animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-300/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-300/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {[...Array(64)].map((_, i) => (
              <div 
                key={i} 
                className="border border-green-500/10 hover:bg-green-500/5 transition-all duration-300"
                style={{
                  animationDelay: isClient ? `${Math.random() * 5}s` : `${(i * 0.1) % 5}s`,
                  animation: isClient ? `pulse ${2 + Math.random() * 3}s infinite` : `pulse ${2 + (i % 3)}s infinite`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 matrix-heading font-mono glitch hover:animate-glow transition-all duration-500 cursor-default" data-text="WORKSHOP_OVERVIEW.exe">
            WORKSHOP_OVERVIEW.exe
          </h2>
          <p className="text-xl text-green-400 max-w-3xl mx-auto hover:text-green-300 transition-colors duration-300 font-mono">
            {"> Join us for an intensive one-day cybersecurity workshop designed for beginners and cyber-enthusiasts"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Date Card */}
          <div 
            className="matrix-card p-6 rounded-2xl text-center hover:animate-matrix-glow transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer hover-lift group"
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={`w-20 h-20 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg flex items-center justify-center text-green-400 text-2xl font-bold mx-auto mb-4 transition-all duration-500 ${hoveredCard === 0 ? 'animate-bounce scale-110' : ''}`}>
              <img src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bbafbf001e80d92606/files/68bd7156001170fef882/view?project=68bb9d7800190636a8b2&mode=admin" alt="" className="w-20 h-20 object-contain" />
            </div>
            <h3 className="text-lg font-semibold mb-2 matrix-text group-hover:animate-glow transition-colors duration-300 font-mono">[DATE]</h3>
            <p className="text-green-400 group-hover:text-green-300 transition-colors duration-300 font-mono">January 25, 2025</p>
            <p className="text-green-400 text-sm mt-1 group-hover:text-green-300 transition-colors duration-300 font-mono">[SATURDAY]</p>
          </div>

          {/* Time Card */}
          <div 
            className="matrix-card p-6 rounded-2xl text-center hover:animate-matrix-glow transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer hover-lift group"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={`w-20 h-20 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg flex items-center justify-center text-green-400 text-2xl font-bold mx-auto mb-4 transition-all duration-500 ${hoveredCard === 1 ? 'animate-spin scale-110' : ''}`}>
              <img src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bbafbf001e80d92606/files/68beff82eb382e39a22f/view?project=68bb9d7800190636a8b2&mode=admin" alt="" className="w-20 h-20 object-contain" />
            </div>
            <h3 className="text-lg font-semibold mb-2 matrix-text group-hover:animate-glow transition-colors duration-300 font-mono">[DURATION]</h3>
            <p className="text-green-400 group-hover:text-green-300 transition-colors duration-300 font-mono">9:00 AM - 5:00 PM</p>
            <p className="text-green-400 text-sm mt-1 group-hover:text-green-300 transition-colors duration-300 font-mono">[8_HOURS_INTENSIVE]</p>
          </div>

          {/* Venue Card */}
          <div 
            className="matrix-card p-6 rounded-2xl text-center hover:animate-matrix-glow transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer hover-lift group"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={`w-20 h-20 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg flex items-center justify-center text-green-400 text-2xl font-bold mx-auto mb-4 transition-all duration-500 ${hoveredCard === 0 ? 'animate-bounce scale-110' : ''}`}>
              <img src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bbafbf001e80d92606/files/68bd7156001170fef882/view?project=68bb9d7800190636a8b2&mode=admin" alt="" className="w-20 h-20 object-contain" />
            </div>
            <h3 className="text-lg font-semibold mb-2 matrix-text group-hover:animate-glow transition-colors duration-300 font-mono">[LOCATION]</h3>
            <p className="text-green-400 group-hover:text-green-300 transition-colors duration-300 font-mono">NCC Campus</p>
            <p className="text-green-400 text-sm mt-1 group-hover:text-green-300 transition-colors duration-300 font-mono">[LAB_ENVIRONMENT]</p>
          </div>

          {/* Price Card */}
          <div 
            className="matrix-card p-6 rounded-2xl text-center hover:animate-matrix-glow transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer hover-lift group"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={`w-20 h-20 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg flex items-center justify-center text-green-400 text-2xl font-bold mx-auto mb-4 transition-all duration-500 ${hoveredCard === 0 ? 'animate-bounce scale-110' : ''}`}>
              <img src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bbafbf001e80d92606/files/68bd7156001170fef882/view?project=68bb9d7800190636a8b2&mode=admin" alt="" className="w-20 h-20 object-contain" />
            </div>
            <h3 className="text-lg font-semibold mb-2 matrix-text group-hover:animate-glow transition-colors duration-300 font-mono">[COST]</h3>
            <p className="text-green-400 font-bold text-xl group-hover:text-green-300 transition-colors duration-300 font-mono">FREE</p>
            <p className="text-green-400 text-sm mt-1 group-hover:text-green-300 transition-colors duration-300 font-mono">[LIMITED_SEATS]</p>
          </div>
        </div>

        {/* What to Bring Section */}
        <div className="mt-16 matrix-bg backdrop-blur-sm rounded-2xl p-8 matrix-border shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover-lift">
          <h3 className="text-2xl font-bold text-center mb-8 matrix-text hover:animate-glow transition-colors duration-300 cursor-default font-mono">
            [REQUIRED_EQUIPMENT.cfg]
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-4xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer hover:animate-matrix-glow">💻</div>
              <h4 className="font-semibold mb-2 matrix-text group-hover:animate-glow transition-colors duration-300 font-mono">[LAPTOP.exe]</h4>
              <p className="text-green-300/70 text-sm group-hover:text-green-300 transition-colors duration-300 font-mono">
                Minimum_4GB_RAM && 10GB_free_space.required
              </p>
            </div>
            <div className="text-center group">
              <div className="text-4xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer hover:animate-matrix-glow">🧠</div>
              <h4 className="font-semibold mb-2 matrix-text group-hover:animate-glow transition-colors duration-300 font-mono">[CURIOSITY.dll]</h4>
              <p className="text-green-300/70 text-sm group-hover:text-green-300 transition-colors duration-300 font-mono">
                Open_mind.initialize() && eagerness_to_learn.execute()
              </p>
            </div>
            <div className="text-center group">
              <div className="text-4xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer hover:animate-matrix-glow">📝</div>
              <h4 className="font-semibold mb-2 matrix-text group-hover:animate-glow transition-colors duration-300 font-mono">[NOTEBOOK.txt]</h4>
              <p className="text-green-300/70 text-sm group-hover:text-green-300 transition-colors duration-300 font-mono">
                Take_notes.during(hands_on_exercises && important_concepts)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
