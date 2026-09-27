import { useEffect, useRef, useState } from "react";
import { Fish, type FishProps } from "./Fish";

type SwimmingFish = Omit<FishProps, "tankWidth" | "onExit"> & {
  id: string;
};

const fishSources = [
  "/fish/fish-1.png",
  "/fish/fish-2.png",
  "/fish/fish-3.png",
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createFish(): SwimmingFish {
  return {
    id: crypto.randomUUID(),
    src: fishSources[Math.floor(Math.random() * fishSources.length)],
    y: randomBetween(12, 82),
    size: randomBetween(60, 130),
    duration: randomBetween(13, 24),
    direction: Math.random() > 0.5 ? "left" : "right",
  };
}

export default function Aquarium() {
    const tankRef = useRef<HTMLElement>(null);
    const [tankWidth, setTankWidth] = useState(0);
    const [fish, setFish] = useState<SwimmingFish[]>([]);

    // Update tank width on resize
    // resize observer is used to track the size of the tank element and update the state accordingly
    useEffect(() => {
        const tank = tankRef.current;
        if (!tank) return;

        const resizeObserver = new ResizeObserver(([entry]) => {
        setTankWidth(entry.contentRect.width);
        });

        resizeObserver.observe(tank);

        return () => resizeObserver.disconnect();
    }, []);

    // spawning fish randomly
    useEffect(() => {
        setFish([createFish(), createFish(), createFish()]);

        let timeoutId: number;

        const scheduleNextFish = () => {
        timeoutId = window.setTimeout(() => {
            // use functional update to ensure we have the latest state
            setFish((currentFish) => {
            if (currentFish.length >= 6) return currentFish;
            return [...currentFish, createFish()];
            });

            scheduleNextFish();
        }, randomBetween(1400, 3500));
        };

        scheduleNextFish();

        return () => window.clearTimeout(timeoutId);
    }, []);

    function removeFish(id: string) {
        setFish((currentFish) =>
        currentFish.filter((swimmingFish) => swimmingFish.id !== id),
        );
    }

    return (
        <section ref={tankRef} className="aquarium" aria-label="Animated aquarium">
        {tankWidth > 0 &&
            fish.map((swimmingFish) => (
            <Fish
                key={swimmingFish.id}
                {...swimmingFish}
                tankWidth={tankWidth}
                onExit={() => removeFish(swimmingFish.id)}
            />
            ))}
        </section>
    );
}