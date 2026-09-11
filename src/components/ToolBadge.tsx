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
  Linux: Terminal,
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
  Linux: "#f0b323",
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
};

const TOOL_ICON_URLS: Record<string, string> = {
  Java: "https://cdn.simpleicons.org/openjdk/E76F00",
  Python: "https://cdn.simpleicons.org/python/3776AB",
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  TypeScript: "https://cdn.simpleicons.org/typescript/3178C6",
  "SQL Server": "https://cdn.simpleicons.org/microsoftsqlserver/CC2927",
  Linux: "https://cdn.simpleicons.org/linux/FCC624",
  Networking: "https://cdn.simpleicons.org/cisco/1BA0D7",
  AWS: "https://cdn.simpleicons.org/amazonaws/FF9900",
  React: "https://cdn.simpleicons.org/react/61DAFB",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
  Django: "https://cdn.simpleicons.org/django/092E20",
  Cloudflare: "https://cdn.simpleicons.org/cloudflare/F38020",
  Git: "https://cdn.simpleicons.org/git/F05032",
  Figma: "https://cdn.simpleicons.org/figma/F24E1E",
  Supabase: "https://cdn.simpleicons.org/supabase/3FCF8E",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/4169E1",
};

export function ToolBadge({ label, iconUrl }: { label: string; iconUrl?: string }) {
  const Icon = TOOL_ICONS[label] ?? Code2;
  const color = TOOL_COLORS[label] ?? "var(--accent)";
  const resolvedIconUrl = iconUrl ?? TOOL_ICON_URLS[label];

  return (
    <span className="tool-badge">
      {resolvedIconUrl ? (
        <img src={resolvedIconUrl} alt="" aria-hidden="true" className="tool-badge-image" />
      ) : (
        <Icon size={14} aria-hidden="true" style={{ color }} />
      )}
      {label}
    </span>
  );
}
