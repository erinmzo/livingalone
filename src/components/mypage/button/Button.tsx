import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  variant?: "primary" | "secondary";
}>;

function Button({ children, variant = "primary" }: ButtonProps) {
  const baseStyles = "text-white font-bold py-2 px-4 focus:outline-none";
  const variantStyles = {
    primary: "bg-black hover:bg-slate-800 rounded-full",
    secondary: "bg-blue-500 hover:bg-blue-700 rounded",
  };
  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </button>
  );
}

export default Button;
