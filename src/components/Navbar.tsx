import { NavLink } from "react-router-dom";

const fishIcon = `${import.meta.env.BASE_URL}fish/fish-1.png`;

const navigationItems = [
  { to: "/about", label: "About", icon: fishIcon },
  { to: "/projects", label: "Projects", icon: fishIcon },
  { to: "/art", label: "Art", icon: fishIcon },
  { to: "/hobbies", label: "Hobbies", icon: fishIcon },
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
