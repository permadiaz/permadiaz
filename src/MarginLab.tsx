import { useId, useMemo, useState } from "react";
import { ArrowRight, Bookmark, Check, RotateCcw } from "lucide-react";
import {
  calculateScenario,
  money,
  parseCost,
  parseTax,
  type Scenario,
} from "./pricing";

export default function MarginLab({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [costInput, setCostInput] = useState("");
  const [margin, setMargin] = useState(18);
  const [taxMode, setTaxMode] = useState<"off" | "preset" | "custom">("off");
  const [customTax, setCustomTax] = useState("11");
  const [reference, setReference] = useState<Scenario | null>(null);
  const [notice, setNotice] = useState("");
  const cost = parseCost(costInput);
  const taxRate =
    taxMode === "off" ? 0 : taxMode === "preset" ? 11 : parseTax(customTax);
  const calculation = useMemo(() => {
    if (cost === null || taxRate === null) return { value: null, error: "" };
    try {
      return { value: calculateScenario(cost, margin, taxRate), error: "" };
    } catch (error) {
      return { value: null, error: (error as Error).message };
    }
  }, [cost, margin, taxRate]);
  const live = calculation.value;
  const costError =
    costInput.trim() && cost === null
      ? "Enter a positive whole amount in rupiah."
      : "";
  const taxError = taxRate === null ? "Enter a tax rate from 0 to 100%." : "";
  const delta = live && reference ? live.total - reference.total : null;

  function reset() {
    setCostInput("");
    setMargin(18);
    setTaxMode("off");
    setCustomTax("11");
    setReference(null);
    setNotice("Calculator cleared.");
  }

  function keepReference() {
    if (!live) return;
    setReference({ ...live });
    setNotice("Reference saved. Adjust the live scenario to compare.");
  }

  return (
    <div className={`margin-lab ${compact ? "lab-compact" : ""}`}>
      <div className="lab-controls">
        <div className="lab-control-head">
          <span className="eyebrow">Your scenario</span>
          <button type="button" className="text-button" onClick={reset}>
            <RotateCcw size={13} /> Reset
          </button>
        </div>
        <label className="field-label" htmlFor={`${id}-cost`}>
          Base cost
        </label>
        <div className={`cost-input ${costError ? "has-error" : ""}`}>
          <span>Rp</span>
          <input
            id={`${id}-cost`}
            inputMode="numeric"
            autoComplete="off"
            placeholder="Enter an amount"
            value={costInput}
            onChange={(e) => {
              setCostInput(e.target.value);
              setNotice("");
            }}
            onBlur={() => {
              if (cost !== null) setCostInput(cost.toLocaleString("id-ID"));
            }}
            aria-invalid={Boolean(costError)}
            aria-describedby={
              costError ? `${id}-cost-error` : `${id}-cost-hint`
            }
          />
        </div>
        <div className="field-hint" id={`${id}-cost-hint`}>
          Whole rupiah. Your numbers stay in this browser.
        </div>
        {costError && (
          <p className="field-error" id={`${id}-cost-error`} role="alert">
            {costError}
          </p>
        )}
        <div className="slider-heading">
          <label htmlFor={`${id}-margin`}>Target margin</label>
          <output htmlFor={`${id}-margin`}>{margin}%</output>
        </div>
        <input
          id={`${id}-margin`}
          className="margin-range"
          type="range"
          min="0"
          max="50"
          step="0.5"
          value={margin}
          onChange={(e) => setMargin(Number(e.target.value))}
          aria-valuetext={`${margin}% gross margin`}
        />
        <div className="range-endpoints">
          <span>0%</span>
          <span>50%</span>
        </div>
        <fieldset className="tax-field">
          <legend>Tax</legend>
          <div className="segmented tax-options">
            <button
              type="button"
              aria-pressed={taxMode === "off"}
              onClick={() => setTaxMode("off")}
            >
              Off
            </button>
            <button
              type="button"
              aria-pressed={taxMode === "preset"}
              onClick={() => setTaxMode("preset")}
            >
              11%
            </button>
            <button
              type="button"
              aria-pressed={taxMode === "custom"}
              onClick={() => setTaxMode("custom")}
            >
              Custom
            </button>
          </div>
        </fieldset>
        {taxMode === "custom" && (
          <div className="custom-tax">
            <label htmlFor={`${id}-tax`}>Tax rate (%)</label>
            <input
              id={`${id}-tax`}
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={customTax}
              onChange={(e) => setCustomTax(e.target.value)}
              aria-invalid={Boolean(taxError)}
              aria-describedby={taxError ? `${id}-tax-error` : undefined}
            />
          </div>
        )}
        {taxError && (
          <p className="field-error" id={`${id}-tax-error`} role="alert">
            {taxError}
          </p>
        )}
        <p className="field-hint tax-note">
          Example rates for exploration. Choose the rate for your scenario.
        </p>
        <button
          type="button"
          className="button button-outline reference-button"
          onClick={keepReference}
          disabled={!live}
        >
          <Bookmark size={15} />
          {reference ? "Update reference" : "Keep as reference"}
        </button>
      </div>
      <div className="lab-output">
        <div className="lab-output-head">
          <span className="eyebrow">Decision, with context</span>
          <span className="tiny-label">MARGIN ≠ MARKUP</span>
        </div>
        {live ? (
          <>
            <div className="price-pair">
              <div className="live-price">
                <span className="price-label">
                  <span className="status-dot" /> Live scenario
                </span>
                <strong>{money(live.total)}</strong>
                <small>
                  {live.taxRate === 0
                    ? "Tax excluded"
                    : `Includes ${live.taxRate}% tax`}
                </small>
              </div>
              <div className={`reference-price ${reference ? "is-saved" : ""}`}>
                <span className="price-label">
                  <Bookmark size={12} /> Reference
                </span>
                {reference ? (
                  <>
                    <strong>{money(reference.total)}</strong>
                    <small>
                      {reference.margin}% margin · {reference.taxRate}% tax
                    </small>
                    <small>Cost {money(reference.cost)}</small>
                  </>
                ) : (
                  <p>
                    Keep a scenario.
                    <br />
                    Then explore what changes.
                  </p>
                )}
              </div>
            </div>
            <dl className="price-breakdown">
              <div>
                <dt>Before tax</dt>
                <dd>{money(live.sell)}</dd>
              </div>
              <div>
                <dt>Gross profit</dt>
                <dd>{money(live.profit)}</dd>
              </div>
              <div>
                <dt>Tax ({live.taxRate}%)</dt>
                <dd>{money(live.tax)}</dd>
              </div>
            </dl>
            {reference && delta !== null && (
              <div className="comparison-result">
                <div
                  className="comparison-bars"
                  role="img"
                  aria-label={`Final prices: reference ${money(reference.total)}, live ${money(live.total)}`}
                >
                  <div>
                    <span>Reference</span>
                    <i
                      style={{
                        width: `${Math.max(2, (reference.total / Math.max(reference.total, live.total)) * 100)}%`,
                      }}
                    />
                  </div>
                  <div>
                    <span>Live</span>
                    <i
                      style={{
                        width: `${Math.max(2, (live.total / Math.max(reference.total, live.total)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <p>
                  <ArrowRight size={16} />
                  <span>
                    <b>
                      {delta > 0 ? "+" : delta < 0 ? "−" : ""}
                      {money(Math.abs(delta))}
                    </b>{" "}
                    compared with your reference
                  </span>
                </p>
              </div>
            )}
            {!reference && (
              <div className="lab-nudge">
                <ArrowRight size={16} />
                <span>
                  Save this as a reference, then move the margin slider.
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="lab-empty">
            <div className="empty-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h4>
              Start with a number.
              <br />
              Find your next move.
            </h4>
            <p>
              {costError ||
                taxError ||
                calculation.error ||
                "Enter a cost to explore price, margin, and tax."}
            </p>
          </div>
        )}
        <div className="lab-notice" role="status" aria-live="polite">
          {notice && (
            <>
              <Check size={13} />
              {notice}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
