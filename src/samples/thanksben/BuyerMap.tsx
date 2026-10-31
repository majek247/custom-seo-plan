import { useState } from 'react';
import './BuyerMap.css';

type Stage = 'Problem-aware' | 'Solution-aware' | 'Vendor evaluation';
type Persona = {
  short: string;
  role: string;
  dealRole: string;
  titles: string;
  jtbd: { when: string; want: string; so: string };
  triggers: string[];
  searches: { stage: Stage; queries: string[]; lands: string }[];
  find: { label: string; items: string }[];
  filters: [string, string][];
  boolean: string[];
  tip: string;
  distrust: string;
  assets: { action: 'Create' | 'Improve'; name: string }[];
};

 

const personas: Persona[] = [
  {
    short: 'Head of Reward',
    role: 'Global Head of Reward / Total Rewards',
    dealRole: 'Champion · owns the programme',
    titles:
      'Head of Reward, Global Head of Total Rewards, Director of Compensation & Benefits, VP Total Rewards, Global Benefits Director',
    jtbd: {
      when: 'I inherit a patchwork of local benefit vendors across 20+ countries',
      want: 'one programme I can configure and report on centrally',
      so: 'I can stop firefighting and prove to my CHRO and CFO that the strategy works',
    },
    triggers: [
      'A broker or vendor contract is 12–18 months from renewal',
      'M&A adds new entities with their own benefits',
      'CHRO asks for harmonisation, or the survey shows nobody knows what benefits they have',
      'A payroll error gets escalated to leadership',
    ],
    searches: [
      {
        stage: 'Problem-aware',
        queries: [
          'how to harmonise benefits across countries',
          'global benefits strategy framework',
          'employee benefits by country comparison',
          'benefits benchmarking by country',
          'how to run employee benefits in multiple countries',
        ],
        lands:
          'Benefits benchmarking, country guides, new harmonisation playbook',
      },
      {
        stage: 'Solution-aware',
        queries: [
          'global benefits management platform',
          'global benefits administration software',
          'benefits platform for multinational companies',
          'multi entity benefits management',
        ],
        lands: '/benefits-management, /global-workforce',
      },
      {
        stage: 'Vendor evaluation',
        queries: [
          'Benefex alternatives',
          'Benify alternatives',
          'global benefits platform comparison',
          'benefits platform RFP template',
          'benefits platform RFP questions',
        ],
        lands: '/rfp, new comparison and scorecard pages',
      },
    ],
    find: [
      {
        label: 'Events',
        items:
          'Employee Benefits Live (UK), WorldatWork Total Rewards (US), UNLEASH, plus Ben’s own roundtables and briefings',
      },
      {
        label: 'Communities',
        items:
          'Reward & Employee Benefits Association (REBA), LinkedIn Groups for “total rewards” and “compensation & benefits”, r/humanresources',
      },
      {
        label: 'Reading',
        items:
          'Employee Benefits magazine, HR Magazine, Personnel Today, plus Mercer / WTW / Aon / Gallagher benchmark reports they cite in decks',
      },
      {
        label: 'Search research',
        items:
          'Reddit and LinkedIn threads under “benefits across countries”; People Also Ask for the problem-aware queries above',
      },
    ],
    filters: [
      ['Seniority level', 'Director, Vice President, CXO'],
      ['Function', 'Human Resources'],
      ['Company headcount', '5,001–10,000 and 10,001+'],
      [
        'Geography',
        'Start with UK, Germany, Netherlands, France, Ireland, US; then add by customer wins',
      ],
      [
        'Years in current position',
        'Less than 1 year, 1–2 years (new leaders re-evaluate vendors)',
      ],
      [
        'Spotlight',
        'Changed jobs in last 90 days; Posted on LinkedIn in last 30 days',
      ],
      ['Keywords', '“global benefits” OR “total rewards”'],
    ],
    boolean: [
      '("Head of Reward" OR "Global Reward" OR "Total Rewards" OR "Head of Compensation and Benefits" OR "Global Benefits" OR "Reward and Benefits") NOT (intern OR assistant OR coordinator OR recruiter)',
    ],
    tip: 'Save as a lead list, then switch on “Posted on LinkedIn”. Anyone commenting on benefits-benchmark or conference posts is in-market and worth a content-led touch.',
    distrust:
      'Platforms that claim “global coverage” through a patchwork of local partners, and vendor pages that list countries without showing how rules are configured.',
    assets: [
      {
        action: 'Improve',
        name: 'Benefits management page: show multi-entity configuration with screenshots',
      },
      {
        action: 'Create',
        name: 'Global benefits harmonisation playbook with a country-by-country policy template',
      },
      {
        action: 'Improve',
        name: 'Benefits benchmarking: add decision guidance, not just data',
      },
      {
        action: 'Create',
        name: 'Extend /rfp into a downloadable vendor scorecard',
      },
    ],
  },
  {
    short: 'Benefits Ops',
    role: 'Global Benefits Manager / Benefits Operations',
    dealRole: 'Operator · lives in the tool daily',
    titles:
      'Global Benefits Manager, Benefits Operations Lead, Benefits Specialist, HR Operations Manager, People Ops Manager, Head of Colleague Experience',
    jtbd: {
      when: 'enrolment windows and life events hit across several countries at once',
      want: 'eligibility and enrolment to run themselves',
      so: 'I stop answering the same HR tickets and stop fixing spreadsheets before payroll cut-off',
    },
    triggers: [
      'Open enrolment season is six to eight weeks away',
      'A new country launches and local eligibility rules differ',
      'Ticket volume about “what benefits do I have” keeps climbing',
      'A provider change breaks a manual process nobody documented',
    ],
    searches: [
      {
        stage: 'Problem-aware',
        queries: [
          'benefits eligibility rules by country spreadsheet',
          'open enrolment checklist multinational',
          'how to manage benefits enrolment across countries',
          'life event change benefits payroll process',
          'reduce HR tickets about benefits',
        ],
        lands: 'New enrolment checklist and eligibility matrix templates',
      },
      {
        stage: 'Solution-aware',
        queries: [
          'benefits administration software',
          'self service benefits enrolment platform',
          'benefits management software for HR teams',
          'employee benefits portal mobile deskless',
        ],
        lands:
          '/products/benefits-management-enrolment, /benefits-experience, /mixed-workforce',
      },
      {
        stage: 'Vendor evaluation',
        queries: [
          'benefits platform workday integration',
          'benefits platform successfactors integration',
          'benefits platform implementation timeline',
          'benefits platform demo',
        ],
        lands: 'New HRIS integration guides and implementation page',
      },
    ],
    find: [
      {
        label: 'Communities',
        items:
          'r/humanresources, CIPD community and branch events (UK), SHRM Connect (US), Workday and SuccessFactors user groups',
      },
      {
        label: 'Events',
        items:
          'Open-enrolment webinars from brokers and consultancies, plus HR operations meetups; Ben’s own webinars and briefings',
      },
      {
        label: 'Where they actually post',
        items:
          'Rarely on LinkedIn. Find them via the company page: People tab, then search “benefits” and filter by HR function',
      },
      {
        label: 'Search research',
        items:
          'Reddit threads on “benefits admin nightmare” or “enrolment errors”; use their wording as H2s',
      },
    ],
    filters: [
      ['Seniority level', 'Experienced Manager, Director, Senior'],
      ['Function', 'Human Resources, Operations'],
      ['Company headcount', '1,001–5,000 and 5,001–10,000 and 10,001+'],
      ['Geography', 'Match the account list from the Head of Reward search'],
      [
        'Years in current position',
        'No filter. Operators stay put, so you’ll miss them if you restrict',
      ],
      [
        'Keywords',
        '“benefits administration” OR enrolment OR “benefits operations”',
      ],
      [
        'Groups',
        'Employee benefits, HR operations and HR shared services groups',
      ],
    ],
    boolean: [
      '("Benefits Manager" OR "Benefits Operations" OR "Benefits Lead" OR "Benefits Specialist" OR "HR Operations Manager" OR "People Operations Manager" OR "Colleague Experience") NOT (intern OR recruiter)',
    ],
    tip: 'Run this against the accounts the Head of Reward search already surfaced. Use Sales Navigator’s “Saved accounts” so you’re matching people to confirmed ICP companies, not the whole market.',
    distrust:
      'Demos that skip the ugly parts: exception handling, mid-month changes, and what happens when a data feed arrives wrong.',
    assets: [
      {
        action: 'Create',
        name: 'Open-enrolment checklist for multinational teams',
      },
      {
        action: 'Create',
        name: 'Eligibility rules matrix template (by entity, grade, country)',
      },
      {
        action: 'Improve',
        name: 'Enrolment and benefits management module page',
      },
      {
        action: 'Create',
        name: 'HRIS integration guides: Workday, SAP SuccessFactors, Oracle HCM, HiBob',
      },
    ],
  },
  {
    short: 'Payroll',
    role: 'Global Payroll Manager',
    dealRole: 'Gatekeeper · can quietly kill the deal',
    titles:
      'Global Payroll Manager, Head of Payroll, Payroll Operations Lead, Payroll Director, Payroll Transformation Lead',
    jtbd: {
      when: 'benefit changes feed into payroll every month from several systems',
      want: 'clean, validated deduction data before cut-off',
      so: 'I don’t spend payday week reconciling and don’t own the error when someone’s pay is wrong',
    },
    triggers: [
      'A payroll error escalated to HR leadership or the CFO',
      'A new benefit with salary deductions is about to go live',
      'Payroll provider change or consolidation',
      'Year-end audit finds unreconciled benefits deductions',
    ],
    searches: [
      {
        stage: 'Problem-aware',
        queries: [
          'benefits deductions payroll reconciliation',
          'benefits payroll errors causes',
          'salary sacrifice payroll process',
          'benefits in kind payroll reporting by country',
          'benefits payroll file format',
        ],
        lands: 'New reconciliation workflow and payroll file checklist',
      },
      {
        stage: 'Solution-aware',
        queries: [
          'benefits platform payroll integration',
          'benefits management software payroll reconciliation',
          'automate benefits payroll deductions',
        ],
        lands:
          '/benefits-management (payroll reconciliation section), new workflow page',
      },
      {
        stage: 'Vendor evaluation',
        queries: [
          'benefits payroll integration ADP',
          'benefits platform payroll data validation',
          'benefits payroll cut-off timeline',
        ],
        lands: 'New payroll integration and validation page',
      },
    ],
    find: [
      {
        label: 'Communities',
        items:
          'CIPP (UK), Payroll World, r/Payroll, LinkedIn Groups for global payroll',
      },
      {
        label: 'Events',
        items:
          'Payroll vendor client conferences (ADP, Dayforce, Zalaris), CIPP events, global payroll roundtables',
      },
      {
        label: 'Where they sit',
        items:
          'Payroll reports into Finance at some companies and HR at others, so run two saved searches',
      },
      {
        label: 'Search research',
        items:
          'r/Payroll threads on benefit deductions and garnishments show the exact error language to mirror',
      },
    ],
    filters: [
      ['Seniority level', 'Experienced Manager, Director, Vice President'],
      ['Function', 'Finance (run a second search with Human Resources)'],
      ['Company headcount', '5,001–10,000 and 10,001+'],
      [
        'Geography',
        'Same as account list. Add countries where payroll is outsourced',
      ],
      [
        'Keywords',
        '“global payroll” OR “multi-country payroll” OR “payroll operations”',
      ],
      ['Spotlight', 'Posted on LinkedIn in last 30 days'],
    ],
    boolean: [
      '("Global Payroll" OR "Head of Payroll" OR "Payroll Director" OR "Payroll Manager" OR "Payroll Operations" OR "Payroll Transformation") NOT (intern OR clerk OR administrator)',
    ],
    tip: 'Payroll leaders rarely post. Join the same groups and watch comments on payroll-vendor posts to find who is active, then connect with a note that references a specific reconciliation problem.',
    distrust:
      'Anyone claiming “seamless integration”. They want file specs, validation rules, cut-off timing and who is accountable when data is wrong.',
    assets: [
      {
        action: 'Create',
        name: 'Benefits-to-payroll reconciliation workflow with a monthly cut-off timeline',
      },
      {
        action: 'Create',
        name: 'Payroll file spec and validation checklist (anonymised sample)',
      },
      {
        action: 'Create',
        name: 'Root-cause guide: why benefit deductions go wrong in payroll',
      },
      {
        action: 'Improve',
        name: 'Benefits management page: expand the payroll reconciliation section',
      },
    ],
  },
  {
    short: 'Finance',
    role: 'CFO / Finance Business Partner for People',
    dealRole: 'Economic buyer · signs off the spend',
    titles:
      'CFO, VP Finance, Finance Director, Head of FP&A, HR Finance Business Partner, Group Financial Controller',
    jtbd: {
      when: 'I’m asked to approve another HR platform',
      want: 'a defensible number for what benefits really cost across entities and what they return',
      so: 'I can sign it off without being the person who bought another tool that doesn’t land',
    },
    triggers: [
      'Annual budget cycle, usually Q3 and Q4',
      'A cost-reduction mandate that includes HR technology',
      'Audit findings on benefits accruals or entity cost allocation',
      'CHRO or Head of Reward asks for budget and needs to justify it',
    ],
    searches: [
      {
        stage: 'Problem-aware',
        queries: [
          'employee benefits cost per employee by country',
          'benefits spend visibility across entities',
          'cost of benefits administration per employee',
          'employee benefits cost allocation across entities',
        ],
        lands: 'Benefits calculator, new cost-per-employee benchmark page',
      },
      {
        stage: 'Solution-aware',
        queries: [
          'employee benefits platform ROI',
          'how to measure ROI of employee benefits',
          'HR technology business case template',
          'benefits reporting dashboard finance',
        ],
        lands: '/benefits-insights, new business-case model',
      },
      {
        stage: 'Vendor evaluation',
        queries: [
          'benefits platform total cost of ownership',
          'benefits platform pricing',
          'benefits platform contract terms',
        ],
        lands: '/pricing, new TCO template',
      },
    ],
    find: [
      {
        label: 'Reach them through',
        items:
          'The Head of Reward. They rarely respond to cold outreach, so arm your champion with a business case they can forward',
      },
      {
        label: 'Communities',
        items:
          'CFO Connect, ACCA and ICAEW events, FP&A practitioner groups on LinkedIn',
      },
      {
        label: 'Reading',
        items:
          'FT, CFO Magazine, finance newsletters; they also read consultancy cost benchmarks from Mercer, WTW and Aon',
      },
      {
        label: 'Closer than the CFO',
        items:
          'HR Finance Business Partners sit between HR and Finance and do the actual spreadsheets',
      },
    ],
    filters: [
      ['Seniority level', 'Director, Vice President, CXO'],
      ['Function', 'Finance'],
      ['Company headcount', '5,001–10,000 and 10,001+'],
      ['Geography', 'Same as account list'],
      ['Keywords', '“HR finance” OR “people finance” OR “business partner”'],
      [
        'Years in current position',
        'Less than 2 years (new finance leads review spend lines)',
      ],
    ],
    boolean: [
      '("Finance Business Partner" OR "HR Finance" OR "People Finance" OR "Head of FP&A" OR "Finance Director" OR "VP Finance")',
    ],
    tip: 'Finance leaders almost never engage with vendor content directly. Target Finance Business Partners for HR as a second tier, and make sure the Head of Reward has a business-case asset to hand upwards.',
    distrust:
      'ROI claims with no assumptions. A formula they can open, challenge and put their own numbers into builds more trust than a polished percentage.',
    assets: [
      {
        action: 'Improve',
        name: 'Benefits cost calculator: show every assumption and add multi-entity inputs',
      },
      {
        action: 'Create',
        name: 'CFO one-pager: cost visibility, accruals and entity allocation',
      },
      {
        action: 'Improve',
        name: 'Benefits insights page: show a finance-ready export and what it contains',
      },
      {
        action: 'Create',
        name: 'TCO template: broker plus local vendors versus one platform',
      },
    ],
  },
  {
    short: 'HRIS & Security',
    role: 'HRIS Lead and Information Security',
    dealRole: 'Technical gate · slows or unblocks the deal',
    titles:
      'HRIS Manager, Head of People Systems, HR Technology Lead, Director of HR Technology, Information Security Manager, Third-Party Risk Manager, Data Protection Officer',
    jtbd: {
      when: 'a new people tool is proposed and lands on my desk for review',
      want: 'to know in one pass how it integrates with our HRIS and SSO and whether it clears vendor security',
      so: 'I can approve or block without a six-week questionnaire cycle',
    },
    triggers: [
      'Vendor reaches shortlist and procurement triggers a security review',
      'DPIA required because employee data crosses borders',
      'SSO or SCIM is a hard requirement',
      'HRIS migration or major upgrade in flight',
    ],
    searches: [
      {
        stage: 'Problem-aware',
        queries: [
          'HR vendor security questionnaire',
          'DPIA employee benefits platform',
          'employee data cross border GDPR benefits',
        ],
        lands: 'New security and data-protection pack',
      },
      {
        stage: 'Solution-aware',
        queries: [
          'benefits platform workday integration',
          'benefits platform SSO SAML',
          'benefits platform SFTP API integration',
          'HRIS benefits integration',
        ],
        lands: 'New integration documentation hub',
      },
      {
        stage: 'Vendor evaluation',
        queries: [
          'ISO 27001 benefits platform',
          'benefits platform security certifications',
          'benefits platform data residency',
          'benefits platform SOC 2',
        ],
        lands: 'Trust centre, with product pages linking to it',
      },
    ],
    find: [
      {
        label: 'Communities',
        items:
          'Workday Community, SAP SuccessFactors community, r/Workday, ISACA chapters, vendor-risk practitioner groups',
      },
      {
        label: 'Events',
        items: 'HR Technology Conference, UNLEASH, HRIS user-group days',
      },
      {
        label: 'Where the work happens',
        items:
          'They’re in the evaluation thread, not on LinkedIn. Your assets must be forwardable: a PDF or doc the Head of Reward can drop into the review',
      },
      {
        label: 'Review sites',
        items:
          'G2 and similar listings; integration and security questions in reviews tell you what to document',
      },
    ],
    filters: [
      ['Seniority level', 'Experienced Manager, Director, Senior'],
      [
        'Function',
        'Information Technology, Human Resources (two separate searches)',
      ],
      ['Company headcount', '5,001–10,000 and 10,001+'],
      ['Geography', 'Same as account list'],
      [
        'Keywords (HRIS search)',
        'Workday OR SuccessFactors OR “Oracle HCM” OR HiBob',
      ],
      [
        'Keywords (security search)',
        '“third-party risk” OR “vendor risk” OR “data protection”',
      ],
    ],
    boolean: [
      '("HRIS" OR "People Systems" OR "HR Systems" OR "HR Technology" OR "People Technology") NOT (intern OR recruiter)',
      '("Third Party Risk" OR "Vendor Risk" OR "Information Security Manager" OR "Data Protection Officer")',
    ],
    tip: 'Match HRIS keywords to the HRIS the account actually runs. Search by “Workday” first, since Ben’s integration content will land best with those teams.',
    distrust:
      'Security pages that list logos but hide the controls. Surface certifications, SSO options and data-flow detail where they will see them, not behind a form.',
    assets: [
      {
        action: 'Create',
        name: 'Integration and SSO documentation hub (SAML, OIDC, SFTP, API)',
      },
      {
        action: 'Improve',
        name: 'Product pages: link directly to the trust centre and certifications',
      },
      {
        action: 'Create',
        name: 'Security and DPIA pack for procurement reviews',
      },
      {
        action: 'Create',
        name: 'Implementation guide with customer-side tasks and data requirements',
      },
    ],
  },
];

