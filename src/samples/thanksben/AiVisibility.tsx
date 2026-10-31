import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import './AiVisibility.css';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type PlatformKey = 'chatgpt' | 'gemini' | 'perplexity' | 'aio';
type Status = 'recommended' | 'listed' | 'passing' | 'absent';
type Priority = 'High' | 'Medium' | 'Low';
type Stage =
  | 'Vendor shortlist'
  | 'Switching'
  | 'Head-to-head'
  | 'Pricing'
  | 'Business case'
  | 'Implementation'
  | 'Integration & security';
type MoveType =
  | 'Backlinks'
  | 'Digital PR'
  | 'Partners'
  | 'Reviews'
  | 'Community'
  | 'Expert content';

type Result = {
  s: Status;
  pos?: [number, number]; // [Ben's position, number of vendors named]
  said?: string; // what the AI said about Ben (only when Ben appears)
  also?: string[]; // other vendors named in the same answer
  cited?: string; // Ben URL cited as a source, if any
  gap?: string; // what is thin or missing in that answer
};
type Fix = { action: 'Create' | 'Improve'; text: string; ref?: string };
type Move = { type: MoveType; text: string };
type Prompt = {
  id: string;
  stage: Stage;
  buyer: string;
  keywords: string[];
  prompt: string;
  // Order matches PLATFORMS: ChatGPT, Gemini, Perplexity, AI Overviews
  results: [Result, Result, Result, Result];
  priority: Priority;
  why: string;
  fix: Fix[];
  moves: Move[];
};

/* ------------------------------------------------------------------ */
/* Reference data                                                      */
/* ------------------------------------------------------------------ */

const PLATFORMS: { key: PlatformKey; name: string; short: string }[] = [
  { key: 'chatgpt', name: 'ChatGPT', short: 'GPT' },
  { key: 'gemini', name: 'Gemini', short: 'GEM' },
  { key: 'perplexity', name: 'Perplexity', short: 'PPX' },
  { key: 'aio', name: 'AI Overviews', short: 'AIO' },
];

const STAGES: Stage[] = [
  'Vendor shortlist',
  'Switching',
  'Head-to-head',
  'Pricing',
  'Business case',
  'Implementation',
  'Integration & security',
];

const STATUS_LABEL: Record<Status, string> = {
  recommended: 'Recommended',
  listed: 'Named',
  passing: 'Passing mention',
  absent: 'Not mentioned',
};

const MOVE_TYPES: { type: MoveType; blurb: string }[] = [
  {
    type: 'Backlinks',
    blurb: 'Earn links to the new assets from sources AI tools already trust.',
  },
  {
    type: 'Digital PR',
    blurb: 'Original data and commentary placed in HR, reward and finance press.',
  },
  {
    type: 'Partners',
    blurb:
      'Integration listings and co-published guides with HRIS, payroll and broker partners.',
  },
  {
    type: 'Reviews',
    blurb: 'Verifiable customer reviews and profiles on third-party software sites.',
  },
  {
    type: 'Community',
    blurb:
      'Substantive, disclosed answers where practitioners ask these questions.',
  },
  {
    type: 'Expert content',
    blurb: 'Checklists and frameworks contributed to credible publications.',
  },
];

/* ------------------------------------------------------------------ */
/* Prompt data                                                         */
/*                                                                     */
/* IMPORTANT: every `results` entry below is an ILLUSTRATIVE SAMPLE     */
/* showing how a live audit is reported. Replace with logged            */
/* observations (platform, date, geography, cited sources) before       */
/* drawing any conclusion.                                              */
/* ------------------------------------------------------------------ */

const NO: Result = { s: 'absent' };

