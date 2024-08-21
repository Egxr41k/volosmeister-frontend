import IProduct from '../../types/IProduct'
import BaseRequests from './BaseRequests'

const productRequest = BaseRequests<IProduct>('Product')
export const getProducts = async () => productRequest.getAll()

export const getProduct = async (id: number) => productRequest.get(id)

export const createProduct = async (newEntity: IProduct) =>
	productRequest.post(newEntity)

export const updateProduct = async (updateEntity: IProduct) =>
	productRequest.put(updateEntity)

export const deleteProduct = async (id: number) => productRequest.delete(id)
