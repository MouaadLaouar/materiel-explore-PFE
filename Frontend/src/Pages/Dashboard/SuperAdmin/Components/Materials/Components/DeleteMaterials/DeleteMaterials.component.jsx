/* eslint-disable react/prop-types */
import { MdDeleteSweep } from "react-icons/md";
import toast from "react-hot-toast";
import DeleteMaterial from "../../../../../../../Utils/Delete/DeleteMaterials";
const DeleteMaterials = ({
  setOpen,
  getMaterials,
  setIsPasswordCorrect,
  selectedMaterial,
  setPassword,
}) => {
  const deleteMaterial = async () => {
    try {
      const response = await DeleteMaterial(selectedMaterial.ID);
      if (response.ID) {
        toast.success("Department Deleted Successfully");
        getMaterials();
        setOpen(false);
        setIsPasswordCorrect(true);
        setPassword("");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };
  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-center">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <MdDeleteSweep
              className="h-6 w-6 text-red-700"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Delete Material
            </h3>
            <p className="text-sm text-gray-500">
              Delete Material Completly and Permanently From Database
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base font-mdBold my-8 text-center leading-6 text-gray-900">
          Are You Sure You Want To Delete This Material ?
        </h3>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={() => deleteMaterial()}
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
      </div>
    </>
  );
};

export default DeleteMaterials;
