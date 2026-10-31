import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import './KeywordPriorities.css';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Priority = 'High' | 'Medium' | 'Low';
type Action = 'Create' | 'Improve' | 'Validate';
type GroupKey = 'best' | 'alt' | 'vs' | 'price' | 'jtbd' | 'feature';
type Format =
  | 'Ranked list'
  | 'Alternatives page'
  | 'Comparison page'
  | 'Pricing guide'
  | 'Calculator'
  | 'Reviews hub'
  | 'Workflow guide'
  | 'Playbook'
  | 'Template'
  | 'Integration page'
  | 'Product page';
type SortKey = 'recommended' | 'volume' | 'difficulty' | 'score' | 'original';
type DiffBand = 'easy' | 'moderate' | 'hard';

type Tuple = [
  keyword: string,
  title: string,
  format: Format,
  action: Action,
  priority: Priority,
  volume: number,
  kd: number,
  buyer: number,
  why: string,
];

type Kw = {
  id: string;
  order: number;
  group: GroupKey;
  keyword: string;
  title: string;
  format: Format;
  action: Action;
  priority: Priority;
  volume: number;
  kd: number;
  buyer: number;
  why: string;
  score: number;
};

/* ------------------------------------------------------------------ */
/* Reference data                                                      */
/* ------------------------------------------------------------------ */

const GROUP_ORDER: GroupKey[] = ['best', 'alt', 'vs', 'price', 'jtbd', 'feature'];

const GROUPS: Record<
  GroupKey,
  { code: string; label: string; blurb: string; intent: string; path: string }
> = {
  best: {
    code: 'BO',
    label: 'Best of',
    blurb: 'Shortlist and listicle queries',
    intent: 'Commercial investigation',
    path: 'best',
  },
  alt: {
    code: 'ALT',
    label: 'Alternatives',
    blurb: 'Switch-intent queries',
    intent: 'Switch intent',
    path: 'alternatives',
  },
  vs: {
    code: 'VS',
    label: 'Comparison (Vs)',
    blurb: 'Head-to-head evaluation',
    intent: 'Vendor evaluation',
    path: 'compare',
  },
  price: {
    code: 'PR',
    label: 'Pricing & reviews',
    blurb: 'Cost and proof queries',
    intent: 'Purchase planning',
    path: 'pricing',
  },
  jtbd: {
    code: 'JB',
    label: 'Jobs to be done',
    blurb: 'Problem-led queries',
    intent: 'Problem and solution-aware',
    path: 'guides',
  },
  feature: {
    code: 'FT',
    label: 'Feature based',
    blurb: 'Capability and integration queries',
    intent: 'Requirements check',
    path: 'features',
  },
};

const BUYERS = [
  'Head of Reward',
  'Benefits Ops',
  'Payroll',
  'Finance',
  'HRIS & Security',
];

const PRIORITY_RANK: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };

const FORMAT_GUIDE: Record<
  Format,
  { cover: string[]; evidence: string; signal: string }
> = {
  'Ranked list': {
    cover: [
      'Open with the criteria enterprise buyers use: country coverage, configuration, payroll, reporting',
      'Shortlist vendors with a plain fit and not-a-fit note each, including where Ben is not the right choice',
      'Show Ben’s fit with product screenshots rather than claims',
      'Close with a downloadable scorecard that links to /rfp',
    ],
    evidence:
      'Dated vendor research with sources, a visible scoring method, product screenshots, verifiable customer proof.',
    signal: 'Scorecard downloads and demo-page visits from vendor-evaluation traffic',
  },
  'Alternatives page': {
    cover: [
      'Say who the incumbent suits and where teams typically outgrow it',
      'Compare on the dimensions that trigger a switch: countries, eligibility rules, payroll, reporting',
      'Give a migration view: what moves, what changes, how long it takes',
      'Offer a side-by-side checklist and a clear demo path',
    ],
    evidence:
      'Fact-checked competitor claims with dated sources, migration steps, and a named customer who switched if one is available.',
    signal: 'Demo requests from switch-intent traffic',
  },
  'Comparison page': {
    cover: [
      'Lead with who each platform is built for',
      'Capability table with a source and last-checked date on every row',
      'State plainly where the other platform is stronger',
      'Finish with a decision guide: which team should choose which',
    ],
    evidence:
      'Sourced competitor facts with check dates, Ben product screenshots, a reviewer from sales or customer success.',
    signal: 'Demo requests and /rfp visits from branded comparison searches',
  },
  'Pricing guide': {
    cover: [
      'Explain the pricing models: per employee, per entity, implementation and add-ons',
      'List what pushes a quote up or down',
      'Give ranges only where sourced, otherwise a way to estimate',
      'End with questions to ask in any vendor quote',
    ],
    evidence:
      'Sourced price points or a clearly labelled estimation method, plus Ben’s own pricing logic where it can be shared.',
    signal: 'Pricing-page visits and quote requests',
  },
  Calculator: {
    cover: [
      'Inputs for entities, headcount, countries and current vendors',
      'Every assumption visible and editable',
      'An output summary the champion can forward to Finance',
      'A method note explaining each formula',
    ],
    evidence:
      'A defensible formula, a source for each assumption, and a worked example.',
    signal: 'Calculator completions and exports',
  },
  'Reviews hub': {
    cover: [
      'Show only verifiable reviews with source and date',
      'Group by buyer role and use case',
      'Link to the review profiles rather than summarising what can’t be verified',
      'Add a short guide to reading reviews as an enterprise buyer',
    ],
    evidence:
      'Real, attributable customer reviews and third-party listings. Do not invent or paraphrase testimonials.',
    signal: 'Demo-page visits from review traffic',
  },
  'Workflow guide': {
    cover: [
      'Describe the problem in the words the buyer uses',
      'Walk through the workflow step by step with a monthly timeline',
      'Show where errors enter and how validation catches them',
      'Show the same workflow in Ben with product screenshots',
    ],
    evidence:
      'Product screenshots, an anonymised sample file, and a review by someone who runs the process.',
    signal: 'Guide-to-demo conversion and template downloads',
  },
  Playbook: {
    cover: [
      'Frame the decision and who owns it',
      'Give a step-by-step approach with a template to copy',
      'Include entity-level or country-by-country examples',
      'Link to the relevant product page and a next step',
    ],
    evidence:
      'Practitioner input, a downloadable template, and sourced benchmarks.',
    signal: 'Template downloads and return visits',
  },
  Template: {
    cover: [
      'A usable template people can copy today, with no form gate',
      'A worked example filled in for a realistic multi-entity company',
      'Notes on the mistakes the template is designed to prevent',
      'A route to the related product page and guide',
    ],
    evidence:
      'A tested template, an anonymised example, and review by a benefits operations practitioner.',
    signal: 'Template downloads and onward product-page visits',
  },
  'Integration page': {
    cover: [
      'State supported systems and connection methods: API, SFTP, SSO',
      'Show the data flow and what each side owns',
      'Detail setup steps, timelines and customer-side tasks',
      'Link directly to security and certification information',
    ],
    evidence:
      'Technical documentation reviewed by the integrations team, a supported-version list, and security documentation.',
    signal: 'Integration-doc views by HRIS and security reviewers',
  },
  'Product page': {
    cover: [
      'Audit the existing page against evaluation intent before changing it',
      'Lead with the job to be done, then show the configuration',
      'Use product-specific terms, screenshots and country qualifications',
      'Add the questions evaluators ask: implementation, security, reporting',
    ],
    evidence:
      'Current product screenshots, country-coverage qualifications, implementation process, verifiable customer proof.',
    signal: 'Qualified product enquiries and enterprise or demo page visits',
  },
};

