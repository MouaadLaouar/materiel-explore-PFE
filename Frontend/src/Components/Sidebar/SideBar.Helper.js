import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";
import { IoLibrary } from "react-icons/io5";
import { MdBorderColor, MdHistory } from "react-icons/md";


export const AdminPages = [
  { name: "Profile", href: "#", icon: CgProfile, isActive: true },
  { name: "Department", href: "#", icon: FaBuilding, isActive: false },
  { name: "Materials", href: "#", icon: GiMaterialsScience, isActive: false },
  { name: "Borrowed Materials", href: "#", icon: IoLibrary, isActive: false },
];

export const SuperAdminPages = [
  { name: "Profile", href: "#", icon: CgProfile, isActive: true },
  { name: "All Users", href: "#", icon: FaUsers, isActive: false },
  { name: "Departments", href: "#", icon: FaBuilding, isActive: false },
  { name: "Materials", href: "#", icon: GiMaterialsScience, isActive: false },
  { name: "Borrowed Materials", href: "#", icon: IoLibrary, isActive: false },
];

export const UserPages = [
  { name: "Profile", href: "#", icon: CgProfile, isActive: true, },
  { name: "Current Materials", href: "#", icon: IoLibrary, isActive: false },
  { name: "My Demands", href: "#", icon: MdBorderColor, isActive: false },
  { name: "My History", href: "#", icon: MdHistory, isActive: false },
];


