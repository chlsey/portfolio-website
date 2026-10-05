import { useRef, type PointerEvent, type ReactNode } from "react";
import type { WindowVariant } from "../context/WindowManager";

type DesktopWindowProps = {
    title: string;
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    /** Locks the frame to this width:height ratio. When set, native
     *  browser resize is replaced with a custom handle so the ratio is
     *  enforced reliably across browsers. */
    aspectRatio?: number;
    /** Total horizontal/vertical padding of the ratio-locked content area
     *  inside the window body (the titlebar's own height is accounted for
     *  automatically). Without this, resize math would lock the *outer*
     *  frame to the ratio while the inner content — shrunk by the
     *  titlebar and its own padding — ends up a different shape. */
    contentPaddingX?: number;
    contentPaddingY?: number;
    /** "frame" = a minimal, very transparent theme (still has the same
     *  draggable titlebar and close button, just see-through). */
    variant?: WindowVariant;
    onClose: () => void;
    onFocus: () => void;
    onMove: (x: number, y: number) => void;
    onResize?: (width: number, height: number) => void;
    /** Shows a "back" button next to the close button when provided. */
    onBack?: () => void;
    children: ReactNode;
};

const MIN_RATIO_WIDTH = 260;
const TITLEBAR_HEIGHT = 34;

function DesktopWindow({
    title, x, y, z, width, height, aspectRatio, contentPaddingX, contentPaddingY, variant = "standard",
    onClose, onFocus, onMove, onResize, onBack,
    children,
}: DesktopWindowProps) {
    const dragOffset = useRef<{ dx: number; dy: number } | null>(null);
    const resizeStart = useRef<{ clientX: number; width: number } | null>(null);

    const handleDragStart = (e: PointerEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest("button")) return;
        dragOffset.current = { dx: e.clientX - x, dy: e.clientY - y };
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handleDragMove = (e: PointerEvent<HTMLDivElement>) => {
        if (!dragOffset.current) return;
        const { dx, dy } = dragOffset.current;
        onMove(Math.max(0, e.clientX - dx), Math.max(0, e.clientY - dy));
    };

    const handleDragEnd = () => {
        dragOffset.current = null;
    };

    // insetX/insetY = the chrome that eats into the window before you get
    // to the actual ratio-locked content (e.g. the aquarium image).
    const insetX = contentPaddingX ?? 0;
    const insetY = TITLEBAR_HEIGHT + (contentPaddingY ?? 0);

    const handleResizeStart = (e: PointerEvent<HTMLDivElement>) => {
        resizeStart.current = { clientX: e.clientX, width };
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handleResizeMove = (e: PointerEvent<HTMLDivElement>) => {
        if (!resizeStart.current || !aspectRatio || !onResize) return;
        const delta = e.clientX - resizeStart.current.clientX;

        const maxWindowWidth = window.innerWidth - x - 4;
        const maxWindowHeight = window.innerHeight - y - 4;
        const maxContentHeight = Math.max(40, maxWindowHeight - insetY);
        const maxWidthFromHeight = maxContentHeight * aspectRatio + insetX;
        const maxWidth = Math.max(MIN_RATIO_WIDTH, Math.min(maxWindowWidth, maxWidthFromHeight));

        const newWidth = Math.min(Math.max(resizeStart.current.width + delta, MIN_RATIO_WIDTH), maxWidth);
        const newContentWidth = Math.max(40, newWidth - insetX);
        onResize(newWidth, newContentWidth / aspectRatio + insetY);
    };

    const handleResizeEnd = () => {
        resizeStart.current = null;
    };

    const isFrame = variant === "frame";
    const canDragResize = !!aspectRatio && !!onResize;

    return (
        <div
            className={`desktop-window${isFrame ? " desktop-window--frame" : ""}`}
            style={{
                left: x,
                top: y,
                zIndex: z,
                width,
                height,
                ...(aspectRatio ? { aspectRatio: String(aspectRatio), resize: "none" } : {}),
            }}
            onPointerDown={onFocus}
            role="dialog"
            aria-label={title}
        >
            <div
                className="window-titlebar"
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
            >
                <button className="window-close" onClick={onClose} aria-label={`Close ${title}`}>
                    ×
                </button>
                {onBack && (
                    <button className="window-back" onClick={onBack} aria-label="Back">
                        ‹
                    </button>
                )}
                <span className="window-title">{title}</span>
            </div>

            <div className="window-body">{children}</div>

            {canDragResize && (
                <div
                    className="window-resize-handle"
                    onPointerDown={handleResizeStart}
                    onPointerMove={handleResizeMove}
                    onPointerUp={handleResizeEnd}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}

export default DesktopWindow;
