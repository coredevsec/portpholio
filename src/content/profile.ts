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
    tags: ["KYC", "Cybersecurity", "Data integrity"],
    media: {
      image: kycCover,
      alt: "Layered identity document cards with a fingerprint and verification shield",
      caption: "Add your own screenshots or a screen-recording walkthrough here.",
    },
  },
  {
    name: "TryHackMe security labs",
    slug: "tryhackme-security-labs",
    year: "2025",
    blurb:
      "Ongoing practical cybersecurity training through the Careers in Cyber and defensive security paths — Linux, networking and threat analysis fundamentals.",
    details: {
      overview:
        "A hands-on learning track built around practical security labs, with an emphasis on understanding systems by investigating them directly.",
      approach: [
        "Practiced Linux command-line workflows and basic system investigation.",
        "Worked through networking concepts and defensive security scenarios.",
        "Used lab exercises to connect threat analysis concepts with observable system behavior.",
      ],
      focus: "Linux, networking fundamentals, blue-team thinking and threat analysis.",
    },
    tags: ["Linux", "Networking", "Blue team"],
    url: "https://tryhackme.com",
    urlLabel: "View TryHackMe",
    media: {
      image: securityCover,
      alt: "Isometric security lab with terminal windows, a padlock and a network graph",
      caption: "Drop a lab demo video in here when you record one.",
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
    tags: ["AWS", "Machine learning", "Python"],
    media: {
      image: mlCover,
      alt: "Isometric stacked machine learning layers with cloud blocks and a rising data curve",
      caption: "Certificate images or a project demo can live in this slot.",
    },
  },
];

export type Skill = { label: string; href: string };

export const skillGroups: { label: string; items: Skill[] }[] = [
  {
    label: "Engineering",
    items: [
      { label: "Java", href: "https://dev.java/" },
      { label: "Python", href: "https://www.python.org/" },
      { label: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { label: "SQL Server", href: "https://www.microsoft.com/en-us/sql-server" },
      { label: "Linux", href: "https://www.kernel.org/" },
      { label: "Networking", href: "https://www.cisco.com/site/us/en/learn/topics/networking/what-is-computer-networking.html" },
    ],
  },
  {
    label: "Tools & platforms",
    items: [
      { label: "IntelliJ IDEA", href: "https://www.jetbrains.com/idea/" },
      { label: "Replit", href: "https://replit.com/" },
      { label: "AWS", href: "https://aws.amazon.com/" },
      { label: "Google Ads", href: "https://ads.google.com/" },
      { label: "HubSpot", href: "https://www.hubspot.com/" },
      { label: "Excel", href: "https://www.microsoft.com/en-us/microsoft-365/excel" },
    ],
  },
  {
    label: "Operations & safety",
    items: [
      { label: "KYC verification", href: "https://www.investopedia.com/terms/k/knowyourclient.asp" },
      { label: "Cybersecurity practices", href: "https://www.nist.gov/cyberframework" },
      { label: "HSE management systems", href: "https://www.iso.org/standard/63787.html" },
      { label: "Hazard identification", href: "https://www.osha.gov/safety-management/hazard-identification" },
      { label: "Accident investigation", href: "https://www.osha.gov/incident-investigation" },
      { label: "Emotional intelligence in teamwork", href: "https://www.uopeople.edu/" },
    ],
  },
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
  { label: "Buy me a coffee", url: "", color: "var(--brand-coffee)" },
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
  image?: string;
  images?: string[];
  href?: string;
}[] = [
  {
    name: "Health, Safety and Environment (HSE Levels 1, 2 & 3)",
    issuer: "Onshore and Offshore Safety Institute",
    year: "2025",
    slug: "hse-levels-1-2-3",
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
    images: [],
  },
  {
    name: "Emotional Intelligence in Teamwork",
    issuer: "University of the People",
    year: "2026",
    slug: "emotional-intelligence",
    // href: "/emotional-intelligence.pdf",
    images: ["/certificates/emotional-intelligence.png"],
  },
  {
    name: "Introducing Generative AI with AWS",
    issuer: "Udacity",
    year: "2025",
    slug: "generative-ai-with-aws",
    images: [],
  },
  {
    name: "AWS Educate Machine Learning Foundations",
    issuer: "Amazon Web Services",
    year: "2025",
    slug: "aws-machine-learning-foundations",
    images: [],
  },
  {
    name: "JavaScript, SQL Server & Excel certifications",
    issuer: "Udemy",
    year: "2024",
    slug: "javascript-sql-server-excel",
    images: [],
  },
  {
    name: "Maltego for Cybersecurity Investigations",
    issuer: "Maltego Academy",
    year: "2025",
    slug: "Maltego-Cybersecurity",
    images: ["/certificates/maltego-certificate.jpg"],
  },
];

export const references: { quote: string; author: string; role: string }[] = [];
