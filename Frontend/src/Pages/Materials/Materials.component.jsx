import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Constants } from "../../Constants";
import FetchMaterials from "../../Utils/Fetch/FetchMaterials";
import useFilterMaterials from "../../Hooks/useFilterMaterials";
import Loader from "../../Components/Loader/Loader.component";
import GetDept from "../../Utils/Fetch/GetDept";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchFilter, setSearchFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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
    } finally {
      setLoading(false);
    }
  };

  const getDepartments = async () => {
    try {
      const data = await GetDept();
      setDepartments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleDeptChange = (e) => {
    setDeptFilter(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const FilteredMaterials = useFilterMaterials(
    materials,
    deptFilter,
    searchFilter,
    statusFilter
  );

  useEffect(() => {
    GetMaterials();
    getDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (materials.length === 0) {
    return (
      <h1 className="text-center font-mdBold text-3xl mt-32 mb-[18rem]">
        No Materials Found
      </h1>
    );
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-mdBold text-gray-900 sm:text-3xl text-center">
            Materials
          </h2>
        </header>

        <div className="mt-8 flex items-center justify-between">
          {/* Filter */}
          <div className="mt-4 mb-12 mx-auto w-3/4 sm:flex  gap-8 font-outfit">
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
              className=" w-full border rounded px-2 py-1 sm:mt-0 sm:w-60 mt-8 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm"
              value={deptFilter}
              onChange={handleDeptChange}
            >
              <option value="">All Departments</option>
              {departments.map((Departement) => (
                <option key={Departement.ID} value={Departement.ID}>
                  {Departement.Name}
                </option>
              ))}
            </select>

            <select
              className=" w-full border rounded px-2 py-1 sm:mt-0 sm:w-60 mt-8 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="">All Status</option>
              <option value="Available">Available</option>
              <option value="NotAvailable">NotAvailable</option>
              <option value="UnderRepair">Under Repair</option>
              <option value="ComingSoon">Coming Soon</option>
              <option value="OutOfService">Out Of Service</option>
            </select>
          </div>
        </div>

        {FilteredMaterials.length === 0 && (
          <h1 className="text-center font-mdBold text-3xl mb-[18rem]">
            No Materials Found
          </h1>
        )}

        {/* Materials Card */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FilteredMaterials.map((material) => (
            <li key={material.ID}>
              <div className="max-w-full min-h-full bg-white border border-gray-200 rounded-lg shadow ">
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    loading="lazy"
                    className="rounded-t-lg w-full h-60 object-cover transform transition-transform duration-300 hover:scale-105"
                    src={`${Constants.BasedPictureUrl}/${material.Picture[0].Name}`}
                    alt=""
                  />
                </div>
                <div className="p-5 relative ">
                  <div>
                    <h5 className="mt-6 mb-1 text-2xl font-mdBold tracking-tight text-gray-900">
                      {material.Name}
                    </h5>
                    <h6 className=" mb-2 text-md font-mdSemi tracking-normal text-teal-600">
                      {material.Departement.Name}
                    </h6>
                    <p className="mb-3 font-mdReg text-gray-700 dark:text-gray-400">
                      {material.Description}
                    </p>
                    <p
                      className={classNames(
                        material.Status === "Available" && "text-emerald-500",
                        material.Status === "NotAvailable" && "text-red-500",
                        material.Status === "OutOfService" && "text-gray-500",
                        material.Status === "UnderRepair" && "text-yellow-500",
                        material.Status === "ComingSoon" && "text-blue-500",
                        "absolute top-0 left-0 inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-br-lg"
                      )}
                    >
                      {material.Status.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                  </div>
                  <Link
                    to={`${material.ID}`}
                    className="absolute hover:cursor-pointer top-0 right-0 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-bl-lg hover:bg-teal-800  focus:outline-none  "
                  >
                    View Details
                  </Link>
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
