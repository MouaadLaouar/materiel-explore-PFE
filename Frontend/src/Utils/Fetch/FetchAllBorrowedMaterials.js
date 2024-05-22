import { instance } from "../../Configs/axios";

const FetchAllBorrowedMaterials = async () => {
    try {
        const res = await instance.get("/borrow-material");
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default FetchAllBorrowedMaterials;