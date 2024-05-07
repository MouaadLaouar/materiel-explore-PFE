import { instance } from "../../Configs/axios";

const UpdateUserRoleByID = async (UserId, Role) => {
    try {
        const res = await instance.put(`/users/UpdateRole/${UserId}`, Role);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default UpdateUserRoleByID;