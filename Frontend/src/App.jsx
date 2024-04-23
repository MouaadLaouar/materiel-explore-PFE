import { useEffect, useState } from "react";
import SignIn from "./Utils/SignIn";
import SignUp from "./Utils/SignUp";
import fetchUserDataIfLoggedIn from "./Utils/fetchUserDataIfLoggedIn";

function App() {
  const [userData, setuserData] = useState(null);
  // here how to signIn
  const handleSignIn = async (Email, Password) => {
    try {
      const data = await SignIn(Email, Password);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // here how to SignUp
  const User = {
    FirstName: "Laouar",
    LastName: "Montasser",
    Email: "laouar.montasser@gmail.com",
    Phone: "+213550505050",
    Password: "123456789",
    Role: "USER", // or "ADMIN"
  };

  const handleSignUp = async () => {
    try {
      const data = await SignUp(User);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // here if a user already Login In and when
  // he enter to the website again he redirect to the dashbord if he already
  // sign in that it, in this example when a user is already Login
  // i show his data in console and if note just i retrun false

  // we need useEffect in this situation
  const checkUser = async () => {
    const ID = localStorage.getItem("userID");
    if (ID) {
      try {
        const data = await fetchUserDataIfLoggedIn(ID);
        console.log("checkUser => ", data);

        // just for fun i add the data to a state to render it
        setuserData(data)
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <h1 className="text-3xl font-bold flex flex-col ">
      <h1>Hello world!</h1>
      <button
        className="text-left"
        onClick={() => handleSignIn("laouarmouaad@gmail.com", "123456789")}
      >
        Sign In
      </button>
      <button className="text-left" onClick={() => handleSignUp()}>
        Sign Up
      </button>
      <div>
        {userData ? (
          <>
            <h1 className="text-xl">
              {userData.FirstName} {userData.LastName} is already login
            </h1>
          </>
        ) : (
          "no user login"
        )}
      </div>
    </h1>
  );
}

export default App;
