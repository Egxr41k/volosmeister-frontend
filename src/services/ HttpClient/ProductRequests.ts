import IProduct from "../../types/IProduct";
import {baseDelete, baseGet, basePost, basePut} from "./BaseReqests";

export const getProducts = async () =>
    baseGet<IProduct[]>('Products')

export const getProduct = async (id: number) =>
    baseGet<IProduct>(`Products/${id}`)

export const createProduct = async (newEntity: IProduct) =>
    basePost<IProduct>('Products', newEntity)

export const updateProduct = async (updateEntity: IProduct) =>
    basePut<IProduct>(`Products/${updateEntity.id}`, updateEntity)

export const deleteProduct = async (id: number) =>
    baseDelete(`Products/${id}`)
