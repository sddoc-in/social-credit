
import UserInterface from "../../interface/NewUser";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import toTitleCase from "../../functions/toTitle";

export default function UserCard(props: UserInterface) {
  const statusColor = () => {
    if (props.status === "active" || props.status === "connected") {
      return "bg-green-500";
    } else if (
      props.status === "inactive" ||
      props.status === "disconnected" ||
      props.status === "disabled"
    ) {
      return "bg-red-500";
    } else {
      return "bg-[#F2F2F2]";
    }
  };

  return (
    <>
      <div className="w-[300px] h-[auto] bg-[#FDFAFA] p-2 rounded-xl m-2">
        <div className="flex justify-between w-full items-center ">
          <div className="flex items-center">
            <p
              className={`w-2 h-2 rounded-full mr-2 block ${statusColor()}`}
            ></p>
            <p className="text-[#002F53] text-[12px] font-[600] leading-[20px]">
              {toTitleCase(props.status ? props.status : "active")}
            </p>
          </div>
          <div className="flex justify-center items-center">
            {/* <a
              href={"/dashboard/users/view-users/" + props.uid}
              className="flex items-center mx-2 cursor-pointer"
            >
              <IoEyeOutline className="text-[#002F53] text-[20px] " />
            </a> */}
            <a
              href={"/dashboard/users/update-users/" + props.uid}
              className="flex items-center mx-2 cursor-pointer"
            >
              <GrUpdate className="text-blue-500 text-[20px] " />
            </a>
            <a
              href={"/dashboard/users/delete-users/" + props.uid}
              className="flex items-center mx-2 cursor-pointer"
            >
              <MdDelete className="text-red-600 text-[20px] " />
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-auto">
          <a     href={"/dashboard/users/view-users/" + props.uid} className="w-[50px] h-[50px] rounded-full bg-[#002F53] flex justify-center items-center">
            <p className="text-white text-[20px] font-[900]">
              {props.name ? props.name.charAt(0) : "U"}
            </p>
          </a>
        </div>
        <div className="text-center">
          <h1 className="font-[900] text-black text-[20px]">{props.name}</h1>
          <p className="text-[#002F53] text-[16px] font-[600] leading-[20px]">
            {props.email}
          </p>  
          <p className="text-[#002F53] text-[16px] font-[600] leading-[20px]">
            {toTitleCase(props.role ? props.role : "user")}
          </p>         
        </div>
      </div>
    </>
  );
}
