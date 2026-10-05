import { useEffect, useMemo, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Command,
  Github,
  Linkedin,
  Mail,
  MousePointer2,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

type Mode = 'business' | 'builder'

type Project = {
  title: string
  eyebrow: string
  summary: string
  detail: string
  tags: string[]
  mode: Mode
  href?: string
  stat: string
  statLabel: string
}

const projects: Project[] = [
  {
    title: 'Margin Studio',
    eyebrow: 'Commercial Decision Engine',
    summary: 'Pricing, margin, tax, discount, and multi-year scenario thinking turned into one sales playground.',
    detail: 'Built around one job: shorten the time between receiving principle cost and deciding the customer-facing number. It keeps previous scenarios visible so commercial trade-offs are easy to compare.',
    tags: ['Pricing', 'Sales Ops', 'Decision UX'],
    mode: 'business',
    stat: 'Seconds',
    statLabel: 'to compare scenarios',
  },
  {
    title: 'AE Intel',
    eyebrow: 'Account Intelligence System',
    summary: 'A practical operating system for account research, outreach, discovery, follow-up, and opportunity memory.',
    detail: 'Designed around real enterprise hunting: contact mapping, evidence-based research, conversation strategy, follow-up timing, and movement from lead to qualified opportunity.',
    tags: ['AI Workflow', 'Account Strategy', 'Sales'],
    mode: 'business',
    stat: '1',
    statLabel: 'account at a time',
  },
  {
    title: 'StartFrom',
    eyebrow: 'Local-first PWA',
    summary: 'A personal financial roadmap experience that turns a target into a practical daily plan.',
    detail: 'A cost-conscious product experiment: installable, offline-capable, local-first, and designed to stay useful without requiring an expensive backend.',
    tags: ['PWA', 'AI', 'Product'],
    mode: 'builder',
    href: 'https://startfrom.my.id',
    stat: '0',
    statLabel: 'mandatory backend cost',
  },
  {
    title: 'CangkulYuk!',
    eyebrow: 'Realtime Multiplayer',
    summary: 'An Indonesian card game with multiplayer state, reconnect behavior, bots, and automatic host migration.',
    detail: 'Built as a real product experiment instead of a static demo: gameplay rules separated from the DOM, multiplayer presence, recovery flows, and automated simulation tests.',
    tags: ['Realtime', 'Supabase', 'Game'],
    mode: 'builder',
    href: 'https://cangkulyuk.my.id',
    stat: '5K+',
    statLabel: 'simulated test runs',
  },
]

const career = [
  {
    period: '2026 — now',
    role: 'Account Executive',
    org: 'Datalabs',
    copy: 'Enterprise conversations around cloud, AI, data, and business outcomes in the Google Cloud ecosystem.',
    current: true,
  },
  {
    period: '2026',
    role: 'Curriculum & AI Transformation',
    org: 'Aman Jaya',
    copy: 'Built practical digital concepts around curriculum control, RPS consistency, dashboards, and AI for Work.',
  },
  {
    period: '2024 — 2026',
    role: 'Business Development',
    org: 'PT. Berkah Niaga Globalindo',
    copy: 'B2B negotiation, procurement, consulting relationships, team coordination, and strategic growth.',
  },
  {
    period: '2021 — 2022',
    role: 'Business Representative — IT Solutions',
    org: 'PT. Berca Hardayaperkasa',
    copy: 'Enterprise IT sales, account management, tenders, and 100% annual quota achievement.',
  },
]

const businessCapabilities = [
  'Enterprise / B2B Sales',
  'Account Development',
  'Consultative Selling',
  'Tender & Procurement',
  'Cloud & AI Conversations',
  'Commercial Strategy',
]

const builderCapabilities = [
  'Product Prototyping',
  'AI-assisted Development',
  'TypeScript / Web Apps',
  'Supabase / Realtime',
  'Workflow Automation',
  'UX for Decision Tools',
]

function formatIDR(value: number) {
  return 'Rp' + Math.round(value).toLocaleString('id-ID')
}

export default function App() {
  const [mode, setMode] = useState<Mode>('business')
  const [commandOpen, setCommandOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [costInput, setCostInput] = useState('')
  const [margin, setMargin] = useState(18)
  const [taxMode, setTaxMode] = useState<'off' | '11' | 'custom'>('11')
  const [customTax, setCustomTax] = useState(12)
  const [easter, setEaster] = useState(0)

  const pointerX = useMotionValue(-400)
  const pointerY = useMotionValue(-400)
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 26, mass: 0.45 })
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 26, mass: 0.45 })

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32 })
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 110])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.45])

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointerX.set(e.clientX)
      pointerY.set(e.clientY)
    }
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen(v => !v)
      }
      if (e.key === 'Escape') {
        setCommandOpen(false)
        setSelected(null)
      }
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('keydown', key)
    }
  }, [pointerX, pointerY])

  const visibleProjects = useMemo(() => projects.filter(p => p.mode === mode), [mode])
  const capabilities = mode === 'business' ? businessCapabilities : builderCapabilities
  const cost = Number(costInput.replace(/\D/g, '')) || 0
  const sellPrice = cost > 0 ? cost / (1 - margin / 100) : 0
  const taxRate = taxMode === 'off' ? 0 : taxMode === '11' ? 11 : Math.max(0, customTax)
  const taxAmount = sellPrice * (taxRate / 100)
  const finalPrice = sellPrice + taxAmount

  return (
    <main className="site">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <motion.div className="cursor-glow" style={{ x: smoothX, y: smoothY }} />
      <div className="noise" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />

      <nav className="nav shell">
        <a className="brand" href="#top">PERMADIAZ<span>.</span></a>
        <div className="nav-center">
          <a href="#work">Work</a>
          <a href="#career">Career</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-right">
          <button className="command-trigger" onClick={() => setCommandOpen(true)}>
            <Command size={14} />
            <span className="command-label">Navigate</span>
            <kbd>⌘K</kbd>
          </button>
        </div>
      </nav>

      <section id="top" className="hero shell">
        <motion.div className="hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            className="availability"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="pulse-dot" />
            Account Executive · Cloud & AI · Jakarta
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .72, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Business brain.<br />
            <span className="gradient-text">Builder instinct.</span>
          </motion.h1>

          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .62, delay: .1 }}
          >
            I work at the intersection of enterprise sales, cloud & AI, and hands-on product building —
            translating complexity into something people can buy, use, and understand.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .18 }}
          >
            <a className="button button-primary" href="#work">
              Explore the system <ArrowDownRight size={17} />
            </a>
          </motion.div>

          <div className="hero-bottom">
            <div className="mode-shell">
              <div className="mode-label">Perspective</div>
              <div className="mode-switch" role="group" aria-label="Choose profile perspective">
                <motion.div
                  className="mode-indicator"
                  animate={{ x: mode === 'business' ? 0 : '100%' }}
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                />
                <button className={mode === 'business' ? 'active' : ''} onClick={() => setMode('business')}>
                  Business
                </button>
                <button className={mode === 'builder' ? 'active' : ''} onClick={() => setMode('builder')}>
                  Builder
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                className="perspective-copy"
                key={mode}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -7 }}
              >
                {mode === 'business'
                  ? 'Commercial strategy, account movement, customer conversations, and business outcomes.'
                  : 'Prototyping, automation, product systems, and shipping ideas into working software.'}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <section className="marquee-wrap" aria-hidden="true">
        <div className="marquee">
          <span>SELL THE OUTCOME</span><i>✦</i><span>BUILD THE PROOF</span><i>✦</i>
          <span>MAKE IT CLEAR</span><i>✦</i><span>KEEP IT USEFUL</span><i>✦</i>
          <span>SELL THE OUTCOME</span><i>✦</i><span>BUILD THE PROOF</span><i>✦</i>
        </div>
      </section>

      <section className="shell proof-grid section">
        <article>
          <span className="proof-number">8+</span>
          <p>years across B2B sales, account management, and business development</p>
        </article>
        <article>
          <span className="proof-number">100%</span>
          <p>annual quota achievement at Berca Hardayaperkasa</p>
        </article>
        <article>
          <span className="proof-number">2+</span>
          <p>live digital products built and shipped independently</p>
        </article>
        <article>
          <span className="proof-number">1</span>
          <p>operating principle: make complicated things easier to act on</p>
        </article>
      </section>

      <section id="work" className="shell section">
        <div className="section-head">
          <div>
            <div className="kicker">Selected systems</div>
            <h2>From business problems<br />to <em>working products.</em></h2>
          </div>
          <div className="section-side">
            <MousePointer2 size={16} />
            Try the cards
          </div>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <motion.button
              className="project-card"
              key={project.title}
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ duration: .48, delay: index * .06 }}
              whileHover={{ y: -8 }}
            >
              <div className="project-card-top">
                <span>{project.eyebrow}</span>
                <div className="project-arrow"><ArrowUpRight size={18} /></div>
              </div>
              <div className="project-card-body">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="project-card-bottom">
                <div className="tag-row">
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <div className="micro-stat">
                  <b>{project.stat}</b>
                  <small>{project.statLabel}</small>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {mode === 'business' && (
          <motion.div
            className="playground"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="playground-copy">
              <div className="kicker">Playground · Margin Studio</div>
              <h3>Build your own<br />pricing scenario.</h3>
              <p>
                Start with a cost, adjust the margin, then decide whether tax should be added. The numbers react instantly.
              </p>

              <label className="cost-field">
                <span>Principle cost</span>
                <div className="currency-input">
                  <span>Rp</span>
                  <input
                    inputMode="numeric"
                    placeholder="0"
                    value={costInput ? Number(costInput.replace(/\D/g, '')).toLocaleString('id-ID') : ''}
                    onChange={event => setCostInput(event.target.value.replace(/\D/g, ''))}
                    aria-label="Principle cost"
                  />
                </div>
              </label>
            </div>

            <div className="calculator">
              <div className="calculator-head">
                <span>Live pricing scenario</span>
                <Zap size={16} />
              </div>

              <label>
                <div className="range-label">
                  <span>Target margin</span>
                  <b>{margin}%</b>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={margin}
                  onChange={event => setMargin(Number(event.target.value))}
                />
              </label>

              <div className="tax-control">
                <div className="tax-title">
                  <span>Tax</span>
                  <b>{taxRate}%</b>
                </div>
                <div className="tax-options">
                  <button className={taxMode === 'off' ? 'active' : ''} onClick={() => setTaxMode('off')}>Off</button>
                  <button className={taxMode === '11' ? 'active' : ''} onClick={() => setTaxMode('11')}>11%</button>
                  <button className={taxMode === 'custom' ? 'active' : ''} onClick={() => setTaxMode('custom')}>Custom</button>
                </div>
                {taxMode === 'custom' && (
                  <label className="custom-tax">
                    <span>Tax rate</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customTax}
                      onChange={event => setCustomTax(Number(event.target.value))}
                    />
                    <b>%</b>
                  </label>
                )}
              </div>

              {cost > 0 ? (
                <>
                  <div className="price-output">
                    <span>Sell price before tax</span>
                    <motion.strong key={'sell-' + margin + cost} initial={{ opacity: .45, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                      {formatIDR(sellPrice)}
                    </motion.strong>
                  </div>
                  <div className="calc-meta"><span>Gross profit</span><b>{formatIDR(sellPrice - cost)}</b></div>
                  <div className="calc-meta"><span>Tax ({taxRate}%)</span><b>{formatIDR(taxAmount)}</b></div>
                  <div className="final-price">
                    <span>Final price</span>
                    <motion.strong key={'final-' + margin + taxRate + cost} initial={{ opacity: .5, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                      {formatIDR(finalPrice)}
                    </motion.strong>
                  </div>
                </>
              ) : (
                <div className="calculator-empty">
                  <span>Enter a cost to start exploring</span>
                  <small>Then play with margin and tax to see the commercial impact.</small>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </section>

      <section className="shell section capabilities">
        <div className="section-head compact">
          <div>
            <div className="kicker">{mode === 'business' ? 'Commercial layer' : 'Builder layer'}</div>
            <h2>The capability stack.</h2>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="capability-grid"
            key={mode}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {capabilities.map((item, index) => (
              <motion.div
                className="capability-pill"
                key={item}
                initial={{ opacity: 0, scale: .97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * .035 }}
              >
                <span>0{index + 1}</span>
                {item}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="career" className="shell section career-section">
        <div className="section-head">
          <div>
            <div className="kicker">Career signal</div>
            <h2>Commercial experience.<br />Technical curiosity.</h2>
          </div>
        </div>
        <div className="timeline">
          {career.map((item, index) => (
            <motion.article
              className="timeline-item"
              key={item.role + item.org}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: .35 }}
              transition={{ duration: .42, delay: index * .055 }}
            >
              <div className="timeline-node">
                <span className={item.current ? 'current' : ''} />
              </div>
              <div className="timeline-period">{item.period}</div>
              <div className="timeline-main">
                <div className="timeline-title">
                  <h3>{item.role}</h3>
                  {item.current && <small>Current</small>}
                </div>
                <div className="timeline-org">{item.org}</div>
                <p>{item.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="shell manifesto section">
        <div className="kicker">How I think</div>
        <div className="manifesto-grid">
          <h2>Technology is only useful when somebody can decide what to do next.</h2>
          <div>
            <p>
              My strongest work sits between business and technology: understand the commercial problem,
              make the language simpler, prototype the idea, and move the conversation forward.
            </p>
            <p>
              I don't need every project to become a platform. Sometimes the best product is the smallest thing
              that removes uncertainty.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="shell contact section">
        <div className="contact-card">
          <div className="contact-top">
            <div>
              <div className="kicker">Open channel</div>
              <h2>Useful conversation?</h2>
              <p>Cloud, AI, enterprise sales, product ideas, partnerships, or a warm introduction.</p>
            </div>
            <BriefcaseBusiness size={28} />
          </div>
          <div className="contact-actions">
            <a href="mailto:dias.permadi@datalabs.id"><Mail size={18} /> Email</a>
            <a href="https://linkedin.com/in/dias-d-permadi-7b9417179" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
            <a href="https://github.com/permadiaz" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <button onClick={() => setEaster(v => v + 1)}>Built by Dias. Mostly.</button>
        <span>permadiaz.my.id · 2026</span>
        <AnimatePresence>
          {easter >= 5 && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="easter">
              curiosity detected +1
            </motion.span>
          )}
        </AnimatePresence>
      </footer>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, y: 24, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: .985 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={event => event.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}><X size={18} /></button>
              <div className="kicker">{selected.eyebrow}</div>
              <h3>{selected.title}</h3>
              <p>{selected.detail}</p>
              <div className="tag-row modal-tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="modal-stat">
                <strong>{selected.stat}</strong>
                <span>{selected.statLabel}</span>
              </div>
              {selected.href && (
                <a className="button button-primary modal-link" href={selected.href} target="_blank" rel="noreferrer">
                  Open live project <ArrowUpRight size={16} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {commandOpen && (
          <motion.div
            className="overlay command-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandOpen(false)}
          >
            <motion.div
              className="palette"
              initial={{ opacity: 0, y: -16, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: .985 }}
              onClick={event => event.stopPropagation()}
            >
              <div className="palette-head">
                <div><Command size={17} /> Jump anywhere</div>
                <kbd>ESC</kbd>
              </div>
              {[
                ['01', 'Top', '#top'],
                ['02', 'Selected work', '#work'],
                ['03', 'Career', '#career'],
                ['04', 'Contact', '#contact'],
              ].map(([number, label, href]) => (
                <a key={label} href={href} onClick={() => setCommandOpen(false)}>
                  <span><small>{number}</small>{label}</span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
