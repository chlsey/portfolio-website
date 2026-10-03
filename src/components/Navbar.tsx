import { NavLink } from "react-router-dom";

const navigationItems = [
    { to: "/about", label: "About", icon: "/fish/fish-1.png" },
    { to: "/projects", label: "Projects", icon: "/fish/fish-1.png" },
    { to: "/art", label: "Art", icon: "/fish/fish-1.png" },
    { to: "/hobbies", label: "Hobbies", icon: "/fish/fish-1.png" },
];

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink className="site-name" to="/">
                Portfolio
            </NavLink>

            <div className="nav-links">
                {navigationItems.map(({ to, label, icon }) => (
                    <NavLink className="desktop-shortcut" key={to} to={to}>
                        <img className="shortcut-icon" src={icon} alt="" aria-hidden="true" />
                        <span className="shortcut-label">{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
