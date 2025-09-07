import '../styles/cyber.css'
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00d4ff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://ncc-cyber-workshop.netlify.app'),
  title: 'NCC Cyber Workshop 2025 | Niter Computer Club',
  description: 'Join the ultimate cybersecurity workshop by NCC. Learn ethical hacking, penetration testing, and cybersecurity fundamentals from industry experts.',
  keywords: ['cybersecurity', 'ethical hacking', 'workshop', 'ncc', 'niter computer club', 'penetration testing'],
  authors: [{ name: 'NCC - Niter Computer Club' }],
  creator: 'NCC',
  publisher: 'NCC',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ncc-cyber-workshop.vercel.app',
    siteName: 'NCC Cyber Workshop 2025',
    title: 'NCC Cyber Workshop 2025 | Learn Cybersecurity',
    description: 'Join the ultimate cybersecurity workshop by NCC. Learn ethical hacking, penetration testing, and cybersecurity fundamentals.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NCC Cyber Workshop 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NCC Cyber Workshop 2025',
    description: 'Join the ultimate cybersecurity workshop by NCC. Learn ethical hacking and penetration testing.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} font-mono bg-dark-100 text-white min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative">
              {/* Background Effects */}
              <div className="fixed inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300 -z-10" />
              <div className="fixed inset-0 cyber-grid opacity-20 -z-10" />
              
              {/* Main Content */}
              <main className="relative z-10">
                {children}
              </main>
              
              {/* Toast Notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#1a1a1a',
                    color: '#ffffff',
                    border: '1px solid #00d4ff',
                    borderRadius: '8px',
                    fontFamily: 'JetBrains Mono, monospace',
                  },
                  success: {
                    iconTheme: {
                      primary: '#00ff88',
                      secondary: '#1a1a1a',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ff0080',
                      secondary: '#1a1a1a',
                    },
                  },
                }}
              />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
