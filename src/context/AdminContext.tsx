import React, {createContext, ReactNode, useContext, useState} from "react";

type AdminContextType = {
    isAdmin: boolean
    setAdmin: () => void
}

const AdminContext = createContext({} as AdminContextType);

export function useAdminContext() {
    return useContext(AdminContext)
}
export const AdminProvider = ({ children }: {children: ReactNode}) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const setAdmin = () => {
        setIsAdmin(true)

        alert("ви тепер адміністратор, це означає що ви можете реадагувати цей сайт")
    }


    return (
        <AdminContext.Provider value={{ isAdmin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};
