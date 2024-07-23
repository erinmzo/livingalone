import { ChangeEvent, useId } from "react";

type InputProps = {
  label?: string;
  variant?: "default" | "underline";
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ label, variant = "default", type = "text", value, placeholder, onChange }: InputProps) {
  const inputId = useId();
  const variantStyles = {
    default:
      "border border-[#808080] rounded-lg px-[16px] py-[8px] text-[16px] focus:outline-none focus:border-gray-950 transition",
    underline:
      "border-b border-[#808080] px-[16px] py-[8px] text-[16px] focus:outline-none focus:border-gray-950 transition",
  };

  return (
    <div className="flex flex-col">
      <label className="ml-1 mb-[10px] font-bold" htmlFor={inputId}>
        {label}
      </label>
      {type === "text" && (
        <input
          type="text"
          placeholder={placeholder}
          className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
          value={value}
          onChange={onChange}
          id={inputId}
        />
      )}
      {type === "file" && (
        <input
          type="file"
          className={`${variantStyles[variant]}`}
          value={value}
          placeholder={placeholder}
          id={inputId}
        />
      )}
      {type === "password" && (
        <input
          type="password"
          placeholder={placeholder}
          className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
          value={value}
          onChange={onChange}
          id={inputId}
        />
      )}
    </div>
  );
}

export default Input;
