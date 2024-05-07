import { instance } from "../../Configs/axios";

const SignIn = async (Email, Password) => {
  try {
    const res = await instance.post("/auth/login", {
      Email: Email,
      Password: Password,
    })
    // const ID = res.data.ID
    // console.log(ID)

    // TODO: this need to be updated may be using jwt to hide the ID of the user in local Storage
    // localStorage.setItem('userID', ID);
    
    // console.log(ID);
    return res.data;
  } catch (error) {
    return error.response?.data || { error: 'An error occurred' };
  }
};

export default SignIn;
