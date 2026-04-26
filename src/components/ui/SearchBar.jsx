export default function SearchBar({ placeholder = "Buscar...", value, onChange }) {
  return (
    <div className="flex items-center gap-3 w-full bg-input border border-border rounded-xl px-4 h-12 focus-within:border-primary transition-colors">
      <svg className="w-4 h-4 text-muted shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-muted outline-none"
      />
    </div>
  );
}
