import { ICategory, ICategoryTree } from '@/types/category.interface'
import { useEffect, useState } from 'react'

export type CategoryCacheType = Record<number, ICategory[]>

export const useCategoryCache = (trees: ICategoryTree[]) => {
	const [cache, setCache] = useState<CategoryCacheType>({})

	useEffect(() => {
		const cache = createCache()
		setCache(cache)
	}, [trees])

	const addToCache = (category: ICategory) => {
		if (category.parentId)
			setCache(prev => ({
				...prev,
				[category.parentId!]: [...prev[category.parentId!], category]
			}))
		else setCache(prev => ({ ...prev, [category.id]: [] }))
	}

	const createCache = () => {
		const cache = {} as CategoryCacheType

		const dfs = (node: ICategoryTree) => {
			cache[node.id] = node.children
			node.children.forEach(dfs)
		}

		trees.forEach(dfs)
		return cache
	}

	/** Возвращает цепочку от корня до заданной категории */
	const findPathToCategory = (targetId: number): ICategory[] => {
		for (const tree of trees) {
			const path = dfsFindPath(tree, targetId)
			if (path.length > 0) return path
		}
		return []
	}

	/** Ищет категорию по id (возвращает ICategory) */
	const findCategoryById = (id: number): ICategory | undefined => {
		for (const tree of trees) {
			const category = dfsFindNode(tree, id)
			if (category) return category
		}
		return undefined
	}

	/** Универсальный DFS обход, возвращает список всех id */
	const getAllCategoryIds = () => {
		return Object.keys(cache)
	}

	/** DFS поиск категории, возвращает ICategory */
	const dfsFindNode = (
		tree: ICategoryTree,
		id: number
	): ICategory | undefined => {
		const { children, ...category } = tree
		if (category.id === id) return category

		for (const child of children) {
			const found = dfsFindNode(child, id)
			if (found) return found
		}
		return undefined
	}

	/** DFS поиск пути к категории, возвращает цепочку категорий */
	const dfsFindPath = (
		tree: ICategoryTree,
		targetId: number,
		path: ICategory[] = []
	): ICategory[] => {
		const { children, ...category } = tree
		const newPath = [...path, category]

		if (category.id === targetId) return newPath

		for (const child of children) {
			const result = dfsFindPath(child, targetId, newPath)
			if (result.length > 0) return result
		}

		return []
	}

	return {
		cache,
		addToCache,
		findPathToCategory,
		findCategoryById,
		getAllCategoryIds
	}
}
