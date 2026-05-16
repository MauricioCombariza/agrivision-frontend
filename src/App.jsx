import { createContext, useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { translations } from './translations'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import HowItWorks from './components/HowItWorks'
import MetricsSection from './components/MetricsSection'
import WhyUs from './components/WhyUs'
import SegmentsSection from './components/SegmentsSection'
import MeetingSection from './components/MeetingSection'
import LoginModal from './components/LoginModal'
import Footer from './components/Footer'
import DetectorPage from './detector/DetectorPage'

export const LangContext = createContext()

export function useLang() {
  return useContext(LangContext)
}

function LandingPage({ onLoginClick }) {
  return (
    <>
      <Navbar onLoginClick={onLoginClick} />
      <main>
        <Hero onDemoClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })} />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <MetricsSection />
        <WhyUs />
        <SegmentsSection />
        <MeetingSection />
      </main>
      <Footer onLoginClick={onLoginClick} />
    </>
  )
}

export default function App() {
  const [lang, setLang] = useState('es')
  const [loginOpen, setLoginOpen] = useState(false)

  const t = translations[lang]
  const toggleLang = () => setLang(l => l === 'es' ? 'en' : 'es')

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      <Routes>
        <Route path="/detector" element={<DetectorPage />} />
        <Route path="*" element={<LandingPage onLoginClick={() => setLoginOpen(true)} />} />
      </Routes>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </LangContext.Provider>
  )
}
