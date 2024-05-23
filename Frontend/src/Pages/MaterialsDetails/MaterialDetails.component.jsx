import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import FetchMaterialByID from "../../Utils/Fetch/FetchMaterialByID";
import { Constants } from "../../Constants";
import Loader from "../../Components/Loader/Loader.component";
import { useAtom } from "jotai";
import { userIdAtom } from "../../atom";
import fetchUserDataIfLoggedIn from "../../Utils/Fetch/fetchUserDataIfLoggedIn";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MaterialDetails = () => {
  const { MaterialID } = useParams();
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn] = useAtom(userIdAtom);

  const fetchMaterial = async () => {
    try {
      const response = await FetchMaterialByID(MaterialID);
      setMaterial(response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setError(true);
    }
  };

  const checkUser = async () => {
    const ID = localStorage.getItem("userID");
    try {
      const res = await fetchUserDataIfLoggedIn(ID);
      setUser(res);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    checkUser();
    fetchMaterial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MaterialID]);

  if (!material) {
    return <Loader />;
  }

  return (
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

          {error && !isLoggedIn && (
            <div className="mt-10 flex items-center justify-center text-center rounded-lg">
              <Link to="/SignIn">
                <button className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-10 py-2 text-lg font-semibold text-white shadow-sm hover:bg-teal-700 sm:w-auto">
                  Sign In To Borrow This Material
                </button>
              </Link>
            </div>
          )}
          {isLoggedIn && user && user.Role === "USER" && (
            <>
              {material.Status === "Available" && (
                <div className="mt-10 h-20 text-center rounded-lg">
                  <button className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-10 py-2 text-lg font-semibold text-white shadow-sm hover:bg-teal-700 sm:w-auto">
                    Borrow
                  </button>
                </div>
              )}
              {material.Status === "NotAvailable" && (
                <div className="mt-10 flex items-center justify-center text-center bg-red-700 rounded-lg">
                  <p className="p-4 text-lg font-mdBold text-white">
                    This Material Is Not Available For The Moment
                  </p>
                </div>
              )}
              {material.Status === "UnderRepair" && (
                <div className="mt-10 flex items-center justify-center text-center bg-yellow-400 rounded-lg">
                  <p className="p-4 text-lg font-mdBold text-white">
                    This Material Is Under Repair Right Now, We Will Fix It As
                    Soon As Possible
                  </p>
                </div>
              )}
              {material.Status === "ComingSoon" && (
                <div className="mt-10 flex items-center justify-center text-center bg-blue-700 rounded-lg">
                  <p className="p-4 text-lg font-mdBold text-white">
                    This Material Is Coming Soon, Stay Tuned
                  </p>
                </div>
              )}
              {material.Status === "OutOfService" && (
                <div className="mt-10 flex items-center justify-center text-center bg-gray-700 rounded-lg">
                  <p className="p-4 text-lg font-mdBold text-white">
                    This Material Is Out Of Service
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-full">
          <img
            src={`${Constants.BasedPictureUrl}/${material.Picture[0].Name}`}
            alt={material.Name}
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialDetails;
