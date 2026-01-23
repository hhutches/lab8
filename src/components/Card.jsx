// components/Card.jsx
export default function Card({
  title,
  description,
  image,
  featured,
  isSelected,
  isSpinning,
  onClick,
}) {
  const cardClass = [
    "card",
    featured ? "card--featured" : "",
    isSpinning ? "card--spin" : "",
    isSelected ? "card--selected" : "",
  ].join(" ");

  return (
    <article
      className={cardClass}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <img className="cardImg" src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}