import { instance } from "../Configs/axios";

const GetDept = async () => {
    try {
        const res = await instance.get("/departement");
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An errro happend" };
    }
}

export default GetDept;