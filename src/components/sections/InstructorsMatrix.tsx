'use client'

import { useState, useEffect } from 'react'
import { databaseService } from '@/lib/appwrite'
import { Instructor } from '@/types'
import { Github, Linkedin, Twitter, Globe, Shield, Terminal } from 'lucide-react'

export function InstructorsMatrix() {
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
      name: 'MATRIX_ARCHITECT_ALEX',
      bio: 'ELITE_CYBERSECURITY_EXPERT WITH 10+ YEARS IN THE MATRIX. SPECIALIZED IN BREAKING AND SECURING DIGITAL FORTRESSES. FORMER NSA OPERATIVE TURNED CYBER_GUARDIAN.',
      expertise: ['PENETRATION_TESTING', 'ETHICAL_HACKING', 'NETWORK_SECURITY', 'MALWARE_ANALYSIS'],
      profile_image: '/instructors/alex.jpg',
      social_linkedin: 'https://linkedin.com/in/alex-matrix',
      social_github: 'https://github.com/alex-matrix',
      social_twitter: 'https://twitter.com/alex_matrix',
      social_website: 'https://alexmatrix.dev',
      created_by: 'system',
      $createdAt: '2024-01-01T00:00:00.000Z',
      $updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
      $id: '2',
      name: 'CIPHER_SARAH_404',
      bio: 'DIGITAL_FORENSICS_SPECIALIST AND OSINT_MASTER. TRACKS DIGITAL_FOOTPRINTS THROUGH THE DEEPEST LAYERS OF THE MATRIX. CERTIFIED THREAT_HUNTER.',
      expertise: ['DIGITAL_FORENSICS', 'OSINT', 'INCIDENT_RESPONSE', 'THREAT_HUNTING'],
      profile_image: '/instructors/sarah.jpg',
      social_linkedin: 'https://linkedin.com/in/sarah-cipher',
      social_github: 'https://github.com/sarah-cipher',
      social_twitter: 'https://twitter.com/cipher_sarah',
      created_by: 'system',
      $createdAt: '2024-01-01T00:00:00.000Z',
      $updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
      $id: '3',
      name: 'GHOST_MARCUS_0x1',
      bio: 'CRYPTOGRAPHY_WIZARD AND BLOCKCHAIN_SECURITY_EXPERT. PROTECTS THE MATRIX FROM QUANTUM_THREATS. PHD IN COMPUTER_SCIENCE WITH FOCUS ON CRYPTOGRAPHIC_PROTOCOLS.',
      expertise: ['CRYPTOGRAPHY', 'BLOCKCHAIN_SECURITY', 'REVERSE_ENGINEERING', 'SECURE_CODING'],
      profile_image: '/instructors/marcus.jpg',
      social_linkedin: 'https://linkedin.com/in/marcus-ghost',
      social_github: 'https://github.com/ghost-marcus',
      social_website: 'https://ghostmarcus.tech',
      created_by: 'system',
      $createdAt: '2024-01-01T00:00:00.000Z',
      $updatedAt: '2024-01-01T00:00:00.000Z'
    }
  ]

  if (loading) {
    return (
      <section id="instructors" className="py-20 px-4 sm:px-6 lg:px-8 matrix-bg relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold matrix-text mb-4 font-mono">
              [LOADING_MATRIX_<span className="text-green-400 animate-glow">ARCHITECTS</span>]
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="matrix-card p-6 animate-pulse">
                <div className="w-24 h-24 bg-green-500/20 rounded-full mx-auto mb-4 border border-green-500/30"></div>
                <div className="h-4 bg-green-500/20 rounded mb-2"></div>
                <div className="h-3 bg-green-500/20 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-green-500/20 rounded"></div>
                  <div className="h-3 bg-green-500/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="instructors" className="py-20 px-4 sm:px-6 lg:px-8 matrix-bg relative">
      {/* Matrix grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-green-500/30"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Terminal className="h-8 w-8 matrix-text animate-glow" />
            <h2 className="text-3xl md:text-4xl font-bold matrix-text font-mono">
              [MATRIX_<span className="text-green-400 animate-glow">ARCHITECTS</span>]
            </h2>
            <Shield className="h-8 w-8 matrix-text animate-glow" />
          </div>
          <p className="text-xl text-green-200 max-w-3xl mx-auto font-mono">
            {'>'}LEARN_FROM_ELITE_DIGITAL_GUARDIANS_WITH_DECADES_OF_MATRIX_EXPERIENCE.
            <br />
            {'>'}REAL_WORLD_CYBERSECURITY_MASTERS_AND_ETHICAL_HACKING_SPECIALISTS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={instructor.$id}
              className="matrix-card p-6 hover:animate-glow transition-all duration-300 transform hover:scale-105 button-interactive"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-400/30 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-green-500/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent animate-pulse"></div>
                  <span className="text-2xl font-bold matrix-text font-mono relative z-10">
                    {instructor.name.split('_').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-green-100 mb-2 font-mono hover:animate-glow transition-all duration-300">
                  [{instructor.name}]
                </h3>
                <div className="text-green-300 text-sm font-mono bg-green-500/20 px-3 py-1 rounded-lg border border-green-400/30">
                  [STATUS: MATRIX_ARCHITECT]
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <div className="text-green-200 text-sm mb-3 font-mono leading-relaxed bg-black/20 p-3 rounded-lg border border-green-500/20">
                  {instructor.bio}
                </div>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="matrix-text font-semibold mb-3 font-mono text-green-300">[EXPERTISE_MATRIX]</h4>
                <div className="flex flex-wrap gap-2">
                  {instructor.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-green-500/30 text-green-100 border border-green-400/50 rounded-lg text-xs font-medium font-mono hover:animate-glow hover:bg-green-500/40 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 bg-black/20 p-3 rounded-lg border border-green-500/20">
                {instructor.social_linkedin && (
                  <a
                    href={instructor.social_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-100 hover:animate-glow transition-all duration-300 button-interactive hover:scale-110"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {instructor.social_github && (
                  <a
                    href={instructor.social_github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-100 hover:animate-glow transition-all duration-300 button-interactive hover:scale-110"
                    title="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {instructor.social_twitter && (
                  <a
                    href={instructor.social_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-100 hover:animate-glow transition-all duration-300 button-interactive hover:scale-110"
                    title="Twitter Profile"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {instructor.social_website && (
                  <a
                    href={instructor.social_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-100 hover:animate-glow transition-all duration-300 button-interactive hover:scale-110"
                    title="Personal Website"
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
          <div className="matrix-card p-8 max-w-3xl mx-auto relative overflow-hidden">
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10 animate-pulse"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold matrix-text mb-4 font-mono">
                [READY_TO_ENTER_THE_MATRIX?]
              </h3>
              <p className="text-green-200 mb-6 font-mono">
                {'>'}JOIN_OUR_CYBER_MATRIX_PROTOCOL_AND_GET_HANDS_ON_TRAINING_FROM_THESE_DIGITAL_ARCHITECTS.
                <br />
                {'>'}LIMITED_ACCESS_SLOTS_AVAILABLE_IN_THE_MATRIX!
              </p>
              <a
                href="/register"
                className="matrix-button px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 button-interactive font-mono"
              >
                [REGISTER_FOR_MATRIX_ACCESS]
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
