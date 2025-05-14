import { ICategory } from '@/types/category.interface'
import { useState } from 'react'

type CategoryCacheType = Record<string, ICategory[]>

export const useCategoryCache = () => {
	const [categoryCache, setCategoryCache] = useState<CategoryCacheType>({})

	const addToCategoryCache = (categoryId: string, children: ICategory[]) => {
		setCategoryCache(prev => ({ ...prev, [categoryId]: children }))
	}

	return {
		categoryCache,
		addToCategoryCache
	}
}
