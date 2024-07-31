import React from "react";

interface InputFieldProps {
  labelName: string;
  value?: string | number;
  type: string;
  placeHolder?: string;
  minLength?: number;
  max?: string;
  onchangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

function InputField({
  labelName,
  value,
  type,
  placeHolder,
  onchangeValue,
  minLength,
  max,
  name,
}: InputFieldProps) {
  return (
    <div className="flex gap-[2px] justify-between">
      <label className="inline-block w-[78px] m-auto py-[5px] text-lg text-gray-4">
        {labelName}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeHolder}
        minLength={minLength}
        max={max}
        onChange={(e) => onchangeValue(e)}
        className="flex-1 pl-[2px] py-[6px] border-b border-gray-3 font-bold text-[18px] text-gray-5 outline-none placeholder:text-gray-2 leading-normal"
      />
    </div>
  );
}

export default InputField;
