import { Navbar } from '@/components/layout/NavbarFixed'
import { HeroMatrix } from '@/components/sections/HeroMatrix'
import { Curriculum } from '@/components/sections/CurriculumFixed'
import { QuickOverview } from '@/components/sections/QuickOverviewFixed'
import { InstructorsMatrix } from '@/components/sections/InstructorsMatrix'
import { Footer } from '@/components/layout/Footer'
import dynamic from 'next/dynamic'

// Dynamic import to prevent hydration issues
const MatrixBackground = dynamic(() => import('@/components/effects/MatrixBackground'), {
  ssr: false
})

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden matrix-bg">
      <MatrixBackground />
      <Navbar />
      
      {/* Main Content - Matrix Interface */}
      <div id="home">
        <HeroMatrix />
      </div>
      <div id="overview">
        <QuickOverview />
      </div>
      <div id="curriculum">
        <Curriculum />
      </div>
      <div id="instructors">
        <InstructorsMatrix />
      </div>
      
      <Footer />
    </div>
  )
}
