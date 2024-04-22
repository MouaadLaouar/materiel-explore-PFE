import { instance } from "../Configs/axios";
import { useEffect, useState } from "react";

const useLogin = (Email, Password) => {
  const [user, SetUser] = useState(undefined);
  const [err, setError] = useState(null);

  useEffect(() => {
    const Login = async () => {
      await instance
        .post("/auth/login", {
          Email: Email,
          Password: Password,
        })
        .then((res) => {
          SetUser(res.data);
        })
        .catch((err) => {
          setError(err);
          console.error(err.response.data);
        });
    };

    Login();
  }, [Email, Password]);

  return { user, err };
};

export default useLogin;
