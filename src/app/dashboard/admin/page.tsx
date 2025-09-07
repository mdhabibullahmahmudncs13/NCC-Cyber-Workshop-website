'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { databaseService } from '@/lib/appwrite'
import { Users, CreditCard, Shield, Activity, Check, X, Eye, Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getStatusColor, formatDateTime } from '@/lib/utils'
import { downloadPaymentReport, downloadSummaryReport } from '@/lib/pdfGenerator'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRegistrations: 0,
    pendingPayments: 0,
    verifiedPayments: 0
  })
  const [users, setUsers] = useState<any[]>([])
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/dashboard')
      return
    }
    
    if (user && user.role === 'admin') {
      fetchData()
    }
  }, [user, authLoading, router])

  const fetchData = async () => {
    try {
      const [usersResponse, registrationsResponse] = await Promise.all([
        databaseService.getAllUsers(),
        databaseService.getAllRegistrations()
      ])

      const allUsers = usersResponse.documents
      const allRegistrations = registrationsResponse.documents

      setUsers(allUsers)
      setRegistrations(allRegistrations)

      // Calculate stats
      setStats({
        totalUsers: allUsers.length,
        totalRegistrations: allRegistrations.length,
        pendingPayments: allRegistrations.filter(r => r.payment_status === 'pending').length,
        verifiedPayments: allRegistrations.filter(r => r.payment_status === 'verified').length
      })
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const updatePaymentStatus = async (registrationId: string, status: 'verified' | 'rejected') => {
    try {
      await databaseService.updateRegistration(registrationId, { payment_status: status })
      toast.success(`Payment ${status}`)
      fetchData()
    } catch (error) {
      console.error('Failed to update payment status:', error)
      toast.error('Failed to update payment status')
    }
  }

  const updateUserStatus = async (userId: string, status: 'verified' | 'rejected') => {
    try {
      await databaseService.updateUser(userId, { registration_status: status })
      toast.success(`User ${status}`)
      fetchData()
    } catch (error) {
      console.error('Failed to update user status:', error)
      toast.error('Failed to update user status')
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

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users, registrations, and payments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-cyber-blue mr-4" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                <p className="text-gray-400">Total Users</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-cyber-green mr-4" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalRegistrations}</p>
                <p className="text-gray-400">Registrations</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-yellow-400 mr-4" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.pendingPayments}</p>
                <p className="text-gray-400">Pending Payments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-cyber-purple mr-4" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.verifiedPayments}</p>
                <p className="text-gray-400">Verified Payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Export Section */}
        <div className="bg-dark-200 border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <FileText className="h-6 w-6 text-cyber-blue mr-2" />
            Export Reports
          </h2>
          <p className="text-gray-400 mb-6">Download comprehensive reports for payment management and analysis</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => downloadPaymentReport(registrations, users)}
              className="flex items-center justify-center px-6 py-3 bg-cyber-blue hover:bg-blue-600 transition-colors rounded-lg text-white font-medium"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Payment Report
            </button>
            
            <button
              onClick={() => downloadSummaryReport(registrations, users)}
              className="flex items-center justify-center px-6 py-3 bg-cyber-green hover:bg-green-600 transition-colors rounded-lg text-white font-medium"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Summary Report
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'users', name: 'Users' },
              { id: 'registrations', name: 'Registrations' },
              { id: 'payments', name: 'Payments' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-cyber-blue text-cyber-blue'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button onClick={() => setActiveTab('payments')}>
                  Review Payments ({stats.pendingPayments})
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('users')}>
                  Manage Users
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('registrations')}>
                  View Registrations
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/dashboard/admin/instructors')}
                  className="bg-cyber-purple/10 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/20"
                >
                  Manage Instructors
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-dark-200 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white">All Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Institution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.$id} className="hover:bg-dark-300/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {user.student_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {user.institution}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.registration_status)}`}>
                          {user.registration_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        {user.registration_status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateUserStatus(user.$id, 'verified')}
                              className="text-green-400 hover:text-green-300"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => updateUserStatus(user.$id, 'rejected')}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-dark-200 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white">Payment Verification</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Transaction Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {registrations
                    .filter(reg => reg.payment_transaction_number)
                    .map((registration) => {
                      const user = users.find(u => u.$id === registration.user_id)
                      return (
                        <tr key={registration.$id} className="hover:bg-dark-300/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-white">{user?.name}</div>
                              <div className="text-sm text-gray-400">{user?.student_id}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-white">
                              <div>TrxID: {registration.payment_transaction_id}</div>
                              <div>Number: {registration.payment_transaction_number}</div>
                              <div className="text-gray-400">
                                {formatDateTime(registration.payment_submitted_at)}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(registration.payment_status)}`}>
                              {registration.payment_status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                            {registration.payment_screenshot_url && (
                              <button
                                onClick={() => window.open(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID}/files/${registration.payment_screenshot_url}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`, '_blank')}
                                className="text-cyber-blue hover:text-cyber-blue/80"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            )}
                            {registration.payment_status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updatePaymentStatus(registration.$id, 'verified')}
                                  className="text-green-400 hover:text-green-300"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => updatePaymentStatus(registration.$id, 'rejected')}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
