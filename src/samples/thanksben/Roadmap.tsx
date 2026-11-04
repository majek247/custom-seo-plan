import { useId, useState } from 'react';
import ExcelJS from 'exceljs';
import './Roadmap.css';
 

type WorkType = 'Content' | 'Evidence' | 'Measurement';

type Page = {
  id: string;
  title: string;
  action: 'Create' | 'Improve';
  score: number;
  brief: string;
  evidence: string[];
  ready: string;
};

type Task = {
  id: string;
  title: string;
  subtitle: string;
  owner: string;
  timing: string;
  type: WorkType;
  pages: string[];
  why: string;
  needs: string[];
  ready: string;
};

type Phase = {
  days: string;
  title: string;
  summary: string;
  heading: string;
  tasks: Task[];
};

// Proposed production capacity: 10 page briefs; 9 new pages and 1 existing-page update.
// Scores below are the supplied planning scores, not measured performance.
export const ROADMAP_PAGES: Page[] = [
  {
    id: 'PR-09',
    title: 'Employee benefits platform cost per employee',
    action: 'Create',
    score: 83,
    brief:
      'Separate platform fees from the employee benefit budget. Show how headcount, countries, integrations and service scope change the effective cost per employee, using a worked example with explicit assumptions.',
    evidence: [
      'Approved fee components and exclusions',
      'Implementation and integration cost inputs',
      'Worked cost model with stated assumptions',
    ],
    ready:
      'Finance can distinguish recurring fees, one-off costs and benefit spend, then request a quote against a defined scope.',
  },
  {
    id: 'VS-12',
    title: 'Benefits administration software vs HRIS',
    action: 'Create',
    score: 81,
    brief:
      'Explain when an existing HRIS benefits module is sufficient and when a dedicated platform is justified. Compare eligibility, country rules, payroll handoffs and ownership of exceptions without assuming every buyer needs another system.',
    evidence: [
      'Approved product workflows and limitations',
      'Integration responsibilities and data handoffs',
      'Sourced comparison criteria',
    ],
    ready:
      'A technical reviewer can assess the extra capability against integration effort and ongoing system ownership.',
  },
  {
    id: 'ALT-13',
    title: 'Traditional benefits broker alternatives',
    action: 'Create',
    score: 81,
    brief:
      'Compare broker-led, platform-led and combined operating models. Separate advice, placement, administration and reporting; show what changes at renewal and which responsibilities still need a named owner.',
    evidence: [
      'Verified broker compatibility and service scope',
      'Responsibility matrix for each operating model',
      'Migration steps and renewal dependencies',
    ],
    ready:
      'Reward leaders can choose an operating model without mistaking software for regulated advice or assuming their broker must be replaced.',
  },
  {
    id: 'PR-07',
    title: 'Employee benefits administration software pricing',
    action: 'Create',
    score: 83,
    brief:
      'Explain pricing models, minimum commitments, implementation charges and contract exclusions. Provide a quote-comparison checklist; keep per-employee calculations on PR-09 and link to them instead of repeating the same article.',
    evidence: [
      'Dated, sourced vendor pricing disclosures',
      'Approved Ben pricing language',
      'Quote checklist covering services, support and contract terms',
    ],
    ready:
      'Procurement can compare like-for-like quotes and identify missing charges without relying on invented price ranges.',
  },
  {
    id: 'ALT-05',
    title: 'Reward Gateway alternatives',
    action: 'Create',
    score: 84,
    brief:
      'Organise alternatives around the reason for switching: administration, international coverage, payroll or employee experience. Check current vendor capabilities, state where staying may make sense, and make the migration effort explicit.',
    evidence: [
      'Current vendor sources and checked dates',
      'Approved Ben capabilities and limitations',
      'Switching requirements and customer evidence where available',
    ],
    ready:
      'Each alternative has a defensible fit, limitation and migration consideration, with a transparent comparison method.',
  },
  {
    id: 'BO-13',
    title: 'Best enterprise employee benefits platforms UK',
    action: 'Create',
    score: 80,
    brief:
      'Build a UK-enterprise shortlist around payroll, local support, procurement requirements and expansion into Europe. Distinguish UK suitability from global breadth and state which capabilities buyers must verify in a demo.',
    evidence: [
      'Verified UK capabilities and support scope',
      'UK customer evidence approved for use',
      'Sourced expansion and payroll criteria',
    ],
    ready:
      'A UK buyer can shortlist against local requirements and European expansion needs using a consistent evaluation framework.',
  },
  {
    id: 'BO-03',
    title: 'Best multinational employee benefits software',
    action: 'Create',
    score: 81,
    brief:
      'Focus on operating complexity: entity-level eligibility, local rules, currencies, permissions and payroll exceptions. Use a multinational scenario to expose how each shortlisted platform handles central governance with local variation.',
    evidence: [
      'Verified entity and country configuration examples',
      'Local eligibility and exception workflows',
      'Sourced vendor capability evidence',
    ],
    ready:
      'The article answers operational multinational requirements and has a distinct purpose from the broader global-platform shortlist.',
  },
  {
    id: 'FT-01',
    title: 'Employee benefits enrolment software',
    action: 'Improve',
    score: 82,
    brief:
      'Improve the existing enrolment page with product evidence for eligibility, life events, enrolment windows, approvals and payroll handoffs. Explain exception handling and show the workflow before asking visitors to book a demo.',
    evidence: [
      'Confirmed existing page URL and conversion baseline',
      'Approved screenshots of enrolment workflows',
      'Eligibility, life-event and payroll exception examples',
    ],
    ready:
      'The existing page demonstrates the enrolment workflow, answers implementation objections and has a tested demo route.',
  },
  {
    id: 'BO-01',
    title: 'Best global employee benefits platforms',
    action: 'Create',
    score: 83,
    brief:
      'Help Reward leaders build a global platform shortlist using country availability, governance, implementation and service scope. Publish transparent selection criteria and a practical scorecard, with explicit fit and non-fit notes.',
    evidence: [
      'Dated sources for country and service coverage',
      'Consistent comparison methodology',
      'Approved Ben proof and limitations',
    ],
    ready:
      'Readers can build a strategic global shortlist; detailed multi-entity administration is covered by BO-03 rather than duplicated.',
  },
  {
    id: 'BO-02',
    title: 'Best employee benefits administration software',
    action: 'Create',
    score: 82,
    brief:
      'Compare administration workflows: eligibility changes, approvals, reconciliation, reporting and audit trails. Structure the shortlist around Benefits Ops tasks, with a demo checklist that tests exception handling rather than feature labels.',
    evidence: [
      'Verified workflow-level vendor comparisons',
      'Approved product examples and reporting views',
      'Scenario-based administration demo checklist',
    ],
    ready:
      'Benefits Ops can test day-to-day administration requirements, with a clear link to the improved enrolment page.',
  },
];


