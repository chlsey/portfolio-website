// Purely decorative — a frosted menu bar across the top of the screen,
// styled after the classic macOS menu bar (logo in the top-left corner,
// faint menu labels trailing after it). Nothing here is clickable.
function TopBar() {
    return (
        <header className="top-bar" aria-hidden="true">
            <svg className="top-bar-star" viewBox="0 0 24 24" width="14" height="14">
                <path
                    d="M12 1.5 14.69 8.9 22.5 9.5 16.4 14.4 18.35 22 12 17.8 5.65 22 7.6 14.4 1.5 9.5 9.31 8.9Z"
                    fill="currentColor"
                />
            </svg>
            <nav className="top-bar-menu">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Window</span>
                <span>Help</span>
            </nav>
        </header>
    );
}

export default TopBar;
