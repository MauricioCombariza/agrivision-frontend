import { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DetectorPage from './pages/DetectorPage'
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

export const LangContext = createContext()

export function useLang() {
  return useContext(LangContext)
}

export default function App() {
  const [lang, setLang] = useState('es')
  const [loginOpen, setLoginOpen] = useState(false)

  const t = translations[lang]
  const toggleLang = () => setLang(l => l === 'es' ? 'en' : 'es')

  const home = (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      <Navbar onLoginClick={() => setLoginOpen(true)} />
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
      <Footer onLoginClick={() => setLoginOpen(true)} />
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </LangContext.Provider>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detector" element={<DetectorPage />} />
        <Route path="*" element={home} />
      </Routes>
    </BrowserRouter>
  )
}
