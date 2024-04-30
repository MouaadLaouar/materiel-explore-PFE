import { instance } from "../Configs/axios";

const UpdateUser = async (User) => {
    try {
        const res = await instance.put(`/users/${User.Id}`, User);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An errro happend" };
    }
}

export default UpdateUser;