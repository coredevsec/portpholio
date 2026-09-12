import { useRef, useState, type ReactNode } from "react";

/**
 * Pointer-reactive 3D tilt wrapper.
 * Purely presentational: keyboard users and reduced-motion users get a flat,
 * fully readable card (the tilt only reacts to pointer movement).
 */
export function Tilt3D({
  children,
  className = "",
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 640;
    const effectiveIntensity = Math.min(intensity + (isMobile ? 2 : 0), 12);
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `rotateY(${px * effectiveIntensity * 2}deg) rotateX(${-py * effectiveIntensity * 2}deg) translateZ(14px)`,
    );
  };

  return (
    <div className="scene-3d">
      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={() => setTransform("")}
        onPointerCancel={() => setTransform("")}
        style={{ transform: transform || undefined }}
        className={`card-3d touch-pan-y ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
