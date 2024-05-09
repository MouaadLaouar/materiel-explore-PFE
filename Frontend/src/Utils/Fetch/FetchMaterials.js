import { instance } from "../../Configs/axios";

const FetchMaterials = async () => {
    try {
        const res = await instance.get("/materials");
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default FetchMaterials;