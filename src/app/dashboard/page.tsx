'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { databaseService } from '@/lib/appwrite'
import { downloadEventDetailsPDF } from '@/lib/pdfGenerator'
import { User, Shield, Calendar, CreditCard, CheckCircle, Clock, XCircle, Download, IdCard } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PaymentForm } from '@/components/forms/PaymentForm'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { generateReferenceCode, getStatusColor } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }
    
    if (user) {
      fetchRegistrations()
    }
  }, [user, authLoading, router])

  const fetchRegistrations = async () => {
    try {
      const response = await databaseService.getUserRegistrations(user!.$id)
      setRegistrations(response.documents)
    } catch (error) {
      console.error('Failed to fetch registrations:', error)
      toast.error('Failed to load registrations')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    try {
      console.log('Starting registration process...')
      console.log('User:', user)
      
      const registrationData = {
        user_id: user!.$id,
        workshop_type: 'complete',
        registration_date: new Date().toISOString(),
        payment_status: 'pending' as const
      }

      console.log('Registration data:', registrationData)
      
      const result = await databaseService.createRegistration(registrationData)
      console.log('Registration result:', result)
      
      toast.success('Registration successful!')
      fetchRegistrations()
    } catch (error) {
      console.error('Registration failed:', error)
      
      // More detailed error handling
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        toast.error(`Registration failed: ${error.message}`)
      } else {
        console.error('Unknown error:', error)
        toast.error('Registration failed: Unknown error occurred')
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-400" />
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const isRegistered = registrations.length > 0
  const referenceCode = generateReferenceCode(user.student_id)

  const handleDownloadEventID = () => {
    if (!isRegistered) {
      toast.error('Please register for the workshop first')
      return
    }

    if (registrations[0]?.payment_status !== 'verified') {
      toast.error('Payment must be verified to download Event Details')
      return
    }

    try {
      downloadEventDetailsPDF(user, registrations[0])
      toast.success('Event Details downloaded successfully!')
    } catch (error) {
      console.error('Failed to download Event Details:', error)
      toast.error('Failed to download Event Details')
    }
  }

  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="Dashboard"
        description="Manage your workshop registration and profile"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-cyber-blue" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Registration Status</p>
              <p className={`font-semibold ${user.registration_status === 'verified' ? 'text-green-400' : user.registration_status === 'pending' ? 'text-yellow-400' : 'text-gray-400'}`}>
                {user.registration_status.charAt(0).toUpperCase() + user.registration_status.slice(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-cyber-green/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-cyber-green" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Workshop Date</p>
              <p className="font-semibold text-white">September 11, 2025</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Payment Status</p>
              <p className={`font-semibold ${isRegistered && registrations[0]?.payment_status === 'verified' ? 'text-green-400' : 'text-yellow-400'}`}>
                {isRegistered ? (registrations[0]?.payment_status === 'verified' ? 'Verified' : 'Pending') : 'Not Registered'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Section */}
        <div className="lg:col-span-2">
          <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Workshop Registration</h2>
            
            {user.role === 'admin' && (
              <div className="mb-6 p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-cyber-blue" />
                  <span className="text-cyber-blue font-medium">Admin Access</span>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  You have administrator privileges. You can manage users and registrations.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => router.push('/dashboard/admin')}
                >
                  Go to Admin Panel
                </Button>
              </div>
            )}

            {!isRegistered ? (
              <div className="text-center py-8">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Not Registered Yet</h3>
                <p className="text-gray-400 mb-6">
                  Register for the NCC Cyber Workshop 2025 to secure your spot.
                </p>
                <Button onClick={handleRegister}>
                  Register for Workshop
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {registrations.map((registration) => (
                  <div key={registration.$id} className="border border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(registration.payment_status)}
                        <span className="font-medium text-white">Workshop Registration</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(registration.payment_status)}`}>
                        {registration.payment_status.charAt(0).toUpperCase() + registration.payment_status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Registration Date</p>
                        <p className="text-white">{new Date(registration.registration_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Reference Code</p>
                        <p className="text-cyber-blue font-mono">{referenceCode}</p>
                      </div>
                      {registration.payment_transaction_number && (
                        <div className="col-span-2">
                          <p className="text-gray-400">Transaction Number</p>
                          <p className="text-white font-mono">{registration.payment_transaction_number}</p>
                        </div>
                      )}
                    </div>

                    {registration.payment_status === 'pending' && (
                      <Button
                        size="sm"
                        className="mt-4"
                        onClick={() => setShowPaymentForm(true)}
                      >
                        Complete Payment
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile Information Sidebar */}
        <div className="space-y-6">
          <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Profile Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Student ID</p>
                <p className="text-white">{user.student_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Institution</p>
                <p className="text-white">{user.institution}</p>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router.push('/dashboard/profile')}
              >
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-blue-600 hover:to-green-600 text-black font-medium"
                onClick={handleDownloadEventID}
                disabled={!isRegistered || registrations[0]?.payment_status !== 'verified'}
              >
                <IdCard className="h-4 w-4 mr-2" />
                Download Event Details
              </Button>
              
              {(!isRegistered || registrations[0]?.payment_status !== 'verified') && (
                <p className="text-xs text-gray-400 text-center">
                  {!isRegistered ? 'Registration required' : 'Payment verification required'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <PaymentForm
          onClose={() => setShowPaymentForm(false)}
          onSuccess={() => {
            setShowPaymentForm(false)
            fetchRegistrations()
          }}
          registrationId={registrations[0]?.$id}
        />
      )}
    </div>
  )
}