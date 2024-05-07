import { useAtom } from "jotai";
import { userIdAtom } from "../../atom";
import fetchUserDataIfLoggedIn from "../../Utils/Fetch/fetchUserDataIfLoggedIn";
import { useEffect, useState } from "react";

import PopUp from "../PopUp";
import PasswordConfirmation from "../PasswordConfirmation";
import ChangePassword from "./components/ChangePassword";
import toast from "react-hot-toast";
import UpdateUser from "../../Utils/Update/UpdateUser";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const userId = useAtom(userIdAtom);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Id: "",
    Role: "",
  });

  const getUserData = async () => {
    if (userId) {
      try {
        const data = await fetchUserDataIfLoggedIn(userId[0]);
        setUserData({
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.Email,
          Phone: data.Phone,
          Id: data.ID,
          Role: data.Role,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const isUserDataEmpty = () => {
    for (let key in userData) {
      if (userData[key] === "") {
        return true;
      }
    }
    return false;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsPasswordCorrect(true);
    try {
      if (!isUserDataEmpty()) {
        await UpdateUser({ ...userData, Password: password });
        toast.success("Profile Updated Successfully");
        setPassword("");
        console.log(userData);
      } else {
        toast.error("Fill All The Fields");
        setIsPasswordCorrect(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An Error Occured");
      setIsPasswordCorrect(false);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex  w-full flex-1 flex-col justify-center ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Account Informations
        </h2>
      </div>

      <span className="block text-sm font-medium leading-6  text-center mt-10">
        Here&apos;s Your Account Informations , To Modify You Should{" "}
        <a
          className="text-teal-600 hover:cursor-pointer hover:text-teal-500"
          onClick={() => {
            setOpen(true);
            setPage("Confirm");
          }}
        >
          Tap Your Password Here
        </a>
      </span>

      <div className="mb-40 mt-10 sm:mx-auto sm:w-3/4 pr-20">
        <form className="space-y-6 " onSubmit={handleFormSubmit}>
          {/* First Name */}
          <div>
            <label
              htmlFor="FirstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                required
                id="FirstName"
                name="FirstName"
                type="text"
                autoComplete="firstName"
                value={userData.FirstName}
                onChange={handleInputChange}
                disabled={isPasswordCorrect}
                className={classNames(
                  isPasswordCorrect ? "bg-gray-200" : "bg-white",
                  "block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="LastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                // required
                id="LastName"
                name="LastName"
                type="text"
                autoComplete="lastName"
                disabled={isPasswordCorrect}
                onChange={handleInputChange}
                value={userData.LastName}
                className={classNames(
                  isPasswordCorrect ? "bg-gray-200" : "bg-white",
                  "block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="Phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                required
                id="Phone"
                name="Phone"
                type="text"
                autoComplete="Phone"
                disabled={isPasswordCorrect}
                onChange={handleInputChange}
                value={userData.Phone}
                pattern="\d{10}"
                title="Phone Number must be 10 digits"
                className={classNames(
                  isPasswordCorrect ? "bg-gray-200" : "bg-white",
                  "block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2 flex">
              <input
                required
                id="Email"
                name="Email"
                type="email"
                autoComplete="email"
                disabled={isPasswordCorrect}
                onChange={handleInputChange}
                value={userData.Email}
                className={classNames(
                  isPasswordCorrect ? "bg-gray-200" : "bg-white",
                  "block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
              />
            </div>
          </div>

          <span className="block text-sm font-medium leading-6  text-start  ">
            To Change Your Password{" "}
            <a
              className="text-teal-600 hover:cursor-pointer hover:text-teal-500"
              onClick={() => {
                setOpen(true);
                setPage("Change");
              }}
            >
              Click Here
            </a>
          </span>

          <br />
          <br />

          <div className="flex justify-end">
            <button
              type="submit"
              className=" flex w-1/4 justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isPasswordCorrect}
            >
              Save
            </button>
          </div>
        </form>
        <PopUp open={open} setOpen={setOpen}>
          {page === "Confirm" && (
            <PasswordConfirmation
              setOpen={setOpen}
              Email={userData.Email}
              setIsPasswordCorrect={setIsPasswordCorrect}
              password={password}
              setPassword={setPassword}
            />
          )}
          {page === "Change" && (
            <ChangePassword
              setOpen={setOpen}
              userData={userData}
              setPassword={setPassword}
            />
          )}
        </PopUp>
      </div>
    </div>
  );
};

export default Profile;
