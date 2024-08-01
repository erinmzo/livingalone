import { useId } from "react";

interface InputProps {
  variant?: "default" | "underline";
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const variantStyles = {
  default:
    "h-[48px] px-4 w-full rounded-lg border border-gray-2 text-[18px] placeholder-gray-2 focus:outline-none focus:border-gray-3 transition",
  underline:
    "border-b border-gray-2 px-1 py-2 text-[20px] placeholder-gray-2 focus:outline-none focus:border-black transition ",
};

function Input({
  name,
  label,
  variant = "default",
  type = "text",
  value,
  placeholder,
  onChange,
  readOnly = false,
}: InputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col">
      {label && (
        <label
          className="ml-1 mb-[12px] font-bold text-[18px]"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      {(type === "text" || type === "password") && (
        <input
          className={`${variantStyles[variant]}`}
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={readOnly}
        />
      )}
      {type === "file" && (
        <input
          type="file"
          className={`${variantStyles[variant]} text-[10px] py-[10px]`}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default Input;
