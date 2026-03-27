// Create a simple home page with a hero section and features section.
// Show a heading, short description, and a button to navigate to cars page.
// Display basic feature cards like pricing, drivers, and car options.
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* LEFT IMAGE */}
        <div style={styles.left}>
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            alt="car"
            style={styles.image}
          />

          <div style={styles.leftContent}>
            <h1 style={styles.brand}>DriverNow</h1>
            <p style={styles.tagline}>
              Premium car rentals with professional drivers
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          
          {!user ? (
            // ================= REGISTER FORM =================
            <div style={styles.formCard}>
              
              <h2 style={styles.heading}>Create Account</h2>
              <p style={styles.subText}>
                Start your journey in seconds
              </p>

              <form onSubmit={handleSubmit} style={styles.form}>
                
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  style={styles.input}
                  value={form.name}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  style={styles.input}
                  value={form.email}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={styles.input}
                  value={form.password}
                  onChange={handleChange}
                />

                <button type="submit" style={styles.button}>
                  Create Account
                </button>

              </form>

              <p style={styles.loginText}>
                Already have an account?{" "}
                <Link to="/login" style={styles.loginLink}>
                  Login
                </Link>
              </p>

            </div>
          ) : (
            // ================= ABOUT PAGE =================
            <div style={styles.aboutCard}>
              
              <h2 style={styles.heading}>Welcome to DriverNow</h2>

              <p style={styles.aboutText}>
                DriverNow is a modern car rental platform designed to provide
                seamless and affordable travel experiences. Whether you need a
                quick city ride or a long-distance journey, we offer a wide
                range of vehicles with professional drivers.
              </p>

              <div style={styles.features}>
                <p>✔ Wide range of cars (Economy → Luxury)</p>
                <p>✔ Transparent pricing</p>
                <p>✔ Verified drivers</p>
                <p>✔ Easy booking system</p>
              </div>

              <Link to="/cars" style={styles.button}>
                Explore Cars
              </Link>

            </div>
          )}

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

  formCard: {
    width: "320px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  aboutCard: {
    width: "350px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  heading: {
    fontSize: "24px",
    marginBottom: "10px"
  },

  subText: {
    color: "#666",
    marginBottom: "20px",
    fontSize: "14px"
  },

  aboutText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
    lineHeight: "1.6"
  },

  features: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#444"
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
    fontSize: "14px"
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#000",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center"
  },

  loginText: {
    marginTop: "15px",
    fontSize: "13px",
    textAlign: "center"
  },

  loginLink: {
    color: "#000",
    fontWeight: "bold",
    textDecoration: "none"
  }
};

export default Home;