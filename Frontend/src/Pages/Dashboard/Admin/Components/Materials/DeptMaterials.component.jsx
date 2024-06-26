import { useEffect, useState } from "react";
import FetchUserById from "../../../../../Utils/Fetch/FetchUserById";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Constants } from "../../../../../Constants";
import PasswordConfirmation from "../../../../../Components/PasswordConfirmation";
import PopUp from "../../../../../Components/PopUp";
import ShowMaterialPicture from "../../../SuperAdmin/Components/Materials/Components/ShowMaterialPicture";
import DeleteMaterials from "../../../SuperAdmin/Components/Materials/Components/DeleteMaterials/DeleteMaterials.component";
import GetMaterialsByDeptId from "../../../../../Utils/Fetch/GetMaterialsByDeptId";
import UpdateMyMaterial from "./Components/UpdateMaterial/UpdateMyMaterial.component";
import AddMyMaterial from "./Components/AddMaterial/AddMyMaterial.component";

const DeptMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");


  const FetchAdminAndMaterials = async () => {
    try {
      const ID = localStorage.getItem("userID");
      const responseOne = await FetchUserById(ID);
      setAdmin(responseOne);

      const responseTwo = await GetMaterialsByDeptId(
        responseOne.Departement[0].ID
      );
      setMaterials(
        responseTwo.sort((a, b) => {
          return new Date(b.CreatedAt) - new Date(a.CreatedAt);
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchAdminAndMaterials();
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

      <div className="mb-16 overflow-x-auto ">
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
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
                  <tr key={material.ID} className="hover:bg-gray-100">
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
                    <td className="px-6 py-4 whitespace-nowrap tracking-wider text-left text-sm text-gray-900">
                      {material.Status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap tracking-wider text-left text-sm text-gray-600">
                      {admin.Departement[0].Name}
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
            {materials.length === 0 && (
              <h1 className="text-center font-mdBold text-3xl mt-12">
                No Materials Found
              </h1>
            )}
          </div>
        </div>
      </div>

      <PopUp open={open} setOpen={setOpen}>
        {page === "ConfirmPass" && (
          <PasswordConfirmation
            setOpen={setOpen}
            Email={admin.Email}
            password={password}
            setPassword={setPassword}
            setIsPasswordCorrect={setIsPasswordCorrect}
          />
        )}
        {page === "addMaterials" && (
          <AddMyMaterial
            setOpen={setOpen}
            GetMaterials={FetchAdminAndMaterials}
            MyDept={admin.Departement[0]}
          />
        )}
        {page === "showPicture" && (
          <ShowMaterialPicture
            setOpen={setOpen}
            selectedMaterial={selectedMaterial}
          />
        )}
        {page === "updateMaterial" && (
          <UpdateMyMaterial
            setOpen={setOpen}
            setPassword={setPassword}
            getMaterials={FetchAdminAndMaterials}
            selectedMaterial={selectedMaterial}
            setIsPasswordCorrect={setIsPasswordCorrect}
          />
        )}

        {page === "deleteDept" && (
          <DeleteMaterials
            setOpen={setOpen}
            setPassword={setPassword}
            getMaterials={FetchAdminAndMaterials}
            selectedMaterial={selectedMaterial}
            setIsPasswordCorrect={setIsPasswordCorrect}
          />
        )}
      </PopUp>
    </>
  );
};

export default DeptMaterials;
