"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent, ReactNode } from "react";

/** A complete, responsive page. Styles are scoped; Tailwind is not required.
 * Put seo-plan-hero.png in public/images/. See README.md for routing and forms.
 * onSubmitPlan takes precedence over submitEndpoint. Neither is configured by default.
 */
export type SeoPlanRequest = {
  website: string;
  name: string;
  email: string;
  goal: string;
  targetMarket: string;
  source: "free-seo-plan";
};
export type FreeSeoPlanProps = {
  heroImageSrc?: string;
  logoSrc?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  caseStudyHref?: string;
  privacyHref?: string;
  contactHref?: string;
  submitEndpoint?: string;
  onSubmitPlan?: (request: SeoPlanRequest) => Promise<void>;
};

type IconName =
  | "briefcase"
  | "panels"
  | "arrow"
  | "check"
  | "search"
  | "document"
  | "people"
  | "shield"
  | "link"
  | "chart"
  | "pie"
  | "target"
  | "menu"
  | "close"
  | "chevron"
  | "layers";
function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M10 11h4v3h-4z" />
    </>
  ),
  panels: (
    <>
      <rect x="4" y="3" width="7" height="18" rx="1.4" />
      <rect x="13" y="3" width="7" height="18" rx="1.4" />
      <path d="M7.5 7v3M16.5 7v3M7.5 14v3M16.5 14v3" />
    </>
  ),
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    document: (
      <>
        <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v2" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    link: (
      <>
        <path d="m10 8 3-3a4 4 0 0 1 6 6l-3 3M14 16l-3 3a4 4 0 0 1-6-6l3-3M8 16l8-8" />
      </>
    ),
    chart: <path d="M4 3v18h17M8 17v-4M13 17V7M18 17v-7" />,

