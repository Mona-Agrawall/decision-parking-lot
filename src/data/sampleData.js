import { getRelativeDateString } from '../utils/dateUtils';

export const CATEGORIES = [
  'Career',
  'Education',
  'Finance',
  'Personal',
  'Technology',
  'Travel',
  'Other'
];

/**
 * 9 Realistic, relatable sample decisions for a final-year engineering student.
 * Reflects placement anxieties, academic tradeoffs, friendships, and moving to corporate life.
 * Relative dates guarantee 1 due today and 1 overdue to immediately demonstrate attention states.
 */
export function getInitialSampleDecisions() {
  return [
    {
      id: 'dec-1',
      slotNumber: 1,
      isSample: true,
      title: 'Should I accept the campus offer or keep preparing for product-based drives?',
      category: 'Career',
      reason: 'Got a 5.5 LPA offer from an IT services company with a 5-day deadline to sign the intent letter, but off-campus product company drives begin next month.',
      options: [
        {
          title: 'Accept the campus offer to secure a safety net and continue prep on weekends',
          pros: [
            'Guaranteed employment before graduation with zero placement anxiety',
            'Family peace of mind and steady first paycheck'
          ],
          cons: [
            '2-year service agreement with financial bond penalty if breaking early',
            'Strict training joining dates might conflict with off-campus interview rounds'
          ]
        },
        {
          title: 'Decline the offer and go all-in preparing for 12+ LPA product company drives',
          pros: [
            '100% focused study time for LeetCode medium/hard and system design',
            'Higher starting compensation and steeper learning curve'
          ],
          cons: [
            'Job market uncertainty and risk of being unplaced at graduation',
            'High mental stress during prolonged off-campus waiting periods'
          ]
        }
      ],
      questions: [
        { id: 'q-1-1', text: 'Does the offer letter impose a legal penalty if I decline after signing the LOI?', answered: true },
        { id: 'q-1-2', text: 'How many product companies are confirmed to visit our T&P cell in Phase 2?', answered: false },
        { id: 'q-1-3', text: 'Can I negotiate a 1-week extension with the campus placement coordinator?', answered: true }
      ],
      nextSteps: [
        {
          id: 'step-1-1',
          text: 'Speak to college placement officer about Phase 2 company visit dates',
          minutes: 15,
          completed: false
        }
      ],
      reviewDate: getRelativeDateString(0), // Due today! Triggers Needs Attention
      currentThinking: 'Having peace of mind is tempting, but the 2-year bond clause makes me anxious. Need to confirm if breaking an LOI before joining has legal teeth.',
      status: 'parked',
      createdAt: getRelativeDateString(-6),
      decisionResult: null
    },
    {
      id: 'dec-2',
      slotNumber: 2,
      isSample: true,
      title: 'Should I grind DSA or build a full-stack portfolio project before placement week?',
      category: 'Career',
      reason: 'First round of campus technical tests starts in 3 weeks. Online assessments filter ruthlessly by DSA, but technical interviewers drill down on resume projects.',
      options: [
        {
          title: 'Dedicate 80% of daily time to NeetCode 150 patterns (Trees, DP, Graphs)',
          pros: [
            'Clears the automated online assessment (OA) where 75% of applicants get cut',
            'Standardized question patterns that appear repeatedly in campus tests'
          ],
          cons: [
            'Resume looks identical to hundreds of batchmates if projects are cookie-cutter',
            'Can feel monotonous and burn out brain before interview day'
          ]
        },
        {
          title: 'Finish building and deploying the real-time collaboration tool with WebSockets & Docker',
          pros: [
            'Standout resume talking point during hiring manager rounds',
            'Proves practical engineering ability beyond memorized algorithmic tricks'
          ],
          cons: [
            'No one evaluates your projects if you fail the initial OA coding test',
            'Debugging DevOps and Docker issues might eat up critical revision days'
          ]
        }
      ],
      questions: [
        { id: 'q-2-1', text: 'What question types appeared in last year test papers for visiting firms?', answered: true },
        { id: 'q-2-2', text: 'Can I complete core features of the project in under 10 focused hours?', answered: false }
      ],
      nextSteps: [
        {
          id: 'step-2-1',
          text: 'Solve 3 medium Binary Tree problems on LeetCode before 8 PM',
          minutes: 45,
          completed: false
        }
      ],
      reviewDate: getRelativeDateString(3), // in 3 days
      currentThinking: 'Passing the OA is the prerequisite gatekeeper. I should split: 3 hours DSA every morning, 1.5 hours project polish in the evening.',
      status: 'parked',
      createdAt: getRelativeDateString(-4),
      decisionResult: null
    },
    {
      id: 'dec-3',
      slotNumber: 3,
      isSample: true,
      title: 'Should I relocate to Bangalore for my first job or look for hybrid roles closer home?',
      category: 'Career',
      reason: 'Fintech startup offer requires relocating to HSR Layout Bangalore. The networking and career acceleration are huge, but living costs and rent deposits are daunting.',
      options: [
        {
          title: 'Move to Bangalore and share a 3BHK flat with college friends',
          pros: [
            'Immersed in tech meetups, startup culture, and rapid peer learning',
            'Experience independent living and adulthood right after college'
          ],
          cons: [
            'Massive initial security deposit (5-6 months rent upfront)',
            'Daily Bangalore traffic commute and higher living overhead'
          ]
        },
        {
          title: 'Look for hybrid or remote software roles based closer to my hometown',
          pros: [
            'Save 60%+ of starting salary and enjoy home-cooked meals',
            'Zero relocation stress, no furniture buying or brokerage fees'
          ],
          cons: [
            'Slower professional network expansion and fewer informal mentor chats',
            'Household distractions during working hours'
          ]
        }
      ],
      questions: [
        { id: 'q-3-1', text: 'Will the startup offer a relocation allowance or 14-day transit stay?', answered: true },
        { id: 'q-3-2', text: 'What is the realistic monthly per-person budget for a shared flat in HSR?', answered: true }
      ],
      nextSteps: [
        {
          id: 'step-3-1',
          text: 'Create a monthly budget spreadsheet comparing Bangalore rent vs savings',
          minutes: 20,
          completed: true
        }
      ],
      reviewDate: getRelativeDateString(6), // in 6 days
      currentThinking: 'Living in Bangalore for the first two years will jumpstart my career trajectory, even if my bank savings grow a bit slower.',
      status: 'parked',
      createdAt: getRelativeDateString(-7),
      decisionResult: null
    },
    {
      id: 'dec-4',
      slotNumber: 4,
      isSample: true,
      title: 'Should I participate in the 36-hour hackathon or study for midterms?',
      category: 'Education',
      reason: 'Smart India Hackathon internal college qualifiers take place this weekend, but 7th semester mid-term exams begin next Wednesday.',
      options: [
        {
          title: 'Compete in the hackathon to build our AI triage prototype with the team',
          pros: [
            'Opportunity to win institutional prize and secure a direct campus interview waiver',
            'Great adrenaline rush and high-impact project for resume'
          ],
          cons: [
            'Loss of entire Saturday & Sunday study hours right before exams',
            'Physical fatigue heading into Monday morning lab viva'
          ]
        },
        {
          title: 'Skip the hackathon and dedicate the weekend to question bank revision',
          pros: [
            'Protects 8.5+ CGPA required to qualify for tier-1 company shortlists',
            'Less mental exhaustion and better sleep schedule'
          ],
          cons: [
            'Letting down team members who counted on my frontend skills',
            'FOMO seeing peer prototypes showcased on LinkedIn'
          ]
        }
      ],
      questions: [
        { id: 'q-4-1', text: 'Can our team split night shifts so each member gets 5 hours of sleep?', answered: true },
        { id: 'q-4-2', text: 'What minimum marks do I need in midterms to maintain overall A-grade?', answered: true }
      ],
      nextSteps: [
        {
          id: 'step-4-1',
          text: 'Complete Unit 3 operating systems notes by Friday afternoon',
          minutes: 40,
          completed: false
        }
      ],
      reviewDate: getRelativeDateString(1), // Due tomorrow
      currentThinking: 'If I finish unit 3 notes by Friday night, I can give 24 focused hours to the hackathon without hurting my midterm scores.',
      status: 'parked',
      createdAt: getRelativeDateString(-2),
      decisionResult: null
    },
    {
      id: 'dec-5',
      slotNumber: 5,
      isSample: true,
      title: 'Should I text my old school friend to reconnect before college ends?',
      category: 'Personal',
      reason: 'We were best friends in high school but drifted apart during college semesters due to distance and busy placement prep. Graduation is approaching and I miss the bond.',
      options: [
        {
          title: 'Send a casual, low-pressure message sharing a funny throwback memory',
          pros: [
            'Warm and natural opener that does not induce guilt about being out of touch',
            'Opens the door to meeting up over graduation break'
          ],
          cons: [
            'Mild vulnerability if they reply with a short or delayed response'
          ]
        },
        {
          title: 'Wait until graduation week when I visit our hometown in person',
          pros: [
            'Meeting face-to-face over chai feels more organic than texting'
          ],
          cons: [
            'Easy to keep procrastinating until everyone leaves for corporate jobs',
            'Might feel awkward planning a meetup out of nowhere after months of silence'
          ]
        }
      ],
      questions: [
        { id: 'q-5-1', text: 'Was there any specific conflict, or just natural distance from college life?', answered: true },
        { id: 'q-5-2', text: 'Would I genuinely regret not reaching out before everyone scatters?', answered: true }
      ],
      nextSteps: [
        {
          id: 'step-5-1',
          text: 'Draft a friendly 2-line message asking how their final exams went',
          minutes: 5,
          completed: false
        }
      ],
      reviewDate: getRelativeDateString(-1), // Overdue by 1 day! Triggers Needs Attention
      currentThinking: 'Everyone gets consumed by placements. A warm message costs nothing and might rekindle a friendship that mattered.',
      status: 'parked',
      createdAt: getRelativeDateString(-5),
      decisionResult: null
    },
    {
      id: 'dec-6',
      slotNumber: 6,
      isSample: true,
      title: 'Should I set boundaries with a friend who frequently cancels plans last minute?',
      category: 'Personal',
      reason: 'A close batchmate has flaked on group study sessions and dinner plans three times this month after I already traveled to the venue, which makes me feel undervalued.',
      options: [
        {
          title: 'Have a calm, direct chat explaining how sudden cancellations disrupt my study schedule',
          pros: [
            'Addresses the issue with honesty and maturity before resentment builds',
            'Gives them awareness of how their habit impacts others'
          ],
          cons: [
            'Brief moment of social awkwardness or defensiveness'
          ]
        },
        {
          title: 'Stop initiating plans and let them suggest the next hangout',
          pros: [
            'Protects my time and energy without an uncomfortable confrontation'
          ],
          cons: [
            'Passive approach that leaves things unsaid and risks slow drift'
          ]
        }
      ],
      questions: [
        { id: 'q-6-1', text: 'Are they going through placement rejections or family issues right now?', answered: false },
        { id: 'q-6-2', text: 'How can I frame it using "I feel" language instead of accusatory tone?', answered: true }
      ],
      nextSteps: [
        {
          id: 'step-6-1',
          text: 'Write down 2 clear talking points to mention kindly after class',
          minutes: 10,
          completed: false
        }
      ],
      reviewDate: getRelativeDateString(4), // in 4 days
      currentThinking: 'Clear boundaries preserve friendships; silent resentment ruins them.',
      status: 'parked',
      createdAt: getRelativeDateString(-3),
      decisionResult: null
    },
    {
      id: 'dec-7',
      slotNumber: 7,
      isSample: true,
      title: 'Should I start investing 20% of my stipend or keep it in high-yield savings?',
      category: 'Finance',
      reason: 'Earning my first regular internship stipend (₹30,000/month). Want to start compounding early, but will need relocation funds and a laptop repair buffer in 3 months.',
      options: [
        {
          title: 'Start a ₹5,000 monthly SIP in a Nifty 50 index mutual fund',
          pros: [
            'Instills lifelong investing discipline and rupee-cost averaging at age 21',
            'Builds compound returns over multi-year horizon'
          ],
          cons: [
            'Market volatility means funds cannot be treated as short-term emergency cash'
          ]
        },
        {
          title: 'Keep all savings in a high-yield liquid fund / savings account until joining full-time',
          pros: [
            '100% accessible liquidity for flat security deposit and transit flights',
            'Zero anxiety about market downturns before receiving first corporate paycheck'
          ],
          cons: [
            'Misses out on establishing early mutual fund investment habits'
          ]
        }
      ],
      questions: [
        { id: 'q-7-1', text: 'What is the minimum cash cushion needed for Bangalore 1st month expenses?', answered: true },
        { id: 'q-7-2', text: 'Can mutual fund SIPs on Zerodha Coin be paused without penalty?', answered: true }
      ],
      nextSteps: [
        {
          id: 'step-7-1',
          text: 'Complete KYC verification on Groww or Zerodha Coin',
          minutes: 15,
          completed: true
        }
      ],
      reviewDate: getRelativeDateString(7), // in 7 days
      currentThinking: 'A modest ₹3,000 index SIP builds the habit while keeping ₹15,000 monthly in pure liquid reserve.',
      status: 'parked',
      createdAt: getRelativeDateString(-9),
      decisionResult: null
    },
    {
      id: 'dec-8',
      slotNumber: 8,
      isSample: true,
      title: 'Should I learn to cook 5 reliable meals before moving into a shared apartment?',
      category: 'Personal',
      reason: 'Ordering food daily from Zomato and eating mess food is causing fatigue during interview season and draining monthly money. Need basic kitchen self-sufficiency.',
      options: [
        {
          title: 'Spend Sunday mornings practicing 5 foundational recipes (dal-chawal, paneer bhurji, oats, egg curry, sabzi)',
          pros: [
            'Saves ₹6,000+ monthly in food expenses and dramatically improves daily energy',
            'Crucial life skill that makes flatmate living cooperative and enjoyable'
          ],
          cons: [
            'Requires 2 hours of grocery shopping and clean-up each weekend'
          ]
        },
        {
          title: 'Rely on a local dabba / tiffin delivery service when starting the job',
          pros: [
            'Zero cooking time or vessel washing after 9-hour workdays'
          ],
          cons: [
            'Taste monotony and oily preparation after 3 weeks',
            'Ongoing recurring expense of ₹4,500/month'
          ]
        }
      ],
      questions: [
        { id: 'q-8-1', text: 'What basic cookware (pressure cooker, skillet, knife) is essential to start?', answered: true },
        { id: 'q-8-2', text: 'Can flatmates take turns cooking on weekdays?', answered: false }
      ],
      nextSteps: [
        {
          id: 'step-8-1',
          text: 'Cook yellow dal and jeera rice from YouTube recipe this Sunday',
          minutes: 35,
          completed: false
        }
      ],
      reviewDate: getRelativeDateString(2), // in 2 days
      currentThinking: 'Feeding myself clean food is a basic adult competence. Learning 5 simple staples before leaving campus is worth the Sunday time.',
      status: 'parked',
      createdAt: getRelativeDateString(-2),
      decisionResult: null
    },
    {
      id: 'dec-9',
      slotNumber: 9,
      isSample: true,
      title: 'Should I plan a 5-day graduation road trip with friends before joining dates?',
      category: 'Travel',
      reason: 'Friends are renting bikes for a coastal Gokarna trip right after 8th semester exams. Corporate onboarding is 3 weeks later. Wondering whether to save money or make memories.',
      options: [
        {
          title: 'Go on the 5-day trip with a disciplined ₹10,000 budget cap',
          pros: [
            'Unrepeatable milestone memory with batchmates before people scatter across cities',
            'Full mental reset after two intense placement semesters'
          ],
          cons: [
            'Dents savings right before paying apartment rental deposits'
          ]
        },
        {
          title: 'Propose a shorter 2-day weekend getaway closer to campus',
          pros: [
            'Keeps total cost under ₹3,500 while still celebrating graduation together'
          ],
          cons: [
            'Might regret passing on the big final trip everyone had discussed since 2nd year'
          ]
        }
      ],
      questions: [
        { id: 'q-9-1', text: 'Can we book shared hostel dorms on Zostel early to keep costs low?', answered: true },
        { id: 'q-9-2', text: 'Will company document verification dates clash with trip dates?', answered: true }
      ],
      nextSteps: [
        {
          id: 'step-9-1',
          text: 'Review corporate onboarding email for mandatory background check dates',
          minutes: 10,
          completed: true
        }
      ],
      reviewDate: getRelativeDateString(5), // in 5 days
      currentThinking: 'I will earn back this money in my first two paychecks, but I will never get this specific college friend group free together again.',
      status: 'parked',
      createdAt: getRelativeDateString(-4),
      decisionResult: null
    }
  ];
}

