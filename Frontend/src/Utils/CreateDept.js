import { instance } from "../Configs/axios";

const CreateDept = async (Dept) => {
    try {
        const res = await instance.post("/departement", Dept);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
};

export default CreateDept;
