/* eslint-disable react/prop-types */

import { FaShieldAlt } from "react-icons/fa";
import SignIn from "../../Utils/Authentification/SignIn";
import toast from "react-hot-toast";

const PasswordConfirmation = ({
  setOpen,
  Email,
  setIsPasswordCorrect,
  password,
  setPassword,
}) => {
  const checkPassword = async () => {
    try {
      if (password !== "") {
        const data = await SignIn(Email, password);
        if (data.ID) {
          toast.success("Success");
          setOpen(false);
          setTimeout(() => {
            setIsPasswordCorrect(false);
          }, 2000);
        } else {
          toast.error("Wrong Password");
        }
      } else {
        toast.error("Enter Your Password");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <FaShieldAlt className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Connect With Your Password
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                For Security Reasons , You need To Write Your Password Below To
                Modify Your Informations
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="myPassword"
            className=" w-10/12 m-auto block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="myPassword"
            name="myPassword"
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="current-password"
            className="block w-10/12 m-auto rounded-md border-0 px-2 font-outfit py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => {
            checkPassword();
          }}
        >
          Submit
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

export default PasswordConfirmation;
