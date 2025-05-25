import { TypeProductDataFilters } from '@/types/product.interface'

export interface IFiltersState {
	isFilterUpdated: boolean
	queryParams: TypeProductDataFilters
}

export interface IFiltersActionsPayload {
	key: keyof TypeProductDataFilters
	value: string
}
