import { useEffect, useState } from "react";
import axios from "../api/api";
import CarCard from "../components/CarCard";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("/cars");
        setCars(res.data || []);
      } catch (err) {
        console.error(err);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ✅ FILTER
  const filteredCars = cars.filter((car) => {
    const name = car?.name || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  // ✅ GROUP BY CATEGORY
  const groupedCars = {
    economy: [],
    sedan: [],
    suv: [],
    luxury: []
  };

  filteredCars.forEach((car) => {
    const category = car?.category || "economy"; // fallback
    if (groupedCars[category]) {
      groupedCars[category].push(car);
    }
  });

  return (
    <div style={styles.container}>
      
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Find Your Perfect Ride</h1>
        <p style={styles.subtitle}>
          Choose from a wide range of cars with flexible pricing
        </p>
      </div>

      {/* Search */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search cars..."
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Content */}
      {loading ? (
        <p style={styles.center}>Loading cars...</p>
      ) : filteredCars.length === 0 ? (
        <p style={styles.center}>No cars found</p>
      ) : (
        <>
          {Object.keys(groupedCars).map((category) => {
            if (groupedCars[category].length === 0) return null;

            return (
              <div key={category}>
                
                {/* Category Title */}
                <h2 style={styles.categoryTitle}>
                  {category.toUpperCase()}
                </h2>

                {/* Cars Grid */}
                <div style={styles.grid}>
                  {groupedCars[category].map((car) => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>

              </div>
            );
          })}
        </>
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

  header: {
    textAlign: "center",
    marginBottom: "30px"
  },

  title: {
    fontSize: "32px",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#666",
    fontSize: "16px"
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px"
  },

  searchInput: {
    width: "300px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  categoryTitle: {
    margin: "30px 0 15px 0",
    fontSize: "22px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },

  center: {
    textAlign: "center",
    marginTop: "40px",
    color: "#555"
  }
};

export default Cars;