const RAW: Omit<Prompt, 'id'>[] = [
  /* ---------------- Vendor shortlist ---------------- */
  {
    stage: 'Vendor shortlist',
    buyer: 'Head of Reward',
    keywords: ['BO-01', 'BO-03'],
    prompt:
      'I’m Head of Reward at a company with about 6,000 employees across 14 countries. Which global benefits platforms should I put on a shortlist?',
    priority: 'High',
    results: [
      NO,
      NO,
      {
        s: 'listed',
        pos: [6, 7],
        said: 'Other platforms worth a look include Ben, which presents itself as one platform for multinational employers that want central administration with local benefit flexibility.',
        also: ['Benefex', 'Benify', 'Alight', 'Forma', 'Reward Gateway'],
        cited: 'thanksben.com',
        gap: 'Repeats homepage positioning. No country coverage or configuration evidence to back it up.',
      },
      NO,
    ],
    why: 'Shortlist answers lean on third-party roundups and review sites. Ben surfaces only when a source repeats its homepage claim, with nothing that proves multi-entity configuration.',
    fix: [
      {
        action: 'Create',
        text: 'Best global employee benefits platforms: an honest evaluation guide with a downloadable scorecard',
        ref: 'BO-01',
      },
      {
        action: 'Improve',
        text: 'Benefits management page: add multi-entity configuration screenshots and a country-coverage table',
      },
    ],
    moves: [
      {
        type: 'Digital PR',
        text: 'Pitch a benchmark on running benefits across 10+ countries to reward and HR trade press',
      },
      {
        type: 'Reviews',
        text: 'Build G2 and Capterra profiles with verifiable multinational customer reviews',
      },
    ],
  },
  {
    stage: 'Vendor shortlist',
    buyer: 'Benefits Ops',
    keywords: ['BO-02', 'BO-10'],
    prompt:
      'What’s the best employee benefits administration software for a multinational? We need enrolment, eligibility rules and payroll handled across several countries.',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: 'The highest-volume shortlist theme, and Ben is absent everywhere. No page is built for this evaluation intent, so answers lean on generic HRIS and broker content.',
    fix: [
      {
        action: 'Create',
        text: 'Best employee benefits administration software: an enterprise shortlist led by eligibility and exception handling',
        ref: 'BO-02',
      },
      {
        action: 'Improve',
        text: 'Benefits administration page: show enrolment, approvals and reporting with product detail',
        ref: 'FT-01',
      },
    ],
    moves: [
      {
        type: 'Backlinks',
        text: 'Publish the eligibility matrix template and offer it to HR operations communities for linking',
      },
      {
        type: 'Expert content',
        text: 'Contribute a benefits-administration evaluation checklist to HR technology publications',
      },
    ],
  },
  {
    stage: 'Vendor shortlist',
    buyer: 'Head of Reward',
    keywords: ['BO-03'],
    prompt:
      'Can you recommend multinational employee benefits software that can handle different eligibility rules in each country?',
    priority: 'High',
    results: [
      NO,
      {
        s: 'passing',
        said: 'Ben is another provider that describes multi-country benefits with local configuration, though public detail on how eligibility rules are set up is limited.',
        also: ['Benefex', 'Alight'],
        gap: 'No citable page on eligibility configuration, so the mention stays vague.',
      },
      NO,
      NO,
    ],
    why: 'Where Ben appears it is a hedged one-liner. The AI has no page showing how eligibility rules are configured by entity, grade and country.',
    fix: [
      {
        action: 'Create',
        text: 'Eligibility rules matrix template (by entity, grade, country) with a worked example',
        ref: 'JB-07',
      },
      {
        action: 'Improve',
        text: 'Benefits management page: document eligibility and regional policy configuration step by step',
      },
    ],
    moves: [
      {
        type: 'Partners',
        text: 'Co-publish an eligibility-governance guide with a multinational payroll or employment partner',
      },
      {
        type: 'Backlinks',
        text: 'Offer the template to reward communities such as REBA for linking',
      },
    ],
  },
  {
    stage: 'Vendor shortlist',
    buyer: 'Payroll',
    keywords: ['BO-10', 'FT-02', 'FT-08'],
    prompt:
      'Which benefits platforms integrate well with payroll? We need clean deduction files going to ADP every month without manual fixes.',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: 'Payroll buyers ask for file specs and validation rules. Ben has no integration page, so there is nothing for AI tools to cite.',
    fix: [
      {
        action: 'Create',
        text: 'Employee benefits payroll integration: file specs, validation and cut-off timeline',
        ref: 'FT-02',
      },
      {
        action: 'Create',
        text: 'ADP integration page: payroll files and validation',
        ref: 'FT-08',
      },
    ],
    moves: [
      {
        type: 'Partners',
        text: 'Request listings or a co-authored note with payroll provider partners',
      },
      {
        type: 'Community',
        text: 'Answer deduction-error threads in payroll communities with genuinely useful detail',
      },
    ],
  },
  {
    stage: 'Vendor shortlist',
    buyer: 'Head of Reward',
    keywords: ['BO-13'],
    prompt:
      'What’s the best enterprise employee benefits platform in the UK for a company that’s expanding into Europe?',
    priority: 'Medium',
    results: [
      NO,
      NO,
      {
        s: 'recommended',
        pos: [2, 5],
        said: 'Ben is a strong fit if you want one platform that keeps benefits administration central while allowing local flexibility as you open new European entities.',
        also: ['Benefex', 'Benify', 'Alight'],
        cited: 'thanksben.com/about-us',
        gap: 'Cites the company overview. No UK customer proof or expansion examples.',
      },
      {
        s: 'listed',
        pos: [4, 6],
        said: 'Ben appears among enterprise options for UK employers managing benefits across several countries.',
        also: ['Benefex', 'Reward Gateway', 'Alight'],
        cited: 'thanksben.com/about-us',
      },
    ],
    why: 'Ben’s strongest result: the UK framing plus the expansion trigger gives AI tools something to match. UK customer proof would help the Perplexity recommendation hold and spread to ChatGPT and Gemini.',
    fix: [
      {
        action: 'Create',
        text: 'Best enterprise employee benefits platforms in the UK',
        ref: 'BO-13',
      },
      {
        action: 'Create',
        text: 'Launching employee benefits in a new country: a checklist',
        ref: 'JB-09',
      },
    ],
    moves: [
      {
        type: 'Digital PR',
        text: 'Secure UK trade-press commentary on benefits when expanding into Europe',
      },
      {
        type: 'Reviews',
        text: 'Gather UK customer reviews and a case study that names the expansion use case',
      },
    ],
  },

  /* ---------------- Switching ---------------- */
  {
    stage: 'Switching',
    buyer: 'Head of Reward',
    keywords: ['ALT-13', 'VS-11'],
    prompt:
      'Our benefits broker contract is up for renewal soon. What are the alternatives to a traditional broker for managing global benefits?',
    priority: 'High',
    results: [
      {
        s: 'listed',
        pos: [3, 5],
        said: 'Software platforms such as Ben can sit alongside or replace parts of broker administration, and Ben notes it can work with an existing broker rather than forcing a switch.',
        also: ['Alight', 'Aon'],
        cited: 'thanksben.com/pricing',
        gap: 'The broker-friendly model is mentioned but never explained.',
      },
      NO,
      {
        s: 'recommended',
        pos: [1, 4],
        said: 'Ben is worth considering if the goal is to keep your broker for advice while moving administration and reporting onto one platform.',
        also: ['Alight', 'Aon'],
        cited: 'thanksben.com/pricing',
      },
      NO,
    ],
    why: 'Bring-your-own-broker is a real differentiator and two platforms already surface it. A dedicated page would turn a passing line into a cited answer on every platform.',
    fix: [
      {
        action: 'Create',
        text: 'Alternatives to a traditional benefits broker: what to move in-house',
        ref: 'ALT-13',
      },
      {
        action: 'Create',
        text: 'Global benefits platform vs benefits broker: who should run your programme?',
        ref: 'VS-11',
      },
    ],
    moves: [
      {
        type: 'Partners',
        text: 'Publish a joint explainer with a broker partner on the platform-plus-broker model',
      },
      {
        type: 'Digital PR',
        text: 'Offer reward leaders a view on broker renewal timing to HR trade press',
      },
    ],
  },
  {
    stage: 'Switching',
    buyer: 'Head of Reward',
    keywords: ['ALT-05', 'VS-04'],
    prompt:
      'What are the best Reward Gateway alternatives for an enterprise that needs proper benefits administration, not just recognition and perks?',
    priority: 'Medium',
    results: [NO, NO, NO, NO],
    why: 'Switch-intent searchers name the incumbent. With no alternatives page, AI tools have nothing that connects Ben to that comparison.',
    fix: [
      {
        action: 'Create',
        text: 'Reward Gateway alternatives: when recognition isn’t the whole job',
        ref: 'ALT-05',
      },
      {
        action: 'Create',
        text: 'Ben vs Reward Gateway: benefits administration or recognition-led?',
        ref: 'VS-04',
      },
    ],
    moves: [
      {
        type: 'Backlinks',
        text: 'Pitch the comparison framework to HR software review sites and comparison newsletters',
      },
      {
        type: 'Reviews',
        text: 'Ask customers who moved off perks-led platforms to review the switch',
      },
    ],
  },
  {
    stage: 'Switching',
    buyer: 'Head of Reward',
    keywords: ['ALT-01', 'VS-01'],
    prompt:
      'We’re on Forma but need to run benefits in a lot more countries. What should we be looking at instead?',
    priority: 'Medium',
    results: [NO, NO, NO, NO],
    why: 'A clear switch trigger with no matching Ben page. AI tools answering this lean on competitor and aggregator content.',
    fix: [
      {
        action: 'Create',
        text: 'Forma alternatives for global enterprise benefits teams',
        ref: 'ALT-01',
      },
      {
        action: 'Create',
        text: 'Migrating your employee benefits platform: plan, data and cutover',
        ref: 'JB-08',
      },
    ],
    moves: [
      {
        type: 'Backlinks',
        text: 'Earn links from migration-focused HR operations resources',
      },
      {
        type: 'Expert content',
        text: 'Publish a country-expansion benefits checklist for community sharing',
      },
    ],
  },

  /* ---------------- Head-to-head ---------------- */
  {
    stage: 'Head-to-head',
    buyer: 'Head of Reward',
    keywords: ['VS-01'],
    prompt: 'How does Ben compare with Forma for a multinational company?',
    priority: 'High',
    results: [
      {
        s: 'recommended',
        said: 'Forma is built around flexible lifestyle and wellbeing allowances, while Ben focuses on central administration of benefits across several countries with local configuration. If multi-country governance is the priority, Ben is the closer match.',
        also: ['Forma'],
        cited: 'thanksben.com/benefits-management',
        gap: 'The comparison rests entirely on Ben’s own pages. No neutral third-party source.',
      },
      {
        s: 'listed',
        said: 'Both platforms support employee benefits, but public information on Ben’s enterprise capabilities is thinner than for Forma, so a direct feature comparison is limited.',
        also: ['Forma'],
        gap: 'Thin public detail is pulling Ben’s answer down.',
      },
      {
        s: 'listed',
        said: 'Ben is positioned for multinational administration while Forma is positioned for flexible allowances. Teams tend to choose based on whether they need central rules and payroll coordination or employee-chosen spending.',
        also: ['Forma'],
        cited: 'thanksben.com/how-it-works',
      },
      NO,
    ],
    why: 'Brand-led prompts are where Ben is already visible. Gemini’s hedge shows the cost of thin public comparison content; a fair, sourced Ben vs Forma page would replace guesswork.',
    fix: [
      {
        action: 'Create',
        text: 'Ben vs Forma: enterprise benefits platform comparison',
        ref: 'VS-01',
      },
      {
        action: 'Improve',
        text: 'How it works page: add a capability table with sources and last-checked dates',
      },
    ],
    moves: [
      {
        type: 'Reviews',
        text: 'Seed review-site comparison profiles so neutral sources describe the difference',
      },
      {
        type: 'Backlinks',
        text: 'Invite analysts and HR technology writers to reference the comparison table',
      },
    ],
  },
  {
    stage: 'Head-to-head',
    buyer: 'HRIS & Security',
    keywords: ['VS-07', 'FT-06'],
    prompt:
      'Ben vs Rippling for employee benefits. Which is better for a company with entities in about 20 countries?',
    priority: 'Medium',
    results: [
      {
        s: 'listed',
        said: 'Rippling bundles benefits into a wider HR and payroll suite, whereas Ben is a dedicated benefits platform. For many entities and local rules a dedicated platform like Ben can offer more configuration, but you would need to check how it connects to your HRIS.',
        also: ['Rippling'],
        gap: 'Raises integration risk with no integration documentation to point to.',
      },
      NO,
      {
        s: 'listed',
        said: 'Ben is a specialist benefits platform, while Rippling’s benefits sit inside its all-in-one HR suite. Ben’s own site emphasises multi-entity programmes.',
        also: ['Rippling'],
        cited: 'thanksben.com/benefits-management',
      },
      NO,
    ],
    why: 'Both answers frame the choice as dedicated platform versus HRIS suite, which is the right fight. Integration detail is the missing proof.',
    fix: [
      {
        action: 'Create',
        text: 'Ben vs Rippling: dedicated benefits platform or HRIS module?',
        ref: 'VS-07',
      },
      {
        action: 'Create',
        text: 'Employee benefits Workday integration: data flows, SSO and setup',
        ref: 'FT-06',
      },
    ],
    moves: [
      {
        type: 'Partners',
        text: 'Pursue listings in HRIS marketplaces and integration directories',
      },
      {
        type: 'Community',
        text: 'Contribute integration how-tos in HRIS user communities',
      },
    ],
  },
  {
    stage: 'Head-to-head',
    buyer: 'HRIS & Security',
    keywords: ['VS-12'],
    prompt:
      'Should we buy a dedicated benefits platform or just use the benefits module in our HRIS? We’re a global company.',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: 'The strongest objection in the deal, and Ben is absent. AI answers give generic pros and cons because no vendor has published a direct answer.',
    fix: [
      {
        action: 'Create',
        text: 'Benefits administration software vs HRIS: when your HRIS module is enough',
        ref: 'VS-12',
      },
      {
        action: 'Create',
        text: 'Benefits-to-payroll reconciliation workflow',
        ref: 'JB-01',
      },
    ],
    moves: [
      {
        type: 'Expert content',
        text: 'Write a neutral decision guide for HR technology publications and invite HRIS consultants to contribute',
      },
      {
        type: 'Backlinks',
        text: 'Target consultant and implementation-partner blogs that cover this decision',
      },
    ],
  },
  {
    stage: 'Head-to-head',
    buyer: 'Head of Reward',
    keywords: ['VS-11', 'ALT-13'],
    prompt:
      'Global benefits platform vs benefits broker: who should actually run our programme?',
    priority: 'High',
    results: [
      NO,
      {
        s: 'passing',
        said: 'A platform such as Ben handles administration and data, while a broker advises on provider selection and negotiation. Some employers keep both.',
        also: ['Alight'],
        gap: 'No cited source. The nuance about keeping a broker has no page behind it.',
      },
      NO,
      NO,
    ],
    why: 'Gemini gets the idea but cannot point to anything. A page that owns the platform-plus-broker answer would earn the citation.',
    fix: [
      {
        action: 'Create',
        text: 'Global benefits platform vs benefits broker: who should run your programme?',
        ref: 'VS-11',
      },
      {
        action: 'Create',
        text: 'Alternatives to a traditional benefits broker',
        ref: 'ALT-13',
      },
    ],
    moves: [
      {
        type: 'Digital PR',
        text: 'Commission a short reward-leader survey on broker versus platform responsibilities',
      },
      {
        type: 'Partners',
        text: 'Co-host a webinar with a broker partner',
      },
    ],
  },

  /* ---------------- Pricing ---------------- */
  {
    stage: 'Pricing',
    buyer: 'Finance',
    keywords: ['PR-09', 'PR-07', 'PR-08'],
    prompt:
      'How much does an enterprise employee benefits platform cost per employee, and what usually pushes the price up?',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: 'Finance buyers want ranges and drivers. No Ben content explains pricing models, so answers cite competitors and generic guides.',
    fix: [
      {
        action: 'Create',
        text: 'Employee benefits platform cost per employee: benchmarks and how to model yours',
        ref: 'PR-09',
      },
      {
        action: 'Create',
        text: 'Global benefits platform pricing: per-employee, per-entity and implementation fees',
        ref: 'PR-08',
      },
    ],
    moves: [
      {
        type: 'Digital PR',
        text: 'Publish an original cost-of-administration benchmark for finance and HR press',
      },
      {
        type: 'Backlinks',
        text: 'Offer the calculator to finance communities and HR budgeting resources',
      },
    ],
  },
  {
    stage: 'Pricing',
    buyer: 'Finance',
    keywords: ['PR-01', 'PR-02'],
    prompt:
      'What does Ben charge for employee benefits, and is it worth it for a large company?',
    priority: 'High',
    results: [
      {
        s: 'listed',
        said: 'Ben’s site describes packaging and an implementation process, but I couldn’t find a published per-employee price, so you would need a quote. Whether it is worth it depends on how many countries and providers you are consolidating.',
        cited: 'thanksben.com/pricing',
        gap: 'No price drivers or example scenarios to quote.',
      },
      {
        s: 'passing',
        said: 'Detailed pricing for Ben isn’t listed publicly. Enterprise platforms are usually quoted on headcount, entities and modules.',
        gap: 'A generic enterprise-software answer, nothing specific to Ben.',
      },
      {
        s: 'listed',
        said: 'Ben’s pricing page outlines how packages and implementation work. Per-employee rates aren’t shown, so a quote is needed.',
        cited: 'thanksben.com/pricing',
      },
      {
        s: 'passing',
        said: 'Ben lists implementation details on its pricing page; detailed rates are not published.',
        cited: 'thanksben.com/pricing',
      },
    ],
    why: 'Ben is visible because the prompt names it, but every platform ends in ask for a quote. A pricing explainer with price drivers and a worked example would give AI something concrete to quote.',
    fix: [
      {
        action: 'Improve',
        text: 'Ben pricing: explain what drives price, with an example multi-entity scenario',
        ref: 'PR-01',
      },
      {
        action: 'Create',
        text: 'Benefits management software ROI calculator',
        ref: 'PR-10',
      },
    ],
    moves: [
      {
        type: 'Reviews',
        text: 'Add pricing context and implementation timelines to review-site profiles so third parties describe Ben consistently',
      },
      {
        type: 'Backlinks',
        text: 'Get the pricing explainer referenced in procurement-focused HR resources',
      },
    ],
  },

  /* ---------------- Business case ---------------- */
  {
    stage: 'Business case',
    buyer: 'Finance',
    keywords: ['JB-10', 'PR-10'],
    prompt:
      'How do I build a business case for consolidating our benefits providers into one platform? My CFO wants real numbers.',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: 'Almost no vendor competition on this prompt, and Ben has nothing a CFO could use. An open, editable model is easy for AI tools to cite and for a champion to forward.',
    fix: [
      {
        action: 'Create',
        text: 'How to build a business case for a benefits platform',
        ref: 'JB-10',
      },
      {
        action: 'Create',
        text: 'Benefits management software ROI calculator with every assumption visible',
        ref: 'PR-10',
      },
    ],
    moves: [
      {
        type: 'Digital PR',
        text: 'Offer finance and HR trade press a model with transparent assumptions',
      },
      {
        type: 'Backlinks',
        text: 'Share the model with FP&A communities and HR finance partner networks',
      },
    ],
  },

  /* ---------------- Implementation ---------------- */
  {
    stage: 'Implementation',
    buyer: 'HRIS & Security',
    keywords: ['PR-12', 'JB-08'],
    prompt:
      'How long does it take to implement an employee benefits platform across several countries, and what do we need to have ready?',
    priority: 'Medium',
    results: [
      NO,
      NO,
      {
        s: 'listed',
        said: 'Ben describes a four-stage implementation process covering requirements, configuration, testing and launch, which gives a useful template for what to prepare.',
        cited: 'thanksben.com/pricing',
        gap: 'No customer-side task list or timeline ranges.',
      },
      {
        s: 'passing',
        said: 'Vendors such as Ben outline phased rollouts that start with requirements gathering and end with launch support.',
        cited: 'thanksben.com/pricing',
      },
    ],
    why: 'The four-stage process is already being picked up. Customer-side tasks, data requirements and realistic timelines would move Ben from a passing example to the cited answer.',
    fix: [
      {
        action: 'Improve',
        text: 'Implementation and migration guide: customer-side tasks, data requirements and a UAT plan',
      },
      {
        action: 'Create',
        text: 'Employee benefits software implementation costs and timeline',
        ref: 'PR-12',
      },
    ],
    moves: [
      {
        type: 'Reviews',
        text: 'Capture implementation experience in customer reviews and one named case study',
      },
      {
        type: 'Partners',
        text: 'Publish onboarding notes with HRIS implementation partners',
      },
    ],
  },
  {
    stage: 'Implementation',
    buyer: 'HRIS & Security',
    keywords: ['JB-08', 'JB-03'],
    prompt:
      'We want to move from broker-managed benefits to a single platform. What does the migration actually involve?',
    priority: 'Medium',
    results: [
      NO,
      {
        s: 'passing',
        said: 'Some platforms, including Ben, are designed to take over administration while letting an existing broker relationship continue, which can simplify the transition.',
        gap: 'The claim has no supporting page, so it can’t be verified or cited.',
      },
      NO,
      NO,
    ],
    why: 'Gemini picks up the bring-your-own-broker angle but has no source for it. A migration guide would make it citable.',
    fix: [
      {
        action: 'Create',
        text: 'Migrating your employee benefits platform: plan, data and cutover',
        ref: 'JB-08',
      },
      {
        action: 'Create',
        text: 'Consolidating employee benefits providers: a migration-ready framework',
        ref: 'JB-03',
      },
    ],
    moves: [
      {
        type: 'Expert content',
        text: 'Publish a migration checklist with a customer or implementation partner',
      },
      {
        type: 'Backlinks',
        text: 'Pitch the checklist to HR operations communities and newsletters',
      },
    ],
  },

  /* ---------------- Integration & security ---------------- */
  {
    stage: 'Integration & security',
    buyer: 'Payroll',
    keywords: ['FT-06', 'FT-08', 'FT-02'],
    prompt:
      'Does Ben integrate with Workday and ADP, and how does the benefits-to-payroll file actually work?',
    priority: 'High',
    results: [
      {
        s: 'passing',
        said: 'Ben describes HRIS and payroll integrations, but I couldn’t find public documentation of specific Workday or ADP connectors or file formats, so confirm with the vendor.',
        gap: 'No integration documentation found. This is exactly what a technical reviewer would flag.',
      },
      {
        s: 'passing',
        said: 'Ben lists integrations with HR and payroll systems; connector-level detail isn’t clearly documented in public sources.',
        gap: 'Same dead end: no public connector detail.',
      },
      {
        s: 'listed',
        said: 'Ben’s materials reference HRIS and payroll integration as part of its benefits management platform, but connector-level detail isn’t published.',
        cited: 'thanksben.com/benefits-management',
      },
      NO,
    ],
    why: 'Every answer reaches the same dead end: no public connector or file documentation. This is the cheapest high-value gap on the list.',
    fix: [
      {
        action: 'Create',
        text: 'Employee benefits Workday integration: data flows, SSO and setup',
        ref: 'FT-06',
      },
      {
        action: 'Create',
        text: 'Employee benefits ADP integration: payroll files and validation',
        ref: 'FT-08',
      },
    ],
    moves: [
      {
        type: 'Partners',
        text: 'Seek listings in HRIS and payroll integration directories',
      },
      {
        type: 'Backlinks',
        text: 'Publish an anonymised payroll file spec that practitioners will link to',
      },
    ],
  },
  {
    stage: 'Integration & security',
    buyer: 'Payroll',
    keywords: ['JB-01', 'JB-12'],
    prompt:
      'How can we automate benefits payroll reconciliation? Payroll keeps finding deduction errors right before payday.',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: 'Payroll’s core pain with no Ben content behind it. Practitioner forums and payroll vendors currently set the answer.',
    fix: [
      {
        action: 'Create',
        text: 'How to automate benefits payroll reconciliation across countries',
        ref: 'JB-01',
      },
      {
        action: 'Create',
        text: 'Why benefits deductions go wrong in payroll, and how to reduce errors',
        ref: 'JB-12',
      },
    ],
    moves: [
      {
        type: 'Community',
        text: 'Contribute substantive answers in payroll practitioner communities, with disclosure',
      },
      {
        type: 'Backlinks',
        text: 'Offer the monthly cut-off timeline to payroll associations and vendor client communities',
      },
    ],
  },
  {
    stage: 'Integration & security',
    buyer: 'HRIS & Security',
    keywords: ['FT-11', 'FT-12'],
    prompt:
      'What security certifications and SSO options should I ask an employee benefits platform vendor about? Which vendors have them?',
    priority: 'Medium',
    results: [NO, NO, NO, NO],
    why: 'Security reviewers need forwardable proof. With no trust or SSO page, AI tools cannot name Ben even if it qualifies.',
    fix: [
      {
        action: 'Create',
        text: 'Employee benefits SSO integration: SAML, OIDC and provisioning',
        ref: 'FT-11',
      },
      {
        action: 'Create',
        text: 'Security and DPIA pack for procurement reviews',
      },
    ],
    moves: [
      {
        type: 'Reviews',
        text: 'Publish certifications and SSO options on review-site profiles',
      },
      {
        type: 'Partners',
        text: 'Request listings in HR security and vendor-risk directories',
      },
    ],
  },
];

