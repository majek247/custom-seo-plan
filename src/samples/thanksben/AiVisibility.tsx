import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import ExcelJS from 'exceljs';
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
  | 'Feature fit';
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


type Fix = {
  action: 'Create' | 'Improve';
  title: string;
  text: string;
  ref?: string;
};



type Move = { type: MoveType; title: string; text: string };
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


const LOGO_DEV_PUBLIC_KEY = 'pk_KnI5jJk1QmKibGPEWPdFjw';

const PLATFORM_LOGO_DOMAINS: Record<PlatformKey, string> = {
  chatgpt: 'chatgpt.com',
  gemini: 'gemini.google.com',
  perplexity: 'perplexity.ai',
  aio: 'google.com',
};

function PlatformLogo({
  platform,
}: {
  platform: PlatformKey;
}) {
  const [failed, setFailed] = useState(false);

  const domain = PLATFORM_LOGO_DOMAINS[platform];
  const label = PLATFORMS.find((item) => item.key === platform);

  const src =
    `https://img.logo.dev/${domain}` +
    `?token=${encodeURIComponent(LOGO_DEV_PUBLIC_KEY)}` +
    '&size=48&format=png&retina=true&theme=light&fallback=404';

  return (
    <span className="av-platform-logo" aria-hidden="true">
      {failed ? (
        <span className="av-logo-fallback">
          {label?.short}
        </span>
      ) : (
        <img
          src={src}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}


const STAGES: Stage[] = [
  'Vendor shortlist',
  'Switching',
  'Head-to-head',
  'Pricing',
  'Feature fit',
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
  /* ---------------- 01 · PR-09 ---------------- */
  {
    stage: 'Pricing',
    buyer: 'Finance',
    keywords: ['PR-09'],
    prompt:
      'I’m Finance Director at a company with about 6,000 employees across 14 countries, and we’re budgeting for a global benefits platform. How much does an enterprise employee benefits platform cost per employee, and what usually pushes the price up?',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: 'Ben needs a source AI platforms can reference when answering enterprise pricing questions. A clear, publicly accessible explanation of its pricing structure would give these systems more useful evidence than general benefits-cost articles.',
    fix: [
      {
        action: 'Create',
        title: 'Publish a standalone enterprise pricing methodology',
        text: "Explain Ben's pricing basis, what is included, and how quotes vary by workforce size, country coverage and implementation requirements. Use confirmed product and commercial information.",

      },
      {
        action: 'Improve',
        title: "Make Ben's pricing information easier to reference",
        text: 'Add a crawlable pricing FAQ with direct answers, defined terminology, clear assumptions and a link to the full methodology. Avoid hiding all substantive information behind a demo form.',
      },
    ],
    moves: [
      {
        type: 'Digital PR',
        title: 'Place anonymised pricing insight where analysts and buyers already look',
        text: 'Share aggregated cost drivers and typical implementation ranges with HR technology analysts and benefits publications, where commercially and contractually permitted.  ',
      },
      {
        type: 'Third-party citations',
        title: 'Get independent buying guides to describe Ben’s pricing consistently',
        text: 'Ask the review sites and buying guides that already rank for benefits-cost questions to include Ben’s pricing basis, linking to the methodology page rather than the homepage. Supply the same dated figures to each so descriptions stay consistent.',
      },
    ],
  },

  /* ---------------- 02 · VS-12 ---------------- */
  {
    stage: 'Head-to-head',
    buyer: 'HRIS & Security',
    keywords: ['VS-12'],
    prompt:
      'I lead HRIS at a company with about 6,000 employees across 14 countries. Our HRIS has a benefits module, but local eligibility rules keep getting messy. Should we buy dedicated benefits administration software, or is the HRIS module enough?',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: "Ben doesn't appear in the sample AI answers to this question. The priority is to make its role alongside existing HRIS platforms easier to verify, then establish that position through independent HR technology sources.",
fix: [
  {
    action: 'Create',
    title: 'Use the planned HRIS comparison to support AI recommendations',
    text: "The HRIS-versus-specialist decision framework is already covered in Content Opportunities. Rather than commissioning another asset, use that page as the main reference for this buyer question and link it to Ben's relevant integration documentation.",
  },
  {
    action: 'Improve',
    title: "Make Ben's HRIS integrations independently verifiable",
    text: 'Document confirmed HRIS connections, supported data flows and integration limitations. Where available, link to technical documentation and partner listings so third parties can accurately describe how Ben works alongside existing systems.',
  },
],

    moves: [
      {
        type: 'Expert content',
        title: 'Secure references from HRIS integration partners',
        text: "Work with confirmed integration partners to publish Ben's supported workflows in their directories, documentation or implementation guides. Prioritise sources buyers already consult when evaluating whether specialist software can coexist with their HRIS.",
      },
    ],
  },

  /* ---------------- 03 · ALT-13 ---------------- */
  {
    stage: 'Switching',
    buyer: 'Head of Reward',
    keywords: ['ALT-13'],
    prompt:
      'I’m Head of Reward at a company with about 6,000 employees across 14 countries. Our benefits broker contract is up for renewal. What are the alternatives to a traditional broker for managing global benefits, and what would we move in-house?',
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
    why: 'Ben already appears in two AI platform results for this question, with its broker-friendly model highlighted as a differentiator. The next priority is to support that positioning with verifiable partner evidence and stronger independent references.',

fix: [
  {
    action: 'Create',
    title: 'Make the planned broker comparison the main reference',
    text: "The broker responsibility matrix is already covered in Content Opportunities. Use that page as Ben's primary reference for broker alternatives, and link it from relevant pricing and benefits management pages so the explanation is easy to find.",
    ref: 'ALT-13',
  },
  {
    action: 'Improve',
    title: 'Prove the hybrid broker model with customer evidence',
    text: "Add an approved customer example showing Ben working alongside an existing broker. Identify the broker's role, the responsibilities handled through Ben, and what changed operationally after implementation.",
  },
],

    moves: [
      {
        type: 'Partners',
        title: "Secure independent references from Ben's broker partners",
        text: "Co-publish a customer implementation story with an existing broker partner, hosted on the partner's website. Include a link to Ben's broker comparison and confirm how both organisations work together.",
      },
    ],
  },

  /* ---------------- 04 · PR-07 ---------------- */
  {
    stage: 'Pricing',
    buyer: 'Benefits Ops',
    keywords: ['PR-07'],
    prompt:
      'I run benefits operations at a company with about 6,000 employees across 14 countries, and we’re comparing vendors. What does employee benefits administration software usually cost, how is it priced, and what do implementation and integrations add?',
    priority: 'High',
    results: [
      NO,
      NO,
      {
        s: 'passing',
        said: 'Ben’s pricing page outlines how packages and implementation work, but per-employee rates aren’t shown, so a quote is needed.',
        cited: 'thanksben.com/pricing',
        gap: 'Packaging only. No price drivers or example scenarios to quote.',
      },
      NO,
    ],
    why: "Perplexity already cites Ben's pricing page, but only describes its packaging and quote process. The priority is to make that existing reference more useful, then strengthen Ben's pricing information across independent software evaluation sources.",

fix: [
  {
    action: 'Create',
    title: "Connect Ben's pricing page to the planned cost breakdown",
    text: "The enterprise pricing framework is already covered in Content Opportunities. Once published, link it prominently from Ben's existing pricing page, which Perplexity already cites, so buyers and AI platforms can access the more detailed explanation.",
  },
  {
    action: 'Improve',
    title: "Make Ben's pricing information consistent across external sources",
    text: "Audit Ben's G2, Capterra and other relevant software directory profiles for outdated packaging, unsupported pricing claims and missing implementation details. Align the information with Ben's current commercial terms so external comparisons accurately describe its pricing model.",
  },
],

    moves: [
      {
        type: 'Reviews',
        title: 'Build third-party evidence around implementation and pricing transparency',
        text: 'Invite eligible customers to describe their procurement and implementation experience in independent reviews, including what was included in the quoted scope and whether additional integration costs arose. Avoid requesting predetermined claims or ratings.',
      },
    ],
  },

  /* ---------------- 05 · ALT-05 ---------------- */
  {
    stage: 'Switching',
    buyer: 'Head of Reward',
    keywords: ['ALT-05'],
    prompt:
      'We’re on Reward Gateway today at a company of about 6,000 employees across 14 countries. It’s great for recognition and perks, but we now need proper benefits administration. What are the best alternatives?',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: 'Ben is absent from all four sample AI answers, while existing Reward Gateway comparisons focus heavily on recognition and perks. The priority is to establish Ben as a relevant option when buyers need broader benefits administration, supported by independent comparisons and customer evidence.',

fix: [
  {
    action: 'Create',
    title: "Use the planned Reward Gateway comparison as Ben's reference",
    text: "The comparison framework is already covered in Content Opportunities. Once published, link it from Ben's benefits management and relevant alternatives pages, making the distinction between recognition software and benefits administration easy to find.",
  },
  {
    action: 'Improve',
    title: 'Position Ben under the right software comparison categories',
    text: "Review Ben's listings on relevant software directories and ensure its categorisation accurately reflects benefits administration, enrolment and eligibility management. This helps third-party comparisons distinguish Ben from recognition-only platforms.",
  },
],
    moves: [
      {
        type: 'Backlinks',
        title: 'Get Ben considered in independent Reward Gateway alternatives lists',
        text: 'Approach relevant HR software publishers and comparison websites that already cover Reward Gateway alternatives. Provide documented administration capabilities and explain where Ben fits when buyers need more than recognition and employee discounts.',
      },
      {
        type: 'Reviews',
        title: 'Build independent evidence from customers who changed platforms',
        text: 'Invite customers who previously used recognition-led software to describe their reasons for changing and the administration requirements Ben now handles. Prioritise verified reviews that identify the previous platform and specific operational improvements.',
      },
    ],
  },

  /* ---------------- 06 · BO-13 ---------------- */
  {
    stage: 'Vendor shortlist',
    buyer: 'Head of Reward',
    keywords: ['BO-13'],
    prompt:
      'I’m Head of Reward at a UK company with about 6,000 employees, and we’re expanding into Europe. What’s the best enterprise employee benefits platform in the UK for us?',
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
    action: 'Improve',
    title: 'Show how UK enterprise customers manage European expansion',
    text: 'Publish an approved customer case study documenting the countries involved, benefits administration challenges, implementation scope and measurable operational results. Link it from the About page already cited in AI answers, and from relevant product pages.',
  },
],

    moves: [
    {
      type: 'Reviews',
      title: 'Build independent reviews from UK multinational customers',
      text: 'Invite UK enterprise customers using Ben across multiple countries to document their experience on relevant independent software review platforms. Encourage specific, authentic feedback about local configuration, rollout complexity, support and administration.',
    },
  ],
  },

  /* ---------------- 07 · BO-03 ---------------- */
  {
    stage: 'Vendor shortlist',
    buyer: 'Head of Reward',
    keywords: ['BO-03'],
    prompt:
      'I’m Head of Reward at a company with about 6,000 employees across 14 countries, and every country has different eligibility rules. Can you recommend the best multinational employee benefits software for that?',
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
    why: 'Gemini mentions Ben as a multinational benefits provider but cannot substantiate how its eligibility rules work across countries. The priority is to make these capabilities verifiable through product documentation, supported implementation examples and independent partner references.',

fix: [
  {
    action: 'Create',
    title: 'Show exactly how Ben configures eligibility across countries',
    text: 'Publish product screenshots and documented configuration examples showing how eligibility varies by country, legal entity and employee group. Explain which rules administrators can configure directly and which require implementation support, using confirmed product capabilities.',
  },
],

    moves: [
      {
        type: 'Partners',
        title: "Get multinational payroll partners to document Ben's integration workflows",
        text: 'Co-publish a technical implementation example with a confirmed payroll or HRIS partner, documenting how employee data, eligibility changes and country-specific rules move between systems. Host supporting documentation on both companies\' websites.',
      },
    ],
  },

  /* ---------------- 08 · FT-01 ---------------- */
  {
    stage: 'Feature fit',
    buyer: 'Benefits Ops',
    keywords: ['FT-01'],
    prompt:
      'I run benefits operations at a company with about 6,000 employees across 14 countries. We need employee benefits enrolment software that handles open enrolment, approvals and eligibility by country. What should we look at?',
    priority: 'Medium',
    results: [
      NO,
      NO,
      {
        s: 'passing',
        said: 'Ben’s benefits management page covers enrolment and approvals, but gives little detail on how enrolment rules work by country.',
        cited: 'thanksben.com/benefits-management',
        gap: 'Enrolment is named but not shown. No screenshots or eligibility examples.',
      },
      NO,
    ],
    why: "Perplexity already cites Ben's benefits management page, but only gives a passing mention of enrolment and approvals. The priority is to connect that existing reference to stronger product evidence and independent accounts of how Ben handles enrolment across countries.",

fix: [
  {
    action: 'Improve',
    title: 'Show how customers manage enrolment across multiple countries',
    text: 'Publish an approved customer example documenting enrolment windows, approval responsibilities, country-specific eligibility and payroll handoffs. Include measurable outcomes where available, such as processing time, administrative workload or enrolment errors.',
  },
],

    moves: [
      {
        type: 'Backlinks',
        title: 'Build independent reviews around real enrolment experiences',
        text: 'Invite customers managing enrolment across several countries to share their experience on relevant software review platforms. Encourage specific feedback about approval workflows, eligibility configuration, employee self-service and payroll coordination rather than generic satisfaction statements.',
      },


    ],
  },

  /* ---------------- 09 · BO-01 ---------------- */
  {
    stage: 'Vendor shortlist',
    buyer: 'Head of Reward',
    keywords: ['BO-01'],
    prompt:
      'I’m Head of Reward at a company with about 6,000 employees across 14 countries. Which are the best global employee benefits platforms, and which should I put on a shortlist?',
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
    why: "Perplexity names Ben sixth in a seven-vendor shortlist but cites only its homepage. The answer repeats Ben's multinational positioning without supporting evidence. The priority is to strengthen its enterprise credentials through documented capabilities, independent comparisons and multinational customer reviews.",
    fix: [
      {
        action: 'Create',
        title: 'Replace broad global claims with verifiable enterprise evidence',
        text: 'Strengthen the homepage and benefits management pages with confirmed country coverage, documented multi-entity capabilities and links to relevant customer implementations. Distinguish supported functionality from integrations or services delivered through partners.',
      },
    ],
    moves: [
      {
        type: 'Third-party listings',
        title: 'Get Ben evaluated in independent global benefits shortlists',
        text: 'Approach relevant HR software publishers that already compare multinational benefits providers. Supply documented product capabilities, country coverage and enterprise customer evidence so Ben can be assessed against the same criteria as Benefex, Benify and Alight.',
      },
    ],
  },

  /* ---------------- 10 · BO-02 ---------------- */
  {
    stage: 'Vendor shortlist',
    buyer: 'Benefits Ops',
    keywords: ['BO-02'],
    prompt:
      'I run benefits at a company with about 6,000 employees across 14 countries. What’s the best employee benefits administration software for us? We need enrolment, eligibility rules and payroll handled across several countries.',
    priority: 'High',
    results: [NO, NO, NO, NO],
    why: 'Ben is absent from all four sample AI answers for this enterprise administration question. The priority is to establish its relevance in independent software shortlists, with verifiable evidence of enrolment, eligibility and payroll capabilities across multiple countries.',
    fix: [
      {
        action: 'Improve',
        title: "Make Ben's software directory profiles reflect its administration capabilities",
        text: "Review Ben's categorisation on relevant platforms such as G2 and Capterra. Ensure product descriptions accurately cover supported enrolment, eligibility, approvals, payroll integrations and multi-country administration, with links to the relevant product pages.",
      },
    ],

    moves: [
      {
        type: 'Backlinks',
        title: 'Get Ben evaluated in independent benefits administration shortlists',
        text: 'Approach HR technology publishers and software comparison websites already ranking benefits administration vendors. Supply verified product capabilities, multinational implementation examples and clear eligibility criteria so Ben can be evaluated against the same requirements as established providers.',
      },
      {
        type: 'Reviews',
        title: 'Build independent reviews around complex administration workflows',
        text: 'Invite customers using Ben for multinational benefits administration to describe their experience on independent software review platforms. Encourage specific, authentic feedback about eligibility changes, open enrolment, approvals, payroll coordination and administrative workload.',
      },
    ],
  },
];



const PROMPTS: Prompt[] = RAW.map((p, i) => ({
  ...p,
  id: `P${String(i + 1).padStart(2, '0')}`,
}));



export function getAiVisibilityWorkbookData() {
  return PROMPTS.map(p => ({
    id: p.id,
    stage: p.stage,
    buyer: p.buyer,
    keywords: [...p.keywords],
    prompt: p.prompt,
    priority: p.priority,
    why: p.why,

    results: p.results.map((r, index) => ({
      platform: PLATFORMS[index].name,
      status: STATUS_LABEL[r.s],
      position: r.pos
        ? `Named ${r.pos[0]} of ${r.pos[1]}`
        : '',
      cited: r.cited ?? '',
      said: r.said ?? '',
      also: r.also ?? [],
      gap: r.gap ?? ''
    })),

    fixes: p.fix.map(f => ({
      action: f.action,
      title: f.title,
      text: f.text,
      ref: f.ref ?? ''
    })),

    moves: p.moves.map(m => ({
      type: m.type,
      title: m.title,
      text: m.text
    }))
  }));
}



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
 



async function exportXlsx() {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = 'GrowUp';
  workbook.title = 'Ben | AI Search Visibility & Authority';

  const C = {
    navy: '011522',
    teal: '167273',
    mint: 'F3F9F5',
    white: 'FFFFFF',
    text: '011522',
    muted: '526775',
    line: 'DEE8E6'
  };

  const sheet = workbook.addWorksheet('AI Visibility', {
    views: [{ state: 'frozen', ySplit: 2 }],
    properties: {
      tabColor: { argb: C.teal },
      defaultRowHeight: 26
    }
  });

  // Eight columns allow detailed copy without excessive scrolling.
  sheet.columns = [
    { width: 24 },
    { width: 26 },
    { width: 28 },
    { width: 32 },
    { width: 38 },
    { width: 38 },
    { width: 38 },
    { width: 32 }
  ];

  function cellBlock(
    row: number,
    from: number,
    to: number,
    value: string,
    options: {
      bg?: string;
      color?: string;
      bold?: boolean;
      size?: number;
      height?: number;
    } = {}
  ) {
    sheet.mergeCells(row, from, row, to);

    const cell = sheet.getCell(row, from);
    cell.value = value;

    cell.font = {
      name: 'Aptos',
      size: options.size ?? 10,
      bold: options.bold ?? false,
      color: { argb: options.color ?? C.text }
    };

    cell.alignment = {
      vertical: 'middle',
      horizontal: 'left',
      wrapText: true,
      indent: 1
    };

    if (options.bg) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: options.bg }
      };
    }

    sheet.getRow(row).height = options.height ?? 36;
  }

  function section(row: number, name: string) {
    cellBlock(row, 1, 8, name, {
      bg: C.teal,
      color: C.white,
      bold: true,
      size: 10,
      height: 32
    });
  }

  function detail(
    row: number,
    label: string,
    value: string,
    height = 85
  ) {
    cellBlock(row, 1, 2, label, {
      bg: C.mint,
      color: C.teal,
      bold: true,
      height
    });

    cellBlock(row, 3, 8, value, {
      color: C.text,
      height
    });
  }

  // Workbook heading
  cellBlock(
    1, 1, 8,
    'Ben | AI Search Visibility & Authority',
    {
      bg: C.navy,
      color: C.white,
      bold: true,
      size: 18,
      height: 48
    }
  );

  cellBlock(
    2, 1, 8,
    'GROWUP / BEN / AI SEARCH VISIBILITY',
    {
      color: C.teal,
      bold: true,
      size: 10,
      height: 30
    }
  );

  let currentRow = 4;

  // Export all ten prompts in their original order.
  PROMPTS.forEach((prompt, index) => {
    // Prompt identifier and stage
    cellBlock(
      currentRow, 1, 8,
      `${String(index + 1).padStart(2, '0')} / ${prompt.stage.toUpperCase()}`,
      {
        bg: C.navy,
        color: C.white,
        bold: true,
        size: 12,
        height: 40
      }
    );
    currentRow++;

    // Full original buyer question
    cellBlock(
      currentRow, 1, 8,
      prompt.prompt,
      {
        bg: C.mint,
        color: C.navy,
        bold: true,
        size: 12,
        height: 85
      }
    );
    currentRow += 2;

    // PLATFORM RESULTS
    section(currentRow, 'PLATFORM RESULTS');
    currentRow++;

    const headers = [
      'Platform',
      'Ben’s presence',
      'Position',
      'Source'
    ];

    const columns = [1, 3, 5, 7];

    headers.forEach((header, i) => {
      cellBlock(
        currentRow,
        columns[i],
        columns[i] + 1,
        header,
        {
          bg: 'E4F0EC',
          color: C.navy,
          bold: true,
          height: 34
        }
      );
    });
    currentRow++;

    prompt.results.forEach((result, i) => {
      const position = result.pos
        ? `Named ${result.pos[0]}${ordinal(result.pos[0]).slice(String(result.pos[0]).length)} of ${result.pos[1]}`
        : '—';

      const values = [
        PLATFORMS[i].name,
        STATUS_LABEL[result.s],
        position,
        result.cited ?? '—'
      ];

      values.forEach((value, j) => {
        cellBlock(
          currentRow,
          columns[j],
          columns[j] + 1,
          value,
          {
            bg: i % 2 === 0 ? C.white : C.mint,
            height: 38
          }
        );
      });

      currentRow++;
    });

    currentRow++;

    // ANSWER EVIDENCE
    section(currentRow, 'ANSWER EVIDENCE');
    currentRow++;

    const evidence = prompt.results
      .map((result, i) => ({
        ...result,
        platform: PLATFORMS[i].name
      }))
      .filter(result => result.s !== 'absent');

    if (evidence.length === 0) {
      cellBlock(
        currentRow, 1, 8,
        'No Ben mentions in this sample.',
        {
          color: C.muted,
          height: 38
        }
      );
      currentRow++;
    } else {
      evidence.forEach(result => {
        detail(
          currentRow,
          `${result.platform} / ${STATUS_LABEL[result.s]}`,
          result.said ?? 'No sample excerpt recorded.',
          85
        );
        currentRow++;

        if (result.also?.length) {
          detail(
            currentRow,
            'Also named',
            result.also.join(' · '),
            42
          );
          currentRow++;
        }

        if (result.gap) {
          detail(
            currentRow,
            'Gap',
            result.gap,
            65
          );
          currentRow++;
        }
      });
    }

    currentRow++;

    // CONTENT & DISTRIBUTION
    section(currentRow, 'CONTENT & DISTRIBUTION');
    currentRow++;

    detail(
      currentRow,
      'What to improve',
      prompt.why,
      110
    );
    currentRow++;

    // Original content recommendations
    prompt.fix.forEach(fix => {
      detail(
        currentRow,
        `${fix.action} / ${fix.title}`,
        fix.text + (fix.ref ? `\n${fix.ref}` : ''),
        135
      );
      currentRow++;
    });

    // Original authority recommendations
    prompt.moves.forEach(move => {
      detail(
        currentRow,
        `${move.type} / ${move.title}`,
        move.text,
        135
      );
      currentRow++;
    });

    // Spacing between each buyer prompt
    currentRow += 3;
  });

  // Discreet note: source results are illustrative.
  cellBlock(
    currentRow, 1, 8,
    'Illustrative research sample. AI platform responses require dated, independently logged verification before use as live findings.',
    {
      color: C.muted,
      size: 9,
      height: 36
    }
  );

  sheet.pageSetup = {
    orientation: 'landscape',
    paperSize: 9,
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0
  };

  sheet.headerFooter.oddFooter =
    '&LGrowUp | AI Search Visibility & Authority&RPage &P of &N';

  // Generate and download Excel.
  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'Ben-AI-Search-Visibility.xlsx';

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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
  const [activeTab, setActiveTab] = useState<'results' | 'evidence' | 'plan'>('results');
  const [stage, setStage] = useState<'All' | Stage>('All');
  const [vis, setVis] = useState<'all' | 'appears' | 'absent'>('all');
  const [plat, setPlat] = useState<'all' | PlatformKey>('all');
  const [prio, setPrio] = useState<'all' | Priority>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('P06');
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

