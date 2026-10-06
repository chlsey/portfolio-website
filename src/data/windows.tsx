import type { ReactNode } from "react";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Art from "../pages/Art";
import Hobbies from "../pages/Hobbies";
import AquariumPage from "../pages/AquariumPage";
import Landing from "../pages/Landing";

export type WindowDef = {
    title: string;
    content: ReactNode;
    width: number;
    height: number;
    /** When set, the window frame is locked to this width:height ratio
     *  while dragging its resize handle. */
    aspectRatio?: number;
    /** Total horizontal/vertical padding of the ratio-locked content area
     *  (see DesktopWindow) — needed so the resize math accounts for the
     *  titlebar + the content's own padding, not just the outer frame. */
    contentPaddingX?: number;
    contentPaddingY?: number;
    /** "frame" = minimal, glossy glass theme. Defaults to "standard". */
    variant?: "standard" | "frame";
    /** Opens centered on the viewport instead of cascading near the navbar. */
    center?: boolean;
};

// 4482 / 1903 is the native pixel size of aquarium/background.jpg.
const AQUARIUM_RATIO = 4482 / 1903;
const AQUARIUM_INSET_X = 6;
const AQUARIUM_INSET_Y = 34 + 6;
const AQUARIUM_WIDTH = 820;

export const windowRegistry = {
    welcome:  { title: "Welcome",  content: <Landing />,     width: 920, height: 550, center: true },
    about:    { title: "About",    content: <About />,       width: 600, height: 440 },
    projects: { title: "Projects", content: <Projects />,    width: 750, height: 520, center: true },
    art:      { title: "Art",      content: <Art />,         width: 640, height: 480 },
    hobbies:  { title: "Hobbies",  content: <Hobbies />,     width: 600, height: 440 },
    aquarium: {
        title: "Aquarium",
        content: <AquariumPage />,
        width: AQUARIUM_WIDTH,
        height: Math.round((AQUARIUM_WIDTH - AQUARIUM_INSET_X) / AQUARIUM_RATIO + AQUARIUM_INSET_Y),
        aspectRatio: AQUARIUM_RATIO,
        contentPaddingX: AQUARIUM_INSET_X,
        contentPaddingY: 6,
        variant: "frame",
    },
} satisfies Record<string, WindowDef>;

export type WindowId = keyof typeof windowRegistry;
