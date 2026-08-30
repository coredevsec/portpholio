import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Maximize2 } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/logo")({
  head: () => ({
    meta: [
      { title: `${profile.name} Logo` },
      {
        name: "description",
        content: `View the ${profile.name} logo in a dedicated image viewer.`,
      },
    ],
  }),
  component: LogoPage,
});

function LogoPage() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
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

        <main id="main" className="py-8 md:py-16">
          <div className="mb-8">
            <p className="eyebrow">Brand mark</p>
            <h1 className="font-display mt-3 text-3xl md:text-5xl">{profile.name} logo</h1>
            <p className="mt-3 text-muted-foreground">A closer look at the mark used across this portfolio.</p>
          </div>

          <figure className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-12">
            <img
              src="/krd.png"
              alt={`${profile.name} logo`}
              className="mx-auto max-h-[70vh] w-full max-w-xl object-contain"
            />
            <figcaption className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Maximize2 size={15} aria-hidden="true" />
              {profile.name}
            </figcaption>
          </figure>
        </main>

        <footer className="border-t border-border py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </div>
  );
}