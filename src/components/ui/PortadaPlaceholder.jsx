export default function PortadaPlaceholder({ className = "" }) {
  return (
    <div className={`bg-input rounded-xl flex items-center justify-center ${className}`}>
      <span className="text-primary font-heading font-bold text-4xl">♪</span>
    </div>
  );
}