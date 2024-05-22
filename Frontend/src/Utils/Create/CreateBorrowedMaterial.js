import { instance } from "../../Configs/axios";

const CreateBorrowedMaterial = async (BorrowedMaterial) => {
    try {
        const res = await instance.post("/borrow-material", BorrowedMaterial);
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An error happend" };
    }
};

export default CreateBorrowedMaterial;
