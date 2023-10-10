import React, {createContext, ReactNode, useContext, useState} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";

type AdminContextType = {
    isAdmin: boolean
    setAdmin: () => void
}

const AdminContext = createContext({} as AdminContextType);
export const AdminProvider = ({ children }: {children: ReactNode}) => {
    const [isAdmin, setIsAdmin] = useLocalStorage("", false);

    const setAdmin = () => {
        setIsAdmin(true)
        console.log(isAdmin)
        alert("ви тепер адміністратор, це означає що ви можете реадагувати цей сайт")
    }


    return (
        <AdminContext.Provider value={{ isAdmin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContext