import React from "react";

interface InputFieldProps {
  labelName: string;
  value: string;
  type: string;
  placeHolder: string;
  minLength: number;
  onchangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({
  labelName,
  value,
  type,
  placeHolder,
  onchangeValue,
  minLength,
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
        onChange={(e) => onchangeValue(e)}
        className="flex-1 border-b border-black"
      />
    </div>
  );
}

export default InputField;