export const TASK_HEADINGS: Record<
  string,
  {
    why: string;
    needs: string;
    ready?: string;
  }
> = {
  // DAYS 1–30: VALIDATE AND PREPARE

  '01': {
    why: 'Secure internal approval for the ten priority pages',
    needs: 'Approvals to secure',
    ready: 'Ready to proceed',
  },

  '02': {
    why: 'Know what performance looks like before publishing',
    needs: 'What to measure',
    ready: 'Tracking confirmed',
  },

  '03': {
    why: 'Resolve evidence gaps before writing begins',
    needs: 'What to gather',
    ready: 'Ready for production',
  },

  '04': {
    why: 'Turn the approved priorities into production-ready briefs',
    needs: 'What each brief needs',
    ready: 'Ten content briefs approved',
  },




  // DAYS 31–60: PUBLISH PRIORITY PAGES

  '05': {
    why: 'Move the first four priority pages into production',
    needs: 'What to complete before publishing',
    ready: 'First four pages published',
  },

  '06': {
    why: 'Complete the second publishing batch',
    needs: 'Production and review requirements',
    ready: 'Seven pages live and three ready for review',
  },

  '07': {
    why: 'Establish how the published pages are performing',
    needs: 'Performance checks',
    ready: 'Initial results reviewed',
  },






  // DAYS 61–90: DISTRIBUTE AND REFINE

  '08': {
    why: 'Complete the ten-page publishing programme',
    needs: 'Final launch checks',
    ready: 'All ten priorities delivered',
  },

  '09': {
    why: 'Make the new pages useful in sales conversations',
    needs: 'Sales enablement requirements',
    ready: 'Sales team equipped',
  },

  '10': {
    why: 'Compare current performance against your starting figures',
    needs: 'What to measure',
    ready: 'Outreach documented',
  },

  '11': {
    why: 'Decide where to focus your next 90 days',
    needs: 'What to prioritise',
    ready: 'Performance findings recorded',
  },

  '12': {
    why: 'Decide what to prioritise in the next 90 days',
    needs: 'Evidence for the next decisions',
    ready: 'Next 90-day plan approved',
  },

};

