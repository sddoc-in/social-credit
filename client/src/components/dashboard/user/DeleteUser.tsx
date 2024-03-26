import React from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/Context";
import { API_URL } from "../../../constants/data";

export default function DeleteUser() {
  const { user: currentUser } = React.useContext(AppContext);

  const uid = useParams().uid || "";

  async function deleteUser() {
    const tempUser = {
      userId: uid,
      session: currentUser.session,
      access_token: currentUser.access_token,
      uid: currentUser.uid,
    };

    const response = await fetch(`${API_URL}/delete-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempUser),
    }).then((res) => res.json());

    alert(response.message);
    if (response.message === "User deleted") {
      window.location.href = "/dashboard/users";
    }
  }
  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-[400px] bg-white p-4 rounded-md shadow-2xl">
          <h1 className="text-2xl font-bold text-center text-black">
            Delete User
          </h1>
          <p className="text-center text-black my-4">
            Are you sure you want to delete this user?
          </p>
          <div className="flex justify-between">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={deleteUser}
            >
              Delete
            </button>
            <a
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              href="/dashboard/users"
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
