export default function Header({ mode }) {
  return (
    <header
      className={`siteHeader ${
        mode === "dark" ? "siteHeader--dark" : "siteHeader--light"
      }`}
    >
      <nav className="siteNav">
        <h1 className="siteTitle">Henry Hutcheson</h1>

        <ul className="siteLinks">
          <li>
            <a href="#home">Homepage</a>
          </li>
          <li>
            <a href="#introduction">Introduction</a>
          </li>
          <li>
            <a href="#cards">Cards</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}