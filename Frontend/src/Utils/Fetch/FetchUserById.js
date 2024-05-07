import { instance } from "../../Configs/axios";

const FetchUserById = async (Id) => {
    try {
        const res = await instance.get(`/users/${Id}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default FetchUserById;