import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
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
    why: 'Publish an editable calculator separating employee benefit expenditure, platform licensing, implementation and ongoing administration. Model costs across countries, entities and headcount, with assumptions finance teams can adjust before requesting vendor quotes.',
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
  ['Benepass and Hotaling cite US compensation benchmarks, without separating employee benefit expenditure from software costs.', 2],
  ['Forma explains healthcare, retirement, and voluntary benefit spending, but offers no platform licensing cost breakdown.', 1],
  ['Pebl compares benefits expenditure across five countries, without modelling the software administration costs separately.', 1],
],
    gaps: [
  'Separate benefits expenditure from platform costs in a practical enterprise pricing model.',
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
    why: 'Publish a decision framework assessing country coverage, eligibility complexity, payroll integrations and local provider management. Include worked scenarios showing when an HRIS module is sufficient, when specialist software becomes necessary and what changes operationally.',
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
  ['EBM distinguishes HRIS from specialist benefits administration through configurability, but provides limited multinational deployment guidance.', 1],
  ['Selerix examines eligibility rules, payroll discrepancies and ACA compliance, primarily through a US regulatory lens.', 1],
  ['OneHCM promotes unified enrolment and payroll workflows, without establishing when separate benefits technology becomes necessary.', 1],
],
    
gaps: [
  'Establish when multinational benefits requirements justify a dedicated platform alongside an existing HRIS.',
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
    why: 'Publish a responsibility matrix separating insurance placement, local advisory, eligibility administration, payroll coordination and reporting. Compare broker-led, platform-led and hybrid models, showing who owns each workflow and where responsibilities overlap across countries.',
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
  ['Matrix positions flexible benefits and real-time analytics against traditional brokers, without explaining operational ownership boundaries.', 1],
  ['Nava compares automated eligibility, billing audits and employee support against brokers through vendor-led capability tables.', 1],
  ['Ignition details broker selection and renewal processes for smaller employers, rather than multinational administration models.', 1],
],
   gaps: [
  'Show which benefits responsibilities should remain with brokers and which belong on a platform.',
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
    why: 'Publish an enterprise pricing framework separating licensing, implementation, payroll integrations, country configuration and ongoing support. Include an annotated sample quote showing recurring charges, one-off costs and the commercial assumptions buyers should verify before procurement.',
       serp: [
      {
        d: 'https://www.ease.com/pricing/',
        t: 'Ease Product Pricing',
        f: 'Vendor page',
        description:
          'Ease benefits administration and HRIS software prices are based upon three subscription levels for insurance brokers to use for their clients.',
      },
      {
        d: 'https://www.capterra.com/benefits-administration-software/',
        t: 'Best Benefits Administration Software 2026',
        f: 'Review hub',
        date: '23 Oct 2026',
        description:
          'Pricing can be divided into three pricing tiers based on the starting prices: Price ranges*: $4 - $7 $7 - $46 $46+ *The pricing included is for ...',
      },
      {
        d: 'https://www.employeenavigator.com/pricing/',
        t: 'Employee Navigator Pricing | Compare Plans & Features',
        f: 'Vendor page',
        description:
          'Explore benefits administration software pricing with plans designed for brokers and HR teams. Elite $0.45 PEPM*',
      },
      {
        d: 'https://www.paylocity.com/why-paylocity/compare/lists/benefits-administration-software/',
        t: 'Best Benefits Administration Software: Top 10 Picks for 2026',
        f: 'Vendor blog',
        date: '20 Oct 2026',
        description:
          'Compare the top benefits administration software, including Paylocity, ADP, and Gusto. See features, pricing, and integrations. Pricing: Custom ...',
      },
      {
        d: 'https://www.indeed.com/recruitment/c/info/benefits-admin-software-tools',
        t: '16 Benefits Admin Software Tools to Consider',
        f: 'Publisher',
        date: '3 Aug 2026',
        description:
          'Pricing is based on a per-employee, per-pay period model. Submit your information here to schedule a call for a customized quote based on your ...',
      },
    ],


    says: [
      ['Ease publishes three broker subscription tiers and individual add-on charges, without disclosing base subscription prices.', 6],
      ['Employee Navigator discloses $0.45 PEPM EDI fees, while its broader subscription tiers require sales enquiries.', 5],
      ['Capterra presents $4–$46+ monthly pricing bands derived from 2020 data, rather than current enterprise quotations.', 4],
    ],
    
    gaps: [
      'Break down the full cost of enterprise benefits administration beyond headline subscription fees.',
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
    why: 'Publish a comparison framework separating employee recognition, benefits eligibility, provider management, payroll integrations and reporting. Show which platforms address each requirement, where capabilities overlap and when multinational employers need more than an engagement-focused solution.',
      serp: [
      {
        d: 'https://www.gartner.com/reviews/product/reward-gateway-employee-engagement-platform/alternatives',
        t: 'Reward Gateway Employee Engagement Platform',
        f: 'Review hub',
        description:
          'Reward Gateway Employee Engagement Platform Alternatives · 1. Workhuman Social Recognition · 2. Awardco Platform · 3. WorkTango Platform · 4. Achievers Platform.',
      },
      {
        d: 'https://360-wellbeing.co.uk/top-reward-gateway-alternatives-finding-the-best-employee-benefit-platform-for-2026/',
        t: 'Top Reward Gateway Alternatives: Finding the Best ...',
        f: 'Vendor blog',
        date: '5 Sept 2026',
        description:
          "360 Wellbeing stands out among Reward Gateway alternatives as a partner deeply invested in the long-term success of your team. We don't just ...",
      },
      {
        d: 'https://www.softwarereviews.com/categories/158/products/5281/alternatives',
        t: 'Reward Gateway Alternatives and Competitors | Employee ...',
        f: 'Review hub',
        description:
          'Best Alternatives and Competitors to Reward Gateway · AdvantageClub.ai · Bucketlist · Kudos · Bonusly · Applauz Recognition · Vantage Recognition & Rewards.',
      },
      {
        d: 'https://www.perkbox.com/resources/blog/reward-gateway-competitors',
        t: 'Top 5 Reward Gateway Competitors & Alternatives',
        f: 'Vendor blog',
        date: '14 Apr 2023',
        description:
          '5 Reward Gateway alternatives & competitors · 1. Perkbox · 2. Bonusly · 3. Achievers · 4. Sodexo · 5. Edenred. Edenred have developed a number ...',
      },
      {
        d: 'https://www.incentivesmart.com/blog/reward-gateway-alternatives/',
        t: '6 Best Reward Gateway Alternatives & Competitors UK',
        f: 'Vendor blog',
        date: '10 Sept 2026',
        description:
          "We've compared six leading Reward Gateway alternatives, looking at their strengths, Boostworks Terryberry Bonusly Kudos",
      },
    ],


says: [
      ['Gartner compares Reward Gateway against Workhuman, Awardco and Achievers, primarily through recognition capabilities and ratings.', 7],
      ['SoftwareReviews ranks AdvantageClub, Kudos and Bonusly using user sentiment, without evaluating multinational benefits administration requirements.', 6],
      ['Perkbox compares engagement features, rewards and employee discounts, with limited examination of benefits administration workflows.', 7],
       ],    
    
       gaps: [
      'Distinguish recognition platforms from benefits administration software when evaluating Reward Gateway alternatives for enterprises.',
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
    why: 'Publish an enterprise evaluation scorecard covering country availability, eligibility configuration, payroll integrations, provider management and consolidated reporting. Assess each platform against defined requirements, using documented capabilities, product evidence and clear limitations rather than generic rankings.',
    serp: [
      {
        d: 'https://kota.io/blog/7-best-employee-benefits-platforms-in-2026',
        t: 'The 10 Best Employee Benefits Platforms in the UK (2026)',
        f: 'Vendor blog',
        date: '15 Jan 2026',
        description:
          'This guide compares 10 top employee benefits platforms used across the UK. Zest is an award-winning UK employee benefits solution. Benifex is ...',
      },
      {
        d: 'https://www.perkiq.co.uk/find-a-provider/platform',
        t: 'Employee Benefits Platforms UK | Compare Providers',
        f: 'Publisher',
        description:
          'Compare UK employee benefits platforms that bring perks, discounts and benefits admin into one place. See how Perkbox, Heka, Pluxee and others fit SMEs.',
      },
      {
        d: 'https://www.achievers.com/blog/employee-rewards-software/',
        t: '15 best employee rewards software platforms in the UK',
        f: 'Vendor blog',
        date: '6 May 2026',
        description:
          'Achievers is a comprehensive employee rewards software platform designed to help organisations motivate performance, reinforce values, and drive ...',
      },
      {
        d: 'https://www.bravobenefits.co.uk/blog/employee-benefits-providers-in-the-uk-how-to-compare-platforms/',
        t: 'Employee benefits providers in the UK: How to compare ...',
        f: 'Vendor blog',
        description:
          'The most effective way to compare employee benefits platforms is to focus on how they perform in real-world use, not just how they look on paper. Two platforms ...',
      },
      {
        d: 'https://thephagroup.com/blog/employee-benefits-platforms-five-of-the-best/',
        t: 'Employee benefits platforms: Five of the best',
        f: 'Publisher',
        description:
          'Employee benefits platforms: Five of the best · Xexec · Juno · Vivup · Bravo Benefits · Hawk Incentives · More From Us:',
      },
    ],
    says: [
      ['Kota compares ten platforms across features, pricing and scalability, without systematically testing multinational administration capabilities.', 4],
      ['PerkIQ lists seven UK providers, including Ben, but primarily frames selection around SME requirements.', 3],
      ['Bravo Benefits evaluates usability, employee engagement and support, without providing comparable evidence of enterprise configuration.', 5],
    ],
    gaps: [
      'Compare UK benefits platforms against the operational requirements of large and multinational employers.',
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
    why: 'Publish a ranked comparison of multinational benefits platforms, assessing country coverage, local provider management, eligibility configuration, payroll integrations and reporting. Include evidence-backed capability comparisons, enterprise fit assessments and clear limitations to help buyers shortlist vendors against their operational requirements.',
    serp: [
      {
        d: 'https://www.deel.com/blog/best-global-employee-benefits-platforms-compared-2026/',
        t: 'Best Global Employee Benefits Platforms Compared (2026)',
        f: 'Vendor blog',
        date: '19 Oct 2026',
        description:
          'Compare top global employee benefits software: Deel, Remote, Oyster HR, and TriNet. Find the right platform for your international team.',
      },
      {
        d: 'https://www.recruiterslineup.com/best-global-employee-benefits-platforms/',
        t: 'The 12 Best Global Employee Benefits Platforms in 2026',
        f: 'Publisher',
        date: '29 Jul 2026',
        description:
          'Papaya Global provides payroll, payments, Employer of Record, workforce management, and benefits services for multinational organizations.',
      },
      {
        d: 'https://monday.com/blog/project-management/benefits-management-software/',
        t: '12 top benefits management tools HR teams need in 2026',
        f: 'Vendor blog',
        date: '13 Oct 2025',
        description:
          'Discover the top benefits management platforms transforming HR in 2026. Compare features and find your perfect fit — start optimizing today.',
      },
      {
        d: 'https://www.indeed.com/recruitment/c/info/benefits-admin-software-tools',
        t: '16 Benefits Admin Software Tools to Consider',
        f: 'Publisher',
        date: '3 Aug 2026',
        description:
          'UKG Pro is a global human capital management solution and benefits software suite that connects employees with HR through surveys, talent ...',
      },
      {
        d: 'https://www.hoppier.com/blog/top-global-employee-benefits-platforms',
        t: 'Top 5 Global Employee Benefits Platforms',
        f: 'Vendor blog',
        date: '24 Nov 2025',
        description:
          '5. Deel ... Deel is a more comprehensive approach to global employee benefits, combining HR, global payroll software, and benefits all in one.',
      },
    ],
    says: [
      ['Deel compares global benefits providers through payroll integration, compliance infrastructure and geographic coverage, favouring integration.', 6],
      ['Recruiters LineUp groups EOR, global payroll and specialist benefits vendors within one shortlist of twelve.', 4],
      ['Hoppier assesses customisation, integrations and employee experience, without clearly differentiating employment infrastructure from benefits administration.', 3],
    ],
    gaps: [
      'Evaluate where leading multinational benefits platforms differ on eligibility, integrations and provider management.',
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
    why: 'Build a dedicated solution page showing how Ben handles eligibility rules, employee plan selection, enrolment windows, approvals and payroll updates. Use actual product screenshots, workflow examples and integration details to demonstrate how HR teams manage enrolment and reduce manual administration',
     serp: [
      {
        d: 'https://www.gartner.com/reviews/market/benefits-management',
        t: 'Best Benefits Management Software Reviews 2026',
        f: 'Review hub',
        description:
          'Paycor Benefits Administration is a software designed to help organizations manage employee benefits enrollment and administration processes. The software ...',
      },
      {
        d: 'https://www.indeed.com/recruitment/c/info/benefits-admin-software-tools',
        t: '16 Benefits Admin Software Tools to Consider',
        f: 'Publisher',
        date: '3 Aug 2026',
        description:
          'Hibob, founded in 2016, allows employers to create a data hub where employees are assessed for auto-enrollment in benefits programs and payroll ...',
      },
      {
        d: 'https://www.pdcm.com/employee-benefits/benefit-enrollment-software/',
        t: 'Benefit Enrollment Software',
        f: 'Broker',
        description:
          'Our user-friendly enrollment platform saves you time and money by helping to increase employee engagement, simplifying the otherwise-complex enrollment process, ...',
      },
      {
        d: 'https://monday.com/blog/project-management/benefits-management-software/',
        t: '12 top benefits management tools HR teams need in 2026',
        f: 'Vendor blog',
        date: '13 Oct 2025',
        description:
          'Modern benefits management software brings enrolment, compliance, and communication together in one organized system',
      },
      {
        d: 'https://www.justworks.com/hr-glossary/benefits-enrollment-software#how-does-benefits-enrollment-software-help-employees-select-the-right-benefits-plan',
        t: 'What is Benefits Enrollment Software?',
        f: 'Vendor page',
        description:
          'Benefits enrollment software enables employees to select and manage their workplace benefits online, simplifying the process for both employees and HR.',
      },
    ], says: [
      ['Gartner describes eligibility tracking, enrolment automation and payroll integration, primarily through product listings and reviews.', 6],
      ['Monday.com explains enrolment workflows and administrative efficiency, but distributes these capabilities across twelve software recommendations.', 5],
  ["PDCM promotes BerniePortal's self-service enrolment and digital forms, with limited visibility into eligibility configuration workflows.", 4],
      ],
    gaps: [
      'Demonstrate how Ben manages employee benefits enrolment from eligibility through payroll integration.',
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
    why: 'Publish a ranked comparison of global benefits platforms, assessing country availability, local provider management, eligibility configuration, payroll integrations and reporting. Include documented capabilities, enterprise suitability and clear limitations, helping multinational employers shortlist vendors against their specific requirements.',
     serp: [
      {
        d: 'https://www.deel.com/blog/best-global-employee-benefits-platforms-compared-2026/',
        t: 'The Best Global Employee Benefits Platforms in 2026',
        f: 'Vendor blog',
        date: '19 Oct 2026',
        description:
          'Compare top global employee benefits software: Deel, Remote, Oyster HR, and TriNet. Find the right platform for your international team.',
      },
      {
        d: 'https://www.recruiterslineup.com/best-global-employee-benefits-platforms/',
        t: 'The 12 Best Global Employee Benefits Platforms in 2026',
        f: 'Publisher',
        date: '29 Jul 2026',
        description:
          'The 12 Best Global Employee Benefits Platforms in 2026 · 1. Deel · 2. Remote · 3. Oyster · 4. Rippling · 5. Papaya Global · 6. Velocity Global.',
      },
      {
        d: 'https://www.ignitionbenefits.com/blog/best-employee-benefits-platform',
        t: 'Best Employee Benefits Platform in 2026',
        f: 'Vendor blog',
        date: '19 Oct 2026',
        description:
          'TriNet, ADP TotalSource, and Deel suit companies that want a Professional Employer Organization (PEO) to run HR and benefits under one contract.',
      },
      {
        d: 'https://www.hoppier.com/blog/top-global-employee-benefits-platforms',
        t: 'Top 5 Global Employee Benefits Platforms',
        f: 'Vendor blog',
        date: '24 Nov 2025',
        description:
          'The 5 Top Global Employee Benefits Platforms · 1. Hoppier · 2. Compt · 3. Fringe · 4. Benepass · 5. Deel. Deel is a more ...',
      },
      {
        d: 'https://thephagroup.com/blog/employee-benefits-platforms-five-of-the-best/',
        t: 'Employee benefits platforms: Five of the best',
        f: 'Publisher',
        description:
          'Employee benefits platforms: Five of the best · Xexec · Juno · Vivup · Bravo Benefits · Hawk Incentives · More From Us:',
      },
    ],
    says: [
      ['Deel compares four global platforms using payroll integration, compliance infrastructure, geographic coverage and support models.', 3],
      ['Recruiters LineUp ranks twelve providers spanning EOR, payroll and benefits, with limited consistent capability scoring.', 6],
      ['Hoppier shortlists flexible perks and benefits platforms, emphasising customisation, employee experience and integration capabilities.', 5],
    ],
    gaps: [
      'Compare leading global benefits platforms on country coverage, eligibility, payroll integration and administration capabilities.',
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
    why: 'Publish a ranked software comparison assessing eligibility configuration, employee enrolment, benefits changes, carrier integrations, payroll synchronisation and reporting. Include verified product capabilities, screenshots and limitations, helping buyers distinguish basic automation from software capable of supporting complex benefits administration.',
      serp: [
      {
        d: 'https://www.gartner.com/reviews/market/benefits-management',
        t: 'Best Benefits Management Software Reviews 2026',
        f: 'Review hub',
        description:
          'ADP Benefits is a software designed to streamline and manage employee benefits administration for organizations. The software provides tools for enrollment,',
      },
      {
        d: 'https://www.indeed.com/recruitment/c/info/benefits-admin-software-tools',
        t: '16 Benefits Admin Software Tools to Consider',
        f: 'Publisher',
        date: '3 Aug 2026',
        description:
          'Find out which tools can help you manage employee benefits programs with the following guide to the 16 best HR software systems and their ...',
      },
      {
        d: 'https://www.adp.com/resources/articles-and-insights/articles/b/best-employee-benefits-administration-software.aspx',
        t: 'The Best Employee Benefits Administration Software in 2026',
        f: 'Vendor blog',
        description:
          'Benefitfocus ADP Review – Best overall benefits administration software … is the stronger choice.',
      },
      {
        d: 'https://www.paylocity.com/why-paylocity/compare/lists/benefits-administration-software/',
        t: 'Best Benefits Administration Software: Top 10 Picks for 2026',
        f: 'Vendor blog',
        date: '20 Oct 2026',
        description:
          'The best benefits administration software of 2026 · 1. Paylocity · 2. Benefitfocus · 3. Employee Navigator · 4. Ease · 5. bswift · 6. PlanSource · 7.',
      },
      {
        d: 'https://www.rippling.com/products/hr/benefits',
        t: 'Best Benefits Administration Software',
        f: 'Vendor page',
        description:
          'Rippling is the #1 benefits administration software. It allows HR teams and brokers to manage employee benefits—from health insurance to 401K—in one system.',
      },
    ],
    says: [
      ['Gartner lists benefits management products using customer ratings, with limited evidence of complex administrative workflows.', 7],
      ['ADP compares enrolment, carrier connections and compliance features, while positioning its integrated platform above competitors.', 5],
      ['Paylocity ranks ten platforms by features and suitability, but provides limited evidence of configuration depth.', 6],
       ],
       gaps: [
      'Compare leading benefits administration software against actual enrolment, eligibility, payroll and reporting requirements.',
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
  'adp.com': 'ADP',
  'rippling.com': 'Rippling',
  'ignitionbenefits.com': 'Ignition Benefits',
  'pdcm.com': 'PDCM Insurance',
  'justworks.com': 'Justworks',
  'deel.com': 'Deel',
  'recruiterslineup.com': 'Recruiters LineUp',
  'monday.com': 'Monday.com',
  'hoppier.com': 'Hoppier',
  'gartner.com': 'Gartner',
  '360-wellbeing.co.uk': '360 Wellbeing',
  'softwarereviews.com': 'SoftwareReviews',
  'perkbox.com': 'Perkbox',
  'incentivesmart.com': 'Incentivesmart',
  'kota.io': 'Kota',
  'perkiq.co.uk': 'PerkIQ',
  'achievers.com': 'Achievers',
  'bravobenefits.co.uk': 'Bravo Benefits',
  'thephagroup.com': 'The PHA Group',
  'ease.com': 'Ease',
  'employeenavigator.com': 'Employee Navigator',
  'paylocity.com': 'Paylocity',
  'indeed.com': 'Indeed',
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



/* Favicon cache: hostname -> working source URL, or null if every source failed */
const faviconCache = new Map<string, string | null>();
const faviconPending = new Map<string, Promise<string | null>>();

function loadFavicon(hostname: string, origin: string): Promise<string | null> {
  if (faviconCache.has(hostname)) {
    return Promise.resolve(faviconCache.get(hostname) ?? null);
  }

  const existing = faviconPending.get(hostname);
  if (existing) return existing;

  const sources = [
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64`,
    `${origin}/favicon.ico`,
  ];

  const promise = new Promise<string | null>((resolve) => {
    let index = 0;

    const tryNext = () => {
      if (index >= sources.length) {
        faviconCache.set(hostname, null);
        resolve(null);
        return;
      }

      const src = sources[index++];
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.onload = () => {
        faviconCache.set(hostname, src);
        resolve(src);
      };
      img.onerror = tryNext;
      img.src = src;
    };

    tryNext();
  });

  faviconPending.set(hostname, promise);
  return promise;
}

/* Preload every favicon once, as soon as this module loads */
if (typeof window !== 'undefined') {
  KW.forEach((keyword) =>
    keyword.serp.forEach((result) => {
      const url = getResultUrl(result.d);
      if (url) void loadFavicon(url.hostname, url.origin);
    }),
  );
}

function ResultFavicon({ value }: { value: string }) {
  const url = getResultUrl(value);
  const hostname = url?.hostname ?? '';
  const origin = url?.origin ?? '';

  // undefined = still loading, null = failed, string = ready
  const [source, setSource] = useState<string | null | undefined>(() =>
    hostname ? faviconCache.get(hostname) : null,
  );

  useEffect(() => {
    if (!hostname) return;

    if (faviconCache.has(hostname)) {
      setSource(faviconCache.get(hostname) ?? null);
      return;
    }

    let alive = true;
    loadFavicon(hostname, origin).then((result) => {
      if (alive) setSource(result);
    });

    return () => {
      alive = false;
    };
  }, [hostname, origin]);

  return (
    <span className="co-serp-fav" aria-hidden="true">
      {source ? (
        <img
          src={source}
          alt=""
          width={20}
          height={20}
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : source === null ? (
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
      ) : null}
    </span>
  );
}


const diffLabel = (value: number) =>
  value < 30 ? 'Low' : value < 45 ? 'Moderate' : 'Hard';

type DetailSection = 'landscape' | 'direction';

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



 

  const opening = isPricingExample
    ? 'An editable enterprise cost model with transparent assumptions.'
    : selected.gaps[0] ?? selected.asset;

  const topResults = [...selected.says]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([text]) => text);

  
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
            </div>

            <h3 className="co-query-title">{selected.keyword}</h3>

            
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



            <nav
              className="co-section-nav"
              role="tablist"
              aria-label="Opportunity sections"
            >
              {(
                [
                  ['landscape', 'Search Landscape'],
                  ['direction', 'Content Direction'],
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
  <img
    className="co-google-logo"
    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
    alt="Google"
    width="92"
    height="30"
    loading="lazy"
    decoding="async"
  />

  <div className="co-serp-search">
    <span>{selected.keyword}</span>

    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
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
                  <h4>What the top results show</h4>
                </div>

                <div className="co-value-grid">
                  {topResults.map((text, index) => (
                    <article className="co-value" key={text}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h5>{text}</h5>
                      </div>
                    </article>
                  ))}
                </div>

                <article className="co-lead">
                  <span className="co-lead-label">The opportunity</span>

                  <h4>{selected.gaps[0]}</h4>

                  <p>{selected.why}</p>
                </article>


              
              </div>
            )}


          </div>
        </div>

        <footer className="co-footer">
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