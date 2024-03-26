import React from "react";
import { API_URL } from "../constants/data";
import { AppContext } from "../context/Context";
import UserInterface from "../interface/NewUser";
import UserErrorInterface from "../interface/Error";
import validateUser from "../functions/validateUserSignup";

// used in files
// client/src/components/dashboard/user/ViewUser.tsx
export async function GetUser(uid: string) {
  const { user } = React.useContext(AppContext);
  const params = new URLSearchParams();
  params.append("uid", user.uid);
  params.append("session", user.session);
  params.append("userId", uid);
  params.append("token", user.access_token);

  const response = await fetch(`${API_URL}/get-user?${params}`);
  return response.json();
}

// used in files
// client/src/components/dashboard/user/NewUser.tsx

export async function RegisterUser(userNew: UserInterface) {
  const { user } = React.useContext(AppContext);
  const tmpuser = {
    ...userNew,
    session: user.session,
    access_token: user.access_token,
    uid: user.uid,
  };
  console.log(tmpuser);
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tmpuser),
  });
  return response.json();
}

export async function LoginUser(user: any) {
  const params = new URLSearchParams();
  params.append("user", user.user);
  params.append("password", user.password);
  const response = await fetch(`${API_URL}/login?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}


// used in files
// client/src/components/dashboard/user/UpdateUser.tsx

export async function UpdateUser(user: UserInterface) {
  const { user: userState } = React.useContext(AppContext);

  let errors: UserErrorInterface = validateUser(user, "", false);
  if (errors.hasError) {
    return {
      errors: errors,
      response: null,
    };
  }

  const tmpuser = {
    ...user,
    session: userState.session,
    access_token: userState.access_token,
    uid: userState.uid,
  };
  const response = await fetch(`${API_URL}/update-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tmpuser),
  });
  return {
    errors: null,
    response: response.json(),
  };
}
