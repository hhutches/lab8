import styles from "./Card.module.css";

export default function Card({
  title,
  description,
  image,
  isSelected,
  isSpinning,
  onClick,
  mode,
}) {
  const outerClass = [
    styles.card,
    mode === "dark" ? styles.dark : styles.light,
    isSelected ? styles.selected : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Spin inner wrapper so hover translate doesn't fight rotate
  const innerClass = [styles.inner, isSpinning ? styles.spin : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={outerClass}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <div className={innerClass}>
        <img className={styles.img} src={image} alt={title} />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
      </div>
    </article>
  );
}