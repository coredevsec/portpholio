import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { certificates, profile, products, projects, skillGroups } from "@/content/profile";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/#contact", label: "Contact" },
  { href: "/#marketplace", label: "Shop" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement | null>(null);
  const searchItems = [
    ...projects.map((project) => ({ label: project.name, type: "Project", href: "/#work" })),
    ...products.map((product) => ({ label: product.name, type: "Product", href: "/#marketplace" })),
    ...skillGroups.flatMap((group) =>
      group.items.map((item) => ({ label: item.label, type: group.label, href: "/#skills" })),
    ),
    ...certificates.map((certificate) => ({
      label: certificate.name,
      type: "Certificate",
      href: "/#credentials",
    })),
  ];
  const searchMatches = searchQuery.trim()
    ? searchItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current || headerRef.current.contains(event.target as Node)) return;
      setMenuOpen(false);
      setSearchOpen(false);
      setSearchQuery("");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setSearchOpen(false);
      setSearchQuery("");
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 px-4 py-3 shadow-sm shadow-foreground/5 backdrop-blur-xl sm:px-6 md:px-10"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-3">
        <Link to="/logo" aria-label={`View ${profile.name} logo`} className="shrink-0">
          <img
            src="/krd.jpeg"
            alt={`${profile.name} logo`}
            className="h-10 w-auto max-w-[7rem] object-contain sm:h-12 sm:max-w-[8rem]"
          />
        </Link>
        <nav aria-label="Sections" className={`navbar-menu ${menuOpen ? "navbar-menu-open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="navbar-controls">
          <form
            className={`navbar-search ${searchOpen ? "navbar-search-open" : ""}`}
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <button
              type="button"
              className="navbar-search-toggle"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
            >
              <Search size={15} aria-hidden="true" />
            </button>
            {searchOpen ? (
              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search"
                aria-label="Search portfolio"
              />
            ) : null}
            {searchOpen && searchMatches.length > 0 ? (
              <div className="navbar-search-results">
                {searchMatches.map((match) => (
                  <a
                    key={`${match.type}-${match.label}`}
                    href={match.href}
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }}
                  >
                    <span>{match.label}</span>
                    <small>{match.type}</small>
                  </a>
                ))}
              </div>
            ) : null}
          </form>
          <ThemeToggle />
          <button
            type="button"
            className="navbar-menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
