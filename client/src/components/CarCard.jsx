// Create a reusable React component to display car details in a card format.
// Accept a car object as a prop and safely handle cases where the car data may be undefined.
// Show the car name, availability status, base rent, and price per kilometer with clean UI styling.
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  if (!car) return null;

  const handleBooking = () => {
    if (car._id) {
      navigate(`/booking/${car._id}`);
    }
  };

  return (
    <div style={styles.card}>
      
      {/* HEADER */}
      <div style={styles.top}>
        <div>
          <h3 style={styles.name}>{car?.name || "Unnamed Car"}</h3>
          <p style={styles.category}>
            {car?.category?.toUpperCase() || "ECONOMY"}
          </p>
        </div>

        <span
          style={{
            ...styles.badge,
            background: car?.available ? "#e6f4ea" : "#fdecea",
            color: car?.available ? "#1e7e34" : "#c82333"
          }}
        >
          {car?.available ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* SPECS */}
      <div style={styles.specs}>
        <span>{car?.seats || 4} Seats</span>
        <span>{car?.fuelType || "Petrol"}</span>
        <span>{car?.transmission || "Manual"}</span>
      </div>

      {/* PRICE */}
      <div style={styles.priceBox}>
        <p style={styles.base}>
          Base ₹{car?.baseRent ?? 0}
        </p>

        <p style={styles.perKm}>
          ₹{car?.pricePerKm ?? 0}/km
        </p>
      </div>

      <div style={styles.divider}></div>

      {/* BUTTON */}
      <button
        style={{
          ...styles.button,
          background: car?.available ? "#000" : "#ccc",
          cursor: car?.available ? "pointer" : "not-allowed"
        }}
        disabled={!car?.available}
        onClick={handleBooking}
      >
        {car?.available ? "Book Now" : "Unavailable"}
      </button>

    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 0.25s ease"
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px"
  },

  name: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600"
  },

  category: {
    fontSize: "12px",
    color: "#888",
    marginTop: "2px"
  },

  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600"
  },

  specs: {
    display: "flex",
    gap: "10px",
    fontSize: "12px",
    color: "#555",
    marginBottom: "12px"
  },

  priceBox: {
    marginBottom: "10px"
  },

  base: {
    margin: "2px 0",
    fontSize: "13px",
    color: "#666"
  },

  perKm: {
    margin: "2px 0",
    fontSize: "17px",
    fontWeight: "700"
  },

  divider: {
    height: "1px",
    background: "#eee",
    margin: "10px 0"
  },

  button: {
    padding: "11px",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    transition: "0.2s"
  }
};

export default CarCard;