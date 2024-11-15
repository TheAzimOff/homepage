export type Size = "sm" | "md" | "lg";
export type Variant = "primary" | "secondary" | "ghost" | "danger";
export type InputType = "text" | "email" | "password" | "number";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  size?: Size;
  label: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  size?: Size;
  helperText?: string;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
}
