import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Coffee,
  Download,
  Facebook,
  FileText,
  Github,
  Link2,
  Linkedin,
  Twitter,
} from "lucide-react";

import { HeroRobot3D } from "@/components/HeroRobot3D";
import { ContactForm } from "@/components/ContactForm";
import { MediaFrame } from "@/components/MediaFrame";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tilt3D } from "@/components/Tilt3D";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  certificates,
  documents,
  education,
  experience,
  profile,
  projects,
  references,
  skillGroups,
  socials,
} from "@/content/profile";

const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Facebook: Facebook,
  "Buy me a coffee": Coffee,
  Linktree: Link2,
  X: Twitter,
};

/** Download / view button that stays disabled until a document path is set. */
function DocButton({
  href,
  label,
  icon: Icon = FileText,
}: {
  href: string;
  label: string;
  icon?: typeof FileText;
}) {
  if (!href) {
    return (
      <button
        type="button"
        disabled
        title="Upload the file and set its path in profile.ts to enable"
        className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground opacity-60"
      >
        <Icon size={15} aria-hidden="true" />
        {label}
      </button>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-sm border border-accent px-3 py-1.5 text-sm text-accent transition-opacity hover:opacity-75"
    >
      <Icon size={15} aria-hidden="true" />
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} · 3D Portfolio` },
      {
        name: "description",
        content: `Interactive 3D portfolio of ${profile.name}: projects with image and video showcases, experience, skills, education and certifications.`,
      },
      { property: "og:title", content: `${profile.name} · 3D Portfolio` },
      {
        property: "og:description",
        content: `Interactive 3D showcase of the work, experience and credentials of ${profile.name}.`,
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 border-t border-border py-12 sm:py-14 md:py-24"
    >
      <div className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
        <div className="md:pt-2">
          <p className="eyebrow">{label}</p>
        </div>
        <div>
          <h2 id={`${id}-heading`} className="font-display mb-8 text-3xl md:text-4xl">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
  { href: "#message", label: "Message" },
];

function Portfolio() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-10">
        <header className="sticky top-0 z-40 -mx-4 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 md:-mx-10 md:px-10">
          <Link to="/logo" aria-label={`View ${profile.name} logo`} className="shrink-0">
            <img
              src="/krd.png"
              alt={`${profile.name} logo`}
              className="h-10 w-auto max-w-[7rem] object-contain sm:h-12 sm:max-w-[8rem]"
            />
          </Link>
          <nav
            aria-label="Sections"
            className="order-3 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] text-muted-foreground sm:gap-x-4 sm:text-xs md:order-none md:w-auto md:text-sm"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                className="transition-colors hover:text-foreground"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </header>

        <main id="main">
          <div className="scene-3d py-10 sm:py-14 md:py-24">
            <div className="card-3d rounded-lg border border-border bg-card p-5 sm:p-7 md:p-12">
              <div className="grid items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10">
                <div className="layer-3d">
                  <p className="eyebrow text-[10px] sm:text-[11px]">{profile.location}</p>
                  <h1 className="font-display text-3d mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-7xl">
                    {profile.name}
                  </h1>
                  <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg md:mt-6 md:text-xl">
                    {profile.headline}
                  </p>
                  <div className="mt-6 flex flex-col flex-wrap items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90 sm:px-5"
                    >
                      LinkedIn profile
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <a
                      href="#credentials"
                      className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-3 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      <FileText size={15} aria-hidden="true" />
                      View certificates
                    </a>
                    <DocButton href={documents.cv} label="Download CV" icon={Download} />
                    <a
                      href="#work"
                      className="inline-flex items-center border-b border-accent pb-1 text-sm text-accent transition-opacity hover:opacity-70"
                    >
                      See selected work
                    </a>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <HeroRobot3D />
                </div>
              </div>
            </div>
          </div>


          <Section id="about" label="About" title="A short introduction">
            <Tilt3D className="rounded-lg border border-border bg-card p-4 md:p-6" intensity={4}>
              <p className="layer-3d max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {profile.about}
              </p>
            </Tilt3D>
          </Section>

          <Section id="work" label="Selected work" title="Projects">
            <div className="mb-10">
              <Carousel opts={{ loop: true }} autoPlayMs={4500} className="mx-auto max-w-3xl">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={`featured-${project.name}`}>
                      <Link
                        to="/projects/$projectId"
                        params={{ projectId: project.slug }}
                        className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent md:p-6"
                      >
                        <MediaFrame media={project.media} label={project.name} />
                        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                          <h3 className="font-display text-2xl">{project.name}</h3>
                          <span className="text-sm text-muted-foreground">{project.year}</span>
                        </div>
                        <span className="mt-4 inline-block border-b border-accent pb-0.5 text-sm text-accent">
                          View project details
                        </span>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </Section>

          <Section id="experience" label="Experience" title="Where I have worked">
            <div className="space-y-8">
              {experience.map((role) => (
                <Tilt3D
                  key={`${role.company}-${role.title}`}
                  className="rounded-lg border border-border bg-card p-6 md:p-8"
                  intensity={4}
                >
                  <article className="layer-3d">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="text-lg font-medium">
                        {role.title} · {role.company}
                      </h3>
                      <span className="text-sm text-muted-foreground">{role.period}</span>
                    </div>
                    {role.location ? (
                      <p className="mt-1 text-sm text-muted-foreground">{role.location}</p>
                    ) : null}
                    <p className="mt-3 max-w-2xl text-muted-foreground">{role.summary}</p>
                    <ul className="mt-3 space-y-2">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="relative max-w-2xl pl-5 text-muted-foreground before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Tilt3D>
              ))}
            </div>
          </Section>

          <Section id="skills" label="Skills" title="What I work with">
            <div className="grid gap-6 sm:grid-cols-3">
              {skillGroups.map((group) => (
                <Tilt3D
                  key={group.label}
                  className="rounded-lg border border-border bg-card p-5"
                  intensity={6}
                >
                  <div className="layer-3d">
                    <p className="eyebrow mb-3">{group.label}</p>
                    <ul className="space-y-1.5 text-muted-foreground">
                      {group.items.map((item, i) => (
                        <li key={`${item.label}-${i}`}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="border-b border-transparent transition-colors hover:border-accent hover:text-accent"
                          >
                            {item.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>

                  </div>
                </Tilt3D>
              ))}
            </div>
          </Section>

          <Section id="credentials" label="Credentials" title="Education & certifications">
            <div className="grid gap-6 sm:grid-cols-2">
              <Tilt3D className="rounded-lg border border-border bg-card p-6" intensity={4}>
                <div className="layer-3d">
                  <p className="eyebrow mb-4">Education</p>
                  <div className="space-y-5">
                    {education.map((item) => (
                      <div key={item.school} className="space-y-2">
                        <p className="font-medium">{item.school}</p>
                        <p className="text-muted-foreground">{item.credential}</p>
                        <p className="text-sm text-muted-foreground">{item.period}</p>
                        <DocButton href={item.href ?? ""} label="View education certificate" />
                      </div>
                    ))}
                  </div>
                </div>
              </Tilt3D>
              <Tilt3D className="rounded-lg border border-border bg-card p-6" intensity={4}>
                <div className="layer-3d">
                  <p className="eyebrow mb-4">Certificates</p>
                  <div className="space-y-5">
                    {certificates.map((item) => (
                      <div key={item.name} className="space-y-2">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          {item.issuer} · {item.year}
                        </p>
                        <DocButton
                          href={item.images?.length || item.image ? `/certificates/${item.slug}` : item.href ?? ""}
                          label="View certificate"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </Tilt3D>
            </div>
          </Section>

          {references.length > 0 ? (
            <Section id="references" label="References" title="What others say">
              <div className="space-y-8">
                {references.map((reference) => (
                  <blockquote key={reference.author} className="border-l-2 border-accent pl-5">
                    <p className="font-display max-w-2xl text-xl leading-snug md:text-2xl">
                      “{reference.quote}”
                    </p>
                    <footer className="mt-3 text-sm text-muted-foreground">
                      {reference.author} — {reference.role}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </Section>
          ) : null}

          <Section id="contact" label="Contact" title="Get in touch">
            <Tilt3D className="rounded-lg border border-border bg-card p-6 md:p-8" intensity={4}>
              <ul className="layer-3d space-y-3 text-lg">
                {profile.links.email ? (
                  <li>
                    <a
                      href={`mailto:${profile.links.email}`}
                      className="border-b border-border pb-0.5 transition-colors hover:border-accent hover:text-accent"
                    >
                      {profile.links.email}
                    </a>
                  </li>
                ) : null}
                {profile.links.phone ? (
                  <li>
                    <a
                      href={`tel:${profile.links.phone.replace(/\s+/g, "")}`}
                      className="border-b border-border pb-0.5 transition-colors hover:border-accent hover:text-accent"
                    >
                      {profile.links.phone}
                    </a>
                  </li>
                ) : null}
                {profile.links.website ? (
                  <li>
                    <a
                      href={profile.links.website}
                      target="_blank"
                      rel="noreferrer"
                      className="border-b border-border pb-0.5 transition-colors hover:border-accent hover:text-accent"
                    >
                      {profile.links.website}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ) : null}
              </ul>
              <ul className="layer-3d mt-8 flex flex-wrap gap-3">
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label] ?? Link2;
                  return (
                    <li key={social.label}>
                      {social.url ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="social-chip social-chip-active"
                          style={{ color: social.color }}
                        >
                          <Icon size={20} aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          title={`Add your ${social.label} link in profile.ts`}
                          aria-label={`${social.label} link not added yet`}
                          className="social-chip opacity-40"
                          style={{ color: social.color }}
                        >
                          <Icon size={20} aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

            </Tilt3D>
          </Section>

          <Section id="message" label="Message me" title="Send me an email">
            <Tilt3D
              className="w-full max-w-xl rounded-lg border border-border bg-card p-4 md:p-6"
              intensity={3}
            >
              <p className="layer-3d mb-6 max-w-xl text-muted-foreground">
                Fill in the form and your message reaches me directly · no third-party inbox in
                between.
              </p>
              <ContactForm />
            </Tilt3D>
          </Section>
        </main>

        <footer className="border-t border-border py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </div>
  );
}
