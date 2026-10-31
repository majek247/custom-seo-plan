import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import './CompetitorOpportunities.css';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Theme = 'Alternatives' | 'Best of' | 'Pricing' | 'Feature' | 'Comparison';
type Fmt =
  | 'Review hub'
  | 'Vendor page'
  | 'Vendor blog'
  | 'Publisher'
  | 'Forum'
  | 'Analyst'
  | 'Broker';
type Five = [number, number, number, number, number];
type Wave = 1 | 2 | 3;

type Serp = { d: string; t: string; f: Fmt; w?: string };
type Angle = { name: string; hook: string; format: string; proof: string };
type Kw = {
  id: string;
  theme: Theme;
  kind: string;
  action: 'Create' | 'Improve';
  order: number;
  wave: Wave;
  keyword: string;
  asset: string;
  vol: number;
  diff: number;
  score: number;
  intent: string;
  why: string;
  serp: Serp[];
  says: [string, number][];
  gaps: string[];
  angles: Angle[];
  blueprint: string[];
  paa: string[];
  card: { top: Five; ben: Five };
  verify: string;
};

/* ------------------------------------------------------------------ */
/* Reference data                                                      */
/* ------------------------------------------------------------------ */

const THEMES: Theme[] = [
  'Alternatives',
  'Best of',
  'Pricing',
  'Feature',
  'Comparison',
];

const DIMS = [
  'Specificity',
  'Proof & evidence',
  'Original data',
  'Interactivity',
  'Freshness',
];


const BRIEFS: {
  n: string;
  theme: string;
  who: string;
  review: string;
  opening: string;
  evidence: string;
  maps: string[];
  note?: string;
}[] = [
  {
    n: '01',
    theme: 'Global administration',
    who: 'Global Reward',
    review:
      'Inspect how shortlisted platforms document multi-market configuration, local rules, provider administration and ownership.',
    opening:
      'Show the exact operating workflow, not just a list of countries served.',
    evidence: 'Screenshots, market scope, implementation and policy examples',
    maps: ['BO-03', 'BO-13', 'FT-01'],
  },
  {
    n: '02',
    theme: 'Payroll accuracy',
    who: 'Payroll Ops',
    review:
      'Compare whether competing pages explain the actual benefits-to-payroll handoff and exception resolution.',
    opening:
      'Own the reconciliation conversation with a concrete process walkthrough.',
    evidence: 'Workflow diagram, sample exception log and integration boundaries',
    maps: [],
    note: 'No payroll keyword sits in the top 10. See JB-01 and FT-02 in the backlog.',
  },
  {
    n: '03',
    theme: 'Finance / ROI',
    who: 'CFO / People',
    review:
      'Inspect business-case templates, pricing transparency and cost-of-admin assumptions.',
    opening:
      'Publish a practical, inspectable financial model with sensitivity scenarios.',
    evidence: 'Transparent assumptions, cost categories and approved case evidence',
    maps: ['PR-09', 'PR-07'],
  },
  {
    n: '04',
    theme: 'Implementation risk',
    who: 'IT / HRIS',
    review:
      'Compare migration detail, UAT support, data responsibilities and time-to-live caveats.',
    opening:
      'Turn the published four-stage process into a procurement-grade guide.',
    evidence: 'Requirements checklist, UAT plan and verified rollout examples',
    maps: ['VS-12', 'FT-01'],
  },
];

/* ------------------------------------------------------------------ */
/* Keyword data                                                        */
/*                                                                     */
/* IMPORTANT: every SERP row, theme count and scorecard below is an    */
/* ILLUSTRATIVE SAMPLE showing how a live review is reported. Replace  */
/* with logged observations (query, country, date, ranking URL, page   */
/* evidence) before calling anything a verified gap.                   */
/* ------------------------------------------------------------------ */

const s = (d: string, t: string, f: Fmt, w?: string): Serp => ({ d, t, f, w });

