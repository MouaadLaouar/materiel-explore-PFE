import { instance } from "../../Configs/axios";

const DeleteMaterial = async (ID) => {
    try {
        const res = await instance.delete(`/materials/${ID}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default DeleteMaterial;