pie: (
  <>
    <path d="M12 3a9 9 0 1 0 9 9h-9z" />
    <path d="M14 3.3A9 9 0 0 1 20.7 10H14z" />
  </>
),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    layers: (
      <>
        <path d="m12 3 10 6-10 6L2 9zM2 13l10 6 10-6M2 17l10 6 10-6" />
      </>
    ),
  };
  return (
    <svg
      className={`sp-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="sp-eyebrow">{children}</p>;
}


function Cta({
  children = "Build my free SEO plan",
  onClick,
}: {
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a className="sp-button" href="#request-plan" onClick={onClick}>
      {children}
      <Icon name="arrow" />
    </a>
  );
}
function Brand({ logoSrc }: { logoSrc?: string }) {
  return (
    <a href="/" className="sp-brand" aria-label="GrowUp home">
      {logoSrc ? (
        <img src={logoSrc} alt="GrowUp" width="142" height="42" />
      ) : (
        <>
          <span className="sp-brand-mark" aria-hidden="true">
            G<span />
          </span>
          <span>
            GrowUp<span className="sp-brand-sub">B2B SAAS CONTENT & SEO</span>
          </span>
        </>
      )}
    </a>
  );
}


const keywordSets = {
  "Buying intent": [
    [
      "revolut alternatives",
      "Compare Revolut alternatives by international transfer costs, account features, restrictions and switching effort.",
      "Create",
      "High",
    ],
    [
      "wise vs revolut business",
      "Show where Wise and Revolut differ on FX costs, payment workflows and controls.",
      "Improve",
      "High",
    ],
    [
      "best multi currency business account",
      "Rank business accounts against currency coverage, conversion charges, payment limits and operational needs.",
      "Create",
      "Medium",
    ],
    [
      "wise business fees",
      "Explain Wise's transfer fees, conversion rates and account charges using realistic payment scenarios.",
      "Improve",
      "Medium",
    ],
    [
      "wise vs bank international transfer",
      "Compare Wise and traditional banks using landed transfer costs and exchange-rate markups.",
      
      "Refresh",
      "Low",
    ],
  ],

  "Use cases": [
    [
      "international payments for business",
      "Show how businesses pay overseas suppliers reliably while controlling FX costs and delays.",
      "Improve",
      "High",
    ],
    [
      "bulk international payments",
      "Demonstrate batch payment workflows, approval controls and reconciliation for high-volume international payouts.",
      "Improve",
      "High",
    ],
    [
      "pay international freelancers",
      "Walk finance teams through freelancer payouts, currency choices, fee calculations and timelines.",
      "Create",
      "Medium",
    ],
    [
      "wise xero integration",
      "Explain Xero connection steps, transaction syncing, reconciliation rules and common setup limitations.",
      "Improve",
      "Medium",
    ],
    [
      "how to pay overseas suppliers",
      "Compare supplier payment methods, banking charges and FX trade-offs with worked examples.",
      "Refresh",
      "Low",
    ],
  ],

  "Business case": [
    [
      "wise business pricing",
      "Break down Wise Business fees by payment type, destination, currency and frequency.",
      "Improve",
      "High",
    ],
    [
      "reduce international payment fees business",
      "Show finance teams where payment costs come from and how to cut them, with savings examples at different monthly volumes.",
      
      "Create",
      "High",
    ],
    [
      "international payment cost calculator",
      "Let finance teams model payment volumes, currency pairs and potential transfer savings.",
      "Create",
      "Medium",
    ],
    [
      "wise business api pricing",
      "Clarify Wise API commercial considerations, integration requirements, transaction costs and scaling constraints.",
      "Improve",
      "Medium",
    ],
    [
      "cost of international business payments",
      "Calculate total payment costs across bank fees, currency spreads and administrative effort.",
      "Create",
      "Low",
    ],
  ],
};


type KeywordTab = keyof typeof keywordSets;
const keywordTabs = Object.keys(keywordSets) as KeywordTab[];

const buyers = [
  {
    icon: "briefcase" as const,
    number: "01",
    title: "The Decision-Maker",
    needs: "A convincing financial case that justifies the investment internally.",
    searches: "[category] ROI, [category] pricing, [category] total cost of ownership",
    build: "Build ROI, pricing and business-case content",
  },
  {
    icon: "panels" as const,
    number: "02",
    title: "The Evaluator",
    needs: "Enough product evidence to confidently recommend the right vendor.",
    searches: "best [category] software, [competitor] alternatives, [product A] vs [product B]",
    build: "Build alternatives and comparison pages",
  },
  {
    icon: "shield" as const,
    number: "03",
    title: "The Technical Reviewer",
    needs: "Confidence the product integrates securely with their existing systems.",
    searches: "[product] API doc, [product] security compliance, [product] migration guide",
    build: "Build integration and implementation guides",
  },
];

const roadmap = [
  {
    period: "DAYS 01–30",
    title: "Agree priorities and establish baselines",
    work:
      "Finalise target keywords, identify existing pages to improve and assign owners to the first deliverables.",
    output:
      "A prioritised page list, delivery schedule and measurement baseline.",
    track:
      "Current rankings, commercial page visits and conversion rates.",
  },
  {
    period: "DAYS 31–60",
    title: "Publish and improve priority pages",
    work:
      "Create high-intent pages, update existing content and strengthen internal links and authority.",
    output:
      "Completed priority pages, updated content and briefs for the next batch.",
    track:
      "Indexing, search impressions, relevant visits and demo enquiries.",
  },
  {
    period: "DAYS 61–90",
    title: "Review results and adjust priorities",
    work:
      "Assess early performance, identify pages gaining traction and review whether qualified buyers are progressing towards conversion.",
    output:
      "A performance review, content adjustments and next-quarter priorities.",
    track:
      "Commercial search visibility, qualified enquiries and early pipeline signals.",
  },
];

const metrics = [
  {
    name: "Visibility",
    detail:
      "Priority keyword positions, relevant impressions and AI-generated vendor mentions.",
  },
  {
    name: "Engagement",
    detail:
      "Organic visits to commercial pages and progression towards pricing or demos.",
  },
  {
    name: "Pipeline",
    detail:
      "Organic-sourced opportunities, influenced pipeline and eventual revenue contribution.",
  },
];


const testimonials = [
  {
    quote:
      "Muiz wrote me the best SEO report I’ve ever seen. It was clear, commercially grounded, and incredibly easy to act on.",
    name: "Savas Vedova",
    role: "Founder, Stormkit",
    image:
      "https://www.seo-growup.com/hs-fs/hubfs/savas.webp?width=92&height=92&name=savas.webp",
  },
  {
    quote:
      "I’ve been in growth roles for eight years, so I know when an agency’s just running through a template. This wasn’t that. Muiz showed us how our organic performance, messaging clarity, and trial experience were all undermining each other. That clarity alone gave us the most actionable growth roadmap we’ve had in years.",
    name: "Allyson",
    role: "Founder, AI PM Platform",
    image: null,
  },
];


const faqs = [
  [
    "Are there any costs or commitments involved?",
    "No. GrowUp provides the research, recommendations and 90-day SEO plan at no cost. You can review the findings internally, use them to inform your existing strategy or discuss implementation with us. There’s no contract, minimum engagement or obligation to purchase additional services.",
  ],
  [
    "How does this differ from a full SEO audit?",
    "An SEO audit examines your website’s current performance, technical issues and existing search visibility in depth. This plan focuses on future opportunities: which buyers to reach, where competitors are ranking, what content to prioritise and how to structure your next 90 days.",
  ],
  [
    "How specific will the recommendations be to our business?",
    "We’ll assess your product, target customers, competitors and existing website content before developing the recommendations. That means identifying relevant search terms, specific pages worth creating or improving, and opportunities tied to your commercial goals rather than providing a generic keyword list or template.",
  ],
  [
    "What information will you need from our team?",
    "We’ll start with your company website, target market and primary growth objective. You won’t need to provide GA4, Search Console or CRM access for the initial plan. If additional context would materially improve the recommendations, we’ll explain what’s needed and why.",
  ],
  [
    "What is the expected delivery timeframe?",
    "We aim to deliver the completed plan within a week once we have the necessary information. This allows time to review your market, assess competing content and prioritise recommendations. We’ll confirm the expected delivery date when we acknowledge your request.",
  ],
  [
    "Will GrowUp walk us through the recommendations?",
    "Yes. We can arrange a walkthrough to explain the priorities, discuss the reasoning behind specific recommendations and answer questions from your marketing team. You’ll have an opportunity to clarify implementation requirements before deciding whether to handle execution internally or engage GrowUp.",
  ],
  [
    "What results should we expect within 90 days?",
    "The 90-day roadmap sets out recommended activities and measurement priorities, not guaranteed performance outcomes. Some improvements may generate early visibility or engagement signals, while qualified pipeline typically takes longer to assess. We’ll identify relevant metrics based on your buying process and sales cycle.",
  ],
];


function normaliseWebsite(input: string): string | null {
  try {
    const value = input.trim();
    const url = new URL(
      /^https?:\/\//i.test(value) ? value : `https://${value}`,
    );
    if (
      !/^https?:$/.test(url.protocol) ||
      !url.hostname.includes(".") ||
      url.username ||
      url.password ||
      /\s/.test(value)
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}


const aiVisibilityGaps = [
  {
    id: "01",
    intent: "Alternatives",
    prompt:
      "We’re replacing Revolut Business. Which alternatives should we shortlist for paying suppliers in EUR and USD?",
    visibility: "Missing",
    gap: "Shortlists Airwallex and traditional business accounts but leaves out Wise Business. Buyers never see a comparison of Wise’s supported currencies, transfer fees or suitability for supplier payments.",
    contentTitle: "Build a switching-focused alternatives page",
    content:
      "Compare supported workflows, restrictions, onboarding and migration effort.",
    authorityTitle: "Support relevant alternatives coverage",
    authority:
      "Explore independent comparison updates and expert contributions backed by accurate product evidence.",
  },
  {
    id: "02",
    intent: "Cost comparison",
    prompt:
      "Wise Business or Revolut Business: which would cost less for £50,000 a month in overseas supplier payments?",
    visibility: "Weak mention",
    gap: "Names both providers but gives no worked example accounting for exchange-rate markups, transfer fees, payment frequency or recipient charges. Buyers cannot judge the actual cost difference.",
    contentTitle: "Show a consistent cost comparison",
    content:
      "Model £50,000 in monthly payments with dated fee sources and explicit currency assumptions.",
    authorityTitle: "Develop a finance PR angle",
    authority:
      "Use a transparent payment-cost benchmark to inform pitches to relevant finance publications.",
  },
  {
    id: "03",
    intent: "Vendor selection",
    prompt:
      "Which business account should we choose to hold EUR and USD, pay overseas suppliers and sync with Xero?",
    visibility: "Missing",
    gap: "Recommends competing accounts without evaluating Wise's Xero integration, transaction syncing, reconciliation workflow or multi-currency payment capabilities against the stated requirements.",
    contentTitle: "Explain the Xero-connected workflow",
    content:
      "Cover currency accounts, supplier payments, reconciliation and verified integration limits.",
    authorityTitle: "Explore partner resources",
    authority:
      "Identify relevant integration listings, partner guides and joint workflow content.",
  },
  {
    id: "04",
    intent: "Business case",
    prompt:
      "Should we switch from our bank to Wise Business for international payments? Compare total costs and trade-offs.",
    visibility: "Weak mention",
    gap: "Discusses potential FX savings but overlooks total payment costs, finance-team workload, migration effort and the assumptions needed to calculate a realistic payback period.",
    contentTitle: "Build the business case for switching",
    content:
      "Compare bank fees, FX spreads, operational effort and migration trade-offs.",
    authorityTitle: "Connect proof and expertise",
    authority:
      "Link from existing payment guides and explore evidence-led commentary in treasury publications.",
  },
  {
    id: "05",
    intent: "Vendor comparison",
    prompt:
      "We need bulk international payments with approval controls. Should we choose Wise Business, Airwallex or Revolut?",
    visibility: "Missing",
    gap: "Focuses on Airwallex and Revolut without assessing Wise against batch payment limits, approval permissions, API capabilities and the operational needs of a growing finance team.",
    contentTitle: "Compare bulk-payment requirements",
    content:
      "Document approval controls, batch limits, integrations and implementation needs.",
    authorityTitle: "Support specialist comparisons",
    authority:
      "Explore finance-operations resources and expert-led vendor comparisons with substantiated product details.",
  },
];


const aiActionRecommendations = [
  {
    priority: "High",
    gap: "Missing from Revolut alternatives",
    action:
      "Build a comparison covering Wise, Revolut and Airwallex for international supplier payments.",
    evidence:
      "FX fee examples, supported currencies, payment limits and switching considerations.",
  },
  {
    priority: "High",
    gap: "Weak cost comparison",
    action:
      "Improve Wise vs Revolut content with worked payment-cost scenarios at different monthly volumes.",
    evidence:
      "£10k, £50k and £100k payment models, fee assumptions and exchange-rate comparisons.",
  },
  {
    priority: "High",
    gap: "Missing from Xero-related recommendations",
    action:
      "Strengthen integration content around supplier payments and finance reconciliation.",
    evidence:
      "Xero setup steps, syncing behaviour, reconciliation examples and known limitations.",
  },
  {
    priority: "Medium",
    gap: "Incomplete switching business case",
    action:
      "Publish a bank-vs-Wise cost analysis for finance teams considering a move.",
    evidence:
      "Annual payment costs, administrative time, migration requirements and payback assumptions.",
  },
  {
    priority: "Medium",
    gap: "Missing from bulk payment comparisons",
    action:
      "Expand product content covering high-volume international payouts and approval workflows.",
    evidence:
      "Batch payment examples, user permissions, API documentation and operational constraints.",
  },
];


const aiVisibilityTabs = [
  {
    label: "Buyer Visibility Gaps",
    icon: "search" as const,
  },
  {
    label: "Recommended Actions",
    icon: "document" as const,
  },
];

function AiVisibilitySection() {
  const id = useId().replace(/:/g, "");
  const [activeTab, setActiveTab] = useState(0);

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;

    if (event.key === "ArrowRight") {
      next = (index + 1) % aiVisibilityTabs.length;
    } else if (event.key === "ArrowLeft") {
      next =
        (index - 1 + aiVisibilityTabs.length) %
        aiVisibilityTabs.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = aiVisibilityTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(next);
    document.getElementById(`${id}-ai-tab-${next}`)?.focus();
  }

  return (
    <section
      className="sp-ai-plan sp-ai-gaps-section"
      aria-labelledby={`${id}-ai-heading`}
    >
      <div className="sp-container">
        <header className="sp-ai-plan-intro">
          <Eyebrow>04 / AI search visibility & authority</Eyebrow>

          <h2 id={`${id}-ai-heading`}>
        Understand how your product shows up when buyers use AI to evaluate vendors.
          </h2>

          <p>
We review AI-generated answers across your priority buying topics, looking at which brands are recommended, how they’re positioned and what could improve your visibility.
          </p>
        </header>

        <div className="sp-ai-map">
          <div
            className="sp-ai-map-tabs"
            role="tablist"
            aria-label="AI visibility plan examples"
          >
            {aiVisibilityTabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                id={`${id}-ai-tab-${index}`}
                aria-selected={activeTab === index}
                aria-controls={`${id}-ai-panel-${index}`}
                tabIndex={activeTab === index ? 0 : -1}
                onClick={() => setActiveTab(index)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                <Icon name={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`${id}-ai-panel-0`}
            aria-labelledby={`${id}-ai-tab-0`}
            hidden={activeTab !== 0}
            tabIndex={0}
            className="sp-ai-map-panel"
          >
       <p className="sp-ai-tab-description">
Identify the gaps in your AI visibility across priority search terms.
</p>

            <div
              className="sp-ai-table-scroll"
              role="region"
              aria-label="Illustrative buyer visibility gaps"
              tabIndex={0}
            >
              <table className="sp-ai-gap-table">
                <caption className="sp-ai-sr-only">
                  Five example buying prompts and illustrative
                  visibility gaps for Wise Business.
                </caption>

                <thead>
                  <tr>
                    <th scope="col">Gap</th>
                    <th scope="col">Buyer prompt</th>
                    <th scope="col">Example visibility</th>
                    <th scope="col">What the gap looks like</th>
                  </tr>
                </thead>

                <tbody>
                  {aiVisibilityGaps.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">
                        <span className="sp-ai-gap-id">
                          {item.id}
                        </span>
                      </th>

                      <td>
                        <p className="sp-ai-prompt">
                          {item.prompt}
                        </p>
                        <span className="sp-ai-intent">
                          {item.intent}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`sp-ai-status ${
                            item.visibility === "Missing"
                              ? "sp-ai-status-missing"
                              : "sp-ai-status-weak"
                          }`}
                        >
                          {item.visibility}
                        </span>
                      </td>

                      <td>{item.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <div
            role="tabpanel"
            id={`${id}-ai-panel-1`}
            aria-labelledby={`${id}-ai-tab-1`}
            hidden={activeTab !== 1}
            tabIndex={0}
            className="sp-ai-map-panel"
          >
            <p className="sp-ai-tab-description">
Actionable recommendations to fix your visibility gaps and strengthen your authority.
            </p>

            <div
              className="sp-ai-table-scroll"
              role="region"
              aria-label="Recommendations mapped to visibility gaps"
              tabIndex={0}
            >
            
<table className="sp-ai-action-table">
  <caption className="sp-ai-sr-only">
    Recommended actions and supporting evidence for each AI visibility gap.
  </caption>

  <thead>
    <tr>
      <th scope="col">Priority</th>
      <th scope="col">Visibility gap</th>
      <th scope="col">Recommended action</th>
      <th scope="col">Evidence to include</th>
    </tr>
  </thead>

  <tbody>
    {aiActionRecommendations.map((item, index) => (
      <tr key={index}>
        <td>
          <span
            className={`sp-priority sp-priority-${item.priority.toLowerCase()}`}
          >
            {item.priority}
          </span>
        </td>

        <th scope="row">
          <strong className="sp-ai-action-title">
            {item.gap}
          </strong>
        </th>

        <td>
          <p className="sp-ai-action-copy">
            {item.action}
          </p>
        </td>

        <td>
          <p className="sp-ai-action-copy">
            {item.evidence}
          </p>
        </td>
      </tr>
    ))}
  </tbody>
</table>

            </div>

          </div>

 
        </div>

        <footer className="sp-ai-plan-footer">
          <p>
Missing = absent from a sampled answer. Weak mention = named without useful buying detail. Live findings would record platform, date and prompt.
          </p>

          <Cta />
        </footer>
      </div>
    </section>
  );
}
export default function FreeSeoPlan({
  heroImageSrc = "/images/seoplanhero.png",
  logoSrc,
  caseStudyHref = "https://www.seo-growup.com/#work",
  privacyHref = "https://www.seo-growup.com/privacy-policy",
contactHref = "https://www.seo-growup.com/get-in-touch",
submitEndpoint = "https://api.hsforms.com/submissions/v3/integration/submit/146257714/70e7e803-78dc-4299-82b2-c2e52399e6be",
onSubmitPlan,

}: FreeSeoPlanProps) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);
  
const [activeTestimonial, setActiveTestimonial] = useState(0);

const changeTestimonial = (direction: number) => {
  setActiveTestimonial((current) =>
    (current + direction + testimonials.length) % testimonials.length
  );
};

  const [keywordTab, setKeywordTab] = useState<KeywordTab>("Buying intent");


  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [website, setWebsite] = useState("");
  const [heroError, setHeroError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("More qualified demos");
  const [market, setMarket] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "preview"
  >("idle");
  const [error, setError] = useState("");
  const [heroFailed, setHeroFailed] = useState(false);
  const configured = Boolean(onSubmitPlan || submitEndpoint);

  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    const sections = root.querySelectorAll(".sp-reveal");
    sections.forEach((el) => {
      el.classList.add("sp-observed");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    setHeroFailed(false);
  }, [heroImageSrc]);
  useEffect(() => {
    if (step === 2) contactRef.current?.focus({ preventScroll: true });
  }, [step]);

  const closeMenu = () => setMenuOpen(false);
  function continueFromHero(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = normaliseWebsite(website);
    if (!valid) {
      setHeroError("Enter a valid company website, such as yourcompany.com.");
      return;
    }
    setHeroError("");
    setWebsite(valid);
    setStep(2);
    setStatus("idle");
    document
      .getElementById("request-plan")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    contactRef.current?.focus({ preventScroll: true });
  }
  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % keywordTabs.length;
    else if (event.key === "ArrowLeft")
      next = (index + keywordTabs.length - 1) % keywordTabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = keywordTabs.length - 1;
    else return;
    event.preventDefault();
    setKeywordTab(keywordTabs[next]);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  }
  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    const valid = normaliseWebsite(website);
    if (!valid) {
      setError("Enter a valid company website, such as yourcompany.com.");
      setStatus("error");
      setStep(1);
      websiteRef.current?.focus();
      return;
    }
    setWebsite(valid);
    setError("");
    if (step === 1) {
      setStep(2);
      setStatus("idle");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      setStatus("error");
      contactRef.current?.focus();
      return;
    }
    const request: SeoPlanRequest = {
      website: valid,
      name: name.trim(),
      email: email.trim(),
      goal,
      targetMarket: market.trim(),
      source: "free-seo-plan",
    };
    if (!configured) {
      setStatus("preview");
      return;
    }
    sendingRef.current = true;
    setStatus("sending");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      if (onSubmitPlan) await onSubmitPlan(request);
   
 
else {
  const hubspotPayload = {
    fields: [
      {
        objectTypeId: "0-1",
        name: "website",
        value: request.website,
      },
      {
        objectTypeId: "0-1",
        name: "firstname",
        value: request.name,
      },
      {
        objectTypeId: "0-1",
        name: "email",
        value: request.email,
      },
      {
        objectTypeId: "0-1",
        name: "main_growth_goal",
        value: request.goal,
      },
      {
        objectTypeId: "0-1",
        name: "message",
        value: request.targetMarket,
      },
    ],
    context: {
      pageUri: window.location.href,
      pageName: "GrowUp | Free B2B SaaS SEO Plan",
    },
  };

  const response = await fetch(submitEndpoint!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hubspotPayload),
    signal: controller.signal,
  });

  if (!response.ok) {
    throw new Error("HubSpot form submission failed");
  }
}



      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "We couldn’t confirm your request. Please try again, or use the contact link below.",
      );
    } finally {
      window.clearTimeout(timer);
      sendingRef.current = false;
    }
  }

  return (
    <div className="sp-page" ref={rootRef}>
      <style>{STYLES}</style>
      <a href="#seo-plan-content" className="sp-skip">
        Skip to content
      </a>


      <main id="seo-plan-content">
        {/* 00 — HERO */}
        <section className="sp-hero">
          <div className="sp-container sp-hero-grid">
            <div className="sp-hero-copy">
              <Eyebrow>Your free B2B SaaS SEO plan</Eyebrow>
              
      <h1 className="sp-hero-title">
  <span className="sp-title-line">Your exact blueprint</span>
  <span className="sp-title-line">for high-intent organic</span>

  <span className="sp-title-line sp-title-final">
    pipeline growth.

    <svg
      className="sp-title-curve"
      viewBox="0 0 600 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 17 Q300 1 592 18"
        stroke="#167273"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  </span>
</h1>

              <p className="sp-hero-description">
Get a free 90-day roadmap showing the exact keywords to prioritise, pages to publish, and competitor gaps to close first.
 </p>
          

              <form className="sp-hero-form" onSubmit={continueFromHero}>
                <label htmlFor={`${uid}-hero-website`}>
                  What’s your company’s website?
                </label>
                <div className="sp-hero-input-row">
                  <div className="sp-input-icon">
                    <Icon name="link" />
                    <input
                      id={`${uid}-hero-website`}
                      value={website}
                      onChange={(e) => {
                        setWebsite(e.target.value);
                        setHeroError("");
                      }}
                      placeholder="yourcompany.com"
                      autoComplete="url"
                      inputMode="url"
                      maxLength={2048}
                      required
                      aria-invalid={Boolean(heroError)}
                      aria-describedby={
                        heroError ? `${uid}-hero-error` : undefined
                      }
                    />
                  </div>
                  <button className="sp-button" type="submit">
                    Build my free SEO plan <Icon name="arrow" />
                  </button>
                </div>
                {heroError && (
                  <p
                    id={`${uid}-hero-error`}
                    className="sp-error sp-error-dark"
                    role="alert"
                  >
                    {heroError}
                  </p>
                )}
                <p className="sp-micro">
                  Free, tailored to your business. No obligation to work with
                  us.
                </p>
              </form>
  
            </div>
            <div className="sp-hero-art">
              {!heroFailed ? (
                <img
                  src={heroImageSrc}
                  width="1600"
                  height="1600"
                  fetchPriority="high"
                  alt="Example SEO plan showing buying intent, recommended pages and measurement priorities."
                  onError={() => setHeroFailed(true)}
                />
              ) : (
                <div className="sp-hero-fallback">
                  <span className="sp-tag">Example plan</span>
                  <h2>Your next 90 days of SEO</h2>
                  {[
                    "Capture buying intent",
                    "Build the right pages",
                    "Measure qualified demand",
                  ].map((text, i) => (
                    <div key={text}>
                      <b>0{i + 1}</b>
                      <strong>{text}</strong>
                      <Icon name="document" />
                    </div>
                  ))}
                  <p>Prioritised around your product and buyers</p>
                </div>
              )}
            </div>
          </div>
        </section>



        
        {/* RESULTS */}
        <section
          id="results"
          className="sp-proof"
          aria-label="Client programme results"
        >
          <div className="sp-container">
            <div className="sp-proof-grid">
              <p>
                Results from GrowUp
                <br />
                client programmes
              </p>
              <div>
                <strong>$4.7M</strong>
                <span>Content-influenced pipeline</span>
              </div>
              <div>
                <strong>60+</strong>
                <span>Monthly inbound leads</span>
              </div>
              <div>
                <strong>−38%</strong>
                <span>Customer acquisition cost</span>
              </div>
              <a 
                className="sp-text-link" 
                href="https://www.seo-growup.com/success-stories"
                target="_blank"
                rel="noopener noreferrer"
              >
                See success stories <Icon name="arrow" />
              </a>
            </div>
   
          </div>
        </section>
        {/* 01 — BUYER & SEARCH FIT */}
        <section id="whats-inside" className="sp-section">
          <div className="sp-container sp-reveal">
            <Eyebrow>01 / STAKEHOLDER MAPPING</Eyebrow>
            <h2>Map the buying committee before deciding what content to build.</h2>
            <p className="sp-lead" style={{ paddingBottom: "20px" }}>
              Before recommending keywords or pages, we identify who’s involved in the buying process, what each stakeholder needs to know, and the searches they make when evaluating solutions like yours.
            </p>


       <div className="sp-three sp-buyer-grid">
  {buyers.map((buyer) => (
    <article
      key={buyer.title}
      className="sp-card sp-buyer"
    >
      {/* Card header */}
      <div className="sp-card-heading">
        <span className="sp-icon-circle">
          <Icon name={buyer.icon} />
        </span>

        <strong>{buyer.title}</strong>

        <span className="sp-buyer-number">
          {buyer.number}
        </span>
      </div>

      <div className="sp-card-rule" />

      {/* Buyer needs */}
      <div className="sp-buyer-row">
        <b>Needs</b>
        <span>{buyer.needs}</span>
      </div>

      {/* Search behaviour */}
      <div className="sp-buyer-row">
        <b>Searches</b>
        <span>{buyer.searches}</span>
      </div>

      {/* Recommended content */}
      <div className="sp-buyer-build">
        <span className="sp-build-icon">
          <Icon name="check" />
        </span>

        <span>{buyer.build}</span>
      </div>
    </article>
  ))}
</div>



          </div>
        </section>


{/* 02 — COMPETITOR OPPORTUNITIES */}
<section className="sp-section sp-competitor-dark">
  <div className="sp-container sp-reveal">

    <Eyebrow>02 / Competitor opportunities</Eyebrow>

    <h2>
 See how well your competitors answer those buying questions.
    </h2>

    <p className="sp-lead">We check which competitors rank for the searches we’ve identified, how thoroughly their pages answer buyers’ questions, and where your business has room to compete with more relevant content.</p>

    <div
      className="sp-competitor-table-scroll"
      tabIndex={0}
      role="region"
      aria-label="Illustrative competitor content opportunities"
    >
      <table className="sp-competitor-table">
        <caption className="sp-sr-only">
          Illustrative competitor content gaps and opportunities
        </caption>

        <thead>
          <tr>
            <th scope="col">Example Search theme</th>
            <th scope="col">What competitors cover</th>
            <th scope="col">Your potential opening</th>
          </tr>
        </thead>

        <tbody>
          {[
            {
              icon: "search" as const,
              theme: "Alternatives",
              coverage: "Feature comparisons with little detail on switching",
              opportunity: "Address migration timelines, costs and implementation risks",
            },
            {
              icon: "people" as const,
              theme: "Industry use cases",
              coverage: "Generic pages covering multiple industries",
              opportunity: "Build industry-specific pages around buyer workflows and requirements",
            },
            {
            icon: "pie" as const,
              theme: "ROI & pricing",
              coverage: "Pricing overviews without financial justification",
              opportunity: "Publish ROI models, TCO breakdowns and payback examples",
            },
          ].map((item) => (
            <tr key={item.theme}>
              <th scope="row">
                <span className="sp-competitor-theme">
                  <span className="sp-competitor-icon">
                    <Icon name={item.icon} />
                  </span>
                  <span>{item.theme}</span>
                </span>
              </th>

              <td>{item.coverage}</td>
              <td>{item.opportunity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="sp-competitor-cta">
      <strong>
        See where your content could outperform competitors.
      </strong>

      <Cta />
    </div>

  </div>
</section>




{/* 03 — KEYWORD PRIORITIES */}
<section className="sp-section sp-keyword-section">
  <div className="sp-container sp-reveal">
    <div className="sp-keyword-mint-panel">

            <Eyebrow>03 / Keyword & page priorities</Eyebrow>
            <h2>
Decide which pages to build, which to improve and how to allocate your SEO budget.
            </h2>

<p className="sp-lead">
 Some opportunities call for new content. Others are better addressed by strengthening pages you already have. We assess search demand, buying intent and competitive difficulty to recommend the most sensible next steps.
</p>

            <div className="sp-dashboard">
              <div className="sp-dashboard-heading">
                <h3>Your search opportunity shortlist</h3>
              <span className="sp-tag sp-neutral-tag">
  FinTech example · Wise Business
</span>
              </div>
              <div
                className="sp-tabs"
                role="tablist"
                aria-label="Keyword themes"
              >
                {keywordTabs.map((tab, i) => (
                  <button
                    type="button"
                    id={`${uid}-tab-${i}`}
                    role="tab"
                    key={tab}
                    aria-selected={tab === keywordTab}
                    aria-controls={`${uid}-keywords-panel`}
                    tabIndex={tab === keywordTab ? 0 : -1}
                    onClick={() => setKeywordTab(tab)}
                    onKeyDown={(e) => tabKey(e, i)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div
                id={`${uid}-keywords-panel`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${keywordTabs.indexOf(keywordTab)}`}
                tabIndex={0}
              >
                <div className="sp-table-scroll">
                  <table className="sp-table sp-keyword-table">
                    <caption className="sp-sr-only">
                      {keywordTab} example keyword priorities
                    </caption>
                   
                   
                  
<thead>
  <tr>
    <th scope="col">Target keyword</th>
    <th scope="col">Recommended page</th>
    <th scope="col">Action</th>
    <th scope="col">Priority</th>
  </tr>
</thead>

<tbody>
  {keywordSets[keywordTab].map((row) => (
    <tr key={row[0]}>
      <th scope="row">{row[0]}</th>

      <td>{row[1]}</td>

      <td>
        <span className={`sp-action sp-action-${row[2].toLowerCase()}`}>
          {row[2]}
        </span>
      </td>
<td>
  <span
    className={`sp-priority sp-priority-${row[3].toLowerCase()}`}
  >
    {row[3]}
  </span>
</td>
    </tr>
  ))}
</tbody>

                  </table>
                </div>
              </div>
              <div className="sp-dashboard-footer">
                <p className="sp-table-note" style={{ margin: 0 }}>
                  Final priorities depend on your market, existing pages and resources.
                </p>
                <Cta>Map my SEO priorities</Cta>
              </div>
            </div>
          </div>
        </div>
        </section>


{/* 04 — AI SEARCH VISIBILITY & AUTHORITY */}
<AiVisibilitySection />

    {/* 05 — ROADMAP & MEASUREMENT */}
<section
  className="sp-plan-timeline"
  aria-labelledby={`${uid}-roadmap-heading`}
>
  <div className="sp-container">
    <header className="sp-plan-timeline-intro">
      <Eyebrow>05 / Your 90-day roadmap & measurement</Eyebrow>

      <h2 id={`${uid}-roadmap-heading`}>
      Turn your SEO priorities into a 90-day plan your team can execute.
      </h2>

      <p>
With the opportunities mapped, we organise the work into a realistic 90-day schedule. You’ll see what needs to happen first, what your team should deliver each month and which metrics to use when reviewing progress.
      </p>
    </header>

    <div className="sp-plan-timeline-layout">
      <ol className="sp-plan-phases" aria-label="Your three-phase roadmap">
        {roadmap.map((item, index) => (
          <li className="sp-plan-phase" key={item.period}>
            <span className="sp-plan-phase-number" aria-hidden="true">
              {index + 1}
            </span>

            <div className="sp-plan-phase-heading">
              <span className="sp-plan-period">
                {item.period}
              </span>

              <h3>{item.title}</h3>
            </div>

            <div className="sp-plan-phase-copy">
              <p>
                <strong>Work:</strong> {item.work}
              </p>

              <p>
                <strong>Output:</strong> {item.output}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <aside
        className="sp-plan-signals"
        aria-labelledby={`${uid}-signals-heading`}
      >
        <h3 id={`${uid}-signals-heading`}>Signals to watch</h3>

        <p className="sp-plan-signals-intro">
       See whether your SEO efforts are attracting buyers and generating qualified demand.
        </p>

        <ol className="sp-plan-signal-list">
          {metrics.map((item, index) => (
            <li key={item.name}>
              <span className="sp-plan-signal-number" aria-hidden="true">
                {index + 1}
              </span>

              <div>
                <h4>{item.name}</h4>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </aside>
    </div>




  </div>
</section>
     
     
     {/* 10 — FAQ */}
<section
  className="sp-section sp-faq-section"
  aria-labelledby={`${uid}-faq-heading`}
>
  <div className="sp-container sp-faq-layout">
    <header className="sp-faq-intro">
      <Eyebrow>Your questions, answered</Eyebrow>

      <h2 id={`${uid}-faq-heading`}>
        A few useful things to know.
      </h2>

      <p>
        What’s included, what we’ll need and how your team
        can use the plan.
      </p>
    </header>

    <div className="sp-faqs">
      {faqs.map(([q, a], i) => (
        <div className="sp-faq" key={q}>
          <h3>
            <button
              type="button"
              id={`${uid}-question-${i}`}
              aria-expanded={openFaq === i}
              aria-controls={`${uid}-answer-${i}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span className="sp-faq-question-text">{q}</span>

              <span className="sp-faq-toggle" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </h3>

          <div
            id={`${uid}-answer-${i}`}
            role="region"
            aria-labelledby={`${uid}-question-${i}`}
            hidden={openFaq !== i}
          >
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        {/* 11 — REQUEST FORM */}
        <section id="request-plan" className="sp-section sp-dark sp-final">
          <div className="sp-container sp-final-grid">
            <div>
              <Eyebrow>Let’s map your next move</Eyebrow>
              <h2>Make your next SEO investment a more informed one.</h2>
           
         
<div
  className="sp-testimonial-slider"
  aria-label="Client testimonials"
>
  <div className="sp-testimonial-card">
    <div
      key={activeTestimonial}
      className="sp-testimonial-content"
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className="sp-testimonial-quote-mark"
        aria-hidden="true"
      >
        “
      </span>

      <blockquote className="sp-testimonial-quote">
        {testimonials[activeTestimonial].quote}
      </blockquote>

      <div className="sp-testimonial-author">
        <div className="sp-testimonial-avatar">
          {testimonials[activeTestimonial].image ? (
            <img
              src={testimonials[activeTestimonial].image!}
              alt=""
              width="48"
              height="48"
            />
          ) : (
            <span aria-hidden="true">
              {testimonials[activeTestimonial].name
                .charAt(0)}
            </span>
          )}
        </div>

        <div className="sp-testimonial-author-info">
          <strong>
            {testimonials[activeTestimonial].name}
          </strong>
          <span>
            {testimonials[activeTestimonial].role}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div
    className="sp-testimonial-navigation"
    aria-label="Testimonial controls"
  >
    <button
      type="button"
      className="sp-testimonial-arrow"
      onClick={() => changeTestimonial(-1)}
      aria-label="Previous testimonial"
    >
      <span aria-hidden="true">←</span>
    </button>

    <div className="sp-testimonial-dots">
      {testimonials.map((item, index) => (
        <button
          key={item.name}
          type="button"
          className={`sp-testimonial-dot ${
            activeTestimonial === index ? "active" : ""
          }`}
          onClick={() => setActiveTestimonial(index)}
          aria-label={`Show testimonial from ${item.name}`}
          aria-current={
            activeTestimonial === index ? "true" : undefined
          }
        />
      ))}
    </div>

    <button
      type="button"
      className="sp-testimonial-arrow"
      onClick={() => changeTestimonial(1)}
      aria-label="Next testimonial"
    >
      <span aria-hidden="true">→</span>
    </button>
  </div>
</div>

            </div>
            <div className="sp-request-card">
              {status === "success" ? (
                <div className="sp-success" role="status">
                  <span className="sp-icon-circle">
                    <Icon name="check" />
                  </span>
                  <h3>Your request is in.</h3>
                  <p>
                    Thanks, {name.trim()}. We’ve received your details for{" "}
                    {new URL(normaliseWebsite(website)!).hostname}.
                  </p>
                  <p>
                    GrowUp will follow up at <strong>{email}</strong> about your
                    SEO plan.
                  </p>
                  <a href={contactHref} className="sp-text-link">
                    Contact GrowUp <Icon name="arrow" />
                  </a>
                </div>
              ) : (
                <>
            <div className="sp-request-step-header">
  <div className="sp-request-step-label">
    <span className="sp-request-step-number" aria-hidden="true">
      {String(step).padStart(2, "0")}
    </span>

    <span className="sp-request-step-name">
      {step === 1 ? "Your company website" : "Your details & goals"}
    </span>
  </div>

  <div className="sp-request-step-status">
    <span>Step {step} of 2</span>

    <div className="sp-step-progress" aria-hidden="true">
      <span />
      <span className={step === 2 ? "sp-filled" : ""} />
    </div>
  </div>
</div>

<div className="sp-form-title">
  <h3>Build my free SEO plan</h3>
</div>
                  <form
                    onSubmit={submitRequest}
                    aria-label="Request your free SEO plan"
                  >
                    {step === 1 ? (
                      <>
                        <label htmlFor={`${uid}-website`}>
                          Company website
                        </label>
                        <input
                          ref={websiteRef}
                          id={`${uid}-website`}
                          value={website}
                          onChange={(e) => {
                            setWebsite(e.target.value);
                            setStatus("idle");
                          }}
                          placeholder="yourcompany.com"
                          required
                          autoComplete="url"
                          inputMode="url"
                          maxLength={2048}
                          aria-describedby={
                            status === "error" ? `${uid}-form-error` : undefined
                          }
                        />
                      </>
                    ) : (
                      <>
                        <div className="sp-website-summary">
                          <span>
                            <Icon name="link" />
                            {website}
                          </span>
                          <button
                            type="button"
                            disabled={status === "sending"}
                            onClick={() => {
                              setStep(1);
                              setStatus("idle");
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <label htmlFor={`${uid}-name`}>Your name</label>
                        <input
                          ref={contactRef}
                          id={`${uid}-name`}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          autoComplete="name"
                          maxLength={120}
                          disabled={status === "sending"}
                        />
                        <label htmlFor={`${uid}-email`}>Work email</label>
                        <input
                          id={`${uid}-email`}
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          required
                          autoComplete="email"
                          maxLength={254}
                          disabled={status === "sending"}
                        />
                        <label htmlFor={`${uid}-goal`}>Main growth goal</label>
                        <select
                          id={`${uid}-goal`}
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          disabled={status === "sending"}
                        >
                          {[
                            "More qualified demos",
                            "More product trials",
                            "Reach new buyers or markets",
                            "Improve AI search visibility",
                            "Prioritise our next SEO investment",
                          ].map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      <label htmlFor={`${uid}-market`}>
  Additional context{" "}
</label>
                   
<textarea
  id={`${uid}-market`}
  value={market}
  onChange={(e) => setMarket(e.target.value)}
  placeholder="Anything specific you'd like us to consider in your SEO plan?"
  rows={4}
  maxLength={1000}
  disabled={status === "sending"}
  className="sp-context-textarea"
/>

                      </>
                    )}
                    {status === "error" && (
                      <p
                        className="sp-error"
                        id={`${uid}-form-error`}
                        role="alert"
                      >
                        {error} <a href={contactHref}>Contact GrowUp</a>
                      </p>
                    )}
                    {status === "preview" && (
                      <div className="sp-preview-message" role="status">
                        <b>Preview complete — nothing has been sent.</b>
                        <p>
                          This form is not connected yet. Use{" "}
                          <a href={contactHref}>Contact GrowUp</a> to make an
                          enquiry.
                        </p>
                      </div>
                    )}
                    <button
                      className="sp-button sp-submit"
                      type="submit"
                      disabled={status === "sending"}
                    >
                      {status === "sending"
                        ? "Sending your request…"
                        : step === 1
                          ? "Continue to my free plan"
                          : configured
                            ? "Build my free SEO plan"
                            : "Preview my request"}
                      {status !== "sending" && <Icon name="arrow" />}
                    </button>
                    {!configured && (
                      <p className="sp-preview-note">
                        Preview mode · Requests are not sent.
                      </p>
                    )}
                    <p className="sp-form-privacy">
                      We’ll use your details to respond to your request.{" "}
                      <a href={privacyHref}>Privacy policy</a>.
                    </p>
          
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}




const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

.sp-page {
  --sp-dark: #052b2d;
  --sp-accent: #167273;
  --sp-mint: #edf5f2;
  --sp-ink: #082c35;
  --sp-muted: #4c626a;
  --sp-line: #d4e4e0;
  --sp-soft: #d8efea;
  background: #fff;
  color: var(--sp-ink);
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.65;
  isolation: isolate;
}

.sp-page * {
  box-sizing: border-box;
}

.sp-page h1,
.sp-page h2,
.sp-page h3,
.sp-page p,
.sp-page ul {
  margin: 0;
}

.sp-page button,
.sp-page input,
.sp-page select {
  font: inherit;
}

.sp-page button,
.sp-page a,
.sp-page input,
.sp-page select {
  -webkit-tap-highlight-color: transparent;
}

.sp-page button {
  cursor: pointer;
}

.sp-page a {
  color: inherit;
  text-decoration: none;
}

.sp-page button:disabled {
  cursor: wait;
  opacity: .65;
}

.sp-page button,
.sp-page a {
  touch-action: manipulation;
}

.sp-page [hidden] {
  display: none !important;
}

.sp-page :focus-visible {
  outline: 3px solid #35aaa1;
  outline-offset: 5px;
}

.sp-page [id] {
  scroll-margin-top: 100px;
}

.sp-page svg {
  flex-shrink: 0;
}

.sp-container {
  width: min(1280px, calc(100% - 96px));
  margin-inline: auto;
}

.sp-icon {
  width: 22px;
  height: 22px;
  display: inline-block;
  vertical-align: middle;
}

.sp-page h1 {
  font-size: clamp(38px, 4.1vw, 61px);
  font-weight: 800;
  letter-spacing: -.055em;
  line-height: 1.12;
}

.sp-page h2 {
  font-size: clamp(30px, 3.15vw, 46px);
  line-height: 1.18;
  font-weight: 800;
  letter-spacing: -.045em;
  max-width: 1120px;
  text-wrap: balance;
}

.sp-page h3 {
  font-size: 20px;
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: -.025em;
}

.sp-eyebrow {
  font-size: 11px !important;
  letter-spacing: .18em !important;
  text-transform: uppercase;
  font-weight: 500 !important;
  line-height: 1.5 !important;

  margin-bottom: 18px !important;
}

.sp-lead {
  font-size: 17px;
  line-height: 1.75;
  color: var(--sp-muted);
  max-width: 1030px;
  margin-top: 18px !important;
}

.sp-section {
  padding: 86px 0;
}

.sp-mint {
  background: var(--sp-mint);
}

.sp-dark {
  background: var(--sp-dark);
  color: #f4fbf9;
}

.sp-dark .sp-eyebrow {
  color: #a6d9d0;
}

.sp-dark .sp-lead {
  color: #bbd9d3;
}

.sp-three {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.sp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: var(--sp-accent);
  color: #fff !important;
  border: 1px solid var(--sp-accent);
  border-radius: 4px;
  padding: 15px 22px;
  min-height: 51px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
  transition: background .2s, transform .2s, box-shadow .2s;
}

.sp-button:hover {
  background: #105e60;
  box-shadow: 0 5px 16px #052b2d18;
  transform: translateY(-2px);
}

.sp-button .sp-icon {
  width: 18px;
  height: 18px;
}

.sp-text-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  line-height: 1.7;
  text-decoration: underline !important;
  text-underline-offset: 5px;
  font-weight: 600;
}

.sp-text-link:hover {
  color: var(--sp-accent);
}

.sp-tag {
  display: inline-flex;
  padding: 7px 11px;
  background: var(--sp-soft);
  color: #195e61;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  border-radius: 4px;
}

.sp-neutral-tag {
  background: #f0f3f6;
  color: #526372;
}

.sp-icon-circle {
  width: 54px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--sp-soft);
  color: var(--sp-accent);
  border-radius: 50%;
  flex-shrink: 0;
}

.sp-icon-circle .sp-icon {
  width: 26px;
  height: 26px;
}

.sp-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: var(--sp-soft);
  color: var(--sp-accent);
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.sp-example {
  font-size: 9px;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: #5e767c;
  margin: 30px 0 12px !important;
}

.sp-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  background: var(--sp-soft);
  border-radius: 50%;
  color: var(--sp-accent);
  flex-shrink: 0;
}

.sp-check .sp-icon {
  width: 15px;
  height: 15px;
}

.sp-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.sp-skip {
  position: fixed;
  top: -100px;
  left: 20px;
  z-index: 99;
  background: #fff;
  padding: 12px;
  color: var(--sp-dark) !important;
}

.sp-skip:focus {
  top: 10px;
}

/* Navigation and hero */
.sp-header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: var(--sp-dark);
  color: #fff;
  border-bottom: 1px solid #ffffff12;
}

.sp-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 88px;
  gap: 24px;
}

.sp-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: inherit;
  font-size: 25px;
  letter-spacing: -1px;
  font-weight: 800;
  line-height: 1.1;
  flex-shrink: 0;
}

.sp-brand img {
  object-fit: contain;
  max-height: 45px;
  width: auto;
  max-width: 160px;
}

.sp-brand-sub {
  display: block;
  font-size: 5px;
  letter-spacing: 1px;
  font-weight: 500;
  margin-top: 5px;
}

.sp-brand-mark {
  position: relative;
  font-size: 43px;
  font-weight: 500;
  letter-spacing: -5px;
  width: 36px;
  line-height: 1;
}

.sp-brand-mark span {
  position: absolute;
  background: #2c9d9b;
  border-radius: 100% 0 100% 0;
  bottom: 0;
  right: 0;
  width: 23px;
  height: 13px;
  transform: rotate(-20deg);
}

.sp-desktop-nav {
  display: flex;
  align-items: center;
  gap: 34px;
  font-size: 12px;
  font-weight: 600;
}

.sp-desktop-nav > a:not(.sp-nav-cta):hover {
  color: #a6d9d0;
}

.sp-nav-cta {
  display: flex;
  align-items: center;
  gap: 17px;
  border: 1px solid #769c99;
  border-radius: 3px;
  padding: 11px 18px;
}

.sp-nav-cta:hover {
  background: #ffffff0c;
}

.sp-menu-toggle {
  display: none;
  background: transparent;
  border: 1px solid #769c99;
  padding: 10px;
  color: #fff;
  border-radius: 4px;
}

.sp-mobile-nav {
  padding: 8px 24px 24px;
  display: grid;
  gap: 4px;
}

.sp-mobile-nav a {
  padding: 12px;
  border-bottom: 1px solid #ffffff15;
}

.sp-hero {
  background: var(--sp-dark);
  color: #fff;
  padding: 72px 0 78px;
}

.sp-hero-grid {
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  align-items: center;
  gap: 22px;
}

.sp-hero .sp-eyebrow {
  color: #1bacaf;
  margin-bottom: 25px !important;
}

.sp-hero-description {
  max-width: 580px;
  font-size: 22px;
  line-height: 1.75;
  color: #e2eeeb;
  margin-top: 31px !important;
}




.sp-hero-form {
  margin-top: 35px;
}

.sp-hero-form label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 8px;
}

.sp-hero-input-row {
  display: flex;
  gap: 8px;
  max-width: 660px;
}

.sp-hero-input-row > .sp-button {
  padding-inline: 15px;
  font-size: 11px;
  gap: 8px;
  flex-shrink: 0;
  white-space: nowrap;
}

.sp-input-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #dbe9e5;
  border-radius: 4px;
  color: #6d8288;
  min-width: 0;
  flex: 1;
  padding-left: 12px;
}

.sp-input-icon .sp-icon {
  width: 18px;
  height: 18px;
}

.sp-input-icon input {
  width: 100%;
  min-width: 0;
  border: 0;
  background: transparent;
  color: var(--sp-ink);
  padding: 14px 9px 14px 0;
  font-size: 12px;
  border-radius: 4px;
}

.sp-input-icon:focus-within {
  outline: 3px solid #35aaa1;
  outline-offset: 3px;
}

.sp-input-icon input:focus {
  outline: none;
}

.sp-micro {
  font-size: 9px;
  color: #c2d9d5;
  margin-top: 10px !important;
}

.sp-hero-art {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sp-hero-art > img {
  display: block;
  width: 112%;
  max-width: none;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: contain;
  filter: drop-shadow(0 25px 22px #0002);
}

.sp-hero-fallback {
  padding: 34px;
  background: #fff;
  color: var(--sp-ink);
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 25px 45px #00181970;
}

.sp-hero-fallback h2 {
  font-size: 29px;
  margin: 18px 0;
}

.sp-hero-fallback > div {
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid var(--sp-line);
  border-radius: 6px;
  padding: 22px 15px;
  margin: 10px 0;
}

.sp-hero-fallback > div > b {
  color: var(--sp-accent);
  font-size: 23px;
}

.sp-hero-fallback > div > strong {
  flex: 1;
  font-size: 13px;
}

.sp-hero-fallback > p {
  background: var(--sp-mint);
  padding: 15px;
  font-size: 11px;
  margin-top: 20px;
}

/* Proof and buyer cards */
.sp-proof {
  background: var(--sp-mint);
  padding: 36px 0 24px;
}

.sp-proof-grid {
  display: grid;
  grid-template-columns: 1.05fr 1.1fr 1fr 1.15fr .9fr;
  align-items: center;
}

.sp-proof-grid > p {
  font-size: 12px;
  line-height: 1.6;
  font-weight: 700;
}

.sp-proof-grid > div {
  padding: 0 22px;
  text-align: center;
  border-left: 1px solid #c5dcd6;
}

.sp-proof-grid strong {
  display: block;
  font-size: clamp(29px, 3.3vw, 46px);
  line-height: 1.1;
  letter-spacing: -.055em;
  color: #07575a;
  font-weight: 800;
}

.sp-proof-grid span {
  display: block;
  font-size: 10px;
  margin-top: 9px;
}

.sp-proof-grid > a {
  justify-self: end;
  font-size: 10px;
}

.sp-proof-grid > a .sp-icon {
  width: 15px;
}


.sp-card {
  border: 1px solid var(--sp-line);
  background: #fff;
  border-radius: 7px;
  padding: 26px;
  color: var(--sp-ink);
}

.sp-buyer {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 13px;
  line-height: 1.8;
  transition: border-color .2s, box-shadow .2s;
}

.sp-buyer:hover {
  border-color: #6daca4;
  box-shadow: 0 8px 20px #052b2d08;
}

.sp-card-heading {
  display: flex;
  align-items: center;
  gap: 16px;
  line-height: 1.4;
}

.sp-card-heading strong {
  font-size: 15px;
  letter-spacing: -.025em;
}

.sp-card-rule {
  display: block;
  height: 1px;
  width: 100%;
  background: var(--sp-line);
  margin: 19px 0 13px;
}

.sp-buyer > span:not(.sp-card-heading):not(.sp-card-rule) {
  margin-top: 5px;
}

.sp-buyer b {
  font-weight: 600;
}

.sp-buyer-more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--sp-accent);
  font-size: 10px;
  font-weight: 600;
  padding-top: 14px;
}

.sp-buyer-more .sp-icon {
  width: 16px;
  height: 16px;
}

.sp-buyer[aria-expanded=true] .sp-buyer-more .sp-icon {
  transform: rotate(180deg);
}

.sp-buyer-detail {
  display: block;
  border-top: 1px solid var(--sp-line);
  padding-top: 12px;
  color: var(--sp-muted);
  font-size: 12px;
}

.sp-selected {
  border-color: var(--sp-accent) !important;
  box-shadow: 0 0 0 1px var(--sp-accent);
}




/* Tables and keyword panel */
.sp-table-scroll {
  overflow-x: auto;
  border: 1px solid var(--sp-line);
  border-radius: 6px;
  background: #fff;
}

.sp-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 12px;
  min-width: 650px;
}

.sp-table th,
.sp-table td {
  padding: 18px 22px;
  vertical-align: middle;
  border-bottom: 1px solid #e6eeeb;
  line-height: 1.65;
}

.sp-table thead th {
  font-size: 10px;
  font-weight: 700;
  background: #f9fbfa;
  white-space: nowrap;
}

.sp-table tbody th {
  font-weight: 600;
}

.sp-table td {
  color: #465d66;
}

.sp-table tr:last-child td,
.sp-table tr:last-child th {
  border-bottom: 0;
}

.sp-table tbody tr:hover {
  background: #f5faf8;
}

.sp-section-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 30px;
  padding-top: 26px;
  border-top: 1px solid #bcd6ce;
}

.sp-section-cta > strong {
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -.03em;
}

.sp-dashboard-footer .sp-button {
  font-size: 11px;
  background: var(--sp-dark);
  border-color: var(--sp-dark);
}



/* ======================================
   03 — PREMIUM KEYWORD PRIORITIES
====================================== */

/* White outer background */
.sp-keyword-section {
  background: #ffffff !important;
  padding: 85px 0;
  border: none;
}

/* Large mint container */
.sp-keyword-mint-panel {
  background: #edf5f2;
  border: 1px solid #e4f0eb;
  border-radius: 0;
  padding: 55px 65px;
  width: 100%;
}

/* Eyebrow */
.sp-keyword-section .sp-eyebrow {
  color: #167273;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: .16em !important;
  margin-bottom: 20px !important;
}

/* Main heading */
.sp-keyword-section h2 {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  color: #011522;
  font-size: clamp(32px, 3.2vw, 46px);
  line-height: 1.13;
  font-weight: 800;
  letter-spacing: -.045em;
  max-width: 1250px;
}

/* Supporting copy */
.sp-keyword-section > .sp-container
.sp-keyword-mint-panel > .sp-lead {
  color: #011522;
  font-size: 19px;

  line-height: 1.8;
  max-width: 1250px;
  margin-top: 20px !important;
}

/* White dashboard */
.sp-keyword-section .sp-dashboard {
  margin-top: 32px;
  background: #ffffff;
  border: 1px solid #e1ebe8;
  border-radius: 10px;
  padding: 38px 42px;
  box-shadow:
    0 10px 30px rgba(5, 43, 45, .025);
}

/* Dashboard heading */
.sp-keyword-section .sp-dashboard-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
}

.sp-keyword-section .sp-dashboard-heading h3 {
  color: #082c35;
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -.035em;
  line-height: 1.3;
}

/* Illustrative example tag */
.sp-keyword-section .sp-neutral-tag {
  background: #f0f3f6;
  color: #526574;
  border: none;
  border-radius: 4px;
  padding: 8px 14px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
}

/* Tabs */
.sp-keyword-section .sp-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  border-bottom: 1px solid #d2e4df;
  padding-bottom: 12px;
  margin-bottom: 14px;
}

.sp-keyword-section .sp-tabs button {
  background: #f5f7f7;
  color: #415960;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 13px 22px;
  font-size: 14px;
  font-weight: 700;
  transition: background .2s ease,
              color .2s ease;
}

.sp-keyword-section
.sp-tabs button[aria-selected="true"] {
  background: #f5f7f7;
  color: #167273;
  border-color: transparent;
  border-radius: 0;
  box-shadow: inset 0 -2px #167273;
}

.sp-keyword-section .sp-tabs button:not([aria-selected="true"]):hover {
  background: #e0f3ee;
}

/* Table */
.sp-keyword-section .sp-keyword-table {
  width: 100%;
  min-width: 860px;
  border-collapse: collapse;
}
/* Table header */
.sp-keyword-section
.sp-keyword-table thead th {
  background: #f1f4f5;
  color: #011522;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .09em;
  text-transform: uppercase;
  text-align: left;
  padding: 20px 24px;
  border-bottom: 1px solid #e5eceb;
}

/* Bold keyword themes */
.sp-keyword-section
.sp-keyword-table tbody th {
  color: #011522;
  font-weight: 800;
  font-size: 16px;
  text-align: left;
  padding: 24px;
}

/* Other columns */
.sp-keyword-section
.sp-keyword-table tbody td {
  color: #1d3a43;
  font-weight: 500;
  font-size: 16px;
  padding: 24px;
}

/* Hover */
.sp-keyword-section
.sp-keyword-table tbody tr:hover {
  background: #f7fbf9;
}

/* Table container */
.sp-keyword-section
.sp-dashboard .sp-table-scroll {
  border: 0;
  border-radius: 0;
  overflow-x: auto;
}

/* Priority badges */

.sp-keyword-section .sp-priority {
  display: inline-block;
  min-width: 76px;
  padding: 4px 12px;
  border: 1px solid transparent;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
}

/* High priority — soft red */
.sp-keyword-section .sp-priority-high {
  background: #fce8e8;
  border-color: #efc1c1;
  color: #a43737;
}

/* Medium priority — soft yellow */
.sp-keyword-section .sp-priority-medium {
  background: #fff4d6;
  border-color: #ebd79b;
  color: #926a16;
}

/* Low priority — soft green */
.sp-keyword-section .sp-priority-low {
  background: #e6f4ed;
  border-color: #b9ddc9;
  color: #28734f;
}




/* Note below table */
.sp-keyword-section .sp-table-note {
  font-size: 15px;
color: #011522;
  line-height: 1.7;
  margin-top: 18px !important;
}

/* Dashboard footer */
.sp-keyword-section .sp-dashboard-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-top: 1px solid #d6e5e1;
  padding-top: 20px; /* Reduced from 24px */
  margin-top: 10px;  /* Reduced from 22px */
}

.sp-keyword-section .sp-table-note {
  max-width: 600px;
}

/* CTA */
.sp-keyword-section
.sp-dashboard-footer .sp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 56px;
  background: #052b2d;
  border: 1px solid #052b2d;
  border-radius: 5px;
  color: #fafafa !important;
  padding: 15px 28px;
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
  transition: background .2s ease,
              transform .2s ease;
}

