import { useAtom } from "jotai";
import Profile from "../../../Components/Profile";
import { sideBarActivePageAtom } from "../../../atom";

const User = () => {
  const [activePage] = useAtom(sideBarActivePageAtom);

  const renderPage = () => {
    switch (activePage) {
      case "Profile":
        return <Profile />;
      case "Departments":
        return <h1>Departments</h1>;
      case "Borrowed Materials":
        return <h1>Borrowed Materials</h1>;
    }
  };
  return <div className="w-full">{renderPage()}</div>;
};

export default User;
