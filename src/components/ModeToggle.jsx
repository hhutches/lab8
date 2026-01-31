export default function ModeToggle({ mode, setMode }) {
  const isDark = mode === "dark";

  return (
    <div className="modeToggleWrap" role="group" aria-label="Theme toggle">
      <button
        type="button"
        className={`modeHalf modeHalf--light ${!isDark ? "modeHalf--active" : ""}`}
        onClick={() => setMode("light")}
        aria-pressed={!isDark}
      >
        Light
      </button>

      <button
        type="button"
        className={`modeHalf modeHalf--dark ${isDark ? "modeHalf--active" : ""}`}
        onClick={() => setMode("dark")}
        aria-pressed={isDark}
      >
        Dark
      </button>
    </div>
  );
}