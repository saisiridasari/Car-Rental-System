const DriverSelect = ({ drivers, setDriverId }) => {
  return (
    <select
      style={styles.select}
      onChange={(e) => setDriverId(e.target.value)}
    >
      <option value="">Select Driver</option>

      {drivers.map((d) => (
        <option key={d._id} value={d._id}>
          {d.name} ({d.phone})
        </option>
      ))}
    </select>
  );
};

const styles = {
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px"
  }
};

export default DriverSelect;