export default function Introduction() {
  const name = "Henry Hutcheson";
  const bio =
    "I’m learning React by building small components and making the UI dynamic with JSX expressions.";
  const email = "hhutches@purdue.brightspace.com";

  const showContact = true;

  return (
    <section id="intro" className="intro">
      <h2>Introduction</h2>

      <p>
        Hey! I’m <strong>{name}</strong>. {bio}
      </p>

      {showContact && (
        <p>
          Contact: <a href={`mailto:${email}`}>{email}</a>
        </p>
      )}
    </section>
  );
}