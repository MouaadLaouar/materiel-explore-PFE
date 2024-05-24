/* eslint-disable react/prop-types */
import useFilterBMByUser from "../../Hooks/useFilterBMByUser";
import formatDateString from "../../Utils/Other/FormatDate";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BMTable = ({ Filter }) => {
  const userID = localStorage.getItem("userID");
  const { currentMaterials, demands, history } = useFilterBMByUser(userID);

  let filteredData;
  switch (Filter) {
    case "demands":
      filteredData = demands;
      break;
    case "currentMaterials":
      filteredData = currentMaterials;
      break;
    case "history":
      filteredData = history;
      break;
    default:
      filteredData = [];
  }

  return (
    <>
      <header>
        <h2 className="text-xl mt-10 font-mdBold text-gray-900 leading-9 tracking-tight sm:text-3xl text-center">
          {Filter === "demands" && "My Demands"}
          {Filter === "currentMaterials" && "My Current Materials"}
          {Filter === "history" && "My Borrowing History"}
        </h2>
        <p className="text-sm mt-4 mb-10 font-mdReg text-gray-700 leading-4 tracking-tight sm:text-[1rem] text-center">
          {Filter === "demands" &&
            "Heres All Your Demands Waiting To Be Approved"}
          {Filter === "currentMaterials" &&
            "Heres All Your Actif Borrowed Materials"}
          {Filter === "history" && "Heres All Your Borrowing History"}
        </p>
      </header>
      <div className="mb-16 overflow-x-auto ">
        <div className="inline-block min-w-full align-middle ">
          <div className="overflow-hidden rounded-md shadow-sm">
            {filteredData.length === 0 ? (
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                  {filteredData.map((borrowedMaterial) => (
                    <tr key={borrowedMaterial.ID} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
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
    </>
  );
};

export default BMTable;
