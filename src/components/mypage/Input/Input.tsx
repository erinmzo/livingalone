import { ComponentProps, useId } from "react";

type InPutProps = {
  label?: string;
  required?: boolean;
  variant?: "default" | "underline";
  type?: string;
} & ComponentProps<"input">;

function Input({
  label,
  required,
  id,
  variant = "default",
  type = "text",
}: InPutProps) {
  const inputUid = useId();
  const inputId = id || inputUid;
  const variantStyles = {
    default:
      "border border-gray-400 rounded px-4 py-2 focus: outline-none focus:border-gray-950 transition",
    underline:
      "border-b border-gray-400 p-6 rounded px-4 py-2 focus: outline-none focus:border-gray-950 transition",
  };

  return (
    <div className="flex flex-col [&+&]: mt-4">
      <label htmlFor={inputId} className="text-sm font-semibold">
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      {/* <input id={inputId} className={`${variantStyles[variant]}`} /> */}
      {type === "file" ? (
        <input type="file" className={`${variantStyles[variant]}`} />
      ) : (
        <input id={inputId} className={`${variantStyles[variant]}`} />
      )}
    </div>
  );
}

export default Input;
