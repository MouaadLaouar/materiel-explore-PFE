import { instance } from "../../Configs/axios";

const FetchAllUsersData = async () => {
    try {
        const res = await instance.get("/users");
        return res.data;
    } catch (error) {
        return error.response?.data || { error: "An errro happend" };
    }
}

export default FetchAllUsersData;