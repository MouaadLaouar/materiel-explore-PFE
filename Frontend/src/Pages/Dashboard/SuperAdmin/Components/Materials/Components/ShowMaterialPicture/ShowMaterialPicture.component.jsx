import { Constants } from "../../../../../../../Constants";

/* eslint-disable react/prop-types */
const ShowMaterialPicture = ({ setOpen, selectedMaterial }) => {
  return (
    <div onClick={() => setOpen(false)}>
      <img
        loading="lazy"
        className="rounded h-full w-full"
        src={`${Constants.BasedPictureUrl}/${selectedMaterial.Picture[0].Name}`}
        alt=""
      />
    </div>
  );
};

export default ShowMaterialPicture;
