 "use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";

export type AdfinStubbsParkinProps = {
  portfolioHref?: string;
  demoHref?: string;
  customerWebsiteHref?: string;
  /** Put the supplied image folder in public/images, or override this path. */
  assetBasePath?: string;
};

const sourceUrl = "https://adfin.com/customer-stories/stubbs-parkin";
const milestones = [
  {
    date: "23 FEBRUARY",
    title: "The payment setup starts first.",
    body: "Adfin goes live inside Client Engager, giving the team a new way to manage collections before the larger client intake arrives.",
  },
  {
    date: "APRIL",
    title: "Around 150 clients arrive at once.",
    body: "Harrison Latham and Company becomes part of Stubbs Parkin, bringing a significant new group of clients into the practice.",
  },
  {
    date: "JULY",
    title: "Another 40 clients follow.",
    body: "The practice grows again, but this time the payment workflow is already in place and being used day to day.",
  },
];
  

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={back ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}
function Tick() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <circle cx="12" cy="11.5" r="1.8" />
      <path d="M9 17.5c.4-2 1.6-3 3-3s2.6 1 3 3" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5.5 10.5v7M10 10.5v7M14 10.5v7M18.5 10.5v7" />
      <path d="M3 20h18" />
    </svg>
  );
}
 
function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M3 10.5h18M6.5 14.5h3" />
    </svg>
  );
}
  


export default function AdfinStubbsParkinCaseStudy({
  portfolioHref = "https://www.seo-growup.com/writing-portfolio",
  demoHref = "https://adfin.com/",
  customerWebsiteHref = "https://www.stubbsparkin.co.uk/",
  assetBasePath = "/images",
}: AdfinStubbsParkinProps) {
  const base = assetBasePath.replace(/\/$/, "");
  const office = `${base}/office-editorial.png`;
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Single elements that fade up
    const single = [
      ".asp-practice-editorial-heading > div",
      ".asp-practice-editorial-intro",
      ".asp-practice-editorial-photo",
      ".asp-practice-editorial-details",
      ".asp-practice-editorial-bottom",
      ".asp-expansion-heading > div",
      ".asp-expansion-intro",
      ".asp-expansion-art",
      ".asp-expansion-finish",
      ".asp-connected-story .asp-eyebrow",
      ".asp-connected-heading h2",
      ".asp-connected-heading > p",
      ".asp-connected-before",
      ".asp-connected-after",
      ".asp-connected-quote",
      ".asp-migration-heading > div",
      ".asp-results-heading > div",
      ".asp-results-heading > p",
      ".asp-collections",
      ".asp-reliability",
      ".asp-cta",
      ".asp-footer > div",
      ".asp-footer > p",
    ];

    // Groups that stagger one after another
    const groups = [
      ".asp-metric",
      ".asp-expansion-events > li",
      ".asp-migration-timeline > li",
      ".asp-connected-tools > li",
      ".asp-connected-benefits > li",
    ];

    const targets: HTMLElement[] = [];

    root.querySelectorAll<HTMLElement>(single.join(",")).forEach((el) => {
      targets.push(el);
    });

    root.querySelectorAll<HTMLElement>(groups.join(",")).forEach((el) => {
      const i = el.parentElement
        ? Array.from(el.parentElement.children).indexOf(el)
        : 0;
      el.style.setProperty("--d", `${Math.min(i, 5) * 110}ms`);
      targets.push(el);
    });

    // Lets the chart line draw itself
    root.querySelector(".asp-line-path")?.setAttribute("pathLength", "1");

    targets.forEach((el) => el.setAttribute("data-reveal", ""));
    root.classList.add("asp-anim");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  
  return (
    <article
      className="asp"
      id="asp-top"
      ref={rootRef}
      style={{ "--asp-office": `url("${office}")` } as CSSProperties}
    >
      <style>{styles}</style>
      <a className="asp-skip" href="#asp-story">
        Skip to the story
      </a>

      <header className="asp-hero asp-hero--blended">
        <img
          className="asp-hero-backdrop"
          src="/images/officegarden.png"
          alt="Illustrative Stubbs Parkin office exterior"
          width="1672"
          height="941"
          fetchPriority="high"
        />

        <div className="asp-container asp-hero-grid">
          <div className="asp-hero-copy">
                           <h1>
              How Stubbs Parkin took on nearly 200 clients{" "}
              <em>without adding more payment admin.</em>
            </h1>


            <p className="asp-deck">
            Nearly 200 new clients could have meant more invoices to track, more payments to chase and more admin. Instead, the team brought the process into one connected workflow with Adfin.
            </p>
            <div className="asp-hero-links">
              <a className="asp-button" href="#asp-story">
                Read their story <Arrow />
              </a>
              <a
                className="asp-text-link"
                href={demoHref}
                target="_blank"
                rel="noreferrer"
              >
                Explore Adfin <Arrow />
              </a>
            </div>

          </div>
          <div className="asp-hero-visual">
 
          </div>
        </div>
      </header>


      <div id="asp-story" className="asp-container asp-container--wide">
        <section className="asp-metrics" aria-label="Results at a glance">
          <div className="asp-metric">
            <span className="asp-metric-label">PAYMENT RELIABILITY</span>
            <strong>
              95<span>%</span>
            </strong>
            <p>of payments arrived on or before the due date.</p>
       
          </div>
          <div className="asp-metric">
            <span className="asp-metric-label">MANDATES MOVED IN THREE DAYS</span>
            <strong>231</strong>
            <p>Direct Debit mandates transferred without asking clients to sign up again.</p>
          </div>
          <div className="asp-metric">
            <span className="asp-metric-label">MONTHLY COLLECTIONS</span>
            <strong className="asp-metric-range">
              113 <span>→</span> 168
            </strong>
            <p>payments collected in March and July respectively.</p>
          </div>
          <div className="asp-metric">
            <span className="asp-metric-label">CLIENT GROWTH</span>
            <strong>
              <span>~</span>200
            </strong>
            <p>new clients joined across two major intake periods.</p>
          </div>
        </section>





<section className="asp-practice-editorial" id="asp-practice">
  <div className="asp-practice-editorial-heading">
    <div>
      <p className="asp-practice-editorial-eyebrow">
        01 / The practice
      </p>
          <h2>
        A family-run accountancy firm    <br />
        <em>with a hands-on client approach.</em>
      </h2>
    </div>

    <p className="asp-practice-editorial-intro">
Stubbs Parkin is a family-run practice based in Southport, Merseyside. Around 15 people support its client base across accounting, tax and everyday business matters.
    </p>
  </div>

  <div className="asp-practice-editorial-main">
    <figure className="asp-practice-editorial-photo">
      <div className="asp-practice-editorial-frame">
        <img
          src="/images/stubbs-thumb-webflow.jpeg"
          alt="Becky Jama, Practice Manager at Stubbs Parkin."
          decoding="async"
        />

        <p className="asp-practice-editorial-overlay">
          A local practice.
          <br />
          Personal by nature.
        </p>
      </div>

      <figcaption>
        Becky Jama · Practice Manager, Stubbs Parkin
      </figcaption>
    </figure>

    <aside
      className="asp-practice-editorial-details"
      aria-label="About Stubbs Parkin"
    >
      <p className="asp-practice-editorial-label">
        Local firm. Hands-on service.
      </p>

      <div className="asp-practice-editorial-team">
        <span className="asp-practice-editorial-count">
          <span aria-hidden="true">~15</span>
          <span className="asp-practice-editorial-sr">
            Around 15
          </span>
        </span>

        <p>people supporting clients.</p>
      </div>

      <dl className="asp-practice-editorial-facts">
        <div>
          <dt>Based in</dt>
          <dd>Southport, Merseyside</dd>
        </div>

        <div>
          <dt>The business</dt>
          <dd>Family-run accountancy</dd>
        </div>

        <div>
          <dt>The workspace</dt>
          <dd>Client Engager + Adfin</dd>
        </div>
      </dl>
    </aside>
  </div>

  <div className="asp-practice-editorial-bottom">
    <p>
For Stubbs Parkin, good service means being easy to reach, knowing the client and having enough time to deal with the questions that come up throughout the year.
    </p>

    <a
      className="asp-practice-editorial-link"
      href={customerWebsiteHref}
      target="_blank"
      rel="noreferrer"
    >
      Meet Stubbs Parkin
      <span aria-hidden="true">↗</span>
    </a>
  </div>
</section>
      </div>

   



<section className="asp-growth" aria-labelledby="asp-growth-title">
  <div className="asp-container asp-container--wide">
    <header className="asp-growth-heading">
      <p className="asp-growth-eyebrow">
        02 / The growth moment
      </p>

  <h2 id="asp-growth-title">
  The practice grew in{" "}<br/>
  <em>two major waves.</em>
</h2>

      <p className="asp-growth-intro">
        Around 150 clients joined through Harrison Latham and Company,
        followed by another 40 in July, increasing payment volume just
        as Stubbs Parkin’s new process was bedding in.
      </p>
    </header>

    <div className="asp-growth-layout">
      <div
        className="asp-growth-summary"
        role="img"
        aria-label="Nearly 200 new clients in 2026: around 150 joined in April and another 40 in July."
      >
        <div aria-hidden="true">
          <span className="asp-growth-nearly">Nearly</span>
          <strong className="asp-growth-total">200</strong>
          <p className="asp-growth-caption">new clients in 2026</p>

          <div className="asp-growth-breakdown">
            <div>
              <strong>~150</strong>
              <span>April 2026</span>
            </div>

            <div>
              <strong>+40</strong>
              <span>July 2026</span>
            </div>
          </div>
        </div>
      </div>

      <ol className="asp-growth-timeline">
        {milestones.map((milestone) => (
          <li key={milestone.date}>
            <span className="asp-growth-date">
              {milestone.date} 2026
            </span>

            <h3>{milestone.title}</h3>
            <p>{milestone.body}</p>
          </li>
        ))}
      </ol>
    </div>
  </div>
</section>


<section className="asp-connected-story" id="asp-change">
  <div className="asp-container asp-container--wide">
    <p className="asp-eyebrow">
      03–04 / Payments before and after Adfin
    </p>

    <div className="asp-connected-heading">
      <h2>
        Payments were split
        <br />
        <em>across three systems.</em>
      </h2>
      <p>
        Adfin brought payment visibility into Client Engager,
        with Direct Debit in the proposal flow and six payment
        options in one place.
      </p>
    </div>

    <div className="asp-connected-comparison">
      <div className="asp-connected-before">
        <p className="asp-connected-label">Before Adfin</p>
        <h3 className="asp-connected-title">
          Three places to check.
        </h3>

        <div className="asp-connected-old">
          <ol className="asp-connected-tools">
            <li>
              <span
                className="asp-connected-icon"
                aria-hidden="true"
              >
                <DocIcon />
              </span>

              <div>
                <h4>Client Engager</h4>
                <p>Client details and engagement letters</p>
              </div>
            </li>

            <li>
              <span
                className="asp-connected-icon"
                aria-hidden="true"
              >
                <BankIcon />
              </span>

              <div>
                <h4>Direct Debit provider</h4>
                <p>Mandates managed separately</p>
              </div>
            </li>

            <li>
              <span
                className="asp-connected-icon"
                aria-hidden="true"
              >
                <CardIcon />
              </span>

              <div>
                <h4>Card payment system</h4>
                <p>Card payments handled elsewhere</p>
              </div>
            </li>
          </ol>

          <div className="asp-connected-gap">
            <span
              className="asp-connected-gap-dot"
              aria-hidden="true"
            />
            <p>
              Payment visibility
              <br />
              was limited.
            </p>
          </div>
        </div>

        <div className="asp-connected-consequence">
          <p className="asp-connected-label">
            The consequence
          </p>
          <p>
            More clients meant more checking between systems.
          </p>
        </div>
      </div>

      <div className="asp-connected-after">
        <p className="asp-connected-label">With Adfin</p>
        <h3 className="asp-connected-title">
          Payments became visible inside Client Engager.
        </h3>

        <figure className="asp-connected-image">
          <img
            src="/images/stubbs-parkin-client-engager.png"
            alt="Illustrative payments dashboard for Stubbs Parkin, showing payment status, an active Direct Debit mandate and recent payments."
            width="1536"
            height="1024"
            decoding="async"
          />
        </figure>

        <ul className="asp-connected-benefits">
          <li>
            <span aria-hidden="true"><Tick /></span>
            Shared payment visibility
          </li>
          <li>
            <span aria-hidden="true"><Tick /></span>
            Mandates in the proposal
          </li>
          <li>
            <span aria-hidden="true"><Tick /></span>
            Six payment options
          </li>
        </ul>
      </div>
    </div>

    <blockquote className="asp-connected-quote">
      <p>
  “If we can get the admin down to seamless, that gives us much more time to be helping clients with their queries and questions, and just speaking to them.”
      </p>

      <cite>
        <strong>Becky Jama</strong>
        <span>Practice Manager, Stubbs Parkin</span>
      </cite>
    </blockquote>
  </div>
</section>






<section className="asp-migration">
  <div className="asp-container asp-container--wide">
    <div className="asp-migration-heading">
      <div>
        <p className="asp-eyebrow asp-light-label">05 / The switch</p>

        <h2>
          Direct Debit mandates
          <br />
          <em>moved in three days.</em>
        </h2>

        <p>
        Stubbs Parkin transferred its existing mandates to Adfin between 23 and 26 February. Clients were told about the change by email, but did not need to complete a new sign-up.
        </p>
      </div>

      <div className="asp-migration-number">
        <span className="asp-migration-tag">
          <i />
          3-DAY MIGRATION
        </span>

        <div className="asp-migration-stat">
          <strong>231</strong>

          <span>
            EXISTING MANDATES.
            <br />
            ONE QUIET MIGRATION.
          </span>
        </div>
      </div>
    </div>

    <ol className="asp-migration-timeline">
      <li>
        <span className="asp-migration-node">01</span>
        <small>23 FEBRUARY 2026</small>
        <h3>Migration begins.</h3>
        <p>Stubbs Parkin starts moving its existing Direct Debit mandates to Adfin.</p>
      </li>

      <li>
        <span className="asp-migration-node">02</span>
        <small>CLIENT COMMUNICATION</small>
        <h3>Clients are notified.</h3>
        <p>A simple email explains what is happening and what, if anything, they need to do.</p>
      </li>

      <li>
        <span className="asp-migration-node asp-migration-complete">
          <Tick />
        </span>
        <small>26 FEBRUARY 2026</small>
        <h3>231 mandates live.</h3>
        <p>The migration is complete three days later, without requiring clients to re-register their Direct Debit</p>
      </li>
    </ol>
  </div>
</section>

      <section className="asp-container asp-container--wide asp-section asp-results" id="asp-results">
        <div className="asp-results-heading">
          <div>
            <p className="asp-eyebrow">06 / What changed</p>
                         <h2>
              Collections increased without{" "}
              <em>payment reliability dropping.</em>
            </h2>
          </div>
          <p>
            Monthly collections rose from 113 payments in March to 168 in July. Across the
            reported period, 95% of payments arrived on or before their due date.
          </p>
        </div>


<div className="asp-results-grid">
  <figure className="asp-collections">
    <div className="asp-chart-heading">
      <div>
        <p className="asp-eyebrow">MONTHLY COLLECTIONS</p>
        <h3>More volume. One process.</h3>
      </div>

      <span className="asp-chart-delta">
        +55
        <small>payments / month</small>
      </span>
    </div>

    <div
      className="asp-line-chart"
      role="img"
      aria-label="Monthly collections increased from 113 payments in March to 168 payments in July 2026."
    >
      <div className="asp-line-grid" aria-hidden="true">
        <span>200</span>
        <span>150</span>
        <span>100</span>
        <span>50</span>
        <span>0</span>
      </div>

      <svg
        viewBox="0 0 700 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="aspLineArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b9d7bd" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#b9d7bd" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          className="asp-line-area"
          d="M70 220 C145 170 190 174 270 158 C365 140 420 130 510 92 C565 69 600 62 640 54 L640 265 L70 265 Z"
          fill="url(#aspLineArea)"
        />

        <path
          className="asp-line-path"
          d="M70 220 C145 170 190 174 270 158 C365 140 420 130 510 92 C565 69 600 62 640 54"
        />

        <line className="asp-line-guide" x1="70" y1="220" x2="70" y2="265" />
        <line className="asp-line-guide" x1="640" y1="54" x2="640" y2="265" />

        <circle className="asp-line-point" cx="70" cy="220" r="8" />
        <circle className="asp-line-point" cx="640" cy="54" r="8" />
      </svg>

      <strong className="asp-line-value asp-line-value--march">113</strong>
      <strong className="asp-line-value asp-line-value--july">168</strong>

      <span className="asp-line-month asp-line-month--march">
        MARCH 2026
      </span>

      <span className="asp-line-month asp-line-month--july">
        JULY 2026
      </span>
    </div>

    <figcaption>
      Reported monthly payment counts. Baseline starts at zero.
    </figcaption>
  </figure>

  <div className="asp-reliability">
    <div className="asp-reliability-heading">
      <span className="asp-eyebrow">PAYMENT RELIABILITY</span>

      <span className="asp-status-circle">
        <Tick />
      </span>
    </div>

    <strong>
      95<span>%</span>
    </strong>

    <h3>
      On or before
      <br />
      the due date.
    </h3>

    <div
      className="asp-reliability-track"
      role="progressbar"
      aria-label="95 percent of payments arrived on or before the due date"
      aria-valuenow={95}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <i />
    </div>

    <div className="asp-reliability-foot">
      <strong>94–98%</strong>

      <p>
        on time each month
        <br />
        from March to August
      </p>
    </div>
  </div>
</div>

      </section>

    
 

      <section className="asp-container asp-container--wide asp-cta-section">
        <div className="asp-cta">
          <div>
            <p className="asp-eyebrow asp-light-label">FOR GROWING ACCOUNTANCY PRACTICES</p>
            <h2>
              Keep payments manageable{" "}
              <em>as your client base grows.</em>
            </h2>
            <p>
           Adfin brings payment collection into the systems your team already uses, so more clients do not mean more places to check, chase and reconcile.
            </p>
            <a
              className="asp-button"
              href={demoHref}
              target="_blank"
              rel="noreferrer"
            >
              Explore Adfin <Arrow />
            </a>
          </div>
          <div className="asp-cta-side">
            <span className="asp-cta-brand">
              adfin<span>×</span>Client Engager
            </span>
            <ul>
              <li>
                <Tick /> Payment visibility across the team
              </li>
              <li>
                <Tick /> Direct Debit within the proposal flow
              </li>
              <li>
                <Tick /> Multiple ways for clients to pay
              </li>
            </ul>
            <span className="asp-cta-caption">ONE CONNECTED PAYMENT PROCESS.</span>
          </div>
        </div>
      </section>

      <footer className="asp-container asp-container--wide asp-footer">
   
   


   

        <div className="asp-footer-links">
          <a href="/">
            <Arrow back /> Back to writing portfolio
          </a>
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            Read the original Adfin story <Arrow />
          </a>
        </div>
      </footer>
    </article>
  );
}




