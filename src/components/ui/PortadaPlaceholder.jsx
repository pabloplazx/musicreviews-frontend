export default function PortadaPlaceholder({ className = "", iconSize = "text-4xl" }) {
  return (
    <div className={`bg-input rounded-xl flex items-center justify-center ${className}`}>
      <span className={`text-primary font-heading font-bold ${iconSize}`}>♪</span>
    </div>
  );
}