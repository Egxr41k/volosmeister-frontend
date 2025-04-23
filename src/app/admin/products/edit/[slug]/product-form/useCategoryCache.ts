import { ICategory } from '@/types/category.interface'
import { useState } from 'react'

type CategoryCacheType = Record<string, ICategory[]> //type CategoryTreeType = { parentId: number; children: ICategory[] }[]

export const useCategoryCache = () => {
	const [categoryCache, setCategoryCache] = useState<CategoryCacheType>({})

	const addToCategoryCache = (
		categoryId: string | number,
		children: ICategory[]
	) => {
		setCategoryCache(prev => ({ ...prev, [categoryId]: children }))
	}

	// const addToCategoryCache = (parentId: number, children: ICategory[]) => {
	// 	setCategoryCache(prev => ({
	// 		...prev,
	// 		parentId,
	// 		children
	// 	}))
	// }

	return {
		categoryCache,
		addToCategoryCache
	}
}
