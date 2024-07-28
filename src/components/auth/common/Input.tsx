import { useId } from "react";

interface InputProps {
  variant?: "default" | "underline";
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const variantStyles = {
  default:
    "border border-[#808080] rounded-lg px-[16px] py-[8px] text-[16px] focus:outline-none focus:border-gray-950 transition",
  underline:
    "border-b border-[#808080] px-[16px] py-[8px] text-[16px] focus:outline-none focus:border-gray-950 transition",
};

function Input({ name, label, variant = "default", type = "text", value, placeholder, onChange }: InputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col">
      {label && (
        <label className="ml-1 mb-[10px] font-bold" htmlFor={inputId}>
          {label}
        </label>
      )}
      {(type === "text" || type === "password") && (
        <input
          className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {type === "file" && (
        <input type="file" className={`${variantStyles[variant]}`} placeholder={placeholder} onChange={onChange} />
      )}
    </div>
  );
}

export default Input;
