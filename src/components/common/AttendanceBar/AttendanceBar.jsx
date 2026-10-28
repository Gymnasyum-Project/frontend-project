import "./AttendanceBar.css";

function AttendanceBar({ value = 0, max = 10, showLabel = true }) {
  const filled = Math.max(0, Math.min(value, max));

  return (
    <div
      className="att-bar"
      role="img"
      aria-label={`Hadir ${value} kali dalam 30 hari`}
    >
      <div className="att-bar__segments">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`att-bar__seg ${i < filled ? "att-bar__seg--on" : ""}`}
          />
        ))}
      </div>
      {showLabel && <span className="att-bar__label">{value}x</span>}
    </div>
  );
}

export default AttendanceBar;
