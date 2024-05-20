/* eslint-disable react/prop-types */
import { useAtom, useSetAtom } from "jotai";
import { AdminPages, SuperAdminPages, UserPages } from "./SideBar.Helper";
import { useEffect, useState } from "react";
import { sideBarActivePageAtom, userRoleAtom } from "../../atom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ showSidebar }) => {
  const [userViewPerRole, setUserViewPerRole] = useState([]);
  const userRole = useAtom(userRoleAtom);
  const setSideBarActivePage = useSetAtom(sideBarActivePageAtom);

  useEffect(() => {
    if (userRole[0] === "USER") {
      setUserViewPerRole(UserPages);
      setSideBarActivePage(UserPages[0].name);
    } else if (userRole[0] === "ADMIN") {
      setUserViewPerRole(AdminPages);
      setSideBarActivePage(AdminPages[0].name);
    } else if (userRole[0] === "SUPERADMIN") {
      setUserViewPerRole(SuperAdminPages);
      setSideBarActivePage(SuperAdminPages[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className={classNames(
          showSidebar ? "block" : "hidden",
          "min-w-52 relative min-h-screen transition-transform ease-in-out [box-shadow:0_3px_5px_rgba(117,_117,_117,_0.3)]"
        )}
      >

        <ul className="p-7 pt-16 font-mdMed">
          {userViewPerRole.map((item) => (
            <li
              key={item.name}
              className={classNames(
                item.isActive
                  ? "text-teal-600 "
                  : "text-black hover:text-teal-600 ",
                " mb-7 text-sm leading-tight flex items-center cursor-pointer "
              )}
              onClick={() => {
                setSideBarActivePage(item.name);
                setUserViewPerRole(
                  userViewPerRole.map((page) => ({
                    ...page,
                    isActive: page.name === item.name,
                  }))
                );
              }}
            >
              <item.icon />
              &nbsp; {item.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
