// Create a user dashboard component to display booking details.
// Fetch user's bookings from the API when the component loads.
// Show total number of bookings in a summary section.
// Display each booking with car name, price, route, and driver details.
import { useEffect, useState } from "react";
import axios from "../api/api";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/bookings/my");
        setBookings(res.data || []);
      } catch (err) {
        console.error("Booking fetch error:", err);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>My Dashboard</h1>

      {/* SUMMARY */}
      <div style={styles.summary}>
        <div style={styles.statBox}>
          <h3>{bookings.length}</h3>
          <p>Total Bookings</p>
        </div>
      </div>

      {/* BOOKINGS */}
      <div style={styles.grid}>
        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          bookings.map((b) => (
            <div
              key={b._id}
              style={styles.card}
              onClick={() => setSelectedBooking(b)}
            >
              <div style={styles.top}>
                <h3>{b.carId?.name || "Car"}</h3>
                <span style={styles.price}>₹{b.totalPrice}</span>
              </div>

              <p style={styles.route}>
                {b.pickupLocation} → {b.dropLocation}
              </p>

              <div style={styles.driver}>
                Driver: {b.driverId?.name || "N/A"}
              </div>

              <div style={styles.footer}>
                <span style={styles.status}>Confirmed</span>
                <span style={styles.view}>View Details →</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedBooking && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>

            {/* HEADER */}
            <div style={styles.modalHeader}>
              <h2>{selectedBooking.carId?.name}</h2>
              <span
                style={styles.close}
                onClick={() => setSelectedBooking(null)}
              >
                ✕
              </span>
            </div>

            {/* DETAILS */}
            <div style={styles.details}>
              <p>
                <strong>Route:</strong><br />
                {selectedBooking.pickupLocation} → {selectedBooking.dropLocation}
              </p>

              <p>
                <strong>Driver:</strong> {selectedBooking.driverId?.name}
              </p>

              <p>
                <strong>Total:</strong> ₹{selectedBooking.totalPrice}
              </p>
            </div>

            {/* PAYMENT */}
            <div style={styles.paymentBox}>
              <h3 style={{ marginBottom: "10px" }}>Payment</h3>

              <input placeholder="Card Number" style={styles.input} />

              <div style={styles.row}>
                <input placeholder="MM/YY" style={styles.input} />
                <input placeholder="CVV" style={styles.input} />
              </div>

              <button style={styles.payBtn}>
                Pay ₹{selectedBooking.totalPrice}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    background: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif"
  },

  title: {
    marginBottom: "20px"
  },

  summary: {
    marginBottom: "30px"
  },

  statBox: {
    background: "#000",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
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
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "0.2s"
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
  },

  footer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px"
  },

  status: {
    color: "green",
    fontWeight: "bold"
  },

  view: {
    color: "#000"
  },

  /* MODAL */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)"
  },

  modal: {
    width: "400px",
    background: "#fff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px"
  },

  close: {
    cursor: "pointer",
    fontSize: "18px"
  },

  details: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "20px",
    lineHeight: "1.6"
  },

  paymentBox: {
    background: "#fafafa",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #eee"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "10px"
  },

  row: {
    display: "flex",
    gap: "10px"
  },

  payBtn: {
    width: "100%",
    padding: "14px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px"
  }
};

export default Dashboard;