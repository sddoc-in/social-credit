import Input from "../../interface/Input";

export default function InputSelect(props: Input) {

    return (
        <div className={"text-start my-2" + props.inputClassName}>
            {props.label && (
                <label
                    htmlFor={props.name ? props.name : "name"}
                    className="text-[16px] block leading-[24px] text-[#23262F] font-[700] my-1 md:my-2"
                >
                    {props.label}
                </label>
            )}
            <select
                name={props.name ? props.name : "name"}
                disabled={props.disabled ? true : false}
                defaultValue={props.defValue}
                placeholder={props.placeholder ? props.placeholder : `Enter Name`}
                onChange={(e) => props.onChangeHandler!(e)}
                className={
                    "input w-full text-[14px] text-black font-[900] placeholder:font-[900] placeholder:text-[black] bg-white  disabled:bg-white disabled:text-black"
                }
                style={{ borderColor: "rgb(189, 189, 189)" }}
            >
                <option value="Lawyer 1" className="text-black font-black">
                    Lawyer 1
                </option>
                <option value="Lawyer 2" className="text-black font-black">
                    Lawyer 2
                </option>
                <option value="Lawyer 3" className="text-black font-black">
                    Lawyer 3
                </option>
                <option value="Lawyer 4" className="text-black font-black">
                    Lawyer 4
                </option>
                <option value="Lawyer 5" className="text-black font-black">
                    Lawyer 5
                </option>
            </select>
            {props.error && (
                <p className="text-[12px] ml-2 mt-1 mb-2 font-semibold text-red-600">{props.error}</p>
            )}
        </div>
    )
}