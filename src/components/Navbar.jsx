import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useCart } from "../context/CartContext";
import "./Navbar.css";
export default function NavbarComponent() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  // Watch Firebase Auth state (only verified users)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        setUser(currentUser.emailVerified ? currentUser : null);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  const handleLogout = () => {
    signOut(auth).catch((err) =>
      console.error("Error signing out:", err)
    );
  }
  return (
    <header className="nav-wrapper">
      <nav className="nav-glass" aria-label="Primary">
        {/* LEFT: Logo */}
        <div className="nav-left">
          <Link to="/" className="nav-logo" aria-label="ELCS Home">
            <img
              src="/images/ELCS_final_logo.png"
              alt="ELCS Logo"
              style={{ height: "55px", width: "auto", borderRadius: "10px" }}
            />
          </Link>
        </div>
        {/* CENTER: Desktop Links */}
        <ul className="nav-links-desktop">
          <li>
            <Link to="/ittalk" className="nav-link">IT Talk</Link>
          </li>
          <li>
            <Link to="/progress" className="nav-link">Progress</Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          ) : (
            <>
              <li className="text-white">{user.email}</li>
              <li>
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-warning"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        {/* RIGHT: Cart + Products + Hamburger */}
        <div className="nav-right">
          <Link to="/cart" className="cart-icon" aria-label="Cart">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
          <Link to="/products" className="btn-primary desktop-only">
            Products
          </Link>
          {/* Mobile Toggle */}
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {/* MOBILE DROPDOWN */}
        <ul className={`nav-links-mobile ${open ? "is-open" : ""}`}>
          <li>
            <Link to="/ittalk" className="mobile-item">IT Talk</Link>
          </li>

          <li>
            <Link to="/progress" className="mobile-item">Progress</Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login" className="mobile-item">Login</Link>
            </li>
          ) : (
            <>
              <li className="mobile-auth">
                <span className="mobile-item">Hi, {user.email}</span>
              </li>
              <li>
                <Link to="/profile" className="mobile-item">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          <li>
            <Link to="/products" className="btn-primary btn-block">
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}