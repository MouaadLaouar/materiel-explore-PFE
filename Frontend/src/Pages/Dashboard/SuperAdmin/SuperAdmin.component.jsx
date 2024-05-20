import { useAtom } from "jotai";
import { sideBarActivePageAtom } from "../../../atom";
import Profile from "../../../Components/Profile";
import Departments from "./Components/Departments";
import Users from "./Components/Users/Users.component";
import Materials from "./Components/Materials";
import BorrowedMaterials from "./Components/BorrowedMaterials/BorrowedMaterials.component";

const SuperAdmin = () => {
  const [activePage] = useAtom(sideBarActivePageAtom);

  const renderPage = () => {
    switch (activePage) {
      case "Profile":
        return <Profile />;
      case "All Users":
        return <Users />;
      case "Departments":
        return <Departments />;
      case "Materials":
        return <Materials />;
      case "Borrowed Materials":
        return <BorrowedMaterials />;
    }
  };
  return <div className="w-full">{renderPage()}</div>;
};
export default SuperAdmin;