<header className="av-intro">
  <div className="av-intro-top">
    <span className="av-eyebrow">
      04 / AI SEARCH VISIBILITY &amp; AUTHORITY
    </span>
  </div>

  <h2>Where Ben stands across AI search results and recommendations.</h2>

  <p>
We extended our analysis of the same ten priority searches to four AI platforms. The results show where Ben is recommended, which competing providers appear more frequently, and where gaps in content or supporting evidence could be limiting its visibility.
  </p>
</header>
    


{/* ---------- Overview ---------- */}
<div className="av-summary">
  <div className="av-summary-item">
    <strong>{Math.round((VISIBLE / TOTAL) * 100)}%</strong>
    <div>
      <h3>
        Prompt coverage
        <span className="av-tooltip-trigger" data-tooltip="Percentage of the 10 buyer prompts where Ben is mentioned on at least one AI platform.">i</span>
      </h3>
      <p>{VISIBLE} of {TOTAL} prompts</p>
    </div>
  </div>

  <div className="av-summary-item">
    <strong>{TOP_PICKS}</strong>
    <div>
      <h3>
        Recommendations
        <span className="av-tooltip-trigger" data-tooltip="Total number of times Ben was explicitly recommended as a top choice across all 40 AI answers.">i</span>
      </h3>
      <p>Across {CELLS.length} sample answers</p>
    </div>
  </div>

  <div className="av-summary-item">
    <strong>{CITED}</strong>
    <div>
      <h3>
        Source citations
        <span className="av-tooltip-trigger" data-tooltip="Number of times an AI platform cited a Ben URL (e.g., thanksben.com) as the source for its answer.">i</span>
      </h3>
      <p>Across {CELLS.length} sample answers</p>
    </div>
  </div>

  <div className="av-summary-item">
    <strong>{TOTAL - VISIBLE}</strong>
    <div>
      <h3>
        Uncovered prompts
        <span className="av-tooltip-trigger" data-tooltip="The number of priority prompts where Ben is completely absent across all four AI platforms.">i</span>
      </h3>
      <p>No appearance on any platform</p>
    </div>
  </div>
