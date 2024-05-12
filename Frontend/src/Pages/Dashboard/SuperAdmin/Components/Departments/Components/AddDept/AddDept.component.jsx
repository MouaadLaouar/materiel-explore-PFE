/* eslint-disable react/prop-types */
import { FaBuilding } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import FetchAdmins from "../../../../../../../Utils/Fetch/FetchAdmins";
import toast from "react-hot-toast";
import CreateDept from "../../../../../../../Utils/Create/CreateDepartment";

const AddDept = ({ setOpen, getDepartments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);

  const schema = yup.object().shape({
    deptName: yup.string().required("The Name Is Required"),
    deptEmail: yup.string().required("The Email Is Required"),
    deptPhone: yup
      .string()
      .required("The Phone Number Is Required")
      .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    admin: yup.string().required("Please select an Admin"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const FetchAllAdmins = async () => {
    try {
      const response = await FetchAdmins();
      setAdmins(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchAllAdmins();
  }, []);

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await CreateDept({
        Name: data.deptName,
        Email: data.deptEmail,
        Phone: data.deptPhone,
        Admin: data.admin,
      });
      if (!res.ID) {
        toast.error("This Email Already Exists");
        setIsLoading(false);
        return;
      } else {
        getDepartments();
        toast.success("Department Added Successfully");
        setIsLoading(false);
        setOpen(false);
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
        <div className="sm:flex sm:items-center">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
            <FaBuilding className="h-6 w-6 text-teal-700" aria-hidden="true" />
          </div>
          <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Add New Department
            </h3>
            <p className="text-sm text-gray-500">
              Fill The Form To Add A New Department To The System
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Name */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="OldPassword"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Department Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="deptName"
              name="deptName"
              type="text"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("deptName")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.deptName?.message}
          </span>
        </div>

        {/* Email */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="NewPassword"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
          </div>
          <div className="mt-2">
            <input
              id="deptEmail"
              name="deptEmail"
              type="email"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("deptEmail")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.deptEmail?.message}
          </span>
        </div>

        {/* Admin */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="ConfirmNewPassword"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Admin
            </label>
          </div>
          <div className="mt-2">
            <select
              disabled={isLoading}
              {...register("admin")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Admin</option>
              {admins.map((admin) => (
                <option key={admin.ID} value={admin.ID}>
                  {admin.FirstName}&nbsp;
                  {admin.LastName}
                </option>
              ))}
            </select>
          </div>

          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.admin?.message}
          </span>
        </div>

        {/* Phone Number */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="ConfirmNewPassword"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Phone
            </label>
          </div>
          <div className="mt-2">
            <input
              id="deptPhone"
              name="deptPhone"
              type="text"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("deptPhone")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.deptPhone?.message}
          </span>
        </div>

        {/* Form Buttons (Submit and Cancel) */}
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

export default AddDept;