.sp-keyword-section
.sp-dashboard-footer .sp-button:hover {
  background: #167273;
  border-color: #167273;
  color: #fafafa !important;
  transform: translateY(-2px);
}



 

.sp-ai-grid {
  display: grid;
  grid-template-columns: 1.08fr .9fr;
  column-gap: 90px;
  row-gap: 40px;
  align-items: center;
}

.sp-ai-grid h2 {
  font-size: clamp(30px, 3.2vw, 44px);
}

.sp-ai-grid .sp-lead {
  font-size: 16px;
}

.sp-ai-list {
  display: grid;
  gap: 24px;
  margin-top: 34px;
}

.sp-ai-list > div {
  display: flex;
  align-items: flex-start;
  gap: 17px;
}

.sp-ai-list .sp-number {
  background: #1a4c4c;
  color: #b7e3d9;
  font-size: 14px;
  width: 34px;
  height: 34px;
  border: 1px solid #3c6c67;
}

.sp-ai-list h3 {
  font-size: 15px;
  letter-spacing: -.01em;
}

.sp-ai-list p {
  font-size: 13px;
  color: #bfdad4;
  margin-top: 4px;
}

.sp-ai-art {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.sp-ai-art > .sp-tag {
  background: #e9f2ef;
}

.sp-ai-document {
  background: #fff;
  color: var(--sp-ink);
  padding: 32px;
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 20px 32px #0003;
  transform: rotate(1deg);
}

.sp-ai-document h3 {
  font-size: 20px;
  margin-bottom: 15px;
}

.sp-document-row {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #e5ece9;
  padding: 20px 0;
}

.sp-document-row:last-child {
  border-bottom: 0;
}

.sp-document-row > div {
  flex: 1;
  min-width: 0;
}

.sp-document-row b {
  font-size: 12px;
  display: block;
  margin-bottom: 13px;
}

.sp-skeleton {
  display: block;
  height: 7px;
  background: #e5e9ee;
  width: 90%;
  margin-top: 8px;
  border-radius: 4px;
}

.sp-skeleton-0 {
  width: 68%;
}

.sp-skeleton-1 {
  width: 79%;
}

.sp-ai-note {
  grid-column: 1/-1;
  border-top: 1px solid #ffffff28;
  padding-top: 23px;
  color: #b1cfc7;
  font-size: 10px;
}

.sp-authority {
  margin-top: 35px;
  gap: 28px;
}

.sp-authority article {
  display: flex;
  align-items: flex-start;
  gap: 17px;
}

.sp-authority article + article {
  border-left: 1px solid #bdd6cf;
  padding-left: 26px;
}

.sp-authority h3 {
  font-size: 14px;
  letter-spacing: -.01em;
}

.sp-authority p {
  font-size: 12px;
  line-height: 1.7;
  color: #48646b;
  margin-top: 6px;
}

.sp-authority .sp-icon-circle {
  width: 47px;
  height: 47px;
}

/* Roadmap, measurement and process */
.sp-roadmap {
  gap: 30px;
  margin-top: 40px;
}

.sp-roadmap-item {
  position: relative;
  border-top: 1px solid #72aaa4;
  padding-top: 0;
}

.sp-roadmap-item button {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border: 0;
  text-align: left;
  background: transparent;
  color: inherit;
  width: 100%;
  padding: 0 0 13px;
}

.sp-roadmap-dot {
  display: flex;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--sp-dark);
  color: #fff;
  align-items: center;
  justify-content: center;
  margin-top: -18px;
  margin-bottom: 25px;
  box-shadow: 0 0 0 6px #fff;
  font-size: 14px;
  transition: background .2s;
}

