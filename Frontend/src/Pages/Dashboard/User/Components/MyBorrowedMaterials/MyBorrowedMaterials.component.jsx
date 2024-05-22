import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FetchBorrowedByUserID from "../../../../../Utils/Fetch/FetchBorrowedByUserID";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const MyBorrowedMaterials = () => {
  const [borrowedMaterials, setBorrowedMaterials] = useState([]);

  const fetchBorrowedMaterials = async () => {
    try {
      const ID = localStorage.getItem("userID");
      const response = await FetchBorrowedByUserID(ID);
      setBorrowedMaterials(response);
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const formatDateString = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    fetchBorrowedMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <header>
        <h2 className="text-xl my-10 font-mdBold text-gray-900 leading-9 tracking-tight sm:text-3xl text-center">
          My Borrowed Materials
        </h2>
      </header>
      <div className="mb-16 overflow-x-auto ">
        <div className="inline-block min-w-full align-middle ">
          <div className="overflow-hidden  rounded-md shadow-sm">
            <table className="min-w-full font-outfit divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Material Name
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
                    className="px-6 py-3  text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    status
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200 hover:bg-gray-100">
                {borrowedMaterials.map((borrowedMaterial) => (
                  <tr key={borrowedMaterial.ID}>
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
                        borrowedMaterial.Returned
                          ? "text-emerald-500"
                          : "text-red-500",
                        "px-6 py-4 whitespace-nowrap text-right font-mdSemi text-sm"
                      )}
                    >
                      {borrowedMaterial.Returned ? "Returned" : "Not Returned"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBorrowedMaterials;
