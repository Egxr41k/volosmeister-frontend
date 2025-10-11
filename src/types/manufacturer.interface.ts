import { ICategory, ICategoryTree } from './category.interface'

export interface IManufacturer {
	id: number
	name: string
	slug: string
}

export interface IManufacturerWithRootCategories extends IManufacturer {
	categories: ICategory[]
}

export interface IManufacturerWithCategoryTree extends IManufacturer {
	categories: ICategoryTree[]
}
