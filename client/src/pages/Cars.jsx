// Create a cars listing page that fetches car data from the API on load.
// Add a search input to filter cars by name.
// Group cars by category (economy, sedan, suv, luxury) for better display.
// Show loading and empty states when needed.
import { useEffect, useState } from "react";
import axios from "../api/api";
import CarCard from "../components/CarCard";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
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

  // FILTER
  const filteredCars = cars.filter((car) => {
    const name = car?.name || "";
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || car?.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // GROUP
  const groupedCars = {
    economy: [],
    sedan: [],
    suv: [],
    luxury: []
  };

  filteredCars.forEach((car) => {
    const category = car?.category || "economy";
    if (groupedCars[category]) {
      groupedCars[category].push(car);
    }
  });

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Explore Cars</h1>
        <p style={styles.subtitle}>
          Find the perfect ride for your journey
        </p>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search cars..."
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY FILTER */}
      <div style={styles.filterBar}>
        {["all", "economy", "sedan", "suv", "luxury"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              ...styles.filterBtn,
              background: activeCategory === cat ? "#000" : "#fff",
              color: activeCategory === cat ? "#fff" : "#000"
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <p style={styles.center}>Loading cars...</p>
      ) : filteredCars.length === 0 ? (
        <p style={styles.center}>No cars found</p>
      ) : (
        Object.keys(groupedCars).map((category) => {
          if (groupedCars[category].length === 0) return null;

          return (
            <div key={category}>
              
              <h2 style={styles.categoryTitle}>
                {category.toUpperCase()}
              </h2>

              <div style={styles.grid}>
                {groupedCars[category].map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>

            </div>
          );
        })
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
    marginBottom: "20px"
  },

  title: {
    fontSize: "34px",
    marginBottom: "8px"
  },

  subtitle: {
    color: "#666",
    fontSize: "15px"
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },

  searchInput: {
    width: "320px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

  filterBar: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px"
  },

  filterBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #000",
    cursor: "pointer",
    fontSize: "13px"
  },

  categoryTitle: {
    margin: "30px 0 15px",
    fontSize: "20px"
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