.sp-roadmap-item button:hover .sp-roadmap-dot,
.sp-roadmap-active .sp-roadmap-dot {
  background: var(--sp-accent);
  box-shadow: 0 0 0 6px #e5f4ef;
}

.sp-roadmap-item .sp-eyebrow {
  font-size: 10px !important;
  margin-bottom: 7px !important;
}

.sp-roadmap-item button strong {
  font-size: 20px;
  letter-spacing: -.035em;
  line-height: 1.4;
}

.sp-roadmap-item ul {
  padding: 0;
  list-style: none;
  display: grid;
  gap: 11px;
  font-size: 12px;
  color: #4b626a;
}

.sp-roadmap-item li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.sp-phase-output {
  margin-top: 28px;
  padding: 17px 20px;
  background: #f4f8f6;
  border-left: 3px solid var(--sp-accent);
  font-size: 12px;
}

.sp-phase-output b {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: .04em;
}

.sp-phase-output p {
  margin-top: 4px;
  color: var(--sp-muted);
}

.sp-centered-note {
  text-align: center;
  font-size: 10px;
  color: #5a727a;
  margin-top: 23px !important;
}

.sp-roadmap-summary {
  display: flex;
  align-items: center;
  gap: 15px;
  background: var(--sp-mint);
  padding: 23px;
  border-radius: 6px;
  margin-top: 22px;
}

.sp-roadmap-summary > strong {
  flex: 1;
  font-size: 13px;
}

.sp-roadmap-summary > a {
  font-size: 11px;
  color: var(--sp-accent);
}

.sp-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.sp-metrics button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 13px;
  background: #fff;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 22px 16px;
  color: var(--sp-ink);
  text-align: left;
  transition: border-color .2s;
}

.sp-metrics button:hover {
  border-color: #75aaa0;
}

.sp-metrics button:not(:last-child):after {
  content: '';
  position: absolute;
  width: 20px;
  height: 1px;
  background: #4f8d84;
  right: -21px;
  top: 50%;
}

.sp-metrics .sp-icon-circle {
  width: 44px;
  height: 44px;
}

.sp-metrics .sp-icon {
  width: 22px;
  height: 22px;
}

.sp-metrics b {
  display: block;
  font-size: 9px;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.sp-metrics button > span > span {
  display: block;
  font-size: 10px;
  line-height: 1.6;
  margin-top: 7px;
  color: #4a626d;
}

.sp-metric-detail {
  background: #fff;
  border-left: 3px solid var(--sp-accent);
  padding: 19px 23px;
  margin-top: 19px;
  font-size: 12px;
}

.sp-metric-detail p {
  color: var(--sp-muted);
  margin-top: 5px;
}

.sp-process {
  margin-top: 33px;
  gap: 26px;
}

.sp-process article {
  display: flex;
  gap: 19px;
}

.sp-process article + article {
  border-left: 1px solid var(--sp-line);
  padding-left: 24px;
}

.sp-process article > span {
  font-size: 45px;
  font-weight: 500;
  color: var(--sp-accent);
  line-height: 1;
  letter-spacing: -.05em;
}

.sp-process h3 {
  font-size: 14px;
  letter-spacing: -.02em;
}

.sp-process p {
  font-size: 12px;
  color: var(--sp-muted);
  margin-top: 9px;
}

.sp-process-note {
  padding: 23px 26px;
  background: var(--sp-mint);
  border-radius: 6px;
  color: #50666d;
  font-size: 12px;
  line-height: 1.8;
  margin-top: 30px !important;
}

/* FAQ and final form */
/* =========================================
   FAQ — MINIMAL WHITE SECTION
   ========================================= */

.sp-page .sp-faq-section {
  padding: 90px 0;
  background: #ffffff;
  color: #011522;
}

.sp-page .sp-faq-section > .sp-container {
  width: min(1380px, calc(100% - 104px));
  max-width: none;
  margin-inline: auto;
  border-top: 1px solid #ecf5f2; /* Added border here */
  padding-top: 90px; /* Added padding to account for the border */
  margin-top: -50px;
}

.sp-page .sp-faq-layout {
  display: grid;
  grid-template-columns: minmax(0, .85fr) minmax(0, 1.4fr);
  align-items: start;
  gap: 90px;
}

/* Left introduction */

.sp-page .sp-faq-intro .sp-eyebrow {
  margin: 0 0 20px !important;
  color: #167273;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: .15em !important;
}

.sp-page .sp-faq-intro h2 {
  max-width: 440px;
  margin: 0;
  color: #011522;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif !important;
  font-size: clamp(36px, 3.4vw, 50px); /* Increased size */
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -.04em;
  text-wrap: balance;
}

.sp-page .sp-faq-intro > p {
  max-width: 380px;
  margin: 22px 0 0;
  color: #011522;
  font-size: 17px;
  line-height: 1.8;
}

/* Accordion */

.sp-page .sp-faqs {
  min-width: 0;
  margin: 0;
  border-top: 1px solid #d6e4df;
}

.sp-page .sp-faq {
  background: transparent;
  border-bottom: 1px solid #d6e4df;
}

.sp-page .sp-faq h3 {
  margin: 0;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif !important;
  font-size: 19px; /* Increased from 17px */
  line-height: 1.6;
  letter-spacing: -.015em;
}

.sp-page .sp-faq button {
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  margin: 0;
  padding: 27px 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  color: #011522;
  font: inherit;
  font-weight: 650;
  text-align: left;
  cursor: pointer;
  transition: color .2s ease;
}

.sp-page .sp-faq button:hover,
.sp-page .sp-faq button[aria-expanded="true"] {
  color: #167273;
}

.sp-page .sp-faq button:focus-visible {
  outline: 2px solid #167273;
  outline-offset: 5px;
  border-radius: 3px;
}

.sp-page .sp-faq-question-text {
  min-width: 0;
}

/* Quiet mint plus/minus control */

.sp-page .sp-faq-toggle {
  position: relative;
  display: inline-flex;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #edf6f3;
  color: #167273;
  transition: background .2s ease, color .2s ease;
}

.sp-page .sp-faq-toggle > span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 1.5px;
  border-radius: 1px;
  background: currentColor;
  transform: translate(-50%, -50%);
}

.sp-page .sp-faq-toggle > span:last-child {
  transform: translate(-50%, -50%) rotate(90deg);
  transition: transform .2s ease, opacity .2s ease;
}

.sp-page .sp-faq button[aria-expanded="true"] .sp-faq-toggle {
  background: #167273;
  color: #fafafa;
}

.sp-page .sp-faq button[aria-expanded="true"]
.sp-faq-toggle > span:last-child {
  transform: translate(-50%, -50%) rotate(0deg);
  opacity: 0;
}

/* Answer copy */

.sp-page .sp-faq > div[hidden] {
  display: none;
}

.sp-page .sp-faq > div > p {
  max-width: 100%; /* Changed from 660px to allow full width */
  margin: 0;
  padding: 0 56px 28px 0;
  color: #011522;
  font-size: 17px;
  line-height: 1.85;
}

/* Tablet */

@media (max-width: 1100px) {
  .sp-page .sp-faq-section > .sp-container {
    width: calc(100% - 64px);
  }

  .sp-page .sp-faq-layout {
    grid-template-columns: minmax(0, .85fr) minmax(0, 1.4fr);
    gap: 45px;
  }
}

/* Mobile */

@media (max-width: 800px) {
  .sp-page .sp-faq-section {
    padding: 60px 0;
  }

  .sp-page .sp-faq-section > .sp-container {
    width: calc(100% - 40px);
  }

  .sp-page .sp-faq-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .sp-page .sp-faq-intro h2 {
    max-width: 540px;
    font-size: clamp(30px, 5vw, 38px);
  }

  .sp-page .sp-faq-intro > p {
    max-width: 500px;
    margin-top: 16px;
  }

  .sp-page .sp-faq h3 {
    font-size: 18px; /* Increased from 16px */
  }

  .sp-page .sp-faq button {
    padding: 23px 0;
  }
}

@media (max-width: 480px) {
  .sp-page .sp-faq button {
    gap: 16px;
  }

  .sp-page .sp-faq > div > p {
    padding-right: 0;
    font-size: 16px; /* Increased from 14px */
  }
}

.sp-final-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 90px;
  align-items: center;
}

.sp-final h2 {
  font-size: clamp(34px, 3.6vw, 53px);
  max-width: 620px;
}

.sp-final .sp-lead {
  font-size: 16px;
  max-width: 580px;
}

.sp-final-benefits {
  list-style: none;
  padding: 0;
  margin-top: 30px !important;
  display: grid;
  gap: 13px;
  font-size: 12px;
  color: #bdd9d3;
}

.sp-final-benefits li {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sp-final-benefits .sp-icon {
  color: #9fd8cc;
  width: 18px;
}

.sp-request-card {
  background: #fff;
  border: 1px solid #d3e4de;
  border-radius: 8px;
  padding: 32px;
  color: var(--sp-ink);
  box-shadow: 0 20px 35px #001b1d30;
}

.sp-form-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.sp-form-title h3 {
  font-size: 23px;
  font-weight: 800;
  line-height: 1.25;
}

.sp-form-title > span {
  font-size: 9px;
  white-space: nowrap;
  color: #59737a;
}

.sp-step-progress {
  display: flex;
  gap: 7px;
  margin: 20px 0 24px;
}

.sp-step-progress span {
  height: 3px;
  flex: 1;
  background: #e4eeea;
}

.sp-step-progress span:first-child,
.sp-step-progress .sp-filled {
  background: var(--sp-accent);
}

.sp-request-card label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  margin: 15px 0 6px;
}

.sp-request-card input,
.sp-request-card select {
  border: 1px solid #ccdadb;
  background: #fff;
  border-radius: 4px;
  min-height: 46px;
  padding: 11px 13px;
  color: var(--sp-ink);
  font-size: 12px;
  width: 100%;
  min-width: 0;
}

.sp-request-card input::placeholder {
  color: #75878c;
}

.sp-request-card select {
  cursor: pointer;
}

.sp-optional {
  font-weight: 400;
  color: #637c82;
}

.sp-field-help {
  font-size: 10px;
  color: #667d83;
  margin-top: 9px !important;
}

.sp-website-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--sp-mint);
  padding: 10px 12px;
  border-radius: 4px;
  font-size: 11px;
}

.sp-website-summary > span {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow-wrap: anywhere;
  flex: 1;
}

.sp-website-summary .sp-icon {
  width: 15px;
}

.sp-website-summary button {
  background: none;
  border: 0;
  padding: 5px;
  font-size: 10px;
  font-weight: 600;
  text-decoration: underline;
  color: var(--sp-accent);
}

.sp-submit {
  width: 100%;
  margin-top: 22px;
  min-height: 51px;
}

.sp-form-privacy {
  font-size: 9px;
  text-align: center;
  color: #637980;
  margin-top: 13px !important;
  line-height: 1.8;
}

