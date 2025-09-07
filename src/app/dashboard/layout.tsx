'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { storageService } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Home, 
  User, 
  Shield, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Users,
  CreditCard,
  Calendar,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getProfileImageUrl = (imageId: string | undefined) => {
    if (!imageId) return null
    return storageService.getFilePreview(imageId).href
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: false,
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: User,
      current: false,
    },
  ]

  // Add admin navigation if user is admin
  if (user.role === 'admin') {
    navigation.push(
      {
        name: 'Admin Panel',
        href: '/dashboard/admin',
        icon: Shield,
        current: false,
      },
      {
        name: 'Manage Instructors',
        href: '/dashboard/admin/instructors',
        icon: Users,
        current: false,
      }
    )
  }

  const userNavigation = [
    { name: 'Your Profile', href: '/dashboard/profile' },
    { name: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-dark-200 border-r border-gray-700">
          <div className="flex h-16 shrink-0 items-center justify-between px-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="text-lg font-bold text-white">
                NCC <span className="text-cyber-blue">Dashboard</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col px-4 pb-4">
            <ul className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex gap-x-3 rounded-md p-3 text-sm font-medium text-gray-300 hover:bg-dark-300 hover:text-white transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-dark-200 border-r border-gray-700 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="text-lg font-bold text-white">
                NCC <span className="text-cyber-blue">Dashboard</span>
              </span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex gap-x-3 rounded-md p-3 text-sm font-medium text-gray-300 hover:bg-dark-300 hover:text-white transition-colors"
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Top navigation */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-700 bg-dark-200/90 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-700 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold text-white">
                Welcome back, {user.name}
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* User menu */}
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-cyber-blue/20 flex items-center justify-center">
                      {user.profile_picture ? (
                        <img
                          src={getProfileImageUrl(user.profile_picture) || undefined}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-cyber-blue" />
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-sm font-medium text-white">{user.name}</span>
                      {user.role === 'admin' && (
                        <span className="ml-2 px-2 py-1 text-xs bg-cyber-blue/20 text-cyber-blue rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
