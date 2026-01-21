import welcomeVideo from "../assets/welcome.mp4";

export default function Homepage() {
  const text = "Welcome";
  const animate = true;

  return (
    <section id="home" className="home">
      <div className="homeMedia">
        <video
          className="homeVideo"
          src={welcomeVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <h2 className={`welcomeOverlay ${animate ? "welcomeOverlay--animate" : ""}`}>
  {text}
</h2>
      </div>
    </section>
  );
}