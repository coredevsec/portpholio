import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Coffee,
  Download,
  Facebook,
  FileText,
  Github,
  Link2,
  Linkedin,
  ShoppingBag,
  Twitter,
} from "lucide-react";

import { HeroRobot3D } from "@/components/HeroRobot3D";
import { ContactForm } from "@/components/ContactForm";
import { MediaFrame } from "@/components/MediaFrame";
import { Tilt3D } from "@/components/Tilt3D";
import { ToolBadge } from "@/components/ToolBadge";
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
  products,
  projects,
  references,
  skillGroups,
  socials,
  portfolioStats,
} from "@/content/profile";

const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Facebook: Facebook,
  "Buy me a coffee": Coffee,
  Linktree: Link2,
  X: Twitter,
};

function AnimatedStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState(portfolioStats.map(() => 0));

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = window.setInterval(() => {
      setValues((current) => current.map((value, index) => Math.min(portfolioStats[index]!.value, value + 1)));
    }, 90);
    return () => window.clearInterval(timer);
  }, [started]);

  return (
    <div ref={statsRef} className="mt-8 grid justify-items-center gap-5 border-t border-border pt-6 text-center">
      {portfolioStats.map((stat, index) => (
        <div key={stat.label}>
          <p className="stat-value">{values[index]}{stat.suffix}</p>
          <p className="mt-1 text-[10px] leading-tight text-muted-foreground sm:text-xs">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function HeroClock() {
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const updateClock = () =>
      setClock(
        new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );

    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <p className="hero-clock">{clock}</p>;
}

/** Download / view button that stays disabled until a document path is set. */
function DocButton({
  href,
  label,
  icon: Icon = FileText,
  disabled = false,
}: {
  href: string;
  label: string;
  icon?: typeof FileText;
  disabled?: boolean;
}) {
  const isDisabled = disabled || !href;

  if (isDisabled) {
    return (
      <button
        type="button"
        disabled
        title={disabled ? "Add the certificate image in profile.ts to enable this button." : "Upload the file and set its path in profile.ts to enable"}
        className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground opacity-60"
      >
        <Icon size={15} aria-hidden="true" />
        {label}
      </button>
    );
  }

  const isExternalLink = /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternalLink) {
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

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-sm border border-accent px-3 py-1.5 text-sm text-accent transition-opacity hover:opacity-75"
    >
      <Icon size={15} aria-hidden="true" />
      {label}
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
  children: ReactNode;
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

function Portfolio() {
  const [messageOpen, setMessageOpen] = useState(false);

  useEffect(() => {
    const shouldOpenFromHash = window.location.hash === "#message";
    const shouldOpenFromIntent = window.sessionStorage.getItem("purchase-intent") === "true";

    if (shouldOpenFromHash || shouldOpenFromIntent) {
      setMessageOpen(true);
      window.sessionStorage.removeItem("purchase-intent");
    }
  }, []);

  const openMessage = () => {
    setMessageOpen(true);
    window.requestAnimationFrame(() => {
      document.getElementById("message")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 sm:px-6 md:px-10">
        <main id="main" className="pt-24">
          <div className="scene-3d py-10 sm:py-14 md:py-24">
            <div className="card-3d overflow-hidden rounded-lg border border-border bg-card p-4 sm:p-7 md:p-12">
              <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:gap-4 md:grid-cols-[1.1fr_1fr] md:gap-10">
                <div className="layer-3d min-w-0">
                  <div className="hero-location-window">
                    <p className="hero-location eyebrow text-[8px] sm:text-[11px]">
                      {profile.location}
                    </p>
                  </div>
                  <HeroClock />
                  <div className="hero-name-window hero-name-after-clock mt-2 sm:mt-4">
                    <h1 className="hero-name block whitespace-nowrap text-2xl leading-[1.2] sm:text-5xl md:text-4xl">
                      {profile.name}
                    </h1>
                  </div>
                  <p className="mt-2 max-w-xl text-[11px] leading-snug text-muted-foreground sm:mt-4 sm:text-lg md:mt-6 md:text-xl">
                    {profile.headline}
                  </p>
                </div>
                <div className="hero-robot-shell mt-2 min-w-0 sm:mt-0">
                  <div className="hero-robot-card">
                    <HeroRobot3D />
                  </div>
                  <div className="hero-actions mt-3 flex flex-wrap items-center justify-end gap-1.5 sm:gap-3">
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-sm bg-primary px-2.5 py-1.5 text-[9px] text-primary-foreground transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-xs"
                    >
                      LinkedIn profile
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <a
                      href="#credentials"
                      className="inline-flex items-center justify-center gap-1 rounded-sm border border-border px-2.5 py-1.5 text-[9px] transition-colors hover:border-accent hover:text-accent sm:gap-2 sm:px-3 sm:py-2 sm:text-xs"
                    >
                      <FileText size={15} aria-hidden="true" />
                      View certificates
                    </a>
                    <DocButton href={documents.cv} label="Download CV" icon={Download} />
                    <a
                      href="#work"
                      className="inline-flex items-center border-b border-accent pb-0.5 text-[9px] text-accent transition-opacity hover:opacity-70 sm:pb-1 sm:text-xs"
                    >
                      See selected work
                    </a>
                  </div>
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

          <div className="stats-outside-about">
            <AnimatedStats />
          </div>

          <Section id="work" label="Selected work" title="Projects">
            <div className="mb-10">
              <Carousel
                orientation="vertical"
                opts={{ loop: true }}
                autoPlayMs={4500}
                className="mx-auto h-[34rem] w-full max-w-3xl"
              >
                <CarouselContent className="w-full">
                  {projects.map((project) => (
                    <CarouselItem key={`featured-${project.name}`} className="h-full w-full">
                      <Link
                        to="/projects/$projectId"
                        params={{ projectId: project.slug }}
                        className="featured-project-card block h-full w-full max-w-full overflow-hidden rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent md:p-6"
                      >
                        <MediaFrame media={project.media} label={project.name} />
                        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                          <h3 className="font-display text-2xl">{project.name}</h3>
                          <span className="text-sm text-muted-foreground">{project.year}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <ToolBadge key={tool} label={tool} />
                          ))}
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

          <div className="flex justify-center pb-4">
            <button
              type="button"
              onClick={openMessage}
              className="hire-button inline-flex items-center gap-2 rounded-sm border border-border bg-transparent px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent active:bg-primary active:text-primary-foreground"
            >
              <BriefcaseBusiness size={16} aria-hidden="true" />
              Hire me
            </button>
          </div>

          <Section id="marketplace" label="Marketplace" title="Ready-to-use digital products">
            <div className="marketplace-scroll glass-panel max-w-3xl p-3">
              {products.map((product) => (
                <article key={product.name} className="marketplace-product">
                  <div>
                    <h3 className="font-display text-xl">{product.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <strong className="text-accent">{product.price}</strong>
                    <Link
                      to="/payment"
                      onClick={() => {
                        window.sessionStorage.setItem("purchase-intent", "true");
                      }}
                      className="buy-button inline-flex items-center gap-1 rounded-sm border border-border bg-transparent px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent active:bg-primary active:text-primary-foreground"
                    >
                      <ShoppingBag size={14} aria-hidden="true" /> Buy now
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="experience" label="Experience" title="Where I have worked">
            <div className="experience-list bounded-list h-[20rem] space-y-8">
              {experience.map((role) => (
                <Tilt3D
                  key={`${role.company}-${role.title}`}
                  className="rounded-lg border border-border bg-card p-6 text-center md:p-8"
                  intensity={4}
                >
                  <article className="layer-3d text-center">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <h3 className="text-lg font-medium">
                        {role.title} · {role.company}
                      </h3>
                      <span className="text-sm text-muted-foreground">{role.period}</span>
                    </div>
                    {role.location ? (
                      <p className="mt-1 text-sm text-muted-foreground">{role.location}</p>
                    ) : null}
                    <p className="mt-3 max-w-2xl text-muted-foreground">{role.summary}</p>
                    <ul className="mt-3 space-y-2 text-center">
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
                  className="skill-card flex h-[15rem] flex-col items-center rounded-lg border border-border bg-card p-4 text-center"
                  intensity={6}
                >
                  <div className="layer-3d flex min-h-0 flex-1 flex-col items-center text-center">
                    <p className="eyebrow mb-3">{group.label}</p>
                    <ul className="skill-list bounded-list flex h-[10rem] w-full flex-col items-center gap-1.5 text-center text-muted-foreground">
                      {group.items.map((item, i) => (
                        <li key={`${item.label}-${i}`} className="flex w-full justify-center">
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center border-b border-transparent transition-colors hover:border-accent hover:text-accent"
                          >
                            <ToolBadge label={item.label} iconUrl={item.iconUrl} />
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
              <Tilt3D className="rounded-lg border border-border bg-card p-6 text-center" intensity={4}>
                <div className="layer-3d text-center">
                  <p className="eyebrow mb-4">Education</p>
                  <div className="bounded-list h-64 space-y-5">
                    {education.map((item) => (
                      <div key={item.school} className="space-y-2 text-center">
                        <p className="font-medium">{item.school}</p>
                        <p className="text-muted-foreground">{item.credential}</p>
                        <p className="text-sm text-muted-foreground">{item.period}</p>
                        <div className="flex justify-center">
                          <DocButton href={item.href ?? ""} label="View education certificate" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tilt3D>
              <Tilt3D className="rounded-lg border border-border bg-card p-6 text-center" intensity={4}>
                <div className="layer-3d text-center">
                  <p className="eyebrow mb-4">Certificates</p>
                  <div className="bounded-list h-64 space-y-5">
                    {certificates.map((item) => {
                      const hasCertificateImage = Boolean(item.images?.length || item.image);

                      return (
                        <div key={item.name} className="space-y-2 text-center">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">
                            {item.issuer} · {item.year}
                          </p>
                          {item.credentialId ? (
                            <p className="text-xs text-muted-foreground">Credential ID: {item.credentialId}</p>
                          ) : null}
                          {item.skills?.length ? (
                            <div className="flex flex-wrap justify-center gap-1.5">
                              {item.skills.map((skill) => <ToolBadge key={skill} label={skill} />)}
                            </div>
                          ) : null}
                          <div className="flex justify-center">
                            <DocButton
                              href={hasCertificateImage ? `/certificates/${item.slug}` : ""}
                              label="View certificate"
                              disabled={!hasCertificateImage}
                            />
                          </div>
                        </div>
                      );
                    })}
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
                      {reference.author} | {reference.role}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </Section>
          ) : null}

          <Section id="contact" label="Contact" title="Get in touch">
            <Tilt3D className="w-full max-w-2xl rounded-lg border border-border bg-card p-4 text-center md:p-6" intensity={4}>
              <ul className="layer-3d space-y-3 text-center text-lg">
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
              <ul className="layer-3d mt-6 flex flex-wrap justify-center gap-3">
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
                          <Icon size={26} aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          title={`Add your ${social.label} link in profile.ts`}
                          aria-label={`${social.label} link not added yet`}
                          className="social-chip opacity-40"
                          style={{ color: social.color }}
                        >
                          <Icon size={26} aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

            </Tilt3D>
          </Section>

          {messageOpen ? (
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
          ) : null}
        </main>

        <footer className="mx-auto w-full max-w-4xl border-t border-border py-4 text-center text-[10px] leading-4 text-muted-foreground sm:py-6 sm:text-xs sm:leading-5">
          © {new Date().getFullYear()} Korede Ogundana
        </footer>
      </div>
    </div>
  );
}
