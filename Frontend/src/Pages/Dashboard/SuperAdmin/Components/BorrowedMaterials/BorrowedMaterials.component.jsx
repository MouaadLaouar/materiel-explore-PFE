import formatDateString from "../../../../../Utils/Other/FormatDate";
import useFilterBMBySuperAdmin from "../../../../../Hooks/useFilterBMBySuperAdmin";
import { useState } from "react";
import PopUp from "../../../../../Components/PopUp";
import Demands from "./Demands";
import ReturnBM from "./ReturnBM/ReturnBM.component";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BorrowedMaterials = () => {
  const [radioValue, setRadioValue] = useState("demands");
  const [open, setOpen] = useState(false);
  const [selectedBM, setSelectedBM] = useState({});

  const { currentMaterials, demands, history, refreshData } =
    useFilterBMBySuperAdmin();

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  let FilteredBM = [];
  if (radioValue === "currentMaterials") {
    FilteredBM = currentMaterials;
  } else if (radioValue === "demands") {
    FilteredBM = demands;
  } else if (radioValue === "history") {
    FilteredBM = history;
  }

  return (
    <>
      <header>
        <h2 className="text-xl mt-10 font-mdBold text-gray-900 leading-9 tracking-tight sm:text-3xl text-center">
          {radioValue === "demands" && "Demands"}
          {radioValue === "currentMaterials" && "Current Materials"}
          {radioValue === "history" && "Borrowing History"}
        </h2>
        <p className="text-sm mt-4 mb-10 font-mdReg text-gray-700 leading-4 tracking-tight sm:text-[1rem] text-center">
          {radioValue === "demands" &&
            "Heres All The Demands Waiting To Be Approved"}
          {radioValue === "currentMaterials" &&
            "Heres All The Actif Borrowed Materials"}
          {radioValue === "history" && "Heres All The Borrowing History"}
        </p>
      </header>

      <div className="flex sm:flex-row flex-col font-outfit mt-16 mb-10 w-1/2 sm:w-2/3 mx-auto  border-[2px] border-gray-200 bg-gray-100 rounded-xl select-none">
        <label className="radio flex sm:w-1/3 w-full items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            name="radio"
            value="currentMaterials"
            className="peer hidden"
            checked={radioValue === "currentMaterials"}
            onChange={handleRadioChange}
          />
          <span className="bg-white w-full text-center peer-checked:bg-gradient-to-r peer-checked:from-[teal] peer-checked:to-[#2f9797] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            Active Loans
          </span>
        </label>

        <label className="radio relative flex sm:w-1/3 w-full items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            name="radio"
            value="demands"
            className="peer hidden"
            checked={radioValue === "demands"}
            onChange={handleRadioChange}
          />
          <span className="bg-white w-full text-center peer-checked:bg-gradient-to-r peer-checked:from-[teal] peer-checked:to-[#2f9797] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            Demands
          </span>
          <div className="absolute top-0 right-0 flex justify-center items-center text-white font-mdSemi text-xs bg-red-700 w-4 h-4 rounded-[50%]">
            {demands.length}
          </div>
        </label>

        <label className="radio flex sm:w-1/3 w-full items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            name="radio"
            value="history"
            className="peer hidden"
            checked={radioValue === "history"}
            onChange={handleRadioChange}
          />
          <span className="bg-white w-full text-center peer-checked:bg-gradient-to-r peer-checked:from-[teal] peer-checked:to-[#2f9797] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            History
          </span>
        </label>
      </div>
      <p className="text-sm mt-2 mb-8 font-mdReg text-sky-700 leading-4 tracking-tight sm:text-[1rem] text-center">
        {radioValue === "demands" &&
          "Click On The Demand To Approve It Or Decline It"}
        {radioValue === "currentMaterials" &&
          "Click On The Current Borrowed Material To Return It"}
      </p>

      <div className="mb-16 overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md shadow-sm">
            {FilteredBM.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xl my-10 font-mdBold text-gray-900 leading-9 tracking-tight sm:text-3xl text-center">
                  No Borrowed Materials Found
                </p>
              </div>
            ) : (
              <table className="min-w-full font-outfit divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      N&deg;
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Material
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Due Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Borrowed At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Is Returned
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {FilteredBM.map((borrowedMaterial, index) => (
                    <tr
                      key={borrowedMaterial.ID}
                      className="hover:bg-gray-100"
                      onClick={() => {
                        if (radioValue !== "history") {
                          setSelectedBM(borrowedMaterial);
                          setOpen(true);
                        }
                      }}
                    >
                      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                        {borrowedMaterial.User.FirstName}{" "}
                        {borrowedMaterial.User.LastName}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                        {borrowedMaterial.Material.Name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                        {borrowedMaterial.Material.Departement.Name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-600">
                        {formatDateString(borrowedMaterial.DueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-600">
                        {formatDateString(borrowedMaterial.CreatedAt)}
                      </td>
                      <td
                        className={classNames(
                          borrowedMaterial.BMStatus === "Confirmed" &&
                            "text-emerald-500",
                          (borrowedMaterial.BMStatus === "NotConfirmed" ||
                            borrowedMaterial.BMStatus === "Cancelled") &&
                            "text-red-500",
                          "px-6 py-4 whitespace-nowrap text-right font-mdSemi text-sm"
                        )}
                      >
                        {borrowedMaterial.BMStatus.replace(
                          /([A-Z])/g,
                          " $1"
                        ).trim()}
                      </td>
                      <td
                        className={classNames(
                          borrowedMaterial.Returned
                            ? "text-emerald-500"
                            : "text-red-500",
                          "px-6 py-4 whitespace-nowrap text-center font-mdSemi text-sm"
                        )}
                      >
                        {borrowedMaterial.BMStatus === "Confirmed"
                          ? borrowedMaterial.Returned
                            ? "Yes"
                            : "No"
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <PopUp open={open} setOpen={setOpen}>
        {radioValue === "demands" && (
          <Demands
            setOpen={setOpen}
            BM={selectedBM}
            refreshData={refreshData}
          />
        )}
        {radioValue === "currentMaterials" && (
          <ReturnBM
            setOpen={setOpen}
            BM={selectedBM}
            refreshData={refreshData}
          />
        )}
      </PopUp>
    </>
  );
};

export default BorrowedMaterials;
