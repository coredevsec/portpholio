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
import { useEffect, useState } from "react";

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
  GitHub: Terminal,
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
  Microsoft: "#5e5e5e",
  Supabase: "#3ecf8e",
  "Next.js": "#111111",
  React: "#61dafb",
  Django: "#092e20",
  Cloudflare: "#f38020",
  TypeScript: "#3178c6",
  CSS3: "#1572b6",
  HTML5: "#e34f26",
  Figma: "#f24e1e",
  Git: "#f05032",
  PostgreSQL: "#336791",
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
  GitHub: "#181717",
};

const TOOL_ICON_URLS: Record<string, string> = {
  Java: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/openjdk.svg",
  Python: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/python.svg",
  JavaScript: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/javascript.svg",
  TypeScript: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/typescript.svg",
  CSS3: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/css3.svg",
  HTML5: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/html5.svg",
  "SQL Server": "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/microsoftsqlserver.svg",
  "Kali Linux": "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/kalilinux.svg",
  Networking: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/cisco.svg",
  "IntelliJ IDEA": "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/intellijidea.svg",
  Replit: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/replit.svg",
  AWS: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/amazonaws.svg",
  React: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/react.svg",
  "Next.js": "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/nextdotjs.svg",
  Django: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/django.svg",
  Cloudflare: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/cloudflare.svg",
  Git: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/git.svg",
  Figma: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/figma.svg",
  "Google Ads": "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/googleads.svg",
  HubSpot: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/hubspot.svg",
  Excel: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/microsoftexcel.svg",
  Microsoft: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/microsoft.svg",
  Supabase: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/supabase.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/postgresql.svg",
  Nmap: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/nmap.svg",
  Wireshark: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/wireshark.svg",
  Metasploit: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/metasploit.svg",
  "Burp Suite": "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/burpsuite.svg",
  Nessus: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/nessus.svg",
  Splunk: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/splunk.svg",
  "CrowdStrike Falcon": "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/crowdstrike.svg",
  Snort: "https://simpleicons.org/icons/snort.svg",
  Snyk: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/snyk.svg",
  GitHub: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/github.svg",
  "Beautiful Soup": "https://www.crummy.com/software/BeautifulSoup/10.1.jpg",
};

export function ToolBadge({ label, iconUrl }: { label: string; iconUrl?: string }) {
  const Icon = TOOL_ICONS[label] ?? Code2;
  const color = TOOL_COLORS[label] ?? "var(--accent)";
  const resolvedIconUrl = iconUrl ?? TOOL_ICON_URLS[label];
  const [iconMarkup, setIconMarkup] = useState<string | null>(null);

  useEffect(() => {
    if (!resolvedIconUrl || iconUrl || !resolvedIconUrl.endsWith(".svg")) {
      setIconMarkup(null);
      return;
    }

    let isActive = true;

    const loadSvg = async () => {
      try {
        const response = await fetch(resolvedIconUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch icon: ${response.status}`);
        }

        const rawSvg = await response.text();
        const recoloredSvg = rawSvg.replace(
          /<svg\b([^>]*)>/i,
          `<svg$1 fill="${color}" style="color:${color}">`,
        );

        if (isActive) {
          setIconMarkup(recoloredSvg);
        }
      } catch {
        if (isActive) {
          setIconMarkup(null);
        }
      }
    };

    void loadSvg();

    return () => {
      isActive = false;
    };
  }, [resolvedIconUrl, color]);

  return (
    <span className="tool-badge">
      {iconMarkup ? (
        <span
          className="tool-badge-icon"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: iconMarkup }}
        />
      ) : resolvedIconUrl ? (
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
