import { instance } from "../../Configs/axios";

const UpdateBMStatus = async (ID, BMStatus) => {
    try {
        const res = await instance.put(`/borrow-material/status/${ID}`, BMStatus);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default UpdateBMStatus;