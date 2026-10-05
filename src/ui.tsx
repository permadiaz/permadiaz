import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectId } from "./content";

export function Dialog({
  titleId,
  className = "",
  children,
  onClose,
}: {
  titleId: string;
  className?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = ref.current!;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node.showModal();
    return () => {
      node.close();
      document.body.style.overflow = previous;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`site-dialog ${className}`}
      aria-labelledby={titleId}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const targets = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
          ),
        ).filter((node) => node.getClientRects().length > 0);
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-surface">{children}</div>
    </dialog>
  );
}

export function ProjectArt({
  id,
  small = false,
}: {
  id: ProjectId;
  small?: boolean;
}) {
  return (
    <div
      className={`project-art art-${id} ${small ? "art-small" : ""}`}
      aria-hidden="true"
    >
      {id === "margin" && (
        <div className="art-pricing">
          <div className="art-pricing-label">A clearer next move.</div>
          <div className="art-number">
            18<span>%</span>
          </div>
          <div className="art-price-track">
            <i />
          </div>
          <div className="art-price-footer">
            <span>REFERENCE</span>
            <span>YOUR SCENARIO ↗</span>
          </div>
          <div className="art-price-track second">
            <i />
          </div>
        </div>
      )}
      {id === "intel" && (
        <div className="art-intel">
          <div className="intel-paper back">WHAT WE KNOW</div>
          <div className="intel-paper front">
            <span className="intel-label">NEXT CONVERSATION</span>
            <span className="intel-line long" />
            <span className="intel-line" />
            <div className="intel-action">
              <span className="small-dot" /> One useful question.
            </div>
          </div>
          <div className="intel-orbit" />
        </div>
      )}
      {id === "startfrom" && (
        <div className="art-roadmap">
          <div className="roadmap-ring ring-one" />
          <div className="roadmap-ring ring-two" />
          <div className="roadmap-ring ring-three" />
          <div className="roadmap-core">
            Start
            <br />
            <em>from here.</em>
          </div>
          <span className="roadmap-label top">A BIGGER GOAL</span>
          <span className="roadmap-label bottom">A SMALLER NEXT STEP ↗</span>
          <span className="roadmap-marker" />
        </div>
      )}
      {id === "cangkul" && (
        <div className="art-cards">
          <div className="playing-card card-back">
            <span>
              7<br />♣
            </span>
            <b>♣</b>
          </div>
          <div className="playing-card card-mid">
            <span>
              Q<br />♥
            </span>
            <b>♥</b>
          </div>
          <div className="playing-card card-front">
            <span>
              A<br />♠
            </span>
            <b>♠</b>
            <small>YOUR MOVE.</small>
          </div>
        </div>
      )}
    </div>
  );
}

export function Studio({
  openProject,
}: {
  openProject: (id: ProjectId) => void;
}) {
  return (
    <div
      className="studio"
      aria-label="Interactive studio. Choose an object to explore a project."
    >
      <div className="studio-topline">
        <span>STUDIO / 01</span>
        <span>
          <span className="status-dot" /> OPEN TO EXPLORE
        </span>
      </div>
      <div className="studio-scene">
        <div className="studio-orbit orbit-one" aria-hidden="true" />
        <div className="studio-orbit orbit-two" aria-hidden="true" />
        <span className="studio-star" aria-hidden="true">
          ✳
        </span>
        <span className="studio-floor" aria-hidden="true" />
        <button
          className="studio-object studio-board"
          onClick={() => openProject("intel")}
          aria-label="Explore AE Intel workflow"
        >
          <div className="board-pins">
            <i />
            <i />
          </div>
          <span className="object-tag">THE METHOD</span>
          <b>
            Connect
            <br />
            the dots.
          </b>
          <div className="board-lines">
            <i />
            <i />
            <i />
          </div>
          <span className="object-footer">
            AE Intel <ArrowUpRight size={15} />
          </span>
        </button>
        <button
          className="studio-object studio-laptop"
          onClick={() => openProject("margin")}
          aria-label="Explore Margin Studio"
        >
          <div className="laptop-camera" />
          <div className="laptop-screen">
            <span className="object-tag">THE PRICING LAB</span>
            <b>
              Make your
              <br />
              <em>next move.</em>
            </b>
            <div className="laptop-chart">
              <i />
              <i />
              <i />
            </div>
            <span className="object-footer">
              Margin Studio <ArrowUpRight size={15} />
            </span>
          </div>
          <div className="laptop-base" />
        </button>
        <button
          className="studio-object studio-card"
          onClick={() => openProject("cangkul")}
          aria-label="Explore CangkulYuk card game"
        >
          <span>A ♠</span>
          <b>♠</b>
          <small>LET’S PLAY</small>
        </button>
        <button
          className="studio-object studio-token"
          onClick={() => openProject("startfrom")}
          aria-label="Explore StartFrom"
        >
          <span>↗</span>
          <small>
            START
            <br />
            FROM
          </small>
        </button>
      </div>
      <div className="studio-bottomline">
        <span>Business questions. Working ideas.</span>
        <span>
          Pick an object <ArrowUpRight size={13} />
        </span>
      </div>
    </div>
  );
}