const KW: Kw[] = [
  /* ---------------- 1 ---------------- */
  {
    id: 'PR-09',
    theme: 'Pricing',
    kind: 'Calculator',
    action: 'Create',
    order: 1,
    wave: 1,
    keyword: 'employee benefits platform cost per employee',
    asset:
      'Employee benefits platform cost per employee: benchmarks and how to model yours',
    vol: 110,
    diff: 26,
    score: 83,
    intent: 'Finance evaluation',
    why: 'The easiest win on the list and the one a CFO forwards. The model you publish here also feeds PR-07, PR-08 and PR-10, so it is the best first asset to build links around.',
    serp: [
      s('selecthub.com', 'Employee Benefits Software Pricing Guide', 'Review hub', 'Generic ranges, no stated assumptions'),
      s('capterra.com', 'Benefits Administration Software Pricing', 'Review hub', 'Starting-price filters built for SMB'),
      s('forbes.com', 'Best Employee Benefits Platforms for Small Business', 'Publisher', 'PEPM bands that stop well below enterprise'),
      s('reddit.com', 'What do you pay per head for benefits admin?', 'Forum', 'Anecdotes, no method'),
      s('hrdive.com', 'Employer cost of benefits is rising again', 'Publisher', 'Premium cost, not platform cost: intent mismatch'),
    ],
    says: [
      ['Pricing is quote-only (“contact sales”)', 6],
      ['SMB per-employee ranges applied to enterprise', 4],
      ['Premium cost confused with platform cost', 3],
      ['Implementation fees mentioned, never sized', 5],
    ],
    gaps: [
      'No page prices a multi-entity programme, so per-entity and per-country fees are invisible.',
      'Implementation, integration and renewal uplift are named but never quantified.',
      'No cost-of-admin baseline, so a buyer cannot see what the status quo costs.',
      'No sensitivity scenarios. Every range is a single static figure.',
    ],
    angles: [
      {
        name: 'The inspectable model',
        hook: 'Every assumption editable. None hidden.',
        format: 'Interactive calculator plus downloadable sheet',
        proof: 'Assumptions table, cost categories, ±20% sensitivity',
      },
      {
        name: 'Price the status quo first',
        hook: 'Before any vendor fee, what does in-house and multi-vendor admin cost today?',
        format: 'Baseline worksheet',
        proof: 'FTE hours by task, error-correction cost',
      },
      {
        name: 'Fee anatomy teardown',
        hook: 'The line items that move an enterprise quote.',
        format: 'Annotated, anonymised sample quote',
        proof: 'Redacted quote with each fee explained',
      },
    ],
    blueprint: [
      'The answer in three sentences (snippet-ready ranges with caveats)',
      'Pricing models: per employee, per entity, per module',
      'Fee anatomy: an annotated sample quote',
      'Model your cost: the calculator',
      'Sensitivity: three scenarios from 2,000 to 10,000 employees',
      'Questions to put in your RFP',
    ],
    paa: [
      'What is a typical cost per employee for a benefits platform?',
      'What drives the cost of benefits administration software?',
      'Are implementation fees charged separately?',
    ],
    card: { top: [2, 1, 1, 1, 3], ben: [5, 5, 4, 5, 5] },
    verify:
      'Record which top-10 pages show any figure at all, whether any states assumptions, and each page’s last-updated date.',
  },

  /* ---------------- 2 ---------------- */
  {
    id: 'VS-12',
    theme: 'Comparison',
    kind: 'Comparison page',
    action: 'Create',
    order: 2,
    wave: 1,
    keyword: 'benefits administration software vs HRIS',
    asset:
      'Benefits administration software vs HRIS: when your HRIS module is enough',
    vol: 90,
    diff: 27,
    score: 81,
    intent: 'Objection handling',
    why: 'This is the strongest objection in the deal, and nobody has published a neutral answer. A page that admits when the HRIS module is enough earns trust and links.',
    serp: [
      s('rippling.com', 'HRIS vs benefits administration: why one system wins', 'Vendor blog', 'Suite-biased, never says when not to'),
      s('workday.com', 'Workday Benefits', 'Vendor page', 'Product page, not a comparison'),
      s('capterra.com', 'HRIS vs Benefits Administration Software', 'Review hub', 'Definitions, no decision threshold'),
      s('bamboohr.com', 'Do you need benefits software with your HRIS?', 'Vendor blog', 'SMB framing'),
      s('reddit.com', 'HRIS benefits module or separate tool?', 'Forum', 'Mixed opinions, no criteria'),
    ],
    says: [
      ['Single-vendor simplicity is the default recommendation', 6],
      ['HRIS modules are “good enough” for smaller firms', 5],
      ['Dedicated tools add depth, never quantified', 4],
      ['Multi-country rules treated as an edge case', 3],
    ],
    gaps: [
      'No decision threshold. Nobody says at how many entities or countries a module stops being enough.',
      'Exception handling is never compared (life events, mid-year moves, local plan rules).',
      'No total-cost view across both options.',
      'Almost every page is written from the vendor’s side of the argument.',
    ],
    angles: [
      {
        name: 'Draw the line',
        hook: 'Enough up to this point. Here is exactly where it breaks.',
        format: 'Scored decision tool',
        proof: 'Weighted criteria and a worked 14-country example',
      },
      {
        name: 'Six failure modes',
        hook: 'What breaks in an HRIS benefits module at 14 countries.',
        format: 'Teardown with screenshots',
        proof: 'Real configuration walkthrough',
      },
      {
        name: 'Neutral counsel',
        hook: 'Co-written with the people who implement HRIS for a living.',
        format: 'Expert panel guide',
        proof: 'Named implementer quotes with permission',
      },
    ],
    blueprint: [
      'Short answer: when an HRIS module is enough',
      'Seven criteria that decide it',
      'Where HRIS modules strain: entities, eligibility, exceptions',
      'Total cost side by side',
      'Decision tool: score your own situation',
      'Hybrid pattern: keep the HRIS as system of record',
    ],
    paa: [
      'Is benefits administration part of an HRIS?',
      'When should you use a separate benefits platform?',
      'Can an HRIS handle benefits in multiple countries?',
    ],
    card: { top: [2, 2, 1, 1, 3], ben: [5, 4, 3, 5, 5] },
    verify:
      'Note whether any ranking page states a threshold, names a failure mode or includes a non-vendor voice.',
  },

  /* ---------------- 3 ---------------- */
  {
    id: 'ALT-13',
    theme: 'Alternatives',
    kind: 'Alternatives page',
    action: 'Create',
    order: 3,
    wave: 1,
    keyword: 'traditional benefits broker alternatives',
    asset: 'Alternatives to a traditional benefits broker: what to move in-house',
    vol: 90,
    diff: 28,
    score: 81,
    intent: 'Switch consideration',
    why: 'Bring-your-own-broker is a genuine differentiator and the SERP is dominated by brokers defending themselves. An honest unbundling page has little real competition.',
    serp: [
      s('gallagher.com', 'The value of your benefits broker', 'Broker', 'Defends the broker, no platform view'),
      s('mercer.com', 'Benefits consulting and brokerage', 'Broker', 'Service page'),
      s('aon.com', 'Benefits administration and advisory', 'Broker', 'Service page'),
      s('benefitnews.com', 'Alternatives to using a broker', 'Publisher', 'US-centric: PEOs and marketplaces'),
    ],
    says: [
      ['The replacement for a broker is a PEO or marketplace', 5],
      ['Brokers defend advisory and placement value', 3],
      ['Outsourced admin is framed as the only upgrade path', 3],
      ['No split between advisory and administration', 6],
    ],
    gaps: [
      'Nobody unbundles the broker’s jobs into advisory, placement and administration.',
      'The platform-plus-broker model, where the broker stays, is not explained anywhere.',
      'US-centric throughout, with no multi-country perspective.',
      'No transition plan or renewal-timed checklist.',
    ],
    angles: [
      {
        name: 'Unbundle the broker',
        hook: 'Eight broker jobs. Which to keep, which to move.',
        format: 'Interactive job matrix',
        proof: 'Function-by-function table with owner options',
      },
      {
        name: 'Keep your broker',
        hook: 'The platform-plus-broker model nobody explains.',
        format: 'Diagram with a broker partner quote',
        proof: 'Responsibility split and a named broker voice',
      },
      {
        name: 'Renewal countdown',
        hook: 'Twelve months to your broker renewal, month by month.',
        format: 'Timeline template',
        proof: 'Dated checklist with decision points',
      },
    ],
    blueprint: [
      'What a broker actually does (and what it does not)',
      'The three jobs: advise, place, administer',
      'What to move in-house, and what to leave',
      'Platform-plus-broker model, diagrammed',
      'Renewal-timed transition checklist',
      'When to stay with a traditional broker',
    ],
    paa: [
      'What can replace a benefits broker?',
      'Can I use benefits software with my existing broker?',
      'How much does a benefits broker cost?',
    ],
    card: { top: [2, 2, 1, 1, 3], ben: [5, 4, 3, 4, 5] },
    verify:
      'Confirm how many top-10 results are broker-owned and whether any is non-US.',
  },

  /* ---------------- 4 ---------------- */
  {
    id: 'PR-07',
    theme: 'Pricing',
    kind: 'Pricing guide',
    action: 'Create',
    order: 4,
    wave: 1,
    keyword: 'employee benefits administration software pricing',
    asset:
      'Employee benefits administration software pricing: models, fees and hidden costs',
    vol: 170,
    diff: 35,
    score: 83,
    intent: 'Budget planning',
    why: 'Higher volume than PR-09 with a SERP of review-site price bands. Ship it right after the calculator so it can link to a real model.',
    serp: [
      s('capterra.com', 'Benefits Administration Software Pricing', 'Review hub', 'Starting-price filter, no enterprise'),
      s('g2.com', 'Best Benefits Administration Software', 'Review hub', 'Ranked by reviews, not price'),
      s('selecthub.com', 'Benefits Administration Pricing Guide', 'Review hub', 'Generic bands'),
      s('softwareadvice.com', 'Benefits Software Pricing', 'Review hub'),
    ],
    says: [
      ['Price ranges by company size (SMB bands)', 6],
      ['“Request a quote” on vendor pages', 5],
      ['Feature tiers listed without any fees', 4],
      ['Hidden costs named in general terms', 3],
    ],
    gaps: [
      'No per-entity or per-country fee logic anywhere.',
      'Renewal uplift, integration and change-request fees are never addressed.',
      'No worked multi-entity example a finance reader can reuse.',
      'No list of questions to demand answers to before the demo.',
    ],
    angles: [
      {
        name: 'The hidden-cost ledger',
        hook: 'Fourteen line items that move an enterprise quote.',
        format: 'Checklist with annotated quote',
        proof: 'Each fee defined, typical driver and what to ask',
      },
      {
        name: 'One programme, three prices',
        hook: '6,000 employees across 14 countries, priced three ways.',
        format: 'Scenario table',
        proof: 'Stated assumptions and a link to the PR-09 model',
      },
      {
        name: 'Pre-demo RFP pack',
        hook: 'Pricing questions to send before anyone books a call.',
        format: 'Downloadable question set',
        proof: 'Procurement-ready template',
      },
    ],
    blueprint: [
      'Pricing models explained in plain English',
      'What is usually included, and what is not',
      'Hidden-cost ledger',
      'Worked example: multi-entity programme',
      'Negotiation levers and renewal terms',
      'RFP pricing questions (downloadable)',
    ],
    paa: [
      'How much does benefits administration software cost?',
      'What is PEPM pricing?',
      'What hidden costs come with benefits software?',
    ],
    card: { top: [2, 1, 1, 1, 3], ben: [5, 4, 4, 4, 5] },
    verify:
      'Log which pages show any numeric price, and whether any breaks fees out by entity or country.',
  },

  /* ---------------- 5 ---------------- */
  {
    id: 'ALT-05',
    theme: 'Alternatives',
    kind: 'Alternatives page',
    action: 'Create',
    order: 5,
    wave: 2,
    keyword: 'reward gateway alternatives',
    asset: 'Reward Gateway alternatives: when recognition isn’t the whole job',
    vol: 320,
    diff: 44,
    score: 84,
    intent: 'Switch intent',
    why: 'The highest score on the list. Searchers name the incumbent, so a page that separates recognition from administration intercepts them at the moment of doubt.',
    serp: [
      s('g2.com', 'Top Reward Gateway Alternatives & Competitors', 'Review hub', 'Feature grid, no job-to-be-done split'),
      s('capterra.com', 'Best Reward Gateway Alternatives', 'Review hub', 'Same vendor set as every list'),
      s('benefex.com', 'Looking for a Reward Gateway alternative?', 'Vendor page', 'Self-promotional'),
      s('forbes.com', 'Best Employee Recognition Software', 'Publisher', 'Recognition focus, not administration'),
    ],
    says: [
      ['Treats Reward Gateway as a recognition and perks tool', 7],
      ['Alternatives are other recognition platforms', 6],
      ['No guidance on switching or migration', 7],
      ['Administration depth is never compared', 5],
    ],
    gaps: [
      'No page separates the recognition job from the benefits-administration job.',
      'Nothing covers what changes in payroll, eligibility and provider admin when you switch.',
      'No switch checklist: data export, contract end, employee comms.',
      'Nobody says when staying put is the right answer.',
    ],
    angles: [
      {
        name: 'Which job needs doing?',
        hook: 'Recognition or administration? Pick the job, then the platform.',
        format: 'Interactive job selector',
        proof: 'Decision matrix with neutral criteria',
      },
      {
        name: 'The switch kit',
        hook: 'Everything to line up before you leave a perks-led platform.',
        format: 'Downloadable checklist',
        proof: 'Data export, contract, comms and payroll handoff steps',
      },
      {
        name: 'The honest “stay” section',
        hook: 'When Reward Gateway is still the right call.',
        format: 'Candid verdict block',
        proof: 'Specific scenarios, no spin',
      },
    ],
    blueprint: [
      'The short answer: it depends on the job',
      'Recognition-led vs administration-led, side by side',
      'Five alternatives by use case',
      'What changes in payroll and eligibility when you switch',
      'Switch checklist (downloadable)',
      'When to stay',
    ],
    paa: [
      'What is the best alternative to Reward Gateway?',
      'Is Reward Gateway a benefits administration platform?',
      'How do I switch employee benefits platforms?',
    ],
    card: { top: [3, 2, 1, 1, 3], ben: [5, 4, 3, 5, 5] },
    verify:
      'Capture whether each ranking page is a real comparison or a template list, and what it assumes Reward Gateway is for.',
  },

  /* ---------------- 6 ---------------- */
  {
    id: 'BO-13',
    theme: 'Best of',
    kind: 'Ranked list',
    action: 'Create',
    order: 6,
    wave: 2,
    keyword: 'best enterprise employee benefits platforms UK',
    asset: 'Best enterprise employee benefits platforms in the UK',
    vol: 130,
    diff: 37,
    score: 80,
    intent: 'Regional shortlist',
    why: 'Ben’s strongest existing AI answer sits on this theme. Pair a published scoring method with the UK-to-Europe expansion angle that UK incumbents barely cover.',
    serp: [
      s('benefex.com', 'Best employee benefits platforms UK', 'Vendor page', 'Self-ranked first'),
      s('peoplemanagement.co.uk', 'Employee benefits platforms compared', 'Publisher', 'No criteria shown'),
      s('hrmagazine.co.uk', 'HR tech: benefits platforms', 'Publisher', 'Editorial, light on detail'),
      s('g2.com', 'Best Benefits Software in the UK', 'Review hub'),
      s('capterra.co.uk', 'Best Benefits Administration Software UK', 'Review hub', 'Feature filters, UK SMB'),
      s('employeebenefits.co.uk', 'Employee benefits awards', 'Publisher', 'Awards list, no methodology'),
      s('benify.com', 'Benefits platform for UK employers', 'Vendor page'),
      s('rewardgateway.com', 'UK employee benefits platform', 'Vendor page', 'Perks-led positioning'),
      s('personneltoday.com', 'Choosing a benefits platform', 'Publisher'),
      s('gartner.com', 'Benefits administration reviews', 'Analyst', 'Paywalled'),
    ],
    says: [
      ['UK vendors self-rank at number one', 4],
      ['Awards and shortlists with no criteria', 3],
      ['UK-only delivery is the main selling point', 5],
      ['Expansion into Europe barely covered', 2],
    ],
    gaps: [
      'The UK company expanding into Europe is an unserved scenario.',
      'No published scoring method, so rankings cannot be checked.',
      'No UK customer proof tied to multi-country rollout.',
      'Cross-border data handling and local rules are glossed over.',
    ],
    angles: [
      {
        name: 'The expansion lens',
        hook: 'Best for UK teams opening in Europe, not just best in the UK.',
        format: 'Scenario-led ranked guide',
        proof: 'Expansion checklist and country readiness table',
      },
      {
        name: 'Score it yourself',
        hook: 'Our weights are visible. Change them.',
        format: 'Re-weightable scorecard',
        proof: 'Published criteria, sources, last-checked dates',
      },
      {
        name: 'Country-by-country readiness',
        hook: 'What each platform actually configures locally.',
        format: 'Evidence table',
        proof: 'Linked screenshots and policy examples',
      },
    ],
    blueprint: [
      'How we evaluated (criteria and weights)',
      'Shortlist: five enterprise platforms',
      'UK-to-Europe expansion test',
      'Country readiness table',
      'Ben’s fit, and where it is not the right choice',
      'Download the scorecard',
    ],
    paa: [
      'What is the best employee benefits platform in the UK?',
      'Which benefits platform works across the UK and Europe?',
      'What should UK enterprises look for in benefits software?',
    ],
    card: { top: [3, 2, 1, 1, 3], ben: [5, 4, 4, 4, 5] },
    verify:
      'Record how many ranking pages disclose methodology and whether any addresses European expansion.',
  },

  /* ---------------- 7 ---------------- */
  {
    id: 'BO-03',
    theme: 'Best of',
    kind: 'Ranked list',
    action: 'Create',
    order: 7,
    wave: 2,
    keyword: 'best multinational employee benefits software',
    asset: 'Best multinational employee benefits software, compared by country coverage',
    vol: 170,
    diff: 41,
    score: 81,
    intent: 'Shortlisting',
    why: 'This keyword is the clearest match for Ben’s core claim. “Global” is asserted everywhere and evidenced nowhere, so an auditable coverage table is the differentiator.',
    serp: [
      s('g2.com', 'Best Global Benefits Software', 'Review hub', 'Mixed categories'),
      s('capterra.com', 'Top Benefits Administration Software', 'Review hub', 'Not multinational-specific'),
      s('benefex.com', 'Global employee benefits platform', 'Vendor page', 'Country count, no configuration proof'),
      s('alight.com', 'Global benefits administration', 'Vendor page', 'Outsourced model'),
      s('mercer.com', 'Global benefits consulting', 'Broker', 'Advisory, not software'),
      s('selecthub.com', 'Global Benefits Software', 'Review hub'),
      s('forbes.com', 'Best Benefits Platforms', 'Publisher', 'US-centric'),
      s('reddit.com', 'Benefits platform for multi-country?', 'Forum', 'Anecdotes'),
      s('benify.com', 'Benefits for multinational companies', 'Vendor page'),
      s('gartner.com', 'Global benefits platforms', 'Analyst', 'Paywalled'),
    ],
    says: [
      ['“Global” asserted with no per-country evidence', 6],
      ['Coverage lists show countries served, not configured', 4],
      ['Consultants and software vendors mixed in one list', 3],
      ['Local eligibility rules rarely mentioned', 2],
    ],
    gaps: [
      'No coverage table shows statutory rules, local providers, payroll and language per country.',
      'Eligibility configuration by entity and grade is never demonstrated.',
      'No admin workflow, so “multi-country” stays a label.',
      'No scorecard a Head of Reward could take into a shortlist meeting.',
    ],
    angles: [
      {
        name: 'Coverage you can audit',
        hook: 'Country by country, with evidence behind each tick.',
        format: 'Evidence matrix',
        proof: 'Linked policy examples and screenshots per market',
      },
      {
        name: 'The eligibility walkthrough',
        hook: 'One employee, three entities, three rule sets.',
        format: 'Annotated workflow',
        proof: 'Configuration screens and a worked case',
      },
      {
        name: 'Shortlist scorecard',
        hook: 'A scorecard you can take straight into your evaluation.',
        format: 'Downloadable scorecard',
        proof: 'Weighted criteria and scoring guide',
      },
    ],
    blueprint: [
      'What “multinational” should mean in a vendor claim',
      'Seven evaluation criteria',
      'Platform shortlist with sourced notes',
      'Country coverage evidence table',
      'Eligibility by entity: a worked example',
      'Scorecard download',
    ],
    paa: [
      'What is the best benefits software for multinational companies?',
      'How do you manage benefits across multiple countries?',
      'What should a global benefits platform support?',
    ],
    card: { top: [2, 2, 1, 1, 3], ben: [5, 5, 3, 4, 5] },
    verify:
      'Log whether any ranking page evidences a country claim with a screenshot, policy or customer example.',
  },

  /* ---------------- 8 ---------------- */
  {
    id: 'FT-01',
    theme: 'Feature',
    kind: 'Product page',
    action: 'Improve',
    order: 8,
    wave: 2,
    keyword: 'employee benefits enrolment software',
    asset: 'Employee benefits enrolment software for multi-country teams',
    vol: 260,
    diff: 45,
    score: 82,
    intent: 'Feature evaluation',
    why: 'An existing page to sharpen rather than a new build. Competitors show the employee’s screen; showing the admin’s side is what a Head of Reward actually evaluates.',
    serp: [
      s('benefitfocus.com', 'Benefits enrolment software', 'Vendor page', 'US open-enrolment framing'),
      s('alight.com', 'Enrolment and benefits administration', 'Vendor page', 'Employee UI only'),
      s('g2.com', 'Best Benefits Enrolment Software', 'Review hub'),
      s('capterra.com', 'Open Enrolment Software', 'Review hub', 'US-centric'),
      s('benefex.com', 'Benefits enrolment', 'Vendor page'),
      s('employeenavigator.com', 'Online benefits enrolment', 'Vendor page', 'US-only workflow'),
      s('selecthub.com', 'Benefits Enrolment Software', 'Review hub'),
      s('softwareadvice.com', 'Enrolment Software', 'Review hub'),
      s('gusto.com', 'Benefits enrolment made simple', 'Vendor blog', 'SMB, single country'),
      s('trustradius.com', 'Benefits Enrolment Software', 'Review hub'),
    ],
    says: [
      ['Open-enrolment framing, mostly US', 6],
      ['Employee self-service and mobile as the headline', 5],
      ['Screenshots show the employee view only', 4],
      ['Approvals and exceptions not shown', 3],
    ],
    gaps: [
      'The administrator workflow (approvals, life events, exceptions) is invisible.',
      'No coverage of differing enrolment windows across countries.',
      'No clickable demo or sandbox. Everything is a static screenshot.',
      'Life-event handling across entities is not explained.',
    ],
    angles: [
      {
        name: 'The admin’s-eye view',
        hook: 'Enrolment as the person running it sees it.',
        format: 'Annotated workflow screenshots',
        proof: 'Real admin screens, approvals and audit trail',
      },
      {
        name: 'Life-event stress test',
        hook: 'Six life events across three countries.',
        format: 'Scenario walkthrough',
        proof: 'Step-by-step outcomes per country',
      },
      {
        name: 'Try it, don’t read about it',
        hook: 'A clickable enrolment sandbox.',
        format: 'Interactive demo',
        proof: 'Working configuration with sample data',
      },
    ],
    blueprint: [
      'Enrolment across countries: what is different',
      'Admin workflow: from eligibility to confirmation',
      'Life events and exceptions',
      'Approvals, reminders and audit trail',
      'Integration boundaries with payroll and HRIS',
      'Interactive demo',
    ],
    paa: [
      'What is employee benefits enrolment software?',
      'How does multi-country benefits enrolment work?',
      'Can enrolment windows differ by country?',
    ],
    card: { top: [2, 2, 1, 1, 3], ben: [5, 4, 3, 5, 5] },
    verify:
      'Compare Ben’s current page against the top 10 for admin-side screenshots and exception-handling detail.',
  },

  /* ---------------- 9 ---------------- */
  {
    id: 'BO-01',
    theme: 'Best of',
    kind: 'Ranked list',
    action: 'Create',
    order: 9,
    wave: 3,
    keyword: 'best global employee benefits platforms',
    asset: 'Best global employee benefits platforms for enterprise teams',
    vol: 390,
    diff: 52,
    score: 83,
    intent: 'Category shortlist',
    why: 'High volume, high difficulty. Publish it once the cluster and linkable assets exist, and lead with category clarity because the SERP mixes four platform types.',
    serp: [
      s('g2.com', 'Best Global Benefits Software', 'Review hub', 'Mixed platform categories'),
      s('capterra.com', 'Best Employee Benefits Software', 'Review hub'),
      s('benefex.com', 'The best global benefits platforms', 'Vendor page', 'Self-ranked'),
      s('alight.com', 'Global benefits solutions', 'Vendor page'),
      s('forbes.com', 'Best Employee Benefits Providers', 'Publisher', 'Insurance-led, not software'),
      s('mercer.com', 'Global benefits consulting', 'Broker', 'Advisory'),
      s('gartner.com', 'Benefits administration reviews', 'Analyst', 'Paywalled'),
      s('reddit.com', 'Best global benefits platform?', 'Forum', 'Anecdotes'),
      s('benify.com', 'Global benefits platform', 'Vendor page'),
      s('hrdive.com', 'Global benefits trends', 'Publisher', 'Trend piece'),
    ],
    says: [
      ['Vendor listicles that rank themselves first', 4],
      ['Review-site rankings driven by user counts', 3],
      ['No country-level proof behind “global”', 6],
      ['Perks, flex and administration platforms mixed', 5],
    ],
    gaps: [
      'Category confusion. Nobody separates perks, flex, outsourced and administration platforms.',
      'No stated methodology and no editorial independence.',
      'No downloadable scorecard and no data buyers can reuse.',
      'No original research to earn citations from AI tools or press.',
    ],
    angles: [
      {
        name: 'Four kinds of platform',
        hook: 'Perks, flex, outsourced, administration. Know which you are buying.',
        format: 'Category map with fit guidance',
        proof: 'Clear definitions and decision rules',
      },
      {
        name: 'Open methodology',
        hook: 'Re-weight our scorecard to match your priorities.',
        format: 'Interactive scorecard',
        proof: 'Published criteria, sources and dates',
      },
      {
        name: 'The annual benchmark',
        hook: 'Original data on running benefits across 10+ countries.',
        format: 'Survey report plus press release',
        proof: 'Sample size, method and quotable findings',
      },
    ],
    blueprint: [
      'Four platform types, who each suits',
      'How we evaluated (criteria and weights)',
      'Shortlist with sourced notes',
      'Evidence table: coverage, configuration, reporting',
      'Choosing by company profile',
      'Scorecard and benchmark download',
    ],
    paa: [
      'What is the best global employee benefits platform?',
      'What is the difference between a benefits platform and a broker?',
      'How do global benefits platforms work?',
    ],
    card: { top: [2, 2, 1, 1, 3], ben: [5, 5, 5, 5, 5] },
    verify:
      'Log the platform categories each ranking page mixes together and whether any publishes its method.',
  },

  /* ---------------- 10 ---------------- */
  {
    id: 'BO-02',
    theme: 'Best of',
    kind: 'Ranked list',
    action: 'Create',
    order: 10,
    wave: 3,
    keyword: 'best employee benefits administration software',
    asset:
      'Best employee benefits administration software: how enterprise teams shortlist',
    vol: 480,
    diff: 58,
    score: 82,
    intent: 'Category shortlist',
    why: 'The largest and hardest term. The SERP is US-SMB affiliate lists with the same vendor set, so an enterprise-only, exception-led shortlist is a real point of difference once authority exists.',
    serp: [
      s('g2.com', 'Best Benefits Administration Software', 'Review hub', 'Ranked by review volume'),
      s('capterra.com', 'Top Benefits Administration Software', 'Review hub', 'SMB filters'),
      s('softwareadvice.com', 'Benefits Administration Software', 'Review hub'),
      s('selecthub.com', 'Benefits Administration Software', 'Review hub'),
      s('forbes.com', 'Best Benefits Administration Software', 'Publisher', 'Affiliate list'),
      s('benefitfocus.com', 'Benefits administration platform', 'Vendor page'),
      s('trustradius.com', 'Benefits Administration Software', 'Review hub'),
      s('technologyadvice.com', 'Best Benefits Administration Software', 'Publisher', 'Same vendors as others'),
      s('reddit.com', 'Best benefits admin software?', 'Forum', 'Anecdotes'),
      s('gartner.com', 'Benefits administration reviews', 'Analyst', 'Paywalled'),
    ],
    says: [
      ['US SMB platforms dominate every list', 7],
      ['Ranked by feature checklist and review count', 5],
      ['Affiliate-style pages with near-identical vendor sets', 6],
      ['Enterprise needs (entities, currencies) barely mentioned', 2],
    ],
    gaps: [
      'No enterprise lens. Entities, currencies and country rules never enter the criteria.',
      'Exception handling (eligibility, life events, deduction errors) is not evaluated.',
      'No buyer scenario to anchor a shortlist.',
      'No independent test. Rankings are opinion, not evidence.',
    ],
    angles: [
      {
        name: 'Enterprise filter first',
        hook: 'Start with entities and countries. Then shortlist.',
        format: 'Filter-led shortlist',
        proof: 'Explicit enterprise criteria and exclusions',
      },
      {
        name: 'The exception test',
        hook: 'Same five exception scenarios, run through each platform.',
        format: 'Scenario comparison',
        proof: 'Documented method and sourced results',
      },
      {
        name: 'Shortlist in ten minutes',
        hook: 'Answer six questions and get your three.',
        format: 'Interactive shortlist tool',
        proof: 'Transparent scoring logic',
      },
    ],
    blueprint: [
      'Why most “best of” lists miss enterprise needs',
      'Criteria that matter above 2,000 employees',
      'The exception test and results',
      'Shortlist by buyer profile',
      'Questions to ask in the demo',
      'Interactive shortlist tool',
    ],
    paa: [
      'What is the best benefits administration software?',
      'What features should benefits administration software have?',
      'How do enterprises choose benefits software?',
    ],
    card: { top: [2, 2, 1, 1, 3], ben: [5, 5, 4, 5, 5] },
    verify:
      'Count how many ranking pages share an identical vendor set and whether any covers entity-level configuration.',
  },
];