function CopyButton({ text }: { text: string }) {
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
    <button type="button" className="bm-copy" onClick={copy}>
      {done ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function BuyerMap() {
  const [i, setI] = useState(0);
  const p = personas[i];

  return (
    <section className="tb-page-section tb-pad" id="buyers">
      <div className="tb-container">
        <header className="tb-section-intro">
          <div className="tb-eyebrow">
            <span>01</span>BUYING COMMITTEE
          </div>
          <h2>Five people decide this. Here’s how to find each one.</h2>
          <p>
            Each persona below has the job they’re hiring a platform to do, what
            triggers the search, the Google queries they run at each stage,
            where they spend time, and the LinkedIn filters to build the list.
            Queries and communities are research hypotheses: confirm volume and
            fit in Search Console and Sales Navigator before committing
            production.
          </p>
        </header>

  

        <div className="bm-tabs" role="tablist" aria-label="Buyer personas">
          {personas.map((x, n) => (
            <button
              key={x.short}
              role="tab"
              aria-selected={i === n}
              className={i === n ? 'active' : ''}
              onClick={() => setI(n)}
            >
              <span>0{n + 1}</span>
              <strong>{x.short}</strong>
              <small>{x.dealRole.split(' · ')[0]}</small>
            </button>
          ))}
        </div>

        <article className="bm-panel" role="tabpanel">
          <div className="bm-panel-head">
            <div>
              <span className="tb-overline">
                PERSONA 0{i + 1} · {p.dealRole.toUpperCase()}
              </span>
              <h3>{p.role}</h3>
              <p className="bm-titles">
                <b>Job titles to search:</b> {p.titles}
              </p>
            </div>
          </div>

          <div className="bm-jtbd">
            <small>JOB TO BE DONE</small>
            <p>
              <b>When</b> {p.jtbd.when}, <b>I want</b> {p.jtbd.want},{' '}
              <b>so I can</b> {p.jtbd.so}.
            </p>
          </div>

          <div className="bm-grid">
            <div className="bm-col">
              <h4>What triggers the search</h4>
              <ul className="bm-list">
                {p.triggers.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <h4>What they Google</h4>
              {p.searches.map((s) => (
                <div className="bm-stage" key={s.stage}>
                  <div className="bm-stage-label">{s.stage}</div>
                  <div className="bm-queries">
                    {s.queries.map((q) => (
                      <code key={q}>{q}</code>
                    ))}
                  </div>
                  <div className="bm-lands">
                    <span>Lands on</span> {s.lands}
                  </div>
                </div>
              ))}

              <h4>Where to find them</h4>
              <dl className="bm-find">
                {p.find.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.items}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bm-col">
              <div className="bm-linkedin">
                <div className="bm-linkedin-head">
                  <span>LINKEDIN SALES NAVIGATOR</span>
                  <small>Lead search filters</small>
                </div>
                <dl>
                  {p.filters.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="bm-bool-label">
                  Paste into <b>Current job title</b>
                </div>
                {p.boolean.map((b) => (
                  <div className="bm-bool" key={b}>
                    <code>{b}</code>
                    <CopyButton text={b} />
                  </div>
                ))}
                <p className="bm-tip">{p.tip}</p>
              </div>

              <div className="bm-distrust">
                <small>WHAT THEY DISTRUST</small>
                <p>{p.distrust}</p>
              </div>

              <h4>Content to build or fix for them</h4>
              <ul className="bm-assets">
                {p.assets.map((a) => (
                  <li key={a.name}>
                    <em
                      className={a.action === 'Create' ? 'create' : 'improve'}
                    >
                      {a.action}
                    </em>
                    {a.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}