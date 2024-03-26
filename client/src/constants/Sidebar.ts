import { GoProjectTemplate } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCampaign } from "react-icons/md";
import { MdOutlineAccountTree } from "react-icons/md";
import Dashboard from "../pages/Dashboard";
// import Phrases from "../pages/Phrases";
import Phrases from "../pages/Phrases";
import DiscardUser from "../pages/DiscardUser";
import PanelUser from "../pages/PanelUser";
 

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    shortPath: "/",
    Icon: IoHomeOutline,
    Element: Dashboard,
  },
  {
    title: "Discard-user",
    path: "/dashboard/DiscardUser",
    shortPath: "/lawyers",
    Icon: MdOutlineCampaign,
    Element: DiscardUser,
  },
 
  {
    title: "Panel User",
    path: "/dashboard/panel-user",
    shortPath: "/panel-user",
    Icon: MdOutlineAccountTree,
    Element: PanelUser,
  },
  {
    title: "Phrases",
    path: "/dashboard/Phrases",
    shortPath: "/Phrases",
    Icon: GoProjectTemplate,
    Element: Phrases,
  },
 
];
