import { useEffect, useRef, useState } from "react";
import { Power } from "lucide-react";

/**
 * Interactive CSS-3D humanoid robot terminal.
 * The robot idles with a slow rotation and can be dragged with a mouse or finger.
 * Reduced-motion users get the static pose.
 */
const READOUTS = [
  ["> boot.sh", "systems nominal"],
  ["> scan(net)", "0 threats found"],
  ["> kyc.verify", "identity matched"],
  ["> deploy(aws)", "build passed"],
  ["> ls -la", "workspace clean"],
  ["> uname -a", "linux 6.8.0-52"],
  ["> cat /etc/os-release", "ubuntu 24.04 lts"],
  ["> git status", "branch: main"],
  ["> sudo apt update", "all packages up to date"],
  ["> ssh -T git@github.com", "authentication successful"],
];

export function HeroRobot3D() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const [rot, setRot] = useState({ x: -6, y: -18 });
  const [step, setStep] = useState(0);
  const [scale, setScale] = useState(0.54);
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    if (!awake) return;

    const updateScale = () => {
      if (window.innerWidth < 380) setScale(0.54);
      else if (window.innerWidth < 640) setScale(0.56);
      else setScale(0.58);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [awake]);

  useEffect(() => {
    if (!awake) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const idleRotation = window.setInterval(() => {
      if (draggingRef.current) return;
      setRot((current) => ({ x: current.x, y: current.y + 0.45 }));
    }, 40);

    return () => window.clearInterval(idleRotation);
  }, [awake]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    movedRef.current = false;
    lastPointerRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = sceneRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (draggingRef.current) {
      const deltaX = event.clientX - lastPointerRef.current.x;
      const deltaY = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) movedRef.current = true;
      setRot((current) => ({
        x: current.x - deltaY * 0.9,
        y: current.y + deltaX * 1.8,
      }));
      return;
    }

    if (event.pointerType === "touch" || !node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: -py * 22 - 4, y: px * 70 });
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (!movedRef.current) advanceReadout();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const advanceReadout = () => setStep((s) => s + 1);
  const readout = READOUTS[step % READOUTS.length]!;

  return (
    <div className={`hero-robot-shell ${awake ? "is-awake" : ""} mt-2 min-w-0 sm:mt-0`}>
      <div className="hero-robot-card">
        <div className={`hero-power-display ${awake ? "is-awake" : ""}`}>
          <div className={`hero-robot-stage ${awake ? "is-awake" : ""}`}>
            {!awake ? (
              <div className="sleeping-computer" aria-live="polite" aria-label="Computer sleeping">
                <div className="sleeping-computer-screen">
                  <div className="sleeping-computer-bezel">
                    <span>STANDBY</span>
                    <i aria-hidden="true" />
                  </div>
                  <div className="sleeping-terminal" aria-hidden="true">
                    <span className="sleeping-terminal-cursor" />
                    <span className="sleeping-terminal-status">SLEEP MODE</span>
                    <span className="sleeping-terminal-line" />
                    <span className="sleeping-terminal-line short" />
                  </div>
                </div>
                <div className="sleeping-computer-base" aria-hidden="true" />
              </div>
            ) : (
              <div
                ref={sceneRef}
                onPointerLeave={() => {
                  if (!draggingRef.current) setRot({ x: -6, y: -18 });
                }}
                className="robot-scene select-none"
              >
                <div
                  className="robot-rig"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handleMove}
                  onPointerUp={stopDragging}
                  onPointerCancel={stopDragging}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      advanceReadout();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Cycle the robot terminal readout"
                  style={{ transform: `scale(${scale}) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
                >
                  <div className="robot-head" aria-hidden="true">
                    <span className="robot-face">
                      <span className="robot-eye" />
                      <span className="robot-eye" />
                    </span>
                    <span className="robot-mouth" aria-hidden="true" />
                    <span className="robot-antenna" aria-hidden="true" />
                  </div>

                  <div className="robot-ear robot-ear-left" aria-hidden="true" />
                  <div className="robot-ear robot-ear-right" aria-hidden="true" />
                  <div className="robot-neck" aria-hidden="true" />

                  <div className="robot-body" aria-hidden="true">
                    <div className="robot-screen" role="status" aria-live="polite">
                      <span className="robot-line text-accent">{readout[0]}</span>
                      <span className="robot-line">{readout[1]}</span>
                      <span className="robot-bar" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="robot-arm robot-arm-left" aria-hidden="true">
                    <span className="robot-hand" />
                  </div>
                  <div className="robot-arm robot-arm-right" aria-hidden="true">
                    <span className="robot-hand" />
                  </div>

                  <div className="robot-hip" aria-hidden="true" />
                  <div className="robot-leg robot-leg-left" aria-hidden="true">
                    <span className="robot-foot" />
                  </div>
                  <div className="robot-leg robot-leg-right" aria-hidden="true">
                    <span className="robot-foot" />
                  </div>

                  <div className="robot-shadow" aria-hidden="true" />
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Tap to run a command
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            className={`hero-power-button ${awake ? "is-on" : ""}`}
            aria-label={awake ? "Turn robot off" : "Turn robot on"}
            aria-pressed={awake}
            onClick={() => setAwake((value) => !value)}
          >
            <Power size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
