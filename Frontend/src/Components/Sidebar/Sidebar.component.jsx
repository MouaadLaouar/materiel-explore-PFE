import { useAtom } from "jotai";
import { AdminPages, SuperAdminPages, UserPages } from "./SideBar.Helper";
import { useEffect, useState } from "react";
import { userRoleAtom } from "../../atom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const [userViewPerRole, setUserViewPerRole] = useState([]);
  const userRole = useAtom(userRoleAtom);

  useEffect(() => {
    if (userRole[0] === "USER") {
      setUserViewPerRole(UserPages);
    } else if (userRole[0] === "ADMIN") {
      setUserViewPerRole(AdminPages);
    } else if (userRole[0] === "SUPERADMIN") {
      setUserViewPerRole(SuperAdminPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="min-w-52   [box-shadow:0_3px_5px_rgba(117,_117,_117,_0.3)]">
        <ul className="p-7 pt-16 font-mdMed">
          {userViewPerRole.map((item) => (
            <li
              key={item.name}
              className={classNames(
                item.href === location.pathname
                  ? "text-teal-600 "
                  : "text-black hover:text-teal-600 ",
                " mb-7 text-sm leading-tight flex items-center cursor-pointer "
              )}
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
