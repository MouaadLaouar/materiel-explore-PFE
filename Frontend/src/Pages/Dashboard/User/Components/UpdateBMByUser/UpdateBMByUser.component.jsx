/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { MdOutlineUpdate } from "react-icons/md";
import UpdateBorrowedMaterial from "../../../../../Utils/Update/UpdateBorrowedMaterial";

const UpdateBMByUser = ({ setOpen, BM }) => {
//   console.log(BM);
  const ReturnThisMaterial = async () => {
    try {
      const res = await UpdateBorrowedMaterial({
        Id: BM.ID,
        Returned: true,
        DueDate: BM.DueDate,
      });
      console.log(res);
      toast.success("Material Returned Successfully");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-center ">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
            <MdOutlineUpdate
              className="h-6 w-6 text-teal-700"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Return This Material
            </h3>
            <p className="text-sm text-gray-500">
              Confirm That You Want To Return This Material
            </p>
          </div>
        </div>
      </div>

      {/* Material Name */}
      <div className="my-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="materialName"
            className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
          >
            Material Name
          </label>
        </div>
        <div className="mt-2">
          <input
            id="materialName"
            name="materialName"
            type="text"
            disabled
            value={BM?.Material?.Name}
            className="block bg-gray-200 w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Dept Name */}
      <div className="my-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="deptName"
            className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
          >
            Department
          </label>
        </div>
        <div className="mt-2">
          <input
            id="deptName"
            name="deptName"
            type="text"
            disabled
            value={BM?.Material?.Departement?.Name}
            className="block bg-gray-200 w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Form Buttons (Submit and Cancel) */}
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
          onClick={() => {
            ReturnThisMaterial();
          }}
        >
          Return
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default UpdateBMByUser;
