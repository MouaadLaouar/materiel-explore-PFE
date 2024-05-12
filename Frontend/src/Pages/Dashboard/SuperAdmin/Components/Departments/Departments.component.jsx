import { useEffect, useState } from "react";
import GetDept from "../../../../../Utils/Fetch/GetDept";
import { MdOutlineClose } from "react-icons/md";
import deptLogo from "../../../../../assets/dept4.png";
import PopUp from "../../../../../Components/PopUp";
import AddDept from "./Components/AddDept.component";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import DeleteDept from "../../../../../Utils/Delete/DeleteDept";
import FetchUserById from "../../../../../Utils/Fetch/FetchUserById";
import PasswordConfirmation from "../../../../../Components/PasswordConfirmation";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [password, setPassword] = useState("");
  const [myEmail, setMyEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");

  const getDepartments = async () => {
    try {
      const data = await GetDept();
      setDepartments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      if (!isPasswordCorrect) {
        const response = await DeleteDept(id);
        if (response.ID) {
          toast.success("Department Deleted Successfully");
          getDepartments();
          setIsPasswordCorrect(true);
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Enter Your Password First");
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  // console.log(isPasswordCorrect);

  const getActualUserData = async () => {
    try {
      const ID = localStorage.getItem("userID");
      const response = await FetchUserById(ID);
      setMyEmail(response.Email);
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
      <ul role="list" className="divide-y divide-gray-200 ">
        {departments.map((dept) => (
          <li
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
            <MdOutlineClose
              onClick={() => {
                if (!isPasswordCorrect) {
                  deleteDepartment(dept.ID);
                } else {
                  setOpen(true);
                  setPage("deleteDept");
                }
              }}
              className="absolute text-teal-700 hover:text-teal-500 right-4 top-4 w-6 h-6"
            />
          </li>
        ))}
      </ul>
      <PopUp open={open} setOpen={setOpen}>
        {page === "deleteDept" && (
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
      </PopUp>
    </>
  );
}
