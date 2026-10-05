import { useWindowManager } from "../context/WindowManager";
import type { WindowId } from "../data/windows";
import StickyNote from "./StickyNote";

const base = import.meta.env.BASE_URL;

type RegisteredNavItem = {
    kind: "registered";
    id: WindowId;
    label: string;
    icon: string;
};

type SpawnNavItem = {
    kind: "spawn";
    label: string;
    icon: string;
    width: number;
    height: number;
};

type NavItem = RegisteredNavItem | SpawnNavItem;

const navigationItems: NavItem[] = [
    { kind: "registered", id: "welcome",  label: "Landing",  icon: `${base}icons/landing.ico` },
    { kind: "registered", id: "about",    label: "About",    icon: `${base}icons/about.ico` },
    { kind: "registered", id: "projects", label: "Projects", icon: `${base}icons/projects.ico` },
    { kind: "registered", id: "art",      label: "Art",      icon: `${base}icons/artworks.ico` },
    { kind: "registered", id: "hobbies",  label: "Hobbies",  icon: `${base}icons/hobbies.ico` },
    { kind: "registered", id: "aquarium", label: "Aquarium", icon: `${base}icons/fish.ico` },
    // Opens a brand-new window every time, instead of focusing a single
    // shared instance like the items above.
    { kind: "spawn", label: "Sticky Note", icon: `${base}icons/sticky.ico`, width: 240, height: 220 },
];

function Navbar() {
    const { openIds, openRegistered, openWindow } = useWindowManager();

    const handleOpen = (item: NavItem) => {
        if (item.kind === "registered") {
            openRegistered(item.id);
            return;
        }
        openWindow({
            id: `sticky:${crypto.randomUUID()}`,
            title: "Sticky Note",
            content: <StickyNote />,
            width: item.width,
            height: item.height,
        });
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                {navigationItems.map((item) => {
                    const isActive = item.kind === "registered" && openIds.includes(item.id);
                    return (
                        <button
                            type="button"
                            className={`desktop-shortcut${isActive ? " active" : ""}`}
                            key={item.kind === "registered" ? item.id : item.label}
                            onDoubleClick={() => handleOpen(item)}
                            onKeyDown={(e) => e.key === "Enter" && handleOpen(item)}
                        >
                            <img className="shortcut-icon" src={item.icon} alt="" aria-hidden="true" />
                            <span className="shortcut-label">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export default Navbar;
