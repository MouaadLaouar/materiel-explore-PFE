import { useEffect, useState } from "react";
import GetDept from "../../../../../Utils/Fetch/GetDept";
import { MdOutlineClose } from "react-icons/md";
import deptLogo from "../../../../../assets/dept4.png";
import { IoMdAddCircleOutline } from "react-icons/io";
import FetchUserById from "../../../../../Utils/Fetch/FetchUserById";
import PasswordConfirmation from "../../../../../Components/PasswordConfirmation";
import PopUp from "../../../../../Components/PopUp";
import AddDept from "./Components/AddDept";
import UpdateDept from "./Components/UpdateDept";
import DeleteDept from "./Components/DeleteDept/DeleteDept.component";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [password, setPassword] = useState("");
  const [myEmail, setMyEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");

  const getActualUserData = async () => {
    try {
      const ID = localStorage.getItem("userID");
      const response = await FetchUserById(ID);
      setMyEmail(response.Email);
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    getDepartments();
    getActualUserData();
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
            setPage("addDept");
          }}
        >
          <IoMdAddCircleOutline />
          &nbsp; Add Department
        </button>{" "}
      </div>
      <ul role="list" className="divide-y mb-16 divide-gray-200 ">
        {departments.map((dept) => (
          <li
            onClick={() => {
              if (!isPasswordCorrect) {
                setSelectedDept(dept);
                setOpen(true);
                setPage("updateDept");
              } else {
                setOpen(true);
                setPage("ConfirmPass");
              }
            }}
            key={dept.ID}
            className="relative hover:bg-gray-100 flex justify-between gap-x-24 py-5 px-8"
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
                  <b className="text-teal-600">Email : </b>
                  <a
                    className="hover:text-sky-700 z-10"
                    href={`mailto:${dept.Email}`}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
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
            <MdOutlineClose
              onClick={(e) => {
                e.stopPropagation();
                if (!isPasswordCorrect) {
                  setSelectedDept(dept);
                  setOpen(true);
                  setPage("deleteDept");
                } else {
                  setOpen(true);
                  setPage("ConfirmPass");
                }
              }}
              className="absolute z-10 text-teal-700 hover:text-teal-500 right-4 top-4 w-6 h-6"
            />
          </li>
        ))}
      </ul>
      <PopUp open={open} setOpen={setOpen}>
        {page === "ConfirmPass" && (
          <PasswordConfirmation
            setOpen={setOpen}
            Email={myEmail}
            setIsPasswordCorrect={setIsPasswordCorrect}
            password={password}
            setPassword={setPassword}
          />
        )}
        {page === "addDept" && (
          <AddDept setOpen={setOpen} getDepartments={getDepartments} />
        )}
        {page === "updateDept" && (
          <UpdateDept
            setOpen={setOpen}
            setPassword={setPassword}
            getDepartments={getDepartments}
            selectedDept={selectedDept}
            setIsPasswordCorrect={setIsPasswordCorrect}
          />
        )}

        {page === "deleteDept" && (
          <DeleteDept
            setOpen={setOpen}
            setPassword={setPassword}
            getDepartments={getDepartments}
            selectedDept={selectedDept}
            setIsPasswordCorrect={setIsPasswordCorrect}
          />
        )}
      </PopUp>
    </>
  );
}
