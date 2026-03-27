// Create a simple navbar component with navigation links.
// Show different links based on whether the user is logged in and their role.
// Get user data from localStorage and handle logout by clearing storage and redirecting.
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.wrapper}>
      <div style={styles.navbar}>
        
        {/* LOGO */}
        <div style={styles.logoBox}>
          <span style={styles.logoMain}>Driver</span>
          <span style={styles.logoAccent}>Now</span>
        </div>

        {/* LINKS */}
        <div style={styles.links}>
          <Link to="/" style={isActive("/") ? styles.activeLink : styles.link}>
            Home
          </Link>

          <Link to="/cars" style={isActive("/cars") ? styles.activeLink : styles.link}>
            Cars
          </Link>

          {user?.role === "user" && (
            <Link to="/dashboard" style={isActive("/dashboard") ? styles.activeLink : styles.link}>
              Dashboard
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" style={isActive("/admin") ? styles.activeLink : styles.link}>
              Admin
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.actions}>
          {!user ? (
            <>
              <Link to="/login" style={styles.loginBtn}>
                Login
              </Link>

              <Link to="/register" style={styles.primaryBtn}>
                Get Started
              </Link>
            </>
          ) : (
            <button onClick={logout} style={styles.primaryBtn}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.8)",
    borderBottom: "1px solid rgba(0,0,0,0.05)"
  },

  navbar: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px"
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    fontSize: "26px",
    fontWeight: "700",
    cursor: "pointer"
  },

  logoMain: {
    color: "#000"
  },

  logoAccent: {
    color: "#777",
    fontWeight: "500"
  },

  links: {
    display: "flex",
    gap: "28px",
    alignItems: "center"
  },

  link: {
    textDecoration: "none",
    color: "#555",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.2s ease"
  },

  activeLink: {
    textDecoration: "none",
    color: "#000",
    fontSize: "16px",
    fontWeight: "600",
    position: "relative"
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  loginBtn: {
    textDecoration: "none",
    color: "#000",
    fontSize: "15px",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "0.2s"
  },

  primaryBtn: {
    textDecoration: "none",
    background: "#000",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "999px",
    fontSize: "15px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  }
};

export default Navbar;