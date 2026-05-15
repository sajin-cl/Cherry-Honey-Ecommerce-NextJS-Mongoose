"use client";

export default function Checkbox({ id, label, count, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between cursor-pointer group py-1"
    >
      <div className="flex items-center gap-3">
        {/* Custom checkbox box */}
        <div
          onClick={() => onChange(!checked)}
          className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${
            checked
              ? "bg-[#C8A84B] border-[#C8A84B]"
              : "bg-transparent border-gray-600 group-hover:border-gray-400"
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors select-none">
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500 ml-2">({count})</span>
      )}
    </label>
  );
}
