import { useAtom } from "jotai";
import Profile from "../../../Components/Profile";
import { sideBarActivePageAtom } from "../../../atom";
import MyBorrowedMaterials from "./Components/MyBorrowedMaterials";

const User = () => {
  const [activePage] = useAtom(sideBarActivePageAtom);

  const renderPage = () => {
    switch (activePage) {
      case "Profile":
        return <Profile />;
      case "My History":
        return <MyBorrowedMaterials />;
    }
  };
  return <div className="w-full">{renderPage()}</div>;
};

export default User;
