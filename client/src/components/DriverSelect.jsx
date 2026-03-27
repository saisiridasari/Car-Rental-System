// Create a reusable React component for selecting a driver from a dropdown list.
// Accept a list of drivers and a setter function as props to update the selected driver ID.
// Render a select input with a default "Select Driver" option.
// Create a reusable React component for selecting a driver from a dropdown list.
// Accept a list of drivers and a setter function as props to update the selected driver ID.
// Render a select input with a default "Select Driver" option.
import { useState, useEffect } from "react";
import axios from "../api/api";

const DriverSelect = ({ setDriverId }) => {
  const [drivers, setDrivers] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("/drivers");

      // ✅ only available drivers
      const available = res.data.filter((d) => d.available === true);

      setDrivers(available);
    } catch (err) {
      console.error("Driver fetch error:", err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    setDriverId(value);
  };

  return (
    <div style={styles.container}>
      
      <label style={styles.label}>Select Driver</label>

      <select
        value={selected}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">-- Choose Driver --</option>

        {drivers.map((driver) => (
          <option key={driver._id} value={driver._id}>
            {driver.name} ({driver.phone})
          </option>
        ))}
      </select>

      {drivers.length === 0 && (
        <p style={styles.empty}>No drivers available</p>
      )}

    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    background: "#fff"
  },
  empty: {
    textAlign: "center",
    color: "#666"
  }
};

export default DriverSelect;