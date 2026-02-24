import "./ModeToggle.css";

function ModeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="mode-wrapper">
      <span className="mode-text">Mode:</span>

      <div
        className={`toggle ${darkMode ? "active" : ""}`}
        onClick={() => setDarkMode(!darkMode)}
      >
        <div className="circle">
          {darkMode ? "🌙" : "☀"}
        </div>
      </div>
    </div>
  );
}

export default ModeToggle;