/* ------------------------------------------------------------------ */
/* Keyword data. Volume and difficulty are illustrative estimates.      */
/* ------------------------------------------------------------------ */

const BEST: Tuple[] = [
  ['best global employee benefits platforms', 'Best global employee benefits platforms for enterprise teams', 'Ranked list', 'Create', 'High', 390, 52, 0, 'Core category query. The Head of Reward uses it to build a first shortlist, so the page needs honest criteria rather than a self-ranking.'],
  ['best employee benefits administration software', 'Best employee benefits administration software: how enterprise teams shortlist', 'Ranked list', 'Create', 'High', 480, 58, 1, 'Highest-volume theme in the set. Operators compare tools here, so lead with eligibility, enrolment and exception handling.'],
  ['best multinational employee benefits software', 'Best multinational employee benefits software, compared by country coverage', 'Ranked list', 'Create', 'High', 170, 41, 0, 'Close fit with Ben’s multi-country positioning and lower difficulty than the broader administration terms.'],
  ['best benefits management software for large companies', 'Best benefits management software for large companies: a buyer’s shortlist', 'Ranked list', 'Create', 'Medium', 210, 47, 0, 'Large-company framing suits the enterprise ICP. Overlaps BO-02, so differentiate on entity complexity.'],
  ['best benefits platforms for global workforce', 'Best benefits platforms for a global workforce: coverage, configuration and reporting', 'Ranked list', 'Create', 'Medium', 140, 38, 0, 'Strong match for the global-workforce story. Cover configuration and reporting in product-specific terms.'],
  ['best benefits software for HR teams', 'Best benefits software for HR teams: an operations-first comparison', 'Ranked list', 'Create', 'Medium', 320, 55, 1, 'Broad HR-team intent that skews mid-market. Validate that the traffic fits the enterprise ICP before investing.'],
  ['best employee benefits analytics software', 'Best employee benefits analytics software for utilisation and spend', 'Ranked list', 'Create', 'Medium', 90, 33, 3, 'Smaller query with a clear Finance and Reward angle. Pairs with the reporting dashboard feature page.'],
  ['best flexible benefits platforms for enterprises', 'Best flexible benefits platforms for enterprises, and where flex stops fitting', 'Ranked list', 'Create', 'Medium', 110, 36, 0, 'Only worth ranking if Ben’s flexible-benefits fit is clearly scoped. Be explicit about where flex stops fitting.'],
  ['best global rewards and recognition platforms', 'Best global rewards and recognition platforms, and where benefits fit in', 'Ranked list', 'Validate', 'Low', 260, 49, 0, 'Adjacent category with high volume but partial product fit. Validate intent before building anything.'],
  ['best employee benefits software for payroll integration', 'Best employee benefits software for payroll integration', 'Ranked list', 'Create', 'High', 70, 29, 2, 'Low difficulty and high relevance. Payroll is the gatekeeper in the deal and few vendors speak to them directly.'],
  ['best employee benefits software for distributed teams', 'Best employee benefits software for distributed and mixed workforces', 'Ranked list', 'Create', 'Medium', 80, 31, 1, 'Mixed and deskless workforce is a genuine differentiator. Show mobile access and eligibility by worker type.'],
  ['best benefits administration platforms for multinational companies', 'Best benefits administration platforms for multinational companies', 'Ranked list', 'Create', 'Low', 60, 34, 0, 'Near-duplicate of BO-03. Fold it into that page as a section unless the SERP shows a different intent.'],
  ['best enterprise employee benefits platforms UK', 'Best enterprise employee benefits platforms in the UK', 'Ranked list', 'Create', 'High', 130, 37, 0, 'The UK is a lead market, so a localised shortlist should convert better than the global version.'],
];

