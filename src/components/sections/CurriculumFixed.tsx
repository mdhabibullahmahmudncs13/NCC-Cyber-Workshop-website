'use client'

import { useState, useEffect } from 'react'

export function Curriculum() {
  const [hoveredModule, setHoveredModule] = useState<number | null>(null)
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const modules = [
    {
      title: "Ethical Hacking",
      emoji: "🛡️",
      color: "from-blue-500 to-blue-600",
      description: "Learn penetration testing fundamentals and security assessment techniques",
      topics: ["Network Scanning", "Vulnerability Assessment", "Exploitation Techniques", "Security Testing"],
      difficulty: "Beginner",
      duration: "90 mins"
    },
    {
      title: "OSINT & Intelligence",
      emoji: "🔍",
      color: "from-green-500 to-green-600", 
      description: "Master information gathering and reconnaissance techniques",
      topics: ["Search Engine Techniques", "Social Media Intelligence","Threat Intelligence"],
      difficulty: "Intermediate",
      duration: "75 mins"
    },
    {
      title: "Network Security",
      emoji: "📡",
      color: "from-purple-500 to-purple-600",
      description: "Understand network protocols and security mechanisms",
      topics: ["WiFi Security", "Protocol Analysis", "Network Monitoring", "Intrusion Detection"],
      difficulty: "Intermediate",
      duration: "85 mins"
    },
    {
      title: "Cryptography & Privacy",
      emoji: "🔐",
      color: "from-red-500 to-red-600",
      description: "Learn encryption methods and privacy protection techniques",
      topics: ["Encryption Algorithms", "Digital Signatures", "Key Management", "Privacy Tools"],
      difficulty: "Advanced",
      duration: "70 mins"
    },
    {
      title: "Digital Forensics",
      emoji: "🔬",
      color: "from-orange-500 to-orange-600",
      description: "Investigate digital evidence and analyze security incidents",
      topics: ["Evidence Collection", "File System Analysis", "Memory Forensics", "Timeline Analysis"],
      difficulty: "Advanced",
      duration: "80 mins"
    },
    {
      title: "Database Security",
      emoji: "🗄️",
      color: "from-teal-500 to-teal-600",
      description: "Secure databases and prevent SQL injection attacks",
      topics: ["SQL Injection", "Database Hardening", "Access Control", "Audit Logging"],
      difficulty: "Intermediate",
      duration: "60 mins"
    }
  ]

  return (
        <section id="curriculum" className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Matrix background decoration */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {[...Array(144)].map((_, i) => (
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 matrix-heading font-mono glitch" data-text="CURRICULUM.exe">
            CURRICULUM.exe
          </h2>
          <p className="text-xl text-green-400 max-w-3xl mx-auto font-mono">
            {"> A comprehensive training protocol designed to transform you from beginner to cyber-warrior"}
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`group matrix-card p-8 rounded-2xl hover:animate-matrix-glow transition-all duration-500 hover:-translate-y-3 cursor-pointer hover-lift ${
                selectedModule === index ? 'ring-2 ring-green-400 bg-black/90' : ''
              } ${hoveredModule === index ? 'scale-105' : ''}`}
              onMouseEnter={() => setHoveredModule(index)}
              onMouseLeave={() => setHoveredModule(null)}
              onClick={() => setSelectedModule(selectedModule === index ? null : index)}
            >
              {/* Difficulty badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 text-xs font-semibold font-mono rounded-full matrix-border ${
                  module.difficulty === 'Beginner' ? 'text-green-400' :
                  module.difficulty === 'Intermediate' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  [{module.difficulty.toUpperCase()}]
                </span>
              </div>

              {/* Icon with matrix background */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-matrix-glow`}>
                <span className="transform group-hover:scale-110 transition-transform duration-300">
                  {module.emoji}
                </span>
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold matrix-text group-hover:animate-glow transition-all duration-300 font-mono">
                    {module.title.toUpperCase().replace(/\s+/g, '_')}.dll
                  </h3>
                  <span className="text-sm font-medium text-green-400 group-hover:text-green-300 font-mono">
                    [{module.duration}]
                  </span>
                </div>
                
                <p className="text-green-400 leading-relaxed group-hover:text-green-300 transition-colors duration-300 font-mono text-sm">
                  {"> " + module.description}
                </p>
              </div>
              
              {/* Topics */}
              <div className={`space-y-2 mt-4 transition-all duration-500 ${
                selectedModule === index ? 'max-h-96 opacity-100' : 'max-h-20 opacity-75'
              } overflow-hidden`}>
                {module.topics.map((topic, topicIndex) => (
                  <div 
                    key={topicIndex} 
                    className={`flex items-center text-sm text-green-400 animate-slideInUp transition-all duration-300 hover:text-green-300 hover:translate-x-2 font-mono`}
                    style={{ animationDelay: `${topicIndex * 0.1}s` }}
                  >
                    <div className={`w-2 h-2 bg-green-400 mr-3 group-hover:animate-pulse transition-transform duration-300`}></div>
                    <span className="hover:font-bold transition-all duration-200">▸ {topic}</span>
                  </div>
                ))}
              </div>

              {/* Expand indicator */}
              <div className="flex items-center justify-center mt-4 pt-4 border-t border-green-400/30">
                <button className="text-xs text-green-400 hover:text-green-300 transition-colors duration-300 flex items-center space-x-1 font-mono">
                  <span>[{selectedModule === index ? 'COLLAPSE' : 'EXPAND'}]</span>
                  <span className={`transform transition-transform duration-300 ${selectedModule === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Outcomes Section */}
        <div className="matrix-card rounded-2xl p-8 hover:animate-matrix-glow transition-all duration-500">
          <h3 className="text-2xl font-bold text-center mb-8 matrix-heading font-mono">
            [LEARNING_PROTOCOL.sys]
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg flex items-center justify-center text-green-400 text-2xl font-bold mx-auto mb-4 font-mono group-hover:animate-matrix-glow transition-all duration-300">
                01
              </div>
              <h4 className="font-semibold mb-2 matrix-text font-mono group-hover:animate-glow">[FOUNDATION]</h4>
              <p className="text-green-400 text-sm font-mono">
                {"> Build core cybersecurity knowledge and understand fundamental concepts"}
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg flex items-center justify-center text-green-400 text-2xl font-bold mx-auto mb-4 font-mono group-hover:animate-matrix-glow transition-all duration-300">
                02
              </div>
              <h4 className="font-semibold mb-2 matrix-text font-mono group-hover:animate-glow">[PRACTICE]</h4>
              <p className="text-green-400 text-sm font-mono">
                {"> Apply techniques in hands-on exercises and real-world scenarios"}
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/50 rounded-lg flex items-center justify-center text-green-400 text-2xl font-bold mx-auto mb-4 font-mono group-hover:animate-matrix-glow transition-all duration-300">
                03
              </div>
              <h4 className="font-semibold mb-2 matrix-text font-mono group-hover:animate-glow">[MASTERY]</h4>
              <p className="text-green-400 text-sm font-mono">
                {"> Demonstrate skills and receive certification of completion"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
