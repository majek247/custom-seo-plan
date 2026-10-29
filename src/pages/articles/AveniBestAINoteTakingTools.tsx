"use client";
import { useEffect, useRef, useState } from "react";

const sources = [
  [
    "Aveni Assist: current product capabilities",
    "https://aveni.ai/wealth/assist/"
  ],
  [
    "Aveni: Prosser Knowles customer story",
    "https://aveni.ai/case-studies/prosser-knowles/"
  ],
  [
    "Saturn: platform and customer testimonials",
    "https://www.saturnos.com/"
  ],
  [
    "Saturn: Meeting Notes 2.0 release",
    "https://www.saturnos.com/journal/shaping-the-new-standard-meeting-notes-2-0"
  ],
  [
    "AdvisoryAI: Evie meeting notes",
    "https://advisoryai.com/product/ai-meeting-notes"
  ],
  [
    "AdvisoryAI: pricing",
    "https://advisoryai.com/pricing"
  ],
  [
    "AdvisoryAI: named customer testimonials",
    "https://advisoryai.com/testimonials"
  ],
  [
    "PlannerPal: workflow and integrations",
    "https://www.plannerpal.co.uk/"
  ],
  [
    "PlannerPal: trial enquiries",
    "https://www.plannerpal.co.uk/sign-up"
  ],
  [
    "Recordsure: meeting notes and validation",
    "https://recordsure.com/conversation-review-ai/recordsure-ai-meeting-notes/"
  ]
];