const ALT: Tuple[] = [
  ['forma alternatives', 'Forma alternatives for global enterprise benefits teams', 'Alternatives page', 'Create', 'High', 110, 34, 0, 'Direct competitor in lifestyle and flexible benefits. Position on multi-country configuration and payroll reconciliation.'],
  ['benepass alternatives', 'Benepass alternatives for teams managing benefits across countries', 'Alternatives page', 'Create', 'Medium', 90, 31, 0, 'Switch-intent query. Frame it around teams running several countries, not a single market.'],
  ['cobee alternatives', 'Cobee alternatives for multi-country enterprise benefits', 'Alternatives page', 'Create', 'Medium', 50, 24, 0, 'Small query with low difficulty. Verify where Cobee is strongest before positioning against it.'],
  ['perks at work alternatives', 'Perks at Work alternatives for enterprise benefits administration', 'Alternatives page', 'Create', 'Medium', 70, 27, 0, 'Low competition and clear switch intent. Check the current brand and offering before drafting.'],
  ['reward gateway alternatives', 'Reward Gateway alternatives: when recognition isn’t the whole job', 'Alternatives page', 'Create', 'High', 320, 44, 0, 'Largest alternatives query in the set. Cover where recognition-led platforms stop and benefits administration begins.'],
  ['darwin benefits alternatives', 'Darwin Benefits alternatives for enterprise teams', 'Alternatives page', 'Create', 'Medium', 60, 22, 0, 'Niche but bottom-funnel. A short, fair page is enough.'],
  ['alight benefits alternatives', 'Alight alternatives: outsourced administration vs a platform you control', 'Alternatives page', 'Create', 'High', 140, 39, 0, 'Searchers are often weighing outsourced administration against a platform. Address control and visibility directly.'],
  ['rippling benefits alternatives', 'Rippling benefits alternatives for multi-country enterprises', 'Alternatives page', 'Create', 'Medium', 170, 46, 4, 'HRIS-bundled benefits is the main substitute at larger employers. Be specific about multi-entity needs.'],
  ['heka alternatives', 'Heka alternatives for enterprise benefits teams', 'Alternatives page', 'Validate', 'Low', 30, 18, 0, 'Very small and unproven. Confirm the volume exists before spending production time.'],
  ['happl alternatives', 'Happl alternatives for multi-country benefits', 'Alternatives page', 'Validate', 'Low', 40, 20, 0, 'Very small and unproven. Confirm the volume exists before spending production time.'],
  ['benefithub alternatives', 'BenefitHub alternatives for enterprise employee benefits', 'Alternatives page', 'Validate', 'Medium', 130, 30, 0, 'Skews towards US employee-perks buyers. Check fit with the UK and EU enterprise ICP first.'],
  ['benefitfocus alternatives', 'Benefitfocus alternatives for global benefits administration', 'Alternatives page', 'Validate', 'Medium', 210, 36, 1, 'Mostly US demand. Validate geography before creating a page.'],
  ['traditional benefits broker alternatives', 'Alternatives to a traditional benefits broker: what to move in-house', 'Alternatives page', 'Create', 'High', 90, 28, 0, 'Broker renewal is a key trigger for the Head of Reward. Explain what moves in-house and what a broker still does best.'],
];

const VS: Tuple[] = [
  ['ben vs forma', 'Ben vs Forma: enterprise benefits platform comparison', 'Comparison page', 'Create', 'High', 20, 12, 0, 'Branded comparison that catches buyers who already have Ben on a shortlist. Low volume, high intent.'],
  ['ben vs benepass', 'Ben vs Benepass: which fits a multi-country programme?', 'Comparison page', 'Create', 'Medium', 20, 11, 0, 'Same pattern as BEN vs Forma. Reuse the template and keep every claim sourced.'],
  ['ben vs cobee', 'Ben vs Cobee: comparing benefits platforms for growing international teams', 'Comparison page', 'Create', 'Medium', 10, 10, 0, 'Moderate-intent branded comparison. Worth producing from the same template.'],
  ['ben vs reward gateway', 'Ben vs Reward Gateway: benefits administration or recognition-led?', 'Comparison page', 'Create', 'High', 30, 14, 0, 'Likely to appear on enterprise shortlists. Prioritise a fair, well-sourced page.'],
  ['ben vs darwin benefits', 'Ben vs Darwin Benefits: a side-by-side for enterprise buyers', 'Comparison page', 'Create', 'Medium', 10, 9, 0, 'Small but bottom-funnel. A short template page is enough.'],
  ['ben vs alight', 'Ben vs Alight: platform-led or outsourced benefits administration', 'Comparison page', 'Create', 'High', 20, 13, 0, 'Frames the control-versus-outsourcing question directly. Strong fit for large, complex buyers.'],
  ['ben vs rippling', 'Ben vs Rippling: dedicated benefits platform or HRIS module?', 'Comparison page', 'Create', 'High', 30, 15, 4, 'Meets the “our HRIS already does this” objection head-on. Be specific about multi-entity rules.'],
  ['ben vs heka', 'Ben vs Heka: benefits platform comparison', 'Comparison page', 'Validate', 'Low', 10, 8, 0, 'Tiny demand. Create only if sales hears the name in live deals.'],
  ['ben vs happl', 'Ben vs Happl: benefits platform comparison', 'Comparison page', 'Validate', 'Low', 10, 8, 0, 'Tiny demand. Create only if sales hears the name in live deals.'],
  ['forma vs benepass', 'Forma vs Benepass: which suits an international team?', 'Comparison page', 'Validate', 'Low', 70, 25, 0, 'Third-party comparison. Worth it only if Ben can be positioned honestly as a third option.'],
  ['global benefits platform vs benefits broker', 'Global benefits platform vs benefits broker: who should run your programme?', 'Comparison page', 'Create', 'High', 50, 22, 0, 'Answers the buying-model question the Head of Reward asks early. Feeds the broker alternatives page.'],
  ['benefits administration software vs HRIS', 'Benefits administration software vs HRIS: when your HRIS module is enough', 'Comparison page', 'Create', 'High', 90, 27, 4, 'Pre-empts the strongest objection: our HRIS already does this. HRIS leads will read this page.'],
  ['flexible benefits platform vs traditional benefits', 'Flexible vs traditional benefits: what changes for a global programme', 'Comparison page', 'Create', 'Medium', 110, 30, 0, 'Educational comparison with moderate volume. Link to the flexible-benefits page rather than compete with it.'],
];

