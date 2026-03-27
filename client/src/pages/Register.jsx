// Create a simple registration page with name, email, and password fields.
// Send register request to API and store token and user in localStorage.
// Redirect user to dashboard after successful registration.
import { useState } from "react";
import axios from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <input
            type="text"
            placeholder="Full Name"
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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

          <button style={styles.button}>Register</button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};
// Show basic form UI with a link to login page.
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
  },

  title: {
    marginBottom: "20px",
    textAlign: "center"
  },

  form: {
    display: "flex",
    flexDirection: "column"
  },

  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  button: {
    padding: "12px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },

  footerText: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px"
  },

  link: {
    color: "#000",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Register;