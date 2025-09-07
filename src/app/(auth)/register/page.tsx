'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { Button } from '@/components/ui/Button'
import { Shield, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { validateEmail, validatePhone, validateStudentId } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    student_id: '',
    phone: '',
    institution: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.email || !formData.student_id) {
        toast.error('Please fill in all required fields')
        return
      }
      
      if (!validateEmail(formData.email)) {
        toast.error('Please enter a valid email address')
        return
      }
      
      if (!validateStudentId(formData.student_id)) {
        toast.error('Student ID must be in format: XX-XXXX (Your Student ID)')
        return
      }
      
      setStep(2)
      return
    }

    // Validate second step
    if (!formData.phone || !formData.institution || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!validatePhone(formData.phone)) {
      toast.error('Please enter a valid phone number')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await register(formData)
      toast.success('Registration successful! Please check your email for verification.')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <Shield className="h-8 w-8 text-cyber-blue" />
            <span className="text-xl font-bold text-white">
              NCC <span className="text-cyber-blue">Cyber Workshop</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join the NCC Cyber Workshop 2025</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-cyber-blue' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? 'border-cyber-blue bg-cyber-blue/20' : 'border-gray-500'
            }`}>
              {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
            </div>
            <span className="ml-2 text-sm font-medium">Personal Info</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-cyber-blue' : 'bg-gray-500'}`} />
          <div className={`flex items-center ${step >= 2 ? 'text-cyber-blue' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? 'border-cyber-blue bg-cyber-blue/20' : 'border-gray-500'
            }`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Account</span>
          </div>
        </div>

        <div className="bg-dark-200 border border-gray-700 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="student_id" className="block text-sm font-medium text-white mb-2">
                    Student ID *
                  </label>
                  <input
                    id="student_id"
                    name="student_id"
                    type="text"
                    required
                    value={formData.student_id}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your Student ID"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Format:  (e.g., CS-24XXXX, EEE-24XXXX)
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-white mb-2">
                    Institution *
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    required
                    value={formData.institution}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your university/college"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input pr-10"
                      placeholder="Enter password (min 8 characters)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input pr-10"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="flex space-x-4">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                loading={loading}
                className="flex-1"
              >
                {step === 1 ? 'Continue' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-200 text-gray-400">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-gray-400 hover:text-cyber-blue text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
