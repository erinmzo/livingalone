import React from "react";

interface InputFieldProps {
  labelName: string;
  value: string;
  type: string;
  placeHolder: string;
  minLength: number;
  max?: string;
  onchangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({
  labelName,
  value,
  type,
  placeHolder,
  onchangeValue,
  minLength,
  max,
}: InputFieldProps) {
  return (
    <div className="flex gap-2 justify-between">
      <label className="inline-block w-[78px] m-auto py-1 text-xl font-bold">
        {labelName}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeHolder}
        minLength={minLength}
        max={max}
        onChange={(e) => onchangeValue(e)}
        className="flex-1 border-b border-black"
      />
    </div>
  );
}

export default InputField;