const PRICE: Tuple[] = [
  ['ben employee benefits pricing', 'Ben pricing: how enterprise benefits platform pricing works', 'Pricing guide', 'Improve', 'High', 30, 10, 3, 'Brand search from active evaluators. Improve /pricing so it explains what drives price even if it can’t list a number.'],
  ['ben employee benefits reviews', 'Ben reviews: what customers say', 'Reviews hub', 'Validate', 'Medium', 20, 9, 0, 'Only produce with real, attributable customer reviews. Check which third-party listings already exist.'],
  ['forma pricing', 'Forma pricing explained, and what to ask for in an enterprise quote', 'Pricing guide', 'Create', 'Medium', 210, 32, 3, 'Competitor pricing pages draw bottom-funnel traffic. Use sourced facts only and link to a quote checklist.'],
  ['benepass pricing', 'Benepass pricing explained, and how it compares at enterprise scale', 'Pricing guide', 'Create', 'Medium', 170, 29, 3, 'Same logic as Forma pricing. Sourced facts only, with a quote checklist.'],
  ['darwin benefits pricing', 'Darwin Benefits pricing: what to expect and what to ask', 'Pricing guide', 'Create', 'Low', 40, 18, 3, 'Small query. A short page, or a section inside the category pricing guide.'],
  ['reward gateway pricing', 'Reward Gateway pricing: what drives the cost', 'Pricing guide', 'Create', 'Medium', 140, 30, 3, 'Useful pairing with the Reward Gateway alternatives page. Keep claims sourced and dated.'],
  ['employee benefits administration software pricing', 'Employee benefits administration software pricing: models, fees and hidden costs', 'Pricing guide', 'Create', 'High', 170, 35, 3, 'Category-level pricing guide with the strongest volume. Explaining models and hidden costs builds Finance trust.'],
  ['global benefits platform pricing', 'Global benefits platform pricing: per-employee, per-entity and implementation fees', 'Pricing guide', 'Create', 'High', 60, 22, 3, 'Low competition and strong enterprise fit. Cover per-entity, per-country and implementation fees.'],
  ['employee benefits platform cost per employee', 'Employee benefits platform cost per employee: benchmarks and how to model yours', 'Calculator', 'Create', 'High', 110, 26, 3, 'Finance and Reward both search this. Pair it with a calculator that shows its assumptions.'],
  ['benefits management software ROI calculator', 'Benefits management software ROI calculator', 'Calculator', 'Create', 'High', 50, 21, 3, 'Low volume but it directly arms the Head of Reward’s business case. Build it as an open, editable model.'],
  ['flexible benefits platform pricing', 'Flexible benefits platform pricing: what to expect', 'Pricing guide', 'Create', 'Medium', 80, 24, 3, 'Supporting guide. Fold it into the main pricing guide if it duplicates.'],
  ['employee benefits software implementation costs', 'Employee benefits software implementation costs and timeline', 'Pricing guide', 'Create', 'Medium', 40, 19, 4, 'Procurement and HRIS reviewers ask this. Use a real implementation timeline as the evidence.'],
  ['benefits administration software reviews', 'Benefits administration software reviews: how to read them as an enterprise buyer', 'Reviews hub', 'Validate', 'Low', 140, 42, 1, 'Informational and dominated by review sites. Check whether a vendor can compete before creating.'],
];

