import { useAtom } from "jotai";
import Profile from "../../../Components/Profile";
import { sideBarActivePageAtom } from "../../../atom";
import CurrentMaterials from "./Components/CurrentMaterials";
import MyDemands from "./Components/MyDemands";
import MyHistory from "./Components/MyHistory";

const User = () => {
  const [activePage] = useAtom(sideBarActivePageAtom);

  const renderPage = () => {
    switch (activePage) {
      case "Profile":
        return <Profile />;
      case "Current Materials":
        return <CurrentMaterials />;
      case "My Demands":
        return <MyDemands />;
      case "My History":
        return <MyHistory />;
    }
  };
  return <div className="w-full">{renderPage()}</div>;
};

export default User;
