import { useEffect, useState } from "react";
import FetchUserById from "../../../../../Utils/Fetch/FetchUserById";
import { MdOutlineUpdate } from "react-icons/md";
import PopUp from "../../../../../Components/PopUp";
import PasswordConfirmation from "../../../../../Components/PasswordConfirmation";
import UpdateMyDept from "./Components/UpdateMyDept.component";

const Department = () => {
  const [admin, setAdmin] = useState({});
  const [dept, setDept] = useState({});

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");

  const getActualUserData = async () => {
    try {
      const ID = localStorage.getItem("userID");
      const response = await FetchUserById(ID);
      // console.log(response);
      setAdmin(response);
      setDept(response.Departement[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActualUserData();
  });
  return (
    <>
      <h1 className="my-10 text-center text-2xl font-mdBold leading-9 tracking-tight text-gray-900">
        My Department
      </h1>

      <div className="w-[90%] border-[1px] bg-white rounded-lg [box-shadow:0_0_5px_rgba(117,_117,_117,_0.3)] mx-auto">
        <h1 className=" text-4xl first-letter:text-teal-600 mt-8 mb-12 font-mdBold text-center ">
          {dept.Name}
        </h1>
        <div className=" flex flex-col px-8 sm:px-0 sm:flex-row justify-around my-8">
          <p className="mt-1 truncate text-sm my-8 sm:my-0 font-mdMed leading-5 text-black">
            <b className="text-teal-700 text-xl">Email : </b>
            <a className=" z-10 text-[1.1rem] font-outfit">{dept.Email}</a>
          </p>
          <p className="mt-1 truncate text-sm font-mdMed leading-5 text-black">
            <b className="text-teal-600 text-xl">Phone : </b>
            <a className=" z-10 text-[1.1rem] font-outfit">{dept.Phone}</a>
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center mt-8 px-10 pb-5">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
          onClick={() => {
            if (!isPasswordCorrect) {
              setOpen(true);
              setPage("updateDept");
            } else {
              setOpen(true);
              setPage("ConfirmPass");
            }
          }}
        >
          <MdOutlineUpdate />
          &nbsp; Update My Department
        </button>{" "}
      </div>

      <PopUp open={open} setOpen={setOpen}>
        {page === "ConfirmPass" && (
          <PasswordConfirmation
            setOpen={setOpen}
            Email={admin.Email}
            setIsPasswordCorrect={setIsPasswordCorrect}
            password={password}
            setPassword={setPassword}
          />
        )}

        {page === "updateDept" && (
          <UpdateMyDept
            admin={admin}
            setOpen={setOpen}
            setPassword={setPassword}
            getActualUserData={getActualUserData}
            myDept={dept}
            setIsPasswordCorrect={setIsPasswordCorrect}
          />
        )}
      </PopUp>
    </>
  );
};

export default Department;
