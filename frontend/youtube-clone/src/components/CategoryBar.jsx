export default function CategoryBar({ selected, onSelect }) {
  const categories = [
    "All",
    "Web Development",
    "JavaScript",
    "CSS",
    "Backend Development",
    "Databases",
    "Tools"
  ];

  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-btn ${selected === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
