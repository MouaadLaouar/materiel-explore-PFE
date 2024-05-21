/* eslint-disable react/prop-types */
import { GiMaterialsScience } from "react-icons/gi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import CreateMaterial from "../../../../../../../Utils/Create/CreateMaterial";
import GetDept from "../../../../../../../Utils/Fetch/GetDept";
import { useEffect, useState } from "react";

const AddMaterials = ({ setOpen, GetMaterials }) => {
  const [departments, setDepartments] = useState([]);

  const schema = yup.object().shape({
    file: yup.mixed().required("Picture is required"),
    Name: yup.string().required("The Name Is Required"),
    Description: yup.string().required("The Description Is Required"),
    Departement: yup.string().required("Please select a Department"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const getDepartments = async () => {
    try {
      const data = await GetDept();
      setDepartments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const validFileTypes = ["image/png", "image/jpg", "image/gif", "image/jpeg"];

  const handleFormSubmit = async (data) => {
    try {
      const fileType = data.file[0];
      if (fileType === undefined) {
        toast.error("Please Select A File");
        return;
      } else {
        if (!validFileTypes.includes(fileType.type)) {
          toast.error("File Type Is Not Supported");
          return;
        }
        await CreateMaterial({
          file: data.file[0],
          Name: data.Name,
          Description: data.Description,
          Departement: data.Departement,
        });
        toast.success("Material Added Successfully");
        GetMaterials();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-center">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
            <GiMaterialsScience
              className="h-6 w-6 text-teal-700"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Add New Material
            </h3>
            <p className="text-sm text-gray-500">
              Fill The Form To Add A New Material To The System
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Picture */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="file"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Add Picture
            </label>
          </div>
          <div className="mt-2">
            <input
              id="file"
              name="file"
              type="file"
              {...register("file")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.file?.message}
          </span>
        </div>
        {/* Material Name */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="Name"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Material Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="Name"
              name="Name"
              type="text"
              {...register("Name")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.Name?.message}
          </span>
        </div>

        {/* Description */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="Description"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
          </div>
          <div className="mt-2">
            <input
              id="Description"
              name="Description"
              type="text"
              {...register("Description")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.Description?.message}
          </span>
        </div>

        {/* Department */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="Departement"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Department
            </label>
          </div>
          <div className="mt-2">
            <select
              {...register("Departement")}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Department</option>
              {departments.map((Departement) => (
                <option key={Departement.ID} value={Departement.ID}>
                  {Departement.Name}
                </option>
              ))}
            </select>
          </div>

          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3">
            {errors.Departement?.message}
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

export default AddMaterials;
