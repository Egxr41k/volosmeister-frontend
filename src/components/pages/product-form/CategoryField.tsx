import { useCategoryCache } from '@/hooks/useCategoryCache'
import { CategoryService } from '@/services/category.service'
import { ICategory } from '@/types/category.interface'
import { IManufacturer } from '@/types/manufacturer.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import Select from './Select'

interface ICategoryField {
	category: ICategory
	setCategory: (value: ICategory) => void
	manufacturer: IManufacturer
}

const CategoryField = ({
	category,
	setCategory,
	manufacturer
}: ICategoryField) => {
	const [selectedCategoryChain, setSelectedCategoryChain] = useState<
		ICategory[]
	>([])

	const queryClient = useQueryClient()

	// загружаем категории конкретного производителя
	const { data: categories = [], isSuccess } = useQuery({
		queryKey: ['get all as tree categories', manufacturer.id],
		queryFn: () => CategoryService.getAllAsTree(manufacturer.id),
		enabled: !!manufacturer.id
	})

	const { cache, addToCache, findPathToCategory, findCategoryById } =
		useCategoryCache(categories)

	const { mutateAsync: create } = useMutation({
		mutationFn: (data: { name: string; parentId?: number }) =>
			CategoryService.create(data.name, manufacturer.id!, data.parentId),
		onSuccess: async data => {
			addToCache(data)

			if (data.parentId) {
				const pathToSelected = findPathToCategory(data.parentId)
				setSelectedCategoryChain([...pathToSelected, data])
			} else {
				setSelectedCategoryChain([data])
			}

			setCategory(data)
			queryClient.invalidateQueries([
				'get all as tree categories',
				manufacturer.id
			])
		}
	})

	useEffect(() => {
		if (isSuccess && categories.length > 0) {
			if (!category || category.manufacturerId !== manufacturer.id) {
				setCategory(categories[0])
				setSelectedCategoryChain([categories[0]])
			} else {
				const path = findPathToCategory(category.id)
				setSelectedCategoryChain(path)
			}
		} else {
			setSelectedCategoryChain([])
		}
	}, [categories, isSuccess, manufacturer.id])

	const handleChange = async (categoryId: string) => {
		const selected = findCategoryById(+categoryId)
		if (!selected) return

		const pathToSelected = findPathToCategory(selected.id)
		setSelectedCategoryChain(pathToSelected)
		setCategory(selected)
	}

	const handleCreate = async (parentId?: number) => {
		const name = prompt('Enter new category name')
		if (!name) return
		await create({ name, parentId })
	}

	const addSubcategory = () => {
		const lastInChain = selectedCategoryChain[selectedCategoryChain.length - 1]
		const children = lastInChain ? cache[lastInChain.id] : []
		if (children.length === 0) {
			return handleCreate(lastInChain?.id)
		}
		setCategory(children[0])
		setSelectedCategoryChain(prev => [...prev, children[0]])
	}

	return (
		<>
			{selectedCategoryChain.map(category => {
				const children = !category.parentId
					? categories
					: cache[category.parentId!] || []

				return (
					<div className="flex gap-1" key={category.id}>
						<Select
							options={children.map(c => ({
								label: c.name,
								value: c.id.toString()
							}))}
							value={category.id.toString()}
							onChange={value => handleChange(value)}
						/>
						<div className="flex flex-col justify-between">
							<button
								type="button"
								className="hover:text-emerald-500"
								onClick={() => handleCreate(category.parentId)}
							>
								<HiPlus size={16} />
							</button>
							<button type="button" className="hover:text-emerald-500">
								<HiMinus size={16} />
							</button>
						</div>
						<div className="flex">
							<p className="m-auto">/</p>
						</div>
					</div>
				)
			})}
			<button
				className="rounded border border-gray-300 bg-white p-2 text-sm hover:border-emerald-500 hover:text-emerald-500"
				onClick={() => addSubcategory()}
			>
				Add subcategory
			</button>
		</>
	)
}

export default CategoryField
