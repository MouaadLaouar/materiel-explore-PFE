/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FetchBorrowedByDeptID from "../Utils/Fetch/FetchBorrowedByDeptID";
import FetchUserById from "../Utils/Fetch/FetchUserById";

const useFilterBMByAdmin = (adminID) => {
    const [currentMaterials, setCurrentMaterials] = useState([]);
    const [demands, setDemands] = useState([]);
    const [history, setHistory] = useState([]);



    useEffect(() => {

        const fetchData = async () => {
            try {
                const admin = await FetchUserById(adminID);
                const deptID = admin.Departement[0].ID;
                const data = await FetchBorrowedByDeptID(deptID);
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
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        currentMaterials,
        demands,
        history,
    };
}


export default useFilterBMByAdmin;