.sp-form-privacy a {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.sp-no-obligation {
  font-size: 10px;
  text-align: center;
  margin-top: 11px !important;
  color: #306367;
}

.sp-error {
  color: #a72b33;
  font-size: 11px;
  margin-top: 12px !important;
}

.sp-error a {
  text-decoration: underline;
}

.sp-error-dark {
  color: #ffcbc7;
}

.sp-preview-note {
  font-size: 9px;
  margin-top: 10px !important;
  text-align: center;
  color: #6c7078;
}

.sp-preview-message {
  background: #f5f6f1;
  border-left: 3px solid #89824a;
  padding: 12px;
  font-size: 11px;
  margin-top: 18px;
}

.sp-preview-message p {
  margin-top: 5px;
}

.sp-preview-message a {
  text-decoration: underline;
}

.sp-success {
  text-align: center;
  padding: 20px 0;
}

.sp-success > .sp-icon-circle {
  margin-bottom: 19px;
}

.sp-success h3 {
  font-size: 26px;
}

.sp-success p {
  font-size: 13px;
  margin-top: 16px;
  overflow-wrap: anywhere;
  color: var(--sp-muted);
}

.sp-success a {
  margin-top: 25px;
}

 

/* Responsive and motion */
@keyframes sp-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.sp-hero-copy {
  animation: sp-rise .65s ease-out both;
}

.sp-observed:not(.sp-visible) {
  opacity: 0;
  transform: translateY(18px);
}

.sp-observed {
  transition: opacity .55s ease, transform .55s ease;
}

.sp-visible {
  opacity: 1;
  transform: none;
}

@media (min-width: 1600px) {
  .sp-container {
    width: min(1340px, calc(100% - 120px));
  }
}

@media (max-width: 1100px) {
  .sp-container {
    width: calc(100% - 64px);
  }

  .sp-desktop-nav {
    gap: 21px;
  }

  .sp-hero-grid {
    gap: 12px;
  }

  .sp-hero-input-row {
    flex-wrap: wrap;
  }

  .sp-hero-input-row > .sp-input-icon {
    flex-basis: 100%;
  }

  .sp-hero-input-row > .sp-button {
    width: 100%;
  }

  .sp-hero-art > img {
    width: 108%;
  }

  .sp-hero h1 {
    font-size: 46px;
  }



  .sp-three {
    gap: 17px;
  }

  .sp-card {
    padding: 21px;
  }

  .sp-card-heading {
    gap: 11px;
  }

  .sp-card-heading .sp-icon-circle {
    width: 42px;
    height: 42px;
  }

  .sp-card-heading strong {
    font-size: 13px;
  }

  .sp-dashboard-footer {
    flex-wrap: wrap;
  }

  .sp-ai-grid,
  .sp-final-grid {
    column-gap: 45px;
  }

  .sp-proof-grid > div {
    padding: 0 13px;
  }

  .sp-metrics {
    gap: 12px;
  }

  .sp-metrics button {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 20px;
  }

  .sp-metrics button:not(:last-child):after {
    width: 12px;
    right: -13px;
  }

  .sp-authority article {
    gap: 12px;
  }

  .sp-authority article + article {
    padding-left: 15px;
  }

  .sp-process article {
    gap: 13px;
  }

  .sp-process article + article {
    padding-left: 15px;
  }

  .sp-process article > span {
    font-size: 37px;
  }
}

@media (max-width: 800px) {
  .sp-section {
    padding: 64px 0;
  }

  .sp-page h2 {
    font-size: 34px;
  }

  .sp-lead {
    font-size: 15px;
  }

  .sp-container {
    width: calc(100% - 40px);
  }

  .sp-nav {
    min-height: 76px;
  }

  .sp-desktop-nav {
    display: none;
  }

  .sp-menu-toggle {
    display: inline-flex;
  }

  .sp-hero {
    padding: 55px 0 45px;
  }

  .sp-hero-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .sp-hero-copy {
    max-width: 660px;
  }

  .sp-hero h1 {
    font-size: clamp(37px, 6.5vw, 53px);
    max-width: 620px;
  }

  .sp-hero-art {
    max-width: 570px;
    margin: auto;
  }

  .sp-hero-art > img {
    width: 100%;
    max-width: 100%;
  }

  .sp-hero-input-row {
    flex-wrap: nowrap;
  }

  .sp-hero-input-row > .sp-input-icon {
    flex-basis: auto;
  }

  .sp-hero-input-row > .sp-button {
    width: auto;
    padding-inline: 20px;
  }

 
  .sp-proof-grid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 22px;
  }

  .sp-proof-grid > p {
    grid-column: 1/-1;
    text-align: center;
  }

  .sp-proof-grid > p br {
    display: none;
  }

  .sp-proof-grid > div:nth-child(2) {
    border-left: 0;
  }

  .sp-proof-grid > a {
    grid-column: 1/-1;
    justify-self: center;
  }

  .sp-proof-grid > a br {
    display: none;
  }

  .sp-proof-grid strong {
    font-size: 36px;
  }

  .sp-three {
    grid-template-columns: 1fr;
  }

  .sp-buyer-grid {
    gap: 13px;
  }

  .sp-buyer {
    padding: 22px;
  }

  .sp-card-heading strong {
    font-size: 16px;
  }

  .sp-buyer .sp-card-rule {
    margin: 15px 0 8px;
  }

  .sp-buyer-more {
    padding-top: 8px;
  }

 

  .sp-page-cards {
    gap: 17px;
  }

  .sp-page-card {
    padding: 25px;
  }

  .sp-page-card ul {
    margin-top: 20px !important;
    gap: 14px;
  }

  .sp-page-summary {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .sp-page-summary > p {
    min-width: 70%;
  }

  .sp-ai-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .sp-ai-art {
    max-width: 480px;
    width: 100%;
    margin-inline: auto;
  }

  .sp-ai-note {
    grid-column: auto;
  }

  .sp-ai-grid h2 {
    font-size: 34px;
  }

  .sp-authority article + article {
    padding: 20px 0 0;
    border-left: 0;
    border-top: 1px solid #bdd6cf;
  }

  .sp-authority article {
    gap: 17px;
  }

  .sp-authority h3 {
    font-size: 16px;
  }

  .sp-authority p {
    font-size: 13px;
  }

  .sp-section-cta {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }

  .sp-section-cta > strong {
    font-size: 20px;
  }

  .sp-roadmap {
    gap: 29px;
    padding-top: 8px;
  }

  .sp-roadmap-item {
    border-top: 0;
    border-left: 1px solid #72aaa4;
    padding-left: 24px;
    margin-left: 17px;
  }

  .sp-roadmap-item button {
    padding-bottom: 13px;
  }

  .sp-roadmap-dot {
    position: absolute;
    left: -18px;
    top: 3px;
    margin: 0;
    width: 34px;
    height: 34px;
  }

  .sp-roadmap-item .sp-eyebrow {
    margin-bottom: 6px !important;
    padding-left: 5px;
  }

  .sp-roadmap-item button strong {
    padding-left: 5px;
  }

  .sp-roadmap-item ul {
    padding-left: 5px;
  }

  .sp-roadmap-summary {
    flex-wrap: wrap;
  }

  .sp-roadmap-summary > strong {
    min-width: 75%;
    font-size: 12px;
  }

  .sp-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .sp-metrics button {
    flex-direction: row;
    align-items: center;
    padding: 19px 15px;
  }

  .sp-metrics button:after {
    display: none;
  }

  .sp-metrics button > span > span {
    font-size: 11px;
  }

  .sp-process article + article {
    border-left: 0;
    padding: 22px 0 0;
    border-top: 1px solid var(--sp-line);
  }

  .sp-process article {
    gap: 22px;
  }

  .sp-process h3 {
    font-size: 16px;
  }

  .sp-process p {
    font-size: 13px;
  }

  .sp-process article > span {
    font-size: 42px;
    min-width: 50px;
  }

  .sp-faq-section {
    padding-top: 0;
  }

  .sp-final-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .sp-final h2 {
    font-size: 39px;
  }

  .sp-request-card {
    max-width: 600px;
    width: 100%;
  }

  .sp-footer > .sp-container {
    flex-wrap: wrap;
    gap: 17px;
  }

  .sp-footer nav {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
  }

  .sp-footer p {
    margin-left: auto;
  }
}

@media (max-width: 480px) {
  .sp-page h2 {
    font-size: 30px;
  }

  .sp-hero h1 {
    font-size: 38px;
  }

  .sp-hero-description {
    font-size: 15px;
  }


  .sp-hero-input-row {
    flex-direction: column;
  }

  .sp-hero-input-row > .sp-button {
    width: 100%;
    font-size: 12px;
  }

  .sp-hero-form {
    margin-top: 28px;
  }

  .sp-proof-grid strong {
    font-size: 29px;
  }

  .sp-proof-grid span {
    font-size: 8px;
  }

  .sp-proof-grid > div {
    padding-inline: 8px;
  }

  .sp-section {
    padding: 54px 0;
  }

  .sp-dashboard {
    padding: 18px;
    margin-top: 25px;
  }

  .sp-dashboard-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .sp-dashboard-heading h3 {
    font-size: 18px;
  }

  .sp-tabs {
    gap: 5px;
  }

  .sp-tabs button {
    padding: 8px;
    font-size: 10px;
  }

  .sp-factors {
    flex-wrap: wrap;
    gap: 14px;
  }

  .sp-factors > span + span {
    padding-left: 0;
    border: 0;
  }

  .sp-dashboard-footer .sp-button {
    width: 100%;
  }

  .sp-ai-document {
    padding: 24px;
    transform: none;
  }

  .sp-ai-document h3 {
    font-size: 18px;
  }

  .sp-metrics button {
    align-items: flex-start;
    flex-direction: column;
    padding: 17px;
  }

  .sp-metrics button > span > span {
    font-size: 10px;
  }

  .sp-final h2 {
    font-size: 35px;
  }

  .sp-request-card {
    padding: 23px;
  }

  .sp-form-title h3 {
    font-size: 21px;
  }

  .sp-page .sp-form-title > span {
    font-size: 8px;
  }

  .sp-faq-section {
    padding-top: 0;
  }

  .sp-brand {
    font-size: 23px;
  }

  .sp-section-cta .sp-button {
    width: 100%;
  }

  .sp-hero-fallback {
    padding: 24px;
  }

  .sp-hero-fallback h2 {
    font-size: 25px;
  }

  .sp-micro {
    font-size: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sp-page *,
  .sp-page *:before,
  .sp-page *:after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }

  .sp-observed:not(.sp-visible) {
    opacity: 1;
    transform: none;
  }

  .sp-button:hover {
    transform: none;
  }
}



/* Headline: explicit line breaks and curved underline */
.sp-hero-copy {
  container-type: inline-size;
}

.sp-page .sp-hero h1.sp-hero-title {
  font-family:
    "Montserrat",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif !important;

  font-size: 50px;
  font-size: clamp(24px, 8.2cqi, 56px);
  font-weight: 800 !important;
  line-height: 1.16;
  letter-spacing: -0.045em;
  text-wrap: initial;
  margin: 0;
}

.sp-page .sp-hero h1.sp-hero-title > .sp-title-line {
  display: block;
  white-space: nowrap;
  text-decoration: none !important;
}

.sp-page .sp-hero h1.sp-hero-title > .sp-title-final {
  position: relative;
  width: fit-content;
  padding-bottom: 22px;
}

.sp-title-curve {
  position: absolute;
  right: 1%;
  bottom: 0;
  width: 80%;
  height: 20px;
  pointer-events: none;
}



/* Website label */
.sp-page .sp-hero .sp-hero-form label {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 11px;
}

/* Website field */
.sp-page .sp-hero .sp-input-icon input {
  font-size: 14px;
  font-weight: 500;
  padding-top: 17px;
  padding-bottom: 17px;
}

/* Hero CTA */
.sp-page .sp-hero .sp-hero-input-row > .sp-button {
  font-size: 14px;
  font-weight: 700;
  min-height: 56px;
  padding: 16px 20px;
  gap: 10px;
}

.sp-page .sp-hero .sp-hero-input-row > .sp-button .sp-icon {
  width: 20px;
  height: 20px;
}

/* Supporting reassurance */
.sp-page .sp-hero .sp-micro {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.75;
  color: #c2d9d5;
  margin-top: 13px !important;
}


/* Mobile adjustments */
@media (max-width: 480px) {

  .sp-page .sp-hero .sp-hero-form label {
    font-size: 14px;
  }

  .sp-page .sp-hero .sp-micro {
    font-size: 11px;
  }

  .sp-title-curve {
    height: 15px;
  }
}


/* ==========================================
   GROWUP — PREMIUM WHITE RESULTS + BUYERS
   ========================================== */

/* 01. Make both sections white */
.sp-page .sp-proof,
.sp-page #whats-inside {
  background: #ffffff;
}

/* 02. Wider premium content layout */
.sp-page .sp-proof > .sp-container,
.sp-page #whats-inside > .sp-container {
  width: min(1380px, calc(100% - 104px));
}

/* 03. Results strip */
.sp-page .sp-proof {
  padding: 55px 0 28px;
}

.sp-page .sp-proof-grid {
  display: grid;
  grid-template-columns: 1.1fr 1.1fr 1fr 1.18fr 1fr;
  align-items: center;
  gap: 0;
}

.sp-page .sp-proof-grid > p {
  font-size: 15px;
  line-height: 1.55;
  font-weight: 700;
  color: #082c35;
  padding-right: 28px;
}

.sp-page .sp-proof-grid > div {
  min-height: 90px;
  padding: 0 25px;
  border-left: 1px solid #d4e4e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.sp-page .sp-proof-grid strong {
  font-size: clamp(36px, 3.3vw, 54px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.055em;
  color: #086467;
}

.sp-page .sp-proof-grid span {
  margin-top: 12px;
  font-size: 12px;
  font-weight: 500;
  color: #526874;
  line-height: 1.5;
}

.sp-page .sp-proof-grid > a {
  justify-self: stretch;
  align-self: center;
  min-height: 90px;
  padding-left: 35px;
  border-left: 1px solid #d4e4e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
  color: #086467;
}

.sp-page .sp-proof-grid > a .sp-icon {
  width: 20px;
  height: 20px;
}

/* 04. White section with fine separation */
.sp-page #whats-inside {
  padding: 40px 0 85px;
}

.sp-page #whats-inside > .sp-container {
  border-top: 1px solid #d4e4e0;
  padding-top: 58px;
}

/* 05. Section heading */
.sp-page #whats-inside .sp-eyebrow {
  color: #167273;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0.16em !important;
  margin-bottom: 20px !important;
}

.sp-page #whats-inside h2 {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  color: #082c35;
  font-size: clamp(32px, 3.4vw, 49px);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1.2;
  max-width: 1280px;
}

.sp-page #whats-inside .sp-lead {
  max-width: 1100px;
  color: #011522;
  font-size: 18px;
  line-height: 1.75;
  margin-top: 18px !important;
}

/* 06. Example label */
.sp-page #whats-inside .sp-example {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.11em;
  color: #011522;
  margin: 39px 0 16px !important;
}

/* 07. Three premium buyer cards */
.sp-page #whats-inside .sp-buyer-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
}

.sp-page #whats-inside .sp-buyer {
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: 30px;
  background: #ffffff;
  border: 1px solid #cfdfdd;
  border-radius: 9px;
  box-shadow: 0 2px 7px rgba(5, 43, 45, 0.025);
  text-align: left;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.sp-page #whats-inside .sp-buyer:hover {
  border-color: #8fbdb5;
  box-shadow: 0 12px 32px rgba(5, 43, 45, 0.065);
  transform: translateY(-2px);
}

/* 08. Card titles and icon containers */
.sp-page #whats-inside .sp-card-heading {
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: 60px;
}

.sp-page #whats-inside .sp-card-heading strong {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.4;
  color: #011522;
}

.sp-page #whats-inside .sp-card-heading .sp-icon-circle {
  width: 58px;
  height: 58px;
  border-radius: 14px;
  background: #eaf7f3;
  border: 1px solid #cee9e2;
  color: #167273;
}

.sp-page #whats-inside .sp-card-heading .sp-icon {
  width: 27px;
  height: 27px;
  stroke-width: 1.7;
}

.sp-page #whats-inside .sp-card-rule {
  height: 1px;
  background: #d6e4e1;
  margin: 23px 0 21px;
}

/* 09. Clean two-column Wants/Searches rows */
.sp-page #whats-inside .sp-buyer > .sp-buyer-row {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  align-items: start;
  gap: 15px;
  margin-top: 0;
  margin-bottom: 17px;
  font-size: 13px;
  line-height: 1.7;
}

.sp-page #whats-inside .sp-buyer-row b {
  font-weight: 700;
  color: #011522;
}

.sp-page #whats-inside .sp-buyer-row > span {
  min-width: 0;
  color: #011522;
  overflow-wrap: anywhere;
  font-size: 14px; 
  line-height: 1.6;
}


.sp-page #whats-inside .sp-buyer:hover {
  border-color: #8fbdb5;
  box-shadow: 0 12px 32px rgba(5, 43, 45, 0.065);
  transform: translateY(-2px);
}


/* 12. Responsive layout */
@media (max-width: 1100px) {
  .sp-page .sp-proof > .sp-container,
  .sp-page #whats-inside > .sp-container {
    width: calc(100% - 64px);
  }

  .sp-page .sp-proof-grid > div {
    padding-inline: 12px;
  }

  .sp-page .sp-proof-grid > a {
    padding-left: 18px;
  }

  .sp-page #whats-inside .sp-buyer-grid {
    gap: 16px;
  }

  .sp-page #whats-inside .sp-buyer {
    padding: 23px 20px;
  }
}

@media (max-width: 800px) {
  .sp-page .sp-proof > .sp-container,
  .sp-page #whats-inside > .sp-container {
    width: calc(100% - 40px);
  }

  .sp-page .sp-proof-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 24px;
  }

  .sp-page .sp-proof-grid > p {
    grid-column: 1 / -1;
  }

  .sp-page .sp-proof-grid > a {
    grid-column: 1 / -1;
    min-height: auto;
    justify-self: start;
    padding: 12px 0 0;
    border-left: 0;
  }

  .sp-page #whats-inside {
    padding-bottom: 60px;
  }

  .sp-page #whats-inside .sp-buyer-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .sp-page #whats-inside .sp-buyer {
    padding: 25px;
  }

  .sp-page #whats-inside .sp-lead {
    font-size: 16px;
  }

  .sp-page #whats-inside h2 {
    font-size: clamp(30px, 5vw, 38px);
  }
}

@media (max-width: 480px) {
  .sp-page .sp-proof {
    padding: 34px 0 24px;
  }

  .sp-page .sp-proof-grid strong {
    font-size: clamp(25px, 7vw, 34px);
  }

  .sp-page .sp-proof-grid span {
    font-size: 10px;
  }

  .sp-page .sp-proof-grid > div {
    padding: 0 7px;
    min-height: 80px;
  }

  .sp-page #whats-inside > .sp-container {
    padding-top: 38px;
  }

  .sp-page #whats-inside .sp-buyer > .sp-buyer-row {
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 10px;
  }


}



/* ==========================================
   PREMIUM BUYER CARDS — CONTENT UPDATE
   ========================================== */

/* Consistent card structure */
.sp-page #whats-inside .sp-buyer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 330px;
  padding: 30px;
  background: #ffffff;
  border: 1px solid #cfdfdd;
  border-radius: 9px;
}

/* Header layout */
.sp-page #whats-inside .sp-card-heading {
  display: flex;
  align-items: center;
  gap: 17px;
  width: 100%;
}

/* Keep existing mint-green icons */
.sp-page #whats-inside .sp-icon-circle {
  width: 56px;
  height: 56px;
  flex: 0 0 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #eaf7f3;
  border: 1px solid #cee9e2;
  border-radius: 14px;
  color: #167273;
}

/* Buyer title */
.sp-page #whats-inside .sp-card-heading strong {
  font-size: 16px;
  line-height: 1.4;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #082c35;
}

/* Small card number */
.sp-page #whats-inside .sp-buyer-number {
  margin-left: auto;
  align-self: flex-start;
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: #829b9b;
}

