import { useEffect, useState } from "react";

const useFilterMaterials = (Materials, DeptFilter, TextFilter, StatusFilter) => {
    const [NewData, setNewData] = useState([]);

    useEffect(() => {
        const filteredMaterials = Materials.filter(item => {
            const deptMatch = DeptFilter ? item.DepartementId === DeptFilter : true;
            const statusMatch = StatusFilter ? item.Status === StatusFilter : true;
            const textMatch = item.Name.toLowerCase().includes(TextFilter.toLowerCase());

            return deptMatch && statusMatch && textMatch;
        });

        setNewData(filteredMaterials);
    }, [DeptFilter, TextFilter, Materials, StatusFilter]);

    return NewData;
};

export default useFilterMaterials;
