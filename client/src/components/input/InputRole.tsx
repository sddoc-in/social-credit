import React from "react";
import Input from "../../interface/Input";

export default function InputRole(props: Input) {
  return (
    <div className={"text-start my-2 " + props.inputClassName}>
      {props.label && (
        <label
          htmlFor={props.name ? props.name : "role"}
          className="text-[16px] block leading-[24px] text-[#23262F] font-[700] my-1 md:my-2"
        >
          {props.label}
        </label>
      )}
      <select
        name={props.name ? props.name : "role"}
        disabled={props.disabled ? true : false}
        defaultValue={props.defValue}
        onChange={(e) => props.onChangeHandler!(e)}
        className={
          "input w-full text-[14px] text-black font-[900] placeholder:font-[900] placeholder:text-[black] bg-white  disabled:bg-white disabled:text-black"
        }
        style={{ borderColor: "rgb(189, 189, 189)" }}
      >
        <option value="user" className="text-black font-black">
          User
        </option>
        <option value="admin" className="text-black font-black">
          Admin
        </option>
      </select>
      {props.error && (
        <p className="text-[12px] ml-2 mt-1 mb-2 font-semibold text-red-600">
          {props.error}
        </p>
      )}
    </div>
  );
}
