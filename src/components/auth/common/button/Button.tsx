import clsx from "clsx";
import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}>;

function Button({ children, variant = "primary", className, onClick }: ButtonProps) {
  const baseStyles = "text-white font-bold py-2 px-4 focus:outline-none";
  const variantStyles = {
    primary: "bg-black hover:bg-slate-800 rounded-full",
    secondary: "bg-blue-500 hover:bg-blue-700 rounded-lg",
  };
  return (
    <button onClick={onClick} className={clsx(baseStyles, variantStyles[variant], className)}>
      {children}
    </button>
  );
}

export default Button;
