// @ts-ignore: no type declarations for CSS module import
import "./SymptomChip.css";

export default function SymptomChip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button type="button" className={`chip ${selected ? "chip--selected" : ""}`} onClick={onToggle}>
      {selected && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }}>
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {label}
    </button>
  );
}