/**
 * Full Catalog of 23 Additional Relatable College Decisions.
 * Available through the "Explore Sample Decisions" catalog so students can add any scenario
 * to their dashboard without creating duplicates.
 */
export const CATALOG_DECISION_POOL = [
  {
    title: 'Should I take an offer with a 2-year service agreement or decline it?',
    category: 'Career',
    tag: 'Placements',
    reason: 'Received an offer letter with a ₹2.5 lakh bond penalty if leaving before 24 months. Wondering if job security outweighs career mobility.',
    options: [
      {
        title: 'Sign the agreement and stay committed for 24 months',
        pros: ['Guaranteed corporate experience and structured entry-level training'],
        cons: ['Cannot switch even if market pays 2x or project work is outdated']
      },
      {
        title: 'Decline and look for companies without restrictive bond clauses',
        pros: ['Complete freedom to switch if underpaid or unsatisfied with role'],
        cons: ['Risk of extended job hunt in a tight campus recruitment cycle']
      }
    ],
    questions: [
      { id: 'cq-1', text: 'Is the bond legally enforceable if company changes job role?', answered: false },
      { id: 'cq-2', text: 'Do previous batch seniors report good tech stack exposure?', answered: true }
    ],
    nextSteps: [
      { id: 'cs-1', text: 'Message 2 alumni on LinkedIn who completed the 2-year tenure', minutes: 15, completed: false }
    ],
    reviewDateOffset: 3,
    currentThinking: 'Unless the training curriculum is exceptionally strong, a 2-year lock-in feels very restrictive.'
  },
  {
    title: 'Should I message an alumnus on LinkedIn to ask about their career path?',
    category: 'Career',
    tag: 'Networking',
    reason: 'An alumnus from my department works as a Backend Engineer at a company I admire. Want to ask for guidance without sounding entitled or asking for a referral right away.',
    options: [
      {
        title: 'Send a personalized note highlighting their recent tech blog post and asking 2 specific questions',
        pros: ['Demonstrates genuine respect for their time and engineering work', 'High reply rate when questions are thoughtful'],
        cons: ['Takes 20 minutes to research their work and draft properly']
      },
      {
        title: 'Send a quick connection request with default LinkedIn template',
        pros: ['Zero effort and fastest to dispatch'],
        cons: ['Very low acceptance rate; looks like spam']
      }
    ],
    questions: [
      { id: 'cq-3', text: 'What specific project or open source repo did they work on?', answered: true },
      { id: 'cq-4', text: 'Is my LinkedIn profile headline and GitHub link updated?', answered: true }
    ],
    nextSteps: [
      { id: 'cs-2', text: 'Draft a 4-sentence connection note focusing on their Go microservices talk', minutes: 12, completed: false }
    ],
    reviewDateOffset: 2,
    currentThinking: 'Engineers love helping juniors who show curiosity and do preliminary homework.'
  },
  {
    title: 'Should I apply for an internship even if I do not meet every single requirement?',
    category: 'Career',
    tag: 'Placements',
    reason: 'Job listing asks for 1+ year React, Redux, Docker, and AWS experience for a student intern position. I have strong React skills but only basic Docker knowledge.',
    options: [
      {
        title: 'Apply immediately with a targeted cover note demonstrating my React projects',
        pros: ['Job requirements are often wishlists; hiring managers prioritize eagerness to learn'],
        cons: ['Might face questions on Docker during technical interview']
      },
      {
        title: 'Spend 2 weeks studying Docker and AWS before submitting application',
        pros: ['More confident during comprehensive technical grilling'],
        cons: ['Position might get filled while I am studying']
      }
    ],
    questions: [
      { id: 'cq-5', text: 'Can I containerize my React project in one weekend using a Dockerfile?', answered: true },
      { id: 'cq-6', text: 'Does the company culture encourage mentorship for interns?', answered: false }
    ],
    nextSteps: [
      { id: 'cs-3', text: 'Add a Dockerfile and docker-compose to my main GitHub portfolio project', minutes: 25, completed: false }
    ],
    reviewDateOffset: 2,
    currentThinking: 'You miss 100% of shots you do not take. Apply now while watching a 30-minute Docker primer.'
  },
  {
    title: 'Should I negotiate my first job offer or accept the standard campus package?',
    category: 'Career',
    tag: 'Negotiation',
    reason: 'Received an off-campus offer that is 10% below market average for the role. Not sure if entry-level candidates have leverage to negotiate politely.',
    options: [
      {
        title: 'Politely counter-offer citing market research and competing campus shortlisted status',
        pros: ['Can earn ₹40k-₹60k more annually with zero downside if done professionally'],
        cons: ['Requires delicate, polite phrasing to avoid sounding arrogant']
      },
      {
        title: 'Accept the initial offer as-is to preserve good goodwill',
        pros: ['Zero risk of awkwardness with HR before day one'],
        cons: ['Sets lower compensation baseline for subsequent annual appraisal cycles']
      }
    ],
    questions: [
      { id: 'cq-7', text: 'Is the company compensation rigid band or recruiter-discretionary?', answered: false },
      { id: 'cq-8', text: 'Do I have a competing offer or deadline to anchor my request?', answered: true }
    ],
    nextSteps: [
      { id: 'cs-4', text: 'Draft polite negotiation email referencing Glassdoor salary ranges', minutes: 20, completed: false }
    ],
    reviewDateOffset: 1,
    currentThinking: 'Polite negotiation is expected in tech. The worst they say is the offer is fixed.'
  },
  {
    title: 'Should I pursue an AI/ML specialized role or focus on general software engineering?',
    category: 'Technology',
    tag: 'Career Path',
    reason: 'AI is trending everywhere, but entry-level roles often demand Masters/PhDs or turn out to be data labeling, while full-stack software engineering has abundant entry-level openings.',
    options: [
      {
        title: 'Focus on full-stack/backend engineering (APIs, databases, concurrency) with LLM integrations',
        pros: ['Huge volume of entry-level openings; pragmatic engineering foundation'],
        cons: ['May feel FOMO if AI-specific research positions open up']
      },
      {
        title: 'Specialize purely in ML model training, PyTorch, and mathematics',
        pros: ['High long-term upside for specialized research and compute infrastructure'],
        cons: ['Fewer entry-level positions for fresh B.Tech graduates without research papers']
      }
    ],
    questions: [
      { id: 'cq-9', text: 'How many campus companies specifically hire for ML vs SDE roles?', answered: true },
      { id: 'cq-10', text: 'Can I apply ML concepts practically inside full-stack applications?', answered: true }
    ],
    nextSteps: [
      { id: 'cs-5', text: 'Integrate an LLM embedding search feature into my existing backend app', minutes: 35, completed: false }
    ],
    reviewDateOffset: 4,
    currentThinking: 'Being a solid software engineer who knows how to productionize AI models is the sweet spot.'
  },
  {
    title: 'Should I fix my sleep schedule before starting a full-time corporate job?',
    category: 'Personal',
    tag: 'Health & Routine',
    reason: 'College habit of sleeping at 3:30 AM and waking at 11 AM will cause severe mental brain fog when morning 9:00 AM daily standups begin next month.',
    options: [
      {
        title: 'Shift bedtime 30 minutes earlier every two nights with a strict screen cutoff at 11 PM',
        pros: ['Gradual adaptation without painful insomnia; sustained morning alertness'],
        cons: ['Misses out on late-night Discord gaming sessions with college friends']
      },
      {
        title: 'Pull an all-nighter reset and force waking at 7 AM immediately',
        pros: ['Quick attempt at instant circadian reset'],
        cons: ['Usually backfires after two days of intense afternoon exhaustion']
      }
    ],
    questions: [
      { id: 'cq-11', text: 'What time does the company morning standup take place?', answered: true },
      { id: 'cq-12', text: 'Can I leave my phone charging across the room away from bed?', answered: false }
    ],
    nextSteps: [
      { id: 'cs-6', text: 'Put phone on Do Not Disturb and read a book at 11:30 PM tonight', minutes: 5, completed: false }
    ],
    reviewDateOffset: 3,
    currentThinking: 'Physical health is the foundation of cognitive stamina in your first corporate year.'
  },
  {
    title: 'Should I buy a new laptop now or continue using my current one for work?',
    category: 'Technology',
    tag: 'Gadgets & Budget',
    reason: 'My 4-year-old laptop has a dying battery and heats up on Docker, but company may provide a corporate MacBook on day one.',
    options: [
      {
        title: 'Wait until day one of joining to see company hardware provision',
        pros: ['Saves ₹80,000+ if company provides an M-series MacBook Pro for work'],
        cons: ['Still have to endure slow compilation for final semester college capstone']
      },
      {
        title: 'Buy a personal MacBook Air M2 now on student discount',
        pros: ['Great battery for personal side projects, travel, and college final viva'],
        cons: ['Significant expense before receiving my first corporate paycheck']
      }
    ],
    questions: [
      { id: 'cq-13', text: 'Does the company onboarding email mention laptop shipping?', answered: true },
      { id: 'cq-14', text: 'Can I replace the internal battery of my old laptop for under ₹2,500?', answered: false }
    ],
    nextSteps: [
      { id: 'cs-7', text: 'Check local repair shop battery replacement quote', minutes: 15, completed: false }
    ],
    reviewDateOffset: 5,
    currentThinking: 'If company issues a laptop for work, my personal laptop only needs a ₹2,000 battery swap for now.'
  },
  {
    title: 'Should I prioritize CGPA or spend more time learning practical cloud devops?',
    category: 'Education',
    tag: 'Academics',
    reason: 'Currently at 8.2 CGPA. Pushing for 8.8 requires memorizing theory question banks, whereas learning Docker and AWS builds real employment skills.',
    options: [
      {
        title: 'Maintain safe 8.0+ CGPA buffer while dedicating 10 hours weekly to AWS & Docker',
        pros: ['Best of both worlds: clears company cutoffs while acquiring employable skills'],
        cons: ['Will not get top-3 university rank certificates']
      },
      {
        title: 'Focus 100% on textbook syllabus to push CGPA above 9.0',
        pros: ['Stronger credentials if applying for Masters abroad in 2-3 years'],
        cons: ['Graduating without hands-on cloud deployment experience']
      }
    ],
    questions: [
      { id: 'cq-15', text: 'What is the highest CGPA cutoff among top tier campus recruiters?', answered: true },
      { id: 'cq-16', text: 'Does AWS offer a free tier student credit program?', answered: true }
    ],
    nextSteps: [
      { id: 'cs-8', text: 'Set up free AWS Educate account and launch first EC2 instance', minutes: 30, completed: false }
    ],
    reviewDateOffset: 4,
    currentThinking: 'An 8.2 CGPA satisfies virtually every company cutoff. Hands-on deployment skills win the actual interview.'
  },
  {
    title: 'Should I attend a college event or use that time to prepare for an assessment?',
    category: 'Education',
    tag: 'Campus Life',
    reason: 'Annual college cultural fest is this Saturday. It is the last fest of our college life, but an off-campus online assessment is scheduled Sunday morning.',
    options: [
      {
        title: 'Attend the Saturday evening fest performances and study Sunday early morning',
        pros: ['Last chance to enjoy college fest memories with batchmates before graduating'],
        cons: ['Risk of sleepiness or lack of sharp focus during the 10 AM assessment']
      },
      {
        title: 'Skip the fest entirely and do mock test simulations in the library',
        pros: ['Peak mental preparation and zero assessment anxiety'],
        cons: ['Instant regret watching friends stories and feeling burned out']
      }
    ],
    questions: [
      { id: 'cq-17', text: 'Can I do 4 hours of revision Saturday morning before attending the evening fest?', answered: true },
      { id: 'cq-18', text: 'What is the exact start window for Sunday online assessment?', answered: true }
    ],
    nextSteps: [
      { id: 'cs-9', text: 'Take 1 timed mock test on Saturday 10 AM to finish prep early', minutes: 60, completed: false }
    ],
    reviewDateOffset: 1,
    currentThinking: 'Balance: 4 hours of morning discipline unlocks a guilt-free Saturday evening with friends.'
  },
  {
    title: 'Should I take a short 2-week break after graduation or start working immediately?',
    category: 'Personal',
    tag: 'Life Transition',
    reason: 'Company offers flexible joining dates between June 15 and July 15. Eager to start earning, but aware that corporate leaves are limited once work begins.',
    options: [
      {
        title: 'Choose July 15 joining date to spend 3 weeks with family and recharge',
        pros: ['Mental rest after 4 intense engineering years; enters job energetic and refreshed'],
        cons: ['Delays first salary paycheck by one month']
      },
      {
        title: 'Join on June 15 to start accumulating seniority and salary immediately',
        pros: ['Early paycheck and earlier eligibility for annual appraisal cycle'],
        cons: ['Zero transition time between college submissions and corporate onboarding']
      }
    ],
    questions: [
      { id: 'cq-19', text: 'Does joining in July affect the first appraisal cycle timing?', answered: true },
      { id: 'cq-20', text: 'Can I afford living expenses at home for 3 extra weeks?', answered: true }
    ],
    nextSteps: [
      { id: 'cs-10', text: 'Email HR asking if joining date choice impacts training batches', minutes: 10, completed: false }
    ],
    reviewDateOffset: 6,
    currentThinking: 'You will work for the next 35 years. A 3-week breather to recharge and be with family is invaluable.'
  }
];
