import { useId, useState } from 'react';
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
  review: string;
  next: string;
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

const ALL_IDS = ROADMAP_PAGES.map((page) => page.id);
const BATCH_1 = ALL_IDS.slice(0, 4);
const BATCH_2 = ALL_IDS.slice(4, 7);
const BATCH_3 = ALL_IDS.slice(7);
const PAGE_BY_ID = new Map(ROADMAP_PAGES.map((page) => [page.id, page]));

export const ROADMAP_PHASES: Phase[] = [
  {
    days: 'DAYS 1–30',
    title: 'Validate and prepare',
    summary: 'Confirm priorities, gather evidence, brief all ten pages.',
    heading: 'Days 1–30: establish the publishing queue',
    review:
      'Approve ten distinct briefs, confirm evidence owners and sign off tracking before production.',
    next: 'Next: publish the first four pages; draft the next three.',
    tasks: [
      {
        id: '01',
        title: 'Validate the ten-page shortlist',
        subtitle: 'Check intent, existing URLs and overlap',
        owner: 'SEO lead',
        timing: 'Week 1',
        type: 'Content',
        pages: ALL_IDS,
        why:
          'The priority score does not settle page scope. Check the two pricing themes and four shortlist themes against current search intent before commissioning overlapping pages.',
        needs: [
          'Review existing URLs and Search Console queries',
          'Confirm distinct intent for PR-09 vs PR-07 and each best-of page',
          'Confirm FT-01 as an existing-page improvement',
        ],
        ready:
          'Each theme has a target URL, distinct scope and action. If intent overlaps, agree a consolidated page before production.',
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
          'A baseline makes later changes interpretable. Existing AI sample answers must be replaced by dated observations before they are used to assess progress.',
        needs: [
          'Record current query and landing-page performance',
          'Test demo starts, completions and CRM attribution where available',
          'Log the 20 prompts with platform, date, geography and sources',
        ],
        ready:
          'Tracking works end to end, baseline exports are saved and AI checks can be repeated under comparable conditions.',
      },
      {
        id: '03',
        title: 'Gather pricing and product evidence',
        subtitle: 'Fees, workflows, country scope and approved claims',
        owner: 'Product + Sales',
        timing: 'Weeks 1–2',
        type: 'Evidence',
        pages: ALL_IDS,
        why:
          'The cost guides need approved commercial inputs; comparisons need sourced vendor facts; shortlist and enrolment pages need product proof. Missing evidence should be visible before writing starts.',
        needs: [
          'Assign an approver for pricing and service boundaries',
          'Collect screenshots, integration scope and country limitations',
          'Create a dated vendor-source register and approval log',
        ],
        ready:
          'Every planned claim has a source or an assigned evidence owner. Unsupported claims are removed or clearly bounded.',
      },
      {
        id: '04',
        title: 'Brief the cost and comparison pages',
        subtitle: 'PR-09 · VS-12 · ALT-13 · PR-07',
        owner: 'Content lead',
        timing: 'Week 3',
        type: 'Content',
        pages: BATCH_1,
        why:
          'Start with cost, system choice and broker responsibilities: questions that prevent buyers from defining a viable scope or progressing a procurement conversation.',
        needs: [
          'Use PR-09 for cost calculations and PR-07 for pricing models',
          'Define HRIS and broker responsibility boundaries',
          'Agree the evidence, CTA and internal links for each brief',
        ],
        ready:
          'Four approved briefs have distinct buyer questions, sourced evidence requirements and a defined conversion route.',
      },
      {
        id: '05',
        title: 'Brief alternatives and regional shortlists',
        subtitle: 'ALT-05 · BO-13 · BO-03',
        owner: 'Content lead',
        timing: 'Week 4',
        type: 'Content',
        pages: BATCH_2,
        why:
          'These pages address three different triggers: replacing an incumbent, buying for a UK enterprise and operating across multiple entities. Their evaluation criteria must reflect those differences.',
        needs: [
          'Verify current competitor claims and switching requirements',
          'Separate UK procurement needs from multinational operations',
          'Agree honest fit and non-fit criteria for each shortlist',
        ],
        ready:
          'Three briefs specify the audience, selection method, product evidence and review owner.',
      },
      {
        id: '06',
        title: 'Brief enrolment and broader shortlists',
        subtitle: 'FT-01 · BO-01 · BO-02',
        owner: 'Content lead',
        timing: 'Week 4',
        type: 'Content',
        pages: BATCH_3,
        why:
          'The existing enrolment page needs concrete workflow evidence. The global shortlist serves strategic selection; the administration shortlist serves day-to-day operations.',
        needs: [
          'Confirm the FT-01 URL and screenshot requirements',
          'Separate global platform selection from administration workflows',
          'Plan links from comparison guides to the relevant product page',
        ],
        ready:
          'The FT-01 update brief and two new-page briefs complete coverage of all ten priority themes.',
      },
    ],
  },
  {
    days: 'DAYS 31–60',
    title: 'Publish priority pages',
    summary: 'Launch the first seven pages and prepare the final batch.',
    heading: 'Days 31–60: publish the first seven pages',
    review:
      'Check seven published pages for accuracy, indexability, internal links and working demo paths.',
    next: 'Next: update enrolment, publish two shortlists and distribute.',
    tasks: [
      {
        id: '07',
        title: 'Draft the first four priority pages',
        subtitle: 'Cost, HRIS comparison, broker alternatives and pricing',
        owner: 'Content lead',
        timing: 'Weeks 5–6',
        type: 'Content',
        pages: BATCH_1,
        why:
          'Turn the approved briefs into useful buying tools: a cost model, a system decision framework, a broker responsibility matrix and a quote checklist.',
        needs: [
          'Approved first-batch briefs and evidence',
          'Named Product and Sales reviewers',
          'Clear cross-links between both pricing pages',
        ],
        ready:
          'Four drafts answer their assigned buyer questions and every commercial claim has a source.',
      },
      {
        id: '08',
        title: 'Review and publish the first batch',
        subtitle: 'Launch PR-09, VS-12, ALT-13 and PR-07',
        owner: 'SEO + Product',
        timing: 'Week 6',
        type: 'Content',
        pages: BATCH_1,
        why:
          'Review must resolve factual objections as well as editorial quality. Launch only after scope, vendor facts and conversion paths are checked.',
        needs: [
          'Product approval and dated competitor checks',
          'Titles, canonicals and indexability checks',
          'Relevant internal links and tested demo events',
        ],
        ready:
          'Four pages are live, linked from relevant existing content and included in the performance log.',
      },
      {
        id: '09',
        title: 'Draft and publish the next three pages',
        subtitle: 'ALT-05 · BO-13 · BO-03',
        owner: 'Content + SEO',
        timing: 'Weeks 6–8',
        type: 'Content',
        pages: BATCH_2,
        why:
          'Use the approved switching, UK-enterprise and multinational briefs to extend coverage without recycling the same shortlist under different titles.',
        needs: [
          'Signed-off second-batch briefs',
          'Sourced vendor comparisons and transparent selection criteria',
          'Editorial, product and conversion QA',
        ],
        ready:
          'Three further pages are live with distinct scopes, dated sources and links to the relevant cost and product content.',
      },
      {
        id: '10',
        title: 'Prepare enrolment and the final shortlists',
        subtitle: 'FT-01 · BO-01 · BO-02',
        owner: 'Content + Product',
        timing: 'Weeks 7–8',
        type: 'Content',
        pages: BATCH_3,
        why:
          'Prepare the remaining work while the first pages are being reviewed. Enrolment screenshots and operational examples can also support the administration shortlist.',
        needs: [
          'Approved FT-01 screenshots and workflow descriptions',
          'Global evaluation scorecard and administration demo checklist',
          'Final review slots reserved with Product',
        ],
        ready:
          'The enrolment update and two new shortlist drafts are ready for review in week nine.',
      },
      {
        id: '11',
        title: 'Check the first publishing batch',
        subtitle: 'Indexing, query fit, internal links and demo paths',
        owner: 'Analytics + SEO',
        timing: 'Weeks 7–8',
        type: 'Measurement',
        pages: [...BATCH_1, ...BATCH_2],
        why:
          'Early checks should find technical or intent problems, not declare a revenue result before pages have had time to be discovered and used.',
        needs: [
          'Live URLs and publishing dates',
          'Search Console indexing and query checks',
          'Demo event tests and internal-link review',
        ],
        ready:
          'Technical issues are fixed, early query mismatches are logged and later comparisons use the original baseline.',
      },
    ],
  },
  {
    days: 'DAYS 61–90',
    title: 'Distribute and refine',
    summary: 'Finish all ten priorities, support sales and review results.',
    heading: 'Days 61–90: complete, distribute and review',
    review:
      'Review nine new pages and the enrolment update. Prioritise the next sprint using evidence and remaining buyer objections.',
    next: 'Next: agree the next 90-day backlog from observed results.',
    tasks: [
      {
        id: '12',
        title: 'Publish the final three priorities',
        subtitle: 'Improve FT-01; create BO-01 and BO-02',
        owner: 'Content + SEO',
        timing: 'Weeks 9–10',
        type: 'Content',
        pages: BATCH_3,
        why:
          'Complete the planned scope with the enrolment improvement and two distinct shortlists, then connect them to the cost and comparison pages already published.',
        needs: [
          'Approved final-batch drafts',
          'Tested enrolment-page demo path',
          'Cross-links checked across all ten priorities',
        ],
        ready:
          'Nine new pages and one existing-page improvement are live, reviewed and recorded in the measurement log.',
      },
      {
        id: '13',
        title: 'Put the pages into sales conversations',
        subtitle: 'Match cost, switching and technical objections to an asset',
        owner: 'Sales enablement',
        timing: 'Weeks 9–11',
        type: 'Content',
        pages: ALL_IDS,
        why:
          'Pages should help active opportunities as well as search visitors. Sales needs to know which asset answers each objection and when to use it.',
        needs: [
          'One-page asset index grouped by buyer objection',
          'Approved follow-up snippets and relevant CRM links',
          'A route for AEs to flag unanswered buyer questions',
        ],
        ready:
          'Sales can find and share the right page; feedback is recorded against the relevant URL.',
      },
      {
        id: '14',
        title: 'Distribute the supporting evidence',
        subtitle: 'Scorecards, worked examples and sourced frameworks',
        owner: 'Marketing + Partners',
        timing: 'Weeks 10–12',
        type: 'Evidence',
        pages: ALL_IDS,
        why:
          'Useful supporting material gives relevant partners and publications something specific to reference. Distribution should follow the audience and evidence, not a generic backlink quota.',
        needs: [
          'Approved scorecards and worked examples',
          'Relevant partner, community and publication shortlist',
          'Transparent authorship and accurate company profiles',
        ],
        ready:
          'Outreach and responses are logged; earned references are verified without promising links, placements or AI mentions.',
      },
      {
        id: '15',
        title: 'Repeat search and AI visibility checks',
        subtitle: 'Compare query fit, citations and qualified engagement',
        owner: 'Analytics + SEO',
        timing: 'Weeks 11–12',
        type: 'Measurement',
        pages: ALL_IDS,
        why:
          'Repeat the original prompt set and inspect the actual sources. Separate changes in visibility from evidence of buyer engagement and pipeline contribution.',
        needs: [
          'Same prompt set, platforms and comparable geography',
          'Dated answer captures and cited URLs',
          'Search, demo and CRM data where available',
        ],
        ready:
          'The review distinguishes observed changes, sample variability and signals too early to interpret.',
      },
      {
        id: '16',
        title: 'Refine pages and agree the next sprint',
        subtitle: 'Use buyer objections, query evidence and conversion friction',
        owner: 'SEO + Sales',
        timing: 'Days 85–90',
        type: 'Content',
        pages: ALL_IDS,
        why:
          'The next sprint should follow what buyers still cannot resolve. Improve weak answers and conversion paths before expanding into another large publishing list.',
        needs: [
          'Page-level observations and sales feedback',
          'Overlap, indexability and conversion review',
          'Confirmed writing and review capacity',
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

function downloadRoadmap() {
  const rows: string[][] = [
    [
      'Phase',
      'Order',
      'Deliverable',
      'Work type',
      'Suggested owner',
      'Timing',
      'Page ID',
      'Priority page',
      'Action',
      'Planning score',
      'Why now',
      'Dependencies',
      'Ready when',
      'Page brief',
      'Page evidence',
      'Page acceptance',
    ],
  ];

  ROADMAP_PHASES.forEach((phase) =>
    phase.tasks.forEach((task) =>
      task.pages.forEach((id) => {
        const page = PAGE_BY_ID.get(id)!;
        rows.push([
          phase.days,
          task.id,
          task.title,
          task.type,
          task.owner,
          task.timing,
          id,
          page.title,
          page.action,
          String(page.score),
          task.why,
          task.needs.join(' | '),
          task.ready,
          page.brief,
          page.evidence.join(' | '),
          page.ready,
        ]);
      })
    )
  );

  const csv =
    '\uFEFF' +
    rows
      .map((row) =>
        row.map((value) => '"' + value.replace(/"/g, '""') + '"').join(',')
      )
      .join('\r\n');

  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Ben-90-day-roadmap.csv';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Insert into the existing Ben page shell; the sidebar is intentionally not duplicated. */
export default function Roadmap({ id = 'roadmap' }: { id?: string }) {
  const uid = useId();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [filter, setFilter] = useState<WorkType | 'All work'>('All work');
  const [selectedId, setSelectedId] = useState('04');
  const [showPages, setShowPages] = useState(false);

  const phase = ROADMAP_PHASES[phaseIndex];
  const visibleTasks = phase.tasks.filter(
    (task) => filter === 'All work' || task.type === filter
  );
  const selected =
    visibleTasks.find((task) => task.id === selectedId) ?? visibleTasks[0];

  function changePhase(index: number) {
    setPhaseIndex(index);
    setFilter('All work');
    setSelectedId(ROADMAP_PHASES[index].tasks[0].id);
    setShowPages(false);
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
              Sequence the work by buyer need, dependencies and publishing capacity. Each
              phase ends with a clear review point.
            </p>
          </div>
          <button type="button" className="rm-download" onClick={downloadRoadmap}>
            <Icon kind="Download" />
            Download roadmap<span className="rm-sr"> as CSV</span>
          </button>
        </header>

        <p className="rm-note">
          <strong>Proposed sequence</strong>
          <span aria-hidden="true"> · </span>Confirm capacity before kickoff
          <span className="rm-scope">9 new pages + 1 improvement</span>
        </p>

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
            <div className="rm-filters" role="group" aria-label="Filter work">
              {(['All work', 'Content', 'Evidence', 'Measurement'] as const).map(
                (item) => (
                  <button
                    type="button"
                    key={item}
                    aria-pressed={filter === item}
                    className={filter === item ? 'is-active' : ''}
                    onClick={() => {
                      setFilter(item);
                      setShowPages(false);
                    }}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            <div className="rm-table-labels" aria-hidden="true">
              <span>Order</span>
              <span>Deliverable</span>
              <span>Suggested owner</span>
              <span>Timing</span>
            </div>
            <div className="rm-task-list" role="group" aria-label="Select a task">
              {visibleTasks.length === 0 ? (
                <p className="rm-empty">
                  No {filter.toLowerCase()} tasks in this phase.{' '}
                  <button type="button" onClick={() => setFilter('All work')}>
                    Show all work
                  </button>
                </p>
              ) : (
                visibleTasks.map((task) => (
                  <button
                    type="button"
                    className={`rm-task${task.id === selected?.id ? ' is-active' : ''}`}
                    key={task.id}
                    onClick={() => {
                      setSelectedId(task.id);
                      setShowPages(false);
                    }}
                    aria-pressed={task.id === selected?.id}
                    aria-controls={`${uid}-detail`}
                  >
                    <span className="rm-order">{task.id}</span>
                    <span className="rm-task-main">
                      <Icon kind={task.type} />
                      <span>
                        <strong>{task.title}</strong>
                        <small>{task.subtitle}</small>
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
                  {selected.pages.length === 10 ? (
                    <span>All 10 priority pages</span>
                  ) : (
                    selected.pages.map((pageId) => <span key={pageId}>{pageId}</span>)
                  )}
                  <span>{selected.timing}</span>
                </div>
                <h4>Why this comes {phaseIndex === 0 ? 'first' : 'next'}</h4>
                <p>{selected.why}</p>
                <h4>Required before delivery</h4>
                <ul className="rm-needs">
                  {selected.needs.map((need) => (
                    <li key={need}>{need}</li>
                  ))}
                </ul>
                <div className="rm-ready">
                  <h4>Ready when</h4>
                  <p>{selected.ready}</p>
                </div>
                <button
                  type="button"
                  className="rm-detail-toggle"
                  aria-expanded={showPages}
                  aria-controls={`${uid}-pages`}
                  onClick={() => setShowPages(!showPages)}
                >
                  {showPages ? 'Hide page briefs' : `View ${selected.pages.length} page briefs`}
                  <span aria-hidden="true">{showPages ? '−' : '↗'}</span>
                </button>
                <div id={`${uid}-pages`} hidden={!showPages} className="rm-page-briefs">
                  {selected.pages.map((pageId) => {
                    const page = PAGE_BY_ID.get(pageId)!;
                    return (
                      <article className="rm-page-brief" key={page.id}>
                        <div className="rm-page-meta">
                          <span>
                            {page.id} · {page.action}
                          </span>
                          <span>Score {page.score}/100</span>
                        </div>
                        <h4>{page.title}</h4>
                        <p>{page.brief}</p>
                        <h5>Evidence needed</h5>
                        <ul className="rm-needs">
                          {page.evidence.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <h5>Acceptance check</h5>
                        <p>{page.ready}</p>
                      </article>
                    );
                  })}
                  <p className="rm-score-note">
                    Scores are supplied planning estimates, not measured results.
                  </p>
                </div>
              </>
            ) : (
              <p className="rm-empty">
                Choose a work type with tasks to view the delivery brief.
              </p>
            )}
          </aside>
        </div>

        <footer className="rm-review">
          <Icon kind="Flag" />
          <strong>
            Day {phaseIndex === 0 ? '30' : phaseIndex === 1 ? '60' : '90'} review
          </strong>
          <p>{phase.review}</p>
          <span>{phase.next}</span>
        </footer>
      </div>
    </section>
  );
}