const styles = `
/* All styles are scoped to .asp. No UI library or external font dependency. */
.asp {
  --ink: #153d33;
  --muted: #65746d;
  --green: #0c4635;
  --deep: #041b1c;
  --mint: #d4efb6;
  --line: #dfe5dd;
  --paper: #fafaf6;
  background: var(--paper);
  color: var(--ink);
  font-family: Inter, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  isolation: isolate;
}
.asp,
.asp *,
.asp *::before,
.asp *::after {
  box-sizing: border-box;
}
.asp :where(h1, h2, h3, p, figure, blockquote, dl, dd, ul, ol) {
  margin: 0;
}
.asp :where(ul, ol) {
  padding: 0;
}
.asp a {
  color: inherit;
  text-decoration: none;
}
.asp img {
  display: block;
  max-width: 100%;
}
.asp svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}
.asp h1,
.asp h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: -0.055em;
  text-wrap: balance;
}
.asp h1 {
  font-size: clamp(44px, 4.35vw, 66px);
  line-height: 1.045;
}
.asp h2 {
  font-size: clamp(36px, 3.45vw, 51px);
  line-height: 1.1;
}
.asp h1 em,
.asp h2 em {
  font-weight: 400;
  font-style: normal;
  color: #6a816e;
}
.asp h3 {
  font-size: 17px;
  line-height: 1.4;
  letter-spacing: -0.025em;
}
.asp p {
  color: var(--muted);
}
.asp-container {
  width: min(1200px, calc(100% - 96px));
  margin-inline: auto;
}
.asp-container--wide {
  width: min(1340px, calc(100% - 96px));
}
.asp-section {
  padding-block: 96px;
}
.asp-eyebrow {
  font-size: 10px !important;
  line-height: 1.5;
  letter-spacing: 0.16em;
  font-weight: 700;
  color: #5c7164 !important;
  text-transform: uppercase;
  margin-bottom: 22px !important;
}
.asp-light-label {
  color: #b1c6b6 !important;
}
.asp-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
  background: var(--mint);
  color: var(--deep) !important;
  padding: 16px 23px;
  min-height: 52px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 650;
  transition:
    background 0.2s,
    transform 0.2s;
}
.asp-button:hover {
  background: #e3fac9;
  transform: translateY(-2px);
}
.asp-text-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
}
.asp-text-link svg {
  width: 17px;
}
.asp-text-link:hover {
  text-decoration: underline;
  text-underline-offset: 5px;
}
.asp a:focus-visible {
  outline: 3px solid #75ac67;
  outline-offset: 5px;
}
.asp [id] {
  scroll-margin-top: 85px;
}
.asp-skip {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.asp-skip:focus {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 99;
  width: auto;
  height: auto;
  clip-path: none;
  background: #fff;
  padding: 10px 20px;
}
/* Hero */
.asp-hero {
  background: #041b1c;
  color: #fff;
  overflow: hidden;
}
   
   

.asp-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 45px 0;
  border-bottom: 1px solid var(--line);

  /* Pure white, extending to both page edges */
  background: #ffffff;
  box-shadow: 0 0 0 100vmax #ffffff;
  clip-path: inset(0 -100vmax);
}
.asp-metric {
  padding-inline: 28px;
  border-left: 1px solid var(--line);
}
.asp-metric:first-child {
  padding-left: 0;
  border: 0;
}
.asp-metric:last-child {
  padding-right: 0;
}
.asp-metric-label {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #788677;
}
.asp-metric > strong {
  display: block;
  font-family: Georgia, serif;
  font-weight: 400;
  font-size: 52px;
  line-height: 1.2;
  letter-spacing: -0.055em;
  margin: 10px 0;
}
.asp-metric > strong > span {
  font-size: 0.62em;
}
.asp-metric > strong.asp-metric-range {
  font-size: 40px;
  line-height: 1.56;
  white-space: nowrap;
}
.asp-metric-range span {
  color: #7f947a;
}
.asp-metric p {
  font-size: 12px;
  line-height: 1.6;
  max-width: 220px;
  min-height: 40px;
}
.asp-metric-note {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8px;
  color: #677a64;
  margin-top: 14px;
}
.asp-metric-note svg {
  width: 12px;
  height: 12px;
}
.asp-mini-track {
  height: 4px;
  background: #e6ebdf;
  max-width: 174px;
  margin-top: 20px;
}
.asp-mini-track i {
  display: block;
  width: 95%;
  height: 100%;
  background: #678463;
}



/* Migration */
.asp-migration {
  position: relative;
  overflow: hidden;
  padding: 82px 0 76px;
  background: #041b1c;
  color: #ffffff;
}

.asp-migration::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.28;
  pointer-events: none;
  background-image:
    linear-gradient(
      90deg,
      transparent 0,
      transparent 119px,
      rgba(210, 235, 216, 0.16) 120px,
      transparent 121px
    );
  background-size: 120px 100%;
}

.asp-migration::after {
  content: "";
  position: absolute;
  top: -170px;
  right: -180px;
  width: 620px;
  height: 620px;
  border: 1px solid rgba(190, 222, 194, 0.12);
  border-radius: 50%;
  box-shadow:
    0 0 0 58px rgba(190, 222, 194, 0.04),
    0 0 0 116px rgba(190, 222, 194, 0.025);
  pointer-events: none;
}

.asp-migration .asp-container,
.asp-migration .asp-container--wide {
  position: relative;
  z-index: 1;
}

.asp-migration-heading {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 110px;
  align-items: center;
}

.asp-migration h2 em {
  color: #c9dfb9;
}

.asp-migration-heading p:not(.asp-eyebrow) {
  max-width: 490px;
  margin-top: 24px;
  color: #b8d0bf;
  font-size: 13px;
  line-height: 1.8;
}

.asp-migration-number {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 17px;
}

.asp-migration-tag {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 9px 15px;
  border: 1px solid rgba(202, 228, 201, 0.28);
  border-radius: 999px;
  color: #d3e7c6;
  font-size: 8px;
  letter-spacing: 0.17em;
}

.asp-migration-tag i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #b39aff;
}

.asp-migration-stat {
  display: flex;
  align-items: center;
  gap: 26px;
}

.asp-migration-stat > strong {
  color: #d9e9c9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(112px, 12vw, 164px);
  font-weight: 400;
  letter-spacing: -0.1em;
  line-height: 0.82;
}

.asp-migration-stat > span {
  padding-left: 25px;
  border-left: 1px solid rgba(216, 237, 210, 0.55);
  color: #b7d0b8;
  font-size: 8px;
  letter-spacing: 0.16em;
  line-height: 1.9;
}

.asp-migration-timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  margin-top: 70px !important;
}

.asp-migration-timeline > li {
  position: relative;
  padding: 38px 30px 0 0;
  border-top: 1px solid #789b80;
}

.asp-migration-node {
  position: absolute;
  top: -14px;
  left: 0;
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid #8aad8a;
  border-radius: 50%;
  background: #041b1c;
  color: #bed5bd;
  font-size: 8px;
}

.asp-migration-node svg {
  width: 13px;
  height: 13px;
}

.asp-migration-complete {
  border-color: #d9e9ba;
  background: #d9e9ba;
  color: #174d35;
}

.asp-migration-timeline small {
  display: block;
  color: #a8c3aa;
  font-size: 8px;
  letter-spacing: 0.14em;
}

.asp-migration-timeline h3 {
  margin-top: 11px;
  color: #f3f7ef;
  font-size: 20px;
  font-weight: 400;
}

.asp-migration-timeline p {
  max-width: 270px;
  margin-top: 8px;
  color: #abc4ae;
  font-size: 11px;
  line-height: 1.65;
}




/* Results */
.asp-results {
  background: #ffffff;
  width: 100%;
  max-width: none;
  padding-inline: 0;
  margin-inline: 0;
}
.asp-results > * {
  width: min(1340px, calc(100% - 96px));
  margin-inline: auto;
}

.asp-results-heading {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 110px;
  align-items: end;
}

.asp-results-heading > p {
  max-width: 470px;
  font-size: 14px;
  line-height: 1.8;
  color: #53645e;
}

.asp-results-grid {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 46px;
  margin-top: 58px;
  align-items: stretch;
}

.asp-results-grid > * {
  min-width: 0;
}

.asp-collections {
  padding: 0;
  border: 0;
  background: #ffffff;
}

.asp-chart-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;
}

.asp-chart-heading > div {
  min-width: 0;
}

.asp-chart-heading .asp-eyebrow {
  margin-bottom: 10px !important;
  font-size: 8px !important;
}

.asp-chart-heading h3 {
  color: #17352b;
  font-size: 22px;
  font-weight: 500;
}

.asp-chart-delta {
  color: #24704d;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 45px;
  letter-spacing: -0.06em;
  line-height: 0.9;
  white-space: nowrap;
}

.asp-chart-delta small {
  display: block;
  margin-top: 8px;
  color: #7a8c83;
  font-family: Arial, sans-serif;
  font-size: 8px;
  letter-spacing: 0;
  text-align: right;
}

.asp-line-chart {
  position: relative;
  height: 300px;
  margin-top: 42px;
  padding-left: 42px;
}

.asp-line-grid {
  position: absolute;
  inset: 0 0 0 42px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #899992;
  font-size: 8px;
}

.asp-line-grid span {
  position: relative;
  display: flex;
  align-items: center;
  height: 0;
}

.asp-line-grid span::after {
  content: "";
  height: 1px;
  margin-left: 14px;
  flex: 1;
  border-top: 1px dashed #dbe5df;
}

.asp-line-chart svg {
  position: absolute;
  inset: 0 0 0 42px;
  width: calc(100% - 42px);
  height: 100%;
  overflow: visible;
}

.asp-line-path {
  fill: none;
  stroke: #216747;
  stroke-width: 4;
  stroke-linecap: round;
}

.asp-line-area {
  stroke: none;
}

.asp-line-guide {
  stroke: #9bbbaa;
  stroke-dasharray: 4 5;
  stroke-width: 1;
}

.asp-line-point {
  fill: #216747;
  stroke: #ffffff;
  stroke-width: 4;
}

.asp-line-value {
  position: absolute;
  z-index: 2;
  color: #17352b;
  font-size: 17px;
  font-weight: 600;
}

.asp-line-value--march {
  top: 39%;
  left: 25%;
}

.asp-line-value--july {
  top: 8%;
  right: 8%;
}

.asp-line-month {
  position: absolute;
  bottom: -27px;
  color: #72847b;
  font-size: 8px;
  letter-spacing: 0.12em;
  white-space: nowrap;
}

.asp-line-month--march {
  left: 20%;
}

.asp-line-month--july {
  right: 5%;
}

.asp-collections figcaption {
  margin-top: 47px;
  color: #8b9a91;
  font-size: 8px;
}

.asp-reliability {
  padding: 40px;
  border: 0;
  border-radius: 14px;
  background: #edf6e8;
}

.asp-reliability-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
}

.asp-reliability-heading .asp-eyebrow {
  margin: 0 !important;
  color: #597364;
  font-size: 8px !important;
}

.asp-status-circle {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid #a9c5aa;
  border-radius: 50%;
  color: #2a704d;
}

.asp-status-circle svg {
  width: 14px;
  height: 14px;
}

.asp-reliability > strong {
  display: block;
  margin-top: 35px;
  color: #23623f;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 112px;
  font-weight: 400;
  letter-spacing: -0.08em;
  line-height: 0.82;
}

.asp-reliability > strong > span {
  font-size: 0.62em;
}

.asp-reliability h3 {
  margin-top: 17px;
  color: #2d623f;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 30px;
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1.08;
}

.asp-reliability-track {
  height: 6px;
  margin-top: 36px;
  background: #cfe0c9;
}

.asp-reliability-track i {
  display: block;
  width: 95%;
  height: 100%;
  background: #2b704a;
}

.asp-reliability-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 34px;
}

.asp-reliability-foot > strong {
  color: #356b48;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 29px;
  font-weight: 400;
  letter-spacing: -0.05em;
}

.asp-reliability-foot > p {
  color: #778c7c;
  font-size: 9px;
  line-height: 1.5;
}

.asp-source-note {
  max-width: 860px;
  margin-top: 22px !important;
  color: #83928b;
  font-size: 9px;
  line-height: 1.7;
}

.asp-source-note a {
  text-decoration: underline;
  text-underline-offset: 3px;
}






/* Closing */
.asp-cta-section {
  padding-block: 80px 45px;
}
.asp-cta {
  padding: 60px;
  background: var(--deep);
  color: #fff;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 70px;
  align-items: center;
}
.asp-cta h2 {
  font-size: 42px;
}
.asp-cta h2 em {
  color: #bfd5ad;
}
.asp-cta p:not(.asp-eyebrow) {
  color: #a5bba7;
  font-size: 13px;
  line-height: 1.8;
  margin-top: 23px;
  max-width: 410px;
}
.asp-cta .asp-button {
  margin-top: 27px;
}
.asp-cta-side {
  border-left: 1px solid #ffffff21;
  padding-left: 45px;
}
.asp-cta-brand {
  font-size: 21px;
  font-weight: 500;
  letter-spacing: -0.06em;
  display: flex;
  align-items: center;
  gap: 19px;
  white-space: nowrap;
}
.asp-cta-brand > span {
  font-size: 17px;
  font-weight: 300;
  color: #6e9776;
}
.asp-cta-side ul {
  list-style: none;
  margin-top: 28px;
}
.asp-cta-side li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  padding-block: 13px;
  border-bottom: 1px solid #ffffff15;
  color: #c5d5bc;
}
.asp-cta-side li svg {
  width: 13px;
  height: 13px;
  color: #a6c58e;
}
.asp-cta-caption {
  display: block;
  font-size: 7px;
  letter-spacing: 0.13em;
  margin-top: 27px;
  color: #819f84;
}
.asp-footer {
  padding-bottom: 35px;
}
.asp-footer > div {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 10px;
}
.asp-footer a {
  display: flex;
  align-items: center;
  gap: 8px;
}
.asp-footer svg {
  width: 14px;
  height: 14px;
}
.asp-footer > p {
  font-size: 8px;
  margin-top: 20px !important;
  color: #899382;
}
/* Responsive */
@media (min-width: 1500px) {
  .asp-hero-grid {
    gap: 90px;
  }
  .asp-hero-visual {
    margin-right: -50px;
  }
}
@media (max-width: 1100px) {
  .asp-container {
    width: calc(100% - 64px);
  }
  .asp-container--wide {
    width: calc(100% - 64px);
  }
  .asp-results > * {
    width: calc(100% - 64px);
  }
  .asp-hero-grid {
    gap: 40px;
    min-height: 610px;
    padding-block: 100px 70px;
  }
  .asp-hero-visual {
    margin-right: 0;
    min-height: 440px;
  }
  .asp-hero h1 {
    font-size: 48px;
  }
  .asp-payment-card {
    width: 300px;
    left: -22px;
    padding: 20px;
  }
  .asp-about,
  .asp-growth-heading,
  .asp-growth-story,
  .asp-workflow-grid,
  .asp-human-grid,
  .asp-problem-heading,
  .asp-results-heading {
    gap: 45px;
  }
  .asp-metric {
    padding-inline: 20px;
  }
  .asp-metric-label {
    font-size: 7px;
  }
  .asp-metric > strong.asp-metric-range {
    font-size: 32px;
    line-height: 1.95;
  }
   
  .asp-migration-heading {
    gap: 65px;
  }
  .asp-migration-number {
    gap: 20px;
  }
  .asp-migration-number > strong {
    font-size: 115px;
  }
  .asp-migration-number > span {
    font-size: 7px;
  }
  .asp-cta {
    padding: 42px;
    gap: 40px;
  }
  .asp-cta h2 {
    font-size: 36px;
  }
  .asp-cta-side {
    padding-left: 25px;
  }
  .asp-cta-brand {
    font-size: 18px;
  }
  .asp-record-body {
    padding: 19px;
  }
  .asp-reliability {
    padding: 30px;
  }
  .asp-record-panels > div {
    padding: 14px;
  }
  .asp-record-panels {
    gap: 10px;
  }
  .asp-workflow-grid {
    grid-template-columns: 0.8fr 1.2fr;
  }
}
@media (max-width: 800px) {
  .asp-container {
    width: calc(100% - 44px);
  }
  .asp-section {
    padding-block: 64px;
  }
  .asp-top-label {
    font-size: 7px;
    gap: 10px;
  }
  .asp-hero-grid {
    grid-template-columns: 1fr;
    gap: 38px;
    padding-block: 90px 45px;
  }
  .asp-hero h1 {
    font-size: clamp(44px, 7vw, 64px);
    max-width: 640px;
  }
  .asp-deck {
    max-width: 580px;
  }
  .asp-hero-meta {
    margin-top: 27px;
  }
  .asp-hero-visual {
    min-height: 410px;
    margin-left: 24px;
  }
  .asp-hero-photo {
    object-position: center 45%;
  }
  .asp-payment-card {
    width: 320px;
    left: -24px;
    bottom: 24px;
  }

  .asp-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-block: 12px;
  }
  .asp-metric {
    padding: 24px !important;
  }
  .asp-metric:nth-child(3) {
    border-left: 0;
  }
  .asp-metric:nth-child(n + 3) {
    border-top: 1px solid var(--line);
  }
  .asp-metric-label {
    font-size: 8px;
  }
  .asp-metric > strong.asp-metric-range {
    font-size: 39px;
    line-height: 1.6;
  }
  .asp-about {
    gap: 38px;
    grid-template-columns: 1fr 1fr;
  }
  .asp-about-visual {
    height: 520px;
  }
    
  .asp-about h2 {
    font-size: 34px;
  }
  .asp-about-copy > p:not(.asp-eyebrow) {
    font-size: 12px;
  }
  .asp-facts > div {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  .asp-facts dd {
    font-size: 11px;
  }
  .asp-growth-heading,
  .asp-problem-heading,
  .asp-results-heading {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .asp-growth-heading > p {
    max-width: 600px;
  }
  .asp-growth-story {
    gap: 40px;
    grid-template-columns: 0.9fr 1.1fr;
  }
  .asp-dot-field {
    gap: 5px;
  }
 
  .asp-client-count > strong {
    font-size: 88px;
  }
  .asp-client-count > p {
    font-size: 10px;
  }
  .asp-friction-step {
    padding: 20px;
  }
  .asp-friction-step h3 {
    font-size: 15px;
  }
  .asp-friction-top > span:last-child {
    display: none;
  }
  .asp-friction-step > p {
    min-height: 45px;
  }
  .asp-workflow-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .asp-workflow-grid > div > h2 br {
    display: none;
  }
  .asp-small-quote {
    max-width: 600px;
  }
  .asp-record-figure {
    max-width: 650px;
    width: 100%;
    justify-self: center;
  }
  .asp-migration-heading {
    gap: 35px;
    grid-template-columns: 1fr 0.8fr;
  }
  .asp-migration-number {
    display: block;
  }
  .asp-migration-number > strong {
    font-size: 110px;
    display: block;
  }
  .asp-migration-number > span {
    display: block;
    margin-top: 17px;
    font-size: 8px;
  }
  .asp-results-grid {
    grid-template-columns: 1.25fr 1fr;
    gap: 16px;
  }
  .asp-collections {
    padding: 23px;
  }
  .asp-chart-heading h3 {
    font-size: 16px;
  }
  .asp-chart-heading {
    gap: 12px;
  }
  .asp-chart-delta {
    font-size: 32px;
  }
  .asp-chart-delta small {
    font-size: 7px;
  }
  .asp-chart-bars {
    gap: 28px;
  }
  .asp-reliability {
    padding: 25px;
  }
  .asp-reliability > strong {
    font-size: 86px;
  }
  .asp-reliability-foot {
    display: block;
  }
  .asp-reliability-foot p {
    margin-top: 8px;
  }
  .asp-human-grid {
    gap: 35px;
  }
  .asp-human-image {
    min-height: 530px;
  }
  .asp-human-quote {
    left: 24px;
  }
  .asp-human-quote blockquote {
    font-size: 28px;
  }
  .asp-human-copy h2 {
    font-size: 35px;
  }
  .asp-human-copy > p:not(.asp-eyebrow) {
    font-size: 12px;
  }
  .asp-improvements p {
    font-size: 11px;
  }
  .asp-improvements > div {
    gap: 12px;
  }
  .asp-cta {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .asp-cta-side {
    border-left: 0;
    border-top: 1px solid #ffffff21;
    padding: 27px 0 0;
  }
  .asp-cta-side ul {
    margin-top: 16px;
  }
  .asp-cta h2 {
    font-size: 40px;
  }
}
@media (max-width: 560px) {
  .asp-container {
    width: calc(100% - 36px);
  }
  .asp-topbar {
    min-height: 61px;
  }
  .asp-top-label {
    display: none;
  }
  .asp-hero-grid {
    padding-top: 72px;
    gap: 30px;
  }
  .asp-hero .asp-eyebrow {
    font-size: 8px !important;
    max-width: 260px;
    line-height: 1.8;
  }
  .asp-hero h1 {
    font-size: 43px;
    letter-spacing: -0.055em;
  }
  .asp-deck {
    font-size: 13px;
    line-height: 1.8;
    margin-top: 23px !important;
  }
  .asp-hero-links {
    gap: 20px;
    flex-wrap: wrap;
  }
  .asp-button {
    padding: 14px 18px;
    min-height: 48px;
    font-size: 12px;
    gap: 20px;
  }
  .asp-text-link {
    font-size: 11px;
  }
  .asp-hero-meta {
    font-size: 7px;
    gap: 12px;
  }
  .asp-hero-meta span + span {
    padding-left: 12px;
  }
  .asp-hero-visual {
    min-height: 350px;
    margin-left: 13px;
  }
  .asp-hero-wordmark {
    left: 20px;
    top: 20px;
    font-size: 18px;
  }
  .asp-payment-card {
    width: min(286px, calc(100% + 3px));
    left: -13px;
    bottom: 18px;
    padding: 18px 20px;
  }
  .asp-payment-card-value {
    margin-top: 18px;
    gap: 17px;
  }
  .asp-payment-card-value strong {
    font-size: 50px;
  }
  .asp-payment-card-value p {
    font-size: 9px;
  }
  .asp-payment-card-top {
    font-size: 11px;
  }
  .asp-story-nav > .asp-container {
    min-height: 52px;
  }
  .asp-story-nav .asp-container > div {
    gap: 21px;
    font-size: 10px;
  }
  .asp-nav-cta {
    font-size: 9px;
  }
  .asp-nav-cta svg {
    display: none;
  }
  .asp-metric {
    padding: 23px 17px !important;
  }
  .asp-metric:nth-child(odd) {
    padding-left: 0 !important;
  }
  .asp-metric:nth-child(even) {
    padding-right: 0 !important;
  }
  .asp-metric-label {
    font-size: 6.5px;
    letter-spacing: 0.08em;
  }
  .asp-metric > strong {
    font-size: 43px;
  }
  .asp-metric > strong.asp-metric-range {
    font-size: 28px;
    line-height: 1.85;
  }
  .asp-metric p {
    font-size: 10px;
    min-height: 48px;
  }
  .asp-metric-note {
    font-size: 7px;
    line-height: 1.5;
    min-height: 20px;
  }
  .asp-about {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .asp-about-visual {
    height: 350px;
  }
  .asp-about-plaque > p {
    font-size: 25px;
  }
  .asp-about-plaque > div {
    display: flex;
  }
  .asp-about-plaque > div > span {
    display: block;
  }
  .asp-about-copy h2 {
    font-size: 38px;
  }
  .asp-about-copy h2 br:last-child {
    display: none;
  }
  .asp-about-copy > p:not(.asp-eyebrow) {
    font-size: 13px;
  }
  .asp-facts > div {
    grid-template-columns: 115px 1fr;
  }
  .asp-eyebrow {
    font-size: 8px !important;
    margin-bottom: 17px !important;
  }
  .asp h2 {
    font-size: 37px;
  }
  .asp-growth {
    padding: 55px 0;
  }
  .asp-growth-heading > p {
    font-size: 13px;
  }
  .asp-growth-story {
    grid-template-columns: 1fr;
    gap: 33px;
    margin-top: 34px;
  }
  .asp-client-count {
    grid-template-columns: auto 1fr;
    max-width: 370px;
  }
  .asp-client-count > strong {
    font-size: 105px;
  }
  .asp-client-count > p {
    font-size: 14px;
    max-width: 140px;
    padding-bottom: 8px;
  }
  .asp-dot-field {
    gap: 7px;
  }
  .asp-dot-field i {
    max-width: 7px;
  }
  .asp-dot-legend {
    font-size: 9px;
  }
 
  .asp-problem-heading > p,
  .asp-results-heading > p {
    font-size: 13px;
  }
  .asp-friction-map {
    margin-top: 30px;
  }
  .asp-friction-top {
    padding: 15px 20px;
  }
  .asp-friction-columns {
    grid-template-columns: 1fr;
  }
  .asp-friction-step {
    padding: 23px 22px 23px 61px;
  }
  .asp-friction-num {
    position: absolute;
    top: 22px;
    left: 20px;
    font-size: 24px;
  }
  .asp-friction-step h3 {
    margin-top: 0;
    font-size: 16px;
  }
  .asp-friction-step > p {
    min-height: 0;
    font-size: 11px;
  }
  .asp-friction-step + .asp-friction-step {
    border-left: 0;
    border-top: 1px dashed #d8dfd1;
  }
  .asp-friction-pain {
    margin-top: 13px;
    padding-top: 11px;
    font-size: 10px;
  }
  .asp-friction-bottom {
    display: block;
    padding: 17px 20px;
  }
  .asp-friction-bottom p {
    margin-top: 6px;
    font-size: 10px;
  }
  .asp-workflow {
    padding: 55px 0;
  }
  .asp-workflow-grid > div > p:not(.asp-eyebrow) {
    font-size: 13px;
  }
  .asp-small-quote p {
    font-size: 23px;
  }
  .asp-record-top {
    padding: 12px 15px;
  }
  .asp-record-top > .asp-muted {
    font-size: 6px;
  }
  .asp-client-head {
    padding: 17px 15px;
  }
  .asp-client-head strong {
    font-size: 11px;
  }
  .asp-client-head small {
    font-size: 8px;
  }
  .asp-tabs {
    gap: 20px;
    padding: 0 15px;
    font-size: 8px;
  }
  .asp-record-body {
    padding: 17px 15px;
  }
  .asp-record-title h3 {
    font-size: 14px;
  }
  .asp-powered {
    font-size: 18px;
  }
  .asp-record-panels {
    padding: 18px 0;
    gap: 9px;
  }
  .asp-record-panels > div {
    padding: 12px 9px;
  }
  .asp-payment-value {
    font-size: 25px;
  }
  .asp-payment-value > span {
    font-size: 13px;
  }
  .asp-dd {
    font-size: 13px;
    margin: 12px 0;
  }
  .asp-record-panels > div > small {
    font-size: 8px;
  }
  .asp-positive {
    font-size: 7px;
  }
  .asp-record-figure figcaption {
    font-size: 7px;
  }
  .asp-migration {
    padding: 55px 0;
  }
  .asp-migration-heading {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .asp-migration-number {
    display: flex;
    gap: 25px;
  }
  .asp-migration-number > strong {
    font-size: 98px;
  }
  .asp-migration-number > span {
    margin-top: 0;
  }
  .asp-migration-heading p:not(.asp-eyebrow) {
    font-size: 13px;
  }
  .asp-migration-timeline {
    grid-template-columns: 1fr;
    margin-top: 35px !important;
    padding-left: 12px !important;
  }
  .asp-migration-timeline > li {
    border-top: 0;
    border-left: 1px solid #6e997c;
    padding: 0 0 28px 30px;
  }
  .asp-migration-timeline > li:last-child {
    padding-bottom: 0;
    border-left-color: transparent;
  }
  .asp-migration-node {
    left: -13px;
    top: 0;
  }
  .asp-migration-timeline h3 {
    font-size: 21px;
    margin-top: 5px;
  }
  .asp-migration-timeline p {
    font-size: 12px;
    max-width: none;
    margin-top: 5px;
  }
  .asp-results-grid {
    grid-template-columns: 1fr;
    margin-top: 30px;
  }
  .asp-chart-heading h3 {
    font-size: 18px;
  }
  .asp-chart-delta {
    font-size: 37px;
  }
  .asp-bar-chart {
    height: 215px;
    margin-top: 38px;
  }
  .asp-reliability {
    padding: 27px;
  }
  .asp-reliability > strong {
    font-size: 100px;
    margin-top: 0;
  }
  .asp-reliability h3 {
    font-size: 29px;
  }
  .asp-reliability h3 br {
    display: none;
  }
  .asp-reliability-foot {
    display: flex;
    margin-top: 22px;
  }
  .asp-reliability-foot > p {
    margin-top: 0;
    font-size: 9px;
  }
  .asp-human {
    padding: 55px 0;
  }
  .asp-human-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }
  .asp-human-image {
    min-height: 390px;
  }
  .asp-human-quote {
    left: 26px;
    bottom: 26px;
  }
  .asp-human-quote blockquote {
    font-size: 33px;
  }
  .asp-human-copy h2 {
    font-size: 37px;
  }
  .asp-human-copy > p:not(.asp-eyebrow) {
    font-size: 13px;
  }
  .asp-improvements p {
    font-size: 12px;
  }
  .asp-improvements > div {
    gap: 19px;
  }
  .asp-cta-section {
    padding-block: 50px 30px;
  }
  .asp-cta {
    padding: 29px 25px;
    gap: 29px;
  }
  .asp-cta h2 {
    font-size: 33px;
  }
  .asp-cta p:not(.asp-eyebrow) {
    font-size: 12px;
  }
  .asp-cta-side li {
    font-size: 10px;
  }
  .asp-footer > div {
    font-size: 9px;
    flex-wrap: wrap;
  }
  .asp-footer > p {
    font-size: 7px;
    line-height: 1.8;
  }
  .asp-footer {
    padding-bottom: 25px;
  }
}
@media (max-width: 360px) {
  .asp-chart-heading {
    gap: 8px;
  }
  .asp-chart-heading h3 {
    font-size: 16px;
  }
  .asp-chart-delta {
    font-size: 30px;
  }
  .asp-chart-delta small {
    font-size: 6.5px;
  }
  .asp-about-plaque > div > span {
    display: none;
  }
  .asp-story-nav .asp-container > div {
    gap: 16px;
  }
  .asp-chart-bars {
    gap: 22px;
  }
  .asp-bar-column > span {
    font-size: 7px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .asp * {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}
@media print {
  .asp {
    background: #fff;
  }
  .asp-story-nav,
  .asp-hero-links,
  .asp-cta-section,
  .asp-skip {
    display: none;
  }
  .asp-container {
    width: 100%;
  }
  .asp-section {
    padding-block: 35px;
  }
  .asp-hero {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  .asp-migration,
  .asp-reliability {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  .asp-footer a {
    text-decoration: underline;
  }
}

/* =====================================================
   BLENDED BUILDING HERO
   ===================================================== */

.asp-hero.asp-hero--blended {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: clamp(700px, 53vw, 900px);
  padding: 80px 0 70px;
  background: #041b1c;
  color: #fff;
}

/* One image behind the entire hero */
.asp-hero--blended .asp-hero-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center;
}

/* Subtle extra shade behind the copy */
.asp-hero--blended::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(4, 27, 28, .22) 0%,
    rgba(4, 27, 28, .08) 35%,
    transparent 60%
  );
}

/* Copy and payment card sit above the photograph */
.asp-hero--blended .asp-hero-grid {
  position: relative;
  z-index: 2;
  width: min(1340px, calc(100% - 96px));
  margin-inline: auto;
  padding: 0;
  min-height: 0;

  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 64px;
  align-items: end;
}

 .asp-hero--blended .asp-hero-copy {
  max-width: 620px;
  padding-top: 80px;
}

.asp-hero--blended .asp-eyebrow {
  margin-bottom: 28px !important;
  color: #b6cec0 !important;
  font-size: 9px !important;
  line-height: 1.7;
  letter-spacing: .16em;
}

.asp-hero--blended h1 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(48px, 4.65vw, 78px);
  font-weight: 400;
  line-height: 1.065;
  letter-spacing: -.05em;
  text-wrap: initial;
  color: #fff;
}

.asp-hero--blended h1 em {
  font-style: normal;
  color: #bfd3b5;
}

.asp-hero--blended .asp-deck {
  max-width: 550px;
  margin-top: 29px !important;
  margin-bottom: 0 !important;
  font-size: 18px;
  line-height: 1.85;
  color: #ffffff !important;
}

.asp-hero--blended .asp-hero-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 28px;
  margin-top: 32px;
}

.asp-hero--blended .asp-button {
  padding: 17px 24px;
  border-radius: 4px;
  background: #167273;
   color: #ffffff !important;
}


.asp-hero--blended .asp-button:hover {
  background: #1a8b8c;
}


.asp-hero--blended .asp-text-link {
  color: #fff;
}

.asp-hero--blended .asp-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 43px;
  font-size: 11px;
  letter-spacing: .12em;
  color: #91ad9e;
}

.asp-hero--blended .asp-hero-meta span + span {
  padding-left: 18px;
  border-left: 1px solid rgba(255, 255, 255, .18);
}

/* Right column now contains only the live payment card */
.asp-hero--blended .asp-hero-visual {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  align-self: end;
  min-height: 0;
  margin: 0;
  padding: 0 0 0 4px;
}

/* Compact, understated proof card */
.asp-hero--blended .asp-payment-card {
  position: relative;
  inset: auto;
  width: 280px;
  max-width: 100%;
  padding: 22px 23px 17px;

  background: rgba(251, 252, 244, .94);
  border: 1px solid rgba(255, 255, 255, .55);
  border-radius: 7px;
  backdrop-filter: blur(12px);

  color: #143c32;
  box-shadow: 0 15px 40px rgba(0, 24, 14, .12);
}

.asp-hero--blended .asp-payment-card-top {
  gap: 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -.025em;
}

.asp-hero--blended .asp-payment-check {
  width: 29px;
  height: 29px;
  flex-shrink: 0;
  border-color: #b9d4b2;
  color: #56825a;
}

.asp-hero--blended .asp-payment-card-top small,
.asp-hero--blended .asp-live-dot,
.asp-hero--blended .asp-payment-card-foot > span:first-child {
  display: none;
}

.asp-hero--blended .asp-payment-card-value {
  display: block;
  margin-top: 17px;
}

.asp-hero--blended .asp-payment-card-value strong {
  display: block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 64px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.07em;
}

.asp-hero--blended .asp-payment-card-value strong span {
  font-size: .67em;
}

.asp-hero--blended .asp-payment-card-value p {
  margin-top: 9px;
  font-size: 9px;
  line-height: 1.6;
  color: #6b7a70;
}

.asp-hero--blended .asp-payment-rail {
  height: 3px;
  margin-top: 17px;
  background: #d0d9ca;
}

.asp-hero--blended .asp-payment-rail i {
  width: 95%;
  background: #235f45;
}

.asp-hero--blended .asp-payment-card-foot {
  justify-content: flex-end;
  margin-top: 10px;
}

.asp-hero--blended .asp-payment-card-foot > span:last-child {
  font-size: 20px;
  line-height: 1.2;
}

/* Activate the nav overlay by adding the class in step 5 */
body:has(.asp-hero--blended) .site-nav--adfin-hero {
  position: absolute;
  inset: 0 0 auto;
  z-index: 50;
  width: 100%;
  background: transparent !important;
  border-bottom: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

/* Reserve space inside the hero for the overlaid nav */
body:has(.site-nav--adfin-hero) .asp-hero--blended {
  padding-top: 150px;
}

/* Tablet */
@media (max-width: 1100px) {
  .asp-hero.asp-hero--blended {
    min-height: 690px;
    padding-bottom: 55px;
  }

  .asp-hero--blended .asp-hero-grid {
    width: calc(100% - 64px);
    gap: 40px;
  }

  .asp-hero--blended h1 {
    font-size: 50px;
  }

  .asp-hero--blended .asp-deck {
    font-size: 15px;
  }

  .asp-hero--blended .asp-payment-card {
    width: 255px;
    padding: 20px;
  }
}

/* Stacked layout */
@media (max-width: 800px) {
  .asp-hero.asp-hero--blended {
    min-height: 0;
    padding: 55px 0 40px;
  }

  body:has(.site-nav--adfin-hero) .asp-hero--blended {
    padding-top: 115px;
  }

  .asp-hero--blended .asp-hero-grid {
    width: calc(100% - 44px);
    grid-template-columns: minmax(0, 1fr);
    gap: 35px;
  }

  .asp-hero--blended .asp-hero-backdrop {
    object-position: 67% center;
  }

  .asp-hero--blended::after {
    background: linear-gradient(
      180deg,
      rgba(4, 27, 28, .97) 0%,
      rgba(4, 27, 28, .92) 46%,
      rgba(4, 27, 28, .55) 70%,
      rgba(4, 27, 28, .10) 100%
    );
  }

  .asp-hero--blended h1 {
    font-size: clamp(43px, 7.8vw, 62px);
  }

  .asp-hero--blended .asp-hero-visual {
    min-height: 280px;
    padding: 0;
  }

  .asp-hero--blended .asp-payment-card {
    width: 260px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .asp-hero--blended .asp-hero-grid {
    width: calc(100% - 36px);
    gap: 25px;
  }

  body:has(.site-nav--adfin-hero) .asp-hero--blended {
    padding-top: 105px;
  }

  .asp-hero--blended .asp-eyebrow {
    max-width: 285px;
    margin-bottom: 23px !important;
    font-size: 7px !important;
  }

  .asp-hero--blended h1 {
    font-size: clamp(36px, 10.8vw, 49px);
  }

  .asp-hero--blended .asp-deck {
    margin-top: 23px !important;
    font-size: 14px;
  }

  .asp-hero--blended .asp-hero-links {
    gap: 20px;
    margin-top: 25px;
  }

  .asp-hero--blended .asp-button {
    padding: 14px 18px;
  }




  .asp-hero--blended .asp-hero-meta {
    gap: 12px;
    margin-top: 30px;
    font-size: 10px;
  }

  .asp-hero--blended .asp-hero-meta span + span {
    padding-left: 12px;
  }

  .asp-hero--blended .asp-hero-visual {
    min-height: 245px;
  }

  .asp-hero--blended .asp-payment-card {
    width: 245px;
  }
}

/* =====================================================
   PROCESS FLOW DIAGRAM
   ===================================================== */
.asp .asp-flow {
  --flow-line: #0f6b50;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(190px, 0.6fr) minmax(0, 1fr);
  align-items: center;
  margin-top: 56px;
}

/* Cards */
.asp .asp-flow-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}
.asp .asp-flow-num {
  display: block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 32px;
  line-height: 1;
  color: #9fc1ae;
}
.asp .asp-flow h3 {
  margin-top: 10px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #fff;
}
.asp .asp-flow-head p {
  margin-top: 6px;
  font-size: 15px;
  line-height: 1.5;
  color: #cfe3d7;
}
.asp .asp-flow-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.asp .asp-flow-icon svg {
  width: 30px;
  height: 30px;
  stroke-width: 1.5;
}
.asp .asp-flow-pain {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 15px;
  line-height: 1.5;
  color: #e5f1ea;
}
.asp .asp-flow-pain i {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #bfe0c9;
}

/* Dark source card */
.asp .asp-flow-source {
  padding: 32px 36px 28px;
  border-radius: 12px;
  background: linear-gradient(160deg, #11654c 0%, #0b4f3b 100%);
  color: #fff;
  box-shadow: 0 24px 50px -28px rgba(5, 46, 36, 0.55);
}

/* White target cards */
.asp .asp-flow-targets {
  display: grid;
  gap: 28px;
  margin-left: 56px;
}
.asp .asp-flow-target {
  position: relative;
  padding: 26px 28px 24px;
  border: 1px solid #e1e9df;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 14px 36px -26px rgba(16, 61, 48, 0.35);
}
.asp .asp-flow-target .asp-flow-num {
  font-size: 28px;
  color: #6f8579;
}
.asp .asp-flow .asp-flow-target h3 {
  font-size: 22px;
  color: #10382b;
}
.asp .asp-flow-target .asp-flow-head p {
  font-size: 14.5px;
  color: #5d6f64;
}
.asp .asp-flow-target .asp-flow-icon {
  background: #e6f1ea;
  color: #1b5b45;
}
.asp .asp-flow-target .asp-flow-pain {
  margin-top: 20px;
  padding-top: 0;
  border-top: 0;
  font-size: 14.5px;
  color: #51655a;
}
.asp .asp-flow-target .asp-flow-pain i {
  background: #8fb7a0;
}

/* Elbow connectors + hollow nodes */
.asp .asp-flow-target::before {
  content: "";
  position: absolute;
  left: -56px;
  width: 56px;
  border-left: 1.5px solid var(--flow-line);
  pointer-events: none;
}
.asp .asp-flow-target:first-child::before {
  top: 50%;
  height: calc(50% + 14px);
  border-top: 1.5px solid var(--flow-line);
  border-top-left-radius: 16px;
}
.asp .asp-flow-target:last-child::before {
  bottom: 50%;
  height: calc(50% + 14px);
  border-bottom: 1.5px solid var(--flow-line);
  border-bottom-left-radius: 16px;
}
.asp .asp-flow-target::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -7px;
  width: 13px;
  height: 13px;
  margin-top: -6.5px;
  border: 2px solid var(--flow-line);
  border-radius: 50%;
  background: #fff;
}

/* Centre: broken link */
.asp .asp-flow-gap {
  position: relative;
  align-self: stretch;
  min-height: 160px;
}
.asp .asp-flow-seg {
  position: absolute;
  top: calc(50% - 0.75px);
  height: 0;
  border-top: 1.5px solid var(--flow-line);
}
.asp .asp-flow-seg--l {
  left: 0;
  width: calc(50% - 118px);
}
.asp .asp-flow-seg--l::before {
  content: "";
  position: absolute;
  left: -7px;
  top: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--flow-line);
  box-shadow: 0 0 0 3px var(--paper);
}
.asp .asp-flow-seg--r {
  right: 0;
  width: calc(50% - 118px);
}
.asp .asp-flow-seg--dash {
  left: calc(50% - 118px);
  width: 236px;
  top: calc(50% - 1px);
  height: 2px;
  border-top: 0;
  background: repeating-linear-gradient(90deg, #ec6f57 0 18px, transparent 18px 30px);
}
.asp .asp-flow-alert {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ec6a4f;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 0 0 8px var(--paper);
}
.asp .asp-flow-label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(50% + 40px);
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  line-height: 1.6;
  text-transform: uppercase;
  color: #10382b;
}
.asp .asp-flow-pill {
  position: absolute;
  top: calc(50% + 38px);
  left: 50%;
  transform: translateX(-50%);
  padding: 9px 18px;
  border-radius: 999px;
  background: #fde8e2;
  color: #e0583f;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
}
.asp .asp-flow-gap::before,
.asp .asp-flow-gap::after {
  content: "";
  position: absolute;
  left: 50%;
  border-left: 1.5px dotted #cfd8cb;
}
.asp .asp-flow-gap::before {
  top: calc(50% - 150px);
  bottom: calc(50% + 100px);
}
.asp .asp-flow-gap::after {
  top: calc(50% + 100px);
  bottom: calc(50% - 150px);
}

/* Consequence bar */
.asp .asp-flow-consequence {
  display: flex;
  align-items: center;
  gap: 26px;
  margin-top: 56px;
  padding: 22px 30px;
  border: 1px solid #e4e9df;
  border-radius: 12px;
  background: #f5f6f0;
}
.asp .asp-flow-consequence .asp-flow-icon {
  width: 58px;
  height: 58px;
  border-radius: 10px;
  background: #e8eee5;
  color: #27493a;
}
.asp .asp-flow-consequence .asp-flow-icon svg {
  width: 26px;
  height: 26px;
}
.asp .asp-flow-divider {
  align-self: stretch;
  width: 1px;
  background: #dde3d9;
}
.asp .asp-flow-consequence small {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #5c7164;
}
.asp .asp-flow-consequence p {
  margin-top: 4px;
  font-size: 21px;
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: #10382b;
}

/* Tablet / mobile: stack, drop the connectors */
@media (max-width: 900px) {
  .asp .asp-flow {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 40px;
  }
  .asp .asp-flow-gap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    min-height: 0;
    padding: 24px 0;
  }
  .asp .asp-flow-gap::before,
  .asp .asp-flow-gap::after,
  .asp .asp-flow-seg,
  .asp .asp-flow-label {
    display: none;
  }
  .asp .asp-flow-alert,
  .asp .asp-flow-pill {
    position: static;
    transform: none;
    box-shadow: none;
  }
  .asp .asp-flow-targets {
    margin-left: 0;
  }
  .asp .asp-flow-target::before,
  .asp .asp-flow-target::after {
    display: none;
  }
}
@media (max-width: 560px) {
  .asp .asp-flow-source {
    padding: 24px 22px;
  }
  .asp .asp-flow-target {
    padding: 22px 20px;
  }
  .asp .asp-flow-icon {
    width: 54px;
    height: 54px;
  }
  .asp .asp-flow-icon svg {
    width: 24px;
    height: 24px;
  }
  .asp .asp-flow h3 {
    font-size: 21px;
  }
  .asp .asp-flow .asp-flow-target h3 {
    font-size: 20px;
  }
  .asp .asp-flow-consequence {
    gap: 16px;
    padding: 18px;
  }
  .asp .asp-flow-divider {
    display: none;
  }
  .asp .asp-flow-consequence p {
    font-size: 17px;
  }
}

/* =====================================================
   CLIENT ENGAGER IMAGE
   ===================================================== */
.asp .asp-workflow-grid {
  grid-template-columns: 0.72fr 1.28fr;
  gap: 64px;
}

.asp .asp-workflow-shot {
  margin: 0;
  min-width: 0;
}

/* No border, radius or overflow clipping: the image has its own
   card, shadow and decorative details, which would be cut off */
.asp .asp-workflow-shot img {
  display: block;
  width: 100%;
  height: auto;
  max-width: none;
}

@media (max-width: 1100px) {
  .asp .asp-workflow-grid {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 40px;
  }
}

@media (max-width: 800px) {
  .asp .asp-workflow-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }
}



/* =====================================================
   COMBINED BEFORE / AFTER SECTION
   ===================================================== */

.asp .asp-connected-story {
  padding: clamp(64px, 7vw, 108px) 0;
  background: #fff;
  color: #111b23;
  scroll-margin-top: 96px;
}

.asp .asp-connected-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);
  align-items: center;
  gap: 56px;
  margin-bottom: 58px;
}

.asp .asp-connected-heading h2 {
  margin: 0;
  color: #111b23;
  font-size: clamp(38px, 4.1vw, 62px);
  line-height: 1.06;
  letter-spacing: -0.055em;
  text-wrap: initial;
}

.asp .asp-connected-heading h2 em {
  color: #063f35;
  font-style: normal;
}

.asp .asp-connected-heading > p {
  margin: 0;
  max-width: 620px;
  padding-left: 32px;
  border-left: 1px solid #e1e6e5;
  color: #011522;
  font-size: 18px;
  line-height: 1.75;
}

.asp .asp-connected-comparison {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 44px;
  align-items: start;
}

.asp .asp-connected-before,
.asp .asp-connected-after {
  min-width: 0;
}

.asp .asp-connected-after {
  padding-left: 40px;
  border-left: 1px solid #e3e8e6;
}

.asp .asp-connected-label {
  margin: 0 0 13px;
  color: #73808a;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.asp .asp-connected-after > .asp-connected-label {
  color: #07513f;
}

.asp .asp-connected-title {
  margin: 0;
  color: #111b23;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(25px, 2.45vw, 36px);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.045em;
}

/* Quiet tool rows, with a broken connector alongside. */

.asp .asp-connected-old {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 126px;
  gap: 20px;
  margin-top: 24px;
}

.asp .asp-connected-tools {
  margin: 0;
  padding: 0;
  list-style: none;
}

.asp .asp-connected-tools > li {
  display: flex;
  align-items: center;
  gap: 17px;
  min-height: 116px;
  padding: 24px 0;
}

.asp .asp-connected-tools > li + li {
  border-top: 1px solid #e5e9e7;
}

.asp .asp-connected-icon {
  display: grid;
  place-items: center;
  flex: 0 0 54px;
  width: 54px;
  height: 58px;
  border-radius: 13px;
  background: #f3f6f4;
  color: #203c35;
}

.asp .asp-connected-icon svg {
  width: 27px;
  height: 27px;
  stroke-width: 1.5;
}

.asp .asp-connected-tools h4 {
  margin: 0 0 6px;
  color: #16221f;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 21px;
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: -0.035em;
}

.asp .asp-connected-tools p {
  margin: 0;
  color: #748079;
  font-size: 13px;
  line-height: 1.65;
}

.asp .asp-connected-gap {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 18px;
  margin-block: 49px;
  border-left: 1px dashed #efb5ad;
}

.asp .asp-connected-gap::before,
.asp .asp-connected-gap::after {
  position: absolute;
  left: -15px;
  width: 15px;
  border-top: 1px dashed #efb5ad;
  content: "";
}

.asp .asp-connected-gap::before {
  top: 0;
}

.asp .asp-connected-gap::after {
  bottom: 0;
}

.asp .asp-connected-gap-dot {
  position: absolute;
  top: 50%;
  left: -5px;
  width: 9px;
  height: 9px;
  border: 1px solid #ec9c91;
  border-radius: 50%;
  background: #fff5f2;
  transform: translateY(-50%);
}

.asp .asp-connected-gap > p {
  position: relative;
  margin: 0;
  padding: 12px 10px;
  border-radius: 8px;
  background: #fff2ef;
  color: #b75b50;
  font-size: 11px;
  line-height: 1.65;
}

.asp .asp-connected-gap > p::before {
  position: absolute;
  top: 50%;
  right: 100%;
  width: 18px;
  border-top: 1px dashed #efb5ad;
  content: "";
}

.asp .asp-connected-consequence {
  margin-top: 26px;
  padding-top: 24px;
  border-top: 1px solid #e3e8e5;
}

.asp .asp-connected-consequence > p:last-child {
  margin: 0;
  max-width: 390px;
  color: #35443e;
  font-size: 16px;
  line-height: 1.7;
}

/* Existing PNG: preserve its transparency and baked-in details. */

.asp .asp-connected-image {
  margin: 18px 0 0;
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
}

.asp .asp-connected-image img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.asp .asp-connected-image figcaption {
  margin-top: 8px;
  color: #7a858c;
  font-size: 11px;
  line-height: 1.6;
}

.asp .asp-connected-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 22px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}

.asp .asp-connected-benefits li {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #5d6a72;
  font-size: 12px;
  line-height: 1.5;
}

.asp .asp-connected-benefits li > span {
  display: grid;
  place-items: center;
  flex: 0 0 26px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e6f1ea;
  color: #1b5b45;
}

.asp .asp-connected-benefits svg {
  width: 14px;
  height: 14px;
  stroke-width: 2;
}

/* One shared quote closes the entire story. */

.asp .asp-connected-quote {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 38px;
  margin: 44px 0 0;
  padding: 28px 0 0;
  border-top: 1px solid #d9e1dd;
}

.asp .asp-connected-quote > p {
  margin: 0;
  color: #083e33;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(23px, 2.2vw, 31px);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: -0.04em;
}

.asp .asp-connected-quote cite {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 28px;
  border-left: 1px solid #dfe5e1;
  font-size: 12px;
  font-style: normal;
  line-height: 1.6;
}

.asp .asp-connected-quote cite strong {
  color: #17241e;
  font-weight: 650;
}

.asp .asp-connected-quote cite span {
  color: #748079;
}

/* Tablet */

@media (max-width: 1100px) {
  .asp .asp-connected-heading {
    gap: 32px;
  }

  .asp .asp-connected-comparison {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 28px;
  }

  .asp .asp-connected-after {
    padding-left: 28px;
  }

  .asp .asp-connected-old {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .asp .asp-connected-gap {
    margin: 4px 0 0 27px;
    padding: 14px 0 0 20px;
  }

  .asp .asp-connected-gap::before,
  .asp .asp-connected-gap::after,
  .asp .asp-connected-gap-dot,
  .asp .asp-connected-gap > p::before {
    display: none;
  }

  .asp .asp-connected-gap > p br {
    display: none;
  }

  .asp .asp-connected-tools > li {
    min-height: 100px;
    padding-block: 20px;
  }
}

/* Mobile */

@media (max-width: 800px) {
  .asp .asp-connected-heading {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 38px;
  }

  .asp .asp-connected-heading > p {
    max-width: 570px;
    padding-left: 0;
    border-left: 0;
    font-size: 15px;
  }

  .asp .asp-connected-comparison {
    grid-template-columns: 1fr;
    gap: 38px;
  }

  .asp .asp-connected-after {
    padding: 32px 0 0;
    border-left: 0;
    border-top: 1px solid #e3e8e6;
  }

  .asp .asp-connected-tools > li {
    min-height: 0;
  }

  .asp .asp-connected-consequence > p:last-child {
    max-width: none;
  }

  .asp .asp-connected-quote {
    grid-template-columns: 1fr;
    gap: 22px;
    margin-top: 34px;
  }

  .asp .asp-connected-quote cite {
    padding-left: 0;
    border-left: 0;
  }
}

@media (max-width: 480px) {
  .asp .asp-connected-heading h2 {
    font-size: 38px;
  }

  .asp .asp-connected-title {
    font-size: 28px;
  }

  .asp .asp-connected-benefits {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

/* =====================================================
   EVERYDAY DIFFERENCE — PORTRAIT / EDITORIAL LAYOUT
   ===================================================== */

.asp .asp-people {
  padding: clamp(56px, 6vw, 96px) 0;
  background: #f3f8f4;
  border-block: 1px solid #e5ede7;
}

.asp .asp-people-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr);
  align-items: stretch;
  gap: clamp(36px, 4.5vw, 72px);
}

/* Photograph */

.asp .asp-people-portrait {
  position: relative;
  isolation: isolate;
  min-width: 0;
  min-height: 660px;
  margin: 0;
  overflow: hidden;
  border-radius: 16px;
  background: #073e33;
}

.asp .asp-people-portrait > img {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: 50% 30%;
}

/*
 * A smooth forest-green fade.
 * The upper photograph remains clear.
 * The lower area becomes dark enough for white quote text.
 */

.asp .asp-people-portrait::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(4, 48, 38, 0) 32%,
    rgba(4, 48, 38, 0.04) 43%,
    rgba(4, 48, 38, 0.28) 56%,
    rgba(4, 48, 38, 0.76) 72%,
    rgba(4, 48, 38, 0.96) 88%,
    #043026 100%
  );
}

/* Quote sits above the gradient. */

.asp .asp-people-caption {
  position: absolute;
  right: clamp(24px, 3vw, 44px);
  bottom: clamp(28px, 3vw, 44px);
  left: clamp(24px, 3vw, 44px);
  z-index: 2;
  color: #fff;
}

.asp .asp-people-caption blockquote {
  margin: 0;
  max-width: 490px;
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 3.1vw, 46px);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.asp .asp-people-attribution {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 25px;
  line-height: 1.5;
}

.asp .asp-people-attribution strong {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.asp .asp-people-attribution span {
  color: #deebe4;
  font-size: 12px;
}

/* Editorial heading and supporting copy */

.asp .asp-people-copy {
  align-self: center;
  min-width: 0;
  padding-block: 24px;
}

.asp .asp-people-copy > .asp-eyebrow {
  margin-bottom: 28px !important;
  color: #35544a !important;
  letter-spacing: 0.19em;
}

.asp .asp-people-copy h2 {
  margin: 0;
  color: #111d19;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(40px, 3.8vw, 58px);
  font-weight: 400;
  line-height: 1.07;
  letter-spacing: -0.055em;
  text-wrap: initial;
}

.asp .asp-people-copy h2 em {
  color: #073f34;
  font-style: normal;
}

.asp .asp-people-intro {
  margin: 28px 0 0;
  max-width: 570px;
  color: #6c7b77;
  font-size: 16px;
  line-height: 1.8;
}

/* Three restrained benefit rows */

.asp .asp-people-benefits {
  margin: 34px 0 0;
  padding: 0;
  list-style: none;
}

.asp .asp-people-benefits > li {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  align-items: start;
  gap: 22px;
  padding: 26px 0;
  border-top: 1px solid #d5e0d9;
}

.asp .asp-people-benefits > li:last-child {
  padding-bottom: 0;
}

.asp .asp-people-number {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #ece7fa;
  color: #233a32;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.asp .asp-people-benefits h3 {
  margin: 0 0 7px;
  color: #142b23;
  font-family: inherit;
  font-size: 18px;
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: -0.025em;
}

.asp .asp-people-benefits p {
  margin: 0;
  color: #6c7b77;
  font-size: 14px;
  line-height: 1.75;
}

/* Tablet */

@media (max-width: 1100px) {
  .asp .asp-people-grid {
    gap: 36px;
  }

  .asp .asp-people-copy h2 {
    font-size: 44px;
  }

  .asp .asp-people-benefits > li {
    gap: 16px;
    padding-block: 22px;
  }

  .asp .asp-people-caption blockquote {
    font-size: 35px;
  }
}

/* Mobile */

@media (max-width: 800px) {
  .asp .asp-people-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .asp .asp-people-portrait {
    width: 100%;
    min-height: 0;
    aspect-ratio: 4 / 5;
    max-width: 600px;
    justify-self: center;
  }

  .asp .asp-people-copy {
    padding-block: 0;
  }

  .asp .asp-people-copy h2 {
    font-size: clamp(38px, 6.5vw, 52px);
  }

  .asp .asp-people-caption blockquote {
    font-size: clamp(30px, 5.5vw, 42px);
  }
}

@media (max-width: 480px) {
  .asp .asp-people-portrait {
    border-radius: 12px;
  }

  .asp .asp-people-caption {
    right: 24px;
    bottom: 26px;
    left: 24px;
  }

  .asp .asp-people-caption blockquote {
    font-size: 30px;
  }

  .asp .asp-people-attribution {
    margin-top: 18px;
  }

  .asp .asp-people-copy > .asp-eyebrow {
    margin-bottom: 20px !important;
  }

  .asp .asp-people-intro {
    margin-top: 22px;
    font-size: 15px;
  }

  .asp .asp-people-benefits {
    margin-top: 28px;
  }

  .asp .asp-people-benefits > li {
    grid-template-columns: 38px minmax(0, 1fr);
    gap: 15px;
    padding-block: 22px;
  }

  .asp .asp-people-number {
    width: 38px;
    height: 38px;
    border-radius: 9px;
    font-size: 18px;
  }

  .asp .asp-people-benefits h3 {
    font-size: 17px;
  }
}


/* =====================================================
   GROWTH MOMENT — DARK GREEN / GLASS ARTWORK
   ===================================================== */

.asp .asp-expansion {
  position: relative;
  isolation: isolate;
  padding: clamp(64px, 7vw, 108px) 0;
  background:
    radial-gradient(
      ellipse at 24% 68%,
      rgba(17, 105, 76, 0.2),
      transparent 58%
    ),
    #041b1c;
  color: #f7faf6;
  border-block: 1px solid rgba(184, 226, 199, 0.08);
}

/* Heading */

.asp .asp-expansion-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.9fr);
  align-items: center;
  gap: clamp(36px, 5vw, 80px);
  margin-bottom: 50px;
}

.asp .asp-expansion-eyebrow {
  margin: 0 0 24px;
  color: #b9dfc9;
  font-size: 10px;
  font-weight: 650;
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.asp .asp-expansion-heading h2 {
  margin: 0;
  color: #f8faf5;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 4vw, 62px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.05em;
  text-wrap: initial;
}

.asp .asp-expansion-heading h2 em {
  color: #cde9bd;
  font-style: normal;
}

.asp .asp-expansion-intro {
  margin: 24px 0 0;
  max-width: 560px;
  color: #ffffff;
  font-size: 16px;
  line-height: 1.85;
}

/* Artwork / timeline layout */

.asp .asp-expansion-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(36px, 5vw, 76px);
}

.asp .asp-expansion-art {
  position: relative;
  isolation: isolate;
  min-width: 0;
  margin: 0;
  padding: 28px 0 0;
}

/* Very quiet technical grid behind the transparent PNG. */

.asp .asp-expansion-art::before {
  content: "";
  position: absolute;
  inset: 0 0 45px;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(
      rgba(146, 221, 184, 0.07) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(146, 221, 184, 0.07) 1px,
      transparent 1px
    );
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    #000 15%,
    transparent 72%
  );
  mask-image: radial-gradient(
    ellipse at center,
    #000 15%,
    transparent 72%
  );
}

/* Fine circular outline, kept behind the artwork. */

.asp .asp-expansion-art::after {
  content: "";
  position: absolute;
  top: 0;
  left: 12%;
  z-index: -1;
  width: 76%;
  aspect-ratio: 1;
  border: 1px solid rgba(155, 225, 191, 0.13);
  border-radius: 50%;
  pointer-events: none;
}

.asp .asp-expansion-art img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.asp .asp-expansion-art figcaption {
  margin: 22px 12px 0;
  color: #c4d9cc;
  font-size: 11px;
  font-weight: 450;
  line-height: 1.8;
  letter-spacing: 0.16em;
  text-align: center;
}

/* Timeline */

.asp .asp-expansion-track {
  --number-width: 52px;
  --node-width: 24px;
  --track-gap: 16px;
  --axis: calc(
    var(--number-width) +
    var(--track-gap) +
    var(--node-width) / 2
  );
  position: relative;
  min-width: 0;
}

.asp .asp-expansion-track::before {
  content: "";
  position: absolute;
  top: 15px;
  bottom: 18px;
  left: var(--axis);
  width: 1px;
  background: linear-gradient(
    180deg,
    rgba(168, 222, 191, 0.65),
    rgba(168, 222, 191, 0.35)
  );
}

.asp .asp-expansion-events {
  margin: 0;
  padding: 0;
  list-style: none;
}

.asp .asp-expansion-events > li {
  position: relative;
  display: grid;
  grid-template-columns:
    var(--number-width)
    var(--node-width)
    minmax(0, 1fr);
  align-items: start;
  column-gap: var(--track-gap);
  margin: 0;
  padding: 0 0 42px;
}

.asp .asp-expansion-number {
  color: #b7e3c7;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 38px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.04em;
}

.asp .asp-expansion-node {
  position: relative;
  z-index: 1;
  justify-self: center;
  width: 16px;
  height: 16px;
  margin-top: 7px;
  border: 2px solid #ace2c2;
  border-radius: 50%;
  background: #041b1c;
}

.asp .asp-expansion-events > li:nth-child(2)
  .asp-expansion-node {
  border-color: #d5bff2;
}

.asp .asp-expansion-event {
  min-width: 0;
}

.asp .asp-expansion-date {
  display: block;
  margin-bottom: 10px;
color: rgba(255, 255, 255, 0.7);
  font-size: 9px;
  font-weight: 650;
  line-height: 1.6;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.asp .asp-expansion-event h3 {
  margin: 0;
  color: #ffffff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(25px, 2.2vw, 32px);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.035em;
}

.asp .asp-expansion-event p {
  margin: 10px 0 0;
  max-width: 560px;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.8;
}

.asp .asp-expansion-finish {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-left: calc(var(--axis) - 18px);
  border: 1px solid #bceccb;
  border-radius: 50%;
  background: #b5e9c7;
  color: #073e2d;
}

.asp .asp-expansion-finish svg {
  width: 19px;
  height: 19px;
  stroke-width: 2.4;
}

/* Tablet */

@media (max-width: 1100px) {
  .asp .asp-expansion-heading {
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: 32px;
  }

  .asp .asp-expansion-layout {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 30px;
  }

  .asp .asp-expansion-track {
    --number-width: 38px;
    --track-gap: 10px;
  }

  .asp .asp-expansion-number {
    font-size: 31px;
  }

  .asp .asp-expansion-event h3 {
    font-size: 26px;
  }
}

/* Mobile */

@media (max-width: 800px) {
  .asp .asp-expansion-heading {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 30px;
  }

  .asp .asp-expansion-intro {
    max-width: 580px;
    margin: 0;
  }

  .asp .asp-expansion-layout {
    grid-template-columns: 1fr;
    gap: 44px;
  }

  .asp .asp-expansion-art {
    width: 100%;
    max-width: 680px;
    justify-self: center;
    padding-top: 18px;
  }

  .asp .asp-expansion-track {
    --number-width: 44px;
    --track-gap: 14px;
  }

  .asp .asp-expansion-events > li {
    padding-bottom: 34px;
  }
}

@media (max-width: 480px) {
  .asp .asp-expansion-heading h2 {
    font-size: 38px;
  }

  .asp .asp-expansion-intro {
    font-size: 14px;
  }

  .asp .asp-expansion-art figcaption {
    margin-top: 16px;
    font-size: 10px;
    letter-spacing: 0.08em;
  }

  .asp .asp-expansion-track {
    --number-width: 34px;
    --node-width: 20px;
    --track-gap: 10px;
  }

  .asp .asp-expansion-number {
    font-size: 28px;
  }

  .asp .asp-expansion-event h3 {
    font-size: 25px;
  }

  .asp .asp-expansion-event p {
    font-size: 13px;
  }
}


/* =====================================================
   THE PRACTICE — WHITE EDITORIAL LAYOUT
   ===================================================== */

.asp .asp-practice-editorial {
  position: relative;
  padding-block: clamp(56px, 6vw, 88px);
  background: #fff;
  color: #073d31;
  scroll-margin-top: 96px;

  /* Extend white to the page edges without widening content. */
  box-shadow: 0 0 0 100vmax #fff;
  clip-path: inset(0 -100vmax);
}

/* Heading and introduction share the same column alignment
   as the photograph and facts below. */

.asp .asp-practice-editorial-heading,
.asp .asp-practice-editorial-main {
  display: grid;
  grid-template-columns: minmax(0, 2.8fr) minmax(0, 1fr);
  gap: clamp(32px, 4vw, 56px);
}

.asp .asp-practice-editorial-heading {
  align-items: center;
  margin-bottom: 42px;
}

.asp .asp-practice-editorial-heading > div,
.asp .asp-practice-editorial-photo,
.asp .asp-practice-editorial-details {
  min-width: 0;
}

.asp .asp-practice-editorial-eyebrow {
  margin: 0 0 18px;
  color: #737d87;
  font-size: 10px;
  font-weight: 650;
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.asp .asp-practice-editorial-heading h2 {
  margin: 0;
  color: #073d31;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 4.1vw, 62px);
  font-weight: 400;
  line-height: 1.06;
  letter-spacing: -0.055em;
  text-wrap: initial;
}

.asp .asp-practice-editorial-heading h2 em {
  color: #527365;
  font-style: normal;
}

.asp .asp-practice-editorial-intro {
  margin: 22px 0 0;
  max-width: 720px;
  color: #011522;
  font-size: 16px;
  line-height: 1.75;
}

/* Large photograph */

.asp .asp-practice-editorial-main {
  align-items: start;
}

.asp .asp-practice-editorial-photo {
  margin: 0;
}

.asp .asp-practice-editorial-frame {
  position: relative;
  isolation: isolate;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  background: #dce4dc;
}

.asp .asp-practice-editorial-frame > img {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;

  /* Keep the face and branding near the top of the JPEG. */
  object-position: 50% 0%;
}

/* Green fade concentrated behind the lower-left caption. */

.asp .asp-practice-editorial-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      rgba(3, 49, 37, 0.38),
      transparent 65%
    ),
    linear-gradient(
      180deg,
      transparent 48%,
      rgba(3, 49, 37, 0.08) 62%,
      rgba(3, 49, 37, 0.6) 83%,
      rgba(3, 49, 37, 0.88) 100%
    );
}

.asp .asp-practice-editorial-overlay {
  position: absolute;
  bottom: clamp(22px, 2.5vw, 34px);
  left: clamp(22px, 2.5vw, 34px);
  z-index: 2;
  margin: 0;
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(25px, 2.5vw, 36px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.045em;
}

.asp .asp-practice-editorial-photo figcaption {
  margin-top: 9px;
  color: #737c85;
  font-size: 11px;
  line-height: 1.6;
}

/* Slim facts column */

.asp .asp-practice-editorial-details::before {
  content: "";
  display: block;
  width: 68px;
  height: 5px;
  margin-bottom: 18px;
  background: #167273;
}

.asp .asp-practice-editorial-label {
  margin: 0;
  color: #737d87;
  font-size: 9px;
  font-weight: 650;
  line-height: 1.7;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.asp .asp-practice-editorial-team {
  margin-top: 18px;
}

.asp .asp-practice-editorial-count {
  display: block;
  color: #073d31;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(78px, 8.5vw, 124px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.085em;
}

.asp .asp-practice-editorial-team > p {
  margin: 12px 0 0;
  color: #073d31;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(24px, 2.45vw, 35px);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.045em;
}

.asp .asp-practice-editorial-facts {
  margin: 25px 0 0;
  padding: 0;
}

.asp .asp-practice-editorial-facts > div {
  padding: 15px 0;
  border-top: 1px solid #dce1e3;
}

.asp .asp-practice-editorial-facts dt {
  margin: 0 0 7px;
  color: #747d86;
  font-size: 9px;
  font-weight: 650;
  line-height: 1.5;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.asp .asp-practice-editorial-facts dd {
  margin: 0;
  color: #103f32;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(19px, 1.8vw, 26px);
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: -0.035em;
}

/* Bottom paragraph and link */

.asp .asp-practice-editorial-bottom {
  display: grid;
  grid-template-columns: minmax(0, 2.8fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(32px, 4vw, 56px);
  margin-top: 30px;
  padding-top: 22px;
  border-top: 1px solid #dce1e3;
}

.asp .asp-practice-editorial-bottom > p {
  margin: 0;
  max-width: 760px;
  color: #011522;
  font-size: 15px;
  line-height: 1.75;
}

.asp .asp-practice-editorial-link {
  display: inline-flex;
  align-items: center;
  justify-self: end;
  gap: 16px;
  padding-block: 8px;
  color: #073d31;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 23px;
  line-height: 1.3;
  letter-spacing: -0.035em;
  text-decoration: none;
}

.asp .asp-practice-editorial-link > span {
  font-family: Arial, sans-serif;
  font-size: 24px;
}

.asp .asp-practice-editorial-link:hover {
  text-decoration: underline;
  text-underline-offset: 5px;
}

.asp .asp-practice-editorial-link:focus-visible {
  outline: 2px solid #8564bc;
  outline-offset: 5px;
}

.asp .asp-practice-editorial-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Tablet */

@media (max-width: 1100px) {
  .asp .asp-practice-editorial-heading,
  .asp .asp-practice-editorial-main,
  .asp .asp-practice-editorial-bottom {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 30px;
  }

  .asp .asp-practice-editorial-heading h2 {
    font-size: 44px;
  }

  .asp .asp-practice-editorial-frame {
    aspect-ratio: 4 / 3;
  }

  .asp .asp-practice-editorial-intro {
    font-size: 14px;
  }

  .asp .asp-practice-editorial-link {
    font-size: 21px;
  }
}

/* Mobile */

@media (max-width: 800px) {
  .asp .asp-practice-editorial-heading,
  .asp .asp-practice-editorial-main,
  .asp .asp-practice-editorial-bottom {
    grid-template-columns: 1fr;
  }

  .asp .asp-practice-editorial-heading {
    gap: 22px;
    margin-bottom: 28px;
  }

  .asp .asp-practice-editorial-heading h2 {
    font-size: clamp(38px, 6vw, 50px);
  }

  .asp .asp-practice-editorial-intro {
    max-width: 580px;
    margin: 0;
    font-size: 15px;
  }

  .asp .asp-practice-editorial-main {
    gap: 32px;
  }

  .asp .asp-practice-editorial-frame {
    aspect-ratio: 4 / 3;
  }

  .asp .asp-practice-editorial-count {
    font-size: 96px;
  }

  .asp .asp-practice-editorial-team > p {
    font-size: 30px;
  }

  .asp .asp-practice-editorial-facts dd {
    font-size: 24px;
  }

  .asp .asp-practice-editorial-bottom {
    gap: 18px;
    margin-top: 26px;
  }

  .asp .asp-practice-editorial-link {
    justify-self: start;
  }
}

@media (max-width: 480px) {
  .asp .asp-practice-editorial-frame {
    aspect-ratio: 1;
  }

  .asp .asp-practice-editorial-overlay {
    left: 20px;
    bottom: 22px;
    font-size: 27px;
  }
}



/* =====================================================
   METRICS STRIP: BOLDER, CLEARER
   ===================================================== */

.asp .asp-metrics {
  padding: 56px 0 52px;
  border-bottom: 1px solid #d7dfd9;
}

.asp .asp-metric {
  position: relative;
  padding-inline: 36px;
  border-left: 1px solid #d7dfd9;
}

.asp .asp-metric:first-child {
  padding-left: 0;
  border-left: 0;
}

/* Small teal accent above each label */
.asp .asp-metric::before {
  content: "";
  display: block;
  width: 28px;
  height: 3px;
  margin-bottom: 18px;
  background: #167273;
}

.asp .asp-metric-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  line-height: 1.4;
  color: #2f4a3f;
}

.asp .asp-metric > strong {
  margin: 14px 0 12px;
  font-size: 68px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.045em;
  color: #0c3d2f;
}

.asp .asp-metric > strong > span {
  font-size: 0.55em;
  font-weight: 700;
}

.asp .asp-metric > strong.asp-metric-range {
  font-size: 46px;
  line-height: 1.2;
  padding-block: 8px;
  white-space: nowrap;
}

.asp .asp-metric-range span {
  color: #167273;
}

.asp .asp-metric p {
  max-width: 250px;
  min-height: 48px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.55;
  color: #3d5248;
}

.asp .asp-metric-note {
  margin-top: 16px;
  gap: 7px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
  color: #1f6a4a;
}

.asp .asp-metric-note svg {
  width: 14px;
  height: 14px;
  stroke-width: 2.2;
}

.asp .asp-mini-track {
  max-width: 210px;
  height: 6px;
  margin-top: 20px;
  border-radius: 3px;
  background: #dfe8e0;
}

.asp .asp-mini-track i {
  border-radius: 3px;
  background: #167273;
}

/* Tablet */
@media (max-width: 1100px) {
  .asp .asp-metric {
    padding-inline: 22px;
  }
  .asp .asp-metric > strong {
    font-size: 56px;
  }
  .asp .asp-metric > strong.asp-metric-range {
    font-size: 36px;
  }
}

/* Mobile */
@media (max-width: 800px) {
  .asp .asp-metric-label {
    font-size: 11px;
  }
  .asp .asp-metric > strong {
    font-size: 52px;
  }
  .asp .asp-metric > strong.asp-metric-range {
    font-size: 36px;
  }
  .asp .asp-metric p {
    font-size: 13px;
  }
  .asp .asp-metric-note {
    font-size: 10.5px;
  }
}

@media (max-width: 560px) {
  .asp .asp-metric-label {
    font-size: 10px;
    letter-spacing: 0.1em;
  }
  .asp .asp-metric > strong {
    font-size: 44px;
  }
  .asp .asp-metric > strong.asp-metric-range {
    font-size: 28px;
  }
  .asp .asp-metric p {
    font-size: 12px;
    min-height: 0;
  }
}


/* =====================================================
   CONNECTED STORY: CLEAN IMAGE, COLOURED HEADING
   ===================================================== */

/* Colour on "across three systems." */
.asp .asp-connected-heading h2 em {
  color: #527365;
  font-style: normal;
}

/* Give the product shot more of the row */
.asp .asp-connected-comparison {
  grid-template-columns: minmax(0, 0.6fr) minmax(0, 1.4fr);
  gap: 48px;
}

/* Remove the green panel: just a thin divider and clean space */
.asp .asp-connected-after {
  padding: 0 0 0 48px;
  border: 0;
  border-left: 1px solid #e3e8e6;
  border-radius: 0;
  background: none;
}

/* Bigger image, no extra glow or doubled shadow */
.asp .asp-connected-image {
  margin: 32px 0 0;
}

.asp .asp-connected-image img {
  filter: none;
  transform: scale(1.08);
  transform-origin: center top;
}

/* Chips: light tint so they still read on white */
.asp .asp-connected-benefits {
  margin-top: 56px;
}

.asp .asp-connected-benefits li {
  background: #f3f8f5;
  border-color: #d3e3da;
}

/* Tablet */
@media (max-width: 1100px) {
  .asp .asp-connected-comparison {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .asp .asp-connected-after {
    padding: 32px 0 0;
    border-left: 0;
    border-top: 1px solid #e3e8e6;
  }
  .asp .asp-connected-image img {
    transform: none;
  }
  .asp .asp-connected-benefits {
    margin-top: 32px;
  }
}

/* Mobile */
@media (max-width: 800px) {
  .asp .asp-connected-after {
    padding: 28px 0 0;
    border: 0;
    border-top: 1px solid #e3e8e6;
    border-radius: 0;
    background: none;
  }
}


/* =====================================================
   CONNECTED STORY: FULL-WIDTH, ROOMY, LEAN IMAGE
   ===================================================== */

/* More room for the left column, image still dominant */
.asp .asp-connected-comparison {
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: 64px;
  align-items: start;
}

/* Left column: wider tool rows, more air */
.asp .asp-connected-old {
  grid-template-columns: minmax(0, 1fr) 150px;
  gap: 28px;
  margin-top: 36px;
}

.asp .asp-connected-tools > li {
  gap: 22px;
  min-height: 132px;
  padding: 28px 0;
}

.asp .asp-connected-tools h4 {
  font-size: 24px;
  white-space: nowrap;
}

.asp .asp-connected-tools p {
  font-size: 15px;
  line-height: 1.6;
}

.asp .asp-connected-gap > p {
  padding: 14px 16px;
  font-size: 13px;
  white-space: nowrap;
}

.asp .asp-connected-consequence {
  margin-top: 40px;
  padding-top: 32px;
}

.asp .asp-connected-consequence > p:last-child {
  max-width: 460px;
  font-size: 24px;
}

/* Right column: no extra padding eating into the width */
.asp .asp-connected-after {
  padding: 0 0 0 56px;
}

/* Crop the PNG's transparent margin so the card fills the column.
   overflow:hidden also trims the baked-in shadow fringe. */
.asp .asp-connected-image {
  margin: 36px 0 0;
  overflow: hidden;
}

.asp .asp-connected-image img {
  width: 138%;
  max-width: none;
  margin: -4% 0 -5% -19%;
  filter: none;
  transform: none;
  box-shadow: none;
}

.asp .asp-connected-benefits {
  margin-top: 40px;
}

/* Tablet */
@media (max-width: 1100px) {
  .asp .asp-connected-comparison {
    grid-template-columns: 1fr;
    gap: 44px;
  }
  .asp .asp-connected-after {
    padding: 36px 0 0;
  }
  .asp .asp-connected-old {
    grid-template-columns: 1fr;
  }
}

/* Mobile */
@media (max-width: 800px) {
  .asp .asp-connected-tools h4 {
    font-size: 21px;
    white-space: normal;
  }
  .asp .asp-connected-image img {
    width: 125%;
    margin: -3% 0 -4% -12.5%;
  }
}


/* =====================================================
   MIGRATION: FINER, CLEANER, TEAL #167273
   ===================================================== */

.asp .asp-migration {
  padding: clamp(80px, 9vw, 128px) 0;
  background:
    radial-gradient(
      ellipse at 88% 18%,
      rgba(22, 114, 115, 0.32),
      transparent 58%
    ),
    #041b1c;
}

/* Remove the busy vertical grid lines */
.asp .asp-migration::before {
  display: none;
}

/* Quieter teal rings */
.asp .asp-migration::after {
  top: -200px;
  right: -200px;
  width: 640px;
  height: 640px;
  border: 1px solid rgba(22, 114, 115, 0.45);
  box-shadow:
    0 0 0 60px rgba(22, 114, 115, 0.07),
    0 0 0 120px rgba(22, 114, 115, 0.04);
}

.asp .asp-migration-heading {
  gap: 90px;
  align-items: center;
}

/* Eyebrow */
.asp .asp-migration .asp-eyebrow {
  color: #6fd0cd !important;
  font-size: 11px !important;
  letter-spacing: 0.2em;
}

/* Heading */
.asp .asp-migration h2 {
  color: #fff;
  font-size: clamp(34px, 3.4vw, 58px);
  line-height: 1.08;
}

.asp .asp-migration h2 em {
  color: #5cc2c0;
}

.asp .asp-migration-heading p:not(.asp-eyebrow) {
  max-width: 520px;
  margin-top: 28px;
  color: #eee5e5;
  font-size: 17px;
  line-height: 1.8;
}

/* Tag */
.asp .asp-migration-tag {
  gap: 10px;
  padding: 10px 18px;
  border: 1px solid #167273;
  background: rgba(22, 114, 115, 0.2);
  color: #c4eeed;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
}

.asp .asp-migration-tag i {
  background: #5cc2c0;
  box-shadow: 0 0 0 4px rgba(92, 194, 192, 0.2);
}

/* Big number */
.asp .asp-migration-stat {
  gap: 30px;
}

.asp .asp-migration-stat > strong {
  color: #fff;
  font-size: clamp(120px, 13vw, 190px);
  letter-spacing: -0.08em;
  line-height: 0.8;
}

.asp .asp-migration-stat > span {
  padding-left: 26px;
  border-left: 2px solid #167273;
  color: #9fd2d0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  line-height: 2;
}

/* Timeline */
.asp .asp-migration-timeline {
  margin-top: 88px !important;
}

.asp .asp-migration-timeline > li {
  padding: 46px 40px 0 0;
  border-top: 2px solid #167273;
}

.asp .asp-migration-timeline > li:last-child {
  border-top-color: #3fb5b4;
}

.asp .asp-migration-node {
  top: -19px;
  width: 36px;
  height: 36px;
  border: 2px solid #167273;
  background: #082a2b;
  color: #c4eeed;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.asp .asp-migration-node svg {
  width: 16px;
  height: 16px;
  stroke-width: 2.4;
}

.asp .asp-migration-complete {
  border-color: #3fb5b4;
  background: #167273;
  color: #fff;
  box-shadow: 0 0 0 6px rgba(22, 114, 115, 0.25);
}

.asp .asp-migration-timeline small {
  color: #7fc9c7;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
}

.asp .asp-migration-timeline h3 {
  margin-top: 14px;
  color: #fff;
  font-size: 28px;
  letter-spacing: -0.03em;
}

.asp .asp-migration-timeline p {
   max-width: 350px;
  margin-top: 10px;
  color: #a9c9c7;
  font-size: 14px;
  line-height: 1.7;
}

/* Tablet */
@media (max-width: 1100px) {
  .asp .asp-migration-heading {
    gap: 50px;
  }
  .asp .asp-migration-stat > strong {
    font-size: 130px;
  }
}

/* Mobile */
@media (max-width: 800px) {
  .asp .asp-migration-heading {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 560px) {
  .asp .asp-migration-stat > strong {
    font-size: 110px;
  }
  .asp .asp-migration-timeline {
    margin-top: 48px !important;
    padding-left: 18px !important;
  }
  .asp .asp-migration-timeline > li,
  .asp .asp-migration-timeline > li:last-child {
    padding: 0 0 36px 36px;
    border-top: 0;
    border-left: 2px solid #167273;
  }
  .asp .asp-migration-timeline > li:last-child {
    padding-bottom: 0;
    border-left-color: transparent;
  }
  .asp .asp-migration-node {
    top: 0;
    left: -19px;
  }
  .asp .asp-migration-timeline h3 {
    font-size: 24px;
  }
  .asp .asp-migration-timeline p {
    max-width: none;
  }
}

/* =====================================================
   GROWTH MOMENT: TEAL #167273 TO MATCH MIGRATION
   ===================================================== */

.asp .asp-expansion {
  padding: clamp(80px, 9vw, 128px) 0;
  background:
    radial-gradient(
      ellipse at 12% 75%,
      rgba(22, 114, 115, 0.3),
      transparent 58%
    ),
    radial-gradient(
      ellipse at 92% 8%,
      rgba(22, 114, 115, 0.18),
      transparent 55%
    ),
    #041b1c;
  border-block: 0;
}

/* Eyebrow */
.asp .asp-expansion-eyebrow {
  color: #6fd0cd;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

/* Heading */
.asp .asp-expansion-heading {
  margin-bottom: 64px;
}

.asp .asp-expansion-heading h2 {
  color: #fff;
  font-size: clamp(42px, 4.6vw, 70px);
  line-height: 1.05;
}

.asp .asp-expansion-heading h2 em {
  color: #5cc2c0;
}

.asp .asp-expansion-intro {
  max-width: 480px;
  padding-left: 28px;
  border-left: 2px solid #167273;
  color: #b9d6d4;
  font-size: 16px;
  line-height: 1.8;
}

/* Artwork: teal grid and ring */
.asp .asp-expansion-art::before {
  background-image:
    linear-gradient(rgba(22, 114, 115, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22, 114, 115, 0.16) 1px, transparent 1px);
}

.asp .asp-expansion-art::after {
  border: 1px solid rgba(22, 114, 115, 0.55);
  box-shadow:
    0 0 0 40px rgba(22, 114, 115, 0.06),
    0 0 0 80px rgba(22, 114, 115, 0.035);
}

.asp .asp-expansion-art figcaption {
  color: #9fd2d0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
}

/* Timeline line (the vertical rule) */
.asp .asp-expansion-track::before {
  width: 2px;
  background: linear-gradient(
    180deg,
    #167273 0%,
    #2fa5a4 60%,
    #3fb5b4 100%
  );
}

/* Step numbers */
.asp .asp-expansion-number {
  color: #5cc2c0;
  font-size: 42px;
}

/* Nodes: all teal (no more purple) */
.asp .asp-expansion-node {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  border: 2px solid #167273;
  background: #082a2b;
  box-shadow: 0 0 0 5px rgba(22, 114, 115, 0.22);
}

.asp .asp-expansion-events > li:nth-child(2) .asp-expansion-node {
  border-color: #167273;
}

/* Text */
.asp .asp-expansion-date {
  color: #7fc9c7;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
}

.asp .asp-expansion-event h3 {
  color: #fff;
   max-width: 650px;
  font-size: clamp(26px, 2.4vw, 30px);
}

.asp .asp-expansion-event p {
  max-width: 450px;
  color: #a9c9c7;
  font-size: 15px;
  line-height: 1.75;
}

/* Final check at the end of the line */
.asp .asp-expansion-finish {
  width: 40px;
  height: 40px;
  margin-left: calc(var(--axis) - 20px);
  border: 2px solid #3fb5b4;
  background: #167273;
  color: #fff;
  box-shadow: 0 0 0 6px rgba(22, 114, 115, 0.25);
}

.asp .asp-expansion-finish svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.4;
}

/* Mobile */
@media (max-width: 800px) {
  .asp .asp-expansion-intro {
    padding-left: 20px;
    font-size: 15px;
  }
  .asp .asp-expansion-heading {
    margin-bottom: 36px;
  }
}



/* =====================================================
   WHAT CHANGED: FINER, CLEANER, PALE GREEN CARD
   ===================================================== */

.asp .asp-results {
  padding-block: clamp(72px, 8vw, 120px);
}

/* Heading */
.asp .asp-results-heading {
  grid-template-columns: 1.3fr 0.8fr;
  gap: 80px;
  align-items: end;
  margin-bottom: 8px;
}

.asp .asp-results-heading h2 {
  color: #0a2e26;
  font-size: clamp(42px, 4.6vw, 70px);
  line-height: 1.05;
}

.asp .asp-results-heading h2 em {
  color: #167273;
}

.asp .asp-results-heading > p {
  max-width: 470px;
  padding-left: 28px;
  border-left: 3px solid #167273;
  color: #3d4f48;
  font-size: 17px;
  font-weight: 450;
  line-height: 1.75;
}

/* Layout */
.asp .asp-results-grid {
  grid-template-columns: 1.5fr 1fr;
  gap: 56px;
  margin-top: 64px;
}

/* Chart header */
.asp .asp-chart-heading .asp-eyebrow {
  margin-bottom: 12px !important;
  color: #167273 !important;
  font-size: 11px !important;
  letter-spacing: 0.18em;
}

.asp .asp-chart-heading h3 {
  color: #0a2e26;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(26px, 2.4vw, 34px);
  font-weight: 400;
  letter-spacing: -0.04em;
}

.asp .asp-chart-delta {
  color: #167273;
  font-size: 60px;
}

.asp .asp-chart-delta small {
  margin-top: 10px;
  color: #4f6a63;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Chart */
.asp .asp-line-chart {
  height: 340px;
  margin-top: 48px;
  padding-left: 48px;
}

.asp .asp-line-grid {
  inset: 0 0 0 48px;
  color: #6c7f78;
  font-size: 12px;
  font-weight: 500;
}

.asp .asp-line-grid span::after {
  border-top: 1px dashed #dde7e2;
}

.asp .asp-line-chart svg {
  inset: 0 0 0 48px;
  width: calc(100% - 48px);
}

.asp .asp-line-path {
  stroke: #167273;
  stroke-width: 4;
}

.asp .asp-line-point {
  fill: #167273;
  stroke: #fff;
}

.asp .asp-line-guide {
  stroke: #8dbcbc;
}

/* Area fill: teal instead of green */
.asp #aspLineArea stop {
  stop-color: #167273;
}

.asp .asp-line-value {
  color: #0a2e26;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: -0.04em;
}

.asp .asp-line-month {
  bottom: -36px;
  color: #4f6a63;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
}

.asp .asp-collections figcaption {
  margin-top: 64px;
  color: #6c7f78;
  font-size: 14px;
}

/* Reliability card: same pale green as the people section */
.asp .asp-reliability {
  display: flex;
  flex-direction: column;
  padding: 44px;
  border: 0;
  border-radius: 10px;
  background: #f3f8f4;
}

.asp .asp-reliability-heading .asp-eyebrow {
  color: #167273 !important;
  font-size: 11px !important;
  letter-spacing: 0.18em;
}

.asp .asp-status-circle {
  width: 36px;
  height: 36px;
  border: 0;
  background: #167273;
  color: #fff;
}

.asp .asp-status-circle svg {
  width: 16px;
  height: 16px;
  stroke-width: 2.4;
}

.asp .asp-reliability > strong {
  margin-top: 44px;
  color: #0a2e26;
  font-size: clamp(110px, 10vw, 150px);
  line-height: 0.85;
}

.asp .asp-reliability > strong > span {
  color: #167273;
}

.asp .asp-reliability h3 {
  margin-top: 22px;
  color: #0a2e26;
  font-size: 34px;
}

.asp .asp-reliability-track {
  height: 8px;
  margin-top: auto;
  border-radius: 4px;
  background: #d9e7df;
}

.asp .asp-reliability-track i {
  border-radius: 4px;
  background: #167273;
}

.asp .asp-reliability h3 + .asp-reliability-track {
  margin-top: 40px;
}

.asp .asp-reliability-foot {
  align-items: flex-end;
  padding-top: 24px;
  margin-top: 28px;
  border-top: 1px solid #d5e3da;
}

.asp .asp-reliability-foot > strong {
  color: #167273;
  font-size: 40px;
}

.asp .asp-reliability-foot > p {
  color: #3d5a52;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.55;
  text-align: right;
}

/* Source note: left aligned, readable */
.asp .asp-source-note {
  max-width: none;
  margin-top: 64px !important;
  padding-top: 22px;
  border-top: 1px solid #e0e8e3;
  color: #6c7f78;
  font-size: 14px;
  line-height: 1.7;
  text-align: left;
}

.asp .asp-source-note a {
  color: #167273;
  font-weight: 600;
}

/* Tablet */
@media (max-width: 1100px) {
  .asp .asp-results-heading {
    gap: 40px;
  }
  .asp .asp-results-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .asp .asp-reliability {
    padding: 36px;
  }
}

/* Mobile */
@media (max-width: 800px) {
  .asp .asp-results-heading {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .asp .asp-results-heading > p {
    padding-left: 20px;
    font-size: 16px;
  }
  .asp .asp-line-chart {
    height: 280px;
  }
  .asp .asp-line-value {
    font-size: 22px;
  }
  .asp .asp-chart-delta {
    font-size: 44px;
  }
  .asp .asp-reliability {
    padding: 28px;
  }
}


/* =====================================================
   CLOSING CTA + FOOTER: FLAT, CLEAN, BOLD
   ===================================================== */

/* Full-width dark band, no grey around the card.
   The -1px top and bottom overlap each band slightly,
   so no light hairline shows between them. */
.asp .asp-cta-section,
.asp .asp-footer {
  background: #041b1c;
  box-shadow: 0 0 0 100vmax #041b1c;
  clip-path: inset(-1px -100vmax);
}

.asp .asp-cta-section {
  padding-block: clamp(72px, 8vw, 112px) clamp(44px, 7vw, 44px);
}

/* Your original flat card: square corners, no glows or rings */
.asp .asp-cta {
  padding: clamp(40px, 5vw, 72px);
  grid-template-columns: 1.4fr 1fr;
  gap: clamp(40px, 5vw, 80px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 0;
  background: #072426;
}

/* Eyebrow */
.asp .asp-cta .asp-eyebrow {
  margin-bottom: 26px !important;
  color: #7fd3d0 !important;
  font-size: 12px !important;
  font-weight: 700;
  letter-spacing: 0.2em;
}

/* Heading: bold, white, fits on three lines */
.asp .asp-cta h2 {
  color: #fff;
  font-size: clamp(36px, 3.9vw, 56px);
  line-height: 1.06;
  letter-spacing: -0.05em;
  text-wrap: initial;
}

.asp .asp-cta h2 em {
  color: #7fd3d0;
}

.asp .asp-cta p:not(.asp-eyebrow) {
  max-width: 580px;
  margin-top: 26px;
  color: #ffffff;
  font-size: 17px;
  line-height: 1.7;
}

/* Button: same teal as the hero, square like your original */
.asp .asp-cta .asp-button {
  margin-top: 34px;
  padding: 18px 28px;
  min-height: 56px;
  border-radius: 4px;
  background: #167273;
  color: #fff !important;
  font-size: 15px;
  font-weight: 700;
  box-shadow: none;
}

.asp .asp-cta .asp-button:hover {
  background: #1d8f90;
  transform: translateY(-2px);
}

.asp .asp-cta .asp-button svg {
  width: 19px;
  height: 19px;
}

/* Right column */
.asp .asp-cta-side {
  padding-left: clamp(28px, 4vw, 56px);
  border-left: 1px solid rgba(255, 255, 255, 0.18);
}

.asp .asp-cta-brand {
  gap: 16px;
  color: #fff;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.05em;
}

.asp .asp-cta-brand > span {
  color: #7fd3d0;
  font-size: 20px;
}

.asp .asp-cta-side ul {
  margin-top: 30px;
}

.asp .asp-cta-side li {
  gap: 14px;
  padding-block: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}

.asp .asp-cta-side li:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.asp .asp-cta-side li svg {
  width: 16px;
  height: 16px;
  color: #7fd3d0;
  stroke-width: 2.4;
}

.asp .asp-cta-caption {
  margin-top: 26px;
  color: #7fd3d0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

/* Footer */
.asp .asp-footer {
  padding-top: 48px;
  padding-bottom: 48px;
}

/* Portfolio note: fine card, three columns */
.asp .asp-portfolio-note {
  display: grid;
  grid-template-columns: auto minmax(0, 1.6fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(24px, 3vw, 44px);

  padding: clamp(22px, 2.6vw, 32px) clamp(24px, 3vw, 40px);
  border: 1px solid rgba(127, 211, 208, 0.35);
  border-radius: 6px;
  background: #072426;
}

.asp .asp-portfolio-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: rgba(22, 114, 115, 0.35);
  color: #7fd3d0;
}

.asp .asp-portfolio-icon svg {
  width: 24px;
  height: 24px;
  stroke-width: 1.6;
}

.asp .asp-portfolio-copy {
  min-width: 0;
}

.asp .asp-portfolio-eyebrow {
  margin: 0 0 8px;
  color: #7fd3d0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  line-height: 1.4;
}

.asp .asp-portfolio-copy h3 {
  margin: 0;
  color: #ffffff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(19px, 1.7vw, 24px);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.asp .asp-portfolio-copy p:last-child {
  margin: 10px 0 0;
  color: #a9c9c7;
  font-size: 13px;
  line-height: 1.7;
}

.asp .asp-portfolio-badge {
  padding-left: clamp(20px, 2.6vw, 36px);
  border-left: 1px solid rgba(255, 255, 255, 0.14);
  align-self: center;
}

.asp .asp-portfolio-pill {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #7fd3d0;
  border-radius: 999px;
  color: #7fd3d0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  white-space: nowrap;
}

.asp .asp-portfolio-badge p {
  margin: 14px 0 0;
  color: #a9c9c7;
  font-size: 12px;
  line-height: 1.6;
}

/* Footer links sit below the note */
.asp .asp-footer-links {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 40px;
  font-size: 14px;
  font-weight: 600;
}

.asp .asp-footer-links a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
}

.asp .asp-footer-links a:hover {
  color: #7fd3d0;
}

.asp .asp-footer-links svg {
  width: 16px;
  height: 16px;
  color: #7fd3d0;
}

/* Tablet */
@media (max-width: 1100px) {
  .asp .asp-portfolio-note {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
  }

  .asp .asp-portfolio-badge {
    grid-column: 2;
    margin-top: 20px;
    padding: 20px 0 0;
    border-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
  }
}

/* Mobile */
@media (max-width: 560px) {
  .asp .asp-portfolio-note {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .asp .asp-portfolio-icon {
    width: 46px;
    height: 46px;
  }

  .asp .asp-portfolio-badge {
    grid-column: 1;
  }

  .asp .asp-footer-links {
    flex-wrap: wrap;
    font-size: 13px;
  }
}

 

/* Tablet */
@media (max-width: 1100px) {
  .asp .asp-cta {
    grid-template-columns: 1fr;
  }
  .asp .asp-cta-side {
    padding: 32px 0 0;
    border-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }
}

/* Mobile */
@media (max-width: 560px) {
  .asp .asp-cta {
    padding: 30px 22px;
  }
  .asp .asp-cta p:not(.asp-eyebrow) {
    font-size: 15px;
  }
  .asp .asp-cta-brand {
    font-size: 22px;
  }
  .asp .asp-cta-side li {
    font-size: 14px;
  }
  .asp .asp-footer > div {
    font-size: 13px;
  }
}

/* =====================================================
   HERO: MOBILE SPACING
   ===================================================== */

@media (max-width: 800px) {
  .asp .asp-hero.asp-hero--blended {
    padding: 20px 0 28px;
  }

  .asp .asp-hero--blended .asp-hero-grid {
    gap: 0;
  }

  /* Just enough to clear the fixed nav (about 64px tall) */
  .asp .asp-hero--blended .asp-hero-copy {
    max-width: none;
    padding-top: 64px;
  }

  .asp .asp-hero--blended .asp-eyebrow {
    margin-bottom: 16px !important;
  }

  .asp .asp-hero--blended h1 {
    font-size: clamp(32px, 8.4vw, 48px);
    line-height: 1.08;
  }

  .asp .asp-hero--blended .asp-deck {
    margin-top: 18px !important;
    font-size: 15px;
    line-height: 1.65;
  }

  .asp .asp-hero--blended .asp-hero-links {
    gap: 20px;
    margin-top: 24px;
  }

  .asp .asp-hero--blended .asp-hero-meta {
    gap: 8px 14px;
    margin-top: 26px;
    font-size: 10px;
    letter-spacing: 0.06em;
    color: #c9dcd2;
  }

  .asp .asp-hero--blended .asp-hero-meta span + span {
    padding-left: 14px;
  }

  /* The empty column under the text: just a sliver of building */
  .asp .asp-hero--blended .asp-hero-visual {
    min-height: 110px;
  }
}

@media (max-width: 480px) {
  .asp .asp-hero--blended h1 {
    font-size: clamp(30px, 8.6vw, 38px);
  }

  .asp .asp-hero--blended .asp-hero-copy {
    padding-top: 60px;
  }

  .asp .asp-hero--blended .asp-hero-links {
    flex-wrap: nowrap;
    gap: 18px;
  }

  .asp .asp-hero--blended .asp-button {
    padding: 13px 16px;
    min-height: 46px;
    gap: 14px;
    font-size: 12px;
  }

  .asp .asp-hero--blended .asp-hero-visual {
    min-height: 80px;
  }
}

/* =====================================================
   MOTION: HERO LOAD + SCROLL REVEALS
   ===================================================== */

@keyframes aspRise {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes aspBackdrop {
  from {
    opacity: 0;
    transform: scale(1.07);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes navIn {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Hero: plays once on page load, staggered top to bottom */
.asp-hero--blended .asp-hero-backdrop {
  animation: aspBackdrop 1.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.asp-hero--blended .asp-eyebrow,
.asp-hero--blended h1,
.asp-hero--blended .asp-deck,
.asp-hero--blended .asp-hero-links,
.asp-hero--blended .asp-hero-meta {
  animation: aspRise 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.asp-hero--blended .asp-eyebrow   { animation-delay: 0.25s; }
.asp-hero--blended h1             { animation-delay: 0.4s; }
.asp-hero--blended .asp-deck      { animation-delay: 0.6s; }
.asp-hero--blended .asp-hero-links{ animation-delay: 0.78s; }
.asp-hero--blended .asp-hero-meta { animation-delay: 0.95s; }

/* Scroll reveals */
.asp.asp-anim [data-reveal] {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
  will-change: opacity, transform;
}

.asp.asp-anim [data-reveal].is-in {
  opacity: 1;
  transform: none;
  will-change: auto;
}

/* Side-by-side partners arrive just after their neighbour */
.asp-practice-editorial-intro,
.asp-expansion-intro,
.asp-connected-heading > p,
.asp-results-heading > p,
.asp-migration-heading > div:last-child,
.asp-connected-after,
.asp-reliability,
.asp-practice-editorial-details {
  --d: 150ms;
}

/* Chart line draws itself, area fades in after it */
.asp.asp-anim .asp-line-path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.8s cubic-bezier(0.45, 0, 0.2, 1) 0.35s;
}

.asp.asp-anim .asp-collections.is-in .asp-line-path {
  stroke-dashoffset: 0;
}

.asp.asp-anim .asp-line-area,
.asp.asp-anim .asp-line-point,
.asp.asp-anim .asp-line-value {
  opacity: 0;
  transition: opacity 1s ease 1.4s;
}

.asp.asp-anim .asp-collections.is-in .asp-line-area,
.asp.asp-anim .asp-collections.is-in .asp-line-point,
.asp.asp-anim .asp-collections.is-in .asp-line-value {
  opacity: 1;
}

/* Progress bar fills from the left */
.asp.asp-anim .asp-reliability-track i {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
}

.asp.asp-anim .asp-reliability.is-in .asp-reliability-track i {
  transform: scaleX(1);
}

/* Lighter movement on phones */
@media (max-width: 800px) {
  .asp.asp-anim [data-reveal] {
    transform: translateY(20px);
  }
}

/* Respect "reduce motion" settings */
@media (prefers-reduced-motion: reduce) {
  .asp-hero--blended .asp-hero-backdrop,
  .asp-hero--blended .asp-eyebrow,
  .asp-hero--blended h1,
  .asp-hero--blended .asp-deck,
  .asp-hero--blended .asp-hero-links,
  .asp-hero--blended .asp-hero-meta {
    animation: none !important;
  }
}


/* GROWTH MOMENT — OPTION 01 */

.asp .asp-growth {
  padding: clamp(64px, 7vw, 112px) 0;
  background: #041b1c;
  color: #f6f3e9;
}

.asp .asp-growth-heading {
  max-width: 1000px;
  margin: 0 0 clamp(44px, 5vw, 72px);
}

.asp .asp-growth-eyebrow {
  margin: 0 0 20px;
  color: #a4d5d2;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.asp .asp-growth-heading h2 {
  margin: 0;
  color: #f6f3e9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(36px, 4.2vw, 64px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.asp .asp-growth-heading h2 em {
  color: #82c8c5;
  font-style: normal;
}

.asp .asp-growth-intro {
  max-width: 780px;
  margin: 24px 0 0;
  color: #c4d6d4;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.8;
}

.asp .asp-growth-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: start;
  gap: clamp(48px, 7vw, 112px);
}

/* Left: oversized editorial number */

.asp .asp-growth-summary {
  min-width: 0;
  width: 100%;
  max-width: 480px;
  padding-top: 4px;
}

.asp .asp-growth-nearly {
  display: block;
  margin: 0 0 10px;
  color: #b9dedb;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.32em;
  text-transform: uppercase;
}

.asp .asp-growth-total {
  display: block;
  margin: 0;
  color: #f6f3e9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(130px, 17vw, 250px);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: -0.065em;
}

.asp .asp-growth-caption {
  margin: 22px 0 0;
  color: #f6f3e9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(19px, 2vw, 27px);
  line-height: 1.4;
  letter-spacing: 0.06em;
}

.asp .asp-growth-breakdown {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 34px;
  padding-top: 24px;
  border-top: 1px solid rgba(185, 222, 219, 0.55);
}

.asp .asp-growth-breakdown > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
}

.asp .asp-growth-breakdown > div + div {
  border-left: 1px solid rgba(185, 222, 219, 0.45);
}

.asp .asp-growth-breakdown strong {
  color: #f6f3e9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 4.3vw, 60px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.045em;
}

.asp .asp-growth-breakdown span {
  color: #c4d6d4;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

/* Right: fine vertical timeline */

.asp .asp-growth-timeline {
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.asp .asp-growth-timeline > li {
  position: relative;
  margin: 0;
  padding: 0 0 38px 34px;
}

.asp .asp-growth-timeline > li:last-child {
  padding-bottom: 0;
}

/* Line runs from one node to the next. */

.asp .asp-growth-timeline > li:not(:last-child)::before {
  content: "";
  position: absolute;
  top: 8px;
  bottom: -8px;
  left: 4px;
  width: 1px;
  background: rgba(164, 213, 210, 0.6);
}

.asp .asp-growth-timeline > li::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 0;
  width: 9px;
  height: 9px;
  box-sizing: border-box;
  border: 2px solid #d4e9e6;
  border-radius: 50%;
  background: #041b1c;
}

.asp .asp-growth-date {
  display: block;
  margin: 0 0 10px;
  color: #a4d5d2;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0.16em;
}

.asp .asp-growth-timeline h3 {
  margin: 0;
  color: #f6f3e9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(23px, 2.2vw, 30px);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.035em;
}

.asp .asp-growth-timeline p {
  max-width: 520px;
  margin: 12px 0 0;
  color: #bfd2d0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  line-height: 1.75;
}

/* Mobile: numbers first, timeline underneath */

@media (max-width: 800px) {
  .asp .asp-growth-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 48px;
  }

  .asp .asp-growth-heading {
    margin-bottom: 40px;
  }

  .asp .asp-growth-intro {
    font-size: 15px;
    line-height: 1.75;
  }

  .asp .asp-growth-summary {
    max-width: 420px;
  }

  .asp .asp-growth-total {
    font-size: clamp(130px, 38vw, 220px);
  }

  .asp .asp-growth-breakdown strong {
    font-size: clamp(40px, 10vw, 56px);
  }

  .asp .asp-growth-timeline > li {
    padding-left: 28px;
  }
}
`;
