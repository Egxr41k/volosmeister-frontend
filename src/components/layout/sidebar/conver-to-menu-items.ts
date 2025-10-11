import { ICategory } from '@/types/category.interface'
import { IManufacturerWithRootCategories } from '@/types/manufacturer.interface'
import { IMenuItem } from './menu.interface'

export const convertCategorysToMenuItems = (
	categories: ICategory[]
): IMenuItem[] =>
	categories.map(category => ({
		label: category.name,
		href: `/category/${category.slug}`
	}))

export const convertManufacturersToMenuItems = (
	manufacturers: IManufacturerWithRootCategories[]
): (IMenuItem & { categories: ICategory[] })[] =>
	manufacturers.map(manufacturer => ({
		label: manufacturer.name,
		href: `/manufacturer/${manufacturer.slug}`,
		categories: manufacturer.categories
	}))
