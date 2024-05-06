import LandingContent from '@/components/LandingContent'
import LandingHero from '@/components/LandingHero'
import LandingNavbar from '@/components/LandingNavbar'
import React from 'react'

const LandingPage = () => {
  return (
    <div className='h-full'>
        <LandingNavbar />
        <LandingHero />
        <LandingContent />
    </div>
  )
}

export default LandingPage