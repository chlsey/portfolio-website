import { useRef, useState, type CSSProperties, type MouseEvent } from 'react';

export type FishProps = {
    src: string;
    y: number;
    size: number;
    duration: number;
    direction: "left" | "right";
    tankWidth: number;
    onExit: () => void;
};

const FLEE_DURATION = 0.8;

type FleeState = {
    startX: number;
    travel: number;
    direction: "left" | "right";
};

export function Fish({
    src,
    y,
    size,
    duration,
    direction,
    tankWidth,
    onExit
}: FishProps) {
    // size is percentage of the tank's width, so fish scale with the
    // aquarium (resizing the window rescales every fish on its next render).
    const sizePx = (size / 100) * tankWidth;

    const elRef = useRef<HTMLDivElement>(null);
    const [flee, setFlee] = useState<FleeState | null>(null);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (flee) return; // already fleeing — ignore extra clicks
        e.stopPropagation();

        const el = elRef.current;
        const tank = el?.parentElement;
        if (!el || !tank) return;

        // Where the fish actually is right now (mid-swim), not where its
        // lazy-swim animation started — so the dart-away doesn't jump.
        const elRect = el.getBoundingClientRect();
        const tankRect = tank.getBoundingClientRect();
        const currentX = elRect.left - tankRect.left;

        const fleeDirection: "left" | "right" = Math.random() > 0.5 ? "left" : "right";
        const travel = fleeDirection === "right"
            ? tankWidth - currentX + sizePx
            : -(currentX + sizePx);

        setFlee({ startX: currentX, travel, direction: fleeDirection });
    };

    const activeDirection = flee?.direction ?? direction;
    const startX = flee
        ? flee.startX
        : direction === "right" ? -sizePx : tankWidth + sizePx;
    const travel = flee
        ? flee.travel
        : direction === "right" ? tankWidth + sizePx * 2 : -(tankWidth + sizePx * 2);

    const style = {
        left: startX,
        top: `${y}%`,
        width: sizePx,
        animationDuration: `${flee ? FLEE_DURATION : duration}s`,
        animationTimingFunction: flee ? "cubic-bezier(0.4, 0, 1, 1)" : "linear",
        "--fish-travel": `${travel}px`,
      } as CSSProperties & Record<"--fish-travel", string>;

      return (
        <div
          // Changing the key forces React to remount this node, which
          // restarts the CSS animation fresh with the new start position
          // and travel distance — just updating state wouldn't retarget
          // an animation already mid-flight.
          key={flee ? "fleeing" : "swimming"}
          ref={elRef}
          className={`fish${flee ? " fish--fleeing" : ""}`}
          style={style}
          onClick={handleClick}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) {
              onExit();
            }
          }}
        >
          <div className={`fish-bob fish-bob--${activeDirection}`}>
            <img className="fish-image" src={src} alt="" draggable={false} />
          </div>
        </div>
      );
    }
