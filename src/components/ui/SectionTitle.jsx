export default function SectionTitle({ children }) {
  return (
    <div className="mb-6">
      <h2 className="text-text font-heading font-bold text-2xl">{children}</h2>
      <div className="w-8 h-1 bg-primary mt-2" />
    </div>
  );
}