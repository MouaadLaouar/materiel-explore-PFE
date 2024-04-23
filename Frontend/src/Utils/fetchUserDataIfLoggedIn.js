import { instance } from "../Configs/axios"

const fetchUserDataIfLoggedIn = async (ID) => {
    try { 
        const res = await instance.get(`/users/${ID}`)
        return res.data;
    } catch (error) {
        return false
    }
}

export default fetchUserDataIfLoggedIn