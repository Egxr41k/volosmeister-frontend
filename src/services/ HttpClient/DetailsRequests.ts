import IProductDetails from "../../types/IProductDetails";
import {baseDelete, baseGet, basePost, basePut} from "./BaseReqests";

export const getDetails = async (id: number) =>
    baseGet<IProductDetails>(`Details/${id}`)

export const createDetails = async (newEntity: IProductDetails) =>
    basePost<IProductDetails>('Details', newEntity)

export const updateDetails = async (updateEntity: IProductDetails) =>
    basePut<IProductDetails>(`Details/${updateEntity.id}`, updateEntity)

export const deleteDetails = async (id: number) =>
    baseDelete(`Details/${id}`)