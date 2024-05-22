import { instance } from "../../Configs/axios";

const FetchBorrowedByUserID = async (Id) => {
    try {
        const res = await instance.get(`/borrow-material/user/${Id}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default FetchBorrowedByUserID;