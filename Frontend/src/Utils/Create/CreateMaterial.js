import { instance } from "../../Configs/axios";

const CreateMaterial = async (Material) => {
    try {
        const res = await instance.post("/materials", Material, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
};

export default CreateMaterial;
