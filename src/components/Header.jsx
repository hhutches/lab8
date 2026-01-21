export default function Header() {
  const siteTitle = "Henry Hutcheson";

  const links = [
    { label: "HOMEPAGE ✅", href: "#home" },
    { label: "Intro", href: "#intro" },
    { label: "Cards", href: "#cards" },
  ];

  const isSticky = true;
  const headerClass = `header ${isSticky ? "header--sticky" : ""}`;

  return (
    <header className={headerClass}>
      <div className="headerRow">
        <div className="brand">{siteTitle}</div>

        <nav className="nav">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="navLink">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}