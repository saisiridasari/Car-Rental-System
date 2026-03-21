import { useEffect, useState } from "react";
import axios from "../api/api";
import DriverSelect from "./DriverSelect";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ carId }) => {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    pickupLocation: "",
    dropLocation: "",
    startDate: "",
    endDate: ""
  });

  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    axios.get("/drivers").then((res) => setDrivers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!driverId) {
      return alert("Select a driver");
    }

    try {
      await axios.post("/bookings", {
        ...form,
        carId,
        driverId
      });

      alert("Booking Successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Booking failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      
      <input
        placeholder="Pickup Location"
        style={styles.input}
        onChange={(e) =>
          setForm({ ...form, pickupLocation: e.target.value })
        }
      />

      <input
        placeholder="Drop Location"
        style={styles.input}
        onChange={(e) =>
          setForm({ ...form, dropLocation: e.target.value })
        }
      />

      <input
        type="date"
        style={styles.input}
        onChange={(e) =>
          setForm({ ...form, startDate: e.target.value })
        }
      />

      <input
        type="date"
        style={styles.input}
        onChange={(e) =>
          setForm({ ...form, endDate: e.target.value })
        }
      />

      <DriverSelect drivers={drivers} setDriverId={setDriverId} />

      <button style={styles.button}>Confirm Booking</button>

    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "12px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default BookingForm;