const PROMPTS: Prompt[] = RAW.map((p, i) => ({
  ...p,
  id: `P${String(i + 1).padStart(2, '0')}`,
}));

/* ------------------------------------------------------------------ */
/* Derived values and helpers                                          */
/* ------------------------------------------------------------------ */

const appears = (p: Prompt) => p.results.some((r) => r.s !== 'absent');
const TOTAL = PROMPTS.length;
const VISIBLE = PROMPTS.filter(appears).length;
const CELLS = PROMPTS.flatMap((p) => p.results);
const TOP_PICKS = CELLS.filter((r) => r.s === 'recommended').length;
const CITED = CELLS.filter((r) => r.cited).length;
const HEDGED = CELLS.filter((r) => r.gap).length;

const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const csvCell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

function exportCsv(rows: Prompt[]) {
  const head = [
    'ID',
    'Stage',
    'Buyer prompt',
    'Buyer',
    'Mapped keywords',
    ...PLATFORMS.map((p) => `${p.name} status`),
    'Platforms showing Ben',
    'What AI said (sample)',
    'Priority',
    'Why it matters',
    'Content to create or fix',
    'Authority moves',
  ];
  const lines = rows.map((p) =>
    [
      p.id,
      p.stage,
      p.prompt,
      p.buyer,
      p.keywords.join(' '),
      ...p.results.map((r) => STATUS_LABEL[r.s]),
      p.results.filter((r) => r.s !== 'absent').length,
      p.results
        .map((r, i) => (r.said ? `${PLATFORMS[i].name}: ${r.said}` : ''))
        .filter(Boolean)
        .join(' | '),
      p.priority,
      p.why,
      p.fix.map((f) => `${f.action}: ${f.text}`).join(' | '),
      p.moves.map((m) => `${m.type}: ${m.text}`).join(' | '),
    ]
      .map(csvCell)
      .join(','),
  );
  const blob = new Blob(
    ['﻿' + [head.map(csvCell).join(','), ...lines].join('\r\n')],
    { type: 'text/csv;charset=utf-8' },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ai-visibility-sample-audit.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

function Highlight({ text }: { text: string }) {
  const parts = text.split(/(\bBen(?:’s|'s)?\b)/g);
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <mark key={i}>{p}</mark> : p))}
    </>
  );
}

function RankStrip({ pos }: { pos: [number, number] }) {
  const [n, of] = pos;
  return (
    <div className="av-rank">
      <div className="av-rank-bar" aria-hidden="true">
        {Array.from({ length: of }, (_, i) => (
          <i key={i} className={i === n - 1 ? 'me' : ''} />
        ))}
      </div>
      <span>
        Named {ordinal(n)} of {of}
      </span>
    </div>
  );
}

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
    <label className="av-field">
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

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function AiVisibility() {
  const [stage, setStage] = useState<'All' | Stage>('All');
  const [vis, setVis] = useState<'all' | 'appears' | 'absent'>('all');
  const [plat, setPlat] = useState<'all' | PlatformKey>('all');
  const [prio, setPrio] = useState<'all' | Priority>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('P05');
  const listRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pi = plat === 'all' ? -1 : PLATFORMS.findIndex((x) => x.key === plat);
    return PROMPTS.filter((p) => {
      if (stage !== 'All' && p.stage !== stage) return false;
      if (prio !== 'all' && p.priority !== prio) return false;
      if (vis !== 'all') {
        const hit = pi === -1 ? appears(p) : p.results[pi].s !== 'absent';
        if (vis === 'appears' ? !hit : hit) return false;
      }
      if (
        q &&
        !`${p.id} ${p.prompt} ${p.stage} ${p.buyer} ${p.keywords.join(' ')}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [stage, vis, plat, prio, query]);

  const selIndex = Math.max(
    0,
    rows.findIndex((r) => r.id === selectedId),
  );
  const sel: Prompt | undefined = rows[selIndex];

  const filtersActive =
    stage !== 'All' ||
    vis !== 'all' ||
    plat !== 'all' ||
    prio !== 'all' ||
    query !== '';

  const reset = () => {
    setStage('All');
    setVis('all');
    setPlat('all');
    setPrio('all');
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

  /* overview numbers */
  const R = 46;
  const C = 2 * Math.PI * R;
  const platformCover = PLATFORMS.map(
    (_, i) => PROMPTS.filter((p) => p.results[i].s !== 'absent').length,
  );
  const stageCover = STAGES.map((s) => {
    const all = PROMPTS.filter((p) => p.stage === s);
    return { s, total: all.length, hit: all.filter(appears).length };
  });


  const hits = sel ? sel.results.filter((r) => r.s !== 'absent').length : 0;
  const citedHits = sel ? sel.results.filter((r) => r.cited).length : 0;

  return (
    <section className="tb-page-section tb-pad av-section" id="ai">
      <div className="tb-container">
        <header className="tb-section-intro">
          <div className="tb-eyebrow">
            <span>04</span>AI SEARCH VISIBILITY &amp; AUTHORITY
          </div>
          <h2>Make Ben useful in the answers buyers ask AI to assemble.</h2>
          <p>
            {TOTAL} bottom-of-funnel prompts, phrased the way a buyer would
            actually ask, each mapped to the keyword and page work in section
            03. For every prompt: how Ben shows up across four AI platforms, what
            the AI said where it does, and the content and authority moves that
            would change the answer.
          </p>
        </header>

    

        {/* ---------- Overview ---------- */}
        <div className="av-overview">
          <div className="av-card av-card-ring">
            <div className="av-card-head">PROMPT COVERAGE</div>
            <div className="av-ring-wrap">
              <svg
                viewBox="0 0 120 120"
                className="av-ring"
                role="img"
                aria-label={`Ben appears on at least one platform for ${VISIBLE} of ${TOTAL} prompts`}
              >
                <circle cx="60" cy="60" r={R} className="av-ring-bg" />
                <circle
                  cx="60"
                  cy="60"
                  r={R}
                  className="av-ring-fg"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - VISIBLE / TOTAL)}
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="58" className="av-ring-pct">
                  {Math.round((VISIBLE / TOTAL) * 100)}%
                </text>
                <text x="60" y="76" className="av-ring-sub">
                  {VISIBLE} of {TOTAL}
                </text>
              </svg>
              <dl className="av-mini">
                <div>
                  <dt>Top-pick answers</dt>
                  <dd>{TOP_PICKS}</dd>
                </div>
                <div>
                  <dt>Cited as a source</dt>
                  <dd>{CITED}</dd>
                </div>
                <div>
                  <dt>Thin or hedged</dt>
                  <dd>{HEDGED}</dd>
                </div>
                <div>
                  <dt>No presence</dt>
                  <dd>{TOTAL - VISIBLE}</dd>
                </div>
              </dl>
            </div>
            <p className="av-card-foot">
              Prompts where Ben appears on at least one platform.
            </p>
          </div>

          <div className="av-card">
            <div className="av-card-head">BY PLATFORM</div>
            <div className="av-bars">
              {PLATFORMS.map((p, i) => (
                <div className="av-bar" key={p.key}>
                  <span>{p.name}</span>
                  <div className="av-bar-track">
                    <i style={{ width: `${(platformCover[i] / TOTAL) * 100}%` }} />
                  </div>
                  <b>
                    {platformCover[i]}/{TOTAL}
                  </b>
                </div>
              ))}
            </div>
            <p className="av-card-foot">Prompts where Ben is named at all.</p>
          </div>

          <div className="av-card">
            <div className="av-card-head">BY BUYING STAGE</div>
            <div className="av-bars">
              {stageCover.map((x) => (
                <div className="av-bar" key={x.s}>
                  <span>{x.s}</span>
                  <div className="av-bar-track">
                    <i
                      className={x.hit === 0 ? 'zero' : ''}
                      style={{ width: `${(x.hit / x.total) * 100}%` }}
                    />
                  </div>
                  <b>
                    {x.hit}/{x.total}
                  </b>
                </div>
              ))}
            </div>
            <p className="av-card-foot">Where the biggest gaps sit.</p>
          </div>
        </div>

        {/* ---------- Toolbar ---------- */}
        <div className="av-toolbar" ref={workRef}>
          <div className="av-chips" role="tablist" aria-label="Buying stage">
            {(['All', ...STAGES] as const).map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={stage === s}
                className={stage === s ? 'active' : ''}
                onClick={() => setStage(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="av-controls">
            <label className="av-search">
              <span className="av-sr">Search prompts</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search prompts, buyers or keyword IDs…"
              />
            </label>
            <Field
              label="Visibility"
              value={vis}
              onChange={(v) => setVis(v as 'all' | 'appears' | 'absent')}
              options={[
                ['all', 'All prompts'],
                ['appears', 'Ben appears'],
                ['absent', 'Ben absent'],
              ]}
            />
            <Field
              label="Platform"
              value={plat}
              onChange={(v) => setPlat(v as 'all' | PlatformKey)}
              options={[
                ['all', 'Any platform'],
                ...PLATFORMS.map((p): [string, string] => [p.key, p.name]),
              ]}
            />
            <Field
              label="Priority"
              value={prio}
              onChange={(v) => setPrio(v as 'all' | Priority)}
              options={[
                ['all', 'All priorities'],
                ['High', 'High'],
                ['Medium', 'Medium'],
                ['Low', 'Low'],
              ]}
            />
          </div>
          <div className="av-toolbar-row">
            <span className="av-count">
              {rows.length} of {TOTAL} prompts
            </span>
            <div className="av-toolbar-actions">
              {filtersActive && (
                <button type="button" className="av-reset" onClick={reset}>
                  Reset filters
                </button>
              )}
              <button
                type="button"
                className="av-export"
                onClick={() => exportCsv(rows)}
                disabled={!rows.length}
              >
                Export CSV ({rows.length})
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Workspace ---------- */}
        <div className="av-workspace">
          <div className="av-list-card">
            <div className="av-list-head">
              <span>BUYER PROMPT LIBRARY</span>
              <span>{rows.length} PROMPTS</span>
            </div>
            <div className="av-legend">
              <span>
                <i className="d d-recommended" />
                Recommended
              </span>
              <span>
                <i className="d d-listed" />
                Named
              </span>
              <span>
                <i className="d d-passing" />
                Passing
              </span>
              <span>
                <i className="d d-absent" />
                None
              </span>
              <small>Dots read GPT · GEM · PPX · AIO</small>
            </div>
            <div className="av-list" ref={listRef} onKeyDown={onListKey} role="list">
              {rows.length === 0 && (
                <div className="av-empty">
                  <strong>No prompts match these filters.</strong>
                  <p>Loosen a filter or reset to see the full library.</p>
                  <button type="button" className="av-reset" onClick={reset}>
                    Reset filters
                  </button>
                </div>
              )}
              {rows.map((p) => (
                <button
                  key={p.id}
                  role="listitem"
                  data-id={p.id}
                  type="button"
                  className={`av-item${sel?.id === p.id ? ' active' : ''}`}
                  onClick={() => pick(p.id)}
                >
                  <span className="av-item-id">{p.id.slice(1)}</span>
                  <span className="av-item-main">
                    <small>
                      {p.stage} · {p.buyer}
                    </small>
                    <strong>{p.prompt}</strong>
                  </span>
                  <span className="av-dots" aria-hidden="true">
                    {p.results.map((r, i) => (
                      <i
                        key={PLATFORMS[i].key}
                        className={`d d-${r.s}`}
                        title={`${PLATFORMS[i].name}: ${STATUS_LABEL[r.s]}`}
                      />
                    ))}
                  </span>
                </button>
              ))}
            </div>
            <div className="av-list-foot">
              Use ↑ ↓ to move between prompts.
            </div>
          </div>

          <div className="av-detail" ref={detailRef} aria-live="polite">
            {!sel ? (
              <div className="av-empty">
                <strong>Select a prompt</strong>
                <p>The audit result and action plan appear here.</p>
              </div>
            ) : (
              <>
                <div className="av-detail-top">
                  <span className="tb-overline">
                    PROMPT {sel.id.slice(1)} OF {TOTAL} · {sel.stage.toUpperCase()}
                  </span>
                  <span className={`av-pri av-pri--${sel.priority.toLowerCase()}`}>
                    {sel.priority} priority
                  </span>
                </div>

                <div className="av-chat">
                  <div className="av-chat-meta">
                    <span className="av-avatar">B</span>
                    <small>
                      BUYER PROMPT · {sel.buyer.toUpperCase()}
                    </small>
                  </div>
                  <p>{sel.prompt}</p>
                </div>
                <div className="av-maps">
                  <span>Maps to</span>
                  {sel.keywords.map((k) => (
                    <code key={k}>{k}</code>
                  ))}
                </div>

                <div className="av-section-title">
                  <h4>How Ben shows up</h4>
                  <span>
                    {hits === 0
                      ? 'Not named on any of 4 platforms'
                      : `Named on ${hits} of 4 platforms · cited on ${citedHits}`}
                  </span>
                </div>

                <div className="av-results">
                  {sel.results.map((r, i) => {
                    const pl = PLATFORMS[i];
                    if (r.s === 'absent') {
                      return (
                        <div className="av-res av-res--absent" key={pl.key}>
                          <span className="av-badge">{pl.short}</span>
                          <div>
                            <strong>{pl.name}</strong>
                            <small>Ben not mentioned</small>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <article className="av-res" key={pl.key}>
                        <header>
                          <span className="av-badge">{pl.short}</span>
                          <strong>{pl.name}</strong>
                          <span className={`av-status av-status--${r.s}`}>
                            {STATUS_LABEL[r.s]}
                          </span>
                        </header>
                        {r.pos && <RankStrip pos={r.pos} />}
                        <blockquote>
                          <Highlight text={r.said ?? ''} />
                        </blockquote>
                        <div className="av-res-meta">
                          {r.also && r.also.length > 0 && (
                            <div>
                              <span>Also named</span>
                              {r.also.map((a) => (
                                <em key={a}>{a}</em>
                              ))}
                            </div>
                          )}
                          <div>
                            <span>Source</span>
                            {r.cited ? (
                              <code className="av-cited">{r.cited}</code>
                            ) : (
                              <em className="av-uncited">Ben not cited</em>
                            )}
                          </div>
                        </div>
                        {r.gap && (
                          <p className="av-gap">
                            <b>Gap</b>
                            {r.gap}
                          </p>
                        )}
                      </article>
                    );
                  })}
                </div>

                <div className="av-section-title">
                  <h4>What to do about it</h4>
                  <span>Content, then authority</span>
                </div>
                <p className="av-why">{sel.why}</p>

                <div className="av-plan">
                  <div>
                    <div className="av-plan-label">CONTENT TO CREATE OR FIX</div>
                    <ul>
                      {sel.fix.map((f) => (
                        <li key={f.text}>
                          <em className={f.action === 'Create' ? 'create' : 'improve'}>
                            {f.action}
                          </em>
                          <span>
                            {f.text}
                            {f.ref && <code>{f.ref}</code>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="av-plan-label">AUTHORITY &amp; BACKLINKS</div>
                    <ul>
                      {sel.moves.map((m) => (
                        <li key={m.text}>
                          <em className="move">{m.type}</em>
                          <span>{m.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="av-retest">
                  <small>HOW TO VALIDATE</small>
                  <p>
                    Run this exact prompt on all four platforms, log the date,
                    geography and every cited URL, and repeat 30 days after the
                    new assets go live.
                  </p>
                </div>

                <div className="av-pager">
                  <button
                    type="button"
                    disabled={selIndex === 0}
                    onClick={() => setSelectedId(rows[selIndex - 1].id)}
                    aria-label="Previous prompt"
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
                    aria-label="Next prompt"
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