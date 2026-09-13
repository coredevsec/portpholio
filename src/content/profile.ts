// ─────────────────────────────────────────────────────────────
// Single source of truth for the portfolio.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Korede Ogundana",
  headline:
    "Computer Science Student · IT Support · Java, Python, Linux & Networking · Aspiring Software Engineer",
  location: "Lagos State, Nigeria",
  about:
    "I work at the intersection of engineering principles, cybersecurity and digital operations. Day to day that means Know Your Customer (KYC) verification work, applying secure practices to protect data integrity, and using tools like JavaScript, SQL Server and Excel to make compliance checks faster and more precise. I am currently studying Computer Science at the University of the People while building depth in Java, Python, Linux and networking, and I am open to IT support and software engineering roles.",
  links: {
    linkedin: "https://www.linkedin.com/in/ogundana-korede/",
    email: "",
    phone: "",
    website: "",
  },
};

export type Role = {
  company: string;
  title: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    company: "Pi Network",
    title: "KYC Agent (Freelance)",
    period: "Jul 2024 — Aug 2026",
    location: "Remote",
    summary:
      "Reviewed identity verification submissions for a global crypto community as part of a distributed KYC validator team.",
    highlights: [
      "Validated user identity documents against KYC protocols, flagging mismatches and suspected fraud for escalation.",
      "Applied data protection and cybersecurity practices to handle sensitive personal documents responsibly.",
      "Used spreadsheet and SQL skills to track review batches and keep decision quality consistent across sessions.",
    ],
  },
];

import type { MediaItem } from "@/components/MediaFrame";

import kycCover from "@/assets/project-kyc.jpg";
import securityCover from "@/assets/sec-one.png";
import mlCover from "@/assets/project-ml.jpg";

export type Project = {
  name: string;
  slug: string;
  year: string;
  blurb: string;
  details: {
    overview: string;
    approach: string[];
    focus: string;
  };
  tools: string[];
  tags: string[];
  url?: string;
  /** Label for the external link, used as accessible text. */
  urlLabel?: string;
  media?: MediaItem;
};

export const projects: Project[] = [
  {
    name: "KYC verification workflow",
    slug: "kyc-verification-workflow",
    year: "2024 — 2026",
    blurb:
      "Hands-on identity verification at volume: document checks, fraud flags and consistent decision records for a remote validator team.",
    details: {
      overview:
        "A practical operations project focused on making identity review consistent, careful and traceable across a distributed validation team.",
      approach: [
        "Compared identity documents against verification requirements and checked submissions for mismatches.",
        "Flagged suspicious patterns for escalation instead of forcing uncertain decisions.",
        "Kept decision records consistent while handling sensitive personal information responsibly.",
      ],
      focus: "Identity verification, data integrity and responsible handling of sensitive information.",
    },
    tools: ["KYC", "SQL Server", "Excel", "Cybersecurity"],
    tags: ["KYC", "Cybersecurity", "Data integrity"],
    media: {
      image: kycCover,
      alt: "Layered identity document cards with a fingerprint and verification shield",
      caption: "A high-volume identity review workflow built around careful checks, fraud awareness and consistent decisions.",
    },
  },
  {
    name: "TryHackMe security labs",
    slug: "tryhackme-security-labs",
    year: "2025",
    blurb:
      "Ongoing practical cybersecurity training through the Careers in Cyber and defensive security paths · Linux, networking and threat analysis fundamentals.",
    details: {
      overview:
        "A hands-on learning track built around practical security labs, with an emphasis on understanding systems by investigating them directly.",
      approach: [
        "Practiced Linux command-line workflows and basic system investigation.",
        "Worked through networking concepts and defensive security scenarios.",
        "Used lab exercises to connect threat analysis concepts with observable system behavior.",
      ],
      focus: "Kali Linux, networking fundamentals, blue-team thinking and threat analysis.",
    },
    tools: ["Kali Linux", "Networking", "Python", "TryHackMe"],
    tags: ["Kali Linux", "Networking", "Blue team"],
    url: "https://tryhackme.com",
    urlLabel: "View TryHackMe",
    media: {
      image: securityCover,
      alt: "Isometric security lab with terminal windows, a padlock and a network graph",
      caption: "Practical security labs covering Linux systems, networking fundamentals and defensive investigation.",
    },
  },
  {
    name: "Generative AI & machine learning foundations",
    slug: "generative-ai-machine-learning-foundations",
    year: "2025",
    blurb:
      "Coursework and labs from Udacity's Introducing Generative AI with AWS and AWS Educate Machine Learning Foundations, covering ML workflows and AWS services.",
    details: {
      overview:
        "A foundation-building project combining guided coursework with practical exposure to machine learning workflows and cloud-based AI services.",
      approach: [
        "Studied the stages of a machine learning workflow from data preparation through evaluation.",
        "Explored generative AI concepts and the role of managed AWS services.",
        "Connected Python fundamentals with practical machine learning and cloud exercises.",
      ],
      focus: "Python, machine learning workflows, generative AI and AWS foundations.",
    },
    tools: ["Python", "AWS", "Machine learning", "Generative AI"],
    tags: ["AWS", "Machine learning", "Python"],
    media: {
      image: mlCover,
      alt: "Isometric stacked machine learning layers with cloud blocks and a rising data curve",
      caption: "A foundation in Python, machine learning workflows, generative AI concepts and AWS services.",
    },
  },
];

