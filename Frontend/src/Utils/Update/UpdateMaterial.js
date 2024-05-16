import { instance } from "../../Configs/axios";

const UpdateMaterial = async (Material) => {
    try {
        const res = await instance.put(`/materials/${Material.ID}`, Material);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default UpdateMaterial;