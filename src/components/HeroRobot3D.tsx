import { useEffect, useRef, useState } from "react";

/**
 * Interactive CSS-3D humanoid robot terminal.
 * Pointer movement rotates the scene; clicking the robot cycles its readout.
 * Reduced-motion and touch users get the static pose.
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
  const [rot, setRot] = useState({ x: -6, y: -18 });
  const [step, setStep] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth < 480 ? 0.8 : 1);
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = sceneRef.current;
    if (!node || event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: -py * 22 - 4, y: px * 46 });
  };

  const advanceReadout = () => setStep((s) => s + 1);
  const readout = READOUTS[step % READOUTS.length]!;

  return (
    <div
      ref={sceneRef}
      onPointerMove={handleMove}
      onPointerLeave={() => setRot({ x: -6, y: -18 })}
      className="robot-scene select-none"
    >
      <div
        className="robot-rig"
        onClick={advanceReadout}
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
        Drag your cursor to orbit · click the robot to run a command
      </p>
    </div>
  );
}