const vendors = [
  {
    "id": "aveni",
    "name": "Aveni",
    "tag": "Notes, documents and adviser review",
    "best": "Advice firms that want the meeting note to feed directly into suitability reports, CRM updates and the rest of the admin that follows.",
    "summary": "Meeting capture, CRM updates and document drafts.",
    "priceShort": "Request a quote",
    "watch": "Scope of Assist vs. wider Aveni products.",
    "intro": [
      "I can already hear the objection: “Of course Aveni put Aveni first.”",
      "Fair enough. This is our blog, and Aveni is our product.",
      "So rather than pretending otherwise, I’m going to judge it the way I judged every other tool on this list: what’s genuinely useful, what needs a closer look in the demo, and when you’d be better off buying something else.",
      "The big difference with Aveni Assist is that it doesn’t really stop at note-taking.",
      "A client meeting can become a summary, CRM update and draft document without the adviser having to copy the same information from one system into the next. For larger firms, that matters because the transcript is rarely the bit creating the workload. It’s everything that happens afterwards."
    ],
    "features": [
      [
        "Firm-specific summaries",
        "You can configure summaries around your own terminology and processes rather than forcing advisers to work from a generic meeting template."
      ],
      [
        "CRM updates",
        "Aveni currently lists integrations with Xplan, iO and Plannr, as well as bespoke integrations."
      ],
      [
        "Source-linked documents",
        "Draft documents can pull from meeting transcripts and supporting material, with citations back to the underlying source."
      ],
      [
        "Adviser self-review",
        "Aveni Protect can surface findings from a meeting and take the adviser back to the relevant part of the transcript."
      ]
    ],
    "pros": [
      [
        "It handles more of the admin after the meeting",
        "If your advisers are still moving information manually between notes, CRM fields and documents, this is where Aveni becomes more interesting than a straightforward transcription tool."
      ],
      [
        "Reviewers can trace statements to the source",
        "That is particularly useful when someone needs to check where a recommendation, figure or client statement came from rather than simply trusting the generated draft."
      ]
    ],
    "cons": [
      [
        "Be clear which Aveni product you’re buying",
        "Assist is only part of the wider Aveni platform. File Check, Detect and other capabilities may sit outside the package you are being quoted for, so get the scope written down."
      ],
      [
        "An integration logo does not tell you much",
        "If CRM integration matters, ask to see your actual workflow. Which fields get populated? What needs adviser approval? What happens when data is missing or an update fails? We would expect another vendor to answer those questions, and you should expect the same from us."
      ]
    ],
    "pricing": "We don’t publish a standard Assist price. Quotes are based on users, templates, integrations, onboarding and any additional Aveni products included.",
    "review": {
      "quote": "Tasks that previously took hours now take minutes.",
      "person": "Hollie Henson",
      "role": "Director of Operations, Prosser Knowles",
      "source": 1,
      "body": "Prosser Knowles is a named Aveni customer, but this is also a testimonial we chose to publish. Use it as something to test rather than something to take on faith. During your pilot, measure where time actually comes out of the process and how much human checking is still needed."
    },
    "verdict": "If advisers are spending time turning the same conversation into notes, CRM entries, follow-ups and suitability documents, Aveni Assist has a much stronger case. If you mainly want accurate notes after a meeting, however, I wouldn’t buy the broader workflow just because it exists. Some of the other tools in this guide are deliberately narrower, and that may be exactly what you need.",
    "refs": [
      1,
      2
    ],
    "asset": "aveni-summary.webp",
    "caption": "Aveni’s published summary visual. Source: Aveni Assist.",
    "visualType": "Vendor product visual"
  },
  {
    "id": "saturn",
    "name": "Saturn",
    "tag": "Meeting context and team handover",
    "best": " Advice firms that want to keep the full client conversation intact as information moves into documents, cashflow tools and the wider advice process.",
    "summary": "Meeting notes within a broader advice platform.",
    "priceShort": "Request a quote",
    "watch": "Corrections, nuance, and exact integration needs.",
    "intro": [
      "Saturn’s strongest differentiator is its focus on preserving the context of the entire conversation. In its Meeting Notes 2.0 release, it says its previous approach separated conversations into stages, which sometimes meant context was lost. The new approach is designed to keep those details connected from start to finish.",
      "For example, a client may first say they plan to retire at 60, then explain they may keep working if their daughter needs support buying a home. A short summary might turn that into a retirement target. A useful note captures the trade-off: the retirement goal, the family consideration, and the fact that the final decision is still open."
    ],
    "features": [
      [
        "Whole-meeting context",
        "Meeting Notes 2.0 is designed to retain changes in intent and the relationship between different parts of the conversation."
      ],
      [
        "Advice documents",
        "Saturn can also support suitability letters, annual reviews and other advice documents."
      ],
      [
        "Connected systems",
        "Two-way integrations help move client information between Saturn and the wider advice tech stack."
      ],
      [
        "Oversight",
        "Guardian adds file-checking and meeting-observation capabilities for compliance and supervision teams."
      ]
    ],
    "pros": [
      [
        "Good at preserving soft facts",
        "The focus on the full conversation is useful when client decisions are conditional, nuanced or change during the meeting."
      ],
      [
        "Useful beyond the adviser",
        "Documents, integrations and oversight make Saturn relevant to paraplanners, operations and compliance teams too."
      ]
    ],
    "cons": [
      [
        "Most of the evidence comes from Saturn",
        "Its published improvements compare newer versions of Saturn with older ones, rather than Saturn directly with other tools."
      ],
      [
        "Check what is live today:",
        "Some capabilities have appeared first as roadmap items, so confirm exactly what is available in the version you are buying."
      ]
    ],
    "pricing": "Saturn does not publish standard pricing. Ask for the meeting-notes cost separately from integrations, support, Guardian and any wider platform commitment.",
    "review": {
      "quote": "I’m doing a lot fewer corrections now. Numbers especially are far more accurate.",
      "person": "John Timoney",
      "role": "ThinqViser",
      "source": 4,
      "body": "That feedback is published by Saturn, so I would treat it as a useful signal rather than an independent comparison. The important point is that it speaks to less clean-up after the meeting, not just faster note generation."
    },
    "verdict": "Saturn makes most sense when preserving the reasoning behind a client decision matters as much as capturing the decision itself. If your team regularly has to go back to the recording because a summary lost an important condition, change of mind or piece of family context, that is where I would test it first.",
    "refs": [
      3,
      4
    ],
    "asset": "saturn-context.png",
    "caption": "Saturn’s published explanation of Meeting Notes 2.0. Source: Saturn.",
    "visualType": "Vendor explanatory graphic"
  },
  {
    "id": "advisoryai",
    "name": "AdvisoryAI",
    "tag": "Notes, reports and checks by role",
    "best": "Firms that want separate AI tools for advisers, paraplanners and compliance rather than one broad platform.",
    "summary": "Evie for notes; Emma for reports; Colin for checks.",
    "priceShort": "Evie: £89 + VAT/user/month",
    "watch": "Combined pricing for report/checking modules.",
    "intro": [
      "AdvisoryAI splits its products by job.",
      "Evie handles meeting notes, Emma drafts suitability reports and Colin checks files and reports. That makes the platform easier to evaluate because each team can test the part that actually affects their day-to-day work.",
      "An adviser may only need a structured meeting note, actions and a follow-up email. A paraplanner needs a draft built from several documents, client information and the firm’s own templates.",
      "AdvisoryAI keeps those workflows separate rather than bundling everything into one product."
    ],
    "features": [
      [
        "Evie meeting capture",
        "Records meetings across Teams, Zoom, Google Meet and mobile for face-to-face conversations."
      ],
      [
        "Actions and follow-up",
        "Generates structured notes, action points and draft client emails after the meeting.."
      ],
      [
        "Meeting preparation",
        "Pulls together client history and outstanding actions before the adviser joins the call."
      ],
      [
        "Separate report and checking products",
        "Emma handles suitability report drafting, while Colin focuses on file and report checks."
      ]
    ],
    "pros": [
      [
        "Clearer cost planning",
        "Advisers, paraplanners and compliance teams can use different tools rather than paying for the same capability across every role."
      ],
      [
        "Easy to trial by workflow",
        "Firms can test meeting notes, report writing and checking separately instead of evaluating the whole platform at once."
      ]
    ],
    "cons": [
      [
        "Costs add up across products",
        "Evie’s monthly price only covers Evie. Adding Emma, Colin and more users can change the total quickly.."
      ],
      [
        "Good outputs still depend on good inputs:",
        "Your templates, source documents and client data will have a big effect on the quality of the final report."
      ]
    ],
    "pricing": "Evie is listed at £89, Emma at £269 and Colin at £89 per user per month, plus VAT. AdvisoryAI also offers a 14-day trial.",
    "review": {
      "quote": "",
      "person": "Lee McGuinness",
      "role": "Associate Planner, Satis UK",
      "source": 7,
      "body": "In AdvisoryAI’s published testimonial, Lee McGuinness, Associate Planner at Satis UK, says the firm originally came for report writing but also found value in meeting notes as a record of the wider client discussion."
    },
    "verdict": "AdvisoryAI is a strong fit for firms that want to introduce AI one workflow at a time. You can start with adviser meeting notes, add report drafting for paraplanners and bring in compliance checking separately, rather than committing the whole firm to one large platform from day one.",
    "refs": [
      5,
      6,
      7
    ],
    "asset": "advisoryai-capture.gif",
    "caption": "Evie meeting-capture animation published by AdvisoryAI. Source: Evie product page.",
    "visualType": "Vendor product animation"
  },
  {
    "id": "plannerpal",
    "name": "PlannerPal",
    "tag": "The work around the meeting",
    "best": "Advice firms that want to cut down the copy-pasting between meeting notes, client documents and back-office systems.",
    "summary": "Preparation, meeting notes, documents and CRM updates.",
    "priceShort": "Confirm current price",
    "watch": "Field-level write-back and conflict handling.",
    "intro": [
      "PlannerPal is built around the admin that happens before and after the meeting.",
      "It brings together meeting preparation, recording, notes, documents and CRM updates, with the aim of stopping advisers and support teams from entering the same client information more than once.",
      "For example, if a client mentions a new salary, address or objective during the meeting, the useful question is not whether PlannerPal captured it. It is whether that change can move into the right system without someone copying it across manually.",
      "For firms already using Xplan, intelliflo, Plannr or Curo, that connection is a big part of the proposition."
    ],
    "features": [
      [
        "Meeting preparation",
        "Pulls existing client information into the workflow before the meeting starts."
      ],
      [
        "Meeting capture",
        "Supports Teams, Zoom and mobile recording, including offline capture on mobile."
      ],
      [
        "Connected outputs",
        "Meeting notes, emails, reports and CRM updates sit within the same workflow."
      ],
      [
        "Back-office connections",
        "PlannerPal lists Xplan access and two-way connections with intelliflo, Plannr and Curo.."
      ]
    ],
    "pros": [
      [
        "Cuts down repetitive admin",
        " Useful when the same client information is being copied into notes, emails, reports and the CRM."
      ],
      [
        "Built around existing systems",
        "The integrations make it easier to fit PlannerPal into an established advice tech stack rather than replacing everything around it."
      ]
    ],
    "cons": [
      [
        "Integration depth matters",
        "A two-way connection sounds good, but the useful detail is which fields it can read and update, and what still needs manual approval."
      ],
      [
        "Less public detail on pricing and customer results",
        "There is less available information to judge the full cost and the day-to-day experience compared with some of the other tools here."
      ]
    ],
    "pricing": "PlannerPal advertises a 14-day trial but does not publish a standard per-user price. Ask whether your CRM connection, templates and onboarding are included in the quote.",
    "review": {
      "quote": "What took me two or three days in client admin is done in half a day. It’s incredible.",
      "person": "Ian Dempsey DipPFS",
      "role": "The Wealth Strategist",
      "source": 8,
      "body": "That’s the more useful proof point for PlannerPal. The value here is in the admin that follows the meeting, which Dempsey says now takes a fraction of the time."
    },
    "verdict": "PlannerPal is a better fit for teams that lose time moving client information between systems. If meeting updates are being copied from prep materials into notes, emails and back-office tools, this is the workflow I’d test first.",
    "refs": [
      8,
      9
    ],
    "asset": "",
    "caption": "",
    "visualType": ""
  },
  {
    "id": "recordsure",
    "name": "Recordsure",
    "tag": "Checking the evidence behind a note",
    "best": "Firms that want reviewers to trace meeting summaries back to the conversation and spot evidence that may contradict them.",
    "summary": "Meeting summaries with supporting and conflicting evidence.",
    "priceShort": "Request a quote",
    "watch": "Onward reporting and back-office workflow.",
    "intro": [
      "Recordsure puts more emphasis on checking the note than most of the tools in this list.",
      "It records the conversation, produces a transcript and draft summary, then gives reviewers the evidence behind what has been written. That includes excerpts that support a point as well as parts of the conversation that may conflict with it."
    ],
       "features": [
      [
        "Conversation capture",
        "Records in-person and video meetings for later transcription and review."
      ],
      [
        "AI-assisted summaries",
        "Turns the recorded conversation into a transcript and draft meeting note."
      ],
      [
        "Evidence review",
        "Shows the excerpts supporting a summary alongside evidence that may contradict it."
      ],
      [
        "Human validation",
        "Key parts of the generated note are designed to be checked by a person before being relied on in the advice process."
      ]
    ],
       "pros": [
      [
        "Stronger review trail",
        "Reviewers can see where a statement came from instead of searching through the entire recording themselves."
      ],
      [
        "Useful for compliance teams",
        "The evidence-led workflow gives compliance and quality teams something specific to test, not just the quality of the generated summary."
      ]
    ],
    "cons": [
      [
        "Human review is still part of the workflow",
        "The evidence makes checking easier, but it does not remove the need for someone to validate important points."
      ],
      [
        "The wider workflow is less clear",
        "Recordsure is strong on conversation review, but firms should confirm how far it extends into report drafting, CRM updates and other post-meeting work."
      ]
    ],
    "pricing": "Recordsure does not publish standard pricing for its meeting-notes product. Ask for a quote covering recording, summaries, validation, storage and any integrations you need.",
    "review": {
      "quote": "",
      "person": "",
      "role": "",
      "source": 10,
          "cta": "Learn more ↗",
      "body": "Recordsure publishes customer stories across its wider conversation-review platform, but there is less named feedback specifically about its AI meeting-notes workflow. For this product, I’d pay more attention to the review process itself: how quickly can your compliance team get from a questionable sentence back to the evidence?"
    },
    "verdict": "Recordsure makes most sense when checking the meeting note is as important as generating it. If your compliance team regularly needs to understand exactly what a client said, what supports a conclusion and where the conversation becomes less clear-cut, that is where its evidence-led approach stands out.",
    "refs": [
      10
    ],
    "asset": "",
    "caption": "",
    "visualType": ""
  }
];

