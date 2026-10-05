import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Command, Github, Linkedin, Mail, Sparkles } from 'lucide-react'

type Mode = 'business' | 'builder'

const projects = [
  {
    title: 'Margin Studio',
    type: 'Decision Tool',
    body: 'Pricing, margin, tax and multi-year scenario playground designed to speed up sales decisions.',
    tags: ['Pricing', 'Sales Ops', 'Scenario'],
    mode: 'business',
  },
  {
    title: 'AE Intel',
    type: 'Sales Intelligence',
    body: 'A structured account-hunting workflow for research, outreach, follow-up and opportunity tracking.',
    tags: ['AI', 'Sales', 'Workflow'],
    mode: 'business',
  },
  {
    title: 'StartFrom',
    type: 'PWA Product',
    body: 'A local-first financial roadmap app that turns goals into a practical daily plan.',
    tags: ['PWA', 'AI', 'Product'],
    mode: 'builder',
  },
  {
    title: 'CangkulYuk!',
    type: 'Realtime Game',
    body: 'A realtime Indonesian card game with bot logic, multiplayer state and resilient reconnect flows.',
    tags: ['Realtime', 'Supabase', 'Game'],
    mode: 'builder',
  },
]

const career = [
  ['2026 — now', 'Account Executive', 'Datalabs', 'Cloud, AI, enterprise conversations, account development.'],
  ['2024 — 2026', 'Business Development', 'PT. Berkah Niaga Globalindo', 'B2B negotiation, procurement and strategic growth.'],
  ['2021 — 2022', 'Business Representative', 'PT. Berca Hardayaperkasa', 'Enterprise IT sales and 100% annual quota achievement.'],
]

