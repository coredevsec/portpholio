import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUp } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/message")({
  head: () => ({
    meta: [
      { title: `Message ${profile.name}` },
      {
        name: "description",
        content: `Send a secure message to ${profile.name} — no third-party inbox required.`,
      },
      { property: "og:title", content: `Message ${profile.name}` },
      {
        property: "og:description",
        content: `Send a secure message to ${profile.name} — no third-party inbox required.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MessagePage,
});

function MessagePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 240);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-2xl px-6 md:px-10">
        <header className="flex items-center justify-between py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to portfolio
          </Link>
          <ThemeToggle />
        </header>

        <main id="main" className="py-12 md:py-20">
          <div className="w-full max-w-xl rounded-lg border border-border bg-card p-4 md:p-6">
            <p className="eyebrow">Message me</p>
            <h1 className="font-display mt-3 text-3xl md:text-4xl">Send a message</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Fill in the form and your message reaches me directly — no third-party inbox in
              between.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </main>

        {showBackToTop ? (
          <button
            type="button"
            aria-label="Scroll to top"
            title="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-5 z-40 inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:bottom-8 md:right-8"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </button>
        ) : null}

        <footer className="border-t border-border py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </div>
  );
}
