import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heading}>
          Rent Cars Anytime, Anywhere
        </h1>

        <p style={styles.subText}>
          Choose from a wide range of cars with professional drivers at the best price.
        </p>

        <Link to="/cars" style={styles.ctaButton}>
          Browse Cars
        </Link>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        
        <div style={styles.card}>
          <h3>Wide Range</h3>
          <p>Choose from economy to luxury cars.</p>
        </div>

        <div style={styles.card}>
          <h3>Affordable Pricing</h3>
          <p>Transparent pricing with no hidden costs.</p>
        </div>

        <div style={styles.card}>
          <h3>Verified Drivers</h3>
          <p>Professional and licensed drivers.</p>
        </div>

      </div>

    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "#ffffff",
    minHeight: "100vh",
    color: "#000"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #eee"
  },

  logo: {
    margin: 0
  },

  navLink: {
    marginRight: "20px",
    textDecoration: "none",
    color: "#000"
  },

  navButton: {
    textDecoration: "none",
    background: "#000",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px"
  },

  hero: {
    textAlign: "center",
    padding: "80px 20px"
  },

  heading: {
    fontSize: "40px",
    marginBottom: "20px"
  },

  subText: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px"
  },

  ctaButton: {
    textDecoration: "none",
    background: "#000",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px"
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "40px"
  },

  card: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    width: "250px",
    textAlign: "center"
  }
};

export default Home;