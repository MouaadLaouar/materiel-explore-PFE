import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";
import { userIdAtom } from "../../atom";

import { VscAccount } from "react-icons/vsc";
import signIn from "../../Utils/Authentification/SignIn";
import toast from "react-hot-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const setUserId = useSetAtom(userIdAtom);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required("Please Enter Your Email"),
    password: yup
      .string()
      .min(8)
      .max(16)
      .required("Please Enter Your Password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = await signIn(data.email, data.password);
      if (userData.ID) {
        const Id = userData.ID;
        setUserId(Id);
        localStorage.setItem("userID", Id);
        navigate("/Dashboard");
        toast.success("Connected");
      } else {
        toast.error("Sign In Failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <VscAccount className="mx-auto h-16 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  {...register("email")}
                  className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-4">
                {errors.email?.message}
              </span>
            </div>

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
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  {...register("password")}
                  className="block w-full rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-4">
                {errors.password?.message}
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a Member ?{" "}
            <a
              className="font-semibold leading-6 text-black hover:text-teal-700"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create Your Own Account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
