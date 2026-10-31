import { useEffect, useMemo, useState } from 'react';

import './ThanksBen.css';
import BuyerMap from './BuyerMap';
import KeywordPriorities from './KeywordPriorities';
import AiVisibility from './AiVisibility';
import CompetitorOpportunities from './CompetitorOpportunities';

type Priority = 'High' | 'Medium' | 'Low';
type Theme = 'Buying intent' | 'Use cases' | 'Business case';
type Opportunity = {
  id: string;
  keyword: string;
  theme: Theme;
  title: string;
  action: 'Create' | 'Improve' | 'Validate';
  priority: Priority;
  buyer: string;
  rationale: string;
  outline: string[];
  evidence: string;
  success: string;
  source?: string;
};

const opportunities: Opportunity[] = [
  {
    id: 'BEN-01',
    keyword: 'global benefits management platform',
    theme: 'Buying intent',
    title: 'Global benefits management platform',
    action: 'Improve',
    priority: 'High',
    buyer: 'Global Head of Reward',
    rationale:
      'A close fit with Ben’s current enterprise positioning: consistent administration across countries, regional flexibility, eligibility rules and payroll reconciliation. First audit whether the existing benefits-management page fully serves vendor-evaluation intent.',
    outline: [
      'Lead with operating complexity across multiple entities and markets',
      'Explain eligibility and regional policy configuration in product-specific terms',
      'Demonstrate the benefits-to-payroll reconciliation workflow',
      'Add implementation, security and reporting questions for evaluators',
    ],
    evidence:
      'Product screenshots, country-coverage qualifications, implementation process, verifiable customer proof.',
    success: 'Qualified product enquiries and visits to enterprise/demo pages',
    source: 'https://www.thanksben.com/benefits-management',
  },
  {
    id: 'BEN-02',
    keyword: 'employee benefits platform comparison',
    theme: 'Buying intent',
    title: 'Enterprise benefits platforms: evaluation framework',
    action: 'Create',
    priority: 'High',
    buyer: 'Reward & Benefits Director',
    rationale:
      'Buyers comparing vendors need a practical evaluation framework rather than a generic list of employee perks. Target the category with clear requirements for multinational operations.',
    outline: [
      'Separate provider network, administration software and employee experience',
      'Compare country support, configurable rules and integration requirements',
      'Include a procurement scorecard and questions to ask vendors',
      'Explain trade-offs without unsupported competitor claims',
    ],
    evidence:
      'Documented feature criteria, current pricing/packaging links, proof for each comparison.',
    success: 'Evaluation-page engagement and demo-assisted opportunities',
  },
  {
    id: 'BEN-03',
    keyword: 'benefits payroll reconciliation',
    theme: 'Use cases',
    title: 'Benefits-to-payroll reconciliation workflow',
    action: 'Create',
    priority: 'High',
    buyer: 'Payroll & HR Operations',
    rationale:
      'Payroll errors and reconciliation are explicit pain points in Ben’s current messaging. A detailed workflow page could capture operations-led searches and support technical reviews.',
    outline: [
      'Map enrolment changes through to payroll deductions',
      'Show exception handling and audit trail requirements',
      'Describe HRIS/payroll data flow with verified integration boundaries',
      'Include a checklist for payroll and benefits teams',
    ],
    evidence:
      'Annotated product workflow, integration documentation, anonymised before/after process example.',
    success:
      'Relevant operations-led enquiries and progression to product pages',
    source: 'https://www.thanksben.com/benefits-management',
  },
  {
    id: 'BEN-04',
    keyword: 'multi country employee benefits management',
    theme: 'Use cases',
    title: 'Multi-country employee benefits operations',
    action: 'Create',
    priority: 'High',
    buyer: 'Global People Operations',
    rationale:
      'Ben describes one platform with local flexibility. A country-operations use case can connect that promise to the real mechanics of market launches and local eligibility policies.',
    outline: [
      'Identify core vs locally configurable programme components',
      'Explain multi-entity policy and eligibility governance',
      'Show rollout stages and ownership across markets',
      'Document limitations and regulatory review points',
    ],
    evidence:
      'Country-specific implementation examples verified by Ben, rollout checklist, local compliance review.',
    success: 'International-enterprise enquiries and target-account engagement',
  },
  {
    id: 'BEN-05',
    keyword: 'employee benefits administration software',
    theme: 'Buying intent',
    title: 'Benefits administration software for enterprise teams',
    action: 'Improve',
    priority: 'High',
    buyer: 'HR Operations Director',
    rationale:
      'This broader category can bring buyers into the evaluation process, but deserves precise enterprise differentiation rather than simply repeating the homepage.',
    outline: [
      'Audit the existing page for category-search fit and cannibalisation',
      'Explain enrolment, eligibility, approvals and reporting',
      'Document how Ben handles existing benefit providers',
      'Connect operational pain points to verified modules',
    ],
    evidence:
      'Current information architecture, SERP review, product capabilities and customer examples.',
    success: 'Qualified enquiries from benefits administration searches',
  },
  {
    id: 'BEN-06',
    keyword: 'employee benefits platform ROI',
    theme: 'Business case',
    title: 'Benefits platform business-case model',
    action: 'Create',
    priority: 'High',
    buyer: 'CFO / VP People',
    rationale:
      'Enterprise buyers often need financial justification. A transparent framework can quantify avoidable administration, rework and programme spend without inventing ROI claims.',
    outline: [
      'Break down current administration and exception-handling hours',
      'Account for implementation and software costs',
      'Separate hard savings from softer employee-experience benefits',
      'Provide editable assumptions and sensitivity ranges',
    ],
    evidence:
      'Client-approved benchmarks or clearly labelled illustrative inputs; formula documentation.',
    success:
      'Business-case downloads, finance-stakeholder engagement and opportunity influence',
  },
  {
    id: 'BEN-07',
    keyword: 'Ben vs traditional benefits broker',
    theme: 'Buying intent',
    title: 'Ben versus broker-led benefits administration',
    action: 'Create',
    priority: 'Medium',
    buyer: 'Head of Reward',
    rationale:
      'The distinction between benefits brokerage and the software infrastructure is important during evaluation, especially because Ben also supports existing brokers.',
    outline: [
      'Clarify what brokers, providers and a management platform each do',
      'Explain bring-your-own-broker scenarios',
      'Compare administration, data consolidation and employee journeys',
      'State where a broker relationship remains essential',
    ],
    evidence:
      'Verified broker support, partner model and product documentation.',
    success: 'Sales-assisted visits and competitor/broker-related enquiries',
    source: 'https://www.thanksben.com/pricing',
  },
  {
    id: 'BEN-08',
    keyword: 'global employee benefits reporting',
    theme: 'Use cases',
    title: 'Global benefits reporting and spend visibility',
    action: 'Create',
    priority: 'Medium',
    buyer: 'Finance & Total Rewards',
    rationale:
      'Ben positions insights and reporting as an enterprise pillar. This is an opportunity to turn an abstract capability into specific management decisions.',
    outline: [
      'Describe data needed across entities and benefit programmes',
      'Show engagement, utilisation and spend views',
      'Distinguish operational reporting from ROI attribution',
      'Provide dashboard examples with defined metrics',
    ],
    evidence:
      'Current product dashboards, data definitions and a validated customer use case.',
    success: 'Reporting-led enquiries and visits to enterprise solutions',
  },
  {
    id: 'BEN-09',
    keyword: 'employee benefits platform implementation',
    theme: 'Business case',
    title: 'Implementation and migration guide',
    action: 'Improve',
    priority: 'Medium',
    buyer: 'IT / People Systems',
    rationale:
      'Implementation effort can delay enterprise procurement. Ben already describes a four-stage process; a detailed evaluator resource can answer concerns before sales calls.',
    outline: [
      'Describe requirements gathering and benefit configuration',
      'Outline UAT, launch readiness and hypercare',
      'Provide customer-side ownership and data requirements',
      'Explain integrations, dependencies and realistic scope variables',
    ],
    evidence:
      'Verified four-stage implementation process and integration requirements.',
    success: 'Implementation-guide assisted opportunities',
    source: 'https://www.thanksben.com/pricing',
  },
  {
    id: 'BEN-10',
    keyword: 'benefits management software for HR teams',
    theme: 'Use cases',
    title: 'HR operations benefits management playbook',
    action: 'Validate',
    priority: 'Medium',
    buyer: 'HR Operations',
    rationale:
      'Potential supporting intent, but overlap with enterprise administration terms must be checked before creating another page.',
    outline: [
      'Inspect query overlap with benefits-management pages',
      'Map repeating HR tickets and manual processes',
      'Explain configuration and self-service tasks',
      'Link directly to relevant platform modules',
    ],
    evidence:
      'Search Console query clusters, SERP overlap, user workflow examples.',
    success: 'Incremental relevant entrances without cannibalisation',
  },
  {
    id: 'BEN-11',
    keyword: 'employee benefits utilisation reporting',
    theme: 'Business case',
    title: 'Measure employee benefits uptake and value',
    action: 'Create',
    priority: 'Medium',
    buyer: 'Reward Strategy',
    rationale:
      'A measurement-oriented resource can connect benefits engagement to programme optimisation, with careful distinction between usage and financial return.',
    outline: [
      'Define enrolment, utilisation and engagement metrics',
      'Segment insights by region and benefit type',
      'Identify underused benefits and communication gaps',
      'Show a quarterly review template',
    ],
    evidence:
      'Documented reporting definitions and permissions-safe sample data.',
    success: 'Engagement with insights pages and relevant demos',
  },
  {
    id: 'BEN-12',
    keyword: 'flexible benefits platform',
    theme: 'Buying intent',
    title: 'Flexible benefits platform: clarify enterprise fit',
    action: 'Validate',
    priority: 'Low',
    buyer: 'People & Reward',
    rationale:
      'Ben has a relevant offering, but this broad category may over-index on smaller-company perks. Check whether it attracts the enterprise buying committee before expanding.',
    outline: [
      'Review existing rankings and target-account conversions',
      'Map flexible spending against the wider enterprise platform',
      'Clarify use cases and allowance governance',
      'Avoid duplicating established benefits pages',
    ],
    evidence:
      'Search intent analysis, current page performance and customer segmentation.',
    success: 'Enterprise-qualified traffic rather than raw sessions',
    source: 'https://www.thanksben.com/how-it-works',
  },
];





