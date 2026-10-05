import { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DetectorPage from './pages/DetectorPage'
import VideosPage from './pages/VideosPage'
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
import AboutSection from './components/AboutSection'
import VideoSection from './components/VideoSection'
import MissionVision from './components/MissionVision'
import ValuesSection from './components/ValuesSection'
import PlantJourney, { PlantStage, Anchor } from './components/journey/PlantJourney'
import { ANCHORS } from './components/journey/plantMap'
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
        {/* Recorrido del Manual de Marca: la flor (quiénes somos), el tallo (productos)
            y las raíces (misión, visión, valores), con la planta fija a la derecha. */}
        <PlantJourney>
          <PlantStage stage="flor" tone="light">
            <Anchor at={ANCHORS.hero} node="flor">
              <Hero onDemoClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })} />
            </Anchor>
            <Anchor at={ANCHORS.about} node="flor"><AboutSection /></Anchor>
            <Anchor at={ANCHORS.video}><VideoSection /></Anchor>
          </PlantStage>
          <PlantStage stage="tallo" tone="light">
            <Anchor at={ANCHORS.problem}><ProblemSection /></Anchor>
            <SolutionSection />
            <Anchor at={ANCHORS.howItWorks}><HowItWorks /></Anchor>
            <Anchor at={ANCHORS.metrics}><MetricsSection /></Anchor>
          </PlantStage>
          <PlantStage stage="raices" tone="dark">
            <MissionVision />
            <ValuesSection />
            <Anchor at={ANCHORS.whyUs}><WhyUs /></Anchor>
            <Anchor at={ANCHORS.segments}><SegmentsSection /></Anchor>
          </PlantStage>
        </PlantJourney>
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
        <Route path="/videos" element={<VideosPage />} />
        <Route path="*" element={home} />
      </Routes>
    </BrowserRouter>
  )
}
