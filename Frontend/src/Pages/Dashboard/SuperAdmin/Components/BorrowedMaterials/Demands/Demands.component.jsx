/* eslint-disable react/prop-types */
import FormatDateToYYYYMMDD from "../../../../../../Utils/Other/FormatDateToYYYYMMDD";
import { FaUserPlus } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import toast from "react-hot-toast";
import UpdateBMStatus from "../../../../../../Utils/Update/UpdateBMStatus";

const Demands = ({ setOpen, BM }) => {
  const AcceptDemand = async () => {
    try {
      await UpdateBMStatus(BM.ID, { BMStatus: "Confirmed" });
      toast.success("Demand Accepted Successfully");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const DeclineDemand = async () => {
    try {
      await UpdateBMStatus(BM.ID, { BMStatus: "Cancelled" });
      toast.success("Demand Declined");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-center ">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
            <FaUserPlus className="h-6 w-6 text-sky-700" aria-hidden="true" />
          </div>
          <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Demand From {BM?.User?.FirstName} {BM.User?.LastName}
            </h3>
            <p className="text-sm text-gray-500">
              A New Demand Has Been Added On{" "}
              {FormatDateToYYYYMMDD(BM?.CreatedAt)}
            </p>
          </div>
        </div>
      </div>
      <MdOutlineClose
        onClick={() => setOpen(false)}
        className="absolute w-8 h-8 right-5 top-5 cursor-pointer text-sky-700 hover:text-sky-600"
      />
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
            value={`${BM?.User?.FirstName} ${BM.User?.LastName}`}
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
            value={BM?.Material?.Name}
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
            disabled
            value={FormatDateToYYYYMMDD(BM.DueDate)}
            className="block bg-gray-200  w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Buttons (Accpet and Decline) */}
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 sm:ml-3 sm:w-auto"
          onClick={() => {
            AcceptDemand();
          }}
        >
          Accept
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600  sm:mt-0 sm:w-auto"
          onClick={() => {
            DeclineDemand();
          }}
        >
          Decline
        </button>
      </div>
    </>
  );
};

export default Demands;
