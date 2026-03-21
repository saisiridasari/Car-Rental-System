import { useEffect, useState } from "react";
import axios from "../api/api";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("cars");

  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

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

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true);

    try {
      const carsRes = await axios.get("/cars");
      setCars(carsRes.data || []);
    } catch (err) {
      console.error(err);
      setCars([]);
    }

    try {
      const driversRes = await axios.get("/drivers");
      setDrivers(driversRes.data || []);
    } catch (err) {
      console.error(err);
      setDrivers([]);
    }

    try {
      const bookingsRes = await axios.get("/bookings");
      setBookings(bookingsRes.data || []);
    } catch (err) {
      console.error(err);
      setBookings([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= ADD CAR =================
  const handleAddCar = async () => {
    const { name, pricePerKm, baseRent, category } = carForm;

    if (!name || !pricePerKm || !baseRent || !category) {
      return alert("Fill all fields");
    }

    try {
      await axios.post("/cars", {
        name,
        pricePerKm: Number(pricePerKm),
        baseRent: Number(baseRent),
        category
      });

      setCarForm({
        name: "",
        pricePerKm: "",
        baseRent: "",
        category: ""
      });

      fetchData();
    } catch (err) {
      alert("Failed to add car");
    }
  };

  // ================= DELETE CAR =================
  const handleDeleteCar = async (id) => {
    if (!window.confirm("Delete this car?")) return;

    try {
      await axios.delete(`/cars/${id}`);
      fetchData();
    } catch (err) {
      alert("Failed to delete car");
    }
  };

  // ================= ADD DRIVER =================
  const handleAddDriver = async () => {
    const { name, phone, licenseNumber } = driverForm;

    if (!name || !phone || !licenseNumber) {
      return alert("Fill all fields");
    }

    try {
      await axios.post("/drivers", {
        name,
        phone,
        licenseNumber
      });

      setDriverForm({
        name: "",
        phone: "",
        licenseNumber: ""
      });

      fetchData();
    } catch (err) {
      alert("Failed to add driver");
    }
  };

  // ================= DELETE DRIVER =================
  const handleDeleteDriver = async (id) => {
    if (!window.confirm("Delete this driver?")) return;

    try {
      await axios.delete(`/drivers/${id}`);
      fetchData();
    } catch (err) {
      alert("Failed to delete driver");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>Admin</h2>

        <button onClick={() => setActiveTab("cars")}>Cars</button>
        <button onClick={() => setActiveTab("drivers")}>Drivers</button>
        <button onClick={() => setActiveTab("bookings")}>Bookings</button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        
        {loading && <p>Loading...</p>}

        {/* ================= CARS ================= */}
        {activeTab === "cars" && (
          <>
            <h2>Cars</h2>

            <div style={styles.form}>
              <input
                placeholder="Name"
                value={carForm.name}
                onChange={(e) =>
                  setCarForm({ ...carForm, name: e.target.value })
                }
              />

              <input
                placeholder="Price/km"
                value={carForm.pricePerKm}
                onChange={(e) =>
                  setCarForm({ ...carForm, pricePerKm: e.target.value })
                }
              />

              <input
                placeholder="Base Rent"
                value={carForm.baseRent}
                onChange={(e) =>
                  setCarForm({ ...carForm, baseRent: e.target.value })
                }
              />

              <select
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

              <button onClick={handleAddCar}>Add</button>
            </div>

            {cars.map((c) => (
              <div key={c._id} style={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>
                    {c.name} ({c.category}) - ₹{c.pricePerKm}/km
                  </span>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDeleteCar(c._id)}
                  >
                    Delete
                  </button>
                </div>
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
                placeholder="Name"
                value={driverForm.name}
                onChange={(e) =>
                  setDriverForm({ ...driverForm, name: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                value={driverForm.phone}
                onChange={(e) =>
                  setDriverForm({ ...driverForm, phone: e.target.value })
                }
              />

              <input
                placeholder="License"
                value={driverForm.licenseNumber}
                onChange={(e) =>
                  setDriverForm({
                    ...driverForm,
                    licenseNumber: e.target.value
                  })
                }
              />

              <button onClick={handleAddDriver}>Add</button>
            </div>

            {drivers.map((d) => (
              <div key={d._id} style={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>
                    {d.name} - {d.phone}
                  </span>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDeleteDriver(d._id)}
                  >
                    Delete
                  </button>
                </div>
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

  content: {
    flex: 1,
    padding: "40px",
    background: "#f5f5f5"
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  card: {
    background: "#fff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px"
  },

  deleteBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default AdminDashboard;