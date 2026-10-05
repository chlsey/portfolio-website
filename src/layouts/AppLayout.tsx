import { useCallback, useRef, useState, type ReactNode } from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import DesktopWindow from "../components/DesktopWindow";
import StickyNote from "../components/StickyNote";
import { WindowManagerContext, type WindowSpec, type WindowVariant } from "../context/WindowManager";
import { windowRegistry, type WindowDef, type WindowId } from "../data/windows";

type OpenWindow = {
    id: string;
    title: string;
    content: ReactNode;
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    aspectRatio?: number;
    contentPaddingX?: number;
    contentPaddingY?: number;
    variant?: WindowVariant;
    onBack?: () => void;
};

const NAVBAR_WIDTH = 213;
const TOP_BAR_HEIGHT = 30;
const DEFAULT_WIDTH = 560;
const DEFAULT_HEIGHT = 420;
const EDGE_MARGIN = 8;

/** Keeps a window fully on screen (clear of the navbar and the decorative
 *  top bar too), regardless of how its ideal position was computed. */
function clampToViewport(x: number, y: number, width: number, height: number, vw: number, vh: number) {
    const minX = NAVBAR_WIDTH + 20;
    const minY = TOP_BAR_HEIGHT + 20;
    const maxX = Math.max(minX, vw - width - EDGE_MARGIN);
    const maxY = Math.max(minY, vh - height - EDGE_MARGIN);
    return {
        x: Math.min(Math.max(x, minX), maxX),
        y: Math.min(Math.max(y, minY), maxY),
    };
}

function createInitialWindows(): OpenWindow[] {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const welcomeDef = windowRegistry.welcome;
    const welcome = clampToViewport(
        (vw - welcomeDef.width) / 2,
        (vh - welcomeDef.height) / 2,
        welcomeDef.width,
        welcomeDef.height,
        vw,
        vh,
    );

    const aquariumDef = windowRegistry.aquarium;
    const aquariumWidth = 480;
    const aquariumHeight = Math.round(
        (aquariumWidth - (aquariumDef.contentPaddingX ?? 0)) / (aquariumDef.aspectRatio ?? 1)
            + 34 + (aquariumDef.contentPaddingY ?? 0),
    );
    const aquarium = clampToViewport(
        vw - aquariumWidth - 24,
        Math.max(welcome.y + welcomeDef.height + 20, vh - aquariumHeight - 24),
        aquariumWidth,
        aquariumHeight,
        vw,
        vh,
    );

    const stickyWidth = 240;
    const stickyHeight = 220;
    const sticky = clampToViewport(vw - stickyWidth - 40, 40, stickyWidth, stickyHeight, vw, vh);

    return [
        {
            id: "welcome",
            title: welcomeDef.title,
            content: welcomeDef.content,
            x: welcome.x,
            y: welcome.y,
            z: 12,
            width: welcomeDef.width,
            height: welcomeDef.height,
        },
        {
            id: "aquarium",
            title: aquariumDef.title,
            content: aquariumDef.content,
            x: aquarium.x,
            y: aquarium.y,
            z: 10,
            width: aquariumWidth,
            height: aquariumHeight,
            aspectRatio: aquariumDef.aspectRatio,
            contentPaddingX: aquariumDef.contentPaddingX,
            contentPaddingY: aquariumDef.contentPaddingY,
            variant: aquariumDef.variant,
        },
        {
            id: "sticky:default",
            title: "Sticky Note",
            content: <StickyNote defaultText={"- finish portfolio\n- buy groceries\n - feed shadow"} />,
            x: sticky.x,
            y: sticky.y,
            z: 11,
            width: stickyWidth,
            height: stickyHeight,
        },
    ];
}

