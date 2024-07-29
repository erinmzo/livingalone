import { useState } from "react";

export const useInputChange = <T extends Record<string, any>>(defaultValues: T) => {
  const [values, setValues] = useState<T>(defaultValues);

  const handler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const reset = () => {
    setValues(defaultValues);
  };

  const setValueInit = (value: any) => {
    setValues(value);
  };

  return { values, handler, setValueInit, reset };
};
