/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxUpdate } from "react-icons/rx";
import { Constants } from "../../../../../../../Constants";
import UpdateMaterial from "../../../../../../../Utils/Update/UpdateMaterial";
import GetDeptById from "../../../../../../../Utils/Fetch/GetDeptById";

const UpdateMyMaterial = ({
  setOpen,
  selectedMaterial,
  getMaterials,
  setIsPasswordCorrect,
  setPassword,
}) => {
  const [myDept, setMyDept] = useState({});

  const [material, setMaterial] = useState({
    Id: selectedMaterial.ID,
    Name: selectedMaterial.Name,
    Description: selectedMaterial.Description,
    Departement: selectedMaterial.DepartementId,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevDeptData) => ({
      ...prevDeptData,
      [name]: value,
    }));
  };
  const isMaterialDataEmpty = () => {
    for (let key in material) {
      if (material[key] === "") {
        return true;
      }
    }
    return false;
  };
  const FetchDepts = async () => {
    try {
      const response = await GetDeptById(material.Departement);
      setMyDept(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    FetchDepts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isMaterialDataEmpty()) {
        const res = await UpdateMaterial(material);
        toast.success("Material Updated Successfully");
        console.log(res);
        getMaterials();
        setOpen(false);
        setIsPasswordCorrect(true);
        setPassword("");
      } else {
        toast.error("Fill All The Fields");
      }
    } catch (error) {
      console.error(error);
      toast.error("An Error Occured");
    }
  };

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-center">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
            <RxUpdate className="h-6 w-6 text-sky-700" aria-hidden="true" />
          </div>
          <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Update Material
            </h3>
            <p className="text-sm text-gray-500">
              Update Previous Information For This Material Here
            </p>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        className="rounded h-48 mx-auto my-8 bg-cover"
        src={`${Constants.BasedPictureUrl}/${selectedMaterial.Picture[0].Name}`}
        alt=""
      />
      <form onSubmit={handleFormSubmit}>
        {/* Material Name */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="MaterialName"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Material Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="MaterialName"
              name="Name"
              type="text"
              value={material.Name}
              onChange={handleInputChange}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3"></span>
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
              value={material.Description}
              onChange={handleInputChange}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3"></span>
        </div>

        {/* Department */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900">
              Departement
            </label>
          </div>
          <div className="mt-2">
            <select
              disabled
              name="Departement"
              value={myDept.ID}
              onChange={handleInputChange}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Department</option>
              <option value={myDept.ID}>{myDept.Name}</option>
            </select>
          </div>

          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3"></span>
        </div>

        {/* Form Buttons (Submit and Cancel) */}
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
          >
            Save
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

export default UpdateMyMaterial;
