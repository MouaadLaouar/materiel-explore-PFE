import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";


export const AdminPages = [
  { name: "Profile", href: "#", icon: CgProfile, isActive: true },
  { name: "Users", href: "#", icon: FaUsers, isActive: false },
  { name: "Department", href: "#", icon: FaBuilding, isActive: false },
  { name: "Materials", href: "#", icon: GiMaterialsScience, isActive: false },
];

export const SuperAdminPages = [
  { name: "Profile", href: "#", icon: CgProfile, isActive: true },
  { name: "All Users", href: "#", icon: FaUsers, isActive: false },
  { name: "Departments", href: "#", icon: FaBuilding, isActive: false },
  { name: "Materials", href: "#", icon: GiMaterialsScience, isActive: false },
];

export const UserPages = [
  { name: "Profile", href: "#", icon: CgProfile, isActive: true, },
  // { name: "Departments", href: "#", icon: FaBuilding, isActive: false },
  { name: "Borrowed Materials", href: "#", icon: GiMaterialsScience, isActive: false },
];


