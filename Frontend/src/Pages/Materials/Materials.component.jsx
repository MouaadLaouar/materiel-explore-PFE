import { useEffect, useState } from "react";
// import { MdMenu } from "react-icons/md";
import FetchMaterials from "../../Utils/Fetch/FetchMaterials";
import { Constants } from "../../Constants";
import useFilterMaterials from "../../Hooks/useFilterMaterials";

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const GetMaterials = async () => {
    try {
      const response = await FetchMaterials();
      setMaterials(
        response.sort((a, b) => {
          return new Date(b.CreatedAt) - new Date(a.CreatedAt);
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const FilteredMaterials = useFilterMaterials(materials, "", searchFilter);

  useEffect(() => {
    GetMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-mdBold text-gray-900 sm:text-3xl text-center">
            Materials
          </h2>
        </header>

        <div className="mt-8 flex items-center justify-between">
          {/* <div className="flex rounded border border-gray-100">
            <button className="inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </button>

            <button className="inline-flex size-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
              <MdMenu />
            </button>
          </div> */}

          {/* Filter */}
          <div className="mt-4 mb-12 mx-auto w-2/3 flex gap-8 font-outfit">
            {/* Search By Name Filter */}
            <input
              type="text"
              value={searchFilter}
              onChange={handleSearchChange}
              placeholder="Filter by Material Name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm"
            />

            {/* Select Dept Filter */}
            <select
              className=" w-36 border rounded px-2 py-1 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm"
              //   value={roleFilter}
              //   onChange={handleRoleChange}
            >
              <option value="">Departments</option>
              <option value="dept1">Dept 1</option>
              <option value="dept2">Dept 2</option>
              <option value="dept3">Dept 3</option>
              <option value="dept4">Dept 4</option>
            </select>
          </div>

          {/* <div>
            <label htmlFor="SortBy" className="sr-only">
              SortBy
            </label>

            <select
              id="SortBy"
              className="h-10 rounded border-gray-300 text-sm"
            >
              <option>Sort By</option>
              <option value="Title, DESC">Title, DESC</option>
              <option value="Title, ASC">Title, ASC</option>
              <option value="Price, DESC">Price, DESC</option>
              <option value="Price, ASC">Price, ASC</option>
            </select>
          </div> */}
        </div>

        {/* Materials Card */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FilteredMaterials.map((material) => (
            <li key={material.ID}>
              <div className="max-w-full min-h-full bg-white border border-gray-200 rounded-lg shadow ">
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src={`${Constants.BasedPictureUrl}/${material.Picture[0].Name}`}
                    alt=""
                  />
                </a>
                <div className="p-5 relative ">
                  <div>
                    <a href="#">
                      <h5 className="mt-6 mb-2 text-2xl font-mdBold tracking-tight text-gray-900">
                        {material.Name}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {material.Description}
                    </p>
                  </div>
                  {/* <div > */}
                  <a className="absolute top-0 right-0 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-bl-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 ">
                    View Details
                  </a>
                  {/* </div> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Materials;
