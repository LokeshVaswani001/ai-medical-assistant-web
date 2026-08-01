import { ButtonHTMLAttributes } from "react";
import "./PrimaryButton.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "danger";
  loading?: boolean;
};

export default function PrimaryButton({ variant = "primary", loading, children, disabled, className, ...rest }: Props) {
  return (
    <button
      className={`pbtn pbtn--${variant} ${className ?? ""}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <span className="pbtn__spinner" /> : children}
    </button>
  );
}