/* Divider */
.sp-page #whats-inside .sp-card-rule {
  height: 1px;
  background: #d6e4e1;
  margin: 23px 0;
}

/* Needs and Searches */
.sp-page #whats-inside .sp-buyer-row {
  display: grid;
  grid-template-columns: 85px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  width: 100%;
  margin-bottom: 18px;
  font-size: 16px; /* Increased to 16px for better readability */
  line-height: 1.6; 
}

.sp-page #whats-inside .sp-buyer-row b {
  color: #082c35;
  font-weight: 700;
  font-size: 14px; /* Keeps the label slightly distinct from the body text */
}

.sp-page #whats-inside .sp-buyer-row > span {
  color: #011522;
  overflow-wrap: anywhere;
}

/* Recommended content row */
.sp-page #whats-inside .sp-buyer-build {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  margin-top: auto;
  padding-top: 21px;
  border-top: 1px solid #d6e4e1;
  color: #086467;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.65;
}

/* Mint circle with check icon */
.sp-page #whats-inside .sp-build-icon {
  flex: 0 0 25px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e7f6f1;
  border-radius: 50%;
  color: #167273;
}

.sp-page #whats-inside .sp-build-icon .sp-icon {
  width: 15px;
  height: 15px;
  stroke-width: 2.5;
}

/* Subtle hover effect */
.sp-page #whats-inside .sp-buyer:hover {
  border-color: #8fbdb5;
  box-shadow: 0 12px 32px rgba(5, 43, 45, 0.065);
  transform: translateY(-2px);
}

/* Tablet and mobile */
@media (max-width: 1100px) {
  .sp-page #whats-inside .sp-buyer {
    padding: 24px 20px;
  }

  .sp-page #whats-inside .sp-card-heading {
    gap: 12px;
  }
}

@media (max-width: 800px) {
  .sp-page #whats-inside .sp-buyer {
    min-height: 0;
    padding: 26px;
  }

  .sp-page #whats-inside .sp-buyer-build {
    margin-top: 18px;
  }
}



/* =========================================
   SECTION 02 — PREMIUM COMPETITOR ANALYSIS
   ========================================= */

.sp-page .sp-competitor-dark {
  background: #052b2d;
  color: #ffffff;
  padding: 90px 0 85px;
}

/* Section width */
.sp-page .sp-competitor-dark > .sp-container {
  width: min(1380px, calc(100% - 104px));
}

/* Eyebrow */
.sp-page .sp-competitor-dark .sp-eyebrow {
  color: #76d2bd;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: .16em !important;
  margin-bottom: 18px !important;
}

/* Heading */
.sp-page .sp-competitor-dark h2 {
  color: #ffffff;
  font-family: Montserrat, sans-serif;
  font-size: clamp(34px, 3.25vw, 49px);
  font-weight: 800;
  line-height: 1.19;
  letter-spacing: -.045em;
  max-width: 1250px;
}

/* Supporting copy */
.sp-page .sp-competitor-dark .sp-lead {
  color: #fafafa;
  font-size: 17px;
  line-height: 1.75;
  max-width: 1090px;
  margin-top: 19px !important;
  margin-bottom: 36px !important;
}

/* Transparent table container */
.sp-page .sp-competitor-table-scroll {
  width: 100%;
  overflow-x: auto;
  background: transparent;
  border: 0;
  border-radius: 0;
}

/* Table */
.sp-page .sp-competitor-table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  table-layout: fixed;
  background: transparent;
  text-align: left;
}

/* Column proportions */
.sp-page .sp-competitor-table th:first-child {
  width: 30%;
}

.sp-page .sp-competitor-table th:nth-child(2) {
  width: 31%;
}

.sp-page .sp-competitor-table th:nth-child(3) {
  width: 39%;
}

/* Table headings */
.sp-page .sp-competitor-table thead th {
  padding: 0 20px 17px;
  color: #c1e5db;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .095em;
  text-transform: uppercase;
  background: transparent;
  border-bottom: 1px solid rgba(174, 223, 212, .24);
}

/* Body cells */
.sp-page .sp-competitor-table tbody th,
.sp-page .sp-competitor-table tbody td {
  padding: 23px 20px;
  font-size: 14px;
  line-height: 1.6;
  vertical-align: middle;
  background: transparent;
  border-bottom: 1px solid rgba(174, 223, 212, .17);
}

/* Subtle vertical column dividers */
.sp-page .sp-competitor-table tbody td {
  border-left: 1px solid rgba(174, 223, 212, .15);
}

/* Theme names */
.sp-page .sp-competitor-table tbody th {
  color: #ffffff;
  font-weight: 700;
}

/* Coverage details */
.sp-page .sp-competitor-table tbody td:nth-child(2) {
  color: #b8d0cd;
}

/* Opportunities */
.sp-page .sp-competitor-table tbody td:nth-child(3) {
  color: #e4f5f0;
  font-weight: 500;
}

/* Theme with icon */
.sp-page .sp-competitor-theme {
  display: flex;
  align-items: center;
  gap: 17px;
}

/* Mint icons */
.sp-page .sp-competitor-icon {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fafafa;
  border-radius: 9px;
  background: #167273;
  border: 1px solid rgba(22, 114, 115, 0.2);
}

/* Icon dimensions */
.sp-page .sp-competitor-icon .sp-icon {
  width: 23px;
  height: 23px;
  stroke-width: 1.9;
}

/* Hover */
.sp-page .sp-competitor-table tbody tr {
  transition: background .2s ease;
}

.sp-page .sp-competitor-table tbody tr:hover {
  background: rgba(132, 209, 189, .045);
}

/* CTA row */
.sp-page .sp-competitor-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding-top: 24px;
}

/* CTA text */
.sp-page .sp-competitor-cta > strong {
  color: #ffffff;
  font-size: 19px;
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: -.025em;
}

/* Teal CTA button */
.sp-page .sp-competitor-cta .sp-button {
  min-height: 48px;
  padding: 13px 24px;
  background: #167273;
  color: #fafafa !important;
  border: 1px solid #167273;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 800;
}

.sp-page .sp-competitor-cta .sp-button:hover {
  background: #105e60;
  color: #fafafa !important;
  border-color: #105e60;
  box-shadow: 0 7px 22px rgba(0, 0, 0, .18);
}

.sp-page .sp-competitor-cta .sp-button .sp-icon {
  width: 18px;
  height: 18px;
}

/* Responsive */
@media (max-width: 800px) {
  .sp-page .sp-competitor-dark {
    padding: 65px 0;
  }

  .sp-page .sp-competitor-dark > .sp-container {
    width: calc(100% - 40px);
  }

  .sp-page .sp-competitor-dark h2 {
    font-size: clamp(30px, 5vw, 40px);
  }

  .sp-page .sp-competitor-dark .sp-lead {
    font-size: 15px;
  }

  .sp-page .sp-competitor-cta {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .sp-page .sp-competitor-table {
    min-width: 680px;
  }

  .sp-page .sp-competitor-table tbody th,
  .sp-page .sp-competitor-table tbody td {
    padding: 18px 14px;
    font-size: 12px;
  }

  .sp-page .sp-competitor-cta .sp-button {
    width: 100%;
  }
}

.sp-page .sp-competitor-dark .sp-eyebrow {
  color: #158d8f !important;
}


/* Keyword section responsive layout */
@media (max-width: 900px) {
  .sp-keyword-section {
    padding: 60px 0;
  }

  .sp-keyword-mint-panel {
    padding: 36px 30px;
  }

  .sp-keyword-section .sp-dashboard-footer {
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .sp-keyword-section {
    padding: 32px 0;
  }

  .sp-keyword-mint-panel {
    padding: 30px 18px;
    border-radius: 12px;
  }

  .sp-keyword-section h2 {
    font-size: 30px;
  }

  .sp-keyword-section .sp-dashboard {
    padding: 20px 14px;
    margin-top: 26px;
  }

  .sp-keyword-section .sp-dashboard-heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .sp-keyword-section .sp-dashboard-heading h3 {
    font-size: 19px;
  }

  .sp-keyword-section .sp-tabs button {
    font-size: 11px;
    padding: 9px 10px;
  }

  .sp-keyword-section .sp-factors {
    gap: 12px;
  }

  .sp-keyword-section .sp-factors > span + span {
    border-left: none;
    padding-left: 0;
  }

  .sp-keyword-section .sp-dashboard-footer .sp-button {
    width: 100%;
  }
}

/* =========================================
   AI SEARCH VISIBILITY & AUTHORITY
   ========================================= */

 /* Black outer section */
.sp-page .sp-ai-plan {
  background: #000000;
  color: #f2fbf9;
  padding: 70px 0;
}

/* One teal panel containing the entire section */
.sp-page .sp-ai-plan > .sp-container {
  width: min(1460px, calc(100% - 80px));
  max-width: none;
  margin-inline: auto;
  padding: 60px 70px;
  box-sizing: border-box;
  background: rgba(2, 47, 49, 0.6);
  border: 0;
  border-radius: 0;
}

.sp-page .sp-ai-plan .sp-eyebrow {
  color: #9cddd4;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: .15em !important;
  margin: 0 0 20px !important;
}

.sp-page .sp-ai-plan h2,
.sp-page .sp-ai-plan h3,
.sp-page .sp-ai-plan h4 {
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif !important;
  color: #fafafa;
}

.sp-page .sp-ai-plan-intro h2 {
  max-width: 1280px;
  margin: 0;
  font-size: clamp(32px, 3.3vw, 49px);
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -.045em;
  text-wrap: balance;
}

.sp-page .sp-ai-plan-intro > p {
  max-width: 1210px;
  margin: 22px 0 0;
  color: #d0dedf;
  font-size: 17px;
  line-height: 1.8;
}

.sp-page .sp-ai-map {
  margin-top: 38px;
  padding: 28px;
  background: #09191d;
  border: 1px solid #286469;
  border-radius: 14px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, .16);
}

.sp-page .sp-ai-map-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 25px;
}

.sp-page .sp-ai-map-heading h3 {
  margin: 0;
  font-size: clamp(22px, 2.2vw, 30px);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -.035em;
}

.sp-page .sp-ai-map-heading > span {
  max-width: 280px;
  color: #b6cdcf;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .13em;
  line-height: 1.6;
  text-transform: uppercase;
  text-align: right;
}

.sp-page .sp-ai-map-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr 1.25fr;
  gap: 10px;
  margin-bottom: 16px;
}

.sp-page .sp-ai-map-tabs button {
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  min-width: 0;
  min-height: 64px;
  padding: 16px 20px;
  border: 1px solid #28494e;
  border-radius: 7px 7px 0 0;
  background: #0c2025;
  color: #d8e5e5;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background .18s ease, border-color .18s ease;
}

.sp-page .sp-ai-map-tabs button:hover {
  background: #123238;
  border-color: #568c8d;
}

.sp-page .sp-ai-map-tabs button[aria-selected="true"] {
  background: #103b40;
  border-color: #559b99;
  color: #fafafa;
  box-shadow: inset 0 -3px 0 #bcece1;
}

.sp-page .sp-ai-map-tabs .sp-icon {
  width: 25px;
  height: 25px;
  flex: 0 0 25px;
  color: #bcece1;
}

.sp-page .sp-ai-map button:focus-visible,
.sp-page .sp-ai-map-panel:focus-visible {
  outline: 3px solid #bcece1;
  outline-offset: 4px;
}

.sp-page .sp-ai-map-panel[hidden] {
  display: none;
}

.sp-page .sp-ai-question {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  border: 1px solid #275b61;
  border-radius: 8px;
  background: #10343a;
}

.sp-page .sp-ai-question > div {
  min-width: 0;
}

.sp-page .sp-ai-question-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 46px;
  width: 46px;
  height: 46px;
  border: 1px solid #39787c;
  border-radius: 11px;
  color: #bcece1;
  background: #123e43;
}

.sp-page .sp-ai-question-icon .sp-icon {
  width: 27px;
  height: 27px;
}

.sp-page .sp-ai-label {
  display: block;
  color: #b7dbd7;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: .13em;
}

.sp-page .sp-ai-question h4 {
  margin: 8px 0 10px;
  font-size: clamp(20px, 1.9vw, 27px);
  line-height: 1.4;
  font-weight: 800;
  letter-spacing: -.025em;
}

.sp-page .sp-ai-question p {
  margin: 0;
  color: #c8dddd;
  font-size: 13px;
  line-height: 1.75;
}

.sp-page .sp-ai-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 16px;
  margin-top: 16px;
}

.sp-page .sp-ai-detail-card {
  min-width: 0;
  padding: 24px;
  border: 1px solid #294a50;
  border-radius: 8px;
  background: #0c2025;
}

.sp-page .sp-ai-detail-card > header {
  display: flex;
  align-items: flex-start;
  gap: 17px;
  min-height: 100px;
  padding-bottom: 20px;
}

.sp-page .sp-ai-detail-card > header > .sp-icon {
  flex: 0 0 30px;
  width: 30px;
  height: 35px;
  color: #bcece1;
}

.sp-page .sp-ai-detail-card h4 {
  margin: 7px 0 0;
  font-size: 20px;
  font-weight: 750;
  line-height: 1.45;
  letter-spacing: -.025em;
}

.sp-page .sp-ai-detail-rows {
  margin: 0;
}

.sp-page .sp-ai-detail-rows > div {
  display: grid;
  grid-template-columns: 135px minmax(0, 1fr);
  align-items: start;
  gap: 20px;
  padding: 22px 0;
  border-top: 1px solid #294a50;
}

.sp-page .sp-ai-detail-rows > div:last-child {
  padding-bottom: 0;
}

.sp-page .sp-ai-detail-rows dt {
  margin: 0;
  color: #c5eee4;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.7;
}

.sp-page .sp-ai-detail-rows dd {
  margin: 0;
  color: #d8e4e4;
  font-size: 14px;
  line-height: 1.75;
  overflow-wrap: anywhere;
}

.sp-page .sp-ai-context-note {
  margin: 18px 2px 0;
  color: #b7cece;
  font-size: 12px;
  line-height: 1.8;
}

.sp-page .sp-ai-deliverables {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-top: 24px;
  padding: 20px 23px;
  background: #d8f1ea;
  color: #011522;
  border-radius: 7px;
}

.sp-page .sp-ai-deliverables > strong {
  display: flex;
  align-items: center;
  gap: 13px;
  flex: 0 0 auto;
  color: #011522;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .055em;
  text-transform: uppercase;
}

.sp-page .sp-ai-deliverables .sp-icon {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}

.sp-page .sp-ai-deliverables ul {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin: 0;
  padding: 0 0 0 25px;
  border-left: 1px solid #9ebdb6;
  list-style: none;
}

.sp-page .sp-ai-deliverables li {
  color: #011522;
  font-size: 12px;
  font-weight: 650;
  line-height: 1.6;
}

.sp-page .sp-ai-plan-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 24px;
}

.sp-page .sp-ai-plan-footer > p {
  max-width: 720px;
  margin: 0;
  color: #fafafa;
  font-size: 14px;
  line-height: 1.8;
}

.sp-page .sp-ai-plan-footer .sp-button {
  flex-shrink: 0;
  min-height: 52px;
  padding: 15px 24px;
  background: #167273;
  border: 1px solid #167273;
  border-radius: 6px;
  color: #fafafa !important;
  font-size: 13px;
  font-weight: 750;
}

.sp-page .sp-ai-plan-footer .sp-button:hover {
  background: #105e60;
  border-color: #105e60;
}

@media (max-width: 1100px) {
  .sp-page .sp-ai-plan > .sp-container {
    width: calc(100% - 64px);
  }

  .sp-page .sp-ai-detail-rows > div {
    grid-template-columns: 110px minmax(0, 1fr);
    gap: 15px;
  }

  .sp-page .sp-ai-detail-card {
    padding: 21px;
  }

  .sp-page .sp-ai-deliverables {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .sp-page .sp-ai-deliverables ul {
    border-left: 0;
    padding-left: 0;
  }
}

@media (max-width: 800px) {
  .sp-page .sp-ai-plan {
    padding: 60px 0;
  }

  .sp-page .sp-ai-plan > .sp-container {
    width: calc(100% - 40px);
  }

  .sp-page .sp-ai-plan-intro > p {
    font-size: 16px;
  }

  .sp-page .sp-ai-map {
    padding: 20px;
  }

  .sp-page .sp-ai-map-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .sp-page .sp-ai-map-heading > span {
    max-width: none;
    text-align: left;
  }

  .sp-page .sp-ai-map-tabs {
    display: flex;
    overflow-x: auto;
    padding: 4px 4px 8px;
  }

  .sp-page .sp-ai-map-tabs button {
    flex: 0 0 auto;
    min-height: 55px;
    padding: 13px 16px;
    font-size: 13px;
  }

  .sp-page .sp-ai-detail-grid {
    grid-template-columns: 1fr;
  }

  .sp-page .sp-ai-detail-card > header {
    min-height: 0;
  }

  .sp-page .sp-ai-plan-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }
}

@media (max-width: 480px) {
  .sp-page .sp-ai-map {
    padding: 14px;
    border-radius: 10px;
  }

  .sp-page .sp-ai-question {
    padding: 19px;
    gap: 12px;
  }

  .sp-page .sp-ai-question-icon {
    display: none;
  }

  .sp-page .sp-ai-question h4 {
    font-size: 20px;
  }

  .sp-page .sp-ai-detail-card {
    padding: 19px;
  }

  .sp-page .sp-ai-detail-rows > div {
    grid-template-columns: 1fr;
    gap: 7px;
    padding: 18px 0;
  }

  .sp-page .sp-ai-detail-rows dd {
    font-size: 14px;
  }

  .sp-page .sp-ai-deliverables {
    padding: 18px;
  }

  .sp-page .sp-ai-deliverables ul {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .sp-page .sp-ai-plan-footer .sp-button {
    width: 100%;
    justify-content: center;
  }
}

/* =========================================
   AI VISIBILITY — TWO-TAB GAP & ACTION MAP
   ========================================= */

.sp-page .sp-ai-gaps-section .sp-ai-map-heading {
  margin-bottom: 10px;
}

.sp-page .sp-ai-gaps-section .sp-ai-map-heading > span {
  max-width: none;
  padding: 7px 12px;
  border: 1px solid #39777a;
  border-radius: 999px;
  color: #bcece1;
  font-size: 10px;
  letter-spacing: .07em;
}

 

.sp-page .sp-ai-gaps-section .sp-ai-map-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 0;
  padding: 4px 4px 0;
  border-bottom: 1px solid #31545a;
  overflow-x: auto;
}

.sp-page .sp-ai-gaps-section .sp-ai-map-tabs button {
  flex: 0 0 auto;
  min-height: 58px;
  padding: 15px 22px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #b9cecf;
  box-shadow: none;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
}

.sp-page .sp-ai-gaps-section .sp-ai-map-tabs button:hover {
  background: #102c32;
  color: #fafafa;
}

.sp-page .sp-ai-gaps-section
.sp-ai-map-tabs button[aria-selected="true"] {
  background: #103137;
  color: #fafafa;
  box-shadow: inset 0 -3px 0 #bcece1;
}

.sp-page .sp-ai-gaps-section .sp-ai-map-tabs .sp-icon {
  width: 21px;
  height: 21px;
  flex-basis: 21px;
}

