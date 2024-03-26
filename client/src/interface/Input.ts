export default interface Input {
    defValue: string;
    label?: string;
    name: string;
    name2?: string;
    options?: { value: string; label: string }[];
    onChangeHandler?: (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    inputClassName?: string;
    error?: string;
  }
  