import { useState, useMemo } from "react";

export default function RoiCalculator() {
  const [rate, setRate] = useState(150);
  const [hours, setHours] = useState(10);
  const [team, setTeam] = useState(1);

  const { annualWaste, potentialSavings } = useMemo(() => {
    const waste = rate * hours * 52 * team;
    return {
      annualWaste: waste,
      potentialSavings: waste * 0.75,
    };
  }, [rate, hours, team]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0d0d0b;
          --bg2: #131310;
          --bg3: #1a1a15;
          --gold: #c9a84c;
          --gold-light: #e8c97e;
          --gold-dim: #7a6230;
          --cream: #f2ead8;
          --cream-dim: #a89e87;
          --white: #faf8f3;
          --rule: rgba(201,168,76,0.18);
        }

        body {
          background: var(--bg);
          color: var(--cream);
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 300;
          line-height: 1.7;
        }

        .roi-section {
          padding: 8rem 2rem;
        }

        .roi-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .roi-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          color: var(--gold);
          text-transform: uppercase;
        }

        .roi-header h2 {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 300;
          margin-top: 1rem;
        }

        .calc-container {
          max-width: 1100px;
          margin: 0 auto;
          background: var(--bg2);
          border: 1px solid var(--rule);
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          overflow: hidden;
        }

        .calc-inputs {
          padding: 4rem;
          border-right: 1px solid var(--rule);
        }

        .calc-results {
          padding: 4rem;
          background: var(--bg3);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .input-group { margin-bottom: 3rem; }

        .label-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .label-text {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-dim);
        }

        .label-value {
          font-size: 1.4rem;
          color: var(--gold-light);
        }

        input[type=range] {
          width: 100%;
          appearance: none;
          height: 2px;
          background: var(--rule);
          outline: none;
        }

        input[type=range]::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: var(--gold);
          cursor: pointer;
          margin-top: -8px;
          border: 2px solid var(--bg);
        }

        .result-title {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold-dim);
          margin-bottom: 1rem;
        }

        .result-main {
          font-size: 5rem;
          line-height: 1;
          color: var(--white);
          margin-bottom: 2rem;
        }

        .result-sub {
          font-size: 1rem;
          color: var(--cream-dim);
          border-left: 2px solid var(--gold-dim);
          padding-left: 1.5rem;
          margin-bottom: 3rem;
        }

        .btn-calc {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--gold);
          padding: 1.2rem 2rem;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }

        .btn-calc:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .calc-container { grid-template-columns: 1fr; }
          .calc-inputs {
            border-right: none;
            border-bottom: 1px solid var(--rule);
            padding: 2rem;
          }
          .calc-results { padding: 2rem; }
          .result-main { font-size: 3.5rem; }
        }
      `}</style>

      <section className="roi-section">
        <div className="roi-header">
          <p className="roi-eyebrow">The Efficiency Audit</p>
          <h2>
            Quantify your <em>leakage.</em>
          </h2>
        </div>

        <div className="calc-container">
          <div className="calc-inputs">
            <div className="input-group">
              <div className="label-row">
                <span className="label-text">Hourly Rate (Target)</span>
                <span className="label-value">${rate}</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>

            <div className="input-group">
              <div className="label-row">
                <span className="label-text">Manual Admin Hours / Wk</span>
                <span className="label-value">{hours}h</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>

            <div className="input-group">
              <div className="label-row">
                <span className="label-text">Team Size</span>
                <span className="label-value">{team}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={team}
                onChange={(e) => setTeam(Number(e.target.value))}
              />
            </div>

            <p style={{ fontSize: "0.6rem", color: "var(--gold-dim)", textTransform: "uppercase" }}>
              * Adjust sliders to calculate live impact
            </p>
          </div>

          <div className="calc-results">
            <p className="result-title">Annual Revenue Leak</p>
            <div className="result-main">
              ${annualWaste.toLocaleString()}
            </div>

            <p className="result-sub">
              Based on your current operations, you are losing approximately{" "}
              <strong style={{ color: "var(--white)" }}>
                ${potentialSavings.toLocaleString()}
              </strong>{" "}
              in billable capacity every year to tasks that could be fully automated.
            </p>

            <a href="#contact" className="btn-calc">
              Get Your Automation Roadmap →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}