export type Skill = { label: string; href: string; color: string; iconUrl?: string };

export const skillGroups: { label: string; items: Skill[] }[] = [
  {
    label: "Engineering",
    items: [
      { label: "Java", href: "https://dev.java/", color: "#e76f00", iconUrl: "/icons/openjdk.svg" },
      { label: "Python", href: "https://www.python.org/", color: "#3776ab" },
      { label: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#d6a900" },
      { label: "Kali Linux", href: "https://www.kali.org/", color: "#557c94" },
      { label: "Nmap", href: "https://nmap.org/", color: "#2e5eaa", iconUrl: "/icons/nmap.png" },
      { label: "Wireshark", href: "https://www.wireshark.org/", color: "#1679a7" },
      { label: "Metasploit", href: "https://www.metasploit.com/", color: "#2596cd" },
      { label: "Burp Suite", href: "https://portswigger.net/burp", color: "#ff6633" },
      { label: "Splunk", href: "https://www.splunk.com/", color: "#1a5f9a" },
      { label: "Snort", href: "https://www.snort.org/", color: "#2e7d32" },
      { label: "Snyk", href: "https://snyk.io/", color: "#4c5ef7" },
      { label: "Networking", href: "https://www.cisco.com/site/us/en/learn/topics/networking/what-is-computer-networking.html", color: "#1ba0d7" },
    ],
  },
  {
    label: "Tools & platforms",
    items: [
      { label: "IntelliJ IDEA", href: "https://www.jetbrains.com/idea/", color: "#fe2857" },
      { label: "Replit", href: "https://replit.com/", color: "#f26207" },
      { label: "AWS", href: "https://aws.amazon.com/", color: "#ff9900" },
      { label: "Google Ads", href: "https://ads.google.com/", color: "#4285f4" },
      { label: "HubSpot", href: "https://www.hubspot.com/", color: "#ff7a59" },
      { label: "Excel", href: "https://www.microsoft.com/en-us/microsoft-365/excel", color: "#217346" },
      { label: "Microsoft", href: "https://www.microsoft.com/", color: "#5e5e5e", iconUrl: "/icons/microsoft.svg" },
      { label: "Supabase", href: "https://supabase.com/", color: "#3ecf8e" },
      { label: "Next.js", href: "https://nextjs.org/", color: "#111111" },
      { label: "React", href: "https://react.dev/", color: "#61dafb" },
      { label: "Django", href: "https://www.djangoproject.com/", color: "#092e20" },
      { label: "Cloudflare", href: "https://www.cloudflare.com/", color: "#f38020" },
      { label: "TypeScript", href: "https://www.typescriptlang.org/", color: "#3178c6" },
      { label: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "#e34f26" },
      { label: "Figma", href: "https://www.figma.com/", color: "#f24e1e", iconUrl: "/icons/figma.svg" },
      { label: "Beautiful Soup", href: "https://www.crummy.com/software/BeautifulSoup/", color: "#4b8bbe" },
      { label: "Git", href: "https://git-scm.com/", color: "#f05032" },
      { label: "GitHub", href: "https://github.com/forworldsec", color: "#181717" },
    ],
  },
  {
    label: "Operations & safety",
    items: [
      { label: "KYC verification", href: "https://www.investopedia.com/terms/k/knowyourclient.asp", color: "#00a6a6" },
      { label: "Cybersecurity practices", href: "https://www.nist.gov/cyberframework", color: "#7b61ff" },
      { label: "HSE management systems", href: "https://www.iso.org/standard/63787.html", color: "#2a9d8f" },
      { label: "Hazard identification", href: "https://www.osha.gov/safety-management/hazard-identification", color: "#e9c46a" },
      { label: "Accident investigation", href: "https://www.osha.gov/incident-investigation", color: "#e76f51" },
      { label: "Emotional intelligence in teamwork", href: "https://www.uopeople.edu/", color: "#ef476f" },
      { label: "Accident investigation", href: "https://www.osha.gov/incident-investigation", color: "#e76f51" },
      { label: "Environmental emergency response", href: "https://www.osha.gov/emergency-preparedness", color: "#2a9d8f" },
      { label: "Risk management", href: "https://www.iso.org/iso-31000-risk-management.html", color: "#8e44ad" },
      { label: "IoT", href: "https://www.cisco.com/c/en/us/solutions/internet-of-things/overview.html", color: "#1ba0d7" },
      { label: "Digital transformation", href: "https://www.ibm.com/think/topics/digital-transformation", color: "#1261a0" },
      { label: "Google Ads", href: "https://ads.google.com/", color: "#4285f4" },
      { label: "Wireframing", href: "https://www.interaction-design.org/literature/topics/wireframing", color: "#ff7262" },
      { label: "Web scraping", href: "https://www.crummy.com/software/BeautifulSoup/", color: "#4b8bbe" },
      { label: "Cyber defense", href: "https://www.nist.gov/cyberframework", color: "#7b61ff" },
      { label: "User experience design", href: "https://www.nngroup.com/articles/definition-user-experience/", color: "#ff6b6b" },
      { label: "Microsoft Excel", href: "https://www.microsoft.com/en-us/microsoft-365/excel", color: "#217346" },
      { label: "PostgreSQL", href: "https://www.postgresql.org/", color: "#336791" },
    ],
  },
];

export const portfolioStats = [
  { label: "Years of experience", value: 5, suffix: "+" },
  { label: "Projects shipped", value: 15, suffix: "+" },
  { label: "Happy clients", value: 10, suffix: "+" },
];

export const products = [
  { name: "Starter portfolio source code", description: "A clean React portfolio foundation to customize for your own work.", price: "$29", href: "#contact" },
  { name: "Security dashboard template", description: "A responsive operations dashboard starter for security and IT workflows.", price: "$49", href: "#contact" },
  { name: "KYC workflow blueprint", description: "A practical workflow guide for organizing identity review operations.", price: "$19", href: "#contact" },
  { name: "React landing page kit", description: "Reusable responsive sections for a polished product or service website.", price: "$24", href: "#contact" },
  { name: "Python automation starter", description: "A small collection of scripts and patterns for repeatable operations work.", price: "$17", href: "#contact" },
  { name: "Linux command reference", description: "A compact practical reference for everyday Linux and system work.", price: "$9", href: "#contact" },
  { name: "API integration starter", description: "A structured starting point for connecting forms, services and data.", price: "$32", href: "#contact" },
  { name: "AI project discovery pack", description: "A guided worksheet for shaping an AI idea into a buildable project.", price: "$14", href: "#contact" },
  { name: "TypeScript utility pack", description: "Small reusable TypeScript helpers for cleaner application code.", price: "$12", href: "#contact" },
  { name: "React component starter", description: "A practical collection of reusable interface components for React projects.", price: "$27", href: "#contact" },
  { name: "Next.js website starter", description: "A structured starting point for a fast modern website with Next.js.", price: "$34", href: "#contact" },
  { name: "Django API starter", description: "A backend foundation for building organized Python web APIs.", price: "$36", href: "#contact" },
  { name: "Supabase database starter", description: "A simple foundation for authentication, tables and hosted application data.", price: "$31", href: "#contact" },
  { name: "Responsive dashboard UI kit", description: "Flexible dashboard screens for admin, operations and analytics products.", price: "$39", href: "#contact" },
  { name: "Contact form integration kit", description: "A ready-to-customize contact workflow for collecting project inquiries.", price: "$15", href: "#contact" },
  { name: "Portfolio content planner", description: "A guided template for organizing projects, experience and portfolio copy.", price: "$8", href: "#contact" },
  { name: "Cybersecurity checklist pack", description: "Practical checklists for reviewing common security and deployment basics.", price: "$11", href: "#contact" },
  { name: "Linux server setup guide", description: "A concise guide for preparing a Linux server for common web workloads.", price: "$18", href: "#contact" },
  { name: "Networking study notes", description: "Clear reference notes for networking concepts, protocols and troubleshooting.", price: "$10", href: "#contact" },
  { name: "KYC operations template", description: "A structured template for organizing identity review queues and decisions.", price: "$22", href: "#contact" },
  { name: "Machine learning project planner", description: "A planning template for turning a machine learning idea into milestones.", price: "$13", href: "#contact" },
  { name: "Generative AI prompt workbook", description: "A practical workbook for testing, organizing and refining AI prompts.", price: "$16", href: "#contact" },
  { name: "AWS learning roadmap", description: "A guided roadmap for building foundational cloud and AWS knowledge.", price: "$12", href: "#contact" },
  { name: "SQL reporting template", description: "A starting template for turning operational data into useful reports.", price: "$21", href: "#contact" },
  { name: "Excel operations tracker", description: "A customizable tracker for tasks, reviews, owners and progress.", price: "$9", href: "#contact" },
  { name: "Landing page copy pack", description: "Starter copy sections for presenting a product, service or personal brand.", price: "$14", href: "#contact" },
  { name: "Freelance project brief", description: "A concise brief template for defining scope, deliverables and timelines.", price: "$7", href: "#contact" },
  { name: "Developer handoff checklist", description: "A practical checklist for preparing a project for smooth implementation.", price: "$10", href: "#contact" },
  { name: "Indie game design workbook", description: "A practical workbook for shaping a small game idea from concept to launch.", price: "$18", href: "#contact" },
  { name: "Unity 2D starter guide", description: "A beginner-friendly guide to building a small 2D game with Unity.", price: "$22", href: "#contact" },
  { name: "Godot game prototype kit", description: "A lightweight prototype workflow for experimenting with Godot game ideas.", price: "$24", href: "#contact" },
  { name: "Game UI asset planner", description: "A planning pack for menus, HUDs, inventories and game interface flows.", price: "$11", href: "#contact" },
  { name: "Level design worksheet", description: "A structured worksheet for planning levels, objectives, pacing and rewards.", price: "$9", href: "#contact" },
  { name: "Game launch checklist", description: "A concise checklist for preparing a small game for testing and release.", price: "$12", href: "#contact" },
  { name: "Twitch stream starter pack", description: "A practical setup guide for launching a consistent gaming stream.", price: "$16", href: "#contact" },
  { name: "YouTube gaming planner", description: "A repeatable planning template for gaming videos, titles and publishing.", price: "$13", href: "#contact" },
  { name: "Content calendar template", description: "A reusable calendar for planning posts, videos, newsletters and campaigns.", price: "$10", href: "#contact" },
  { name: "Short-form video script pack", description: "A collection of concise structures for Reels, Shorts and TikTok content.", price: "$15", href: "#contact" },
  { name: "Creator brand kit", description: "A simple framework for defining your creator voice, colors and content pillars.", price: "$21", href: "#contact" },
  { name: "Podcast launch guide", description: "A practical roadmap for planning, recording and publishing a first podcast.", price: "$17", href: "#contact" },
  { name: "Newsletter content planner", description: "A focused planning template for useful and consistent email content.", price: "$8", href: "#contact" },
  { name: "Thumbnail design checklist", description: "A quick guide for creating clearer, more clickable video thumbnails.", price: "$7", href: "#contact" },
  { name: "Creator analytics tracker", description: "A spreadsheet-ready framework for tracking reach, retention and conversions.", price: "$14", href: "#contact" },
  { name: "Coding interview workbook", description: "Practice prompts and planning pages for preparing for software interviews.", price: "$19", href: "#contact" },
  { name: "Java programming guide", description: "A practical reference for core Java concepts and project practice.", price: "$23", href: "#contact" },
  { name: "Python beginner book", description: "A clear project-led introduction to Python syntax and problem solving.", price: "$20", href: "#contact" },
  { name: "JavaScript fundamentals book", description: "A hands-on guide to JavaScript language features and browser basics.", price: "$21", href: "#contact" },
  { name: "TypeScript patterns guide", description: "Practical patterns for adding reliable types to modern applications.", price: "$25", href: "#contact" },
  { name: "React hooks field guide", description: "A focused guide to state, effects and reusable React hook patterns.", price: "$18", href: "#contact" },
  { name: "Next.js routing guide", description: "A practical guide to pages, layouts, navigation and data in Next.js.", price: "$22", href: "#contact" },
];

/**
 * Upload your documents to /public (e.g. /public/cv.pdf) and set the paths
 * below. Empty strings keep the matching button disabled.
 */
export const documents = {
  cv: "",
  education: "",
  certificates: "",
};

export type Social = {
  label: string;
  /** Leave empty until you have the link — the icon renders disabled. */
  url: string;
  /** CSS variable holding the brand colour. */
  color: string;
};

export const socials: Social[] = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/ogundana-korede/", color: "var(--brand-linkedin)" },
  { label: "GitHub", url: "https://github.com/forworldsec", color: "var(--brand-github)" },
  { label: "Facebook", url: "https://web.facebook.com/mokabiola", color: "var(--brand-facebook)" },
  { label: "Buy me a coffee", url: "https://jgdrrc5f.r.us-east-2.awstrack.me/L0/https:%2F%2Fwww.buymeacoffee.com%2Fkoredev/1/010f01a090fff98f-f75c9906-f494-46f6-9b80-ec9b0190c7ad-000000/j4pq9NbL-aPw8T1zUxe943W6ZTg=258", color: "var(--brand-coffee)" },
  { label: "Linktree", url: "https://linktr.ee/mkoabiola", color: "var(--brand-linktree)" },
  { label: "X", url: "", color: "var(--brand-x)" },
];


