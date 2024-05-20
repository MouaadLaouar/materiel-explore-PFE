const BorrowedMaterials = () => {
  return (
    <>
      <header>
        <h2 className="text-xl my-10 font-mdBold text-gray-900 leading-9 tracking-tight sm:text-3xl text-center">
          Borrowed Materials
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Material Name
                  </th>
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
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reserved At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200 hover:bg-gray-100">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                    Microscope
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap tracking-wider text-left text-sm text-gray-600">
                    Djoudi Islem
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-600">
                    1 Month
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-600">
                    20/05/2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                    Not returned
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* <button
                        className="text-teal-600 hover:text-teal-800 cursor-pointer outline-none"
                      >
                        Edit
                      </button> */}
                    Edit
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BorrowedMaterials;
