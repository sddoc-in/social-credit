import React from "react";
import SelectArray from "./SelectArray";

export default interface Input {
  defValue: string | number ;
  label?: string;
  name: string;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  inputClassName?: string;
  error?: string;
  onChange?: (type:string,value:string) => void;
  selectArray?: SelectArray[];
}
