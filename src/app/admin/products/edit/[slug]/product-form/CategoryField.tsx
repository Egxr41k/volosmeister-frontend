import { CategoryService } from '@/services/category.service'
import { ICategory, ICategoryTree } from '@/types/category.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Select from './Select'
import { useCategoryCache } from './useCategoryCache'

interface ICategoryField {
	category: ICategory
	setCategory: (value: ICategory) => void
}

export const CategoryField = ({ category, setCategory }: ICategoryField) => {
	const queryClient = useQueryClient()

	const [selectedCategoryChain, setSelectedCategoryChain] = useState<
		ICategory[]
	>([])

	const { categoryCache, addToCategoryCache } = useCategoryCache()

	const { data: rootCategories = [] } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getRoot(),
		select: data => data.data
	})

	useEffect(() => {
		if (!category) return
		initChainAndCache()
	}, [category])

	const initChainAndCache = async () => {
		const categoryTree = await CategoryService.getTree(category.id)

		initCache(categoryTree.data)
		initSelectedChain(categoryTree.data)
	}

	const initSelectedChain = (categoryTree: ICategoryTree | undefined) => {
		let currentTreeHead = categoryTree

		const chain: ICategory[] = []
		while (currentTreeHead) {
			const { children, ...category } = currentTreeHead
			chain.push(category)

			currentTreeHead = currentTreeHead.children.find(
				child => child.children.length !== 0
			)
		}
		const lastIdInChain = chain.at(-1)?.id
		if (category.parentId == lastIdInChain) {
			chain.push(category)
		}
		setSelectedCategoryChain(chain)
	}

	const initCache = (categoryTree: ICategoryTree | undefined) => {
		for (const category of rootCategories) {
			addToCategoryCache(category.id.toString(), [])
		}

		let currentTreeHead = categoryTree

		while (currentTreeHead) {
			addToCategoryCache(
				currentTreeHead.id.toString(),
				currentTreeHead.children
			)

			currentTreeHead = currentTreeHead.children.find(
				child => child.children.length !== 0
			)
		}
	}

	const handleChange = async (level: number, categoryId: string) => {
		const selected = findById(categoryId)
		if (!selected) return

		const updatedSelected = [...selectedCategoryChain.slice(0, level), selected]
		setSelectedCategoryChain(updatedSelected)

		const children = await loadChildren(categoryId)
		if (children.length === 0) {
			setCategory(selected)
		}
	}

	const findById = (id: string) => {
		const allCategories = [
			rootCategories,
			...Object.values(categoryCache)
		].flat()
		return allCategories.find(c => c.id.toString() === id)
	}

	const loadChildren = async (categoryId: string) => {
		if (categoryCache[category?.id]) return categoryCache[category.id]

		const children = await CategoryService.getChildren(categoryId).then(
			res => res.data
		)
		addToCategoryCache(categoryId, children)
		return children
	}

	const handleCreate = (parentId?: string) => {
		const name = prompt('Введите название новой категории')
		if (name) {
			createCategoryMutation.mutate({ name, parentId })
		}
	}

	const createCategoryMutation = useMutation({
		mutationFn: (data: { name: string; parentId?: string }) =>
			CategoryService.create(data.name, data.parentId),
		onSuccess: () => {
			queryClient.invalidateQueries(['categories'])
		}
	})

	return (
		<div className="space-y-2">
			{/* Root level */}
			<Select
				options={rootCategories.map(c => ({
					label: c.name,
					value: c.id.toString()
				}))}
				value={selectedCategoryChain[0]?.id.toString()}
				onChange={value => handleChange(0, value)}
				placeholder="Выберите категорию"
			/>
			<button
				type="button"
				className="text-sm text-emerald-500"
				onClick={() => handleCreate()}
			>
				+ Создать корневую категорию
			</button>

			{/*nested level */}
			{selectedCategoryChain &&
				selectedCategoryChain.map((category, index) => {
					const children = categoryCache[category.id] || []
					if (children.length === 0) return null

					return (
						<div className="ml-2">
							<Select
								key={category.id}
								options={children.map(c => ({
									label: c.name,
									value: c.id.toString()
								}))}
								value={selectedCategoryChain[index + 1]?.id.toString()}
								onChange={value => handleChange(index + 1, value)}
								placeholder="Выберите подкатегорию"
							/>
							<button
								type="button"
								className="text-sm text-emerald-500"
								onClick={() =>
									handleCreate(
										selectedCategoryChain[
											selectedCategoryChain.length - 1
										].id.toString()
									)
								}
							>
								+ Создать подкатегорию
							</button>
						</div>
					)
				})}
		</div>
	)
}
