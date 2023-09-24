import React, {useEffect, useState} from "react";
import {emptyProduct, IProduct} from "../types/IProduct";
import {RequestHandler} from "../services/RequestHandler";
import {FilledBtn} from "./Btns";
import {IProductDetails} from "../types/IProductDetails";

const DetailsForm = ({details, setDetails}: {details: IProductDetails,
    setDetails: React.Dispatch<React.SetStateAction<IProductDetails>>}) => {
    return <div>current id is {details.id}</div>
}
export default DetailsForm