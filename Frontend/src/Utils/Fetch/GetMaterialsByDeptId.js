import { instance } from "../../Configs/axios";

const GetMaterialsByDeptId = async (Id) => {
    try {
        const res = await instance.get(`/materials/department/${Id}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default GetMaterialsByDeptId;