import { useEffect, useState } from "react";
import FetchAllUsersData from "../../../../../Utils/Fetch/FetchAllUsersData";
import useFilterUsers from "../../../../../Hooks/useFilterUsers";
import PopUp from "../../../../../Components/PopUp";
import PasswordConfirmation from "../../../../../Components/PasswordConfirmation";
import FetchUserById from "../../../../../Utils/Fetch/FetchUserById";
import UserInfo from "./Components/UserInfo.component";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Filters States
  const [searchFilter, setSearchFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // PopUp and Password Confirmation States
  const [open, setOpen] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [password, setPassword] = useState("");
  const [myEmail, setMyEmail] = useState("");

  const [selectedUserId, setSelectedUserId] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await FetchAllUsersData();
      const sortedUsers = response.sort((a, b) => {
        return new Date(b.CreatedAt) - new Date(a.CreatedAt);
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const getActualUserData = async () => {
    try {
      const ID = localStorage.getItem("userID");
      const response = await FetchUserById(ID);
      setMyEmail(response.Email);
    } catch (error) {
      console.error(error);
    }
  };

  const FilteredUsers = useFilterUsers(users, roleFilter, searchFilter);

  useEffect(() => {
    fetchUsers();
    getActualUserData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
    setSearchFilter("");
  };

  return (
    <div className="flex flex-col">
      <h1 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Users
      </h1>
      {/* Filter */}
      <div className="mt-4 mb-12 mx-auto w-2/3 flex gap-8 font-outfit">
        {/* Search By Name Filter */}
        <input
          type="text"
          value={searchFilter}
          onChange={handleSearchChange}
          placeholder="Filter by name..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm"
        />

        {/* Select Role Filter */}
        <select
          className=" w-36 border rounded px-2 py-1 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm"
          value={roleFilter}
          onChange={handleRoleChange}
        >
          <option value="">All Roles</option>
          <option value="USER">User </option>
          <option value="ADMIN">Admin </option>
        </select>
      </div>

      <div className="-my-2 overflow-x-auto ">
        <div className="inline-block min-w-full align-middle ">
          <div className="overflow-hidden  rounded-md shadow-sm">
            <table className="min-w-full font-outfit divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {FilteredUsers.map((user) => (
                  <tr key={user.ID}>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                      {user.FirstName}
                      &nbsp;
                      {user.LastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap tracking-wider text-left text-sm text-gray-600">
                      {user.Phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-600">
                      {user.Email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                      {user.Role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-teal-600 hover:text-teal-800 cursor-pointer outline-none"
                        onClick={() => {
                          setOpen(true);
                          setSelectedUserId(user);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PopUp open={open} setOpen={setOpen}>
        {isPasswordCorrect ? (
          <PasswordConfirmation
            setOpen={setOpen}
            Email={myEmail}
            setIsPasswordCorrect={setIsPasswordCorrect}
            password={password}
            setPassword={setPassword}
          />
        ) : (
          <UserInfo
            setOpen={setOpen}
            User={selectedUserId}
            users={users}
            setUsers={setUsers}
          />
        )}
      </PopUp>
    </div>
  );
};

export default Users;
