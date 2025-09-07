'use client'

import { useState, useEffect } from 'react'
import { databaseService } from '@/lib/appwrite'
import { Instructor } from '@/types'
import { Github, Linkedin, Twitter, Globe } from 'lucide-react'

export function Instructors() {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInstructors()
  }, [])

  const fetchInstructors = async () => {
    try {
      const response = await databaseService.getAllInstructors()
      setInstructors(response.documents as unknown as Instructor[])
    } catch (error) {
      console.error('Failed to fetch instructors:', error)
      // Fallback to static data if database fails
      setInstructors(fallbackInstructors)
    } finally {
      setLoading(false)
    }
  }

  const fallbackInstructors: Instructor[] = [
    {
      $id: '1',
      name: 'Alex Rodriguez',
      bio: 'Senior Cybersecurity Consultant with 10+ years of experience in penetration testing and security auditing. Certified Ethical Hacker (CEH) and OSCP holder.',
      expertise: ['Penetration Testing', 'Web Application Security', 'Network Security', 'Incident Response'],
      profile_image: '/instructors/alex.jpg',
      social_linkedin: 'https://linkedin.com/in/alexrodriguez',
      social_twitter: 'https://twitter.com/alexsec',
      social_github: 'https://github.com/alexrodriguez',
      created_by: 'admin',
      $createdAt: '',
      $updatedAt: ''
    },
    {
      $id: '2', 
      name: 'Sarah Chen',
      bio: 'Digital Forensics Expert and Security Researcher. Specializes in malware analysis, memory forensics, and cyber threat intelligence.',
      expertise: ['Digital Forensics', 'Malware Analysis', 'Threat Intelligence', 'Incident Response'],
      profile_image: '/instructors/sarah.jpg',
      social_linkedin: 'https://linkedin.com/in/sarahchen',
      social_website: 'https://sarahchen.security',
      created_by: 'admin',
      $createdAt: '',
      $updatedAt: ''
    },
    {
      $id: '3',
      name: 'Marcus Johnson',
      bio: 'Wireless Security Specialist and Network Penetration Tester. Expert in WiFi security, wireless attacks, and network infrastructure assessment.',
      expertise: ['Wireless Security', 'Network Penetration Testing', 'IoT Security', 'Social Engineering'],
      profile_image: '/instructors/marcus.jpg',
      social_linkedin: 'https://linkedin.com/in/marcusjohnson',
      social_github: 'https://github.com/marcusjohnson',
      created_by: 'admin',
      $createdAt: '',
      $updatedAt: ''
    }
  ]

  if (loading) {
    return (
      <section id="instructors" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Expert <span className="text-cyber-purple">Instructors</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-dark-200 border border-gray-700 rounded-xl p-6 animate-pulse">
                <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="instructors" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb w-52 h-52 bg-cyber-purple/10 top-10 left-20" style={{animationDelay: '2.5s'}}></div>
        <div className="floating-orb w-40 h-40 bg-cyber-pink/10 bottom-20 right-10" style={{animationDelay: '4.5s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 cyber-text">
            Expert <span className="text-cyber-purple holographic-text">Instructors</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn from industry professionals with years of real-world experience 
            in cybersecurity and ethical hacking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <div
              key={instructor.$id}
              className="cyber-card bg-dark-200/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyber-purple/50 transition-all duration-300 transform hover:scale-105"
            >
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-cyber-purple to-cyber-blue rounded-full mx-auto mb-4 flex items-center justify-center cyber-glow">
                  <span className="text-2xl font-bold text-white">
                    {instructor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 hover:text-cyber-purple transition-colors duration-300">
                  {instructor.name}
                </h3>
              </div>

              {/* Bio */}
              <p className="text-gray-300 text-sm mb-6 line-clamp-4">
                {instructor.bio}
              </p>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {instructor.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                {instructor.social_linkedin && (
                  <a
                    href={instructor.social_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyber-purple transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {instructor.social_github && (
                  <a
                    href={instructor.social_github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyber-purple transition-colors duration-200"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {instructor.social_twitter && (
                  <a
                    href={instructor.social_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyber-purple transition-colors duration-200"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {instructor.social_website && (
                  <a
                    href={instructor.social_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyber-purple transition-colors duration-200"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-cyber-purple/20 to-cyber-blue/20 border border-cyber-purple/30 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Learn from the Best?
            </h3>
            <p className="text-gray-300 mb-6">
              Join our workshop and get hands-on training from these experienced professionals. 
              Limited seats available!
            </p>
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