export const education: { school: string; credential: string; period: string; href?: string }[] = [
  {
    school: "University of the People",
    credential: "Bachelor of Science, Computer Science",
    period: "Sep 2025 — Feb 2028",
    href: "",
  },
  {
    school: "Near East University",
    credential: "Engineering studies",
    period: "Completed",
    href: "",
  },
];

export const certificates: {
  name: string;
  issuer: string;
  year: string;
  slug: string;
  credentialId?: string;
  skills?: string[];
  image?: string;
  images?: string[];
  href?: string;
}[] = [
  {
    name: "Health, Safety and Environment (HSE Levels 1, 2 & 3)",
    issuer: "Onshore and Offshore Safety Institute",
    year: "2025",
    slug: "hse-levels-1-2-3",
    credentialId: "HSE15042567SR",
    skills: ["OHS", "Hazard identification", "Risk management", "Incident investigation", "Environmental emergency response", "HSE management systems"],
    images: ["/certificates/hse-level-1.jpeg",
             "/certificates/hse-level-2.jpeg",
             "/certificates/hse-level-3.jpeg",
            ],
  },
  {
    name: "AI and Automation: How Emerging Technologies Are Shaping the Workplace",
    issuer: "University of the People",
    year: "2026",
    slug: "ai-and-automation",
    credentialId: "c1b4092a-939d-4937-960f-7ba0f54c95e8",
    skills: ["AI automation", "Digital transformation", "Workplace technology"],
    images: [],
  },
  {
    name: "Emotional Intelligence in Teamwork",
    issuer: "University of the People",
    year: "2026",
    slug: "emotional-intelligence",
    skills: ["Teamwork", "Communication", "Emotional intelligence"],
    // href: "/emotional-intelligence.pdf",
    images: ["/certificates/emotional-intelligence.png"],
  },
  {
    name: "Introducing Generative AI with AWS",
    issuer: "Udacity",
    year: "2025",
    slug: "generative-ai-with-aws",
    credentialId: "af083a12-6239-11f0-ba26-a7cbd9e90f7d",
    skills: ["Generative AI", "AWS", "Prompt design"],
    images: [],
  },
  {
    name: "AWS Educate Machine Learning Foundations",
    issuer: "Amazon Web Services",
    year: "2025",
    slug: "aws-machine-learning-foundations",
    credentialId: "9c8a49af-b05f-4dcd-a2d3-ebfecbedce0b",
    skills: ["Machine learning", "Python", "AWS", "ML pipeline"],
    images: [],
  },
  {
    name: "JavaScript, SQL Server & Excel certifications",
    issuer: "Udemy",
    year: "2024",
    slug: "javascript-sql-server-excel",
    skills: ["JavaScript", "SQL Server", "Microsoft Excel", "HTML5", "CSS3"],
    images: [],
  },
  {
    name: "Maltego for Cybersecurity Investigations",
    issuer: "Maltego Academy",
    year: "2025",
    slug: "Maltego-Cybersecurity",
    credentialId: "6686b769f3e49b0b4701814e",
    skills: ["Cybersecurity investigations", "Maltego", "Threat intelligence"],
    images: ["/certificates/maltego-certificate.jpg"],
  },
  {
    name: "Introduction to IoT",
    issuer: "Cisco",
    year: "2025",
    slug: "introduction-to-iot",
    skills: ["Internet of Things", "Digital transformation", "IoT"],
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    year: "2025",
    slug: "introduction-to-cybersecurity",
    skills: ["Introduction to cybersecurity"],
  },
  {
    name: "Google Ads Certifications",
    issuer: "Coursera",
    year: "2024",
    slug: "google-ads-certifications",
    credentialId: "EM7GCH4Z4X8M",
    skills: ["Google Ads", "AdSense", "Advertising"],
  },
  {
    name: "Principles of UX/UI Design",
    issuer: "Coursera",
    year: "2024",
    slug: "principles-of-ux-ui-design",
    credentialId: "6YBL6JYYTDV6",
    skills: ["Wireframing", "Prototyping", "User interface design", "User experience design"],
  },
  {
    name: "Basics of Web Scraping with Beautiful Soup",
    issuer: "Simplilearn",
    year: "2022",
    slug: "beautiful-soup-web-scraping",
    credentialId: "3742621",
    skills: ["Web scraping", "Beautiful Soup", "Python"],
  },
  {
    name: "Cyber Security 101",
    issuer: "Simplilearn",
    year: "2024",
    slug: "cyber-security-101",
    credentialId: "4775327",
    skills: ["Cybersecurity", "Cyber defense", "Cyber threat intelligence"],
  },
  {
    name: "UI/UX Design Certificate Using Figma",
    issuer: "Udemy",
    year: "2024",
    slug: "ui-ux-design-figma",
    credentialId: "UC-b4647e22-1842-4cfd-aa1a-f70c6daf1622",
    skills: ["Figma", "Prototyping", "UI automation", "User interface prototyping"],
  },
  {
    name: "MCDBA: Microsoft SQL Server 2000",
    issuer: "Udemy",
    year: "2024",
    slug: "mcdba-microsoft-sql-server",
    credentialId: "UC-e8a566c3-855e-448c-b6c4-0e07c5a6ab7f",
    skills: ["Microsoft SQL Server", "PostgreSQL", "SQL"],
  },
  {
    name: "Javascript Build a Calculator using HTML, CSS and Javascript",
    issuer: "Udemy",
    year: "2024",
    slug: "javascript-calculator-html-css",
    credentialId: "UC-537baa02-d0e4-4cc9-a8db-4b4372bfea2e",
    skills: ["JavaScript", "CSS", "HTML5"],
  },
];

export const references: { quote: string; author: string; role: string }[] = [];
