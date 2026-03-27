// Create a React component for a car booking form that allows users to enter trip details
// such as pickup location, drop location, start date, and end date. Use useState to manage
// form inputs and selected driver ID, and use useEffect to fetch available drivers from the API
// when the component loads. Integrate a DriverSelect component to display and choose a driver.
import { useEffect, useState } from "react";
import axios from "../api/api";
import DriverSelect from "./DriverSelect";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ carId }) => {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [driverId, setDriverId] = useState("");
  const [car, setCar] = useState(null); // ✅ NEW

  const [form, setForm] = useState({
    pickupLocation: "",
    dropLocation: "",
    startDate: "",
    endDate: ""
  });

  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);

  // ✅ Fetch drivers
  useEffect(() => {
    axios.get("/drivers").then((res) => setDrivers(res.data));
  }, []);

  // ✅ Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`/cars/${carId}`);
        setCar(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (carId) fetchCar();
  }, [carId]);

  // ✅ SIMPLE DISTANCE LOGIC
  const calculateDistance = (pickup, drop) => {
    if (!pickup || !drop) return 0;
    return Math.abs(pickup.length - drop.length) + 5;
  };

  // ✅ CALCULATE PRICE USING REAL CAR DATA
  useEffect(() => {
    if (!car) return;

    const dist = calculateDistance(
      form.pickupLocation,
      form.dropLocation
    );

    setDistance(dist);

    const total =
      car.baseRent + dist * car.pricePerKm;

    setPrice(total);
  }, [form.pickupLocation, form.dropLocation, car]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!driverId) return alert("Select a driver");
    if (!form.pickupLocation || !form.dropLocation)
      return alert("Enter locations");

    try {
      await axios.post("/bookings", {
        ...form,
        carId,
        driverId,
        distance,
        totalPrice: price
      });

      alert("Booking Successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Booking failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      
      {/* CAR INFO */}
      {car && (
        <div style={styles.carInfo}>
          <h3>{car.name}</h3>
          <p>Base Rent: ₹{car.baseRent}</p>
          <p>₹{car.pricePerKm}/km</p>
        </div>
      )}

      {/* TRIP */}
      <div style={styles.section}>
        <h3 style={styles.heading}>Trip Details</h3>

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

        <div style={styles.row}>
          <input
            type="date"
            style={styles.input}
            min={new Date().toISOString().split("T")[0]}
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
        </div>
      </div>

      {/* DRIVER */}
      <div style={styles.section}>
        <h3 style={styles.heading}>Select Driver</h3>
        <DriverSelect drivers={drivers} setDriverId={setDriverId} />
      </div>

      {/* SUMMARY */}
      <div style={styles.summary}>
        <p>Distance: <strong>{distance} km</strong></p>
        <p>Base Rent: ₹{car?.baseRent || 0}</p>
        <p>Per Km: ₹{car?.pricePerKm || 0}</p>
        <hr />
        <p style={{ fontWeight: "bold" }}>
          Total Price: ₹{price}
        </p>
      </div>

      <button style={styles.button}>
        Confirm Booking
      </button>

    </form>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  carInfo: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #eee"
  },

  section: {
    background: "#fafafa",
    padding: "15px",
    borderRadius: "10px"
  },

  heading: {
    marginBottom: "10px",
    fontSize: "16px"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    marginBottom: "10px"
  },

  row: {
    display: "flex",
    gap: "10px"
  },

  summary: {
    background: "#f5f5f5",
    padding: "15px",
    borderRadius: "10px",
    fontSize: "14px"
  },

  button: {
    padding: "14px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px"
  }
};

export default BookingForm;