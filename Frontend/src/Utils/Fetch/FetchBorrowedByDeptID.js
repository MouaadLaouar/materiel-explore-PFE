import { instance } from "../../Configs/axios";

const FetchBorrowedByDeptID = async (Id) => {
    try {
        const res = await instance.get(`/borrow-material/dept/${Id}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
}

export default FetchBorrowedByDeptID;