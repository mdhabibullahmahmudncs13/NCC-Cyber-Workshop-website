import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'

interface AuthRedirectProps {
  to: string
  condition: 'authenticated' | 'unauthenticated'
  children?: React.ReactNode
}

export function AuthRedirect({ to, condition, children }: AuthRedirectProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return // Don't redirect while checking auth

    const shouldRedirect = 
      (condition === 'authenticated' && user) ||
      (condition === 'unauthenticated' && !user)

    if (shouldRedirect) {
      console.log(`Redirecting ${condition} user to:`, to)
      router.push(to)
    }
  }, [user, loading, router, to, condition])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-blue"></div>
      </div>
    )
  }

  return <>{children}</>
}
