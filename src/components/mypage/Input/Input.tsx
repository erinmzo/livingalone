import { ChangeEvent, ComponentProps, useId } from "react";

type InPutProps = {
  label?: string;
  variant?: "default" | "underline";
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentProps<"input">;

function Input({ label, id, variant = "default", type = "text", value, placeholder, onChange }: InPutProps) {
  const inputUid = useId();
  const inputId = id || inputUid;
  const variantStyles = {
    default:
      "border border-[#808080] rounded-lg px-[16px] py-[8px] text-[20px] focus:outline-none focus:border-gray-950 transition",
    underline:
      "border-b border-[#808080] px-[16px] py-[8px] text-[20px] focus:outline-none focus:border-gray-950 transition",
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className="text-[16px] font-bold mb-[10px]">
        {label}
      </label>
      {type === "file" ? (
        <input type="file" className={`${variantStyles[variant]}`} value={value} placeholder={placeholder} />
      ) : (
        <input
          id={inputId}
          className={`${variantStyles[variant]}`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default Input;
