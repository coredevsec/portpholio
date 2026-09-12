import {
  Blocks,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Globe2,
  Server,
  Terminal,
} from "lucide-react";

const TOOL_ICONS: Record<string, typeof Code2> = {
  Java: Code2,
  Python: Code2,
  JavaScript: Code2,
  "SQL Server": Database,
  "Kali Linux": Terminal,
  Networking: Globe2,
  "IntelliJ IDEA": Code2,
  Replit: Code2,
  AWS: Cloud,
  "Google Ads": Globe2,
  HubSpot: Blocks,
  Excel: Database,
  Supabase: Database,
  "Next.js": Globe2,
  React: Blocks,
  Django: Server,
  Cloudflare: Cloud,
  KYC: BriefcaseBusiness,
  Cybersecurity: Terminal,
  "Data integrity": Database,
  "Machine learning": Blocks,
  "Generative AI": Code2,
  TryHackMe: Terminal,
};

const TOOL_COLORS: Record<string, string> = {
  Java: "#e76f00",
  Python: "#3776ab",
  JavaScript: "#f7df1e",
  "SQL Server": "#cc2927",
  "Kali Linux": "#557c94",
  Networking: "#1ba0d7",
  "IntelliJ IDEA": "#fe2857",
  Replit: "#f26207",
  AWS: "#ff9900",
  "Google Ads": "#4285f4",
  HubSpot: "#ff7a59",
  Excel: "#217346",
  Supabase: "#3ecf8e",
  "Next.js": "#111111",
  React: "#61dafb",
  Django: "#092e20",
  KYC: "#00a6a6",
  Cybersecurity: "#7b61ff",
  "Data integrity": "#2a9d8f",
  "Machine learning": "#f7931e",
  "Generative AI": "#8e44ad",
  TryHackMe: "#88cc14",
  Nmap: "#2e5eaa",
  Wireshark: "#1679a7",
  Metasploit: "#2596cd",
  "Burp Suite": "#ff6633",
  Nessus: "#7b5166",
  Splunk: "#1a5f9a",
  "CrowdStrike Falcon": "#f0a500",
  Snort: "#2e7d32",
  Snyk: "#4c5ef7",
};

const TOOL_ICON_URLS: Record<string, string> = {
  Java: "https://cdn.simpleicons.org/openjdk/e76f00",
  Python: "https://cdn.simpleicons.org/python/3776AB",
  JavaScript: "https://cdn.simpleicons.org/javascript/f7df1e",
  TypeScript: "https://cdn.simpleicons.org/typescript/3178c6",
  CSS3: "https://cdn.simpleicons.org/css3/1572b6",
  HTML5: "https://cdn.simpleicons.org/html5/e34f26",
  "SQL Server": "https://cdn.simpleicons.org/microsoftsqlserver/cc2927",
  "Kali Linux": "https://cdn.simpleicons.org/kalilinux/557c94",
  Networking: "https://cdn.simpleicons.org/cisco/1ba0d7",
  "IntelliJ IDEA": "https://cdn.simpleicons.org/intellijidea/fe2857",
  Replit: "https://cdn.simpleicons.org/replit/f26207",
  AWS: "https://cdn.simpleicons.org/amazonwebservices/ff9900",
  React: "https://cdn.simpleicons.org/react/61dafb",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/111111",
  Django: "https://cdn.simpleicons.org/django/092e20",
  Cloudflare: "https://cdn.simpleicons.org/cloudflare/f38020",
  Git: "https://cdn.simpleicons.org/git/f05032",
  Figma: "https://cdn.simpleicons.org/figma/f24e1e",
  "Google Ads": "https://cdn.simpleicons.org/googleads/4285f4",
  HubSpot: "https://cdn.simpleicons.org/hubspot/ff7a59",
  Excel: "https://cdn.simpleicons.org/microsoftexcel/217346",
  Supabase: "https://cdn.simpleicons.org/supabase/3ecf8e",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/336791",
  Nmap: "https://cdn.simpleicons.org/nmap/2e5eaa",
  Wireshark: "https://cdn.simpleicons.org/wireshark/1679a7",
  Metasploit: "https://cdn.simpleicons.org/metasploit/2596cd",
  "Burp Suite": "https://cdn.simpleicons.org/burpsuite/ff6633",
  Nessus: "https://cdn.simpleicons.org/nessus/7b5166",
  Splunk: "https://cdn.simpleicons.org/splunk/1a5f9a",
  "CrowdStrike Falcon": "https://cdn.simpleicons.org/crowdstrike/f0a500",
  Snort: "https://cdn.simpleicons.org/snort/2e7d32",
  Snyk: "https://cdn.simpleicons.org/snyk/4c5ef7",
  "Beautiful Soup": "https://cdn.simpleicons.org/beautifulsoup/4b8bbe",
};

export function ToolBadge({ label, iconUrl }: { label: string; iconUrl?: string }) {
  const Icon = TOOL_ICONS[label] ?? Code2;
  const color = TOOL_COLORS[label] ?? "var(--accent)";
  const resolvedIconUrl = iconUrl ?? TOOL_ICON_URLS[label];

  return (
    <span className="tool-badge">
      {resolvedIconUrl ? (
        <img
          src={resolvedIconUrl}
          alt=""
          aria-hidden="true"
          className="tool-badge-image"
        />
      ) : (
        <Icon size={14} aria-hidden="true" style={{ color }} />
      )}
      {label}
    </span>
  );
}
