// El spread {...rest} propaga al <input> cualquier prop estándar (value, onChange,
// name, autoComplete, required, etc). Sin esto, los formularios controlados no
// funcionaban: las letras aparecían visualmente pero el estado React quedaba a "".
export default function FormInput({ label, type = "text", placeholder, id, error = false, ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-text font-body text-sm">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full h-12 px-4 rounded-input bg-input font-body text-sm text-text placeholder:text-muted outline-none transition-colors
          ${error
            ? "border border-error focus:border-error"
            : "border border-border focus:border-primary"
          }`}
        {...rest}
      />
    </div>
  );
}
