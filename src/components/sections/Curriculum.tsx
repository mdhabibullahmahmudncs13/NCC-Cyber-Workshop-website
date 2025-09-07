'use client'

import { Shield, Search, Wifi, Lock, Eye, Database } from 'lucide-react'

export function Curriculum() {
  const modules = [
    {
      title: "Ethical Hacking",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      description: "Learn penetration testing fundamentals and security assessment techniques",
      topics: ["Network Scanning", "Vulnerability Assessment", "Exploitation Techniques", "Security Testing"]
    },
    {
      title: "OSINT & Intelligence",
      icon: Search,
      color: "from-green-500 to-green-600", 
      description: "Master information gathering and reconnaissance techniques",
      topics: ["Search Engine Techniques", "Social Media Intelligence", "Data Mining", "Threat Intelligence"]
    },
    {
      title: "Social Engineering",
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      description: "Understand social engineering and phishing attack vectors",
      topics: ["Email Phishing", "Social Engineering", "Website Cloning", "Defense Strategies"]
    },
    {
      title: "WiFi Security",
      icon: Wifi,
      color: "from-cyan-500 to-cyan-600",
      description: "Explore wireless network security and attack methodologies",
      topics: ["WPA/WEP Cracking", "Evil Twin Attacks", "Wireless Monitoring", "Network Defense"]
    },
    {
      title: "Password Security",
      icon: Lock,
      color: "from-orange-500 to-orange-600",
      description: "Learn password security analysis and cracking techniques",
      topics: ["Hash Cracking", "Dictionary Attacks", "Brute Force", "Password Policies"]
    },
    {
      title: "Digital Forensics",
      icon: Database,
      color: "from-pink-500 to-pink-600",
      description: "Investigate digital evidence and incident response procedures",
      topics: ["Evidence Collection", "File Recovery", "System Analysis", "Report Writing"]
    }
  ]

  return (
    <section id="curriculum" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-sm text-blue-400 font-medium mb-6">
            <Shield className="h-4 w-4" />
            <span>Professional Curriculum</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">What You'll</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Master</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive cybersecurity training covering 6 essential domains. From ethical hacking to digital forensics, 
            gain hands-on experience with industry-standard tools and techniques.
          </p>
        </div>

        {/* Curriculum Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module, index) => {
            const IconComponent = module.icon
            
            return (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {module.description}
                  </p>
                  
                  {/* Topics */}
                  <div className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center space-x-2 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`}></div>
                        <span className="text-gray-300">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Learning Outcomes */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Learning Outcomes</h3>
            <p className="text-gray-400 text-lg">By the end of this workshop, you'll be able to:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Conduct ethical penetration testing assessments",
              "Perform comprehensive security reconnaissance", 
              "Identify and exploit security vulnerabilities",
              "Implement robust defense mechanisms",
              "Analyze digital evidence and incident response",
              "Apply industry-standard security frameworks"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