</div>

<div className="av-platform-summary">
  <strong>Platform coverage</strong>

  <div className="av-platform-counts">
    {PLATFORMS.map((platform, index) => (
      <div key={platform.key}>
    <span className="av-platform-name">
  <PlatformLogo platform={platform.key} />
  <span>{platform.name}</span>
</span>
        <b>{platformCover[index]}/{TOTAL}</b>
      </div>
    ))}
  </div>
</div>

{/* Removed View coverage by buying stage */}


        {/* ---------- Toolbar ---------- */}
        <div className="av-toolbar" ref={workRef}>
          <div className="av-chips" role="group" aria-label="Filter by buying stage">
            {(['All', ...STAGES] as const).map((s) => (
              <button
                key={s}
             type="button"
aria-pressed={stage === s}
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
  onClick={exportXlsx}
  disabled={!PROMPTS.length}
>
  Export XLSX ({PROMPTS.length})
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
            </div>
            <div
  className="av-list"
  ref={listRef}
  onKeyDown={onListKey}
  role="group"
  aria-label="Buyer prompts. Use arrow keys to navigate."
>
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
                  aria-pressed={sel?.id === p.id}
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



<div className="av-prompt-heading">
  <h3>{sel.prompt}</h3>

  <div className="av-prompt-meta">
    <span>
      Buyer <strong>{sel.buyer}</strong>
    </span>

    <span className="av-maps">
      Maps to
      {sel.keywords.map((keyword) => (
        <code key={keyword}>{keyword}</code>
      ))}
    </span>
  </div>
</div>


<nav className="av-tabs" role="tablist">
  <button
    role="tab"
    aria-selected={activeTab === 'results'}
    className={activeTab === 'results' ? 'active' : ''}
    onClick={() => setActiveTab('results')}
  >
    Platform results
  </button>
  <button
    role="tab"
    aria-selected={activeTab === 'evidence'}
    className={activeTab === 'evidence' ? 'active' : ''}
    onClick={() => setActiveTab('evidence')}
  >
    Answer evidence
  </button>
  <button
    role="tab"
    aria-selected={activeTab === 'plan'}
    className={activeTab === 'plan' ? 'active' : ''}
    onClick={() => setActiveTab('plan')}
  >
    Content & distribution
  </button>
</nav>



{activeTab === 'results' && (
  <div className="av-panel">
<div className="av-table-wrap">
  <table className="av-platform-table">
    <caption className="av-sr">
      Illustrative visibility results for the selected buyer prompt.
    </caption>

    <thead>
      <tr>
        <th scope="col">Platform</th>
        <th scope="col">Ben’s presence</th>
        <th scope="col">Position</th>
        <th scope="col">Source</th>
      </tr>
    </thead>

    <tbody>
      {sel.results.map((result, index) => (
        <tr key={PLATFORMS[index].key}>
      <th scope="row">
  <span className="av-platform-name">
    <PlatformLogo platform={PLATFORMS[index].key} />
    <span>{PLATFORMS[index].name}</span>
  </span>
</th>

          <td>
            <span className="av-table-status">
              <i
                className={`d d-${result.s}`}
                aria-hidden="true"
              />
              {STATUS_LABEL[result.s]}
            </span>
          </td>

          <td>
            {result.pos ? (
              <RankStrip pos={result.pos} />
            ) : (
              '—'
            )}
          </td>

          <td>
            {result.cited ? (
              <span className="av-source-url">
                {result.cited}
              </span>
            ) : (
              '—'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


    <p className="av-result-count">
      Appears on {hits} of {PLATFORMS.length} platforms
      {' · '}
      Cited on {citedHits}
    </p>
  </div>
)}



{activeTab === 'evidence' && (
  <div className="av-panel">
    <div className="av-evidence-grid">
      {sel.results.map((result, index) => {
        if (result.s === 'absent') return null;

        return (
          <article
            className="av-evidence"
            key={PLATFORMS[index].key}
          >
            <header>
              <strong className="av-platform-name">
                <PlatformLogo platform={PLATFORMS[index].key} />
                <span>{PLATFORMS[index].name}</span>
              </strong>

              <span className={`av-status av-status--${result.s}`}>
                {STATUS_LABEL[result.s]}
              </span>
            </header>

            {result.said ? (
              <blockquote>
                <Highlight text={result.said} />
              </blockquote>
            ) : (
              <p className="av-evidence-missing">
                No sample excerpt recorded.
              </p>
            )}

            {result.also && result.also.length > 0 && (
              <div className="av-also">
                <span>Also named</span>
                <p>{result.also.join(' · ')}</p>
              </div>
            )}

            {result.gap && (
              <p className="av-gap">
                <strong>Gap</strong>
                {result.gap}
              </p>
            )}
          </article>
        );
      })}

      {hits === 0 && (
        <div className="av-no-evidence">
          <strong>No Ben mentions in this sample.</strong>
 
        </div>
      )}
    </div>
  </div>
)}


      {activeTab === 'plan' && (
        <div className="av-panel">
          <div className="av-improvement">
            <strong>What to improve</strong>
            <p>{sel.why}</p>
          </div>

          <div className="av-plan">
            <div>
              <div className="av-plan-label">Content to create or improve</div>
              <ul>
         
         
        
{sel.fix.map((f) => (
  <li key={f.title}>
    <em className={f.action === 'Create' ? 'create' : 'improve'}>
      {f.action}
    </em>

    <div className="av-fix-content">
      <strong className="av-fix-title">
        {f.title}
      </strong>

      <p className="av-fix-description">
        {f.text}
      </p>

      {f.ref && (
        <code className="av-fix-ref">
          {f.ref}
        </code>
      )}
    </div>
  </li>
))}




              </ul>
            </div>
            <div>
              <div className="av-plan-label">Authority &amp; distribution</div>
              <ul>
                {sel.moves.map((m) => (
                  <li key={m.title}>
                    <em className="move">{m.type}</em>
                    <div className="av-fix-content">
                      <strong className="av-fix-title">{m.title}</strong>
                      <p className="av-fix-description">{m.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}



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