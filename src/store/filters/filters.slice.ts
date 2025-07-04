import { EnumProductSort } from '@/types/product.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IFiltersActionsPayload, IFiltersState } from './filters.types'

const initialState: IFiltersState = {
	isFilterUpdated: false,
	queryParams: {
		sort: EnumProductSort.NEWEST,
		searchTerm: '',
		page: 1,
		perPage: 8,
		ratings: ''
	}
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		updateQueryParam: (
			state,
			action: PayloadAction<IFiltersActionsPayload>
		) => {
			const { key, value } = action.payload
			state.queryParams[key] = value
			state.isFilterUpdated = true
		},
		resetFilterUpdate: state => {
			state.isFilterUpdated = true
		}
	}
})
