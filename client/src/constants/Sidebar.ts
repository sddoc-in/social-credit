import { GoProjectTemplate } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCampaign } from "react-icons/md";
import { MdOutlineAccountTree } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import Dashboard from "../pages/Dashboard";
import PhrasesComponent from "../pages/Phrases";
import PanelUser from "../pages/PanelUser";
import DiscordUserComponent from "../pages/DiscordUser";
import ViewPhraseDetails from "../components/dashboard/phrases/ViewPhraseDetails";
import UserDetails from "../components/dashboard/discord-user/UserDetails";
import Notifications from "../pages/Notifications";
import Logout from "../pages/Logout";
import { title } from "process";
import Wordpharses from "../pages/Wordpharses"

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
    Element: DiscordUserComponent,
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
    Element: PhrasesComponent,
  },
  {
    title: "Notifications",
    path: "/dashboard/notifications",
    shortPath: "/notifications",
    Icon: IoIosNotifications,
    Element: Notifications,
  },
  {
    title: "Logout",
    path: "/logout",
    shortPath: "/logout",
    Icon: CiLogout,
    Element: Logout,
  },
  {
    title:"Wordpharses",
    path:"/dashboard/wordphrases",
    shortPath:"/wordphrases",
    Icon:GoProjectTemplate,
    Element: Wordpharses,
  }
];

export const OtherPagesThanSidebar = [
  {
    title: "Phrase Details",
    path: "/dashboard/phrase/details/view/:phrase_id",
    shortPath: "/phrase/details/view/:phrase_id",
    Element: ViewPhraseDetails,
  },
  {
    title: "Discord User Details",
    path: "/dashboard/user/discord/details/view/:userId",
    shortPath: "/user/discord/details/view/:userId",
    Element: UserDetails,
  },
];