const JTBD: Tuple[] = [
  ['automate benefits payroll reconciliation', 'How to automate benefits payroll reconciliation across countries', 'Workflow guide', 'Create', 'High', 50, 20, 2, 'Payroll’s core job. Build the reconciliation workflow page with a monthly cut-off timeline.'],
  ['manage employee benefits across multiple countries', 'How to manage employee benefits across multiple countries', 'Playbook', 'Create', 'High', 90, 31, 0, 'Broadest problem-aware query for the core ICP. Becomes the hub the other guides link into.'],
  ['consolidate employee benefits providers', 'Consolidating employee benefits providers: a migration-ready framework', 'Playbook', 'Create', 'Medium', 30, 17, 0, 'Maps to the vendor-sprawl trigger. Low difficulty and a natural lead-in to migration content.'],
  ['reduce employee benefits administration workload', 'How to reduce employee benefits administration workload', 'Playbook', 'Create', 'Medium', 40, 18, 1, 'Operators search this when ticket volume climbs. Use their wording in the H2s.'],
  ['track employee benefits spend globally', 'How to track employee benefits spend across entities and currencies', 'Playbook', 'Create', 'Medium', 30, 17, 3, 'Finance visibility query. Pair it with the reporting dashboard and a CFO one-pager.'],
  ['improve employee benefits utilisation', 'How to improve employee benefits utilisation, and prove it', 'Playbook', 'Create', 'Medium', 110, 33, 0, 'Rising interest in uptake. Show how utilisation is measured, not only why it matters.'],
  ['manage employee benefits eligibility rules', 'Managing employee benefits eligibility rules by entity, grade and country', 'Template', 'Create', 'High', 30, 15, 1, 'Small query but a high-fit use case. Ship a downloadable eligibility matrix template.'],
  ['migrate employee benefits platform', 'Migrating your employee benefits platform: plan, data and cutover', 'Playbook', 'Improve', 'Medium', 40, 19, 4, 'Reduces migration fear late in evaluation. Improve any existing implementation content first.'],
  ['launch employee benefits in new countries', 'Launching employee benefits in a new country: a checklist', 'Template', 'Create', 'Medium', 60, 24, 0, 'Trigger query for expansion. A checklist format fits the intent and is easy to share.'],
  ['build business case for benefits platform', 'How to build a business case for a benefits platform', 'Calculator', 'Create', 'High', 20, 14, 3, 'Almost no competition, and it hands the champion an asset to forward to Finance.'],
  ['manage benefits for mixed workforce', 'Managing benefits for a mixed workforce: desk-based, deskless and contract', 'Playbook', 'Create', 'Medium', 40, 22, 1, 'Differentiator query for deskless and contract workers. Back it with product screenshots.'],
  ['reduce errors in employee benefits payroll', 'Why benefits deductions go wrong in payroll, and how to reduce errors', 'Workflow guide', 'Create', 'High', 30, 18, 2, 'Root-cause content earns payroll trust. Use anonymised real examples.'],
  ['standardise global employee benefits policies', 'Standardising global employee benefits policies without flattening local needs', 'Playbook', 'Create', 'Medium', 40, 21, 0, 'Strategy content for the Head of Reward. Needs a policy template to be more than opinion.'],
];

const FEATURE: Tuple[] = [
  ['employee benefits enrolment software', 'Employee benefits enrolment software for multi-country teams', 'Product page', 'Improve', 'High', 260, 45, 1, 'Closest product keyword to the core module. Audit the existing page before creating anything.'],
  ['employee benefits payroll integration', 'Employee benefits payroll integration: file specs, validation and cut-off', 'Integration page', 'Create', 'High', 70, 26, 2, 'Technical proof for Payroll. Show file specs, validation rules and cut-off timing.'],
  ['employee benefits reporting dashboard', 'Employee benefits reporting dashboard: what Finance and HR each need', 'Product page', 'Improve', 'Medium', 90, 32, 3, 'Finance-facing proof point. Show a real export and what it contains.'],
  ['employee benefits eligibility management software', 'Employee benefits eligibility management software for multi-entity teams', 'Product page', 'Improve', 'Medium', 40, 22, 1, 'Pairs with the eligibility guide. Improve the existing module copy rather than add a new URL.'],
  ['employee benefits workflow automation', 'Employee benefits workflow automation: approvals, life events and exceptions', 'Product page', 'Create', 'Low', 50, 28, 1, 'Generic and low volume. Only worth it as a section on a product page.'],
  ['employee benefits Workday integration', 'Employee benefits Workday integration: data flows, SSO and setup', 'Integration page', 'Create', 'High', 50, 23, 4, 'Workday is the first HRIS to target. Document the data flow, setup and customer-side tasks.'],
  ['employee benefits SAP SuccessFactors integration', 'Employee benefits SAP SuccessFactors integration: how it connects', 'Integration page', 'Create', 'Medium', 40, 21, 4, 'Secondary HRIS. Reuse the Workday page structure.'],
  ['employee benefits ADP integration', 'Employee benefits ADP integration: payroll files and validation', 'Integration page', 'Create', 'Medium', 40, 24, 2, 'ADP is a commonly named payroll provider. Show validation rules and file formats.'],
  ['flexible spending allowance software', 'Flexible spending allowance software for global teams', 'Product page', 'Validate', 'Low', 110, 38, 1, 'Product fit is uncertain. Confirm Ben offers this before creating a page.'],
  ['employee benefits analytics software', 'Employee benefits analytics software: from utilisation to spend', 'Product page', 'Create', 'Medium', 70, 30, 3, 'Supports the reporting story. Show utilisation and spend views and what Finance can export.'],
  ['employee benefits SSO integration', 'Employee benefits SSO integration: SAML, OIDC and provisioning', 'Integration page', 'Create', 'Medium', 20, 14, 4, 'Security reviewers need this on one forwardable page. Link to the trust centre.'],
  ['employee benefits provider integration software', 'Employee benefits provider integration software: feeds, APIs and SFTP', 'Integration page', 'Create', 'Medium', 20, 15, 4, 'Technical buyers only. A short documentation page covering methods and limits.'],
  ['employee benefits administration audit trail', 'Employee benefits administration audit trail: what gets logged and who can see it', 'Product page', 'Create', 'Low', 10, 12, 4, 'Very small query. Add it as a section on the security or product page.'],
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const opportunity = (volume: number, kd: number, priority: Priority) =>
  Math.round(
    Math.min(1, Math.log10(volume + 1) / Math.log10(500)) * 40 +
      ((100 - kd) / 100) * 30 +
      { High: 30, Medium: 18, Low: 6 }[priority],
  );

let counter = 0;
const build = (group: GroupKey, rows: Tuple[]): Kw[] =>
  rows.map(
    ([keyword, title, format, action, priority, volume, kd, buyer, why], n) => ({
      id: `${GROUPS[group].code}-${String(n + 1).padStart(2, '0')}`,
      order: counter++,
      group,
      keyword,
      title,
      format,
      action,
      priority,
      volume,
      kd,
      buyer,
      why,
      score: opportunity(volume, kd, priority),
    }),
  );

const KEYWORDS: Kw[] = [
  ...build('best', BEST),
  ...build('alt', ALT),
  ...build('vs', VS),
  ...build('price', PRICE),
  ...build('jtbd', JTBD),
  ...build('feature', FEATURE),
];

const diffBand = (kd: number): DiffBand =>
  kd <= 30 ? 'easy' : kd <= 50 ? 'moderate' : 'hard';
const diffLabel: Record<DiffBand, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard',
};
const isQuickWin = (k: Kw) => k.kd <= 35 && k.priority !== 'Low';
const fmt = (n: number) => n.toLocaleString('en-GB');
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
const scoreLabel = (s: number) => (s >= 70 ? 'Strong' : s >= 50 ? 'Solid' : 'Later');
const urlFor = (k: Kw) => `/${GROUPS[k.group].path}/${slug(k.keyword)}`;

