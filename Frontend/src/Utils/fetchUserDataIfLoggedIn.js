import { instance } from "../Configs/axios"

const fetchUserDataIfLoggedIn = async (ID) => {
    try {
        const res = await instance.get(`/users/${ID}`)
        return res.data;
    } catch (error) {
        throw new Error(false);
    }
}

export default fetchUserDataIfLoggedIn