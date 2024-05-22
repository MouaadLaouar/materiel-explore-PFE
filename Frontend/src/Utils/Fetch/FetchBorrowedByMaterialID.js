import { instance } from "../../Configs/axios";

const FetchBorrowedByMaterialID = async (Id) => {
    try {
        const res = await instance.get(`/borrow-material/material/${Id}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default FetchBorrowedByMaterialID;