.sp-page .sp-ai-tab-description {
  margin: 22px 0 18px;
  color: #d8e4e4;
  font-size: 15px;
  line-height: 1.75;
}

.sp-page .sp-ai-table-scroll {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #2c5056;
  border-radius: 9px;
  background: #0b2025;
}

.sp-page .sp-ai-table-scroll:focus-visible {
  outline: 3px solid #bcece1;
  outline-offset: 4px;
}

.sp-page .sp-ai-table-scroll table {
  width: 100%;
  margin: 0;
  border: 0;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
  background: transparent;
  text-align: left;
}

.sp-page .sp-ai-gap-table {
  min-width: 1000px;
}

.sp-page .sp-ai-action-table {
  min-width: 940px;
}

/* Visibility table column widths */

.sp-page .sp-ai-gap-table thead th:nth-child(1) {
  width: 6%;
}

.sp-page .sp-ai-gap-table thead th:nth-child(2) {
  width: 39%;
}

.sp-page .sp-ai-gap-table thead th:nth-child(3) {
  width: 17%;
}

.sp-page .sp-ai-gap-table thead th:nth-child(4) {
  width: 38%;
}

/* Recommendations table column widths */

.sp-page .sp-ai-action-table thead th:nth-child(1) {
  width: 9%;
}

.sp-page .sp-ai-action-table thead th:nth-child(2) {
  width: 44%;
}

.sp-page .sp-ai-action-table thead th:nth-child(3) {
  width: 47%;
}

/* Table headers */

.sp-page .sp-ai-table-scroll thead th {
  padding: 17px 20px;
  background: #123138;
  border: 0;
  border-bottom: 1px solid #31565c;
  color: #e0efed;
  font-size: 12px;
  font-weight: 750;
  line-height: 1.5;
  text-transform: none;
  letter-spacing: 0;
  vertical-align: middle;
}

/* Table body */

.sp-page .sp-ai-table-scroll tbody th,
.sp-page .sp-ai-table-scroll tbody td {
  padding: 23px 20px;
  border: 0;
  border-bottom: 1px solid #294a50;
  background: transparent;
  color: #d8e4e4;
  font-size: 14px;
  line-height: 1.75;
  vertical-align: top;
  overflow-wrap: anywhere;
}

.sp-page .sp-ai-table-scroll tbody th:first-child,
.sp-page .sp-ai-table-scroll tbody td:first-child {
  padding-right: 35px; /* Added spacing for the content below the header */
}

.sp-page .sp-ai-table-scroll th + th,
.sp-page .sp-ai-table-scroll th + td,
.sp-page .sp-ai-table-scroll td + td {
  border-left: 1px solid #25444a;
}

.sp-page .sp-ai-table-scroll tbody tr:last-child th,
.sp-page .sp-ai-table-scroll tbody tr:last-child td {
  border-bottom: 0;
}

.sp-page .sp-ai-table-scroll tbody tr:hover {
  background: #102b31;
}

.sp-page .sp-ai-table-scroll thead th:first-child,
.sp-page .sp-ai-table-scroll tbody th:first-child {
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
}

.sp-page .sp-ai-gap-id {
  display: inline-block;
  color: #bcece1;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
}

.sp-page .sp-ai-prompt {
  margin: 0;
  color: #fafafa;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.75;
}

.sp-page .sp-ai-intent {
  display: inline-block;
  margin-top: 10px;
  padding: 3px 9px;
  border: 1px solid #3b5962;
  border-radius: 999px;
  background: #1b343e;
  color: #c5d9de;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.5;
}

/* Visibility status pills */

.sp-page .sp-ai-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 11px;
  border: 1px solid;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 750;
  line-height: 1.5;
  white-space: nowrap;
}

.sp-page .sp-ai-status-missing {
  background: #342326;
  border-color: #b46c70;
  color: #ffb5b5;
}

.sp-page .sp-ai-status-weak {
  background: #332d1d;
  border-color: #a98c45;
  color: #f4d58b;
}

/* Recommendation copy */

.sp-page .sp-ai-action-title {
  display: block;
  margin: 0 0 6px;
  color: #fafafa;
  font-size: 14px;
  font-weight: 750;
  line-height: 1.6;
}

.sp-page .sp-ai-action-copy {
  margin: 0;
  color: #c7dbdc;
  font-size: 14px;
  line-height: 1.75;
}

.sp-page .sp-ai-gaps-section .sp-ai-context-note {
  margin-top: 17px;
  max-width: 1180px;
  font-size: 12px;
  line-height: 1.8;
}

.sp-page .sp-ai-gaps-section .sp-ai-deliverables {
  margin-top: 24px;
  background: #d8f1ea;
}

/* Screen-reader-only table captions */

.sp-page .sp-ai-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1100px) {
  .sp-page .sp-ai-table-scroll thead th,
  .sp-page .sp-ai-table-scroll tbody td {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 800px) {
  .sp-page .sp-ai-gaps-section .sp-ai-map-heading {
    align-items: flex-start;
    gap: 13px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-map-heading > span {
    text-align: left;
    font-size: 9px;
  }

  .sp-page .sp-ai-example-disclaimer {
    margin-bottom: 18px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-map-tabs button {
    min-height: 54px;
    padding: 13px 16px;
    font-size: 13px;
  }

  .sp-page .sp-ai-tab-description {
    font-size: 14px;
    margin-top: 18px;
  }
}

@media (max-width: 480px) {
  .sp-page .sp-ai-gaps-section .sp-ai-map-tabs {
    gap: 4px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-map-tabs button {
    gap: 8px;
    padding: 12px;
    font-size: 12px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-map-tabs .sp-icon {
    width: 17px;
    height: 17px;
    flex-basis: 17px;
  }

  .sp-page .sp-ai-table-scroll tbody th,
  .sp-page .sp-ai-table-scroll tbody td {
    padding-top: 19px;
    padding-bottom: 19px;
  }
}


/* =========================================
   MINIMAL AI VISIBILITY PANEL
   ========================================= */

/* Intro */
.sp-page .sp-ai-gaps-section .sp-eyebrow {
  color: #7fb8ae;
  margin-bottom: 24px !important;
}

.sp-page .sp-ai-gaps-section .sp-ai-plan-intro h2 {
  max-width: 1120px;
  color: #f2fbf9;
  font-size: clamp(32px, 3.3vw, 48px);
  line-height: 1.18;
  letter-spacing: -.035em;
  font-weight: 800;
}

.sp-page .sp-ai-gaps-section .sp-ai-plan-intro > p {
  max-width: 1100px;
  margin-top: 24px;
  color: #a9d9d1;
  font-size: 20px;
  line-height: 1.8;
}

/* Remove the nested dashboard box */
 .sp-page .sp-ai-gaps-section .sp-ai-map {
  margin-top: 24px; /* Reduced from 48px */
  padding: 24px 0 0; /* Reduced from 32px */
  background: transparent;
  border: 0;
  border-top: 1px solid rgba(143, 217, 207, .25);
  border-radius: 0;
  box-shadow: none;
}

/* Dashboard heading */
.sp-page .sp-ai-gaps-section .sp-ai-map-heading {
  gap: 20px;
  margin-bottom: 10px;
}

.sp-page .sp-ai-gaps-section .sp-ai-map-heading h3 {
  color: #f2fbf9;
  font-size: clamp(21px, 2vw, 27px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -.025em;
}

/* Plain example label */
.sp-page .sp-ai-gaps-section .sp-ai-map-heading > span {
  max-width: none;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  color: #8fd9cf;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .1em;
  line-height: 1.6;
}

.sp-page .sp-ai-gaps-section .sp-ai-example-disclaimer {
  margin: 0 0 28px;
  color: #9bc2ba;
  font-size: 12px;
  line-height: 1.7;
}

/* Simple underline tabs */
.sp-page .sp-ai-gaps-section .sp-ai-map-tabs {
  display: flex;
  gap: 32px;
  margin: 0;
  padding: 4px 4px 0;
  background: transparent;
  border-bottom: 1px solid rgba(143, 217, 207, .22);
  overflow-x: auto;
}

.sp-page .sp-ai-gaps-section .sp-ai-map-tabs button {
  flex: 0 0 auto;
  min-height: 64px;
  padding: 14px 0 20px;
  background: transparent;
  border: 0;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  box-shadow: none;
  color: #bcd8d1;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}

.sp-page .sp-ai-gaps-section .sp-ai-map-tabs button:hover {
  background: transparent;
  color: #f2fbf9;
}

.sp-page .sp-ai-gaps-section
.sp-ai-map-tabs button[aria-selected="true"] {
  background: transparent;
  border-bottom-color: #8fd9cf;
  box-shadow: none;
  color: #ffffff;
  font-weight: 800;
}

/* Text-only tab labels */
.sp-page .sp-ai-gaps-section .sp-ai-map-tabs .sp-icon {
  display: none;
}

.sp-page .sp-ai-gaps-section .sp-ai-tab-description {
  margin: 30px 0 32px;
  color: #d4efe9;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.8;
}

/* Transparent tables: no surrounding box */
.sp-page .sp-ai-gaps-section .sp-ai-table-scroll {
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.sp-page .sp-ai-gaps-section .sp-ai-table-scroll table {
  background: transparent;
}

/* Table headers */
.sp-page .sp-ai-gaps-section .sp-ai-table-scroll thead th {
  padding: 0 22px 20px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(143, 217, 207, .35);
  color: #d4efe9;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.6;
  letter-spacing: .08em;
  text-transform: uppercase;
}

/* Airy rows with horizontal rules only */
.sp-page .sp-ai-gaps-section .sp-ai-table-scroll tbody th,
.sp-page .sp-ai-gaps-section .sp-ai-table-scroll tbody td {
  padding: 34px 22px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(143, 217, 207, .2);
  color: #d4efe9;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.7;
  vertical-align: top;
}

.sp-page .sp-ai-gaps-section .sp-ai-table-scroll th + th,
.sp-page .sp-ai-gaps-section .sp-ai-table-scroll th + td,
.sp-page .sp-ai-gaps-section .sp-ai-table-scroll td + td {
  border-left: 0;
}

.sp-page .sp-ai-gaps-section
.sp-ai-table-scroll tbody tr:last-child th,
.sp-page .sp-ai-gaps-section
.sp-ai-table-scroll tbody tr:last-child td {
  border-bottom: 1px solid rgba(143, 217, 207, .16);
}

.sp-page .sp-ai-gaps-section .sp-ai-table-scroll tbody tr:hover {
  background: rgba(143, 217, 207, .025);
}

/* Gap numbering */
.sp-page .sp-ai-gaps-section .sp-ai-gap-id {
  color: #8fd9cf;
  font-size: 18px;
  font-weight: 800;
}

/* Buyer prompts */
.sp-page .sp-ai-gaps-section .sp-ai-prompt {
  color: #ffffff;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.6;
}

/* Intent labels: plain text */
.sp-page .sp-ai-gaps-section .sp-ai-intent {
  display: block;
  width: fit-content;
  margin-top: 9px;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  color: #8fd9cf;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .04em;
  line-height: 1.6;
}

/* Status labels: small dots instead of outlined pills */
.sp-page .sp-ai-gaps-section .sp-ai-status {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.75;
}

.sp-page .sp-ai-gaps-section .sp-ai-status::before {
  content: "";
  width: 9px;
  height: 9px;
  flex: 0 0 9px;
  border-radius: 50%;
  background: currentColor;
}

.sp-page .sp-ai-gaps-section .sp-ai-status-missing {
  color: #f2b3ad;
}

.sp-page .sp-ai-gaps-section .sp-ai-status-weak {
  color: #efd79c;
}

/* Recommended actions tab */
.sp-page .sp-ai-gaps-section .sp-ai-action-title {
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.55;
}

.sp-page .sp-ai-gaps-section .sp-ai-action-copy {
  color: #d4efe9;
  font-size: 17px;
  line-height: 1.7;
}

.sp-page .sp-ai-gaps-section .sp-ai-context-note {
  max-width: 1100px;
  margin: 20px 0 0;
  color: #9bc2ba;
  font-size: 11px;
  line-height: 1.8;
}

/* Plain deliverables row: remove mint background */
 

/* Footer stays inside the teal panel */
.sp-page .sp-ai-gaps-section .sp-ai-plan-footer {
  margin-top: 25px;
  gap: 25px;
}

.sp-page .sp-ai-gaps-section .sp-ai-plan-footer > p {
  color: #fafafa;
  font-size: 14px;
  line-height: 1.8;
}

.sp-page .sp-ai-gaps-section .sp-ai-plan-footer .sp-button {
  min-height: 48px;
  padding: 14px 22px;
  background: #167273;
  border: 1px solid #167273;
  border-radius: 4px;
  box-shadow: none;
  color: #fafafa !important;
  font-size: 12px;
  font-weight: 600;
}

.sp-page .sp-ai-gaps-section .sp-ai-plan-footer .sp-button:hover {
  background: #1b8181;
  border-color: #1b8181;
  box-shadow: none;
  transform: none;
}

/* Keep table captions visually hidden */
.sp-page .sp-ai-gaps-section caption.sp-ai-sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* Responsive panel spacing */
@media (max-width: 1100px) {
  .sp-page .sp-ai-plan > .sp-container {
    width: calc(100% - 56px);
    padding: 48px 38px;
  }
}

@media (max-width: 800px) {
  .sp-page .sp-ai-plan {
    padding: 40px 0;
  }

  .sp-page .sp-ai-plan > .sp-container {
    width: calc(100% - 32px);
    padding: 38px 24px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-plan-intro > p {
    font-size: 15px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-map {
    margin-top: 34px;
    padding-top: 25px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-map-tabs {
    gap: 24px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-map-tabs button {
    font-size: 13px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-deliverables {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .sp-page .sp-ai-plan {
    padding: 24px 0;
  }

  .sp-page .sp-ai-plan > .sp-container {
    width: calc(100% - 24px);
    padding: 30px 18px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-plan-intro h2 {
    font-size: 30px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-map-tabs {
    gap: 20px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-map-tabs button {
    font-size: 12px;
  }

  .sp-page .sp-ai-gaps-section .sp-ai-plan-footer .sp-button {
    width: 100%;
    justify-content: center;
  }
}

/* Consistent gradient across the dark sections */
.sp-page .sp-hero,
.sp-page .sp-dark,
.sp-page .sp-competitor-dark,
.sp-page .sp-ai-plan {
  background: linear-gradient(
    to bottom,
    #0a2e2e 0%,
    #041b1c 100%
  );
}
  /* =========================================
   05 — ROADMAP & MEASUREMENT
   VERTICAL TIMELINE + SIGNALS PANEL
   ========================================= */

.sp-page .sp-plan-timeline {
  padding: 90px 0 80px;
  background: #ffffff;
  color: #011522;
}

.sp-page .sp-plan-timeline > .sp-container {
  width: min(1380px, calc(100% - 104px));
  max-width: none;
  margin-inline: auto;
}

.sp-page .sp-plan-timeline .sp-eyebrow {
  margin: 0 0 20px !important;
  color: #167273;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: .15em !important;
}

.sp-page .sp-plan-timeline h2,
.sp-page .sp-plan-timeline h3,
.sp-page .sp-plan-timeline h4 {
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif !important;
  color: #011522;
}

/* Section introduction */

.sp-page .sp-plan-timeline-intro h2 {
  max-width: 1160px;
  margin: 0;
  font-size: clamp(32px, 3.3vw, 48px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -.04em;
  text-wrap: balance;
}

.sp-page .sp-plan-timeline-intro > p {
  max-width: 1100px;
  margin: 20px 0 0;
  color: #011522;
  font-size: 19px;
  line-height: 1.8;
}
/* Main layout */

.sp-page .sp-plan-timeline-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.85fr) minmax(0, 1fr);
  align-items: start;
  gap: 48px;
  margin-top: 46px;
}

/* Timeline */

.sp-page .sp-plan-phases {
  position: relative;
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sp-page .sp-plan-phase {
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(140px, .8fr) minmax(0, 1.4fr);
  align-items: start;
  gap: 20px;
  margin: 0;
  padding: 0 0 34px;
}

.sp-page .sp-plan-phase + .sp-plan-phase {
  padding-top: 28px;
}

.sp-page .sp-plan-phase:last-child {
  padding-bottom: 0;
}

/* Connector between phase markers */

.sp-page .sp-plan-phase:not(:last-child)::before {
  content: "";
  position: absolute;
  top: 40px;
  bottom: -28px;
  left: 19px;
  width: 1px;
  background: #b9d8d2;
}

.sp-page .sp-plan-phase:not(:first-child):not(:last-child)::before {
  top: 68px;
}

/* Fine separation between phases */

.sp-page .sp-plan-phase:not(:last-child)::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 60px;
  height: 1px;
  background: #dce8e4;
}

.sp-page .sp-plan-phase-number {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #167273;
  color: #fafafa;
  font-size: 17px;
  font-weight: 700;
  line-height: 1;
}

.sp-page .sp-plan-period {
  display: block;
  margin: 2px 0 8px;
  color: #167273;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .07em;
  line-height: 1.6;
}

.sp-page .sp-plan-phase-heading h3 {
  margin: 0;
  font-size: 21px; /* Increased from 19px */
  font-weight: 750;
  line-height: 1.45;
  letter-spacing: -.025em;
}

.sp-page .sp-plan-phase-copy p {
  margin: 0 0 16px;
  color: #011522;
  font-size: 16px;
  line-height: 1.8;
}

.sp-page .sp-plan-phase-copy strong {
  color: #011522;
  font-weight: 700;
}

.sp-page .sp-plan-phase-copy p:last-child {
  margin-bottom: 0;
}

.sp-page .sp-plan-phase-copy .sp-plan-phase-measure {
  padding-top: 3px;
  color: #167273;
  font-size: 12px;
}

.sp-page .sp-plan-phase-measure strong {
  color: #167273;
}

/* Measurement panel */

.sp-page .sp-plan-signals {
  min-width: 0;
  padding: 30px;
  background: #edf6f3;
  border: 0;
  border-radius: 8px;
}

.sp-page .sp-plan-signals > h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 750;
  line-height: 1.35;
  letter-spacing: -.025em;
}

.sp-page .sp-plan-signals-intro {
  margin: 12px 0 24px;
  color: #011522;
  font-size: 15px; /* Increased from 13px */
  line-height: 1.8;
}

.sp-page .sp-plan-signal-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sp-page .sp-plan-signal-list > li {
  display: grid;
  grid-template-columns: 27px minmax(0, 1fr);
  align-items: start;
  gap: 13px;
  margin: 0;
  padding: 19px 0;
  border-top: 1px solid #d0e3dc;
}

.sp-page .sp-plan-signal-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: #167273;
  color: #fafafa;
  font-size: 12px;
  font-weight: 700;
}

.sp-page .sp-plan-signal-list h4 {
  margin: 0 0 4px;
  font-size: 17px; /* Increased from 15px */
  font-weight: 750;
  line-height: 1.5;
}

.sp-page .sp-plan-signal-label {
  display: block;
  color: #167273;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
}

.sp-page .sp-plan-signal-list p {
  margin: 8px 0 0;
  color: #011522;
  font-size: 14px;
  line-height: 1.75;
}

.sp-page .sp-plan-signals-note {
  margin: 6px 0 0;
  padding-top: 17px;
  border-top: 1px solid #d0e3dc;
  color: #011522;
  font-size: 11px;
  line-height: 1.8;
}

/* Shared footer */

.sp-page .sp-plan-timeline-footer {
  display: flex;
  align-items: stretch;
  gap: 18px;
  margin-top: 36px;
}

.sp-page .sp-plan-measurement-strip {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
  padding: 17px 22px;
  background: #edf6f3;
  border-radius: 5px;
}

.sp-page .sp-plan-measurement-strip > span {
  color: #011522;
  font-size: 14px; /* Increased from 12px */
  font-weight: 700;
  line-height: 1.6;
}

.sp-page .sp-plan-measurement-strip p {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #167273;
  font-size: 14px; /* Increased from 12px */
  font-weight: 600;
  line-height: 1.8;
}

.sp-page .sp-plan-measurement-strip p > span {
  color: #6f9e95;
}

.sp-page .sp-plan-timeline-footer .sp-button {
  flex-shrink: 0;
  align-self: center;
  min-height: 52px;
  padding: 15px 24px;
  background: #167273;
  border: 1px solid #167273;
  border-radius: 5px;
  color: #fafafa !important;
  font-size: 13px;
  font-weight: 700;
  box-shadow: none;
}

.sp-page .sp-plan-timeline-footer .sp-button:hover {
  background: #105e60;
  border-color: #105e60;
  box-shadow: none;
}

.sp-page .sp-plan-timeline-note {
  margin: 16px 0 0;
  color: #526b70;
  font-size: 11px;
  line-height: 1.8;
}

/* Tablet */

@media (max-width: 1100px) {
  .sp-page .sp-plan-timeline > .sp-container {
    width: calc(100% - 64px);
  }

  .sp-page .sp-plan-timeline-layout {
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: 28px;
  }

  .sp-page .sp-plan-phase {
    grid-template-columns: 40px minmax(0, 1fr);
    column-gap: 18px;
    row-gap: 14px;
  }

  .sp-page .sp-plan-phase-copy {
    grid-column: 2;
  }

  .sp-page .sp-plan-signals {
    padding: 24px;
  }

  .sp-page .sp-plan-timeline-footer {
    flex-wrap: wrap;
  }
}

/* Mobile */

@media (max-width: 800px) {
  .sp-page .sp-plan-timeline {
    padding: 60px 0;
  }

  .sp-page .sp-plan-timeline > .sp-container {
    width: calc(100% - 40px);
  }

  .sp-page .sp-plan-timeline-intro h2 {
    font-size: clamp(30px, 5vw, 39px);
  }

  .sp-page .sp-plan-timeline-intro > p {
    font-size: 15px;
  }

  .sp-page .sp-plan-timeline-layout {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-top: 32px;
  }

  .sp-page .sp-plan-timeline-footer {
    flex-direction: column;
  }

  .sp-page .sp-plan-timeline-footer .sp-button {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .sp-page .sp-plan-phase {
    column-gap: 14px;
  }

  .sp-page .sp-plan-phase-heading h3 {
    font-size: 18px;
  }

  .sp-page .sp-plan-signals {
    padding: 24px 20px;
  }

  .sp-page .sp-plan-measurement-strip {
    padding: 18px;
  }

  .sp-page .sp-plan-timeline-footer .sp-button {
    width: 100%;
    justify-content: center;
  }
}


/* =========================================
   REQUEST FORM — OPTION 05
   SUBTLE TRANSLUCENT TEAL PANEL
   ========================================= */

.sp-page #request-plan {
  padding: 90px 0;
  background: linear-gradient(
    to bottom,
    #0a2e2e 0%,
    #041b1c 100%
  );
  color: #f2fbf9;
}

.sp-page #request-plan > .sp-container {
  width: min(1380px, calc(100% - 104px));
  max-width: none;
  margin-inline: auto;
  border-bottom: 1px solid rgba(143, 217, 207, .15); /* Added subtle border */
  padding-bottom: 90px; /* Added padding to push the border down */
}

.sp-page #request-plan .sp-final-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  align-items: start;
  gap: 80px;
}

/* Left-hand copy */

.sp-page #request-plan .sp-final-grid > div:first-child {
  padding-top: 20px;
}

.sp-page #request-plan .sp-eyebrow {
  margin: 0 0 24px !important;
  color: #8fd9cf;
  font-size: 11px !important;
  font-weight: 600 !important;
  letter-spacing: .15em !important;
}

.sp-page #request-plan h2 {
  max-width: 650px;
  margin: 0;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif !important;
  color: #f2fbf9;
  font-size: clamp(34px, 3.7vw, 52px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -.04em;
  text-wrap: balance;
}

.sp-page #request-plan .sp-lead {
  max-width: 550px;
  margin: 25px 0 0;
  color: #a9d9d1;
  font-size: 17px;
  line-height: 1.8;
}

/* Benefits */

.sp-page #request-plan .sp-final-benefits {
  display: grid;
  gap: 18px;
  margin: 32px 0 0;
  padding: 0;
  list-style: none;
}

.sp-page #request-plan .sp-final-benefits li {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  color: #d3e9e3;
  font-size: 14px;
  line-height: 1.75;
}

.sp-page #request-plan .sp-final-benefits .sp-icon {
  flex: 0 0 21px;
  width: 21px;
  height: 21px;
  margin-top: 2px;
  color: #8fd9cf;
}

/* Translucent panel */

.sp-page #request-plan .sp-request-card {
  min-width: 0;
  padding: 38px;
  background: rgba(22, 114, 115, .12);
  border: 0;
  border-radius: 12px;
  color: #f2fbf9;
  box-shadow: none;
}

/* Step number and label */

.sp-page #request-plan .sp-request-step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  margin-bottom: 32px;
}

.sp-page #request-plan .sp-request-step-label {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.sp-page #request-plan .sp-request-step-number {
  color: #8fd9cf;
  font-size: 46px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.06em;
  font-variant-numeric: tabular-nums;
}

.sp-page #request-plan .sp-request-step-name {
  padding-left: 16px;
  border-left: 1px solid rgba(143, 217, 207, .3);
  color: #e0f1eb;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
}

.sp-page #request-plan .sp-request-step-status {
  flex: 0 0 86px;
}

.sp-page #request-plan .sp-request-step-status > span {
  display: block;
  color: #bddbd3;
  font-size: 10px;
  line-height: 1.6;
  text-align: right;
  white-space: nowrap;
}

