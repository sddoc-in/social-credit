import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Input from "../../interface/Input";

export default function InputPass(props: Input) {
  const [show, setShow] = React.useState(false);

  function Show() {
    setShow(!show);
  }

  return (
    <div className={"w-full h-fit text-start my-2 " + props.inputClassName}>
      {props.label && (
        <label
          htmlFor={props.name ? props.name : "password"}
          className="text-[16px] block leading-[24px] text-[#23262F] font-[700] my-1 md:my-2"
        >
          {props.label}
        </label>
      )}
      <div className="relative w-full">
        <div
          className="absolute right-4"
          onClick={Show}
          style={{ top: "13.5px" }}
        >
          {show ? (
            <AiFillEyeInvisible className="text-[#777E91] text-[20px] cursor-pointer" />
          ) : (
            <AiFillEye className="text-[#777E91] text-[20px] cursor-pointer" />
          )}
        </div>
        <input
          type={show ? "text" : "password"}
          defaultValue={props.defValue}
          disabled={props.disabled ? true : false}
          name={props.name ? props.name : "password"}
          onChange={(e) => props.onChangeHandler!(e)}
          placeholder={props.placeholder ? props.placeholder : `Enter Password`}
          className={
            "input w-full font-[900] text-[14px] text-black placeholder:font-[900] placeholder:text-[black] bg-white"
          }
          style={{ borderColor: "rgb(189, 189, 189)" }}
        />
        {props.error && (
          <p className="text-[12px] ml-2 mt-1 mb-2 font-semibold text-red-600">
            {props.error}
          </p>
        )}
      </div>
    </div>
  );
}
