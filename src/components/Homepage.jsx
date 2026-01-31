import welcomeVideo from "../assets/welcome.mp4";
import welcomeVideoDark from "../assets/welcome2.mp4";

export default function Homepage({ mode }) {
  const text = "Welcome";
  const animate = true;

  return (
    <section id="home" className="home">
      <div className="homeMedia">
        <video
          key={mode} // 🔑 forces reload when mode changes
          className="homeVideo"
          src={mode === "dark" ? welcomeVideoDark : welcomeVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <h2
          className={`welcomeOverlay ${
            animate ? "welcomeOverlay--animate" : ""
          }`}
        >
          {text}
        </h2>
      </div>
    </section>
  );
}