const criteria = [
  [
    "What happens when the client corrects themselves?",
    [
      "Give the tool a conversation where the client says their income is £72,000, then later remembers a £9,000 bonus. Or where they first say they want to retire at 60, then explain they may continue working twice a week.",
      "Look at the final note. Does it clearly show the latest position? Can you still see why it changed? You should not have to replay twenty minutes of audio to work out which figure is current."
    ],
    "refresh"
  ],
  [
    "Can you check an important statement quickly?",
    "Take one sentence that would matter in the file, such as an income figure, objective or vulnerability point, and ask where it came from. You should be able to get back to the relevant part of the conversation quickly, correct the output if needed and control what becomes part of the record.",
    "chat"
  ],
  [
    "How much admin is still left afterwards?",
    "Follow one piece of information all the way through. Does it appear in the meeting note, CRM, actions and client follow-up, or does someone still have to copy it between systems? That is often where the difference between a useful tool and a nicer transcript becomes obvious.",
    "search"
  ],
  [
    "Does it fit the way your firm actually works?",
    "The final check sits with compliance and operations. Look at recording consent, user access, data retention, processing location, audit trails and who can approve or amend the output. The software needs to fit your controls, not force your controls to bend around the software.",
    "swap"
  ]
];


const intro = [
  "I used to dread the hour after a client meeting more than the meeting itself.",
  "The meeting would go fine. Then I’d sit down to write the file note and realise I couldn’t remember whether the client said £[X] or £[Y] for their income. Or exactly how nervous they were about retiring. I’d re-listen to the recording, write it up, then brief the paraplanner so the suitability report didn’t start from a guess.",
  "That was the part I wanted AI to get rid of.",
  "Not the meeting. Not even necessarily the note-taking. The annoying bit afterwards, when you’re checking numbers, pulling out actions, updating the CRM and trying to make sure the next person has enough context to pick things up properly.",
  "So when I looked at the AI note-taking tools built for financial advisers, that’s what I paid attention to.",
  "Did they just give me a cleaner version of the conversation? Or did they actually mean I had less to do once the meeting was over?",
  "That is what separates the five tools in this guide."
];


const choices = [["The note is fine, but advisers still spend too long on CRM updates, follow-ups and documents", "Aveni", "Take one client change and follow it from the meeting note into the CRM, follow-up and final document."], ["Important context disappears when the meeting gets summarised or passed to someone else", "Saturn", "Use a conversation where the client changes their mind or adds a condition. Check whether that nuance survives the summary."], ["Advisers, paraplanners and compliance each need something different", "AdvisoryAI", "Test Evie, Emma and Colin separately with the people who would actually use them. Do not judge all three from one demo."], ["Client information is still being copied between notes, emails and back-office systems", "PlannerPal", "Change an existing client fact and see exactly where it updates, what needs approval and what still has to be entered manually."], ["Compliance needs to see the evidence behind what the note says", "Recordsure", "Pick an ambiguous part of a meeting and see how quickly the reviewer can get from the summary back to supporting or conflicting evidence."]];

const checks = [
  ["01", "Meeting record", "Can it capture what was actually said in client meetings?", "mic"],
  ["02", "Advice output", "Does it produce structured notes and support suitability documentation?", "doc"],
  ["03", "CRM handoff", "Does useful information make it into the system of record?", "db"],
  ["04", "Suitability", "Can it support report drafting and evidence requirements?", "shield"],
  ["05", "Evidence", "Can a reviewer see where an output came from?", "link"],
  ["06", "Data handling", "Where does sensitive client data go and who can use it?", "lock"],
  ["07", "Human control", "Can a person review, correct and approve the output?", "user"]
];

const iconPaths: Record<string, string[]> = {
  mic: ["M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", "M19 10v2a7 7 0 0 1-14 0v-2", "M12 19v3"],
  doc: ["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", "M14 2v4a2 2 0 0 0 2 2h4", "M10 9H8", "M16 13H8", "M16 17H8"],
  db: ["M3 5a9 3 0 1 0 18 0a9 3 0 1 0-18 0", "M3 5v14a9 3 0 0 0 18 0V5", "M3 12a9 3 0 0 0 18 0"],
  shield: ["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"],
  link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  lock: ["M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z", "M7 11V7a5 5 0 0 1 10 0v4"],
  user: ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 0-8 0a4 4 0 0 0 8 0"],
  refresh: ["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M8 16H3v5"],
  chat: ["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"],
  search: ["M21 21l-4.3-4.3", "M19 11a8 8 0 1 0-16 0a8 8 0 0 0 16 0"],
  swap: ["m16 3 4 4-4 4", "M20 7H4", "m8 21-4-4 4-4", "M4 17h16"],
  sliders: ["M21 4h-7", "M10 4H3", "M21 12h-9", "M8 12H3", "M21 20h-5", "M12 20H3", "M14 2v4", "M8 10v4", "M16 18v4"],
  info: ["M22 12a10 10 0 1 0-20 0a10 10 0 0 0 20 0", "M12 16v-4", "M12 8h.01"]
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}



const waveBars = [4,9,6,14,8,18,11,22,15,9,26,18,12,20,8,14,24,16,10,19,7,13,21,9];

