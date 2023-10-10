import useAdmin from "../../hooks/useAdmin";
import BorderedBtn from "../btns/BorderedBtn";
import React from "react";

const Admin = () => {
    const { isAdmin, setAdmin } = useAdmin()

    return <div className="flex justify-center items-center h-[90vh]">
        <div className="text-center ">
            <BorderedBtn handleClick={setAdmin}>
                Enable admin mode
            </BorderedBtn>
            {isAdmin && <div className="flex mt-5">
                <p className="mr-1.5">ви тепер адміністратор, це означає що ви можете</p>
                <a href="/ProductList" className="text-fuchsia-500 underline">редагувати</a>
                <p className="ml-1.5">цей сайт</p>
            </div>}
        </div>
    </div>
}
export default Admin