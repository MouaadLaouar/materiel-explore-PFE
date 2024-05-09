import { useEffect, useState } from "react";

const useFilterMaterials = (Materials, DeptFilter, TextFilter) => {
    const [NewData, setNewData] = useState([]);

    useEffect(() => {
        // const isPredefinedRoleFilter =
        //     RoleFilter === "USER" || RoleFilter === "ADMIN";

        // const filteredByRole = Materials.filter(item => {
        //     if (isPredefinedRoleFilter) {
        //         return item.Role === RoleFilter;
        //     } else if (RoleFilter === "") {
        //         return item;
        //     } else {
        //         return true;
        //     }
        // });

        const filteredMaterials = Materials.filter(item => {
            return (
                item.Name.toLowerCase().includes(TextFilter.toLowerCase())

            );
        });

        setNewData(filteredMaterials);
    }, [DeptFilter, TextFilter, Materials]);

    return NewData;
};

export default useFilterMaterials;
