// Create a booking page component that gets the car ID from the URL.
// Display a simple layout with booking information on the left.
// Show the booking form on the right and pass the car ID to it.
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/api";
import BookingForm from "../components/BookingForm";

const Booking = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`/cars/${carId}`);
        setCar(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCar();
  }, [carId]);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>

        {/* LEFT SIDE */}
        <div style={styles.left}>
          
          <h2 style={styles.heading}>Confirm Your Ride</h2>

          {/* CLICKABLE CARD */}
          <div
            style={styles.card}
            onClick={() => setShowModal(true)}
          >
            <h3>{car?.name || "Loading..."}</h3>
            <p style={styles.sub}>
              ₹{car?.pricePerKm || 0}/km • Base ₹{car?.baseRent || 0}
            </p>

            <div style={styles.specs}>
              <span>{car?.seats || 4} Seats</span>
              <span>{car?.fuelType || "Petrol"}</span>
              <span>{car?.transmission || "Manual"}</span>
            </div>

            <p style={styles.viewMore}>Click to view details →</p>
          </div>

          {/* TRIP INFO */}
          <div style={styles.tripBox}>
            <p>✔ Choose pickup & drop</p>
            <p>✔ Select driver</p>
            <p>✔ Auto price calculation</p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          <BookingForm carId={carId} car={car} />
        </div>

      </div>

      {/* 🔥 MODAL POPUP */}
      {showModal && (
        <div style={styles.overlay} onClick={() => setShowModal(false)}>
          
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{car?.name}</h2>

            <p style={styles.modalText}>
              Price: ₹{car?.pricePerKm}/km
            </p>
            <p style={styles.modalText}>
              Base Rent: ₹{car?.baseRent}
            </p>

            <div style={styles.specs}>
              <span>{car?.seats || 4} Seats</span>
              <span>{car?.fuelType || "Petrol"}</span>
              <span>{car?.transmission || "Manual"}</span>
            </div>

            <button
              style={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px"
  },

  wrapper: {
    display: "flex",
    gap: "40px",
    width: "100%",
    maxWidth: "1100px",
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
  },

  left: { flex: 1 },
  right: { width: "380px" },

  heading: { marginBottom: "20px" },

  card: {
    background: "#fafafa",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "0.2s"
  },

  sub: {
    color: "#666",
    fontSize: "14px"
  },

  specs: {
    display: "flex",
    gap: "10px",
    fontSize: "13px",
    marginTop: "10px"
  },

  viewMore: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#888"
  },

  tripBox: {
    fontSize: "14px",
    color: "#444",
    lineHeight: "1.8"
  },

  /* MODAL */
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  modal: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    textAlign: "center"
  },

  modalText: {
    fontSize: "14px",
    margin: "5px 0"
  },

  closeBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    background: "#000",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Booking;