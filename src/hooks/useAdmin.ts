import {useContext} from "react";
import {AdminContext} from "../context/AdminContext";

export const useAdmin = () => {
    const value = useContext(AdminContext)
    return value;
}