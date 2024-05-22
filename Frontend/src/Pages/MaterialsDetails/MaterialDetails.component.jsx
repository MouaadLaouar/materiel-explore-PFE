import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import FetchMaterialByID from "../../Utils/Fetch/FetchMaterialByID";
import { Constants } from "../../Constants";
import Loader from "../../Components/Loader/Loader.component";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const MaterialDetails = () => {
  const currentMaterialID = useParams();
  const [material, setMaterial] = useState({});

  const fetchMaterial = async () => {
    try {
      const response = await FetchMaterialByID(currentMaterialID.MaterialID);
      setMaterial(response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMaterial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (material.ID) {
    return (
      <>
        <div className="bg-white">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {material.Name}
              </h2>
              <p className="mt-4 font-mdReg text-gray-500">
                {material.Description}
              </p>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-8 lg:gap-x-8">
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium font-mdBold text-lg text-gray-900">
                    Status
                  </dt>
                  <dd
                    className={classNames(
                      material.Status === "Available" && "text-emerald-500",
                      material.Status === "NotAvailable" && "text-red-500",
                      material.Status === "OutOfService" && "text-gray-500",
                      material.Status === "UnderRepair" && "text-yellow-500",
                      material.Status === "ComingSoon" && "text-blue-500",
                      "mt-2 text-lg font-mdSemi"
                    )}
                  >
                    {material.Status.replace(/([A-Z])/g, " $1").trim()}
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium font-mdBold text-lg text-gray-900">
                    Department
                  </dt>
                  <dd className="mt-2 text-base font-outfit text-gray-600">
                    {material.Departement.Name}
                  </dd>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium font-mdBold text-lg text-gray-900">
                    Contact
                  </dt>
                  <dd className="mt-2 text-base font-outfit text-gray-600">
                    {material.Departement.Phone}
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium font-mdBold text-lg text-gray-900">
                    Email
                  </dt>
                  <dd className="mt-2 text-base font-outfit text-gray-600">
                    {material.Departement.Email}
                  </dd>
                </div>
              </dl>
              <div className="mt-10 h-20 bg-slate-600 rounded-lg">

              </div>

            </div>

            <div className="w-full">
              <img
                src={`${Constants.BasedPictureUrl}/${material.Picture[0].Name}`}
                alt=""
                className="rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return <Loader />;
};

export default MaterialDetails;
