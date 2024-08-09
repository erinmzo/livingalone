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
  error?: string;
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
  error,
}: InputFieldProps) {
  return (
    <div className="flex gap-[2px] justify-between items-start">
      <label
        htmlFor={name}
        className=" w-[78px] h-[38px] flex items-center py-[5px] text-lg text-gray-4"
      >
        {labelName}
      </label>
      <div className="flex-1">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeHolder}
          minLength={minLength}
          max={max}
          onChange={(e) => onchangeValue(e)}
          className="w-full pl-[2px] py-[5px] border-b border-gray-3 font-bold text-[18px] text-gray-5 outline-none placeholder:text-gray-2 leading-normal"
        />
        {error && <p className={`text-red-3 text-[12px] mt-2`}>{error}</p>}
      </div>
    </div>
  );
}

export default InputField;
