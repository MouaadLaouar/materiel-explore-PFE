import { useAtom } from "jotai";
import { sideBarActivePageAtom } from "../../../atom";
import Profile from "../../../Components/Profile";
import Department from "./Components/Department";
import DeptMaterials from "./Components/Materials/DeptMaterials.component";
import MyDeptBorrowedMaterials from "./Components/MyDeptBorrowedMaterials";

const Admin = () => {
  const [activePage] = useAtom(sideBarActivePageAtom);

  const renderPage = () => {
    switch (activePage) {
      case "Profile":
        return <Profile />;
      case "Users":
        return <h1>Users</h1>;
      case "Department":
        return <Department />;
      case "Materials":
        return <DeptMaterials />;
      case "Borrowed Materials":
        return <MyDeptBorrowedMaterials />;
    }
  };
  return <div className="w-full">{renderPage()}</div>;
};

export default Admin