import { useRef, useState, type KeyboardEvent } from 'react';
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

type Serp = {
  d: string;
  t: string;
  f: Fmt;
  w?: string;
  description?: string;
  date?: string;
};
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
  {
    d: 'https://www.joinforma.com/resources/how-much-do-benefits-cost-per-employee',
    t: 'How much do benefits cost per employee',
    f: 'Vendor blog',
    description:
      'Learn about the various types of benefits, average expenses, and effective strategies to manage costs while ensuring employee satisfaction.',
  },
  {
    d: 'https://benepass.com/blog/what-is-the-average-cost-of-benefits-per-employee-the-complete-guide',
    t: 'Employee Benefits Cost Per Employee in 2026',
    f: 'Vendor blog',
    date: '17 Jun 2026',
    description:
      'As a starting point, private industry employers spend an average of $14.01 per hour, or roughly $25,498 per year, per employee on benefits.',
  },
  {
    d: 'https://hotalinginsurance.com/commercial/employee-benefits-cost-per-employee',
    t: 'Employee Benefits Cost Per Employee (2026 BLS & KFF ...',
    f: 'Broker',
    date: '3 Mar 2026',
    description:
      'Employee benefits cost U.S. private employers an average of $14.07 per hour worked, or 30.0% of total compensation, according to the Bureau of ...',
  },
  {
    d: 'https://www.theaccessgroup.com/en-gb/hr/software/employee-engagement/employee-benefits/how-much-do-employee-benefits-cost/',
    t: 'How much do employee benefits cost',
    f: 'Vendor page',
    description:
      "Research has indicated that businesses typically spend 1.25 to 1.4 times each employee's base salary on employee benefits, or simply add 20-50% to the ...",
  },
  {
    d: 'https://hellopebl.com/resources/blog/how-much-do-benefits-cost-per-employee/',
    t: 'How Much Do Benefits Cost per Employee?',
    f: 'Vendor blog',
    date: '14 Sept 2026',
    description:
      'Wondering how much benefits cost per employee? Compare benchmarks across five different countries, and learn top tips to manage expenses.',
  },
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
      {
        d: 'https://getebm.com/hris-vs-hcm-vs-benadmin-finding-the-right-solution-for-you/',
        t: "HRIS vs. HCM vs. HRMS vs. BenAdmin: What's the difference?",
        f: 'Vendor blog',
        date: '4 Dec 2023',
        description: 'Between HRIS, HRMS, HCM, and BenAdmin (Benefits Administration), figuring out the differences between each type of system gets confusing.',
      },
      {
        d: 'https://selerix.com/blog/hris-vs-benefits-point-solutions/',
        t: 'HRIS vs Benefits Point Solutions for ACA Compliance',
        f: 'Vendor blog',
        date: '25 Feb 2026',
        description: 'See how HRIS vs benefits point solutions compare for ACA. Understand where HRIS benefits fall short, when to add a specialist, and how to...',
      },
      {
        d: 'https://matchr.com/benefits-administration-and-hris/',
        t: 'Benefits Administration and HRIS - Matchr',
        f: 'Vendor blog',
        description: 'Benefits administration is one of the most common elements of a HRIS solution. For some companies, benefits administration is the main reason for purchasing a...',
      },
      {
        d: 'https://blog.onehcm.com/5-reasons-to-unify-benefits-and-hris-software',
        t: '5 Reasons To Unify Benefits Administration Software & HRIS',
        f: 'Vendor blog',
        date: '16 Aug 2019',
        description: 'Unifying benefits and HRIS Software means less paper, fewer spreadsheets, no more standing at the copy machine, no more manual distribution of...',
      },
      {
        d: 'https://www.kbibenefits.com/the-role-of-hr-information-systems-in-modern-benefits-administration',
        t: 'The Role of HR Information Systems in Modern Benefits ...',
        f: 'Vendor blog',
        date: '22 Apr 2025',
        description: 'But a modern HRIS can transform how your company handles benefits administration—boosting efficiency, improving employee satisfaction, and ...',
      },
    ],
    says: [
      ['HRIS and benefits admin are often treated as the same thing', 7],
      ['Single-vendor simplicity is the default recommendation', 6],
      ['Only ACA compliance is used as the differentiator', 4],
      ['Dedicated tools add depth, but it is never quantified', 3],
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
      {
        d: 'https://matrixbenefits.co.uk/matrix-vs-traditional-brokers-which-is-right-for-you/',
        t: 'Matrix vs Traditional Brokers: Which Is Right for You?',
        f: 'Broker',
        date: '22 Sept 2025',
        description: 'Traditional brokers often stick to rigid plans and outdated approaches that may no longer meet the evolving needs of today’s diverse workforce.',
      },
      {
        d: 'https://www.navabenefits.com/compare/traditional-brokers',
        t: 'Nava Benefits brokers vs. Traditional brokers',
        f: 'Broker',
        description: 'Nava outperforms traditional brokers by offering more renewal options, handling eligibility and open enrollment, and providing personalized, 24/7 employee...',
      },
      {
        d: 'https://lumainsurance.com.au/how-we-are-different/',
        t: 'An Alternative to Traditional Insurance Brokers - Luma Insurance',
        f: 'Broker',
        description: 'Looking for an alternative to traditional insurance brokers? Luma removes the hidden commissions most brokers charge and that inflate your premium—with full...',
      },
      {
        d: 'https://www.linkedin.com/posts/jggraham_employeebenefits-peo-hr-activity-7511441102961471489-0gJ_',
        t: 'Employee Benefits Options: Direct, Broker, or PEO ...',
        f: 'Publisher',
        date: '1 month ago',
        description: 'Use a traditional benefits broker. Or evaluate PEOs through PairPEO. At PairPEO, we compare pricing across leading PEOs. Alternative funding...',
      },
      {
        d: 'https://www.ignitionbenefits.com/blog/find-benefits-brokers-small-business',
        t: 'How to find benefit brokers for small business and best ...',
        f: 'Publisher',
        date: '27 Aug 2026',
        description: 'Looking for an Alternative Benefit Broker? Compare the Best Benefits Brokers for Small Business: At a Glance Ignition Benefits: Alternative...',
      },
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


function getResultUrl(value: string): URL | null {
  const input = value.trim();

  if (!input) return null;

  try {
    const normalised = input.startsWith('//')
      ? `https:${input}`
      : /^[a-z][a-z\d+.-]*:/i.test(input)
        ? input
        : `https://${input}`;

    const url = new URL(normalised);

    if (!['http:', 'https:'].includes(url.protocol)) return null;
    if (!url.hostname.includes('.')) return null;

    return url;
  } catch {
    return null;
  }
}

const SITE_NAMES: Record<string, string> = {
    'joinforma.com': 'Forma',
  'hotalinginsurance.com': 'Hotaling Insurance Services',
  'theaccessgroup.com': 'The Access Group',
  'hellopebl.com': 'Pebl',
    'seamlesshr.com': 'SeamlessHR',
  'punchng.com': 'Punch Newspapers',
  'ribirewards.com': 'RibiRewards',
  'benepass.com': 'Benepass',
  'www.benepass.com': 'Benepass',
  'business.org': 'Business.org',
  'selecthub.com': 'SelectHub',
  'capterra.com': 'Capterra',
  'forbes.com': 'Forbes',
  'reddit.com': 'Reddit',
  'hrdive.com': 'HR Dive',
  'thanksben.com': 'Ben',
};

function siteName(value: string): string {
  const url = getResultUrl(value);
  if (!url) return value;

  const hostname = url.hostname.replace(/^www\./, '');

  return SITE_NAMES[hostname] ?? hostname;
}

function resultBreadcrumb(value: string): string {
  const url = getResultUrl(value);
  if (!url) return value;

  const segments = url.pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    });

  return [
    `${url.protocol}//${url.hostname}`,
    ...segments,
  ].join(' › ');
}

