'use client'

import { useState, useEffect } from 'react'
import { getTimeUntilRegistrationEnd, isRegistrationOpen } from '@/lib/utils'

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number} | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const updateTimer = () => {
      const registrationOpen = isRegistrationOpen()
      setIsOpen(registrationOpen)
      
      if (registrationOpen) {
        const time = getTimeUntilRegistrationEnd()
        setTimeLeft(time)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (!isOpen || !timeLeft) {
    return null
  }

  return (
    <div className="bg-dark-200 border border-cyber-blue/30 rounded-lg p-4 backdrop-blur-sm">
      <div className="text-center">
        <h3 className="text-sm font-semibold text-cyber-blue mb-2">Registration Ends In</h3>
        <div className="flex space-x-2 text-xs">
          <div className="bg-dark-400 rounded px-2 py-1">
            <div className="text-white font-mono">{timeLeft.days}</div>
            <div className="text-gray-400">Days</div>
          </div>
          <div className="bg-dark-400 rounded px-2 py-1">
            <div className="text-white font-mono">{timeLeft.hours}</div>
            <div className="text-gray-400">Hours</div>
          </div>
          <div className="bg-dark-400 rounded px-2 py-1">
            <div className="text-white font-mono">{timeLeft.minutes}</div>
            <div className="text-gray-400">Min</div>
          </div>
        </div>
      </div>
    </div>
  )
}
