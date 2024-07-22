import { ComponentProps, useId } from "react";

type InPutProps = {
  label?: string;
  required?: boolean;
} & ComponentProps<"input">;

function Input({ label, required, id, ...props }: InPutProps) {
  const inputUid = useId();
  const inputId = id || inputUid;
  return (
    <div className="flex flex-col [&+&]: mt-4">
      <label htmlFor={inputId} className="text-sm font-semibold">
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={inputId}
        {...props}
        className="border border-gray-400 p-6 rounded px-4 py-2 focus: outline-none focus:border-gray-950 transition"
      />
    </div>
  );
}

export default Input;