const competitiveAngles = [
  {
    theme: 'Global administration',
    buyer: 'Global Reward',
    review:
      'Inspect how shortlisted platforms document multi-market configuration, local rules, provider administration and ownership.',
    opening:
      'Show the exact operating workflow, not just a list of countries served.',
    proof: 'Screenshots, market scope, implementation and policy examples',
  },
  {
    theme: 'Payroll accuracy',
    buyer: 'Payroll Ops',
    review:
      'Compare whether competing pages explain the actual benefits-to-payroll handoff and exception resolution.',
    opening:
      'Own the reconciliation conversation with a concrete process walkthrough.',
    proof: 'Workflow diagram, sample exception log and integration boundaries',
  },
  {
    theme: 'Finance / ROI',
    buyer: 'CFO / People',
    review:
      'Inspect business-case templates, pricing transparency and cost-of-admin assumptions.',
    opening:
      'Publish a practical, inspectable financial model with sensitivity scenarios.',
    proof:
      'Transparent assumptions, cost categories and approved case evidence',
  },
  {
    theme: 'Implementation risk',
    buyer: 'IT / HRIS',
    review:
      'Compare migration detail, UAT support, data responsibilities and time-to-live caveats.',
    opening:
      'Turn the published four-stage process into a procurement-grade guide.',
    proof: 'Requirements checklist, UAT plan and verified rollout examples',
  },
];



