import { instance } from "../../Configs/axios";

const SignUp = async (User) => {
  try {
    const res = await instance.post("/auth/SignUp", User);
    return res.data;
  } catch (error) {
    return error.response?.data || { error: "An errro happend" };
  }
};

export default SignUp;