const SORTERS: Record<SortKey, (a: Kw, b: Kw) => number> = {
  recommended: (a, b) =>
    PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || b.score - a.score,
  volume: (a, b) => b.volume - a.volume,
  difficulty: (a, b) => a.kd - b.kd,
  score: (a, b) => b.score - a.score,
  original: (a, b) => a.order - b.order,
};

const csvCell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <button type="button" className="kp-copy" onClick={copy}>
      {done ? 'Copied' : label}
    </button>
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
    <label className="kp-field">
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

export default function KeywordPriorities() {
  const [group, setGroup] = useState<GroupKey | 'all'>('all');
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState<'all' | Priority>('all');
  const [action, setAction] = useState<'all' | Action>('all');
  const [diff, setDiff] = useState<'all' | DiffBand>('all');
  const [buyer, setBuyer] = useState('all');
  const [sort, setSort] = useState<SortKey>('recommended');
  const [quick, setQuick] = useState(false);
  const [onlyShort, setOnlyShort] = useState(false);
  const [selectedId, setSelectedId] = useState(KEYWORDS[0].id);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const briefRef = useRef<HTMLElement>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return KEYWORDS.filter((k) => {
      if (group !== 'all' && k.group !== group) return false;
      if (priority !== 'all' && k.priority !== priority) return false;
      if (action !== 'all' && k.action !== action) return false;
      if (buyer !== 'all' && k.buyer !== Number(buyer)) return false;
      if (diff !== 'all' && diffBand(k.kd) !== diff) return false;
      if (quick && !isQuickWin(k)) return false;
      if (onlyShort && !shortlist.includes(k.id)) return false;
      if (
        q &&
        !`${k.id} ${k.keyword} ${k.title} ${k.format}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    }).sort(SORTERS[sort]);
  }, [group, query, priority, action, buyer, diff, quick, onlyShort, shortlist, sort]);

  const selectedIndex = Math.max(
    0,
    rows.findIndex((r) => r.id === selectedId),
  );
  const selected: Kw | undefined = rows[selectedIndex];

  

  const groupStats = GROUP_ORDER.map((g) => {
    const all = KEYWORDS.filter((k) => k.group === g);
    return {
      g,
      total: all.length,
      high: all.filter((k) => k.priority === 'High').length,
    };
  });

  const filtersActive =
    query !== '' ||
    priority !== 'all' ||
    action !== 'all' ||
    diff !== 'all' ||
    buyer !== 'all' ||
    quick ||
    onlyShort;

  const reset = () => {
    setQuery('');
    setPriority('all');
    setAction('all');
    setDiff('all');
    setBuyer('all');
    setQuick(false);
    setOnlyShort(false);
  };

  const pick = (id: string) => {
    setSelectedId(id);
    if (typeof window !== 'undefined' && window.innerWidth <= 1180) {
      briefRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleShort = (id: string) =>
    setShortlist((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const onListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const next = rows[selectedIndex + (e.key === 'ArrowDown' ? 1 : -1)];
    if (!next) return;
    setSelectedId(next.id);
    requestAnimationFrame(() =>
      listRef.current
        ?.querySelector<HTMLButtonElement>(
          `[data-row-id="${next.id}"] .kp-kw-btn`,
        )
        ?.focus(),
    );
  };

  const exportCsv = () => {
    const head = [
      'ID',
      'Group',
      'Search theme',
      'Working title',
      'Page format',
      'Action',
      'Priority',
      'Est. monthly volume',
      'Est. difficulty',
      'Opportunity score',
      'Primary buyer',
      'Suggested URL',
      'Why it matters',
    ];
    const lines = rows.map((k) =>
      [
        k.id,
        GROUPS[k.group].label,
        k.keyword,
        k.title,
        k.format,
        k.action,
        k.priority,
        k.volume,
        k.kd,
        k.score,
        BUYERS[k.buyer],
        k.action === 'Create' ? urlFor(k) : '',
        k.why,
      ]
        .map(csvCell)
        .join(','),
    );
    const blob = new Blob([[head.map(csvCell).join(','), ...lines].join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyword-priorities.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const guide = selected ? FORMAT_GUIDE[selected.format] : null;

  return (
    <section className="tb-page-section tb-pad" id="keywords">
      <div className="tb-container">
        <header className="tb-section-intro">
          <div className="tb-eyebrow">
            <span>03</span>KEYWORD &amp; PAGE PRIORITIES
          </div>
          <h2>A commercial search shortlist with a reason behind every action.</h2>
          <p>
            {KEYWORDS.length} search themes, grouped by how buyers search and
            mapped to a buyer, page format, working title and next action.
            Volume and difficulty are illustrative planning estimates, not
            numbers from a keyword tool, and priority is a strategic judgement.
            Validate demand, intent and the current site before production.
          </p>
        </header>

        <div className="kp-tabs" role="tablist" aria-label="Keyword groups">
          <button
            role="tab"
            aria-selected={group === 'all'}
            className={group === 'all' ? 'active' : ''}
            onClick={() => setGroup('all')}
          >
            <span>00</span>
            <strong>All keywords</strong>
            <small>
              {KEYWORDS.length} themes ·{' '}
              {KEYWORDS.filter((k) => k.priority === 'High').length} high
            </small>
          </button>
          {groupStats.map(({ g, total, high }, n) => (
            <button
              key={g}
              role="tab"
              aria-selected={group === g}
              className={group === g ? 'active' : ''}
              onClick={() => setGroup(g)}
            >
              <span>0{n + 1}</span>
              <strong>{GROUPS[g].label}</strong>
              <small>
                {total} themes · {high} high
              </small>
            </button>
          ))}
        </div>

 

        <div className="kp-toolbar">
          <label className="kp-search">
            <span className="kp-sr">Search keywords</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search keywords, titles or IDs…"
            />
          </label>
          <Field
            label="Priority"
            value={priority}
            onChange={(v) => setPriority(v as 'all' | Priority)}
            options={[
              ['all', 'All priorities'],
              ['High', 'High'],
              ['Medium', 'Medium'],
              ['Low', 'Low'],
            ]}
          />
          <Field
            label="Action"
            value={action}
            onChange={(v) => setAction(v as 'all' | Action)}
            options={[
              ['all', 'All actions'],
              ['Create', 'Create'],
              ['Improve', 'Improve'],
              ['Validate', 'Validate'],
            ]}
          />
          <Field
            label="Difficulty"
            value={diff}
            onChange={(v) => setDiff(v as 'all' | DiffBand)}
            options={[
              ['all', 'Any difficulty'],
              ['easy', 'Easy (0–30)'],
              ['moderate', 'Moderate (31–50)'],
              ['hard', 'Hard (51+)'],
            ]}
          />
          <Field
            label="Buyer"
            value={buyer}
            onChange={setBuyer}
            options={[
              ['all', 'All buyers'],
              ...BUYERS.map((b, n): [string, string] => [String(n), b]),
            ]}
          />
          <Field
            label="Sort by"
            value={sort}
            onChange={(v) => setSort(v as SortKey)}
            options={[
              ['recommended', 'Recommended'],
              ['score', 'Opportunity score'],
              ['volume', 'Volume (high to low)'],
              ['difficulty', 'Difficulty (low to high)'],
              ['original', 'Original order'],
            ]}
          />
        </div>

        <div className="kp-toolbar-row">
          <div className="kp-toggles">
            <button
              type="button"
              className={`kp-toggle${quick ? ' on' : ''}`}
              aria-pressed={quick}
              onClick={() => setQuick((v) => !v)}
              title="Difficulty 35 or lower, and not Low priority"
            >
              Quick wins
            </button>
            <button
              type="button"
              className={`kp-toggle${onlyShort ? ' on' : ''}`}
              aria-pressed={onlyShort}
              onClick={() => setOnlyShort((v) => !v)}
            >
              ★ Shortlisted ({shortlist.length})
            </button>
            {filtersActive && (
              <button type="button" className="kp-reset" onClick={reset}>
                Reset filters
              </button>
            )}
          </div>
          <button
            type="button"
            className="kp-export"
            onClick={exportCsv}
            disabled={!rows.length}
          >
            Export CSV ({rows.length})
          </button>
        </div>

        <div className="kp-workspace">
          <div className="kp-list-card">
            <div className="kp-head" role="row">
              <span />
              <span>Search theme / asset</span>
              <span>Action</span>
              <button
                type="button"
                className={sort === 'recommended' ? 'on' : ''}
                onClick={() => setSort('recommended')}
              >
                Priority
              </button>
              <button
                type="button"
                className={sort === 'volume' ? 'on' : ''}
                onClick={() => setSort('volume')}
              >
                Vol. est.
              </button>
              <button
                type="button"
                className={sort === 'difficulty' ? 'on' : ''}
                onClick={() => setSort('difficulty')}
              >
                Difficulty
              </button>
              <button
                type="button"
                className={sort === 'score' ? 'on' : ''}
                onClick={() => setSort('score')}
              >
                Score
              </button>
            </div>

            <div
              className="kp-rows"
              ref={listRef}
              onKeyDown={onListKey}
              role="list"
            >
              {rows.length === 0 && (
                <div className="kp-empty">
                  <strong>No keywords match these filters.</strong>
                  <p>Loosen a filter or reset to see the full register.</p>
                  <button type="button" className="kp-reset" onClick={reset}>
                    Reset filters
                  </button>
                </div>
              )}
              {rows.map((k) => {
                const on = selected?.id === k.id;
                const starred = shortlist.includes(k.id);
                const band = diffBand(k.kd);
                return (
                  <div
                    key={k.id}
                    role="listitem"
                    data-row-id={k.id}
                    className={`kp-row${on ? ' is-active' : ''}`}
                    onClick={() => pick(k.id)}
                  >
                    <button
                      type="button"
                      className={`kp-star${starred ? ' on' : ''}`}
                      aria-pressed={starred}
                      aria-label={`${starred ? 'Remove' : 'Add'} ${k.keyword} ${starred ? 'from' : 'to'} shortlist`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleShort(k.id);
                      }}
                    >
                      {starred ? '★' : '☆'}
                    </button>
                    <div className="kp-cell-main">
                      <div className="kp-meta">
                        {k.id} · {GROUPS[k.group].label} · {k.format}
                      </div>
                      <button
                        type="button"
                        className="kp-kw-btn"
                        aria-current={on}
                        onClick={(e) => {
                          e.stopPropagation();
                          pick(k.id);
                        }}
                      >
                        {k.title}
                      </button>
                      <code className="kp-kw">{k.keyword}</code>
                      <div className="kp-mobile-meta">
                        <span className={`kp-chip kp-chip--${k.action.toLowerCase()}`}>
                          {k.action}
                        </span>
                        <span>{fmt(k.volume)}/mo</span>
                        <span>KD {k.kd}</span>
                      </div>
                    </div>
                    <span className={`kp-chip kp-chip--${k.action.toLowerCase()}`}>
                      {k.action}
                    </span>
                    <span className={`kp-pri kp-pri--${k.priority.toLowerCase()}`}>
                      {k.priority}
                    </span>
                    <span className="kp-num">{fmt(k.volume)}</span>
                    <div className="kp-kd">
                      <span className={`kp-kd-bar kp-kd--${band}`}>
                        <i style={{ width: `${k.kd}%` }} />
                      </span>
                      <b>{k.kd}</b>
                    </div>
                    <span className="kp-score">{k.score}</span>
                  </div>
                );
              })}
            </div>
            <div className="kp-list-foot">
              Use ↑ ↓ to move between rows. Star a row to build a production
              shortlist.
            </div>
          </div>

          <aside className="kp-brief" ref={briefRef} aria-live="polite">
            {!selected || !guide ? (
              <div className="kp-empty">
                <strong>Select a keyword</strong>
                <p>The recommendation brief appears here.</p>
              </div>
            ) : (
              <>
                <div className="kp-brief-top">
                  <span className="tb-overline">
                    RECOMMENDATION BRIEF · {selected.id}
                  </span>
                  <span
                    className={`kp-pri kp-pri--${selected.priority.toLowerCase()}`}
                  >
                    {selected.priority} priority
                  </span>
                </div>
                <h3>{selected.keyword}</h3>
                <p className="kp-brief-sub">
                  {BUYERS[selected.buyer]} · {GROUPS[selected.group].intent} ·{' '}
                  {selected.format}
                </p>

                <div className="kp-metrics">
                  <div>
                    <small>EST. VOLUME</small>
                    <strong>{fmt(selected.volume)}</strong>
                    <span>searches / month</span>
                  </div>
                  <div>
                    <small>DIFFICULTY</small>
                    <strong>{selected.kd}</strong>
                    <span>{diffLabel[diffBand(selected.kd)]}</span>
                  </div>
                  <div>
                    <small>OPPORTUNITY</small>
                    <strong>{selected.score}</strong>
                    <span>{scoreLabel(selected.score)}</span>
                  </div>
                </div>

                <div className="kp-title-card">
                  <small>WORKING TITLE</small>
                  <p>{selected.title}</p>
                  <div className="kp-title-actions">
                    <CopyButton text={selected.title} label="Copy title" />
                    <CopyButton text={selected.keyword} label="Copy keyword" />
                  </div>
                  <div className="kp-url">
                    {selected.action === 'Create' ? (
                      <>
                        <span>Suggested URL</span>
                        <code>{urlFor(selected)}</code>
                      </>
                    ) : selected.action === 'Improve' ? (
                      <>
                        <span>Next step</span>
                        <em>Audit the existing page first. Don’t create a new URL.</em>
                      </>
                    ) : (
                      <>
                        <span>Next step</span>
                        <em>Validate demand and product fit before choosing a URL.</em>
                      </>
                    )}
                  </div>
                </div>

                <h4>Why this matters</h4>
                <p className="kp-why">{selected.why}</p>

                <h4>What the page should cover</h4>
                <ol className="kp-cover">
                  {guide.cover.map((c, n) => (
                    <li key={c}>
                      <span>0{n + 1}</span>
                      {c}
                    </li>
                  ))}
                </ol>

                <div className="kp-evidence">
                  <small>EVIDENCE REQUIRED</small>
                  <p>{guide.evidence}</p>
                </div>

                <div className="kp-signal">
                  <small>COMMERCIAL SIGNAL</small>
                  <p>{guide.signal}</p>
                </div>

                <div className="kp-brief-actions">
                  <button
                    type="button"
                    className={`kp-shortlist${shortlist.includes(selected.id) ? ' on' : ''}`}
                    onClick={() => toggleShort(selected.id)}
                  >
                    {shortlist.includes(selected.id)
                      ? '★ Shortlisted'
                      : '☆ Add to shortlist'}
                  </button>
                  <div className="kp-pager">
                    <button
                      type="button"
                      disabled={selectedIndex === 0}
                      onClick={() => setSelectedId(rows[selectedIndex - 1].id)}
                      aria-label="Previous keyword"
                    >
                      ←
                    </button>
                    <span>
                      {selectedIndex + 1} / {rows.length}
                    </span>
                    <button
                      type="button"
                      disabled={selectedIndex === rows.length - 1}
                      onClick={() => setSelectedId(rows[selectedIndex + 1].id)}
                      aria-label="Next keyword"
                    >
                      →
                    </button>
                  </div>
                </div>

                <p className="kp-foot">
                  Priority is a provisional strategic judgement. Volume and
                  difficulty are illustrative, not validated. “Improve” means
                  investigate the existing relevant page before creating a new
                  URL. Opportunity score blends demand, ease and priority.
                </p>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}