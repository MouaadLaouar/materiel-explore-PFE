import useFilterBMByAdmin from "../../../../../Hooks/useFilterBMByAdmin";
import formatDateString from "../../../../../Utils/Other/FormatDate";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MyDeptBorrowedMaterials = () => {
  const [radioValue, setRadioValue] = useState("demands");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const adminID = localStorage.getItem("userID");
  const { currentMaterials, demands, history } = useFilterBMByAdmin(adminID);

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
        <h2 className="text-xl my-10 font-mdBold text-gray-900 leading-9 tracking-tight sm:text-3xl text-center">
          Borrowed Materials
        </h2>
      </header>

      <div className="flex font-outfit mt-16 mb-10 w-full sm:w-1/2 mx-auto space-x-2 border-[2px] border-gray-200 bg-gray-100 rounded-xl select-none">
        <label className="radio flex w-1/3 items-center justify-center rounded-lg p-1 cursor-pointer">
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

        <label className="radio flex w-1/3 items-center justify-center rounded-lg p-1 cursor-pointer">
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
        </label>

        <label className="radio flex w-1/3 items-center justify-center rounded-lg p-1 cursor-pointer">
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
      {/* {deptID && ( */}
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
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                    <tr key={borrowedMaterial.ID} className="hover:bg-gray-100">
                      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                        {borrowedMaterial.User.FirstName}{" "}
                        {borrowedMaterial.User.LastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
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
                            ? "Returned"
                            : "Not Returned"
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
      {/* )} */}
    </>
  );
};

export default MyDeptBorrowedMaterials;
