/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FetchBorrowedByUserID from "../Utils/Fetch/FetchBorrowedByUserID";

const useFilterBMByUser = (userID) => {
    const [currentMaterials, setCurrentMaterials] = useState([]);
    const [demands, setDemands] = useState([]);
    const [history, setHistory] = useState([]);
    const fetchData = async () => {
        try {
            const data = await FetchBorrowedByUserID(userID);
            const CMMatch = data.filter(item => item.BMStatus === "Confirmed" && item.Returned === false);
            const DMatch = data.filter(item => item.BMStatus === "NotConfirmed" && item.Returned === false);
            const HMatch = data.filter(item =>
                (item.BMStatus === "Confirmed" && item.Returned === true)
                ||
                (item.BMStatus === "Cancelled" && item.Returned === false)
            );
            setCurrentMaterials(CMMatch);
            setDemands(DMatch);
            setHistory(HMatch);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        currentMaterials,
        demands,
        history,
        refreshData: fetchData
    };
}


export default useFilterBMByUser;