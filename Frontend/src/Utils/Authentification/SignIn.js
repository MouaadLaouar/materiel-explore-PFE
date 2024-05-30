import { instance } from "../../Configs/axios";

const SignIn = async (Email, Password) => {
  try {
    const res = await instance.post("/auth/login", {
      Email: Email,
      Password: Password,
    })

    return res.data;
  } catch (error) {
    return error.response?.data || { error: 'An error occurred' };
  }
};

export default SignIn;
