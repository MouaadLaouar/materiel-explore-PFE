import { instance } from "../../Configs/axios";

const UpdateDepartment = async (Dept) => {
    try {
        const res = await instance.put(`/departement/${Dept.ID}`, Dept);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An errro happend" };
    }
}

export default UpdateDepartment;