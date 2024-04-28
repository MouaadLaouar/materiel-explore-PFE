import { useEffect, useState } from "react";
// import Sidebar from "../../Components/Sidebar";
import fetchUserDataIfLoggedIn from "../../Utils/fetchUserDataIfLoggedIn";
import Admin from "./Admin";
import User from "./User";
import { useAtom } from "jotai";
import { userIdAtom } from "../../atom";
import SuperAdmin from "./SuperAdmin";

const Dashboard = () => {
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn] = useAtom(userIdAtom);

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
    return <h1>Error</h1>;
  }

  if (user?.Role === "ADMIN") {
    return (
      <>
        <Admin />
      </>
    );
  } else if (user?.Role === "USER") {
    return (
      <>
        <User />
      </>
    );
  } else if (user?.Role === "SUPERADMIN") {
    return (
      <>
        <SuperAdmin />
      </>
    );
  }
};

export default Dashboard;