/* ------------------------------------------------------------------ */
/* Derived values and helpers                                          */
/* ------------------------------------------------------------------ */

const TOTAL = KW.length;
const SUM_VOL = KW.reduce((a, k) => a + k.vol, 0);
const AVG_DIFF = Math.round(KW.reduce((a, k) => a + k.diff, 0) / TOTAL);
const AVG_SCORE = Math.round(KW.reduce((a, k) => a + k.score, 0) / TOTAL);
const CREATE_N = KW.filter((k) => k.action === 'Create').length;
const IMPROVE_N = TOTAL - CREATE_N;
const MAX_VOL = Math.max(...KW.map((k) => k.vol));

const themeVol = THEMES.map((t) => ({
  t,
  vol: KW.filter((k) => k.theme === t).reduce((a, k) => a + k.vol, 0),
  n: KW.filter((k) => k.theme === t).length,
})).filter((x) => x.n > 0);
const MAX_THEME_VOL = Math.max(...themeVol.map((x) => x.vol));

const diffLabel = (d: number) => (d < 30 ? 'Low' : d < 45 ? 'Moderate' : 'Hard');
const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-');

type SortKey = 'order' | 'score' | 'vol' | 'easy';
const SORTS: Record<SortKey, (a: Kw, b: Kw) => number> = {
  order: (a, b) => a.order - b.order,
  score: (a, b) => b.score - a.score || b.vol - a.vol,
  vol: (a, b) => b.vol - a.vol,
  easy: (a, b) => a.diff - b.diff,
};

