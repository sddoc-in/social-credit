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
    title: "Discord",
    path: "/dashboard/discord",
    shortPath: "/discord",
    Icon: MdOutlineCampaign,
    Element: DiscardUser,
  },
 
  {
    title: "Panel ",
    path: "/dashboard/panel",
    shortPath: "/panel",
    Icon: MdOutlineAccountTree,
    Element: PanelUser,
  },
  {
    title: "Phrases",
    path: "/dashboard/phrases",
    shortPath: "/phrases",
    Icon: GoProjectTemplate,
    Element: Phrases,
  },
 
];
