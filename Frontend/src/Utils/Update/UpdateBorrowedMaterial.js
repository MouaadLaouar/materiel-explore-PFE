import { instance } from "../../Configs/axios";

const UpdateBorrowedMaterial = async (BorrowedMaterial) => {
    try {
        const res = await instance.put(`/borrow-material/${BorrowedMaterial.Id}`, BorrowedMaterial);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default UpdateBorrowedMaterial;