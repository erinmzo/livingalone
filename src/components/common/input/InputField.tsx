import React from "react";

interface InputFieldProps {
  labelName: string;
  value?: string | number;
  type: string;
  placeHolder?: string;
  onchangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string;
  minLength?: number;
}

function InputField({
  labelName,
  value,
  type,
  placeHolder,
  onchangeValue,
  name,
  error,
  minLength,
}: InputFieldProps) {
  return (
    <>
      <div className="flex gap-[2px] justify-between items-start">
        <label
          htmlFor={name}
          className="flex items-center w-[70px] md:w-[78px] h-[38px] py-[5px] text-[16px] md:text-lg text-gray-4"
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
            onChange={(e) => onchangeValue(e)}
            className="w-full pl-[2px] py-[5px] border-b border-gray-3 font-bold text-[16px] md:text-[18px] text-gray-5 outline-none placeholder:text-gray-2 leading-normal rounded-none"
          />
          {error && <p className={`text-red-3 text-[12px] mt-2`}>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default InputField;
