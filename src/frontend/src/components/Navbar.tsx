import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          Zain <span>Luxury</span>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login" className="login-btn">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