const roadmap = [
  {
    period: 'Days 01–30',
    subtitle: 'Validate & establish the foundation',
    goal: 'Confirm the commercial search landscape before investing in production.',
    tasks: [
      [
        'Search reality check',
        'Validate query clusters, actual SERPs, intent and current rankings for all priority themes.',
      ],
      [
        'Content and conversion inventory',
        'Map existing product, pricing, comparison and educational URLs to buying stages.',
      ],
      [
        'Buyer evidence collection',
        'Get product, payroll and reward stakeholders to approve capabilities, screenshots and proof.',
      ],
      [
        'Measurement baseline',
        'Define demo requests, SQL criteria, opportunity attribution and key page events.',
      ],
    ],
    deliverables: [
      'Validated keyword opportunity register',
      'Create / improve / consolidate decisions',
      'Page-level measurement baseline',
      'Approved first-wave content briefs',
    ],
  },
  {
    period: 'Days 31–60',
    subtitle: 'Build the decision-stage layer',
    goal: 'Publish and improve the pages most likely to help enterprise buyers evaluate Ben.',
    tasks: [
      [
        'Improve core category page',
        'Tighten enterprise benefits-management messaging around market governance and operational workflows.',
      ],
      [
        'Create payroll workflow asset',
        'Explain enrolment-to-payroll data flow, reconciliation exceptions and technical considerations.',
      ],
      [
        'Publish buyer evaluation guide',
        'Give reward leaders a procurement-ready comparison framework.',
      ],
      [
        'Produce financial model',
        'Build a transparent platform business-case worksheet with editable assumptions.',
      ],
    ],
    deliverables: [
      'Core commercial page refresh',
      'Payroll reconciliation page',
      'Vendor evaluation guide',
      'ROI / TCO planning asset',
    ],
  },
  {
    period: 'Days 61–90',
    subtitle: 'Distribute, measure & refine',
    goal: 'Turn the new assets into observable buyer engagement and a repeatable quarterly programme.',
    tasks: [
      [
        'Strengthen internal pathways',
        'Connect guides to relevant product, implementation, pricing and demo destinations.',
      ],
      [
        'Activate relevant authority sources',
        'Prioritise partner resources, expert contributions and genuinely useful HR/payroll commentary.',
      ],
      [
        'Review AI answer samples',
        'Manually record platform, prompt, date and cited sources before claiming any visibility change.',
      ],
      [
        'Report commercial signals',
        'Compare qualified enquiries, stakeholder journeys and page influence; set next-quarter priorities.',
      ],
    ],
    deliverables: [
      'Internal-link and distribution register',
      'Dated AI visibility observation log',
      'Commercial performance review',
      'Next-quarter opportunity backlog',
    ],
  },
];

