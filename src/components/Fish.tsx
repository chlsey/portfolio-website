import type { CSSProperties } from 'react';

export type FishProps = {
    src: string;
    y: number;
    size: number;
    duration: number;
    direction: "left" | "right";
    tankWidth: number;
    onExit: () => void;
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
    const travelDistance = tankWidth + size * 2;
    const startX = direction === "right" ? -size : tankWidth + size;
    const travel = direction === "right" ? travelDistance : -travelDistance;

    const style = {
        left: startX,
        top: `${y}%`,
        width: size,
        animationDuration: `${duration}s`,
        "--fish-travel": `${travel}px`,
      } as CSSProperties & Record<"--fish-travel", string>;
    
      return (
        <div
          className="fish"
          style={style}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) {
              onExit();
            }
          }}
        >
          <div className={`fish-bob fish-bob--${direction}`}>
            <img className="fish-image" src={src} alt="" draggable={true} />
          </div>
        </div>
      );
    }