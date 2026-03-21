import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  if (!car) return null; // ✅ safety

  const handleBooking = () => {
    if (car._id) {
      navigate(`/booking/${car._id}`);
    }
  };

  return (
    <div style={styles.card}>
      
      <div style={styles.top}>
        <h3 style={styles.name}>{car?.name || "Unnamed Car"}</h3>

        <span
          style={{
            ...styles.badge,
            background: car?.available ? "#d4edda" : "#f8d7da",
            color: car?.available ? "#155724" : "#721c24"
          }}
        >
          {car?.available ? "Available" : "Not Available"}
        </span>
      </div>

      <div style={styles.priceBox}>
        <p style={styles.base}>
          Base Rent: ₹{car?.baseRent ?? 0}
        </p>
        <p style={styles.perKm}>
          ₹{car?.pricePerKm ?? 0}/km
        </p>
      </div>

      <div style={styles.divider}></div>

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
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "0.3s",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },
  name: {
    margin: 0,
    fontSize: "18px"
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold"
  },
  priceBox: {
    marginBottom: "15px"
  },
  base: {
    margin: "5px 0",
    fontSize: "14px",
    color: "#555"
  },
  perKm: {
    margin: "5px 0",
    fontSize: "16px",
    fontWeight: "bold"
  },
  divider: {
    height: "1px",
    background: "#eee",
    margin: "10px 0"
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px"
  }
};

export default CarCard;