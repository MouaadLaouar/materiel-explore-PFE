/* eslint-disable react/prop-types */
import { CgProfile } from "react-icons/cg";

const UserInfo = ({ setOpen, User }) => {
  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-center">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
            <CgProfile className="h-6 w-6 text-sky-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-xl font-mdBold leading-6 text-gray-900">
              User Information
            </h3>
          </div>
        </div>
      </div>
      <div className="my-5">
        <h1 className="text-2xl font-mdBold px-8 mb-6">
          {User.FirstName}&nbsp;
          {User.LastName}
        </h1>
        <p className="text-base font-outfit px-8 my-3">
          <span className="font-mdBold text-sky-600">Email : </span>{" "}
          {User.Email}
        </p>
        <p className="text-base font-outfit px-8 tracking-wider my-3">
          <span className="font-mdBold text-sky-600 tracking-normal">
            Phone :{" "}
          </span>{" "}
          {User.Phone}
        </p>
        <div className=" flex justify-center mt-8">
          <select
            defaultValue={User.Role}
            className=" w-36 border rounded px-2 py-1 focus:outline-none focus:ring-sky-600 focus:border-sky-500 "
          >
            <option value="USER">User </option>
            <option value="ADMIN">Admin </option>
            <option value="SUPERADMIN">Super Admin </option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
          onClick={() => {
            // checkPassword();
            setOpen(false);
          }}
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default UserInfo;
