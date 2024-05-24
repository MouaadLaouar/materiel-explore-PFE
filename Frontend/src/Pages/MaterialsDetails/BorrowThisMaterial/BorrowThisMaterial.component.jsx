/* eslint-disable react/prop-types */
import { RiHealthBookFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import toast from "react-hot-toast";
import CreateBorrowedMaterial from "../../../Utils/Create/CreateBorrowedMaterial";

const BorrowThisMaterial = ({
  setOpen,
  user,
  material,
  fetchLastBorrowedMaterial,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();
  const oneMonthFromToday = new Date();
  oneMonthFromToday.setMonth(today.getMonth() + 1);

  const schema = yup.object().shape({
    UserId: yup.string().default(user.ID).required(),
    MaterialId: yup.string().default(material.ID).required(),
    DueDate: yup
      .date()
      .typeError("Please Select a Valid Date")
      .required("Please Select a Valid Date")
      .min(today, "Due Date Cannot Be Earlier Than Today")
      .max(
        oneMonthFromToday,
        "Due Date Cannot Be Later Than One Month From Today"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const Data = {
        ...formData,
        DueDate: new Date(formData.DueDate).toISOString(),
      };
      const response = await CreateBorrowedMaterial(Data);
      console.log(response);
      fetchLastBorrowedMaterial();
      setOpen(false);
      toast("PLease Wait For An Approval From The Admin", {
        duration: 6000,
      });
      toast.success("Your Demand Has Been Sent Successfully", {
        duration: 4000,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-center ">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
            <RiHealthBookFill
              className="h-6 w-6 text-teal-700"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Borrow This Material
            </h3>
            <p className="text-sm text-gray-500">
              Fill The Neccessary Information To Borrow This Material
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* userID */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="userID"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              My Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="userID"
              name="userID"
              type="text"
              disabled
              value={`${user?.FirstName} ${user?.LastName}`}
              className="block bg-gray-200 w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* materialID */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="materialID"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Material Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="materialID"
              name="materialID"
              type="text"
              disabled
              value={material?.Name}
              className="block bg-gray-200 w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* dueDate */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="DueDate"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Due Date
            </label>
          </div>
          <div className="mt-2">
            <input
              id="DueDate"
              name="DueDate"
              type="date"
              disabled={isLoading}
              {...register("DueDate")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm mb-16 font-medium leading-6 text-red-600 text-center mt-3">
            {errors.DueDate?.message}
          </span>
        </div>

        {/* Form Buttons (Submit and Cancel) */}
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
          >
            Demand
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

export default BorrowThisMaterial;
