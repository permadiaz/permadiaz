import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCheck,
  CircleHelp,
  Copy,
  Github,
  Linkedin,
  Mail,
  Menu,
  Play,
  ScanLine,
  X,
} from "lucide-react";
import MarginLab from "./MarginLab";
import { career, projects, type Project, type ProjectId } from "./content";
import { Dialog, ProjectArt, Studio } from "./ui";
const Pitch = lazy(() => import("./Pitch"));
const EMAIL = "dias.permadi@datalabs.id";

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [xray, setXray] = useState(false);
  function openLab() {
    onClose();
    window.setTimeout(
      () =>
        document
          .getElementById("lab")
          ?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          }),
      30,
    );
  }
  return (
    <Dialog
      titleId="project-title"
      className={`project-dialog theme-${project.color}`}
      onClose={onClose}
    >
      <div className="dialog-topline">
        <span className="eyebrow">{project.status}</span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={20} />
        </button>
      </div>
      <div className="project-dialog-grid">
        <div>
          <h2 id="project-title">{project.name}</h2>
          <p className="dialog-lead">{project.intro}</p>
          <button
            className="xray-toggle"
            onClick={() => setXray((v) => !v)}
            aria-pressed={xray}
          >
            <ScanLine size={16} />
            {xray ? "Back to the overview" : "Look behind the build"}
          </button>
        </div>
        <ProjectArt id={project.id} small />
      </div>
      {xray ? (
        <div className="xray-content">
          <div className="eyebrow">Decisions behind the work</div>
          {project.decisions.map((decision, i) => (
            <div className="xray-row" key={decision}>
              <span>0{i + 1}</span>
              <p>{decision}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="project-overview">
          <div>
            <span className="eyebrow">The question</span>
            <p>{project.problem}</p>
          </div>
          <div>
            <span className="eyebrow">What you can explore</span>
            <p>{project.proof}</p>
          </div>
        </div>
      )}
      <div className="dialog-actions">
        {project.href ? (
          <a
            className="button button-primary"
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            Open live product <ArrowUpRight size={17} />
          </a>
        ) : project.id === "margin" ? (
          <button className="button button-primary" onClick={openLab}>
            Try the pricing lab <ArrowDownRight size={17} />
          </button>
        ) : (
          <a
            className="button button-primary"
            href="#challenge"
            onClick={onClose}
          >
            Try a sales scenario <ArrowDownRight size={17} />
          </a>
        )}
        <button className="text-button" onClick={onClose}>
          Keep exploring <ArrowRight size={15} />
        </button>
      </div>
    </Dialog>
  );
}

const choices = [
  {
    label: "Match the requested discount.",
    note: "A concession needs context.",
    detail:
      "A lower price may help, but first I would check the scope, margin, and what the customer commits to in return. Otherwise the same request can come back again.",
    next: "Compare the commercial impact in the pricing lab.",
  },
  {
    label: "Ask what is driving the number.",
    note: "That is where I would start.",
    detail:
      "Is it a budget ceiling, a competing offer, or uncertainty about the value? Each answer leads to a different conversation. I would clarify that before choosing a price move.",
    next: "Agree on the constraint, then explore a scenario together.",
  },
  {
    label: "Walk through every feature.",
    note: "Make the explanation relevant.",
    detail:
      "A feature matters when it answers the customer’s problem. I would connect the most relevant capability to an outcome, then check whether it changes their concern.",
    next: "Find the outcome they care about before expanding the demo.",
  },
];

function DecisionChallenge() {
  const [choice, setChoice] = useState<number | null>(null);
  return (
    <section id="challenge" className="challenge section shell">
      <div className="challenge-question">
        <span className="eyebrow">A little commercial instinct</span>
        <h2>
          They ask for 20% off.
          <br />
          <em>What’s your next move?</em>
        </h2>
        <p>
          A fictional first conversation. No confirmed budget, scope, or
          timeline yet.
        </p>
        <span className="challenge-stamp">
          <CircleHelp size={14} /> Explore a perspective. There is no score.
        </span>
      </div>
      <div className="challenge-interaction">
        <div
          className="challenge-options"
          role="group"
          aria-label="Choose your next sales action"
        >
          {choices.map((item, i) => (
            <button
              key={item.label}
              aria-pressed={choice === i}
              onClick={() => setChoice(i)}
            >
              <span>0{i + 1}</span>
              {item.label}
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <div
          className={`challenge-answer ${choice !== null ? "has-answer" : ""}`}
          aria-live="polite"
        >
          {choice !== null ? (
            <>
              <span className="eyebrow">How I see it</span>
              <h3>{choices[choice].note}</h3>
              <p>{choices[choice].detail}</p>
              <small>{choices[choice].next}</small>
            </>
          ) : (
            <>
              <span className="challenge-plus" aria-hidden="true">
                +
              </span>
              <p>
                Choose a move.
                <br />
                See how I think about it.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [project, setProject] = useState<Project | null>(null);
  const [pitch, setPitch] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [filter, setFilter] = useState<"all" | "business" | "builder">("all");
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const copyTimer = useRef<number>();
  const openProject = (id: ProjectId) =>
    setProject(projects.find((p) => p.id === id)!);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setCopyMessage("Email copied.");
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyMessage(`Copy this email: ${EMAIL}`);
    }
  }
  const visibleProjects = projects.filter(
    (p) =>
      filter === "all" ||
      (filter === "business"
        ? ["margin", "intel"].includes(p.id)
        : ["startfrom", "cangkul"].includes(p.id)),
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="nav shell" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Permadiaz home">
            PERMADIAZ<span>.</span>
          </a>
          <div className="nav-links">
            <a href="#work">The work</a>
            <a href="#challenge">The thinking</a>
            <a href="#about">The person</a>
          </div>
          <div className="nav-actions">
            <button className="present-button" onClick={() => setPitch(true)}>
              <Play size={12} fill="currentColor" /> Present
            </button>
            <button
              className="mobile-menu-button icon-button"
              aria-expanded={mobileNav}
              aria-controls="mobile-navigation"
              aria-label={mobileNav ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileNav((v) => !v)}
            >
              {mobileNav ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        {mobileNav && (
          <div id="mobile-navigation" className="mobile-navigation">
            <a href="#work" onClick={() => setMobileNav(false)}>
              The work
            </a>
            <a href="#challenge" onClick={() => setMobileNav(false)}>
              The thinking
            </a>
            <a href="#about" onClick={() => setMobileNav(false)}>
              The person
            </a>
            <a href="#contact" onClick={() => setMobileNav(false)}>
              Get in touch
            </a>
          </div>
        )}
      </header>
      <main id="main">
        <section id="top" className="hero shell">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="status-dot" />
              <span>DIAS DZUHRY PERMADI / JAKARTA</span>
            </div>
            <h1>
              Business
              <br />
              brain.
              <br />
              <em>
                Builder
                <br className="hero-break" /> instinct.
              </em>
            </h1>
            <p>
              I’m Dias, an Account Executive at Datalabs. I connect business
              questions with technology, and build things that make the next
              step clearer.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <ArrowDownRight size={18} />
              </a>
              <a className="text-link" href="#contact">
                Let’s talk <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-footnote">
              <span>COMMERCIAL EXPERIENCE.</span>
              <span>TECHNICAL CURIOSITY.</span>
            </div>
          </div>
          <Studio openProject={openProject} />
        </section>
        <div className="proof-strip shell">
          <div>
            <strong>8+</strong>
            <span>
              years across B2B sales
              <br />& business development
            </span>
          </div>
          <div>
            <strong>100%</strong>
            <span>
              annual quota achievement
              <br />
              at Berca Hardayaperkasa
            </span>
          </div>
          <div>
            <strong>2</strong>
            <span>
              independent products
              <br />
              built and shipped
            </span>
          </div>
          <a
            href="#work"
            className="proof-scroll"
            aria-label="Scroll to selected work"
          >
            <ArrowDown size={20} />
          </a>
        </div>
        <section id="work" className="work-section section shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Selected work / 01 — 04</span>
              <h2>
                Thinking, made
                <br />
                <em>tangible.</em>
              </h2>
            </div>
            <div className="work-intro">
              <p>
                Some ideas become products.
                <br />
                Others become a better way to work.
              </p>
              <div
                className="project-filter"
                role="group"
                aria-label="Filter projects"
              >
                <button
                  aria-pressed={filter === "all"}
                  onClick={() => setFilter("all")}
                >
                  All work
                </button>
                <button
                  aria-pressed={filter === "business"}
                  onClick={() => setFilter("business")}
                >
                  Business
                </button>
                <button
                  aria-pressed={filter === "builder"}
                  onClick={() => setFilter("builder")}
                >
                  Products
                </button>
              </div>
            </div>
          </div>
          <div className="project-grid">
            {visibleProjects.map((p) => (
              <article key={p.id} className={`project-card theme-${p.color}`}>
                <button
                  className="project-open"
                  onClick={() => setProject(p)}
                  aria-label={`Explore ${p.name}`}
                >
                  <div className="project-card-top">
                    <span>{p.category}</span>
                    <span className="project-status">{p.status}</span>
                  </div>
                  <ProjectArt id={p.id} />
                  <div className="project-card-bottom">
                    <div>
                      <h3>{p.name}</h3>
                      <p>{p.intro}</p>
                    </div>
                    <span className="round-arrow">
                      <ArrowUpRight size={23} />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>
        <section id="lab" className="lab-section section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Hands on / Margin Studio</span>
                <h2>
                  Move the margin.
                  <br />
                  <em>Keep the perspective.</em>
                </h2>
              </div>
              <p className="section-description">
                Try a number. Keep a reference.
                <br />
                See exactly what your next decision changes.
              </p>
            </div>
            <MarginLab />
          </div>
        </section>
        <DecisionChallenge />
        <section className="presentation-invitation shell">
          <div className="presentation-symbol" aria-hidden="true">
            <Play size={29} fill="currentColor" />
          </div>
          <div>
            <span className="eyebrow">Better in a conversation</span>
            <h2>Let me walk you through it.</h2>
            <p>
              A short, interactive introduction. Ready for the meeting room.
            </p>
          </div>
          <button
            className="button button-primary"
            onClick={() => setPitch(true)}
          >
            Start presentation <ArrowUpRight size={17} />
          </button>
        </section>
        <section id="about" className="about-section section shell">
          <div className="about-heading">
            <span className="eyebrow">The person behind the work</span>
            <h2>
              Commercial roots.
              <br />
              <em>A builder’s curiosity.</em>
            </h2>
            <p>
              I’ve worked across enterprise IT sales, business development, and
              digital initiatives. The thread through all of it: make complexity
              easier to understand and act on.
            </p>
            <div className="personal-note">
              <span>“</span>
              <p>
                I like the moment an abstract idea becomes something someone can
                actually try.
              </p>
              <small>Dias D. Permadi</small>
            </div>
          </div>
          <div className="career-timeline">
            {career.map((item, i) => (
              <article key={item.company}>
                <div className="career-year">
                  <span className={i === 0 ? "current-year" : ""}>
                    {item.year}
                  </span>
                  {i === 0 && <span className="status-dot" />}
                </div>
                <h3>{item.role}</h3>
                <span className="career-company">{item.company}</span>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="shell">
            <div className="contact-top">
              <span className="eyebrow">A useful next conversation</span>
              <span className="contact-asterisk" aria-hidden="true">
                ✳
              </span>
            </div>
            <h2>
              What are you
              <br />
              <em>working on?</em>
            </h2>
            <div className="contact-bottom">
              <p>
                A business challenge, a cloud or AI question,
                <br />
                or an idea worth making real.
              </p>
              <div className="contact-actions">
                <a className="button button-primary" href={`mailto:${EMAIL}`}>
                  <Mail size={17} /> Let’s talk <ArrowUpRight size={17} />
                </a>
                <a
                  className="button button-outline"
                  href="https://linkedin.com/in/dias-d-permadi-7b9417179"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
            <div className="contact-email">
              <span>{EMAIL}</span>
              <button
                className="icon-button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
              </button>
              <span className="copy-status" role="status">
                {copyMessage}
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer shell">
        <a className="brand" href="#top">
          PERMADIAZ<span>.</span>
        </a>
        <p>Business brain. Builder instinct.</p>
        <a href="https://github.com/permadiaz" target="_blank" rel="noreferrer">
          <Github size={14} /> GitHub <ArrowUpRight size={12} />
        </a>
        <span>© {new Date().getFullYear()} Dias D. Permadi</span>
      </footer>
      {project && (
        <ProjectDialog
          key={project.id}
          project={project}
          onClose={() => setProject(null)}
        />
      )}
      <Suspense
        fallback={
          <div className="pitch-loading" role="status">
            Opening presentation…
          </div>
        }
      >
        {pitch && <Pitch onClose={() => setPitch(false)} />}
      </Suspense>
    </>
  );
}
