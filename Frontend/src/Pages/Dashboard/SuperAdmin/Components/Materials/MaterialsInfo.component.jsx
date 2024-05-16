/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FetchMaterials from "../../../../../Utils/Fetch/FetchMaterials";
import { Constants } from "../../../../../Constants";
import { IoIosAddCircleOutline } from "react-icons/io";
import PasswordConfirmation from "../../../../../Components/PasswordConfirmation";
import PopUp from "../../../../../Components/PopUp";
import FetchUserById from "../../../../../Utils/Fetch/FetchUserById";
import AddMaterials from "./Components/AddMaterials";
import DeleteMaterials from "./Components/DeleteMaterials/DeleteMaterials.component";
import UpdateMaterials from "./Components/UpdateMaterials/UpdateMaterials.component";
import ShowMaterialPicture from "./Components/ShowMaterialPicture";

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [password, setPassword] = useState("");
  const [myEmail, setMyEmail] = useState("");

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

  useEffect(() => {
    GetMaterials();
    getActualUserData();
  }, []);
  return (
    <>
      <h1 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Materials List
      </h1>

      <div className="w-full flex justify-end px-10 pb-5">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
          onClick={() => {
            setOpen(true);
            setPage("addMaterials");
          }}
        >
          <IoIosAddCircleOutline />
          &nbsp; Add Material
        </button>{" "}
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
                    Picture
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Delete
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
                {materials.map((material) => (
                  <tr key={material.ID} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-600">
                      <img
                        onClick={() => {
                          setOpen(true);
                          setPage("showPicture");
                          setSelectedMaterial(material);
                        }}
                        loading="lazy"
                        className="rounded h-12 bg-cover"
                        src={`${Constants.BasedPictureUrl}/${material.Picture[0].Name}`}
                        alt=""
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                      {material.Name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap tracking-wider text-left text-sm text-gray-600">
                      {material.Departement.Name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-red-600 hover:text-red-800 cursor-pointer outline-none"
                        onClick={() => {
                          if (!isPasswordCorrect) {
                            setSelectedMaterial(material);
                            setOpen(true);
                            setPage("deleteDept");
                          } else {
                            setOpen(true);
                            setPage("ConfirmPass");
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-teal-600 hover:text-teal-800 cursor-pointer outline-none"
                        onClick={() => {
                          if (!isPasswordCorrect) {
                            setSelectedMaterial(material);
                            setOpen(true);
                            setPage("updateMaterial");
                          } else {
                            setOpen(true);
                            setPage("ConfirmPass");
                          }
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
        {page === "ConfirmPass" && (
          <PasswordConfirmation
            setOpen={setOpen}
            Email={myEmail}
            password={password}
            setPassword={setPassword}
            setIsPasswordCorrect={setIsPasswordCorrect}
          />
        )}
        {page === "addMaterials" && (
          <AddMaterials setOpen={setOpen} GetMaterials={GetMaterials} />
        )}
        {page === "showPicture" && (
          <ShowMaterialPicture
            setOpen={setOpen}
            selectedMaterial={selectedMaterial}
          />
        )}
        {page === "updateMaterial" && (
          <UpdateMaterials
            setOpen={setOpen}
            setPassword={setPassword}
            getMaterials={GetMaterials}
            selectedMaterial={selectedMaterial}
            setIsPasswordCorrect={setIsPasswordCorrect}
          />
        )}

        {page === "deleteDept" && (
          <DeleteMaterials
            setOpen={setOpen}
            setPassword={setPassword}
            getMaterials={GetMaterials}
            selectedMaterial={selectedMaterial}
            setIsPasswordCorrect={setIsPasswordCorrect}
          />
        )}
      </PopUp>
    </>
  );
};

export default Materials;
