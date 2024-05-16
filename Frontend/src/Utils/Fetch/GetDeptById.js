import { instance } from "../../Configs/axios";

const GetDeptById = async (Id) => {
    try {
        const res = await instance.get(`/departement/${Id}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default GetDeptById;