const ALL_IDS = ROADMAP_PAGES.map((page) => page.id);


const BATCH_1 = ALL_IDS.slice(0, 4);
const BATCH_2 = ALL_IDS.slice(4, 7);
const BATCH_3 = ALL_IDS.slice(7);
const PAGE_BY_ID = new Map(ROADMAP_PAGES.map((page) => [page.id, page]));

export const ROADMAP_PHASES: Phase[] = [
  {
    days: 'DAYS 1–30',
    title: 'Approve and prepare',
    summary: 'Secure approval, gather evidence and brief all ten pages.',
    heading: 'Days 1–30: approve, prepare and brief the priority pages',    tasks: [
      {
        id: '01',
title: 'Secure approval for the ten priority pages',
subtitle: 'Confirm budget, owners and publishing schedule',
        owner: 'SEO lead',
        timing: 'Week 1',
        type: 'Content',
        pages: ALL_IDS,
              why:
          "Present the proposed pages to your marketing, product and sales teams. Agree which pages to publish, confirm the business case for each, and secure internal approval before production begins.",
        needs: [
          'Confirm marketing leadership agrees with the proposed ten pages.',
          'Get Product and Sales to approve the recommended topics.',
          'Agree the publishing budget, responsibilities and timeline.',
        ],
        ready:
          'All ten priorities have internal approval, confirmed owners and an agreed production schedule.',
      },
      {
        id: '02',
        title: 'Set the measurement baseline',
        subtitle: 'Search, demo events and repeatable AI checks',
        owner: 'Analytics',
        timing: 'Week 1',
        type: 'Measurement',
        pages: ALL_IDS,
        why:
          'Before launching the new pages, establish how Ben currently performs in organic search, demo generation and AI recommendations. This gives the team a clear starting point for measuring progress over the next 90 days.',
        needs: [
          'Record current search visibility and traffic to relevant pages.',
          'Confirm demo enquiries are tracked through to sales opportunities',
          'Record where Ben appears across the ten AI buyer questions.',
        ],
        ready:
          'All reporting is working, starting figures are saved, and the team can measure changes after the ten priority pages are published.',
      },
      {
        id: '03',
title: 'Collect approved pricing and product information',
subtitle: 'Confirm commercial terms, features and competitor facts',
        owner: 'Product + Sales',
        timing: 'Weeks 1–2',
        type: 'Evidence',
        pages: ALL_IDS,
        why:
          'The ten pages will need accurate pricing information, confirmed product capabilities and reliable competitor details. Work with your internal team to gather the information writers need before production begins.',
        needs: [
          'Confirm pricing, additional charges and service inclusions with Sales.',
          'Collect product screenshots, supported integrations and country coverage from Product.',
          'Verify competitor information and approve claims used in comparisons.',
        ],
        ready:
          'The content team has the approved pricing, product details and competitor information needed to write all ten pages accurately.',
      },
      {
        id: '04',
        title: 'Prepare content briefs for all ten priority pages',
        subtitle: '9 new pages and 1 existing-page improvement',
        owner: 'Content lead',
        timing: 'Weeks 3–4',
        type: 'Content',
        pages: ALL_IDS,
        why:
          'Use the keyword research, competitor findings and buyer questions already covered in this plan to prepare a brief for each page. Give your writers clear direction on what to produce, which evidence to include and how each page should support buying decisions.',
        needs: [
          'Define a working title, target keyword, page structure and intended ICP.',
          'Identify the buyer questions, objections and competitor gaps each page must address.',
          'Specify the product evidence, internal links and next steps for visitors.',
          'Assign a writer, reviewer and agreed publishing deadline to each page.',
        ],
        ready:
          'All nine new pages and the existing-page improvement have clear writing instructions, approved requirements and assigned owners, ready for production.',
      },
    ],
  },


  {
    days: 'DAYS 31–60',
    title: 'Publish priority pages',
    summary: 'Publish seven pages and prepare the final three.',
    heading: 'Days 31–60: progress content towards publication',    tasks: [
      {
        id: '05',
        title: 'Write and publish the first four priority pages',
        subtitle: 'PR-09 · VS-12 · ALT-13 · PR-07',
        owner: 'Content + SEO',
        timing: 'Weeks 5–6',
        type: 'Content',
        pages: BATCH_1,
        why:
          'Begin with the two pricing pages, the HRIS comparison and traditional broker alternatives. Build each around the commercial information, product evidence and practical comparisons buyers need to evaluate Ben alongside other providers.',
        needs: [
          'Write all four pages using approved pricing, product details and competitor research.',
          'Get your Product and Sales teams to review all technical and commercial claims before publication.',
          'Add internal links, clear demo CTAs and working conversion tracking.',
          'Check mobile experience, page titles, indexing settings and final URLs.',
        ],
        ready:
          'All four pages are live, approved by your internal teams and linked from relevant existing pages. ',
      },
      {
        id: '06',
        title: 'Publish the next three pages and complete the final drafts',
        subtitle: 'ALT-05 · BO-13 · BO-03 · FT-01 · BO-01 · BO-02',
        owner: 'Content + SEO',
        timing: 'Weeks 6–8',
        type: 'Content',
        pages: [...BATCH_2, ...BATCH_3],
             why:
          "Publish the Reward Gateway alternatives, UK enterprise and multinational benefits software pages. In parallel, prepare the enrolment update and two remaining platform shortlists, with the product information and supporting evidence needed for internal approval.",
           needs: [
          'Write and publish the next three priority pages using the approved content briefs.',
          'Prepare the remaining three pages for review and publication.',
          'Coordinate all content reviews directly with your Marketing, Product and Sales teams.',
          'Finalise publishing dates, internal links and conversion tracking.',
        ],
        ready:
          'Seven priority pages are live. The enrolment update and two remaining comparisons have completed drafts, with reviewers assigned for final approval.',
      },
      {
        id: '07',
        title: 'Review early search and conversion performance',
        subtitle: 'Indexing, search visibility and demo enquiries',
        owner: 'Analytics + SEO',
        timing: 'Weeks 7–8',
        type: 'Measurement',
        pages: [...BATCH_1, ...BATCH_2],
                why:
          "Review the first seven pages to confirm they're indexed, attracting relevant visitors and tracking demo requests correctly. Address any technical or tracking problems before the next reporting cycle.",
        needs: [
          'Confirm all published pages are indexed and appearing for relevant searches.',
          'Test demo forms, internal links and CRM tracking.',
          'Compare initial traffic and demo enquiries against your starting figures.',
        ],
        ready:
          'All seven published pages have been checked for search visibility and working demo tracking. Any issues have been recorded and assigned for correction.',
      },
    ],
  },

  {
    days: 'DAYS 61–90',
    title: 'Distribute and refine',
    summary: 'Finish all ten priorities, support sales and review results.',
    heading: 'Days 61–90: complete, distribute and review',    tasks: [
      {
        id: '08',
        title: 'Publish the final three priorities',
        subtitle: 'Improve FT-01; create BO-01 and BO-02',
        owner: 'Content + SEO',
        timing: 'Weeks 9–10',
        type: 'Content',
        pages: BATCH_3,
              why:
          "Publish the enrolment page improvement alongside the global benefits platform and administration software shortlists. Connect them to relevant product pages so prospective buyers can move from evaluating providers to exploring Ben's capabilities.",
        needs: [
          'Approve and publish the three remaining pages.',
          'Add links to relevant product, pricing and comparison content.',
          'Verify demo CTAs, page functionality and conversion tracking.',
        ],
        ready:
          'Nine new pages and one existing-page improvement are live, reviewed and recorded in the measurement log.',
      },
      {
        id: '09',
        title: 'Integrate the priority pages into your sales process',
        subtitle: 'Match cost, switching and technical objections to an asset',
        owner: 'Sales enablement',
        timing: 'Weeks 9–11',
        type: 'Content',
        pages: ALL_IDS,
        why:
          'Share the completed pages with your Sales team and identify where they can support existing conversations. Focus on pricing discussions, competitor comparisons and product evaluation, using feedback from actual opportunities to identify any missing information.',
        needs: [
          'Map the published pages to common objections and buying stages',
          'Add approved content links to sales emails and CRM templates',
          'Ask Sales to flag missing information and recurring buyer concerns',
        ],
        ready:
          'Sales can find and share the right page; feedback is recorded against the relevant URL.',
      },
     
      {
        id: '10',
        title: 'Review changes in search and AI visibility',
        subtitle: 'Compare query fit, citations and qualified engagement',
        owner: 'Analytics + SEO',
        timing: 'Weeks 11–12',
        type: 'Measurement',
        pages: ALL_IDS,
        why:
          'Review how your published pages are performing in Google and whether Ben is appearing more frequently in relevant AI recommendations. Compare these findings with demo enquiries and sales opportunities to understand where visibility is improving and what still needs attention.',
           needs: [
          'Compare search rankings, relevant traffic and demo enquiries against the original baseline.',
          'Repeat the same AI buyer questions across all platforms assessed during the initial Week 1 baseline.',
          'Review changes in brand mentions, cited sources and CRM opportunities linked to your published content.',
        ],
        ready:
          'The review distinguishes observed changes, sample variability and signals too early to interpret.',
      },
      {
        id: '11',
        title: 'Review results and agree the next priorities',
        subtitle: 'Use buyer objections, query evidence and conversion friction',
        owner: 'SEO + Sales',
        timing: 'Days 85–90',
        type: 'Content',
        pages: ALL_IDS,
        why:
          'Use the search performance data, demo enquiries and Sales feedback collected during the programme to identify which pages need further improvements and which new opportunities deserve investment.',
           needs: [
          'Identify published pages that need improvements based on early performance',
          'Review recurring buyer objections and gaps raised by your Sales team',
          'Agree the next content priorities, responsible teams and delivery timelines',
        ],
        ready:
          'A ranked backlog identifies the next action, evidence needed, owner and reason for each recommendation.',
      },
    ],
  },
];

