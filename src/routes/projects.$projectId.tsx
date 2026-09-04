import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { MediaFrame } from "@/components/MediaFrame";
import { ThemeToggle } from "@/components/ThemeToggle";
import { projects, profile } from "@/content/profile";

export const Route = createFileRoute("/projects/$projectId")({
  head: ({ params }) => {
    const project = projects.find((item) => item.slug === params.projectId);
    return {
      meta: [
        { title: project ? `${project.name} — ${profile.name}` : `Project — ${profile.name}` },
        {
          name: "description",
          content: project?.blurb ?? `Project details for ${profile.name}.`,
        },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { projectId } = Route.useParams();
  const project = projects.find((item) => item.slug === projectId);

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <header className="flex items-center justify-between py-8">
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to projects
          </Link>
          <ThemeToggle />
        </header>

        <main id="main" className="py-8 md:py-16">
          {project ? (
            <article>
              <div className="mb-8 max-w-3xl">
                <p className="eyebrow">Project · {project.year}</p>
                <h1 className="font-display mt-3 text-4xl md:text-6xl">{project.name}</h1>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {project.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-w-4xl rounded-lg border border-border bg-card p-4 md:p-6">
                <MediaFrame media={project.media} label={project.name} />
              </div>

              <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
                <section>
                  <p className="eyebrow">Overview</p>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    {project.details.overview}
                  </p>
                </section>
                <section>
                  <p className="eyebrow">Focus</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {project.details.focus}
                  </p>
                </section>
              </div>

              <section className="mt-12 border-t border-border pt-10">
                <p className="eyebrow">Approach</p>
                <ul className="mt-5 max-w-3xl space-y-4">
                  {project.details.approach.map((item) => (
                    <li
                      key={item}
                      className="relative border-l-2 border-accent pl-5 leading-relaxed text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  {project.urlLabel ?? "View project"}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </article>
          ) : (
            <div className="rounded-lg border border-border bg-card p-6 md:p-10">
              <p className="eyebrow">Project unavailable</p>
              <h1 className="font-display mt-3 text-3xl">This project could not be found.</h1>
              <Link
                to="/"
                hash="work"
                className="mt-6 inline-flex items-center gap-2 border-b border-accent pb-0.5 text-sm text-accent"
              >
                Return to projects
              </Link>
            </div>
          )}
        </main>

        <footer className="border-t border-border py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </div>
  );
}
