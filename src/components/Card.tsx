import { CSSProperties, ReactNode } from "react";

export default function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)",
        padding: "var(--sp-md)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
