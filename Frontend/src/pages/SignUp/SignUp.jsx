import { FaUserGraduate } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useState } from "react";
import signUp from "../../Utils/SignUp";
import { userIdAtom } from "../../atom";
import { useSetAtom } from "jotai";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const setUserId = useSetAtom(userIdAtom);
  const [userData, setUserData] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    Password: "",
    Role: "USER",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signUp(userData);
      console.log(data);
      const Id = data.ID;
      setUserId(Id);
      localStorage.setItem("userID", Id);
      localStorage.setItem("activeNavItem", "Home");
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <FaUserGraduate className="mx-auto h-16 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label
                htmlFor="fisrtName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="FirstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  disabled={isLoading}
                  value={userData.FirstName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="LastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  disabled={isLoading}
                  value={userData.LastName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  id="Phone"
                  name="Phone"
                  type="text"
                  autoComplete="Phone"
                  required
                  disabled={isLoading}
                  value={userData.Phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="Email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  value={userData.Email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="Password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  value={userData.Password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member ?{" "}
            <a
              className="font-semibold leading-6 text-black hover:text-teal-700"
              onClick={() => {
                navigate("/Signin");
              }}
            >
              Sign In to your Account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
