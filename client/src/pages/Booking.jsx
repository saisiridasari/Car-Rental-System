import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

const Booking = () => {
  const { carId } = useParams();

  return (
    <div style={styles.container}>
      
      <div style={styles.wrapper}>
        
        {/* Left Info */}
        <div style={styles.info}>
          <h1>Complete Your Booking</h1>
          <p>Select driver and trip details to confirm your ride.</p>
        </div>

        {/* Right Form */}
        <div style={styles.formBox}>
          <BookingForm carId={carId} />
        </div>

      </div>

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
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  info: {
    maxWidth: "300px"
  },
  formBox: {
    width: "350px"
  }
};

export default Booking;