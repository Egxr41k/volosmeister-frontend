import IProductDetails from '../../types/IProductDetails'
import BaseRequests from './BaseRequests'

const detailsRequest = BaseRequests<IProductDetails>('Details')
export const getDetails = async (id: number) => detailsRequest.get(id)

export const createDetails = async (newEntity: IProductDetails) =>
	detailsRequest.post(newEntity)

export const updateDetails = async (updateEntity: IProductDetails) =>
	detailsRequest.put(updateEntity)

export const deleteDetails = async (id: number) => detailsRequest.delete(id)
