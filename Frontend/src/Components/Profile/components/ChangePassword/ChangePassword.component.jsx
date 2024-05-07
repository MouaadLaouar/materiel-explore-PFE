/* eslint-disable react/prop-types */
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import SignIn from "../../../../Utils/Authentification/SignIn";
import UpdateUser from "../../../../Utils/Update/UpdateUser";
import { useState } from "react";

const ChangePassword = ({ setOpen, userData, setPassword }) => {
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    OldPassword: yup
      .string()
      .min(8)
      .max(16)
      .required("The Password Is Required"),
    NewPassword: yup
      .string()
      .min(8)
      .max(16)
      .required("The Password Is Required"),
    ConfirmNewPassword: yup
      .string()
      .oneOf([yup.ref("NewPassword"), null], "Password Don't Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const dataWithOldPassword = await SignIn(
        userData.Email,
        data.OldPassword
      );
      if (dataWithOldPassword.ID === userData.Id) {
        await UpdateUser({ ...userData, Password: data.NewPassword });
        toast.success("Password Updated Successfully");
        setIsLoading(false);
        setOpen(false);
        setPassword(data.NewPassword);
      } else {
        toast.error("Your Old Password Is Wrong");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
            <RiLockPasswordLine
              className="h-6 w-6 text-teal-700"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Change Your Password
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Tap Your Old Password Then Create A New One
              </p>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="OldPassword"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Old Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="OldPassword"
              name="OldPassword"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("OldPassword")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.OldPassword?.message}
          </span>
        </div>

        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="NewPassword"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              New Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="NewPassword"
              name="NewPassword"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("NewPassword")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.NewPassword?.message}
          </span>
        </div>

        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="ConfirmNewPassword"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm New Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="ConfirmNewPassword"
              name="ConfirmNewPassword"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("ConfirmNewPassword")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.ConfirmNewPassword?.message}
          </span>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
          >
            Confirm
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
