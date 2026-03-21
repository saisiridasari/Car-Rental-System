import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>CarRental</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cars" style={styles.link}>Cars</Link>

        {user && user.role === "user" && (
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin" style={styles.link}>Admin</Link>
        )}

        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.button}>Register</Link>
          </>
        ) : (
          <button onClick={logout} style={styles.button}>Logout</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid #eee",
    background: "#fff"
  },
  logo: { margin: 0 },
  links: { display: "flex", gap: "15px", alignItems: "center" },
  link: { textDecoration: "none", color: "#000" },
  button: {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Navbar;