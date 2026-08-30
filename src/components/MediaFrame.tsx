export type MediaItem = {
  /** Image shown in the frame (also used as the video poster). */
  image?: string;
  /** Optional self-hosted or CDN video file (mp4/webm). */
  video?: string;
  /** Optional embed URL (YouTube, Vimeo, Loom …). */
  embed?: string;
  /** Required for accessibility whenever an image is present. */
  alt?: string;
  caption?: string;
};

/**
 * A 3D-framed image / video holder.
 * Falls back to a labelled empty holder so every project keeps its media slot.
 */
export function MediaFrame({
  media,
  label,
}: {
  media?: MediaItem | undefined;
  label: string;
}) {
  const alt = media?.alt ?? `${label} cover image`;

  return (
    <figure className="media-frame group">
      <div className="media-frame-inner">
        {media?.embed ? (
          <iframe
            src={media.embed}
            title={`${label} — video`}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : media?.video ? (
          <video
            controls
            preload="none"
            poster={media.image}
            aria-label={`${label} — video walkthrough`}
            className="h-full w-full object-cover"
          >
            <source src={media.video} />
            Your browser does not support embedded video.
          </video>
        ) : media?.image ? (
          <img
            src={media.image}
            alt={alt}
            loading="lazy"
            width={1280}
            height={800}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <span className="eyebrow">Image / video slot</span>
          </div>
        )}
      </div>
      {media?.caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}
