import { useEffect, useState } from "react";

const useFilterUsers = (Users, RoleFilter, TextFilter) => {
    const [NewData, setNewData] = useState([]);

    useEffect(() => {
        const isPredefinedRoleFilter =
            RoleFilter === "USER" || RoleFilter === "ADMIN";

        const filteredByRole = Users.filter(item => {
            if (isPredefinedRoleFilter) {
                return item.Role === RoleFilter;
            } else if (RoleFilter === "") {
                return item;
            } else {
                return true;
            }
        });

        const filteredUsers = filteredByRole.filter(item => {
            return (
                item.FirstName.toLowerCase().includes(TextFilter.toLowerCase())
                || item.LastName.toLowerCase().includes(TextFilter.toLowerCase())
            );
        });

        setNewData(filteredUsers);
    }, [RoleFilter, TextFilter, Users]);

    return NewData;
};

export default useFilterUsers;
