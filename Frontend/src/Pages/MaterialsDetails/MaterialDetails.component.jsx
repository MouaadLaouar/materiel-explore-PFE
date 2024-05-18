import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import FetchMaterialByID from "../../Utils/Fetch/FetchMaterialByID";
import { Constants } from "../../Constants";

const MaterialDetails = () => {
  const features = [
    { name: "Origin", description: "Designed by Good Goods, Inc." },
    {
      name: "Material",
      description:
        "Solid walnut base with rare earth magnets and powder coated steel card cover",
    },
    // { name: "Dimensions", description: '6.25" x 3.55" x 1.15"' },
    // {
    //   name: "Finish",
    //   description: "Hand sanded and finished with natural oil",
    // },
    // { name: "Includes", description: "Wood card tray and 3 refill packs" },
    // {
    //   name: "Considerations",
    //   description:
    //     "Made from natural materials. Grain and color vary with each item.",
    // },
  ];
  const currentMaterialID = useParams();
  const [material, setMaterial] = useState({});

  const fetchMaterial = async () => {
    try {
      const response = await FetchMaterialByID(currentMaterialID.MaterialID);
      setMaterial(response);
      //   console.log(response);
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
                {features.map((feature) => (
                  <div
                    key={feature.name}
                    className="border-t border-gray-200 pt-4"
                  >
                    <dt className="font-medium text-gray-900">
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
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

  return (
    <>
      {/* <div className="w-full text-center my-[10rem]">
        <h1 className="text-3xl font-bold">Material Not Found</h1>
      </div> */}
      <div className="animate-pulse flex flex-col text-center mt-[8rem] mb-[20rem] items-center gap-4 w-80 mx-auto">
        <div>
          <div className="w-48 h-6 bg-slate-400 rounded-md"></div>
          <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
        </div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
      </div>
    </>
  );
};

export default MaterialDetails;