function Icon({ kind }: { kind: WorkType | 'Download' | 'Flag' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === 'Download' ? (
        <>
          <path d="M12 3v12m-4-4 4 4 4-4" />
          <path d="M4 16v5h16v-5" />
        </>
      ) : kind === 'Flag' ? (
        <>
          <path d="M5 22V3m0 1c5-5 9 5 15 0l-3 6 3 5c-6 5-10-5-15 0" />
        </>
      ) : kind === 'Measurement' ? (
        <>
          <path d="M4 20v-6h4v6zm6 0V8h4v12zm6 0V3h4v17z" />
        </>
      ) : kind === 'Evidence' ? (
        <>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
        </>
      ) : (
        <>
          <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h5" />
        </>
      )}
    </svg>
  );
}





async function downloadRoadmap() {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = 'GrowUp';
  workbook.title = 'Ben | 90-Day SEO Plan';

  const C = {
    navy: '011522',
    teal: '167273',
    mint: 'F3F9F5',
    white: 'FFFFFF',
    text: '011522'
  };

  // Preserve existing wording, only replace em dashes.
  const clean = (value: string) =>
    value.replace(/\u2014/g, ':');

  type CellValue = string | number;

  function addSheet(
    name: string,
    title: string,
    headers: string[],
    widths: number[],
    data: CellValue[][],
    rowHeight = 65
  ) {
    const sheet = workbook.addWorksheet(name, {
      views: [{ state: 'frozen', ySplit: 4 }]
    });

    sheet.columns = widths.map(width => ({ width }));

    const totalColumns = headers.length;

    sheet.mergeCells(1, 1, 1, totalColumns);

    const titleCell = sheet.getCell(1, 1);
    titleCell.value = title;
    titleCell.font = {
      name: 'Aptos',
      size: 18,
      bold: true,
      color: { argb: C.white }
    };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: C.navy }
    };
    titleCell.alignment = {
      vertical: 'middle',
      indent: 1
    };
    sheet.getRow(1).height = 46;

    sheet.mergeCells(2, 1, 2, totalColumns);
    sheet.getCell(2, 1).value =
      'GROWUP / BEN / 90-DAY SEO PLAN';

    sheet.getCell(2, 1).font = {
      name: 'Aptos',
      size: 10,
      bold: true,
      color: { argb: C.teal }
    };

    sheet.getRow(2).height = 30;

    const heading = sheet.getRow(4);
    heading.values = headers;
    heading.height = 34;

    heading.eachCell(cell => {
      cell.font = {
        name: 'Aptos',
        size: 10,
        bold: true,
        color: { argb: C.white }
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: C.teal }
      };
      cell.alignment = {
        vertical: 'middle',
        wrapText: true,
        indent: 1
      };
    });

    data.forEach((values, index) => {
      const row = sheet.addRow(
        values.map(v =>
          typeof v === 'string' ? clean(v) : v
        )
      );

      row.height = rowHeight;

      row.eachCell(cell => {
        cell.font = {
          name: 'Aptos',
          size: 10,
          color: { argb: C.text }
        };

        cell.alignment = {
          vertical: 'top',
          wrapText: true,
          indent: 1
        };

        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: index % 2 === 0 ? C.white : C.mint
          }
        };
      });
    });

    sheet.autoFilter = {
      from: { row: 4, column: 1 },
      to: {
        row: 4 + data.length,
        column: totalColumns
      }
    };

    return sheet;
  }

  // 01. OVERVIEW
  // Use the phase names and summaries from the website.
  addSheet(
    'Overview',
    '90-Day SEO Plan | Overview',
    ['Phase', 'Period', 'Focus', 'Tasks'],
    [35, 22, 75, 14],
    ROADMAP_PHASES.map((phase, index) => [
      `0${index + 1} / ${phase.title}`,
      phase.days,
      phase.summary,
      phase.tasks.length
    ]),
    55
  );

  // 02. ROADMAP
  // One row per task, with exact task names and owners.
  const roadmapSheet = addSheet(
    'Roadmap',
    '90-Day SEO Plan | Roadmap',
    [
      'Order',
      'Phase',
      'Deliverable',
      'Suggested Owner',
      'Timing',
      'Status'
    ],
    [12, 22, 75, 28, 22, 22],
    ROADMAP_PHASES.flatMap(phase =>
      phase.tasks.map(task => [
        task.id,
        phase.days,
        task.title,
        task.owner,
        task.timing,
        'Not started'
      ])
    ),
    48
  );

  // Editable status dropdown.
  for (let row = 5; row <= roadmapSheet.rowCount; row++) {
    roadmapSheet.getCell(`F${row}`).dataValidation = {
      type: 'list',
      allowBlank: false,
      formulae: [
        '"Not started,In progress,In review,Completed,Blocked"'
      ]
    };
  }

  // 03. PRIORITY PAGES
  // Only the existing page names, actions and scores.
  // No additional content directions or invented briefs.
  addSheet(
    'Priority Pages',
    '90-Day SEO Plan | Priority Pages',
    [
      'Priority',
      'Target Page',
      'Action',
      'Planning Score'
    ],
    [15, 80, 22, 22],
    ROADMAP_PAGES.map((page, index) => [
      index + 1,
      page.title,
      page.action,
      page.score
    ]),
    48
  );

  // 04. DELIVERY REQUIREMENTS
  // Use exact wording from the interactive roadmap.
  addSheet(
    'Delivery Requirements',
    '90-Day SEO Plan | Delivery Requirements',
    [
      'Order',
      'Phase',
      'Deliverable',
      'Section Heading',
      'Description',
      'Requirements Heading',
      'Requirements'
    ],
    [12, 20, 60, 60, 100, 45, 110],
    ROADMAP_PHASES.flatMap(phase =>
      phase.tasks.map(task => {
        const headings = TASK_HEADINGS[task.id];

        return [
          task.id,
          phase.days,
          task.title,
          headings?.why ?? 'Why this matters',
          task.why,
          headings?.needs ?? 'Delivery requirements',
          task.needs.join('\n')
        ];
      })
    ),
    145
  );


  // Download XLSX.
  const buffer = await workbook.xlsx.writeBuffer();


  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'Ben-90-Day-SEO-Plan.xlsx';

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}