function AppLayout() {
    const topZ = useRef(12);
    const [windows, setWindows] = useState<OpenWindow[]>(createInitialWindows);

    const focusWindow = useCallback((id: string) => {
        const z = ++topZ.current;
        setWindows((cur) => cur.map((w) => (w.id === id ? { ...w, z } : w)));
    }, []);

    const openWindow = useCallback((spec: WindowSpec) => {
        setWindows((cur) => {
            if (cur.some((w) => w.id === spec.id)) {
                const z = ++topZ.current;
                return cur.map((w) => (w.id === spec.id ? { ...w, z } : w));
            }

            const z = ++topZ.current;
            const width = spec.width ?? DEFAULT_WIDTH;
            const height = spec.height ?? DEFAULT_HEIGHT;

            let x: number;
            let y: number;
            if (spec.center) {
                x = Math.max(NAVBAR_WIDTH + 20, (window.innerWidth - width) / 2);
                y = Math.max(TOP_BAR_HEIGHT + 20, (window.innerHeight - height) / 2);
            } else {
                const offset = (cur.length % 6) * 30;
                x = NAVBAR_WIDTH + 40 + offset;
                y = TOP_BAR_HEIGHT + 30 + offset;
            }

            return [
                ...cur,
                {
                    id: spec.id,
                    title: spec.title,
                    content: spec.content,
                    x,
                    y,
                    z,
                    width,
                    height,
                    aspectRatio: spec.aspectRatio,
                    contentPaddingX: spec.contentPaddingX,
                    contentPaddingY: spec.contentPaddingY,
                    variant: spec.variant,
                },
            ];
        });
    }, []);

    const openRegistered = useCallback((id: WindowId) => {
        const def = windowRegistry[id] as WindowDef;
        openWindow({
            id,
            title: def.title,
            content: def.content,
            width: def.width,
            height: def.height,
            aspectRatio: def.aspectRatio,
            contentPaddingX: def.contentPaddingX,
            contentPaddingY: def.contentPaddingY,
            variant: def.variant,
            center: def.center,
        });
    }, [openWindow]);

    const closeWindow = useCallback((id: string) => {
        setWindows((cur) => cur.filter((w) => w.id !== id));
    }, []);

    const moveWindow = useCallback((id: string, x: number, y: number) => {
        setWindows((cur) => cur.map((w) => (w.id === id ? { ...w, x, y } : w)));
    }, []);

    const resizeWindow = useCallback((id: string, width: number, height: number) => {
        setWindows((cur) => cur.map((w) => (w.id === id ? { ...w, width, height } : w)));
    }, []);

    const setTitle = useCallback((id: string, title: string) => {
        setWindows((cur) => cur.map((w) => (w.id === id ? { ...w, title } : w)));
    }, []);

    const setBackHandler = useCallback((id: string, handler: (() => void) | null) => {
        setWindows((cur) => cur.map((w) => (w.id === id ? { ...w, onBack: handler ?? undefined } : w)));
    }, []);

    return (
        <WindowManagerContext.Provider
            value={{
                openIds: windows.map((w) => w.id),
                openWindow,
                openRegistered,
                closeWindow,
                focusWindow,
                setTitle,
                setBackHandler,
            }}
        >
            <div className="app-layout">
                <TopBar />
                <Navbar />

                {windows.map(
                    ({ id, title, content, x, y, z, width, height, aspectRatio, contentPaddingX, contentPaddingY, variant, onBack }) => (
                        <DesktopWindow
                            key={id}
                            title={title}
                            x={x}
                            y={y}
                            z={z}
                            width={width}
                            height={height}
                            aspectRatio={aspectRatio}
                            contentPaddingX={contentPaddingX}
                            contentPaddingY={contentPaddingY}
                            variant={variant}
                            onBack={onBack}
                            onClose={() => closeWindow(id)}
                            onFocus={() => focusWindow(id)}
                            onMove={(nx, ny) => moveWindow(id, nx, ny)}
                            onResize={(w, h) => resizeWindow(id, w, h)}
                        >
                            {content}
                        </DesktopWindow>
                    ),
                )}
            </div>
        </WindowManagerContext.Provider>
    );
}

export default AppLayout;
