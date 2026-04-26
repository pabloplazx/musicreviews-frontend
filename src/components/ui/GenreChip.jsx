export default function GenreChip({ label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-body text-sm transition-colors ${
        active
          ? "bg-primary text-background"
          : "bg-card border border-border text-text hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}
