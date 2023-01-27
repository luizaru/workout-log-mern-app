import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { FaBloggerB } from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Workout",
    icon: <BiImageAdd />,
    path: "/add-workout",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Blog",
    icon: <FaBloggerB />,
    path: "/blog",
  },
  {
    title: "Contact",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
