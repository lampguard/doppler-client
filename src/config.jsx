import { AiFillHome, AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";
import { BsMenuAppFill, BsMenuButton, BsGithub } from "react-icons/bs";

export const navLinks = [
  {
    title: "Dashboard",
    slug: "/dashboard",
    icon: <AiOutlineHome className="text-2xl inline" />,
    activeIcon: <AiFillHome className="text-2xl inline" />,
  },
  {
    title: "Apps",
    slug: "/apps",
    icon: <BsMenuButton className="text-2xl inline" />,
    activeIcon: <BsMenuAppFill className="text-2xl inline" />,
  },
  {
    title: "Tasks",
    slug: "/tasks",
    icon: <AiOutlineLineChart className="text-2xl inline" />,
    activeIcon: <AiOutlineLineChart className="text-2xl inline" />,
  },
  // {
  //   title: "View on Github",
  //   slug: "https://github.com/lampguard/doppler-client",
  //   icon: <BsGithub className="text-2xl inline" />,
  //   blankTarget: true,
  // },
];