const citations = [
  {
    label: 'Ben homepage and enterprise positioning',
    url: 'https://www.thanksben.com/',
  },
  {
    label: 'Benefits management capabilities',
    url: 'https://www.thanksben.com/benefits-management',
  },
  {
    label: 'Product modules and workflows',
    url: 'https://www.thanksben.com/how-it-works',
  },
  {
    label: 'Pricing, packaging and implementation FAQ',
    url: 'https://www.thanksben.com/pricing',
  },
  {
    label: 'Company overview and market scope',
    url: 'https://www.thanksben.com/about-us',
  },
];

const nav = [
  ['overview', 'Executive overview'],
  ['buyers', 'Buying committee'],
  ['keywords', 'Search priorities'],
  ['competition', 'Competitor opportunities'],
  ['ai', 'AI visibility'],
  ['roadmap', '90-day roadmap'],
  ['measurement', 'Measurement'],
] as const;

function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h16m-7-7 7 7-7 7" />
    </svg>
  );
}
function External({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 5h6v6M19 5l-9 9" />
      <path d="M19 13v6H5V5h6" />
    </svg>
  );
}
function Download() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />
    </svg>
  );
}
function SectionTitle({
  no,
  eyebrow,
  title,
  description,
}: {
  no: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="tb-section-intro">
      <div className="tb-eyebrow">
        <span>{no}</span>
        {eyebrow}
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
function Pill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: string;
}) {
  return (
    <span className={`tb-pill tb-pill-${tone.toLowerCase()}`}>{children}</span>
  );
}
function downloadCSV(data: Opportunity[]) {
  const rows = [
    [
      'ID',
      'Search theme (to validate)',
      'Intent cluster',
      'Recommended asset',
      'Action',
      'Priority',
      'Buyer',
      'Rationale',
      'Evidence required',
      'Commercial success measure',
    ],
    ...data.map((o) => [
      o.id,
      o.keyword,
      o.theme,
      o.title,
      o.action,
      o.priority,
      o.buyer,
      o.rationale,
      o.evidence,
      o.success,
    ]),
  ];
  const csv = rows
    .map((r) =>
      r.map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(','),
    )
    .join('\r\n');
  const url = URL.createObjectURL(
    new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }),
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = 'growup-thanksben-search-opportunities.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function ThanksBen() {
  const [active, setActive] = useState('overview');
  const [category, setCategory] = useState<'All' | Theme>('All');
  const [priority, setPriority] = useState<'All' | Priority>('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Opportunity | null>(
    opportunities[0],
  );
  const [phase, setPhase] = useState(0);
  const [menu, setMenu] = useState(false);
  const [aiSelected, setAiSelected] = useState(0);
  const filtered = useMemo(
    () =>
      opportunities.filter(
        (o) =>
          (category === 'All' || o.theme === category) &&
          (priority === 'All' || o.priority === priority) &&
          (o.keyword + ' ' + o.title + ' ' + o.buyer)
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, priority, query],
  );
  useEffect(() => {
    document.title = 'Ben | 90-Day SEO Strategy — GrowUp';
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute(
      'content',
      'An illustrative GrowUp organic growth strategy for Ben, with research directions, commercial search priorities and a 90-day roadmap.',
    );
    const robots =
      document.querySelector('meta[name="robots"]') ||
      document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex, nofollow');
    if (!robots.parentElement) document.head.appendChild(robots);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        }),
      { rootMargin: '-20% 0px -62% 0px' },
    );
    nav.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenu(false);
  };
  return (
    <div className="tb-root">
      <a className="tb-skip" href="#overview">
        Skip to strategy
      </a>
      <aside className={`tb-sidebar ${menu ? 'tb-sidebar-open' : ''}`}>
      

<div className="tb-brand">
  <a href="/" aria-label="GrowUp homepage">
    <img
      src="/images/growupblacklogotransparent.png"
      alt="GrowUp"
      className="tb-sidebar-logo"
    />
  </a>
</div>

     
<div className="tb-side-label">CLIENT WORKSPACE</div>
<div className="tb-side-client">
  <img
    src="/images/ben-logo.svg"
    alt="Ben"
    className="tb-client-logo"
  />
  <small>90-day strategy</small>
</div>

        <div className="tb-side-label tb-side-label-nav">THE STRATEGY</div>
        <nav aria-label="Strategy sections">
          {nav.map(([id, label], i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={active === id ? 'is-active' : ''}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {label}
            </button>
          ))}
        </nav>
        <div className="tb-side-bottom">
          <div className="tb-side-line" />
          <span>PREPARED BY GROWUP</span>
          <p>A commercial SEO strategy, not a traffic forecast.</p>
          <a
            href="https://www.seo-growup.com/get-in-touch"
            target="_blank"
            rel="noreferrer"
          >
            Discuss this strategy <Arrow size={15} />
          </a>
        </div>
      </aside>
      <div className="tb-shell">
        <header className="tb-topbar">
          <button
            className="tb-mobile-toggle"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
         
<div className="tb-breadcrumb">
  GrowUp <span>/</span> <strong>Ben</strong>
</div>

          <div className="tb-top-actions">
            <span className="tb-sample-label">
              <span className="tb-status-dot" /> Illustrative strategy
            </span>
            <button onClick={() => window.print()} className="tb-icon-button">
              Print / PDF <Download />
            </button>
          </div>
        </header>
        <main>
          <section id="overview" className="tb-hero tb-page-section">
            <div className="tb-container">
              <div className="tb-hero-kicker">
                <span>STRATEGY DOCUMENT 001</span>
                <i /> <span>OCTOBER 2026 · RESEARCH-LED SAMPLE</span>
              </div>
              <div className="tb-hero-main">
                <div>
                  <div className="tb-hero-pretitle">
                    An organic growth strategy for{' '}
                    <span className="tb-ben-inline">ben.</span>
                  </div>
                  <h1>
                    Turn enterprise benefits complexity into{' '}
                    <em>qualified demand.</em>
                  </h1>
                  <p className="tb-hero-lead">
                    A proposed 90-day search strategy for Ben: where to meet
                    global reward, payroll and finance buyers; what evidence to
                    build; and how to connect organic activity to opportunities,
                    not just visits.
                  </p>
                  <div className="tb-hero-buttons">
                    <button
                      onClick={() => go('keywords')}
                      className="tb-primary-btn"
                    >
                      Explore search priorities <Arrow />
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="tb-outline-btn"
                    >
                      Export as PDF <Download />
                    </button>
                  </div>
                </div>
                <div className="tb-hero-art">
                  <div className="tb-art-label">
                    THE STRATEGIC THESIS <span>01 / 03</span>
                  </div>
                  <div className="tb-art-panel">
                    <div className="tb-art-orbit">
                      <div>
                        GLOBAL
                        <br />
                        REWARD
                      </div>
                      <div>
                        PAYROLL
                        <br />
                        OPS
                      </div>
                      <div>
                        FINANCE
                        <br />
                        BUYER
                      </div>
                      <span className="tb-art-hub">ben.</span>
                    </div>
                    <div className="tb-art-caption">
                      One story. Multiple buying decisions.
                    </div>
                  </div>
                  <div className="tb-art-foot">
                    <span>FROM PRODUCT CAPABILITIES</span>
                    <Arrow />
                    <span>TO BUYER EVIDENCE</span>
                  </div>
                </div>
              </div>
              <div className="tb-hero-meta">
                <div>
                  <small>FOCUS MARKET</small>
                  <strong>Multinational enterprises</strong>
                </div>
                <div>
                  <small>PRIMARY MOTION</small>
                  <strong>High-intent organic discovery</strong>
                </div>
                <div>
                  <small>DELIVERY HORIZON</small>
                  <strong>Next 90 days</strong>
                </div>
                <div>
                  <small>STATUS</small>
                  <strong>Research hypotheses to validate</strong>
                </div>
              </div>
            </div>
          </section>
          <section className="tb-context">
            <div className="tb-container tb-context-flex">
              <div className="tb-context-number">
                THE
                <br />
                POINT
              </div>
              <p>
                Ben already has a clear enterprise product story. The
                opportunity is to make that story discoverable{' '}
                <strong>
                  at the precise moments buyers are comparing platforms, solving
                  operational pain or justifying investment.
                </strong>
              </p>
            </div>
          </section>


<BuyerMap />


                   <KeywordPriorities />
                     <CompetitorOpportunities />

          <AiVisibility />

          <section className="tb-page-section tb-pad tb-roadmap" id="roadmap">
            <div className="tb-container">
              <SectionTitle
                no="05"
                eyebrow="90-DAY EXECUTION ROADMAP"
                title="An actual sequence of work. Not a list of disconnected ideas."
                description="Start with validation, build a small decision-stage content layer, then assess which journeys are moving relevant accounts towards sales conversations."
              />
              <div className="tb-phase-tabs">
                {roadmap.map((r, i) => (
                  <button
                    key={r.period}
                    className={phase === i ? 'active' : ''}
                    onClick={() => setPhase(i)}
                  >
                    <span>0{i + 1}</span>
                    <strong>{r.period}</strong>
                    <small>{r.subtitle}</small>
                  </button>
                ))}
              </div>
              <div className="tb-phase-content">
                <div className="tb-phase-main">
                  <span className="tb-overline">
                    PHASE 0{phase + 1} · OUTCOME
                  </span>
                  <h3>{roadmap[phase].goal}</h3>
                  <div className="tb-task-list">
                    {roadmap[phase].tasks.map(([t, d], i) => (
                      <div className="tb-task" key={t}>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <strong>{t}</strong>
                          <p>{d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <aside className="tb-phase-output">
                  <span>WHAT THE TEAM SHOULD HAVE</span>
                  <h3>Phase deliverables</h3>
                  {roadmap[phase].deliverables.map((d, i) => (
                    <div key={d}>
                      <span>0{i + 1}</span>
                      <p>{d}</p>
                    </div>
                  ))}
                  <p className="tb-phase-caveat">
                    Outputs depend on access, available evidence, editorial
                    resources and stakeholder review.
                  </p>
                </aside>
              </div>
            </div>
          </section>
          <section
            className="tb-page-section tb-pad tb-measure"
            id="measurement"
          >
            <div className="tb-container">
              <SectionTitle
                no="06"
                eyebrow="MEASUREMENT & ACCOUNTABILITY"
                title="The scorecard should follow the buying journey all the way to pipeline."
                description="Avoid confusing increases in generic organic traffic with progress towards qualified enterprise demand. Review these signals in sequence and connect them to known CRM outcomes where possible."
              />
              <div className="tb-metrics-grid">
                {[
                  {
                    n: '01',
                    label: 'Discoverability',
                    title: 'Are the right buyers finding Ben?',
                    measure:
                      'Relevant category rankings, impressions, AI answer observations and qualified search entrances.',
                    caution: 'An AI mention or impression is not a lead.',
                  },
                  {
                    n: '02',
                    label: 'Consideration',
                    title: 'Are they evaluating the product?',
                    measure:
                      'Visits to solution, implementation, comparison and pricing pages; engagement across sessions and account domains.',
                    caution: 'A page visit alone does not prove influence.',
                  },
                  {
                    n: '03',
                    label: 'Commercial action',
                    title: 'Are those journeys creating demand?',
                    measure:
                      'Demo enquiries, qualified meetings, SQLs and opportunity creation from attributable organic journeys.',
                    caution: 'Separate form completions from held meetings.',
                  },
                  {
                    n: '04',
                    label: 'Revenue influence',
                    title: 'Does the content contribute to pipeline?',
                    measure:
                      'Organic-sourced and content-influenced pipeline, deal-stage touchpoints and closed-won revenue where attribution permits.',
                    caution: 'Use a documented attribution methodology.',
                  },
                ].map((x) => (
                  <div className="tb-metric" key={x.n}>
                    <span>
                      {x.n} / {x.label.toUpperCase()}
                    </span>
                    <h3>{x.title}</h3>
                    <p>{x.measure}</p>
                    <small>{x.caution}</small>
                  </div>
                ))}
              </div>
              <div className="tb-measure-note">
                <div>
                  <small>THE REPORTING PRINCIPLE</small>
                  <h3>
                    Review buyer movement before celebrating traffic growth.
                  </h3>
                </div>
                <p>
                  Track the search themes and pages that lead to deeper product
                  evaluation, demo requests, meetings held and opportunities
                  created. The first 90 days should establish a reliable
                  baseline and early signals—not promise a specific pipeline
                  figure.
                </p>
              </div>
            </div>
          </section>
          <section className="tb-sources">
            <div className="tb-container">
              <div className="tb-sources-head">
                <div>
                  <span>RESEARCH NOTES</span>
                  <h2>What this strategy is based on.</h2>
                </div>
                <p>
                  Publicly accessible Ben product material, reviewed in October
                  2026. Proposed search themes, gaps, buyer segments and the
                  roadmap are GrowUp strategic hypotheses pending live SEO and
                  stakeholder validation.
                </p>
              </div>
              <div className="tb-source-links">
                {citations.map((c, i) => (
                  <a href={c.url} target="_blank" rel="noreferrer" key={c.url}>
                    <span>0{i + 1}</span>
                    {c.label}
                    <External />
                  </a>
                ))}
              </div>
            </div>
          </section>
          <footer className="tb-footer">
            <div className="tb-container">
              <div>
                <strong>
                  GrowUp<span>.</span>
                </strong>
                <p>Organic growth, measured in qualified demand.</p>
              </div>
              <a
                href="https://www.seo-growup.com/get-in-touch"
                target="_blank"
                rel="noreferrer"
              >
                Discuss the recommendations <Arrow />
              </a>
              <small>
                © {new Date().getFullYear()} GrowUp · Illustrative research
                sample · Not commissioned or endorsed by Ben
              </small>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
