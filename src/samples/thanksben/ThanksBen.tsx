import { useEffect, useMemo, useState } from 'react';

import './ThanksBen.css';
import BuyerMap from './BuyerMap';
import KeywordPriorities from './KeywordPriorities';
import AiVisibility from './AiVisibility';
import Roadmap from './Roadmap';
import ContentOpportunities from './ContentOpportunities';

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

const nav = [
  ['buyers', 'Audience Mapping'],
  ['keywords', 'Keyword Priorities'],
  ['competition', 'Content Opportunities'],
  ['ai', 'AI Visibility'],
  ['roadmap', '90-day Roadmap'],
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
    document.title = 'Ben | 90-Day SEO Plan ';
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute(
      'content',
      'A GrowUp organic growth plan for Ben, with research directions, commercial search priorities and a 90-day roadmap.',
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
  <small>90-day plan</small>
</div>

        <div className="tb-side-label tb-side-label-nav">THE PLAN</div>
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
   <p>A 90-day SEO plan focused on qualified demand and pipeline growth.</p>
          <a
            href="https://www.seo-growup.com/get-in-touch"
            target="_blank"
            rel="noreferrer"
          >
            Discuss this plan <Arrow size={15} />
          </a>
        </div>
      </aside>
      <div className="tb-shell">
    
    
    
        <main>



<section
  id="overview"
  className="tb-editorial-hero tb-page-section"
>
  <div className="tb-container">
    <div className="tb-editorial-brandline">
      <span>GrowUp</span>
      <span aria-hidden="true">/</span>
      <span>Plan for Ben</span>
    </div>

    <div className="tb-editorial-grid">
      <div className="tb-editorial-copy">
        <p className="tb-editorial-eyebrow">
          90-DAY SEO PLAN
        </p>

               <h1 className="tb-editorial-title">
          Build a stronger pipeline through <span>organic search</span>
        </h1>


        <p className="tb-editorial-description">
This SEO plan sets out how Ben can reach more potential customers and create more opportunities for meaningful conversations with sales.
        </p>

        <div className="tb-editorial-actions">
          <button
            type="button"
            className="tb-editorial-primary"
            onClick={() => go('keywords')}
          >
            Explore the plan
            <Arrow />
          </button>

          <button
            type="button"
            className="tb-editorial-secondary"
            onClick={() => window.print()}
          >
            Download PDF
            <Download />
          </button>
        </div>
      </div>

  <div className="tb-plan-visual">
  <img
    src="/images/ben-hero-img-plan.png"
    alt="GrowUp’s 90-day SEO plan for Ben"
    className="tb-plan-visual-image"
  />
</div>



    </div>
  </div>
</section>

<BuyerMap />


                   <KeywordPriorities />
                     <ContentOpportunities />

          <AiVisibility />
             <Roadmap />






          <footer className="tb-footer">
            <div className="tb-container">
              <div>
            <img
  src="/images/growupblacklogotransparent.png"
  alt="GrowUp"
  className="tb-footer-logo"
/>
<p>SEO focused on qualified demand, pipeline and revenue.</p>

              </div>
              <a
                href="https://www.seo-growup.com/get-in-touch"
                target="_blank"
                rel="noreferrer"
              >
                Discuss your SEO plan <Arrow />
              </a>
              <small>
                © {new Date().getFullYear()} GrowUp 
              </small>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
