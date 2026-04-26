export default function SelectOrden({ opciones, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-card border border-border text-text font-body text-sm rounded-input px-4 h-10 outline-none cursor-pointer hover:border-primary transition-colors"
    >
      {opciones.map((opcion) => (
        <option key={opcion.value} value={opcion.value}>
          {opcion.label}
        </option>
      ))}
    </select>
  );
}
