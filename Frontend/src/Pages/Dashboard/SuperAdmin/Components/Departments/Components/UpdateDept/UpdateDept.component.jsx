/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxUpdate } from "react-icons/rx";
import UpdateDepartment from "../../../../../../../Utils/Update/UpdateDepartment";
import FetchAdmins from "../../../../../../../Utils/Fetch/FetchAdmins";

const UpdateDept = ({
  setOpen,
  selectedDept,
  getDepartments,
  setIsPasswordCorrect,
  setPassword,
}) => {
  const [admins, setAdmins] = useState([]);

  const [dept, setDept] = useState({
    Id: selectedDept.ID,
    Name: selectedDept.Name,
    Email: selectedDept.Email,
    Phone: selectedDept.Phone,
    Admin: selectedDept.UserId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDept((prevDeptData) => ({
      ...prevDeptData,
      [name]: value,
    }));
  };
  const isUserDataEmpty = () => {
    for (let key in dept) {
      if (dept[key] === "") {
        return true;
      }
    }
    return false;
  };
  const FetchAllAdmins = async () => {
    try {
      const response = await FetchAdmins();
      setAdmins(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    FetchAllAdmins();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isUserDataEmpty()) {
        await UpdateDepartment(dept);
        toast.success("Department Updated Successfully");
        getDepartments();
        setOpen(false);
        setIsPasswordCorrect(true);
        setPassword("");
      } else {
        toast.error("Fill All The Fields");
      }
    } catch (error) {
      console.error(error);
      toast.error("An Error Occured");
    }
  };

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-center">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
            <RxUpdate className="h-6 w-6 text-sky-700" aria-hidden="true" />
          </div>
          <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Update Department
            </h3>
            <p className="text-sm text-gray-500">
              Update Previous Information For This Department Here
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        {/* Name */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="deptName"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Department Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="deptName"
              name="Name"
              type="text"
              value={dept.Name}
              onChange={handleInputChange}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3"></span>
        </div>

        {/* Email */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="deptEmail"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
          </div>
          <div className="mt-2">
            <input
              id="deptEmail"
              name="Email"
              type="email"
              value={dept.Email}
              onChange={handleInputChange}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3"></span>
        </div>

        {/* Admin */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900">
              Admin
            </label>
          </div>
          <div className="mt-2">
            <select
              name="Admin"
              value={dept.Admin}
              onChange={handleInputChange}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Admin</option>
              {admins.map((admin) => (
                <option key={admin.ID} value={admin.ID}>
                  {admin.FirstName}&nbsp;
                  {admin.LastName}
                </option>
              ))}
            </select>
          </div>

          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3"></span>
        </div>

        {/* Phone Number */}
        <div className="my-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="deptPhone"
              className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
            >
              Phone
            </label>
          </div>
          <div className="mt-2">
            <input
              id="deptPhone"
              name="Phone"
              type="text"
              value={dept.Phone}
              onChange={handleInputChange}
              className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span className="block text-sm font-medium leading-6 text-red-600 text-center mt-3"></span>
        </div>

        {/* Form Buttons (Submit and Cancel) */}
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
          >
            Confirm
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateDept;
