import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import MarginLab from './MarginLab'
import { projects, type ProjectId } from './content'
import { Dialog, ProjectArt } from './ui'

const pitchNames = ['Introduction', 'Approach', 'Selected work', 'Live demonstration', 'Conversation']

export default function Pitch({ onClose }: { onClose: () => void }) {
  const [slide, setSlide] = useState(0)
  const [selectedWork, setSelectedWork] = useState<ProjectId>('margin')
  const [fullscreenError, setFullscreenError] = useState('')
  const enteredFullscreen = useRef(false)
  const work = projects.find(p => p.id === selectedWork)!
  const go = (next: number) => setSlide(Math.max(0, Math.min(4, next)))
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input, textarea, select')) return
      if (event.key === 'ArrowRight') { event.preventDefault(); setSlide(v => Math.min(4, v + 1)) }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSlide(v => Math.max(0, v - 1)) }
    }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); if (enteredFullscreen.current && document.fullscreenElement === document.documentElement) void document.exitFullscreen().catch(() => {}) }
  }, [])
  async function fullscreen() {
    try {
      if (document.fullscreenElement) { await document.exitFullscreen(); enteredFullscreen.current = false }
      else if (document.documentElement.requestFullscreen) { await document.documentElement.requestFullscreen(); enteredFullscreen.current = true }
      else setFullscreenError('Full screen is not available in this browser. Presentation mode is ready to use here.')
    } catch { setFullscreenError('Full screen is not available here. You can continue with the presentation.') }
  }
  return <Dialog titleId="pitch-title" className="pitch-dialog" onClose={onClose}><div className="pitch-shell">
    <header className="pitch-header"><div className="brand">PERMADIAZ<span>.</span></div><span className="pitch-mode-label">A short introduction</span><div><button className="icon-button" onClick={fullscreen} aria-label="Toggle full screen"><Expand size={18} /></button><button className="icon-button" onClick={onClose} aria-label="Close presentation"><X size={21} /></button></div></header>
    <div className="pitch-stage" key={slide}>
      {slide === 0 && <div className="pitch-intro"><span className="eyebrow">Dias Dzuhry Permadi</span><h2 id="pitch-title">Business brain.<br /><em>Builder instinct.</em></h2><p>Account Executive at Datalabs.<br />Enterprise sales experience. Hands-on product curiosity.</p><div className="pitch-proof"><span><b>8+</b> years in B2B</span><span><b>100%</b> annual quota at Berca</span><span><b>2</b> independent live products</span></div></div>}
      {slide === 1 && <div className="pitch-approach"><span className="eyebrow">How I work</span><h2 id="pitch-title">Make the problem<br /><em>easier to act on.</em></h2><div className="pitch-method"><article><span>01</span><h3>Understand the context.</h3><p>Ask about the goal, the people, and the constraint.</p></article><article><span>02</span><h3>Make an idea tangible.</h3><p>Use a scenario, a prototype, or a working demonstration.</p></article><article><span>03</span><h3>Agree on the next move.</h3><p>Turn the conversation into a clear, useful next step.</p></article></div></div>}
      {slide === 2 && <div className="pitch-work"><div><span className="eyebrow">Selected work</span><h2 id="pitch-title">Ideas you can<br /><em>put your hands on.</em></h2><div className="pitch-work-tabs" role="group" aria-label="Choose a project to present">{projects.map(project => <button key={project.id} onClick={() => setSelectedWork(project.id)} aria-pressed={selectedWork === project.id}>{project.name}</button>)}</div><h3>{work.name}</h3><p>{work.intro}</p><span className="project-status">{work.status}</span>{work.href && <a className="text-link" href={work.href} target="_blank" rel="noreferrer">Open live product <ArrowUpRight size={16} /></a>}</div><ProjectArt id={work.id} /></div>}
      {slide === 3 && <div className="pitch-lab"><div className="pitch-lab-heading"><span className="eyebrow">Try it together</span><h2 id="pitch-title">See the trade-off.</h2><p>Enter an example cost, save a reference, and explore another margin.</p></div><MarginLab compact /></div>}
      {slide === 4 && <div className="pitch-ending"><span className="eyebrow">The next conversation</span><h2 id="pitch-title">What are you<br /><em>trying to solve?</em></h2><p>A cloud or AI question, a product idea,<br />or a business challenge worth exploring.</p><a className="button button-primary" href="mailto:dias.permadi@datalabs.id">Let’s talk <ArrowUpRight size={18} /></a><span className="pitch-email">dias.permadi@datalabs.id</span></div>}
    </div><div className="pitch-alert" role="status">{fullscreenError}</div>
    <footer className="pitch-footer"><span className="pitch-slide-name" aria-live="polite">0{slide + 1} / 05 <span>{pitchNames[slide]}</span></span><div className="pitch-progress" aria-hidden="true">{pitchNames.map((name, i) => <i key={name} className={i === slide ? 'active' : ''} />)}</div><div className="pitch-buttons"><button className="icon-button" onClick={() => go(slide - 1)} disabled={slide === 0} aria-label="Previous slide"><ChevronLeft size={23} /></button><button className="icon-button" onClick={() => go(slide + 1)} disabled={slide === 4} aria-label="Next slide"><ChevronRight size={23} /></button></div></footer>
  </div></Dialog>
}
