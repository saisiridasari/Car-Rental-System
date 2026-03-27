// Create a simple login page with email and password fields.
// Send login request to API and store token and user in localStorage.
// Redirect user based on role (admin or user) after login.
import { useState } from "react";
import axios from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* LEFT IMAGE */}
        <div style={styles.left}>
          <img
            src="https://images.unsplash.com/photo-1493238792000-8113da705763"
            alt="car"
            style={styles.image}
          />

          <div style={styles.leftContent}>
            <h1 style={styles.brand}>DriverNow</h1>
            <p style={styles.tagline}>
              Fast. Reliable. Premium rides.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div style={styles.right}>
          
          <div style={styles.card}>
            
            <h2 style={styles.title}>Welcome Back</h2>
            <p style={styles.subText}>
              Login to continue your journey
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              
              <input
                type="email"
                placeholder="Email"
                style={styles.input}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button style={styles.button}>Login</button>
            </form>

            <p style={styles.footerText}>
              Don't have an account?{" "}
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: "#f5f5f5",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif"
  },

  container: {
    display: "flex",
    width: "90%",
    maxWidth: "1100px",
    height: "80vh",
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)"
  },

  left: {
    flex: 1,
    position: "relative",
    padding: "10px"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "14px"
  },

  leftContent: {
    position: "absolute",
    bottom: "30px",
    left: "30px",
    color: "#fff",
    background: "rgba(0,0,0,0.4)",
    padding: "15px 20px",
    borderRadius: "10px"
  },

  brand: {
    fontSize: "28px",
    marginBottom: "5px"
  },

  tagline: {
    fontSize: "14px",
    color: "#ddd"
  },

  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fafafa"
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  title: {
    marginBottom: "5px",
    fontSize: "24px",
    textAlign: "center"
  },

  subText: {
    marginBottom: "20px",
    color: "#666",
    fontSize: "14px",
    textAlign: "center"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none"
  },

  button: {
    padding: "12px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    marginTop: "10px"
  },

  footerText: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "13px"
  },

  link: {
    color: "#000",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Login;