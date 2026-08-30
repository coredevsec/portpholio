import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { certificates, profile } from "@/content/profile";

export const Route = createFileRoute("/certificates/$certificateId")({
  head: ({ params }) => {
    const certificate = certificates.find((item) => item.slug === params.certificateId);
    return {
      meta: [
        { title: certificate ? `${certificate.name} — ${profile.name}` : `Certificate — ${profile.name}` },
        {
          name: "description",
          content: certificate
            ? `View ${certificate.name}, issued by ${certificate.issuer}.`
            : `Certificate viewer for ${profile.name}.`,
        },
      ],
    };
  },
  component: CertificatePage,
});

function CertificatePage() {
  const { certificateId } = Route.useParams();
  const certificate = certificates.find((item) => item.slug === certificateId);
  const images = certificate?.images?.length
    ? certificate.images
    : certificate?.image
      ? [certificate.image]
      : [];

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
            hash="credentials"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to credentials
          </Link>
          <ThemeToggle />
        </header>

        <main id="main" className="py-8 md:py-16">
          {certificate && images.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="eyebrow">Certificate</p>
                <h1 className="font-display mt-3 max-w-3xl text-3xl md:text-5xl">{certificate.name}</h1>
                <p className="mt-3 text-muted-foreground">
                  {certificate.issuer} · {certificate.year}
                </p>
              </div>

              <div className="space-y-6">
                {images.map((image, index) => (
                  <figure
                    key={image}
                    className="rounded-lg border border-border bg-card p-3 shadow-sm md:p-6"
                  >
                    <img
                      src={image}
                      alt={`${certificate.name} certificate ${index + 1} issued by ${certificate.issuer}`}
                      className="mx-auto h-auto max-h-[75vh] w-full object-contain"
                    />
                    {images.length > 1 ? (
                      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                        Certificate {index + 1} of {images.length}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>

              {certificate.href ? (
                <a
                  href={certificate.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border-b border-accent pb-0.5 text-sm text-accent transition-opacity hover:opacity-70"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  Open original document
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </>
          ) : (
            <div className="rounded-lg border border-border bg-card p-6 md:p-10">
              <p className="eyebrow">Certificate unavailable</p>
              <h1 className="font-display mt-3 text-3xl">This certificate has not been uploaded yet.</h1>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Add the certificate image to the public folder and set its image path in profile.ts.
              </p>
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