function ResultFavicon({ value }: { value: string }) {
  const url = getResultUrl(value);
  const hostname = url?.hostname ?? '';
  const [failedHost, setFailedHost] = useState<string | null>(null);

  const showImage = hostname && failedHost !== hostname;

  return (
    <span className="co-serp-fav" aria-hidden="true">
      {showImage ? (
        <img
          key={hostname}
          src={
            `https://a.favicon.im/${encodeURIComponent(hostname)}` +
            '?larger=true&throw-error-on-404=true'
          }
          alt=""
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailedHost(hostname)}
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18Z" />
        </svg>
      )}
    </span>
  );
}



const diffLabel = (value: number) =>
  value < 30 ? 'Low' : value < 45 ? 'Moderate' : 'Hard';

type DetailSection = 'landscape' | 'direction' | 'validation';

export default function CompetitorOpportunities() {
  const [selectedId, setSelectedId] = useState('PR-09');
  const [activeSection, setActiveSection] =
    useState<DetailSection>('landscape');

  const listRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
 

  const rows = [...KW].sort((a, b) => a.order - b.order);
  const selectedIndex = Math.max(
    0,
    rows.findIndex((row) => row.id === selectedId),
  );

  const selected = rows[selectedIndex];
  const lead = selected.angles[0];
  const isPricingExample = selected.id === 'PR-09';

  const format = isPricingExample
    ? 'Calculator + downloadable sheet'
    : lead?.format ?? selected.kind;

  const why = isPricingExample
    ? 'Build a reusable pricing model that supports related cost and pricing pages.'
    : selected.why;

  const opening = isPricingExample
    ? 'An editable enterprise cost model with transparent assumptions.'
    : selected.gaps[0] ?? selected.asset;

  const valueAngles = isPricingExample
    ? [
        {
          title: 'Make costs inspectable',
          text: 'Editable assumptions, fee categories and sensitivity scenarios.',
        },
        {
          title: 'Price the status quo',
          text: 'A worksheet for internal admin time and error-correction costs.',
        },
        {
          title: 'Explain the quote',
          text: 'An anonymised sample showing which fees change the total.',
        },
      ]
    : selected.angles.map((angle) => ({
        title: angle.name,
        text: angle.hook,
      }));

  const outline = isPricingExample
    ? [
        'The short answer, with caveats',
        'Pricing models and fee categories',
        'An annotated sample quote',
        'The editable cost calculator',
        'Three workforce-size scenarios',
        'Questions for your RFP',
      ]
    : selected.blueprint;

  const questions = isPricingExample
    ? [
        'What is a typical cost per employee?',
        'What drives the total platform cost?',
        'Are implementation fees separate?',
      ]
    : selected.paa;

 

  function pick(id: string, scrollToDetail = false) {
    setSelectedId(id);
    setActiveSection('landscape');

    if (scrollToDetail) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  }

  function onListKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    event.preventDefault();

    const nextIndex =
      selectedIndex + (event.key === 'ArrowDown' ? 1 : -1);
    const next = rows[nextIndex];

    if (!next) return;

    pick(next.id);

    requestAnimationFrame(() => {
      listRef.current
        ?.querySelector<HTMLButtonElement>(
          `[data-id="${next.id}"]`,
        )
        ?.focus();
    });
  }

 

  return (
    <section
      className="tb-page-section tb-pad co-section"
      id="competition"
    >
      <div className="tb-container">
        <header className="co-intro">
          <div className="co-intro-top">
            <div className="co-eyebrow">
              04 <span>/</span> COMPETITOR OPPORTUNITIES
            </div>
          </div>

          <h2>Find the gaps. Build the better answer.</h2>

          <p className="co-intro-copy">
            Ten priority searches, the questions competing pages leave
            unanswered, and what Ben should publish next.
          </p>
        </header>

        <div className="co-workspace">
          <aside className="co-list-card">
            <div className="co-list-head">
              <h3>Priority searches</h3>
              <span>{rows.length} searches</span>
            </div>

            <div
              className="co-list"
              ref={listRef}
              onKeyDown={onListKey}
              role="group"
              aria-label="Priority searches. Use arrow keys to navigate."
            >
              {rows.map((keyword) => (
                <button
                  key={keyword.id}
                  data-id={keyword.id}
                  type="button"
                  className={`co-item${
                    selected.id === keyword.id ? ' active' : ''
                  }`}
                  aria-pressed={selected.id === keyword.id}
                  onClick={() =>
                    pick(
                      keyword.id,
                      window.matchMedia('(max-width: 900px)').matches,
                    )
                  }
                >
                  <span className="co-item-n">
                    {String(keyword.order).padStart(2, '0')}
                  </span>

                  <span className="co-item-main">
                    <strong>{keyword.keyword}</strong>
                    <small>
                      {keyword.id} · {keyword.theme} · {keyword.action}
                    </small>
                  </span>

                  <span
                    className="co-item-score"
                    aria-label={`Opportunity score ${keyword.score} out of 100`}
                  >
                    <b>{keyword.score}</b>
                    <small>/100</small>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="co-detail" ref={detailRef}>
            <div className="co-detail-top">
              <span className="co-detail-meta">
                {String(selected.order).padStart(2, '0')} OF{' '}
                {rows.length} <span>/</span> {selected.id}{' '}
                <span>/</span> {selected.theme}
              </span>

              <span className="co-wave">Wave {selected.wave}</span>
            </div>

            <h3 className="co-query-title">{selected.keyword}</h3>

            <p className="co-format">
              Recommended format: {format}
            </p>

            <div className="co-metrics">
              <div>
                <span>Est. volume</span>
                <strong>
                  {selected.vol}
                  <small>/mo</small>
                </strong>
              </div>

              <div>
                <span>Difficulty</span>
                <strong>
                  {selected.diff}
                  <small>/100</small>
                  <em>{diffLabel(selected.diff)}</em>
                </strong>
              </div>

              <div>
                <span>Opportunity</span>
                <strong>
                  {selected.score}
                  <small>/100</small>
                </strong>
              </div>

              <div>
                <span>Write order</span>
                <strong>
                  #{selected.order}
                  <small>of {rows.length}</small>
                </strong>
              </div>
            </div>

            <p className="co-estimate-note">Planning estimates.</p>

            <div className="co-callout">
              <strong>Why start here</strong>
              <p>{why}</p>
            </div>

            <nav
              className="co-section-nav"
              role="tablist"
              aria-label="Opportunity sections"
            >
              {(
                [
                  ['landscape', 'Search landscape'],
                  ['direction', 'Content direction'],
                  ['validation', 'Validation'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`co-tab-${id}`}
                  aria-selected={activeSection === id}
                  aria-controls={`co-panel-${id}`}
                  className={activeSection === id ? 'active' : ''}
                  onClick={() => setActiveSection(id)}
                >
                  {label}
                </button>
              ))}
            </nav>

                    {activeSection === 'landscape' && (
              <div
                className="co-panel"
                role="tabpanel"
                id="co-panel-landscape"
                aria-labelledby="co-tab-landscape"
              >
                <div className="co-serp">
                  <div className="co-serp-bar">
                    <div className="co-serp-search">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                      <span>{selected.keyword}</span>
                    </div>
          
                  </div>

                  <div className="co-serp-tabs" aria-hidden="true">
                    <span className="on">All</span>
                    <span>Images</span>
                    <span>News</span>
                    <span>Videos</span>
                  </div>

                  <ol className="co-serp-list">
                    {selected.serp.slice(0, 5).map((result, index) => (
                      <li
                        className="co-serp-item"
                        key={`${result.d}-${result.t}`}
                      >
                        <span className="co-serp-rank">{index + 1}</span>

                        <div className="co-serp-body">
                          <div className="co-serp-site">
 
<ResultFavicon value={result.d} />

<span className="co-serp-site-text">
  <strong>{siteName(result.d)}</strong>

  <small title={resultBreadcrumb(result.d)}>
    {resultBreadcrumb(result.d)}
  </small>
</span>

                            <span className="co-serp-type">{result.f}</span>
                          </div>
<h4 className="co-serp-title">
  {/^https?:\/\//i.test(result.d) && getResultUrl(result.d) ? (
    <a
      href={getResultUrl(result.d)!.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${result.t} (opens in a new tab)`}
    >
      {result.t}
    </a>
  ) : (
    result.t
  )}
</h4>
{result.description && (
  <p className="co-serp-description">
    {result.date && (
      <span className="co-serp-date">
        {result.date} —{' '}
      </span>
    )}
    {result.description}
  </p>
)}


                        </div>
                      </li>
                    ))}



                  </ol>
                </div>
              </div>
            )}


            {activeSection === 'direction' && (
              <div
                className="co-panel"
                role="tabpanel"
                id="co-panel-direction"
                aria-labelledby="co-tab-direction"
              >
                <div className="co-section-heading">
                  <h4>Where Ben can add value</h4>
                </div>

                <div className="co-value-grid">
                  {valueAngles.map((angle, index) => (
                    <article className="co-value" key={angle.title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h5>{angle.title}</h5>
                        <p>{angle.text}</p>
                      </div>
                    </article>
                  ))}
                </div>

                {lead && (
                  <article className="co-lead">
                    <span className="co-lead-label">
                      Recommended lead angle
                    </span>

                    <h4>
                      {isPricingExample
                        ? 'A cost calculator buyers can actually inspect.'
                        : lead.name}
                    </h4>

                    <p>{lead.hook}</p>

                    <div className="co-lead-proof">
                      <strong>Proof needed</strong>
                      <span>{lead.proof}</span>
                    </div>
                  </article>
                )}

                <div className="co-bottom-grid">
                  <div>
                    <h4>Page outline</h4>

                    <ol className="co-outline">
                      {outline.map((item, index) => (
                        <li key={item}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <p>{item}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4>Questions to answer</h4>

                    <ul className="co-questions">
                      {questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'validation' && (
              <div
                className="co-panel"
                role="tabpanel"
                id="co-panel-validation"
                aria-labelledby="co-tab-validation"
              >
                <div className="co-section-heading">
                  <h4>Validation</h4>
                  <span>
                    What to log before treating any of this as a verified gap.
                  </span>
                </div>

                <ul className="co-checklist">
                  <li>Query and country searched</li>
                  <li>Date of the search</li>
                  <li>Ranking URL for each result</li>
                  <li>Pricing assumptions shown on the page</li>
                  <li>Page last-updated dates</li>
                </ul>

                <div className="co-callout co-opening">
                  <strong>Check for this search</strong>
                  <p>{selected.verify}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="co-footer">
          <p>
            Illustrative competitor observations and planning estimates.
            Validate live results before production.
          </p>

          <div className="co-pager">
            <button
              type="button"
              disabled={selectedIndex === 0}
              onClick={() =>
                pick(rows[selectedIndex - 1].id, true)
              }
            >
              <span aria-hidden="true">←</span> Previous
            </button>

            <span aria-live="polite">
              {selectedIndex + 1} / {rows.length}
            </span>

            <button
              type="button"
              disabled={selectedIndex === rows.length - 1}
              onClick={() =>
                pick(rows[selectedIndex + 1].id, true)
              }
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}