import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import FetchMaterialByID from "../../Utils/Fetch/FetchMaterialByID";
import { Constants } from "../../Constants";
import Loader from "../../Components/Loader/Loader.component";

const MaterialDetails = () => {
  const currentMaterialID = useParams();
  const [material, setMaterial] = useState({});

  const fetchMaterial = async () => {
    try {
      const response = await FetchMaterialByID(currentMaterialID.MaterialID);
      setMaterial(response);
      console.log(response);
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
              <p className="mt-4 text-gray-500">{material.Description}</p>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-lg text-gray-900">State</dt>
                  <dd className="mt-2 text-base text-gray-600">Excellent</dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-lg text-gray-900">
                    Department
                  </dt>
                  <dd className="mt-2 text-base text-gray-600">
                    {material.Departement.Name}
                  </dd>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-lg text-gray-900">Contact</dt>
                  <dd className="mt-2 text-base text-gray-600">
                    {material.Departement.Phone}
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-lg text-gray-900">
                    Email
                  </dt>
                  <dd className="mt-2 text-base text-gray-600">
                    {material.Departement.Email}
                  </dd>
                </div>
              </dl>
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
