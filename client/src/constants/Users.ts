// import NewClient from "../components/dashboard/client/NewClient";
import NewUser from "../components/dashboard/user/NewUser";
import UpdateUser from "../components/dashboard/user/UpdateUser";
import ViewUser from "../components/dashboard/user/ViewUser";


export const UserOptions = [
  {
    title: "Create New User",
    path: "/dashboard/users/new-users",
    shortPath: "/new-users",
    Element: NewUser,
  },
  // {
  //   title: "Create new Client",
  //   path: "/dashboard/users/new-clients",
  //   shortPath: "/new-clients",
  //   Element: NewClient,
  // },
  {
    title: "Update User",
    path: "/dashboard/users/update-users/:uid",
    shortPath: "/update-users",
    Element: UpdateUser,
  },
  {
    title: "View User",
    path: "/dashboard/users/view-users/:uid",
    shortPath: "/view-users",
    Element: ViewUser,
  },
];
