import React, {createContext, ReactNode, useState} from "react";

type AdminContextType = {
    isAdmin: boolean
    setAdmin: () => void
}

export const AdminContext = createContext({} as AdminContextType);

export const AdminContextProvider = ({ children }: {children: ReactNode}) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const setAdmin = () => {
        setIsAdmin(true)
        console.log(isAdmin)
    }


    return (
        <AdminContext.Provider value={{ isAdmin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};
