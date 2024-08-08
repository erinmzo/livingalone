import { useId, forwardRef } from "react";

interface InputProps {
  variant?: "default" | "underline";
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const variantStyles = {
  default:
    "h-[48px] px-4 w-full rounded-lg border border-gray-2 text-[18px] placeholder-gray-2 focus:outline-none focus:border-gray-3 transition",
  underline:
    "border-b border-gray-2 px-1 py-2 text-[20px] placeholder-gray-2 focus:outline-none focus:border-black transition ",
};

// 3. forwardRef로 전달 받음
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    name,
    label,
    variant = "default",
    type = "text",
    value,
    placeholder,
    onChange,
    readOnly = false,
    error,
  },
  ref
) {
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
          // 4. ref 담기
          ref={ref}
          type="file"
          className={`${variantStyles[variant]} text-[10px] py-[10px]`}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {error && <p className={`text-red-3 text-[12px] mt-2`}>{error}</p>}
    </div>
  );
});

export default Input;