const csvCell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

function exportCsv(rows: Kw[]) {
  const head = [
    'Write order',
    'ID',
    'Wave',
    'Theme',
    'Keyword',
    'Asset',
    'Action',
    'Vol. est.',
    'Difficulty',
    'Score',
    'Why now',
    'Gaps in the top 10',
    'Outrank angles',
    'Page blueprint',
  ];
  const lines = rows.map((k) =>
    [
      k.order,
      k.id,
      k.wave,
      k.theme,
      k.keyword,
      k.asset,
      k.action,
      k.vol,
      k.diff,
      k.score,
      k.why,
      k.gaps.join(' | '),
      k.angles.map((a) => `${a.name}: ${a.hook}`).join(' | '),
      k.blueprint.join(' | '),
    ]
      .map(csvCell)
      .join(','),
  );
  const blob = new Blob(
    ['\uFEFF' + [head.map(csvCell).join(','), ...lines].join('\r\n')],
    { type: 'text/csv;charset=utf-8' },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'competitor-opportunities-sample.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="co-field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}

function OpportunityMap({
  selectedId,
  onPick,
}: {
  selectedId: string | undefined;
  onPick: (id: string) => void;
}) {
  const W = 320;
  const H = 200;
  const x = (d: number) => 34 + ((d - 20) / 40) * (W - 56);
  const y = (v: number) => H - 30 - (v / 500) * (H - 52);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="co-map"
      role="img"
      aria-label="Opportunity map: difficulty against estimated monthly volume"
    >
      {[0, 250, 500].map((v) => (
        <g key={v}>
          <line x1="34" x2={W - 22} y1={y(v)} y2={y(v)} className="co-map-grid" />
          <text x="28" y={y(v) + 3} className="co-map-tick" textAnchor="end">
            {v}
          </text>
        </g>
      ))}
      {[20, 40, 60].map((d) => (
        <text key={d} x={x(d)} y={H - 14} className="co-map-tick" textAnchor="middle">
          {d}
        </text>
      ))}
      <text x={W / 2} y={H - 2} className="co-map-axis" textAnchor="middle">
        DIFFICULTY →
      </text>
      <text x="6" y="12" className="co-map-axis">
        VOLUME ↑
      </text>
      {KW.map((k) => (
        <g
          key={k.id}
          className={`co-dot co-dot--w${k.wave}${selectedId === k.id ? ' sel' : ''}`}
          transform={`translate(${x(k.diff)} ${y(k.vol)})`}
          tabIndex={0}
          role="button"
          aria-label={`${k.keyword}, write order ${k.order}`}
          onClick={() => onPick(k.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPick(k.id);
            }
          }}
        >
          <title>{`${k.order}. ${k.keyword} · vol ${k.vol} · diff ${k.diff}`}</title>
          <circle r="11" />
          <text y="3.5" textAnchor="middle">
            {k.order}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function CompetitorOpportunities() {
  const [theme, setTheme] = useState<'All' | Theme>('All');
  const [wave, setWave] = useState<'all' | '1' | '2' | '3'>('all');
  const [sort, setSort] = useState<SortKey>('order');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('PR-09');
  const listRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return KW.filter((k) => {
      if (theme !== 'All' && k.theme !== theme) return false;
      if (wave !== 'all' && String(k.wave) !== wave) return false;
      if (
        q &&
        !`${k.id} ${k.keyword} ${k.asset} ${k.theme} ${k.kind}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    })
      .slice()
      .sort(SORTS[sort]);
  }, [theme, wave, sort, query]);

  const selIndex = Math.max(
    0,
    rows.findIndex((r) => r.id === selectedId),
  );
  const sel: Kw | undefined = rows[selIndex];

  const filtersActive = theme !== 'All' || wave !== 'all' || query !== '';

  const reset = () => {
    setTheme('All');
    setWave('all');
    setQuery('');
  };

  const pick = (id: string) => {
    setSelectedId(id);
    if (typeof window !== 'undefined' && window.innerWidth <= 1100) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const jump = (id: string) => {
    reset();
    setSelectedId(id);
    workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const next = rows[selIndex + (e.key === 'ArrowDown' ? 1 : -1)];
    if (!next) return;
    setSelectedId(next.id);
    requestAnimationFrame(() =>
      listRef.current
        ?.querySelector<HTMLButtonElement>(`[data-id="${next.id}"]`)
        ?.focus(),
    );
  };

  const fmtMix = sel
    ? Array.from(
        sel.serp.slice(0, 5).reduce((m, r) => m.set(r.f, (m.get(r.f) ?? 0) + 1), new Map<Fmt, number>()),
      ).sort((a, b) => b[1] - a[1])
    : [];
  const weakCount = sel ? sel.serp.slice(0, 5).filter((r) => r.w).length : 0;

  return (
    <section className="tb-page-section tb-pad co-section" id="competition">
      <div className="tb-container">
        <header className="tb-section-intro">
          <div className="tb-eyebrow">
            <span>04</span>COMPETITOR OPPORTUNITIES
          </div>
          <h2>Find the unanswered questions inside the buying process.</h2>
          <p>
            What the top 10 results say for the ten highest-scoring keywords,
            where they stop short, and the angles that would make a Ben page the
            better answer. Ordered by what to write first.
          </p>
        </header>

     

      

       

        

        {/* ---------- Workspace ---------- */}
        <div className="co-workspace">
          <div className="co-list-card">
            <div className="co-list-head">
              <span>TOP 10 KEYWORDS</span>
              <span>{rows.length} SHOWN</span>
            </div>
            <div className="co-list" ref={listRef} onKeyDown={onListKey} role="list">
              {rows.length === 0 && (
                <div className="co-empty">
                  <strong>No keywords match these filters.</strong>
                  <p>Loosen a filter or reset to see all ten.</p>
                  <button type="button" className="co-reset" onClick={reset}>
                    Reset filters
                  </button>
                </div>
              )}
              {rows.map((k) => (
                <button
                  key={k.id}
                  role="listitem"
                  data-id={k.id}
                  type="button"
                  className={`co-item${sel?.id === k.id ? ' active' : ''}`}
                  onClick={() => pick(k.id)}
                >
                  <span className={`co-item-n co-w${k.wave}`}>{k.order}</span>
                  <span className="co-item-main">
                    <small>
                      {k.id} · {k.theme} · {k.action}
                    </small>
                    <strong>{k.keyword}</strong>
                  </span>
                  <span className="co-item-score">
                    <b>{k.score}</b>
                    <small>{k.vol} /mo</small>
                  </span>
                </button>
              ))}
            </div>
            <div className="co-list-foot">Use ↑ ↓ to move between keywords.</div>
          </div>

          <div className="co-detail" ref={detailRef} aria-live="polite">
            {!sel ? (
              <div className="co-empty">
                <strong>Select a keyword</strong>
                <p>The SERP review and outrank plan appear here.</p>
              </div>
            ) : (
              <>
                <div className="co-detail-top">
                  <span className="tb-overline">
                    WRITE {sel.order} OF {TOTAL} · {sel.theme.toUpperCase()} · {sel.kind.toUpperCase()}
                  </span>
                  <span className={`co-wave co-wave--${sel.wave}`}>
                    Wave {sel.wave}
                  </span>
                </div>

                <div className="co-query">
                  <div className="co-query-meta">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <circle cx="8.5" cy="8.5" r="5.5" />
                      <path d="M13 13l4.5 4.5" />
                    </svg>
                    <small>SIMULATED GOOGLE SEARCH · {sel.intent.toUpperCase()}</small>
                  </div>
                  <p>{sel.keyword}</p>
                </div>
                <div className="co-asset">
                  <span>{sel.action} · {sel.id}</span>
                  <strong>{sel.asset}</strong>
                </div>

                <div className="co-metrics">
                  <div>
                    <small>Volume est.</small>
                    <b>{sel.vol}</b>
                    <div className="co-meter">
                      <i style={{ width: `${(sel.vol / MAX_VOL) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <small>Difficulty</small>
                    <b>
                      {sel.diff}
                      <em>{diffLabel(sel.diff)}</em>
                    </b>
                    <div className="co-meter co-meter--warm">
                      <i style={{ width: `${sel.diff}%` }} />
                    </div>
                  </div>
                  <div>
                    <small>Score</small>
                    <b>{sel.score}</b>
                    <div className="co-meter">
                      <i style={{ width: `${sel.score}%` }} />
                    </div>
                  </div>
                  <div>
                    <small>Write order</small>
                    <b>
                      #{sel.order}
                      <em>of {TOTAL}</em>
                    </b>
                    <div className="co-meter">
                      <i style={{ width: `${((TOTAL - sel.order + 1) / TOTAL) * 100}%` }} />
                    </div>
                  </div>
                </div>

                <p className="co-why">
                  <b>Why now</b>
                  {sel.why}
                </p>

                {/* SERP */}
                           <div className="co-section-title">
                  <h4>What ranks today</h4>
                  <span>
                    Top 5 · {weakCount} flagged weak spots
                  </span>
                </div>
                <div className="co-mix" aria-label="Page types in the top 10">
                  <div className="co-mix-bar">
                    {fmtMix.map(([f, n]) => (
                      <i
                        key={f}
                        className={`co-fmt-${slug(f)}`}
                        style={{ flex: n }}
                        title={`${f}: ${n}`}
                      />
                    ))}
                  </div>
                  <div className="co-mix-key">
                    {fmtMix.map(([f, n]) => (
                      <span key={f}>
                        <i className={`co-fmt-${slug(f)}`} />
                        {f} · {n}
                      </span>
                    ))}
                  </div>
                </div>
                <ol className="co-serp">
                  {sel.serp.slice(0, 5).map((r, i) => (
                    <li key={r.d + r.t} className={r.w ? 'has-weak' : ''}>
                      <span className="co-pos">{i + 1}</span>
                      <div className="co-serp-main">
                        <code>{r.d}</code>
                        <strong>{r.t}</strong>
                        {r.w && (
                          <p>
                            <b>Weak spot</b>
                            {r.w}
                          </p>
                        )}
                      </div>
                      <span className={`co-fmt co-fmt-${slug(r.f)}`}>{r.f}</span>
                    </li>
                  ))}
                  <li className="co-target">
                    <span className="co-pos">★</span>
                    <div className="co-serp-main">
                      <code>thanksben.com</code>
                      <strong>{sel.asset}</strong>
                      <p>
                        <b>Target</b>
                        The page this plan builds.
                      </p>
                    </div>
                    <span className="co-fmt co-fmt-ben">Ben</span>
                  </li>
                </ol>

                {/* Says + gaps */}
                <div className="co-section-title">
                  <h4>What they say, and where they stop</h4>
                  <span>Messaging themes · gaps</span>
                </div>
                <div className="co-two">
                  <div>
                    <div className="co-label">WHAT THE TOP 5 SAYS</div>
                    <ul className="co-says">
                      {sel.says.map(([t, n]) => (
                        <li key={t}>
                          <span>{t}</span>
                          <div className="co-says-bar" aria-hidden="true">
                            {Array.from({ length: 10 }, (_, i) => (
                              <i key={i} className={i < n ? 'on' : ''} />
                            ))}
                          </div>
                          <b>{n}/10</b>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="co-label co-label--warm">GAPS TO EXPLOIT</div>
                    <ul className="co-gaps">
                      {sel.gaps.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Angles */}
                <div className="co-section-title">
                  <h4>How to outrank it</h4>
                  <span>Lead with the first angle</span>
                </div>
                <div className="co-angles">
                  {sel.angles.map((a, i) => (
                    <article className={`co-angle${i === 0 ? ' lead' : ''}`} key={a.name}>
                      <div className="co-angle-top">
                        <span>{i === 0 ? 'LEAD ANGLE' : `ANGLE ${i + 1}`}</span>
                        <em>{a.format}</em>
                      </div>
                      <h5>{a.name}</h5>
                      <p className="co-hook">“{a.hook}”</p>
                      <div className="co-proof">
                        <span>Proof asset</span>
                        {a.proof}
                      </div>
                    </article>
                  ))}
                </div>

                {/* Blueprint + PAA */}
                <div className="co-two co-two--top">
                  <div>
                    <div className="co-label">PAGE BLUEPRINT</div>
                    <ol className="co-blueprint">
                      {sel.blueprint.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <div className="co-label">QUESTIONS TO ANSWER IN THE PAGE</div>
                    <ul className="co-paa">
                      {sel.paa.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Scorecard */}
                <div className="co-section-title">
                  <h4>Quality bar to clear</h4>
                  <span>Typical top-10 page vs Ben’s target</span>
                </div>
                <div className="co-score">
                  {DIMS.map((d, i) => (
                    <div className="co-score-row" key={d}>
                      <span>{d}</span>
                      <div className="co-score-track">
                        <i
                          className="top"
                          style={{ width: `${(sel.card.top[i] / 5) * 100}%` }}
                          title={`Typical top-10 page: ${sel.card.top[i]}/5`}
                        />
                        <i
                          className="ben"
                          style={{ width: `${(sel.card.ben[i] / 5) * 100}%` }}
                          title={`Ben target: ${sel.card.ben[i]}/5`}
                        />
                      </div>
                      <b>
                        {sel.card.top[i]} → {sel.card.ben[i]}
                      </b>
                    </div>
                  ))}
                  <div className="co-score-key">
                    <span>
                      <i className="top" />
                      Typical top-10 page (sample rating)
                    </span>
                    <span>
                      <i className="ben" />
                      Ben target
                    </span>
                  </div>
                </div>

                <div className="co-retest">
                  <small>HOW TO VALIDATE</small>
                  <p>
                    {sel.verify} Capture the query, country, date, ranking URL
                    and page evidence for each result before turning this
                    direction into a verified opportunity.
                  </p>
                </div>

                <div className="co-pager">
                  <button
                    type="button"
                    disabled={selIndex === 0}
                    onClick={() => setSelectedId(rows[selIndex - 1].id)}
                    aria-label="Previous keyword"
                  >
                    ←
                  </button>
                  <span>
                    {selIndex + 1} / {rows.length}
                  </span>
                  <button
                    type="button"
                    disabled={selIndex === rows.length - 1}
                    onClick={() => setSelectedId(rows[selIndex + 1].id)}
                    aria-label="Next keyword"
                  >
                    →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

 
      </div>
    </section>
  );
}