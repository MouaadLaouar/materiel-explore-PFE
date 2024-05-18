import { instance } from "../../Configs/axios";

const FetchMaterialsByID = async (Id) => {
    try {
        const res = await instance.get(`/materials/${Id}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default FetchMaterialsByID;