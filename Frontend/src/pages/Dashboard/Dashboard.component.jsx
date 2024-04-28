import { useEffect, useState } from "react";
// import Sidebar from "../../Components/Sidebar";
import fetchUserDataIfLoggedIn from "../../Utils/fetchUserDataIfLoggedIn";
import Admin from "./Admin";
import User from "./User";
import { useAtom } from "jotai";
import { userIdAtom } from "../../atom";
import SuperAdmin from "./SuperAdmin";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
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