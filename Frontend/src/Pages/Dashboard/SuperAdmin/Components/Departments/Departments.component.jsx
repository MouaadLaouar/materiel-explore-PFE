import { useEffect, useState } from "react";
import GetDept from "../../../../../Utils/Fetch/GetDept";

import deptLogo from "../../../../../assets/dept4.png";
import PopUp from "../../../../../Components/PopUp";
import AddDept from "./Components/AddDept.component";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);

  const getDepartments = async () => {
    try {
      const data = await GetDept();
      setDepartments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <>
      <h1 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Departments List
      </h1>

      <div className="w-full flex justify-end px-10 pb-5">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
          onClick={() => {
            setOpen(true);
          }}
        >
          <IoMdAddCircleOutline />
          &nbsp; Add Department
        </button>{" "}
      </div>
      <ul role="list" className="divide-y divide-gray-200 ">
        {departments.map((dept) => (
          <li key={dept.ID} className="flex justify-between gap-x-24 py-5 px-8">
            <div className="flex items-center min-w-0 gap-x-4">
              <img
                className="h-10 w-10 flex-none  bg-gray-50"
                src={deptLogo}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-md font-mdBold leading-6 text-gray-900">
                  {dept.Name}
                </p>
                <p className="mt-1 truncate text-sm font-mdMed leading-5 text-black">
                  <b className="text-teal-600">Email : </b>
                  <a
                    className="hover:text-sky-700"
                    href={`mailto:${dept.Email}`}
                  >
                    {dept.Email}
                  </a>
                </p>
                <p className="mt-1 truncate text-sm font-mdMed leading-5 text-black">
                  <b className="text-teal-600">Phone : </b>
                  {dept.Phone}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start w-60">
              <p className="text-sm leading-6 font-mdBold text-teal-600">
                Admin
              </p>
              <p className="text-sm font-mdMed leading-6 text-black">
                {dept.Admin.FirstName}&nbsp;{dept.Admin.LastName}
              </p>
              <p className="text-sm font-mdMed leading-6 text-black">
                <a className="hover:text-sky-700" href={`mailto:${dept.Email}`}>
                  {dept.Admin.Email}
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <PopUp open={open} setOpen={setOpen}>
        <AddDept setOpen={setOpen} getDepartments={getDepartments} />
      </PopUp>
    </>
  );
}
