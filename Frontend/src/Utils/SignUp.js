import { instance } from "../Configs/axios";

const SignUp = async (User) => {
  try {
    const res = await instance.post("/auth/SignUp", User);
    // const ID = res.data.ID;

    // TODO: this need to be updated maybie using jwt to hide the ID of the user in local Storage
    // localStorage.setItem("userID", ID);
    
    return res.data;
  } catch (error) {
    return error.response?.data || { error: "An errro happend" };
  }
};

export default SignUp;
