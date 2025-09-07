import { Shield, Target, Wifi, Lock, Search, FileText } from 'lucide-react'

export function WorkshopDetails() {
  const workshops = [
    {
      id: 1,
      title: "From Search to System Breach: The Complete Attack Chain",
      description: "Learn the complete methodology of ethical hacking from reconnaissance to system compromise.",
      icon: Search,
      color: "cyber-blue",
      topics: [
        "Advanced Google Dorking techniques",
        "OSINT gathering and analysis", 
        "Vulnerability assessment",
        "System exploitation methods"
      ]
    },
    {
      id: 2,
      title: "Hack Everything: WiFi Networks, ZIP Files & Lost Data",
      description: "Master the art of breaking into various systems and recovering sensitive information.",
      icon: Wifi,
      color: "cyber-green",
      topics: [
        "WiFi network penetration",
        "Wireless jamming and bugging",
        "ZIP file password cracking",
        "Memory recovery and forensics"
      ]
    }
  ]

  const features = [
    {
      icon: Target,
      title: "Hands-on Learning",
      description: "Practice real-world scenarios in a controlled environment"
    },
    {
      icon: Shield,
      title: "Ethical Approach", 
      description: "Learn responsible hacking with proper ethics and legal boundaries"
    },
    {
      icon: Lock,
      title: "Security Focus",
      description: "Understand both attack and defense perspectives"
    },
    {
      icon: FileText,
      title: "Comprehensive Materials",
      description: "Get detailed guides and tools for continued learning"
    }
  ]

  return (
    <section id="workshop" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb w-48 h-48 bg-cyber-blue/10 top-20 right-20" style={{animationDelay: '1s'}}></div>
        <div className="floating-orb w-36 h-36 bg-cyber-green/10 bottom-16 left-16" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 cyber-text">
            Workshop <span className="text-cyber-blue holographic-text">Details</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Two comprehensive workshops designed to take you from beginner to advanced 
            in cybersecurity and ethical hacking techniques.
          </p>
        </div>

        {/* Workshop Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {workshops.map((workshop, index) => (
            <div
              key={workshop.id}
              className="cyber-card bg-dark-200/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-cyber-blue/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-${workshop.color}/20 mr-4 cyber-glow`}>
                  <workshop.icon className={`h-8 w-8 text-${workshop.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Workshop {workshop.id}
                  </h3>
                  <div className="text-cyber-blue font-semibold">
                    {workshop.title}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                {workshop.description}
              </p>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Topics Covered:</h4>
                <ul className="space-y-2">
                  {workshop.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center text-gray-300">
                      <div className={`w-2 h-2 bg-${workshop.color} rounded-full mr-3`}></div>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-200/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-cyber-blue/50 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-cyber-blue/20 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-cyber-blue" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div className="mt-16 bg-dark-200 border border-gray-700 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            What You Need to Bring
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyber-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Laptop</h4>
              <p className="text-gray-400">Bring your own laptop with WiFi capability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔌</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Charger</h4>
              <p className="text-gray-400">Don't forget your laptop charger</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyber-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Notebook</h4>
              <p className="text-gray-400">For taking notes during the workshop</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
