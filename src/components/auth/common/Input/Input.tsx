import { ChangeEvent, ChangeEventHandler, useId } from "react";

type InputProps = {
  label?: string;
  variant?: "default" | "underline";
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

function Input({
  label,
  variant = "default",
  type = "text",
  value,
  placeholder,
  onChange,
}: InputProps) {
  const inputId = useId();
  const variantStyles = {
    default:
      "border border-[#808080] rounded-lg px-[16px] py-[8px] text-[16px] focus:outline-none focus:border-gray-950 transition",
    underline:
      "border-b border-[#808080] px-[16px] py-[8px] text-[16px] focus:outline-none focus:border-gray-950 transition",
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="ml-1 mb-[10px] font-bold" htmlFor={inputId}>
          {label}
        </label>
      )}
      {type === "text" && (
        <input
          type="text"
          placeholder={placeholder}
          className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
          value={value}
          onChange={onChange}
          readOnly={!onChange}
        />
      )}
      {type === "file" && (
        <input
          type="file"
          className={`${variantStyles[variant]}`}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {type === "password" && (
        <input
          type="password"
          placeholder={placeholder}
          className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
          value={value}
          onChange={onChange}
          readOnly={!onChange}
        />
      )}
    </div>
  );
}

export default Input;
