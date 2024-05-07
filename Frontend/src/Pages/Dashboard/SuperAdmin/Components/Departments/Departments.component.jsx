import { useEffect, useState } from "react";
import GetDept from "../../../../../Utils/Fetch/GetDept";

import deptLogo from "../../../../../assets/dept2.png";
import PopUp from "../../../../../Components/PopUp";
import AddDept from "./Components/AddDept.component";

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
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Department
      </button>{" "}
      <ul role="list" className="divide-y divide-gray-100">
        {departments.map((dept) => (
          <li
            key={dept.ID}
            className="flex  justify-between gap-x-6 py-5 px-8"
          >
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
                  <b className="text-sky-700">Email : </b>
                  <a
                    className="hover:text-sky-700"
                    href={`mailto:${dept.Email}`}
                  >
                    {dept.Email}
                  </a>
                </p>
                <p className="mt-1 truncate text-sm font-mdMed leading-5 text-black">
                  <b className="text-sky-700">Phone : </b>
                  {dept.Phone}
                </p>
              </div>
            </div>
            {/* <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen{" "}
                  <time dateTime={person.lastSeenDateTime}>
                    {person.lastSeen}
                  </time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div> */}
          </li>
        ))}
      </ul>
      <PopUp open={open} setOpen={setOpen}>
        <AddDept
          setOpen={setOpen}
          setDepartments={setDepartments}
          departments={departments}
        />
      </PopUp>
    </>
  );
}