/** Insert into the existing Ben page shell; the sidebar is intentionally not duplicated. */
export default function Roadmap({ id = 'roadmap' }: { id?: string }) {
  const uid = useId();
  const [phaseIndex, setPhaseIndex] = useState(0);

  const [selectedId, setSelectedId] = useState('01');


  const phase = ROADMAP_PHASES[phaseIndex];
  const visibleTasks = phase.tasks;
  const selected =
    visibleTasks.find((task) => task.id === selectedId) ?? visibleTasks[0];


  const selectedHeadings = selected
    ? TASK_HEADINGS[selected.id]
    : undefined;

  function changePhase(index: number) {
    setPhaseIndex(index);
    setSelectedId(ROADMAP_PHASES[index].tasks[0].id);
  }

  return (
    <section
      className="tb-page-section tb-pad rm-section"
      id={id}
      aria-labelledby={`${uid}-heading`}
    >
      <div className="tb-container rm-container">
        <header className="rm-intro">
          <div>
            <span className="rm-eyebrow">05 / 90-DAY ROADMAP</span>
            <h2 id={`${uid}-heading`}>What to prioritise over the next 90 days.</h2>
            <p>
This plan gives your team a defined publishing schedule for the ten priority pages, including who should approve the work, when content goes live and how you'll assess its initial commercial contribution.
            </p>
          </div>
          <button type="button" className="rm-download" onClick={downloadRoadmap}>
            <Icon kind="Download" />
            Download Excel plan<span className="rm-sr"> as XLSX</span>
          </button>
        </header>

  

        <div className="rm-phases" role="group" aria-label="Choose a roadmap phase">
          {ROADMAP_PHASES.map((item, index) => (
            <button
              type="button"
              key={item.days}
              className={`rm-phase${phaseIndex === index ? ' is-active' : ''}`}
              aria-pressed={phaseIndex === index}
              aria-controls={`${uid}-workspace`}
              onClick={() => changePhase(index)}
            >
              <span className="rm-eyebrow">
                0{index + 1} · {item.days}
              </span>
              <strong>{item.title}</strong>
              <span>{item.summary}</span>
            </button>
          ))}
        </div>

        <div className="rm-workspace" id={`${uid}-workspace`}>
          <div className="rm-list-card">
            <div className="rm-list-heading">
              <h3>{phase.heading}</h3>
              <span className="rm-badge">{visibleTasks.length} tasks</span>
            </div>

            <div className="rm-table-labels" aria-hidden="true">
              <span>Order</span>
              <span>Deliverable</span>
              <span>Suggested owner</span>
              <span>Timing</span>
            </div>
            <div className="rm-task-list" role="group" aria-label="Select a task">
              {visibleTasks.length === 0 ? (
                <p className="rm-empty">No tasks in this phase.</p>
              ) : (
                visibleTasks.map((task) => (
                  <button
                    type="button"
                    className={`rm-task${task.id === selected?.id ? ' is-active' : ''}`}
                    key={task.id}
                    onClick={() => {
                      setSelectedId(task.id);
                    }}
                    aria-pressed={task.id === selected?.id}
                    aria-controls={`${uid}-detail`}
                  >
                    <span className="rm-order">{task.id}</span>
                    <span className="rm-task-main">
                      <Icon kind={task.type} />
                    
            
<span>
  <strong>{task.title}</strong>
</span>



                    </span>
                    <span className="rm-owner">
                      <span className="rm-sr">Suggested owner: </span>
                      {task.owner}
                    </span>
                    <span className="rm-timing">{task.timing}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          <aside
            className="rm-detail"
            id={`${uid}-detail`}
            aria-label="Selected task details"
            aria-live="polite"
          >
            {selected ? (
              <>
                <span className="rm-eyebrow">
                  {selected.id} /{' '}
                  {selected.type === 'Content'
                    ? 'CONTENT DELIVERY'
                    : selected.type.toUpperCase()}
                </span>
                <h3>{selected.title}</h3>



<div className="rm-tags">
  <span>{selected.timing}</span>
</div>



                <h4>{selectedHeadings?.why ?? 'Why this matters'}</h4>
                <p style={{ color: '#011522' }}>{selected.why}</p>

                <h4>{selectedHeadings?.needs ?? 'Delivery requirements'}</h4>
                <ul className="rm-needs">
                  {selected.needs.map((need) => (
                    <li key={need} style={{ color: '#011522' }}>
                      {need}
                    </li>
                  ))}
                </ul>

              </>
            ) : (
              <p className="rm-empty">
                Choose a work type with tasks to view the delivery brief.
              </p>
            )}
          </aside>
        </div>


      </div>
    </section>
  );
}