// Create a simple admin dashboard component with tabs for cars, drivers, and bookings.
// Fetch all data (cars, drivers, bookings) from the API on load and store in state.
// Allow adding and deleting cars and drivers with basic form validation.
import { useEffect, useState } from "react";
import axios from "../api/api";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("cars");

  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [search, setSearch] = useState("");

  const [carForm, setCarForm] = useState({
    name: "",
    pricePerKm: "",
    baseRent: "",
    category: ""
  });

  const [driverForm, setDriverForm] = useState({
    name: "",
    phone: "",
    licenseNumber: ""
  });

  /* ================= FETCH ================= */

  const fetchData = async () => {
    try {
      const [c, d, b] = await Promise.all([
        axios.get("/cars"),
        axios.get("/drivers"),
        axios.get("/bookings")
      ]);

      setCars(c.data || []);
      setDrivers(d.data || []);
      setBookings(b.data || []);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
      alert("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= ADD ================= */

  const handleAddCar = async () => {
    try {
      const { name, pricePerKm, baseRent, category } = carForm;

      if (!name || !pricePerKm || !baseRent || !category) {
        return alert("Fill all fields");
      }

      await axios.post("/cars", {
        name,
        pricePerKm: Number(pricePerKm),
        baseRent: Number(baseRent),
        category
      });

      alert("Car added successfully");

      setCarForm({
        name: "",
        pricePerKm: "",
        baseRent: "",
        category: ""
      });

      fetchData();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.error || "Failed to add car");
    }
  };

  const handleAddDriver = async () => {
    try {
      const { name, phone, licenseNumber } = driverForm;

      if (!name || !phone || !licenseNumber) {
        return alert("Fill all fields");
      }

      await axios.post("/drivers", driverForm);

      alert("Driver added successfully");

      setDriverForm({
        name: "",
        phone: "",
        licenseNumber: ""
      });

      fetchData();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.error || "Failed to add driver");
    }
  };

  /* ================= DELETE ================= */

  const handleDeleteCar = async (id) => {
    try {
      if (!window.confirm("Delete car?")) return;

      await axios.delete(`/cars/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleDeleteDriver = async (id) => {
    try {
      if (!window.confirm("Delete driver?")) return;

      await axios.delete(`/drivers/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ================= FILTER ================= */

  const filteredCars = cars.filter((c) =>
    (c?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const filteredDrivers = drivers.filter((d) =>
    (d?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>Admin</h2>

        {["cars", "drivers", "bookings"].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        {/* SEARCH */}
        <input
          placeholder="Search..."
          style={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ================= CARS ================= */}
        {activeTab === "cars" && (
          <>
            <h2>Cars</h2>

            <div style={styles.form}>
              <input
                style={styles.input}
                placeholder="Name"
                value={carForm.name}
                onChange={(e) =>
                  setCarForm({ ...carForm, name: e.target.value })
                }
              />

              <input
                style={styles.input}
                placeholder="Price/km"
                value={carForm.pricePerKm}
                onChange={(e) =>
                  setCarForm({ ...carForm, pricePerKm: e.target.value })
                }
              />

              <input
                style={styles.input}
                placeholder="Base Rent"
                value={carForm.baseRent}
                onChange={(e) =>
                  setCarForm({ ...carForm, baseRent: e.target.value })
                }
              />

              <select
                style={styles.input}
                value={carForm.category}
                onChange={(e) =>
                  setCarForm({ ...carForm, category: e.target.value })
                }
              >
                <option value="">Category</option>
                <option value="economy">Economy</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxury</option>
              </select>

              <button style={styles.addBtn} onClick={handleAddCar}>
                Add Car
              </button>
            </div>

            {filteredCars.map((c) => (
              <div key={c._id} style={styles.card}>
                {c.name} ({c.category}) - ₹{c.pricePerKm}/km

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteCar(c._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </>
        )}

        {/* ================= DRIVERS ================= */}
        {activeTab === "drivers" && (
          <>
            <h2>Drivers</h2>

            <div style={styles.form}>
              <input
                style={styles.input}
                placeholder="Name"
                value={driverForm.name}
                onChange={(e) =>
                  setDriverForm({ ...driverForm, name: e.target.value })
                }
              />

              <input
                style={styles.input}
                placeholder="Phone"
                value={driverForm.phone}
                onChange={(e) =>
                  setDriverForm({ ...driverForm, phone: e.target.value })
                }
              />

              <input
                style={styles.input}
                placeholder="License"
                value={driverForm.licenseNumber}
                onChange={(e) =>
                  setDriverForm({
                    ...driverForm,
                    licenseNumber: e.target.value
                  })
                }
              />

              <button style={styles.addBtn} onClick={handleAddDriver}>
                Add Driver
              </button>
            </div>

            {filteredDrivers.map((d) => (
              <div key={d._id} style={styles.card}>
                {d.name} - {d.phone}

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteDriver(d._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </>
        )}

        {/* ================= BOOKINGS ================= */}
        {activeTab === "bookings" && (
          <>
            <h2>Bookings</h2>

            {bookings.map((b) => (
              <div key={b._id} style={styles.card}>
                {b.userId?.name} → {b.carId?.name} → ₹{b.totalPrice}
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh"
  },
  sidebar: {
    width: "200px",
    background: "#000",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  tab: {
    padding: "10px",
    background: "transparent",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "6px",
    cursor: "pointer"
  },
  activeTab: {
    background: "#fff",
    color: "#000"
  },
  content: {
    flex: 1,
    padding: "30px",
    background: "#f5f5f5"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  addBtn: {
    background: "#000",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    border: "none"
  },
  card: {
    background: "#fff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteBtn: {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px"
  },
  search: {
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  }
};

export default AdminDashboard;