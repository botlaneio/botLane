import { CtaPair } from "@/components/site/cta";
import { Check } from "@/components/site/icons";
import { HeroStage } from "./hero-stage";
import { ToolIcon, heroTools } from "./tools";
import "./hero.css";

export function HomeHero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-h">
      <div className="hero-pin">
        <div className="grain" aria-hidden="true" />
        <svg className="links" id="links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M17 41 C 17 46, 15 50, 15 55" />
          <path d="M27 73 C 36 84, 46 80, 52 76 S 66 66, 72 64" />
          <path d="M83 44 C 84 49, 83 53, 81 57" />
        </svg>
        <i className="node" style={{ left: "16%", top: "48%" }} aria-hidden="true" />
        <i className="node" style={{ left: "52%", top: "76%" }} aria-hidden="true" />
        <i className="node" style={{ left: "83.6%", top: "50%" }} aria-hidden="true" />

        <div className="hero-copy" id="heroCopy">
          <p className="eyebrow">Managed AI workflows</p>
          <h1 id="hero-h">
            Meet your
            <br />
            newest <em>hire.</em>
          </h1>
          <p className="hero-sub">Managed AI workflows. Under your control.</p>
          <CtaPair secondary="how" />
        </div>

        <figure className="stage-wrap m-0" aria-label="Illustration: four example workflows coming together in one BotLane workspace">
          <div className="stage" id="stage" aria-hidden="true">
            <div className="win" id="win">
              <div className="win-bar">
                <i />
                <i />
                <i />
                <span>botlane workspace</span>
              </div>
              <div className="win-side">
                <b>botlane</b>
                <span className="on">Overview</span>
                <span>Waiting for you</span>
                <span>Running</span>
                <span>Delivered</span>
                <span>Activity</span>
              </div>
            </div>

            <div className="hc hc-lead" id="cLead">
              <div className="pc-h">
                <span className="ic ic-ok">
                  <Check />
                </span>
                Lead follow-up<span className="ex-tag">Example</span>
              </div>
              <div className="li"><i className="av" />238 new leads<span className="num up">+24%</span></div>
              <div className="li"><i className="av" />186 contacted<span className="num">78%</span></div>
              <div className="li"><i className="av" />42 in progress<span className="num">18%</span></div>
              <div className="li"><i className="av" />10 qualified<span className="num">4%</span></div>
            </div>

            <div className="hc hc-report" id="cReport">
              <div className="pc-h">
                Client reporting<span className="ex-tag">Example</span>
              </div>
              <div className="rep-k">
                <span>Reports delivered</span>
                <span className="num up">+62%</span>
              </div>
              <svg viewBox="0 0 354 150">
                <g fill="#f3e6dd">
                  <rect x="14" y="110" width="26" height="30" rx="3" />
                  <rect x="72" y="96" width="26" height="44" rx="3" />
                  <rect x="130" y="100" width="26" height="40" rx="3" />
                  <rect x="188" y="80" width="26" height="60" rx="3" />
                  <rect x="246" y="66" width="26" height="74" rx="3" />
                  <rect x="304" y="46" width="26" height="94" rx="3" />
                </g>
                <path d="M10 96 C 50 80, 70 104, 110 88 S 170 60, 200 70 S 270 40, 344 18" fill="none" stroke="#9a5232" strokeWidth="2" />
                <g fontSize="10" fill="#6b6f7a">
                  <text x="18" y="150">Jan</text>
                  <text x="76" y="150">Feb</text>
                  <text x="134" y="150">Mar</text>
                  <text x="192" y="150">Apr</text>
                  <text x="248" y="150">May</text>
                  <text x="308" y="150">Jun</text>
                </g>
              </svg>
            </div>

            <div className="hc hc-draft" id="cDraft">
              <div className="pc-h">
                <span className="ic ic-terra">
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M5 1v8M1 5h8M2.2 2.2l5.6 5.6M7.8 2.2 2.2 7.8" stroke="currentColor" strokeWidth="1.1" />
                  </svg>
                </span>
                AI draft reply
              </div>
              <div className="field">
                To <span>prospect@company.com</span>
              </div>
              <div className="mail">
                <span>Hi there,</span>
                <p>Thanks for your interest. I&apos;ve shared the relevant details and a few time slots for a quick call this week.</p>
              </div>
              <div className="mail-foot">
                <span className="wait" id="waitTxt">Waiting for your OK</span>
                <span className="sendbtn">
                  Send<i className="sent" id="sent">Sent ✓</i>
                </span>
              </div>
            </div>

            <div className="hc hc-invoice" id="cInvoice">
              <div className="pc-h">
                <span className="ic ic-terra">
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </span>
                Invoice follow-up<span className="ex-tag">Example</span>
              </div>
              <div className="li"><i className="av" />12 overdue<i className="sd r" /></div>
              <div className="li"><i className="av" />8 reminders sent<i className="sd a" /></div>
              <div className="li"><i className="av" />5 paid<i className="sd g" /></div>
            </div>
          </div>
        </figure>

        <div className="tools-row" id="toolsRow">
          <p>Works with your tools</p>
          <ul>
            {heroTools.map((t) => (
              <li key={t}>
                <ToolIcon name={t} />
                {t}
              </li>
            ))}
            <li className="more">and more</li>
          </ul>
        </div>
      </div>
      <HeroStage />
    </section>
  );
}
