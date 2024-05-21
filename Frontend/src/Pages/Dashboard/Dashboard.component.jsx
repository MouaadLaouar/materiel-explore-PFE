import { useEffect, useState } from "react";
// import Sidebar from "../../Components/Sidebar";
import fetchUserDataIfLoggedIn from "../../Utils/Fetch/fetchUserDataIfLoggedIn";
import Admin from "./Admin";
import User from "./User";
import { useAtom, useSetAtom } from "jotai";
import { userIdAtom, userRoleAtom } from "../../atom";
import SuperAdmin from "./SuperAdmin";
import { useNavigate } from "react-router";
import Sidebar from "../../Components/Sidebar/Sidebar.component";
import { FaBars } from "react-icons/fa6";

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn] = useAtom(userIdAtom);
  const setUserRole = useSetAtom(userRoleAtom);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const ID = localStorage.getItem("userID");
      try {
        const res = await fetchUserDataIfLoggedIn(ID);
        setUser(res);
      } catch (error) {
        setError(true);
      }
    };

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  if (error) {
    return (
      <>
        <div className="w-11/12 m-auto text-center mt-20">
          <h1 className="font-mdBold text-3xl mb-5">
            Oops ! , You are Not Logged In
          </h1>
          <h1 className="font-mdBold text-2xl">
            Try To Sign In to Your Account Or Create One{" "}
            <a
              className=" cursor-pointer text-teal-400"
              onClick={() => {
                navigate("/Signin");
              }}
            >
              Here
            </a>
          </h1>
        </div>
      </>
    );
  }

  if (user?.Role === "ADMIN") {
    setUserRole("ADMIN");
    return (
      <div className="flex">
        <Sidebar showSidebar={showSidebar} />
        <FaBars
          className="absolute text-2xl left-4 top-20 hover:cursor-pointer hover:text-teal-600"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Admin />
      </div>
    );
  } else if (user?.Role === "USER") {
    setUserRole("USER");
    return (
      <div className="flex">
        <Sidebar showSidebar={showSidebar} />
        <FaBars
          className="absolute text-2xl left-4 top-20 hover:cursor-pointer hover:text-teal-600"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <User />
      </div>
    );
  } else if (user?.Role === "SUPERADMIN") {
    setUserRole("SUPERADMIN");
    return (
      <div className="flex">
        <Sidebar showSidebar={showSidebar} />
        <FaBars
          className="absolute text-2xl left-4 top-20 hover:cursor-pointer hover:text-teal-600"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <SuperAdmin />
      </div>
    );
  }
};

export default Dashboard;
