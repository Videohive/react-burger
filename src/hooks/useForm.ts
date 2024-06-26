import React, { useState } from "react";

export interface IFormEntryData {
  [key: string]: string;
}

export function useForm(inputValues: IFormEntryData) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
