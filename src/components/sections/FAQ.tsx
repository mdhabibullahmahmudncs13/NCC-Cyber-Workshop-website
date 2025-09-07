'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { faqData } from '@/lib/utils'

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb w-48 h-48 bg-cyber-blue/10 top-20 left-10" style={{animationDelay: '2s'}}></div>
        <div className="floating-orb w-36 h-36 bg-cyber-purple/10 bottom-32 right-20" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 cyber-text">
            Frequently Asked <span className="text-cyber-blue holographic-text">Questions</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 px-2">
            Got questions? We've got answers. Find everything you need to know about the workshop.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="cyber-card bg-dark-200/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyber-blue/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-dark-300/50 transition-all duration-300 group"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white pr-3 sm:pr-4 group-hover:text-cyber-blue transition-colors duration-300">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.has(index) ? (
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-cyber-blue cyber-glow" />
                  ) : (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-cyber-blue transition-colors duration-300" />
                  )}
                </div>
              </button>
              
              {openItems.has(index) && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4 border-t border-gray-700">
                  <p className="text-gray-300 pt-3 sm:pt-4 text-sm sm:text-base">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-dark-200 border border-gray-700 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for? Feel free to reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="mailto:cyber@ncc.org"
                className="inline-flex items-center px-6 py-3 bg-cyber-blue/20 border border-cyber-blue text-cyber-blue font-semibold rounded-lg hover:bg-cyber-blue hover:text-black transition-all duration-300"
              >
                Email Support
              </a>
              <a
                href="tel:01784275877"
                className="inline-flex items-center px-6 py-3 bg-cyber-green/20 border border-cyber-green text-cyber-green font-semibold rounded-lg hover:bg-cyber-green hover:text-black transition-all duration-300"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
