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
      
     
    </section>
  )
}