/* Compact progress indicator */

.sp-page #request-plan .sp-step-progress {
  display: flex;
  gap: 5px;
  margin: 9px 0 0;
}

.sp-page #request-plan .sp-step-progress > span {
  flex: 1;
  height: 2px;
  background: rgba(143, 217, 207, .2);
}

.sp-page #request-plan .sp-step-progress > span:first-child,
.sp-page #request-plan .sp-step-progress > span.sp-filled {
  background: #8fd9cf;
}

/* Form title */

.sp-page #request-plan .sp-form-title {
  display: block;
  margin-bottom: 23px;
}

.sp-page #request-plan .sp-form-title h3 {
  margin: 0;
  color: #f2fbf9;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif !important;
  font-size: 26px;
  font-weight: 750;
  line-height: 1.35;
  letter-spacing: -.025em;
}

/* Labels and fields — both steps */

.sp-page #request-plan .sp-request-card label {
  display: block;
  margin: 19px 0 9px;
  color: #e0f1eb;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.6;
}

.sp-page #request-plan .sp-request-card input,
.sp-page #request-plan .sp-request-card select {
  width: 100%;
  min-width: 0;
  min-height: 54px;
  padding: 14px 16px;
  box-sizing: border-box;
  background: rgba(4, 27, 28, .2);
  border: 1px solid rgba(143, 217, 207, .45);
  border-radius: 6px;
  box-shadow: none;
  color: #f2fbf9;
  font-family: inherit;
  font-size: 16px;
  line-height: 1.5;
  color-scheme: dark;
  transition: border-color .2s ease, background .2s ease;
}

.sp-page #request-plan .sp-request-card input::placeholder {
  color: #a5c7bf;
  opacity: 1;
}

.sp-page #request-plan .sp-request-card input:hover,
.sp-page #request-plan .sp-request-card select:hover {
  border-color: rgba(143, 217, 207, .7);
}

.sp-page #request-plan .sp-request-card input:focus,
.sp-page #request-plan .sp-request-card select:focus {
  outline: 2px solid #8fd9cf;
  outline-offset: 3px;
  border-color: #8fd9cf;
  background: rgba(4, 27, 28, .35);
  box-shadow: none;
}

.sp-page #request-plan .sp-request-card select option {
  background: #0a2e2e;
  color: #f2fbf9;
}

.sp-page #request-plan .sp-request-card input:disabled,
.sp-page #request-plan .sp-request-card select:disabled {
  opacity: .65;
  cursor: not-allowed;
}

/* Browser autofill */

.sp-page #request-plan .sp-request-card input:-webkit-autofill {
  -webkit-text-fill-color: #f2fbf9;
  -webkit-box-shadow: 0 0 0 1000px #0b3435 inset;
  caret-color: #f2fbf9;
}

.sp-page #request-plan .sp-optional {
  color: #aacac2;
  font-weight: 400;
}

.sp-page #request-plan .sp-field-help {
  margin: 10px 0 0 !important;
  color: #aacac2;
  font-size: 12px;
  line-height: 1.7;
}

/* Website summary on step two */

.sp-page #request-plan .sp-website-summary {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  padding: 13px 15px;
  background: rgba(143, 217, 207, .06);
  border: 1px solid rgba(143, 217, 207, .18);
  border-radius: 6px;
  color: #d3e9e3;
  font-size: 12px;
  line-height: 1.7;
}

.sp-page #request-plan .sp-website-summary button {
  color: #8fd9cf;
  font-size: 12px;
  text-underline-offset: 3px;
  cursor: pointer;
}

.sp-page #request-plan .sp-website-summary button:disabled {
  opacity: .6;
  cursor: not-allowed;
}

/* Submit button */

.sp-page #request-plan .sp-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  min-height: 54px;
  margin-top: 26px;
  padding: 15px 20px;
  background: #167273;
  border: 1px solid #167273;
  border-radius: 6px;
  box-shadow: none;
  color: #fafafa !important;
  font-size: 14px;
  font-weight: 650;
  line-height: 1.5;
}

.sp-page #request-plan .sp-submit:hover:not(:disabled) {
  background: #1b8181;
  border-color: #1b8181;
  box-shadow: none;
  transform: none;
}

.sp-page #request-plan .sp-submit:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.sp-page #request-plan .sp-submit:focus-visible,
.sp-page #request-plan .sp-request-card a:focus-visible,
.sp-page #request-plan .sp-website-summary button:focus-visible {
  outline: 2px solid #8fd9cf;
  outline-offset: 4px;
}

/* Supporting text */

.sp-page #request-plan .sp-form-privacy {
  margin: 18px 0 0 !important;
  color: #aacac2;
  font-size: 11px;
  line-height: 1.8;
  text-align: left;
}

.sp-page #request-plan .sp-form-privacy a {
  color: #d7eee7;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.sp-page #request-plan .sp-no-obligation {
  margin: 9px 0 0 !important;
  color: #c8e5db;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.7;
  text-align: left;
}

.sp-page #request-plan .sp-preview-note {
  margin: 12px 0 0 !important;
  color: #aacac2;
  font-size: 10px;
  line-height: 1.7;
  text-align: left;
}

/* Error and preview states */

.sp-page #request-plan .sp-error {
  color: #ffbdb7;
  font-size: 12px;
  line-height: 1.7;
}

.sp-page #request-plan .sp-error a {
  color: #ffdbd7;
}

.sp-page #request-plan .sp-preview-message {
  margin-top: 20px;
  padding: 16px;
  background: rgba(143, 217, 207, .07);
  border-left: 2px solid #8fd9cf;
  color: #d3e9e3;
  font-size: 12px;
  line-height: 1.8;
}

.sp-page #request-plan .sp-preview-message b,
.sp-page #request-plan .sp-preview-message a {
  color: #f2fbf9;
}

.sp-page #request-plan .sp-preview-message p {
  color: #bddbd3;
}

/* Success state */

.sp-page #request-plan .sp-success {
  padding: 25px 0;
  color: #f2fbf9;
}

.sp-page #request-plan .sp-success > .sp-icon-circle {
  background: rgba(143, 217, 207, .12);
  color: #8fd9cf;
}

.sp-page #request-plan .sp-success h3 {
  color: #f2fbf9;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif !important;
  font-size: 28px;
  line-height: 1.3;
}

.sp-page #request-plan .sp-success p {
  color: #bddbd3;
  font-size: 14px;
  line-height: 1.8;
}

.sp-page #request-plan .sp-success a {
  color: #8fd9cf;
}

/* Tablet */

@media (max-width: 1100px) {
  .sp-page #request-plan > .sp-container {
    width: calc(100% - 64px);
  }

  .sp-page #request-plan .sp-final-grid {
    gap: 40px;
  }

  .sp-page #request-plan .sp-request-card {
    padding: 30px;
  }

  .sp-page #request-plan .sp-request-step-header {
    gap: 14px;
  }

  .sp-page #request-plan .sp-request-step-label {
    gap: 12px;
  }

  .sp-page #request-plan .sp-request-step-name {
    padding-left: 12px;
  }
}

/* Mobile */

@media (max-width: 800px) {
  .sp-page #request-plan {
    padding: 60px 0;
  }

  .sp-page #request-plan > .sp-container {
    width: calc(100% - 40px);
  }

  .sp-page #request-plan .sp-final-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .sp-page #request-plan .sp-final-grid > div:first-child {
    padding-top: 0;
  }

  .sp-page #request-plan h2 {
    max-width: 650px;
    font-size: clamp(32px, 6vw, 44px);
  }

  .sp-page #request-plan .sp-lead {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .sp-page #request-plan .sp-request-card {
    padding: 25px 20px;
    border-radius: 9px;
  }

  .sp-page #request-plan .sp-request-step-header {
    flex-wrap: wrap;
    row-gap: 16px;
    margin-bottom: 25px;
  }

  .sp-page #request-plan .sp-request-step-status {
    margin-left: auto;
  }

  .sp-page #request-plan .sp-request-step-number {
    font-size: 38px;
  }

  .sp-page #request-plan .sp-request-step-name {
    font-size: 11px;
  }

  .sp-page #request-plan .sp-form-title h3 {
    font-size: 23px;
  }

  .sp-page #request-plan .sp-final-benefits li {
    font-size: 13px;
  }
}


/* Four-column AI recommendations table */

.sp-ai-action-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.sp-ai-action-table th:nth-child(1),
.sp-ai-action-table td:nth-child(1) {
  width: 15%;
  white-space: nowrap; /* Prevents "Priority" from breaking into two lines */
}

.sp-ai-action-table th:nth-child(2),
.sp-ai-action-table td:nth-child(2) {
  width: 22%;
}

.sp-ai-action-table th:nth-child(3),
.sp-ai-action-table td:nth-child(3) {
  width: 31%;
}

.sp-ai-action-table th:nth-child(4),
.sp-ai-action-table td:nth-child(4) {
  width: 32%;
}

.sp-ai-action-table th,
.sp-ai-action-table td {
  overflow-wrap: break-word;
  vertical-align: top;
}

@media (max-width: 767px) {
  .sp-ai-action-table {
    min-width: 880px;
  }
}


/* TESTIMONIAL SLIDER */

.sp-page #request-plan .sp-testimonial-slider {
  width: 100%;
  max-width: 580px;
  margin-top: 44px;
}

/* Card */

 
.sp-page #request-plan .sp-testimonial-card {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  min-height: 310px;
  display: flex;
  align-items: stretch;
}


/* Smooth transition */

.sp-page #request-plan .sp-testimonial-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: spTestimonialFade 0.4s ease both;
}

@keyframes spTestimonialFade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Quote mark */


.sp-page #request-plan .sp-testimonial-quote-mark {
  display: block;
  color: #70d1c4;
  font-family: Georgia, serif;
  font-size: 105px;
  line-height: 0.85;
  height: 65px;
  font-weight: 400;
}

.sp-page #request-plan .sp-testimonial-quote {
  margin: 18px 0 36px;
  padding: 0;
  border: none;
  color: #fafafa;
  font-size: 21px;
  font-weight: 500;
  line-height: 1.65;
  letter-spacing: -0.025em;
  max-width: 570px;
}

/* Author */


.sp-page #request-plan .sp-testimonial-author {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: 22px;
  margin-top: auto;
  border-top: 1px solid rgba(143, 217, 207, 0.22);
  max-width: 570px;
}


.sp-page #request-plan .sp-testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: #167273;
  display: grid;
  place-items: center;
  color: #fafafa;
  font-size: 22px;
  font-weight: 700;
}

.sp-page #request-plan .sp-testimonial-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sp-page #request-plan .sp-testimonial-author-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}


.sp-page #request-plan .sp-testimonial-author-info strong {
  color: #fafafa;
  font-size: 16px;
  font-weight: 700;
}


.sp-page #request-plan .sp-testimonial-author-info > span {
  color: #a9d9d1;
  font-size: 13px;
}

/* Navigation */

.sp-page #request-plan .sp-testimonial-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 18px;
}

.sp-page #request-plan .sp-testimonial-arrow {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(143, 217, 207, 0.35);
  border-radius: 50%;
  background: transparent;
  color: #c9e8e2;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s ease;
}

.sp-page #request-plan .sp-testimonial-arrow:hover {
  background: #167273;
  border-color: #167273;
  color: #fafafa;
}

.sp-page #request-plan .sp-testimonial-dots {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sp-page #request-plan .sp-testimonial-dot {
  width: 9px;
  height: 9px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(143, 217, 207, 0.3);
  cursor: pointer;
  transition: 0.2s ease;
}

.sp-page #request-plan .sp-testimonial-dot.active {
  background: #8fd9cf;
  transform: scale(1.15);
}

.sp-page #request-plan .sp-testimonial-arrow:focus-visible,
.sp-page #request-plan .sp-testimonial-dot:focus-visible {
  outline: 2px solid #8fd9cf;
  outline-offset: 4px;
}

/* Mobile */

@media (max-width: 800px) {
  .sp-page #request-plan .sp-testimonial-slider {
    max-width: 100%;
    margin-top: 28px;
  }

  .sp-page #request-plan .sp-testimonial-card {
    padding: 26px 24px;
    min-height: 0;
  }

  .sp-page #request-plan .sp-testimonial-quote {
    font-size: 15px;
    line-height: 1.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sp-page #request-plan .sp-testimonial-content {
    animation: none;
  }

  .sp-page #request-plan .sp-testimonial-arrow,
  .sp-page #request-plan .sp-testimonial-dot {
    transition: none;
  }
}



.sp-page .sp-context-textarea {
  display: block;
  width: 100%;
  min-height: 112px;
  padding: 13px 15px;
  background: transparent;
  border: 1px solid rgba(143, 217, 207, 0.35);
  border-radius: 4px;
  color: #fafafa;
  font: inherit;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s ease;
}

.sp-page .sp-context-textarea::placeholder {
  color: #91b6b3;
  opacity: 1;
}

.sp-page .sp-context-textarea:focus {
  border-color: #8fd9cf;
  box-shadow: 0 0 0 2px rgba(143, 217, 207, 0.12);
}

`;