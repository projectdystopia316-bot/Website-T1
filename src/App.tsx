import { useRef, useCallback, useState } from 'react'
import { Shell } from './components/layout/Shell'
import { Hero } from './components/hero/Hero'
import { FeatureGrid } from './components/features/FeatureGrid'
import { WasherShowcase } from './components/washer/WasherShowcase'
import WhatItCanDoGalaxy from './sections/WhatItCanDoGalaxy'
import { PersonaGrid } from './components/personas/PersonaGrid'
import { AudienceWheel } from './components/outcomes/AudienceWheel'
import { UnderTheHood } from './components/flow/UnderTheHood'
import { WaitlistForm } from './components/waitlist/WaitlistForm'
import { Footer } from './components/layout/Footer'
import { ToastProvider } from './lib/toast'
import { pageConfig, type AudienceFilter, type Audience } from './lib/config'

function App() {
  const { sections } = pageConfig
  const tasksRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tasksFilter, setTasksFilter] = useState<AudienceFilter | 'all'>('all')

  const handleAudienceSelect = useCallback(
    (filter: AudienceFilter) => {
      // Set the filter state
      setTasksFilter(filter)

      // Scroll to tasks section
      const tasksElement = document.getElementById('tasks')
      if (tasksElement) {
        tasksElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      // Trigger the sector filter in TaskGalaxy after scroll completes
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('select_galaxy_sector', {
            detail: { sector: filter },
          })
        )
      }, 800)
    },
    []
  )

  return (
    <ToastProvider>
      <Shell>
        {/* Hero Section */}
        {sections.hero.enabled && (
          <div id="hero">
            <Hero />
          </div>
        )}

        {/* Features Section */}
        {sections.features.enabled && (
          <div id="features">
            <FeatureGrid />
          </div>
        )}

        {/* Washer Showcase Section */}
        {sections.washer.enabled && (
          <div id="washer">
            <WasherShowcase />
          </div>
        )}

        {/* What It Can Do - Galaxy Section */}
        {sections.tasks.enabled && (
          <div id="tasks" ref={tasksRef}>
            <WhatItCanDoGalaxy />
          </div>
        )}

        {/* Persona Grid Section */}
        {sections.personas.enabled && (
          <div id="personas">
            <PersonaGrid />
          </div>
        )}

        {/* Audience Wheel Section */}
        {sections.wheel.enabled && (
          <div id="audience-wheel">
            <AudienceWheel
              title={sections.wheel.props?.title as string}
              subtitle={sections.wheel.props?.subtitle as string}
              small={sections.wheel.props?.small as string | undefined}
              ringOpacity={sections.wheel.props?.ringOpacity as number | undefined}
              audiences={sections.wheel.props?.audiences as Audience[]}
              onSelect={handleAudienceSelect}
            />
          </div>
        )}

        {/* Under the Hood Section */}
        {sections.flow.enabled && (
          <div id="how-it-works">
            <UnderTheHood />
          </div>
        )}

        {/* Waitlist Section - Final CTA */}
        {sections.waitlist.enabled && (
          <div id="waitlist">
            <WaitlistForm />
          </div>
        )}

        {/* Footer */}
        {sections.footer.enabled && <Footer />}
      </Shell>
    </ToastProvider>
  )
}

export default App

