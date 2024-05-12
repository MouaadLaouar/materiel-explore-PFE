import { instance } from "../../Configs/axios";

const DeleteDepartment = async (ID) => {
    try {
        const res = await instance.delete(`/departement/${ID}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default DeleteDepartment;