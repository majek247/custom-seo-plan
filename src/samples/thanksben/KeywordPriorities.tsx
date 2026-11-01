import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
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

const WHY_BY_ID: Record<string, string> = {
  'BO-01': 'This search typically sits at the start of an enterprise vendor shortlist, when reward leaders are deciding which providers deserve further evaluation. Country coverage alone will not settle that decision: local benefits availability, payroll dependencies and central control all matter. Ben can compete for consideration before procurement requirements harden, provided its geographic limitations are explicit.',
  'BO-02': 'Benefits operations teams searching this phrase are often replacing spreadsheets, disconnected providers or a platform that still creates manual work. Their evaluation will turn on employee lifecycle automation, eligibility accuracy and reconciliation rather than benefit catalogue size. For Ben, this is a high-reach opportunity to connect product capabilities to administrative hours and avoidable errors.',
  'BO-03': 'A multinational buyer has a different problem from a company merely employing remote workers: policies, entities, payroll systems and local obligations multiply with every country. This keyword reaches reward leaders deciding whether one platform can provide central oversight without forcing identical programmes everywhere. Ben needs to substantiate both regional flexibility and operational control.',
  'BO-04': 'Large-company buyers are evaluating whether software will survive their organisational complexity, not simply whether employees like the interface. Delegated administration, auditability, multiple entities and migration risk become decisive. This page can bring Ben into enterprise shortlists by addressing those failure points, while remaining distinct from the broader administration-software comparison.',
  'BO-05': 'The search points to a workforce experience problem: employees spread across locations may receive nominally equal benefits but unequal access or value. Reward leaders need to understand local redemption, relevance and regional budgets before choosing a platform. Ben has a reason to appear if it can show employee-level access across actual supported markets.',
  'BO-06': 'HR teams may search broadly, but their underlying purchase trigger is often rising service requests, onboarding delays and benefits administration work. The opportunity is attractive only when searchers manage sufficiently complex organisations for Ben. A credible page should connect reduced HR workload and employee self-service to specific workflows, not generic wellbeing promises.',
  'BO-07': 'This is a narrower but more decision-ready query from reward and finance stakeholders who cannot defend benefits expenditure using enrolment figures alone. They need utilisation, budget and segment-level evidence that informs renewal decisions. Ben could earn consideration by showing the actual decisions its reporting supports, while avoiding unsupported claims about retention or ROI.',
  'BO-08': 'Enterprise buyers use “flexible benefits” to test how much employee choice their policies can safely permit. They will scrutinise budget limits, eligibility, taxable categories and regional variation after the initial promise of flexibility. This keyword is commercially useful if Ben can demonstrate real configuration depth and clearly identify restrictions on eligible spending.',
  'BO-09': 'Search demand may look appealing, but recognition software is not interchangeable with benefits administration. Buyers may expect peer-to-peer praise, social feeds and performance awards rather than configurable benefits budgets. This term should be validated against Ben’s actual product fit and live sales conversations before investing in a page that attracts the wrong shortlist.',
  'BO-10': 'Payroll is frequently a veto holder rather than the original benefits-platform buyer. This low-difficulty query can reach teams already checking whether a preferred provider will create deduction errors or month-end manual work. Ben can support purchase approval by demonstrating supported connections, exception handling and the boundary between native integration and file-based processes.',
  'BO-11': 'Distributed teams often discover that a centrally purchased benefits package cannot be used consistently by employees outside major offices or markets. Searchers need to reconcile worker type, location and employee access before choosing software. Ben can differentiate through verifiable mobile and regional experiences, but should not imply global access where redemption is restricted.',
  'BO-12': 'This overlaps heavily with the multinational software shortlist, but the word “administration” may signal a more operational evaluation involving multiple providers, entities and payroll cycles. Before creating a second page, compare search results and sales-language differences with BO-03. If intent is indistinguishable, consolidate rather than split authority between near-duplicates.',
  'BO-13': 'UK enterprise buyers have immediate country-specific requirements that a generic global platform roundup will not resolve. Salary sacrifice, payroll treatment, information security and multi-entity controls shape the shortlist. A UK-focused page gives Ben a clearer route into locally relevant procurement conversations, provided regulatory explanations and product support are checked carefully.',
  'ALT-01': 'Someone searching for Forma alternatives is likely dissatisfied with an existing shortlist, pricing proposal or implementation fit. The valuable question is what they need beyond lifestyle allowances, especially country configuration, oversight and payroll workflows. Ben can become a credible alternative by explaining actual trade-offs and migration implications rather than assuming Forma fails every enterprise requirement.',
  'ALT-02': 'Benepass alternatives signal a buyer reconsidering how allowances and international employee spending are managed. This is closer to a vendor-switch decision than general benefits education, making concrete differences in supported markets, policies and finance controls especially valuable. Ben should address what would change operationally and where a replacement would not solve the problem.',
  'ALT-03': 'Cobee alternative searches may come from teams moving beyond a particular market or reassessing their benefits setup. The opportunity depends on what the current Cobee offering supports, not an assumed geographic gap. Ben should compete only on verified differences in country coverage, benefit administration and employee experience, with an honest account of switching effort.',
  'ALT-04': 'Perks at Work alternatives may involve employers looking beyond discounts and employee perks toward wider programme administration. The key is to distinguish the buyer who wants a better offers marketplace from one needing eligibility, budgets and reporting. Ben should target the latter, while explicitly acknowledging where a perks-focused provider may remain the better choice.',
  'ALT-05': 'Reward Gateway alternatives attract buyers whose needs may extend beyond recognition and engagement into benefits administration, or who simply want a different recognition platform. That split matters. Ben can win qualified attention by clarifying which requirements it addresses and which specialist recognition capabilities still call for another vendor, avoiding misleading comparisons.',
  'ALT-06': 'Darwin Benefits alternatives can capture late-stage enterprise evaluations where configuration, implementation model or ownership are under scrutiny. Although volume is modest, these buyers may already have detailed requirements. Ben needs a restrained comparison of operating models, product scope and switching dependencies rather than a generic list of competing benefits vendors.',
  'ALT-07': 'Alight alternatives may reflect frustration with the cost, service model or visibility of outsourced administration. These buyers are not merely choosing another dashboard; they may be deciding which responsibilities to bring back in-house. Ben can enter that discussion by specifying where software restores control and which outsourced services a platform cannot replace.',
  'ALT-08': 'Rippling benefits alternatives challenge a fundamental purchasing assumption: why buy dedicated benefits software if an existing HR platform includes it? International rules, provider choice and administration depth are potential reasons, but they must be evidenced. Ben can support a specialist-platform business case while recognising where an integrated HRIS module is sufficient.',
  'ALT-09': 'Heka alternative traffic is small and may not represent a meaningful enterprise buying pool. The relevant distinction is whether searchers want wellbeing-specific experiences or a broader benefits administration platform. Before production, verify the query, Ben’s overlap and whether sales hears this competitor in real evaluations; otherwise the page risks low-quality traffic.',
  'ALT-10': 'Happl alternatives could indicate an employee engagement or benefits search, but the precise buyer expectation needs confirmation. The commercial value depends on whether companies are changing a recognition experience or seeking broader programme control. Ben should not be inserted into the shortlist until product overlap, market demand and the reasons for switching are validated.',
  'ALT-11': 'BenefitHub alternatives may attract US-centric perks and discount buyers whose requirements differ from Ben’s enterprise target. That makes geographic intent and solution category more important than headline volume. A page is justified only if there is a meaningful segment evaluating central benefits management across relevant markets, with clear reasons to consider Ben.',
  'ALT-12': 'Benefitfocus alternatives may bring American benefits administration searches tied to local insurance and enrolment requirements. Those needs do not automatically match Ben’s geographic or product scope. This is a qualification exercise before a content opportunity: establish search-market relevance, comparable functionality and whether Ben could credibly make the shortlist.',
  'ALT-13': 'A broker-alternatives search signals a broader operating-model decision, often triggered by renewal, rising fees or limited visibility. Buyers need to separate advice, insurer relationships and compliance support from administration technology. Ben can frame which functions software can centralise, which still need brokers and what a phased transition would actually involve.',
  'VS-01': 'A Ben versus Forma search indicates that Ben has already entered the buyer’s consideration set. The page therefore needs to resolve specific final-stage questions about allowances, countries, controls, reporting and implementation rather than repeat positioning copy. An even-handed comparison can help the internal champion explain which platform fits their programme and why.',
  'VS-02': 'This query comes from evaluators already deciding between Ben and Benepass, so the commercial value is high despite modest volume. They need a precise answer on geographic access, programme configuration, employee spending and administrative oversight. Clear product limitations and sourced evidence will be more persuasive than broad claims of superiority.',
  'VS-03': 'Ben versus Cobee is likely a close-range decision shaped by operating markets and desired benefits model. Buyers should be able to determine whether local market depth or broader programme administration matters more. A factual comparison can save sales time by clarifying fit early, including cases where Cobee is the stronger option.',
  'VS-04': 'The important distinction is not merely two vendor names: one buyer may prioritise recognition and engagement, another benefits configuration and administration. This page can qualify leads as much as convert them. Ben should make the boundary between overlapping capabilities and specialist functionality unmistakable for procurement and reward stakeholders.',
  'VS-05': 'Low volume does not make this irrelevant if Darwin appears in enterprise sales deals. A Ben-versus-Darwin comparison can resolve questions about administrative depth, implementation support, international operating models and contractual complexity. Prioritise evidence from real competitive evaluations, not artificial differentiation created solely to fill a comparison template.',
  'VS-06': 'This comparison represents a consequential choice between technology-led control and broader outsourced benefits services. Buyers need to understand service responsibilities, internal resourcing, implementation risk and ongoing administration. Ben should be positioned as the right answer only where its software-led approach matches what the organisation wants to own.',
  'VS-07': 'The prospect may already pay for Rippling and need justification for adding another benefits system. That makes this a direct objection-handling asset for sales. The page should address incremental value, data flow, duplicated administration and where a dedicated benefits platform is necessary versus unnecessary.',
  'VS-08': 'Ben versus Heka has extremely limited estimated demand, so production should follow evidence from live sales opportunities rather than volume. If buyers do ask, the useful comparison is likely between focused wellbeing experiences and wider benefits operations. The page must make those differences explicit without treating unlike features as equivalents.',
  'VS-09': 'This low-volume branded search is only valuable if Happl is actually encountered in Ben’s purchasing conversations. The page would need to distinguish recognition, engagement and benefits-management requirements before describing product fit. Without proof of search demand or deal relevance, keeping it off the initial production roadmap is sensible.',
  'VS-10': 'Searchers comparing Forma and Benepass may be building a shortlist without knowing Ben. The opportunity is to enter the decision as a defensible third option, not hijack a head-to-head query. That requires fair, sourced analysis and a clearly described use case where Ben offers something materially different.',
  'VS-11': 'This query catches buyers before they have decided what operating model they need. They are weighing outsourced market expertise and provider relationships against platform control, transparency and automation. Ben can influence requirements early by defining what software replaces, what remains external and where a hybrid arrangement makes sense.',
  'VS-12': 'This search is the clearest expression of an objection sales will hear: “our HRIS already does benefits.” Buyers need a decision boundary based on programme complexity, coverage, eligibility and integrations. Ben can justify a specialist purchase when those requirements exceed the HRIS module, while saying when they do not.',
  'VS-13': 'Buyers exploring flexible versus traditional benefits are deciding programme design before selecting vendors. The search can establish whether employee choice, cost control and regional policy variation justify a different approach. Ben should educate on practical trade-offs first, then connect relevant models to actual platform configuration rather than force a product pitch.',
  'PR-01': 'A branded pricing search usually means someone is budgeting or preparing to request approval, not discovering the category. The existing pricing experience should answer what affects a quote, which services are included and what implementation changes the total cost. Transparency here can prevent avoidable sales friction even without publishing fixed prices.',
  'PR-02': 'Searchers looking for Ben reviews want independent reassurance before they trust vendor claims. The opportunity is to surface attributable feedback about service, rollout and day-to-day use, including limitations. Do not manufacture a review hub from marketing testimonials; validate that credible third-party evidence exists and reflects relevant enterprise customers.',
  'PR-03': 'Forma pricing searches point to a buyer checking affordability or pressure-testing a quote. If credible public price information is limited, the useful asset is a transparent breakdown of cost drivers and questions to request in proposals. Ben can participate in the buying decision without inventing competitor rates or implying directly comparable packages.',
  'PR-04': 'A Benepass pricing search suggests a budget conversation is underway, possibly before a formal vendor evaluation. Buyers need clarity on pricing units, allowances, implementation and ongoing costs across their workforce. This is an opportunity for Ben to explain total-cost differences fairly, using only verified prices and clearly labelled assumptions.',
  'PR-05': 'Darwin Benefits pricing may reflect a late-stage procurement check, but the small market means a separate page has a higher content cost. The useful distinction is the full ownership model, not a guessed subscription figure. If it overlaps the general pricing guide, one authoritative section may serve buyers better.',
  'PR-06': 'Reward Gateway pricing interest may involve a recognition-heavy package with a different commercial structure from benefits administration. Buyers need to separate base subscriptions, modules, rollout and service commitments before comparing vendors. Ben should address the commercial model rather than suggest its offer is cheaper without like-for-like evidence.',
  'PR-07': 'This category query reaches buyers building a budget before requesting enterprise quotes. The main uncertainty is how per-employee fees, implementation, integrations, entities and services combine into a realistic total. A neutral pricing model can build Finance confidence and provide context for Ben without promising unsupported market averages.',
  'PR-08': 'Global benefits costs become difficult to compare when vendors price employees, countries, legal entities and local provision differently. This keyword is valuable because it reaches budget owners confronting those differences. The page should help them model scenario-specific expenditure and discover which assumptions need confirmation in each vendor proposal.',
  'PR-09': 'A cost-per-employee query signals an active attempt to create a defensible financial benchmark. Simple subscription comparisons hide activation, regional differences and administrative labour. An editable model with sourced assumptions can help Finance compare scenarios, and can give Ben a useful conversation starter without claiming guaranteed savings.',
  'PR-10': 'This buyer is already being asked to prove the investment case. A transparent ROI model should distinguish measurable administration savings from uncertain effects on engagement or retention, while exposing assumptions and payback sensitivity. It is a high-value sales enablement asset because the output can be reviewed and challenged by Finance.',
  'PR-11': 'Flexible benefits pricing can mean both software fees and the employer-funded allowance itself, a distinction many comparisons blur. Buyers need to understand the platform cost, spending policies and how participation changes actual expenditure. This page is useful if it adds clarity beyond the broader category pricing guide; otherwise consolidate.',
  'PR-12': 'Implementation cost searches indicate procurement anxiety about the work and spending beyond the licence. HRIS mappings, payroll testing, data cleansing, training and phased rollout may drive budget and timeline risk. Ben can reduce uncertainty with a realistic project breakdown and responsibilities rather than a generic “quick implementation” claim.',
  'PR-13': 'Generic software review queries are often dominated by independent directories, and a brand-owned roundup may lack credibility. Before allocating resources, establish whether enterprise buyers use the search and whether useful original evidence is available. If not, directing effort to genuine customer proof and third-party profiles is more defensible.',
  'JB-01': 'Payroll and benefits teams searching for reconciliation automation already recognise a costly operational failure. Their immediate need is a repeatable monthly process that catches mismatches before employees are paid. Ben can show how its supported integrations and checks fit that workflow, making this a stronger technical sales asset than another general platform list.',
  'JB-02': 'This is a foundational problem-led search for reward leaders managing multiple providers and policies as they expand. The buyer may not yet be shortlisting software, so the commercial role is to shape requirements around governance, local delivery and reporting. It can become a hub that moves qualified readers toward relevant vendor evaluations.',
  'JB-03': 'Provider consolidation becomes urgent when contracts, invoices and employee data are fragmented across markets. Buyers need to understand which services can actually be consolidated and which local relationships remain necessary. Ben can enter through an operational migration discussion, with a realistic account of dependencies, disruption risk and potential administrative savings.',
  'JB-04': 'This search usually starts with an overextended HR or benefits team rather than a formal software procurement. The valuable content identifies where time disappears, which tasks can be automated and which require process changes. Ben can connect those pain points to demonstrated workflows while giving managers a credible basis for prioritising improvements.',
  'JB-05': 'Global benefits spend is hard to defend when different entities report in different currencies, periods and categories. Finance is looking for reconciliation and decision-ready visibility, not simply attractive dashboards. Ben can support the conversation with examples of consolidated reporting, data limitations and how spending insights inform reallocations.',
  'JB-06': 'Low benefit uptake is frequently blamed on communication, but causes also include poor local relevance, employee access and difficult enrolment. This search invites a diagnostic approach before software selection. Ben can be considered where experience and reporting capabilities address measurable barriers, without presenting higher utilisation as an automatic guarantee.',
  'JB-07': 'Eligibility rules are a quiet source of payroll errors, inconsistent treatment and employee complaints across large organisations. Buyers searching this term want a usable way to document exceptions by country, entity and grade. A rigorous matrix template can build trust and lead naturally to how Ben configures and maintains comparable rules.',
  'JB-08': 'Migration searches appear when buyers like a new provider but fear disruption to payroll, employee access and historical records. This is a late-stage objection that can stall an otherwise qualified opportunity. Ben can reduce uncertainty by laying out data ownership, parallel testing, cutover timing and responsibilities rather than promising a frictionless switch.',
  'JB-09': 'Opening a new country forces reward leaders to decide what employees need before vendors and policies are ready. The search captures an identifiable expansion trigger with purchasing potential. A country-launch checklist can clarify local obligations, provider dependencies, budgets and launch sequencing, then show where Ben could support the process.',
  'JB-10': 'An internal champion searching for a business case needs material that Finance and procurement can scrutinise. The page should separate hard cost savings, implementation spend and less certain employee outcomes, with editable assumptions. Ben gains a reusable sales asset that helps move a proposal from enthusiasm to approval.',
  'JB-11': 'Deskless, office-based and contract populations can have different access, eligibility and communication needs under one employer. Searchers are struggling with programme design rather than vendor features alone. Ben can be relevant if it can prove how supported worker groups enrol, use benefits and are administered without creating parallel systems.',
  'JB-12': 'Deduction errors have immediate consequences for employee trust and payroll confidence. Buyers need root causes across eligibility data, changes, file handoffs and cutoffs before considering solutions. A worked reconciliation example can establish technical credibility and reveal where Ben reduces risk, including exceptions that still need human review.',
  'JB-13': 'Global policy standardisation is a governance problem: leaders want consistency without ignoring tax rules, local norms or employee needs. The search can attract senior reward owners before they choose technology. Ben has a relevant role if it can demonstrate how common policy principles translate into controlled regional configurations.',
  'FT-01': 'Enrolment software searches indicate a specific capability requirement and potentially an imminent vendor decision. Buyers will check eligibility logic, employee journeys, life-event changes and HRIS data flows. An improved product page can convert this intent by documenting actual enrolment steps and limitations, rather than adding another overlapping landing page.',
  'FT-02': 'This is technical evaluation intent from payroll or integrations stakeholders who may be able to block a purchase. They need supported methods, field mappings, timing and error handling, not benefits marketing. Ben can make the sales process easier by publishing verified specifications and documenting where custom work or manual files remain necessary.',
  'FT-03': 'Reporting-dashboard searches come from buyers who need to see the output before trusting analytics claims. Finance may prioritise expenditure and reconciliation, while HR needs participation and adoption. The existing page can become a proof asset with real views, export examples and explicit data limits instead of unsupported outcome promises.',
  'FT-04': 'Multi-entity buyers need rules that change with location, grade or employment status without constant manual intervention. This keyword is specific enough to justify product evidence, but may be served by improving an existing capability page. Demonstrating rule configuration, exceptions and audit history will matter more than a broad feature list.',
  'FT-05': 'Workflow automation is broad and can attract buyers outside Ben’s ideal fit. The useful demand is narrower: approvals, lifecycle changes and exception handling in complex benefits programmes. Before creating a standalone page, determine whether search intent differs from enrolment and administration content; otherwise strengthen those existing pages.',
  'FT-06': 'Workday integration searches are often final-stage diligence from HRIS owners, with a direct ability to stop implementation. Buyers need to know precisely which objects synchronise, who configures access, and how failures are resolved. This page should exist only with verified technical documentation, but it could be highly valuable in enterprise deals.',
  'FT-07': 'SuccessFactors users have similar diligence needs to Workday buyers, but implementation details cannot be copied across platforms. The commercial opportunity is to reduce uncertainty around supported data, authentication, setup responsibilities and ongoing changes. A narrowly scoped, technically reviewed page can answer questions that otherwise require repeated sales-engineering calls.',
  'FT-08': 'ADP-related searches may involve payroll rather than HRIS integration, with deduction timing and file validation particularly important. Buyers need clarity on supported ADP products and regional variants, not a generic integration badge. Documented inputs, outputs and reconciliation responsibilities could turn this into a strong technical reassurance page.',
  'FT-09': 'Flexible spending allowance software may imply card-based spend, reimbursements and category controls that Ben must actually support. The search is worth pursuing only after confirming product scope and geographic fit. A capability page built on assumptions would attract evaluations Ben cannot complete, so validate before committing production effort.',
  'FT-10': 'Benefits analytics searches overlap the vendor roundup but signal interest in a specific software capability. The product page should answer whether data can move from utilisation reporting to concrete budget decisions, with segmentation and exports. Ben can earn higher-intent traffic by proving those workflows rather than repeating category-level comparisons.',
  'FT-11': 'SSO searches often come from security reviewers working through an approval checklist. Even low search volume can matter when lack of documentation delays enterprise deals. A concise technical page should specify supported protocols, provisioning model, permissions and security evidence, with links to documentation rather than unsupported compliance badges.',
  'FT-12': 'Provider integration questions arise when employers have existing brokers, carriers or regional benefits partners they cannot replace immediately. Buyers need to understand supported data exchanges, ownership of updates and exceptions. A technical page can qualify feasibility early and prevent promising a level of integration the product cannot deliver.',
  'FT-13': 'Audit-trail functionality is a low-volume query but a concrete requirement in regulated, multi-admin environments. Buyers need to know which changes are logged, who can review them and how evidence is exported. Unless search intent justifies a separate URL, this belongs inside a stronger product or security page.',
};

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
  const [shortlist, setShortlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ben-keyword-shortlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
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

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const selectedIndex = Math.max(
    0,
    rows.findIndex((r) => r.id === selectedId),
  );
  const selected: Kw | undefined = rows[selectedIndex];

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageRows = rows.slice(pageStart, pageStart + pageSize);

  // Go back to page 1 whenever the filters, sort or page size change
  useEffect(() => {
    setPage(1);
  }, [group, query, priority, action, diff, buyer, sort, quick, onlyShort, pageSize]);

  // Save shortlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('ben-keyword-shortlist', JSON.stringify(shortlist));
    } catch {
      // Handle potential storage quota errors silently
    }
  }, [shortlist]);

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    listRef.current?.scrollTo({ top: 0 });
  };

  // Select a row by its index in the full list and jump to the page it lives on
  const selectByIndex = (i: number) => {
    const r = rows[i];
    if (!r) return;
    setSelectedId(r.id);
    setPage(Math.floor(i / pageSize) + 1);
  };

  

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
    const nextIndex = selectedIndex + (e.key === 'ArrowDown' ? 1 : -1);
    const next = rows[nextIndex];
    if (!next) return;
    selectByIndex(nextIndex);
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
        WHY_BY_ID[k.id] ?? k.why,
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


  return (
    <section className="tb-page-section tb-pad" id="keywords">
      <div className="tb-container">

<header className="kp-intro">
  <div className="kp-intro-main">
    <div className="kp-eyebrow">
      03 / KEYWORD &amp; PAGE PRIORITIES
    </div>

    <h2>
      A clear view of keyword opportunities and recommended content priorities.
    </h2>

    <p className="kp-intro-description">
We’ve organised 78 keywords across six search categories, from vendor comparisons to specific benefits management needs. Each recommendation shows which pages Ben should create or improve and how urgently the work should be prioritised.
    </p>

  </div>


</header>


<div className="kp-tabs" role="tablist" aria-label="Keyword groups">
  <button
    type="button"
    role="tab"
    aria-selected={group === 'all'}
    className={group === 'all' ? 'active' : ''}
    onClick={() => setGroup('all')}
  >
    <strong>All keywords</strong>
    <small>{KEYWORDS.length} keywords</small>
  </button>

  {groupStats.map(({ g, total, high }) => (
    <button
      key={g}
      type="button"
      role="tab"
      aria-selected={group === g}
      aria-label={`${GROUPS[g].label}: ${total} keywords, ${high} high priority`}
      className={group === g ? 'active' : ''}
      onClick={() => setGroup(g)}
    >
      <strong>{GROUPS[g].label}</strong>
      <small>{total} keywords</small>
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
              {pageRows.map((k) => {
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

<button
  type="button"
  className="kp-kw-btn"
  aria-current={on}
  title={k.title}
  onClick={(e) => {
    e.stopPropagation();
    pick(k.id);
  }}
>
  {k.keyword.charAt(0).toUpperCase() + k.keyword.slice(1)}
</button>



               <span className="kp-kw">
  {k.keyword}
  <span className="kp-row-id"> · {k.id}</span>
</span>
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
  <b>{k.kd}</b>
</div>


                    <span className="kp-score">{k.score}</span>
                  </div>
                );
              })}
            </div>
            <div className="kp-list-foot">
              <div className="kp-pagination">
                <label className="kp-pagesize">
                  <span>Show</span>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>per page</span>
                </label>

                <span className="kp-range">
                  {rows.length === 0 ? 0 : pageStart + 1}–
                  {Math.min(pageStart + pageSize, rows.length)} of {rows.length}
                </span>

                <div className="kp-pager">
                  <button
                    type="button"
                    disabled={safePage === 1}
                    onClick={() => goToPage(safePage - 1)}
                    aria-label="Previous page"
                  >
                    ←
                  </button>
                  <span>
                    Page {safePage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={safePage === totalPages}
                    onClick={() => goToPage(safePage + 1)}
                    aria-label="Next page"
                  >
                    →
                  </button>
                </div>
              </div>
              <p className="kp-list-hint">
                Use ↑ ↓ to move between rows. Star a row to build a production
                shortlist.
              </p>
            </div>
          </div>

                   <aside className="kp-brief" ref={briefRef} aria-live="polite">
            {!selected ? (
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
                <h3>
                  {selected.keyword.charAt(0).toUpperCase() +
                    selected.keyword.slice(1)}
                </h3>
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

                <div className="kp-rationale">
                  <h4>Why this keyword matters</h4>
                  <p>{WHY_BY_ID[selected.id] ?? selected.why}</p>
                </div>

                <div className="kp-brief-actions" style={{ marginTop: '24px' }}>
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
                      onClick={() => selectByIndex(selectedIndex - 1)}
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
                      onClick={() => selectByIndex(selectedIndex + 1)}
                      aria-label="Next keyword"
                    >
                      →
                    </button>
                  </div>
                </div>
              </>
            )}
          </aside>

          
        </div>

        <p className="kp-foot">
          Priority is provisional. Volume and difficulty are illustrative,
          not validated. “Improve” means review the existing page before
          creating a new URL. Opportunity score blends demand, ease and priority.
        </p>
      </div>
    </section>
  );
}