export default function App() {
  const [mode, setMode] = useState<Mode>('business')
  const [commandOpen, setCommandOpen] = useState(false)
  const [easter, setEaster] = useState(0)
  const [margin, setMargin] = useState(18)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen(v => !v)
      }
      if (e.key === 'Escape') setCommandOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const visibleProjects = useMemo(
    () => projects.filter(p => p.mode === mode),
    [mode]
  )

  const sellPrice = Math.round(850_000_000 / (1 - margin / 100))

  return (
    <main>
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <nav className="nav shell">
        <a href="#top" className="brand">PERMADIAZ</a>
        <div className="nav-right">
          <button className="cmd" onClick={() => setCommandOpen(true)}>
            <Command size={15}/> <span>⌘K</span>
          </button>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero shell">
        <motion.div
          className="eyebrow"
          initial={{opacity:0,y:10}}
          animate={{opacity:1,y:0}}
          transition={{duration:.5}}
        >
          <Sparkles size={14}/> Business × Cloud × AI × Product
        </motion.div>

        <motion.h1
          initial={{opacity:0,y:18}}
          animate={{opacity:1,y:0}}
          transition={{duration:.65,delay:.08}}
        >
          I turn <span>complex technology</span><br/>into clear business momentum.
        </motion.h1>

        <motion.p
          className="lede"
          initial={{opacity:0,y:18}}
          animate={{opacity:1,y:0}}
          transition={{duration:.65,delay:.16}}
        >
          Dias Dzuhry Permadi — an account executive and business developer who also prototypes, builds and ships digital products.
        </motion.p>

        <div className="hero-actions">
          <a className="button primary magnetic" href="#work">Explore my work <ArrowUpRight size={17}/></a>
          <a className="button ghost" href="/cv.html" target="_blank">Open CV</a>
        </div>

        <div className="mode-switch" role="group" aria-label="Profile mode">
          <button className={mode==='business'?'active':''} onClick={()=>setMode('business')}>Business</button>
          <button className={mode==='builder'?'active':''} onClick={()=>setMode('builder')}>Builder</button>
          <motion.div className="mode-pill" animate={{x: mode==='business' ? 0 : '100%'}} transition={{type:'spring',stiffness:320,damping:28}}/>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            className="mode-copy"
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-8}}
            transition={{duration:.25}}
          >
            {mode === 'business'
              ? 'Enterprise conversations, commercial strategy, cloud & AI solution selling.'
              : 'Product experiments, front-end systems, automation and AI-assisted prototyping.'}
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="work" className="shell section">
        <div className="section-head">
          <div>
            <div className="kicker">Selected Work</div>
            <h2>Built to be explored.</h2>
          </div>
          <span className="hint">hover · click · play</span>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project, i) => (
            <motion.article
              className="project-card"
              key={project.title}
              initial={{opacity:0,y:22}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true,amount:.3}}
              transition={{duration:.45,delay:i*.06}}
              whileHover={{y:-7,rotateX:1.5,rotateY:-1.5}}
            >
              <div className="project-top">
                <span>{project.type}</span>
                <ArrowUpRight size={18}/>
              </div>
              <h3>{project.title}</h3>
              <p>{project.body}</p>
              <div className="tags">{project.tags.map(t=><span key={t}>{t}</span>)}</div>
            </motion.article>
          ))}
        </div>

        {mode === 'business' && (
          <div className="playground">
            <div>
              <div className="kicker">Mini Playground</div>
              <h3>Margin Studio — live concept</h3>
              <p>Move the margin. The output reacts instantly.</p>
            </div>
            <div className="calc">
              <div className="calc-row"><span>Cost</span><b>Rp850.000.000</b></div>
              <label>
                <span>Margin <b>{margin}%</b></span>
                <input type="range" min="5" max="35" value={margin} onChange={e=>setMargin(Number(e.target.value))}/>
              </label>
              <div className="result">
                <span>Suggested sell price</span>
                <strong>Rp{sellPrice.toLocaleString('id-ID')}</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="shell section">
        <div className="section-head">
          <div>
            <div className="kicker">Career</div>
            <h2>A commercial path through technology.</h2>
          </div>
        </div>
        <div className="timeline">
          {career.map(([year,role,org,desc],i)=>(
            <motion.div
              className="timeline-item"
              key={role}
              initial={{opacity:0,x:-18}}
              whileInView={{opacity:1,x:0}}
              viewport={{once:true,amount:.35}}
              transition={{duration:.4,delay:i*.05}}
            >
              <div className="dot"/>
              <div className="year">{year}</div>
              <div>
                <h3>{role}</h3>
                <div className="org">{org}</div>
                <p>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact shell section">
        <div>
          <div className="kicker">Contact</div>
          <h2>Good conversations usually start simple.</h2>
          <p>Cloud, AI, enterprise sales, product ideas, or just a useful introduction.</p>
        </div>
        <div className="contact-links">
          <a href="mailto:permadi.diaz@gmail.com"><Mail size={18}/> Email</a>
          <a href="https://linkedin.com/in/dias-d-permadi-7b9417179" target="_blank"><Linkedin size={18}/> LinkedIn</a>
          <a href="https://github.com/permadiaz" target="_blank"><Github size={18}/> GitHub</a>
        </div>
      </section>

      <footer className="shell footer">
        <button onClick={()=>setEaster(v=>v+1)}>Built by Dias. Mostly.</button>
        {easter >= 5 && <span>System: curiosity detected +1</span>}
      </footer>

      <AnimatePresence>
        {commandOpen && (
          <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setCommandOpen(false)}>
            <motion.div className="palette" initial={{opacity:0,scale:.96,y:-12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.98,y:-8}} onClick={e=>e.stopPropagation()}>
              <div className="palette-head"><Command size={17}/> Navigate</div>
              {[
                ['About / Hero','#top'],
                ['Selected Work','#work'],
                ['Contact','#contact'],
                ['Open CV','/cv.html'],
              ].map(([label,href])=>(
                <a key={label} href={href} onClick={()=>setCommandOpen(false)}>
                  <span>{label}</span><ArrowUpRight size={16}/>
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}