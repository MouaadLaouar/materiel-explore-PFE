import { useEffect, useState } from "react";

const useFilterMaterials = (Materials, DeptFilter, TextFilter) => {
    const [NewData, setNewData] = useState([]);

    useEffect(() => {
        // const isPredefinedRoleFilter =
        //     RoleFilter === "USER" || RoleFilter === "ADMIN";

        const filteredByDept = Materials.filter(item => {
            if (DeptFilter !== "") {
                return item.DepartementId === DeptFilter;
            } else if (DeptFilter === "") {
                return item;
            } else {
                return true;
            }
        });

        const filteredMaterials = filteredByDept.filter(item => {
            return (
                item.Name.toLowerCase().includes(TextFilter.toLowerCase())
            );
        });

        setNewData(filteredMaterials);
    }, [DeptFilter, TextFilter, Materials]);

    return NewData;
};

export default useFilterMaterials;
