import { useAtom } from "jotai";
import { userIdAtom } from "../../atom";
import fetchUserDataIfLoggedIn from "../../Utils/fetchUserDataIfLoggedIn";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUp from "../../Utils/SignUp";
import toast from "react-hot-toast";

const Profile = () => {
  const userId = useAtom(userIdAtom);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    if (userId) {
      try {
        const data = await fetchUserDataIfLoggedIn(userId[0]);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = yup.object().shape({
    FirstName: yup.string().required("Please Enter Your First Name"),
    LastName: yup.string().required("Please Enter Your Last Name"),
    Phone: yup
      .string()
      .required("Please Enter Your Phone Number")
      .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    Email: yup.string().email().required("Please Enter Your Email"),

    Password: yup.string().min(8).max(16).required("The Password Is Required"),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Password Don't Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleFormSubmit = async (data) => {
    try {
      const newUserData = await SignUp({
        FirstName: data.FirstName,
        LastName: data.LastName,
        Phone: data.Phone,
        Email: data.Email,
        Password: data.Password,
        Role: "USER",
      });
      if (newUserData.ID) {
        console.log(newUserData);
        const Id = newUserData.ID;
        localStorage.setItem("userID", Id);
        //   navigate("/Dashboard");
        toast.success("Account Created Successfully");
        setIsLoading(false);
      } else {
        toast.error("Sign Up Failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <FaUserGraduate className="mx-auto h-16 w-auto" /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Modify You Informations
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-3/4   px-20">
        <form className="space-y-6 " onSubmit={handleSubmit(handleFormSubmit)}>
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
                id="FirstName"
                name="FirstName"
                type="text"
                autoComplete="firstName"
                disabled={isLoading}
                {...register("FirstName")}
                className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
              {errors.FirstName?.message}
            </span>
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
                id="LastName"
                name="LastName"
                type="text"
                autoComplete="lastName"
                disabled={isLoading}
                {...register("LastName")}
                className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
              {errors.LastName?.message}
            </span>
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
                disabled={isLoading}
                {...register("Phone")}
                className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
              {errors.Phone?.message}
            </span>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2 flex">
              <input
                id="Email"
                name="Email"
                type="email"
                autoComplete="email"
                disabled={isLoading}
                {...register("Email")}
                className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                type="submit"
                className="flex ml-5 justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                Modify
              </button>
            </div>

            <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
              {errors.Email?.message}
            </span>
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
                disabled={isLoading}
                {...register("Password")}
                className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
              {errors.Password?.message}
            </span>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                disabled={isLoading}
                {...register("ConfirmPassword")}
                className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
              {errors.ConfirmPassword?.message}
            </span>
          </div>

          {/* <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={isLoading}
                >
                  Sign Up
                </button>
              </div> */}
        </form>
      </div>
    </div>
  );
};

export default Profile;