function Face({ mood }: { mood: string }) {
  return (
    <span className={`an-face ${mood}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="13" />
        {mood === "hmm" && <><circle cx="11" cy="14" r="1.2" fill="currentColor" stroke="none" /><circle cx="21" cy="14" r="1.2" fill="currentColor" stroke="none" /><path d="M18 9.5l5-1.5" /><path d="M11 21h10" /></>}
        {mood === "ugh" && <><circle cx="11" cy="14" r="1.2" fill="currentColor" stroke="none" /><circle cx="21" cy="14" r="1.2" fill="currentColor" stroke="none" /><path d="M10 21q2-2 4 0t4 0t4 0" /><path d="M28 5c1.5 2 2.5 3.4 2.5 4.8a2.5 2.5 0 0 1-5 0c0-1.400 1-2.800 2.500-4.800z" /></>}
        {mood === "flat" && <><path d="M8.500 14h5" /><path d="M18.500 14h5" /><path d="M11 21h10" /></>}
      </svg>
    </span>
  );
}

function StepVisual({ kind }: { kind: string }) {
  if (kind === "wave") {
    return (
      <div className="an-step-vis">
        <div className="an-wave2" aria-hidden="true">
          {waveBars.map((h, i) => <i key={i} className={i <= 13 ? "on" : ""} style={{ height: h }} />)}
        </div>
        <div className="an-wave-meta"><span>▶ 23:41 / 45:12</span><span>↺ replay</span></div>
      </div>
    );
  }
  if (kind === "note") {
    return (
      <div className="an-step-vis">
        <div className="an-v-row"><em>Income</em><b>£[X] or £[Y]?</b></div>
        <div className="an-v-row"><em>Retirement</em><span>nervous… how nervous?<i className="an-caret" /></span></div>
      </div>
    );
  }
  return (
    <div className="an-step-vis">
      <div className="an-bub in">So what did we actually agree?</div>
      <div className="an-bub out">Let me explain from the start…</div>
    </div>
  );
}

const hourSteps = [
  { n: "01", title: "Re-listen for the figure", mins: 22, mood: "hmm", thought: "Was it £[X] or £[Y]?", kind: "wave" },
  { n: "02", title: "Write the file note", mins: 23, mood: "ugh", thought: "How nervous is “nervous”?", kind: "note" },
  { n: "03", title: "Brief the paraplanner", mins: 15, mood: "flat", thought: "I’ll just explain it again.", kind: "chat" }
];

function HourAfter() {
  return (
    <figure className="an-hour" aria-label="Illustration of the hour after a client meeting: three jobs, each with a time cost, adding up to 60 minutes of work after a 45 minute meeting">
      <div className="an-hour-top">
        <span className="an-eyebrow">Fig. 1 · The hour after the meeting</span>
        <span className="an-hour-tag">Unbilled</span>
      </div>
      <div className="an-steps">
        {hourSteps.map((s) => (
          <div className="an-step" key={s.n}>
            <div className="an-step-head">
              <div><span>{s.n}</span><strong>{s.title}</strong></div>
              <span className="an-step-min">{s.mins} min</span>
            </div>
            <StepVisual kind={s.kind} />
            <div className="an-me">
              <Face mood={s.mood} />
              <p className="an-thought">{s.thought}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="an-compare">
        <div className="an-cmp-row"><span>The meeting</span><span className="an-cmp-bar"><i style={{ width: "75%" }} /></span><b>45 min</b></div>
        <div className="an-cmp-row after"><span>The work left after it</span><span className="an-cmp-bar"><i style={{ width: "100%" }} /></span><b>60 min</b></div>
      </div>
      <figcaption><strong>Me, during the whole process.</strong><span> </span></figcaption>
    </figure>
  );
}


export type Props = {
  portfolioHref?: string;
  contactHref?: string;
  heroImageSrc?: string;
  aveniImageSrc?: string;
  buyerImageSrc?: string;
  assetBase?: string;
};
const subheads = [['features','Key features'],['pros','Pros'],['cons','Cons'],['pricing','Pricing'],['reviews','What users say']] as const;
export default function BestAINoteTaking({portfolioHref='/#work',contactHref='https://www.seo-growup.com/get-in-touch',aveniImageSrc,assetBase='/images'}:Props){
 const [active,setActive]=useState('introduction');
 const [progress,setProgress]=useState(0);
 const [copyStatus,setCopyStatus]=useState('Copy article link ↗');
 const articleRef=useRef<HTMLElement>(null);
 useEffect(()=>{
  const update=()=>{const node=articleRef.current;if(!node)return;const top=node.getBoundingClientRect().top+window.scrollY;const distance=Math.max(1,node.offsetHeight-window.innerHeight);setProgress(Math.round(Math.max(0,Math.min(1,(window.scrollY-top)/distance))*100));};
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
  const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)setActive(e.target.id);},{rootMargin:'-10% 0px -70% 0px'});
  articleRef.current?.querySelectorAll('section[id],h3[id]').forEach(e=>observer.observe(e));
  return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);observer.disconnect();};
 },[]);
 const copyLink=async()=>{try{await navigator.clipboard.writeText(window.location.href.split('#')[0]);setCopyStatus('Link copied ✓');}catch{setCopyStatus('Copy the URL from your address bar');}};
 const sourceLink=(n:number)=>sources[n-1][1];
 const jump=(id:string,label:string)=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined}>{label}</a>;
 return <div className="an-page" id="an-top"><style>{styles}</style><a className="an-skip" href="#introduction">Skip to article</a><div className="an-progress" style={{width:`${progress}%`}} />
 <div className="an-wrap">
  
 <main><header className="an-hero">
  <div className="an-hero-main an-container">
    <div className="an-hero-copy">
      <div className="an-eyebrow">Fintech writing sample</div>
      <h1 className="an-hero-title">
  <span>5 Best AI Note-Taking</span>
  <span>Tools for UK Financial</span>
  <span>Advisers in 2026</span>
</h1>
      <p className="an-deck">Here’s how the five platforms compare across adviser workflows, CRM handover, compliance requirements and day-to-day operational fit.</p>
      <div className="an-meta">
        <span>By GrowUp | For Aveni</span>
        <time dateTime="2026-10-02">Reviewed 2 October 2026</time>
        <span>14 min read</span>
      </div>
      <a className="an-jump" href="#shortlist">Compare the five tools <span>↓</span></a>
    </div>
<div className="an-type-art" aria-hidden="true">
  <svg
    viewBox="0 0 640 460"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
  >


    {/* Restrained audio waveform */}
    <g stroke="#62bcb9" strokeWidth="2.5" strokeLinecap="round">
      {[
        10, 18, 12, 28, 20, 38, 26, 50, 34,
        66, 42, 78, 52, 90, 60, 72, 46, 58,
        34, 46, 28, 36, 20, 28, 14, 20, 10,
      ].map((height, index) => (
        <line
          key={index}
          x1={284 + index * 8}
          x2={284 + index * 8}
          y1={91 - height / 2}
          y2={91 + height / 2}
        />
      ))}
    </g>

    {/* Oversized editorial letterforms */}
    <g
      fill="#f6f3e9"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="400"
    >
      <text x="26" y="397" fontSize="365">A</text>
      <text x="287" y="397" fontSize="300">a</text>
    </g>

    {/* Transcript lines extend across the lowercase letter */}
    <g stroke="#379b99" strokeWidth="3" strokeLinecap="round">
      <line x1="403" y1="281" x2="603" y2="281" />
      <line x1="443" y1="297" x2="619" y2="297" />
      <line x1="421" y1="313" x2="586" y2="313" />
      <line x1="455" y1="329" x2="610" y2="329" />
      <line x1="433" y1="345" x2="577" y2="345" />
      <line x1="463" y1="361" x2="604" y2="361" />
      <line x1="447" y1="377" x2="566" y2="377" />
      <line x1="478" y1="393" x2="590" y2="393" />
    </g>
  </svg>
</div>
  </div>
</header>
 <div className="an-strip"><span className="an-eyebrow">In this guide</span>{vendors.map(v=><a key={v.id} href={`#${v.id}`}>{v.name}</a>)}</div>
 <div className="an-layout"><aside className="an-toc"><div className="an-eyebrow">On this page</div><nav aria-label="Article contents">{jump('method','How we built this')} {jump('criteria','What to look for')}{jump('shortlist','The five tools compared')}{vendors.map((v,i)=><details key={v.id} open={active.startsWith(v.id)}><summary>{i+1}. {v.name}</summary>{jump(v.id,'Overview')}{subheads.map(([id,label])=>jump(`${v.id}-${id}`,label))}</details>)}{jump('choose','Which tool should you choose?')}{jump('sources','Sources & research')}</nav><div className="an-toc-foot">{progress}% of article read<button className="an-copy-button" onClick={copyLink}>{copyStatus}</button><span className="an-sr-status" role="status" aria-live="polite">{copyStatus==='Link copied ✓'?'Copied to clipboard':''}</span></div></aside>
 <article className="an-article" ref={articleRef}>
 <details className="an-mobile-toc"><summary>Explore this guide</summary><nav aria-label="Mobile article contents">{jump('method','How we built this')} {jump('criteria','What to look for')}{jump('shortlist','Compare the tools')}{vendors.map(v=>jump(v.id,v.name))}{jump('choose','Choose your shortlist')}</nav></details>
 <section id="introduction" className="an-intro" style={{paddingTop:0}} aria-label="Introduction">{intro.slice(0,2).map(t=><p key={t}>{t}</p>)}<HourAfter />{intro.slice(2).map(t=><p key={t}>{t}</p>)} </section>
 


 <section id="criteria"><h2>What should UK financial advisers look for in AI note-taking tools?</h2>
 
 
 
 <p>For UK financial advisers, the best AI note-taking tools should capture the client’s final position accurately, let reviewers trace statements back to the conversation, move useful information into the next workflow and give the firm control over sensitive client data.
</p>

<p style={{marginTop:'-5px'}}>The best way to test those claims is with a meeting that is slightly messy.</p>



 <div className="an-crit">{criteria.map(([title,body,icon],i)=><div className="an-crit-row" key={title}><span className="an-icon"><Icon name={icon} /></span><div className="an-crit-text"><span className="an-check-num">0{i+1}</span><strong>{title}</strong>{(Array.isArray(body)?body:[body]).map((para,j)=><p key={j}>{para}</p>)}</div></div>)}</div></section>
 <section id="shortlist"><h2>5 best AI note-taking tools for UK financial advisers in 2026</h2><p>These five deserve different conversations. Use the table to choose the ones that match your team’s main bottleneck, then read the trade-offs below.</p><div className="an-table-shell an-clean-shell"><div className="an-table-scroll" role="region" aria-label="Comparison table; scroll horizontally on smaller screens" tabIndex={0}><table className="an-table an-clean"><thead><tr><th scope="col">Tool</th><th scope="col">Best for</th><th scope="col">Workflow / distinction</th><th scope="col">Pricing / what to check</th></tr></thead><tbody>{vendors.map(v=><tr key={v.id}><td><a href={`#${v.id}`}>{v.name} ↗</a></td><td>{v.best}</td><td>{v.summary}</td><td><strong>{v.priceShort}.</strong><small>Check: {v.watch}</small></td></tr>)}</tbody></table></div><p className="an-table-footer">Prices and scope checked against the linked sources on 2 October 2026.  </p></div></section>
 {vendors.map((v,i)=><section className="an-tool" id={v.id} key={v.id} aria-labelledby={`${v.id}-title`}><div className="an-tool-heading"><span className="an-rank">0{i+1}</span><div><h2 id={`${v.id}-title`}>{v.name}</h2><div className="an-eyebrow">{v.tag}</div></div></div><p className="an-best"><strong>Best for: </strong>{v.best}</p>{v.intro.map(t=><p key={t}>{t}</p>)}{v.asset&&<figure className="an-product-figure"><img src={`${assetBase}/${v.asset}`} alt={v.caption} loading="lazy"/><figcaption><a href={sourceLink(v.refs[0])} target="_blank" rel="noreferrer">{v.caption} ↗</a></figcaption></figure>}
 <h3 id={`${v.id}-features`}>Key features</h3><ul className="an-feature-list">{v.features.map(([title,body])=><li key={title}><strong>{title}</strong><span>{body}</span></li>)}</ul>
 <div className="an-balance"><div><h3 id={`${v.id}-pros`}>+ Pros</h3><ul>{v.pros.map(([t,b])=><li key={t}><strong>{t}</strong>{b}</li>)}</ul></div><div><h3 id={`${v.id}-cons`}>− Cons & limitations</h3><ul>{v.cons.map(([t,b])=><li key={t}><strong>{t}</strong>{b}</li>)}</ul></div></div>
 <div className="an-price"><h3 id={`${v.id}-pricing`}>Pricing</h3><p>{v.pricing}</p></div>
 <h3 id={`${v.id}-reviews`}>What do real users say about {v.name}?</h3><div className="an-review"><div className="an-eyebrow">{v.review.person?'Vendor-published customer feedback':'Customer evidence: what we could verify'}</div>{v.review.quote&&<blockquote>“{v.review.quote}”</blockquote>}{v.review.person&&<p className="an-review-person">{v.review.person}<br/><span>{v.review.role}</span></p>}<p>{v.review.body}</p><a href={sourceLink(v.review.source)} target="_blank" rel="noreferrer">{(v.review as { cta?: string }).cta || "Read the source ↗"}</a></div>
 <div className="an-verdict"><div className="an-eyebrow">Our take</div><p>{v.verdict}</p></div><div className="an-sources-inline">{v.refs.map(n=><a href={`#source-${n}`} key={n}>[{n}] {sources[n-1][0]}</a>)}</div></section>)}
 <section id="choose"><h2>Which AI note-taking tool should you choose?</h2><p>The easiest way to narrow this list is to look at where the work starts piling up after a client meeting.</p><div className="an-table-shell an-clean-shell"><div className="an-table-scroll" role="region" aria-label="Shortlist by business need" tabIndex={0}><table className="an-table an-clean an-choose-table"><thead><tr><th scope="col">Where the friction shows up</th><th scope="col">Start with</th><th scope="col">What I’d make them show you</th></tr></thead><tbody>{choices.map(([problem,tool,test])=><tr key={problem}><td><strong>{problem}</strong></td><td>{tool}</td><td>{test}</td></tr>)}</tbody></table></div></div><div className="an-author">
  <div className="an-author-mark" aria-hidden="true">
    <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
      <path d="M22.4 6.6c-.4-.3-.9-.3-1.3-.1-3.6 2-6.2 4.4-7.9 6.7-1.3 1.8-2 3.4-2.3 4.6-1.1.4-2.1 1-2.9 1.8-.9.9-1.5 1.9-1.9 2.8-.2.5-.3.9-.3 1.2 0 .3.1.5.2.6.2.2.4.2.6.2.5 0 1.1-.2 1.8-.5.9-.4 1.9-1 2.8-1.9.7-.7 1.3-1.6 1.7-2.6 1.2-.3 2.7-1 4.4-2.3 2.3-1.7 4.6-4.3 6.6-7.8.2-.5.2-1-.2-1.3z"/>
      <path d="M14.2 21.7c-.4.9-.9 1.6-1.5 2.2-.6.6-1.3 1.1-2 1.4-1.5.8-3.2.9-4.1 1 0-.9.1-2.6 1-4.1.3-.7.8-1.4 1.4-2 .5-.5 1.1-.9 1.8-1.2-.1.9-.1 1.9.2 2.7.1.3.4.5.7.5.3 0 .6-.2.7-.5.2-.6.3-1.2.3-1.8.4.3.8.6 1.5.8z"/>
    </svg>
  </div>
  <div className="an-author-body">
    <div className="an-author-eyebrow">Written by</div>
    <div className="an-author-name">GrowUp</div>
    <p className="an-author-bio">GrowUp writes about fintech and financial services. This article is a portfolio sample, written as an example of the kind of content GrowUp would produce for Aveni. It is not published by or affiliated with Aveni.</p>
  </div>
</div></section>
 <section id="sources"><h2>Sources & research</h2><p style={{fontSize:14,color:'#55645e'}}>Product facts and feedback below come from vendor sources. They establish what is published, not independently measured performance. Public information was reviewed on 2 October 2026; pricing, integrations and product scope may change.</p><ol className="an-source-list">{sources.map(([title,url],i)=><li key={url} id={`source-${i+1}`}><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>)}</ol></section>
 </article></div>
 <section className="an-cta"><div><div className="an-eyebrow">GrowUp · Fintech content writing services</div><h2>High-intent content for acquisition, sales enablement and pipeline growth.</h2><p>From search-led articles to comparison pages and customer stories, we create content that brings buyers in, helps sales move deals forward and supports pipeline growth.</p></div><div><a href={contactHref}>Commission an article like this <span>↗</span></a>

 
 </div></section>
 </main><footer className="an-footer"><a href={portfolioHref}>← Back to writing portfolio</a><a href="#an-top">Back to top ↑</a></footer></div></div>;
}

const styles = `.an-page{--ink:#112c25;--muted:#55645e;--green:#144c38;--line:#dce2dc;--paper:#fafbf8;--lime:#d8f4ad;font-family:Inter,Arial,Helvetica,sans-serif;background:var(--paper);color:var(--ink);line-height:1.7;font-size:17px;-webkit-font-smoothing:antialiased}.an-page *{box-sizing:border-box}.an-page h1,.an-page h2,.an-page h3,.an-page p,.an-page figure,.an-page blockquote{margin:0}.an-page a{color:inherit;text-underline-offset:4px}.an-page button,.an-page input{font:inherit}.an-page button,.an-page summary{cursor:pointer}.an-page img{display:block;max-width:100%}.an-page :focus-visible{outline:3px solid #558936;outline-offset:5px}.an-wrap{width:min(1320px,calc(100% - 96px));margin:auto}
.an-top{display:flex;justify-content:space-between;align-items:center;padding:25px 0;border-bottom:1px solid var(--line);gap:20px}.an-wordmark{font-size:26px;font-weight:800;letter-spacing:-1.6px;text-decoration:none}.an-top nav{display:flex;gap:30px;font-size:13px}.an-top nav a{text-decoration:none}.an-small-link{font-size:13px;font-weight:600}.an-eyebrow{text-transform:uppercase;letter-spacing:.15em;font-size:11px;font-weight:700;line-height:1.6}
.an-hero{background:#041b1c;color:#f5f8f2;overflow:hidden;width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;padding-top:96px}
.an-hero .an-container{width:min(1320px,calc(100% - 96px));margin:auto}
.an-hero .an-strip{border-color:rgba(255,255,255,.1);color:#eaf0e4;width:min(1320px,calc(100% - 96px));margin:auto}
.an-hero .an-strip .an-eyebrow{color:#9ceb9d}

.an-hero-main{min-height:655px;display:grid;grid-template-columns:1.05fr 1fr;gap:24px;align-items:center;padding-block:44px 54px}
.an-hero-copy{position:relative;z-index:1}
.an-hero h1{color:#f5f8f2}
.an-hero h1 span{color:#f5f8f2}
.an-hero .an-eyebrow{color:#1F9FA1}
.an-hero .an-deck{color:#fafafa}
.an-hero .an-meta{color:#9db1a5}
.an-hero .an-jump{color:#1F9FA1;border-color:#1F9FA1}
.an-hero-art{min-width:0;display:block;width:100%}
.an-hero-art img{width:100%;max-width:none;filter:drop-shadow(0 36px 70px rgba(0,0,0,.16))}.an-hero .an-eyebrow{color:#1F9FA1}.an-hero h1{font-size:clamp(38px,4vw,61px);line-height:1.08;font-weight:650;letter-spacing:-.052em;margin:20px 0 24px}.an-hero h1 span{color:#f5f8f2}.an-deck{font-size:18px;line-height:1.65;max-width:640px;color:#fafafa}.an-meta{display:flex;gap:15px;flex-wrap:wrap;margin-top:27px;font-size:12px;color:var(--muted)}.an-hero-art{border-radius:5px;overflow:visible}.an-hero-art img{width:100%;height:auto;display:block}.an-hero-art figcaption{text-align:left;padding:12px 0;color:#c6dacb;font-size:10px;letter-spacing:.09em;text-transform:uppercase}.an-jump{display:inline-flex;gap:26px;align-items:center;text-decoration:none;margin-top:25px;font-size:14px;font-weight:700;border-bottom:1px solid #71916d;padding:4px 0}.an-strip{display:flex;align-items:center;gap:26px;padding:23px 0;border-block:1px solid var(--line);font-size:15px;flex-wrap:wrap}.an-strip .an-eyebrow{color:#708075;margin-right:auto}.an-strip a{font-weight:700;text-decoration:none}.an-layout{display:grid;grid-template-columns:235px minmax(0,850px);gap:75px;justify-content:space-between;padding-top:60px;align-items:start}.an-toc{position:sticky;top:26px;max-height:calc(100vh - 52px);overflow-y:auto;padding-right:16px}.an-toc>.an-eyebrow{color:var(--muted);margin-bottom:17px}.an-toc nav>a,.an-toc summary{display:block;text-decoration:none;font-size:13px;padding:9px 0;line-height:1.5}.an-toc details{border-bottom:1px solid var(--line)}.an-toc summary{font-weight:650;list-style:none;display:flex;justify-content:space-between;gap:10px}.an-toc summary::after{content:'+';font-weight:400;color:#688265}.an-toc details[open] summary::after{content:'\u2212'}.an-toc details a{display:block;font-size:12px;color:var(--muted);padding:5px 0 5px 14px;text-decoration:none}.an-toc a[aria-current='location']{color:#155c36;font-weight:800}.an-toc-foot{font-size:12px;border-top:1px solid var(--line);margin-top:25px;padding-top:18px;color:var(--muted)}.an-copy-button{display:block;background:transparent;border:0;color:var(--green);padding:12px 0 0;font-size:12px;font-weight:700}.an-mobile-toc{display:none}.an-article{min-width:0}.an-article p{margin-bottom:21px}.an-intro p:first-child{font-size:29px;line-height:1.3;font-weight:650;letter-spacing:-.035em}.an-article section{scroll-margin-top:35px;padding-top:60px}
.an-article section#method{padding-top:36px}.an-article h2{font-size:36px;line-height:1.2;letter-spacing:-.045em;font-weight:650;margin-bottom:24px;text-wrap:balance}.an-article h3{font-size:22px;line-height:1.3;letter-spacing:-.025em;margin:35px 0 18px;scroll-margin-top:35px}.an-method{border-left:3px solid #71926b;padding:3px 0 3px 20px;margin:30px 0;color:var(--muted);font-size:13px;line-height:1.7}.an-method strong{color:var(--ink)}.an-method p{margin:0}.an-criteria{padding:0;list-style:none;counter-reset:criteria}.an-criteria li{counter-increment:criteria;position:relative;padding:22px 0 22px 53px;border-top:1px solid var(--line)}.an-criteria li:before{content:'0' counter(criteria);position:absolute;left:0;top:24px;font-size:12px;font-weight:700;color:#638156}.an-criteria strong{display:block;font-size:18px;margin-bottom:5px}.an-criteria p{color:var(--muted);margin:0;font-size:16px}.an-table-shell{border:1px solid #c6d3c5;border-radius:6px;overflow:hidden;margin:28px 0}.an-table-label{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px 24px;background:#eaf1e5}.an-table-label strong{font-size:20px;letter-spacing:-.03em}.an-table-label span{font-size:11px;color:#536953}.an-table-scroll{overflow-x:auto}.an-table-scroll:focus{outline-offset:-3px}.an-table{width:100%;border-collapse:collapse;font-size:14px;min-width:720px;line-height:1.55}.an-table th{text-align:left;padding:17px 18px;background:#123c2d;color:#fff;font-size:12px;letter-spacing:.02em;vertical-align:top}.an-table th:first-child{width:17%}.an-table td{padding:24px 18px;border-bottom:1px solid var(--line);vertical-align:top}.an-table tbody tr:nth-child(even){background:#f0f4ec}.an-table td strong{display:block;font-size:15px;color:var(--ink);margin-bottom:5px}.an-table td small{display:block;color:var(--muted);font-size:12px;margin-top:6px}.an-table td a{font-weight:750;text-decoration:none}.an-table tr:last-child td{border:0}.an-table-footer{font-size:12px;line-height:1.6;padding:16px 22px;color:var(--muted);background:#fff;margin:0!important}.an-tool{border-top:1px solid #b9c9b7;margin-top:60px;padding-top:36px!important}.an-tool-heading{display:flex;gap:20px;align-items:flex-start;margin-bottom:20px}.an-rank{display:flex;align-items:center;justify-content:center;flex:none;height:54px;width:54px;border:1px solid #bdceb8;background:#edf3e7;font-size:18px;font-weight:650;border-radius:50%}.an-tool-heading h2{font-size:44px;margin:1px 0 5px;line-height:1.1}.an-tool-heading .an-eyebrow{font-size:10px;color:#64805b}.an-best{padding:18px 22px;background:#eaf0e4;border-radius:4px;font-size:16px;margin:25px 0!important}.an-product-figure{margin:30px 0!important;border:1px solid var(--line);border-radius:5px;overflow:hidden;background:#f0f3ee}.an-product-figure img{width:100%;max-height:530px;object-fit:contain;padding:20px}.an-product-figure figcaption{font-size:12px;color:var(--muted);background:#fff;padding:12px 18px;border-top:1px solid var(--line)}.an-product-figure figcaption a{text-decoration:none}.an-feature-list{list-style:none;margin:0;padding:0}.an-feature-list li{padding:17px 0;border-top:1px solid var(--line);display:grid;grid-template-columns:190px 1fr;gap:25px;font-size:16px}.an-feature-list strong{font-size:15px}.an-feature-list span{color:var(--ink)}.an-balance{display:grid;grid-template-columns:1fr 1fr;gap:25px;margin:30px 0}.an-balance>div{padding:23px 25px;background:#edf3e8;border-top:3px solid #619053}.an-balance>div+div{background:#f3f0e8;border-color:#a99673}.an-balance h3{font-size:18px;margin:0 0 20px}.an-balance ul{list-style:none;padding:0;margin:0}.an-balance li{font-size:14px;line-height:1.7;margin-top:17px;color:var(--ink)}.an-balance li strong{display:block;font-size:15px;color:var(--ink);margin-bottom:4px}.an-price{border-block:1px solid var(--line);padding:22px 0;margin-top:30px}.an-price h3{margin:0 0 10px}.an-price p{margin:0;font-size:16px}.an-review{margin:28px 0;padding:26px 30px;border:1px solid #d6dfd0;border-radius:5px;background:#fff}.an-review .an-eyebrow{font-size:10px;color:#627359;margin-bottom:13px}.an-review blockquote{font-size:25px;line-height:1.42;letter-spacing:-.028em;margin:14px 0 18px}.an-review .an-review-person{font-size:13px;font-weight:700;margin:0 0 17px}.an-review .an-review-person span{font-weight:400;color:var(--muted)}.an-review p{font-size:15px;color:var(--muted);margin:0}.an-review a{font-size:12px;display:inline-block;margin-top:15px}.an-verdict{padding:22px 25px;background:#041b1c;color:#fff;border-radius:4px;margin-top:30px}.an-verdict .an-eyebrow{color:#1F9FA1;margin-bottom:10px}.an-verdict p{font-size:16px;line-height:1.7;margin:0}.an-sources-inline{display:flex;flex-wrap:wrap;gap:16px;margin-top:17px}.an-sources-inline a{font-size:12px;color:#5b7156}.an-choose-table{font-size:15px}.an-choose-table th{width:auto!important}.an-ending{padding:32px;background:#e9f0e2;margin-top:35px}.an-ending h3{margin:0 0 14px}.an-ending p{margin:0;font-size:16px}.an-author{margin-top:48px;padding:28px 30px;background:transparent;border:1px solid #e6ece6;border-radius:14px;display:flex;gap:28px;align-items:center}.an-author-mark{flex:none;width:64px;height:64px;border-radius:50%;background:#e8efe6;color:#123c2d;display:flex;align-items:center;justify-content:center;border-right:1px solid transparent}.an-author-body{position:relative;min-width:0;padding-left:28px;border-left:1px solid #e6ece6}.an-author-eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;color:#8b9a90;margin-bottom:10px}.an-author-name{font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:500;letter-spacing:-.015em;color:var(--ink);margin-bottom:10px}.an-article .an-author-bio{font-size:15px;line-height:1.65;color:#5a6a60;margin:0;max-width:660px}@media(max-width:520px){.an-author{padding:22px;gap:18px;align-items:flex-start}.an-author-mark{width:48px;height:48px}.an-author-body{padding-left:18px}.an-author-name{font-size:19px}.an-article .an-author-bio{font-size:14px}}.an-source-list{padding-left:22px;font-size:13px;color:var(--muted)}.an-source-list li{padding:9px 0;border-bottom:1px solid var(--line);scroll-margin-top:30px}.an-source-list a{overflow-wrap:anywhere}.an-cta{margin-top:75px;margin-bottom:35px;padding:50px;background:#041b1c;color:#fff;display:grid;grid-template-columns:1.5fr 1fr;gap:65px;align-items:center;border-radius:5px}.an-cta .an-eyebrow{color:#167273}.an-cta h2{font-size:39px;line-height:1.13;letter-spacing:-.04em;margin:16px 0}.an-cta p{color:#cad7c9;font-size:15px;max-width:630px}.an-cta a{display:flex;align-items:center;justify-content:space-between;background:#167273;color:#fff;padding:18px 23px;font-size:14px;font-weight:700;text-decoration:none}.an-cta-note{font-size:12px!important;color:#b5c8b3!important;margin-top:12px!important}.an-footer{display:flex;justify-content:space-between;padding:0 0 35px;font-size:12px;color:var(--muted)}.an-progress{height:3px;position:fixed;top:0;left:0;background:#729754;z-index:10;pointer-events:none}.an-skip{position:fixed;top:-100px;left:15px;background:#fff;padding:10px;z-index:30}.an-skip:focus{top:10px}\n@media(min-width:1500px){.an-hero h1{font-size:66px}}\n@media(max-width:1100px){.an-wrap{width:calc(100% - 56px)}.an-layout{grid-template-columns:190px minmax(0,1fr);gap:38px}.an-hero{gap:30px}.an-hero h1{font-size:46px}.an-feature-list li{grid-template-columns:155px 1fr}.an-balance{gap:14px}.an-balance>div{padding:20px}.an-cta{gap:35px;padding:35px}}\n@media(max-width:850px){.an-wrap{width:calc(100% - 40px)}.an-top nav{display:none}.an-hero-main{grid-template-columns:1fr;padding-top:30px;padding-inline:24px}.an-hero-copy{max-width:650px}.an-hero-art{height:auto;padding:20px 0;width:100%;overflow:visible}.an-hero-art img{width:100%;height:auto;object-fit:contain}.an-hero h1{font-size:53px}.an-strip{gap:17px;font-size:13px}.an-strip .an-eyebrow{width:100%}.an-layout{display:block;padding-top:32px}.an-toc{display:none}.an-mobile-toc{display:block;border-bottom:1px solid var(--line);margin-bottom:32px;padding-bottom:15px}.an-mobile-toc summary{font-size:14px;font-weight:700}.an-mobile-toc nav{display:grid;grid-template-columns:1fr 1fr;padding-top:12px;gap:9px}.an-mobile-toc a{font-size:13px;text-decoration:none}.an-article h2{font-size:32px}.an-cta{grid-template-columns:1fr;gap:28px}.an-cta h2{max-width:600px}.an-cta a{max-width:330px}}\n@media(max-width:520px){.an-page{font-size:16px}.an-wrap{width:calc(100% - 32px)}.an-top{padding:18px 0}.an-hero h1{font-size:39px;letter-spacing:-.048em}.an-deck{font-size:13px}.an-hero-art{height:330px}.an-strip{gap:14px}.an-intro p:first-child{font-size:26px}.an-article section{padding-top:42px}.an-article h2{font-size:29px}.an-tool-heading h2{font-size:37px}.an-tool-heading{gap:14px}.an-rank{width:46px;height:46px}.an-tool-heading .an-eyebrow{font-size:9px}.an-balance{grid-template-columns:1fr}.an-feature-list li{display:block}.an-feature-list strong{display:block;margin-bottom:5px}.an-review{padding:22px}.an-review blockquote{font-size:23px}.an-table-label{padding:17px;display:block}.an-table-label span{display:block;margin-top:5px}.an-table td{padding:20px 15px}.an-product-figure img{padding:10px}.an-product-figure figcaption{font-size:11px}.an-cta{padding:28px}.an-cta h2{font-size:32px}.an-footer{gap:20px}.an-criteria li{padding-left:39px}}\n .an-article .an-built-lede{color:var(--muted);font-size:16px;line-height:1.7}.an-note{display:flex;gap:18px;align-items:flex-start;padding:22px 24px;background:#e6f1ea;border:1px solid #cfe2d6;border-radius:10px;margin:26px 0 8px}.an-note strong{display:block;font-size:15px;margin-bottom:6px}.an-article .an-note p{font-size:14px;line-height:1.65;color:var(--muted);margin:0 0 6px}.an-article .an-note p:last-child{margin:0}.an-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:42px;height:42px;border-radius:50%;background:#dcece3;color:#1f6b4f}.an-article .an-built h3{font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:22px;margin:34px 0 16px}.an-checks{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.an-check{position:relative;display:flex;flex-direction:column;gap:6px;padding:18px 18px 20px;background:transparent;border:1px solid #dbe5dd;border-radius:10px}.an-check-num{font-size:11px;color:#7a8a80;font-weight:600}.an-check .an-icon{position:absolute;top:14px;right:14px}.an-check-text strong{display:block;font-size:15px;margin:14px 0 6px;color:#0f2a24}.an-article .an-check-text p{font-size:14px;line-height:1.55;color:var(--muted);margin:0;max-width:210px}.an-check:last-child{grid-column:1/-1;flex-direction:row;align-items:center;gap:20px;padding:20px 22px}.an-check:last-child .an-check-num{position:absolute;top:14px;left:22px}.an-check:last-child .an-icon{position:static;width:48px;height:48px}.an-check:last-child .an-check-text{margin-top:14px}.an-check:last-child .an-check-text strong{margin-top:0}.an-article .an-check:last-child .an-check-text p{max-width:none}@media(max-width:850px){.an-checks{grid-template-columns:1fr 1fr}}@media(max-width:520px){.an-checks{grid-template-columns:1fr}.an-article .an-check-text p{max-width:none}}.an-hour{margin:34px 0 38px!important;padding:22px 24px 18px;border:1px solid #dbe5dd;border-radius:12px;background:transparent}.an-hour-top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px}.an-hour-top .an-eyebrow{color:#64805b;font-size:10px}.an-hour-tag{font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:#8a6d2f;border:1px dashed #cdb27a;border-radius:999px;padding:3px 10px}.an-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.an-step{display:flex;flex-direction:column;gap:12px;padding:14px 14px 16px;border:1px solid #dbe5dd;border-radius:10px}.an-step-head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}.an-step-head>div span{display:block;font-size:11px;font-weight:600;color:#7a8a80}.an-step-head strong{display:block;font-size:14px;line-height:1.3;color:#0f2a24;margin-top:2px}.an-step-min{font-size:12px;font-weight:700;color:#144c38;white-space:nowrap;border:1px solid #cfe2d6;border-radius:999px;padding:2px 9px}.an-step-vis{min-height:84px;display:flex;flex-direction:column;justify-content:center;gap:8px;padding:10px 12px;border:1px dashed #d3ddd5;border-radius:8px;font-size:12px}.an-wave2{display:flex;align-items:center;gap:2px;height:36px}.an-wave2 i{flex:1;min-width:2px;border-radius:2px;background:#c9d8ce}.an-wave2 i.on{background:#1f6b4f}.an-wave-meta{display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:#144c38}.an-v-row{display:grid;grid-template-columns:68px 1fr;gap:6px;align-items:baseline;line-height:1.4}.an-v-row em{font-style:normal;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#7a8a80}.an-v-row b{font-weight:650;background:linear-gradient(transparent 62%,#d8f4ad 62%);width:fit-content;padding:0 3px}.an-v-row span{color:var(--muted)}.an-caret{display:inline-block;width:1px;height:13px;background:#144c38;margin-left:3px;vertical-align:-2px;animation:an-blink 1.1s steps(1) infinite}@keyframes an-blink{50%{opacity:0}}.an-bub{max-width:90%;padding:6px 10px;border-radius:12px;font-size:12px;line-height:1.35}.an-bub.in{align-self:flex-start;background:#eef3ec;color:#4f5b50;border-bottom-left-radius:3px}.an-bub.out{align-self:flex-end;border:1px solid #cfe2d6;color:#144c38;border-bottom-right-radius:3px}.an-me{display:flex;align-items:center;gap:12px;margin-top:auto}.an-face{flex:none;display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;background:#dcece3;color:#1f6b4f}.an-face.ugh{background:#f1e3bd;color:#8a6d2f}.an-face.flat{background:#e7e5df;color:#5f625c}.an-article .an-thought{position:relative;margin:0;padding:7px 11px;background:#f6efd6;color:#5f5330;font-size:12px;line-height:1.35;font-style:italic;border-radius:10px}.an-thought:before{content:'';position:absolute;left:-4px;top:50%;width:8px;height:8px;margin-top:-4px;background:#f6efd6;transform:rotate(45deg)}.an-compare{display:grid;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid #dbe5dd}.an-cmp-row{display:grid;grid-template-columns:200px 1fr 56px;gap:14px;align-items:center;font-size:13px;color:var(--muted)}.an-cmp-row b{text-align:right;font-weight:650;font-variant-numeric:tabular-nums;color:#0f2a24}.an-cmp-bar{display:block;height:8px;border-radius:4px;background:#e3ebe5;overflow:hidden}.an-cmp-bar i{display:block;height:100%;border-radius:4px;background:#1f6b4f}.an-cmp-row.after{color:#0f2a24;font-weight:650}.an-cmp-row.after .an-cmp-bar i{background:#c9a24d}.an-cmp-row.after b{font-size:18px;letter-spacing:-.03em}.an-hour figcaption{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px 14px;margin-top:18px}.an-hour figcaption strong{font-family:Georgia,'Times New Roman',serif;font-style:italic;font-weight:500;font-size:19px;color:#0f2a24}.an-hour figcaption span{font-size:11px;color:#7a8a80}@media(max-width:800px){.an-steps{grid-template-columns:1fr}.an-cmp-row{grid-template-columns:1fr 56px}.an-cmp-bar{grid-column:1/-1;order:3}}@media(prefers-reduced-motion:reduce){.an-caret{animation:none}} @media(prefers-reduced-motion:reduce){.an-page *{scroll-behavior:auto!important}}.an-crit{display:flex;flex-direction:column;gap:24px;margin-top:30px}.an-crit-row{position:relative;display:flex;gap:20px;align-items:flex-start;padding:22px 24px;background:transparent;border:1px solid #dbe5dd;border-radius:10px}.an-crit-row .an-icon{width:48px;height:48px}.an-crit-row:not(:last-child):after{content:'';position:absolute;left:47px;bottom:-22px;height:16px;border-left:1px dashed #b9cdbf}.an-crit-text{min-width:0}.an-crit-text .an-check-num{display:block;margin-bottom:4px}.an-crit-text strong{display:block;font-size:18px;color:#0f2a24;margin-bottom:6px}.an-article .an-crit-text p{font-size:15px;line-height:1.65;color:var(--ink);margin:0}
.an-article .an-crit-text p + p{margin-top:10px}@media(max-width:520px){.an-crit-row{padding:18px;gap:14px}.an-crit-row:not(:last-child):after{left:41px}}{.an-page *{scroll-behavior:auto!important}}\n.an-clean-shell{border:0;border-radius:0;overflow:visible;margin:30px 0}.an-clean-shell .an-table-scroll{overflow-x:auto}.an-clean{min-width:720px}.an-clean th{background:transparent;color:#7a8a80;font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;padding:0 20px 14px 0;border-bottom:1px solid #112c25}.an-clean th:first-child{width:16%}.an-clean td{padding:24px 20px 24px 0;border-bottom:1px solid #dbe5dd;font-size:14px;line-height:1.6;color:var(--muted)}.an-clean tbody tr:nth-child(even){background:transparent}.an-clean tr:last-child td{border-bottom:1px solid #dbe5dd}.an-clean td:first-child a{font-size:16px;font-weight:700;color:var(--ink);letter-spacing:-.01em}.an-clean td strong{font-size:14px;color:var(--ink);margin-bottom:2px}.an-clean td small{font-size:12px;color:#7a8a80;margin-top:2px}.an-clean-shell .an-table-footer{background:transparent;padding:16px 0 0;font-size:12px;color:#7a8a80} @media print{.an-toc,.an-mobile-toc,.an-top,.an-progress,.an-cta,.an-footer,.an-copy-button{display:none}.an-layout{display:block}.an-wrap{width:100%}.an-hero{padding:15px 0}.an-hero h1{font-size:34px}.an-table{min-width:0}.an-balance,.an-review,.an-verdict{break-inside:avoid}.an-tool{break-before:page}.an-page{font-size:12px}.an-article h2{font-size:27px}}\n




/* HERO — EDITORIAL Aa ARTWORK */

.an-page .an-hero-main {
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: clamp(32px, 4vw, 64px);
  align-items: center;
}

.an-page .an-type-art {
  width: 100%;
  max-width: 640px;
  min-width: 0;
  justify-self: end;
  align-self: center;
}

.an-page .an-type-art svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

/* Stack artwork beneath the copy on smaller screens. */

@media (max-width: 850px) {
  .an-page .an-hero .an-container {
    width: calc(100% - 48px);
  }

  .an-page .an-hero-main {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
    min-height: 0;
    padding-inline: 0;
  }

  .an-page .an-type-art {
    max-width: 520px;
    justify-self: center;
  }
}

@media (max-width: 520px) {
  .an-page .an-hero .an-container {
    width: calc(100% - 32px);
  }

  .an-page .an-hero-main {
    gap: 12px;
  }

  .an-page .an-type-art {
    max-width: 380px;
  }
}

.an-page .an-hero h1.an-hero-title {
  font-size: clamp(32px, 3.4vw, 52px);
  line-height: 1.1;
}

.an-page .an-hero-title > span {
  display: block;
  white-space: nowrap;
}

/* Allow natural wrapping on small screens. */
@media (max-width: 600px) {
  .an-page .an-hero h1.an-hero-title {
    font-size: clamp(30px, 7vw, 39px);
  }

  .an-page .an-hero-title > span {
    white-space: normal;
  }
}

`;
