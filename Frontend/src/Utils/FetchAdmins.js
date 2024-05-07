import { instance } from "../Configs/axios";

const FetchAdmins = async () => {
    try {
        const res = await instance.get("/users/admin");
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An errro happend" };
    }
}

export default FetchAdmins;