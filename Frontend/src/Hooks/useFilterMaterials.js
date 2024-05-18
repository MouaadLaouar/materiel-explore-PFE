import { useEffect, useState } from "react";

const useFilterMaterials = (Materials, DeptFilter, TextFilter) => {
    const [NewData, setNewData] = useState([]);

    useEffect(() => {
        // const isPredefinedRoleFilter =
        //     RoleFilter === "USER" || RoleFilter === "ADMIN";

        const filteredByDept = Materials.filter(item => {
            if (DeptFilter !== "") {
                console.log("A")
                return item.DepartementId === DeptFilter;
            } else if (DeptFilter === "") {
                console.log("B")
                return item;
            } else {
                console.log("C")
                return true;
            }
        });
        
        const filteredMaterials = filteredByDept.filter(item => {
            console.log("D")
            return (
                item.Name.toLowerCase().includes(TextFilter.toLowerCase())

            );
        });

        setNewData(filteredMaterials);
    }, [DeptFilter, TextFilter, Materials]);

    return NewData;
};

export default useFilterMaterials;
