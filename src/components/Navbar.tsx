import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <a className="site-name" href="/">
            Portfolio
            </a>

            <div className="nav-links">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/art">Art</NavLink>
                <NavLink to="/hobbies">Hobbies</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;