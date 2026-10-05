import { createContext, useContext, type ReactNode } from "react";
import type { WindowId } from "../data/windows";

export type WindowVariant = "standard" | "frame";

export type WindowSpec = {
    id: string;
    title: string;
    content: ReactNode;
    width?: number;
    height?: number;
    /** Locks the window frame to this width:height ratio while resizing. */
    aspectRatio?: number;
    /** Total horizontal/vertical padding of the ratio-locked content area
     *  (see DesktopWindow) — required alongside aspectRatio for accurate
     *  resize math. */
    contentPaddingX?: number;
    contentPaddingY?: number;
    /** "frame" renders a minimal, very transparent theme. Defaults to
     *  "standard". */
    variant?: WindowVariant;
    /** Center the window on the viewport when it first opens, instead of
     *  cascading it near the navbar. */
    center?: boolean;
};

export type WindowManagerContextValue = {
    openIds: string[];
    /** Open (or focus, if already open) a window described inline. Used for
     *  dynamic windows, e.g. a single project's detail page or an art piece. */
    openWindow: (spec: WindowSpec) => void;
    /** Open (or focus) one of the fixed windows from the nav registry. */
    openRegistered: (id: WindowId) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    /** Lets a window's own content rename its title bar, e.g. Projects
     *  switching between "Projects" and a project's name. */
    setTitle: (id: string, title: string) => void;
    /** Lets a window's own content opt into a "back" button next to the
     *  close button; pass null to remove it. */
    setBackHandler: (id: string, handler: (() => void) | null) => void;
};

export const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

export function useWindowManager(): WindowManagerContextValue {
    const ctx = useContext(WindowManagerContext);
    if (!ctx) {
        throw new Error("useWindowManager must be used within AppLayout");
    }
    return ctx;
}
