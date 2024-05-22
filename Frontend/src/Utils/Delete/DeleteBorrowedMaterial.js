import { instance } from "../../Configs/axios";

const DeleteBorrowedMaterial = async (ID) => {
    try {
        const res = await instance.delete(`/borrow-material/${ID}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default DeleteBorrowedMaterial;