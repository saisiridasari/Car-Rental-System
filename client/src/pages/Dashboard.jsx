import { useEffect, useState } from "react";
import axios from "../api/api";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings/my").then((res) => setBookings(res.data));
  }, []);

  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>My Dashboard</h1>

      <div style={styles.summary}>
        <div style={styles.statBox}>
          <h3>{bookings.length}</h3>
          <p>Total Bookings</p>
        </div>
      </div>

      <div style={styles.grid}>
        {bookings.map((b) => (
          <div key={b._id} style={styles.card}>
            
            <div style={styles.top}>
              <h3>{b.carId.name}</h3>
              <span style={styles.price}>₹{b.totalPrice}</span>
            </div>

            <p style={styles.route}>
              {b.pickupLocation} → {b.dropLocation}
            </p>

            <div style={styles.driver}>
              Driver: {b.driverId.name}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    background: "#f5f5f5",
    minHeight: "100vh"
  },
  title: {
    marginBottom: "20px"
  },
  summary: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },
  statBox: {
    background: "#000",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "200px",
    textAlign: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
    gap: "20px"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
  },
  top: {
    display: "flex",
    justifyContent: "space-between"
  },
  price: {
    fontWeight: "bold"
  },
  route: {
    margin: "10px 0",
    color: "#555"
  },
  driver: {
    fontSize: "14px"
  }
};

export default Dashboard;