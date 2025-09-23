import { useCategoryCache } from '@/hooks/useCategoryCache'
import { CategoryService } from '@/services/category.service'
import { ICategory } from '@/types/category.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Select from './Select'

interface ICategoryField {
	category: ICategory
	setCategory: (value: ICategory) => void
}

const CategoryField = ({ category, setCategory }: ICategoryField) => {
	const [selectedCategoryChain, setSelectedCategoryChain] = useState<
		ICategory[]
	>([])

	const queryClient = useQueryClient()
	const { data: categories = [], isSuccess } = useQuery({
		queryKey: ['get all as tree categories'],
		queryFn: () => CategoryService.getAllAsTree()
	})

	const { cache, addToCache, findPathToCategory, findCategoryById } =
		useCategoryCache(categories)

	const { mutateAsync: create } = useMutation({
		mutationFn: (data: { name: string; parentId?: number }) =>
			CategoryService.create(data.name, data.parentId),
		onSuccess: data => {
			addToCache(data)
			//queryClient.invalidateQueries(['get all categories'])
		}
	})

	useEffect(() => {
		if (isSuccess) {
			if (!category) {
				setCategory(categories[0])
			} else {
				const path = findPathToCategory(category.id)
				setSelectedCategoryChain(path)
			}
		}
	}, [categories])

	const handleChange = async (level: number, categoryId: string) => {
		const selected = findCategoryById(+categoryId)
		if (!selected) return

		const updatedSelected = [...selectedCategoryChain.slice(0, level), selected]
		setSelectedCategoryChain(updatedSelected)

		setCategory(selected)
	}

	const handleCreate = async (level: number, parentId?: number) => {
		const name = prompt('Enter new category name')
		if (!name) return
		const created = await create({ name, parentId })
		handleChange(level, created.id.toString())
	}

	return (
		<div className="my-2">
			{/* Root level */}
			<div className="flex items-center gap-2">
				<h2 className="w-full">Select category</h2>
				<Select
					options={categories.map(c => ({
						label: c.name,
						value: c.id.toString()
					}))}
					value={selectedCategoryChain[0]?.id.toString()}
					onChange={value => handleChange(0, value)}
				/>
			</div>

			<button
				type="button"
				className="text-sm text-emerald-500"
				onClick={() => handleCreate(0)}
			>
				+ Create category
			</button>

			{/*nested level */}
			{selectedCategoryChain &&
				selectedCategoryChain.map((category, index) => {
					const children = cache[category.id] || []

					return (
						<div className={`ml-${index + 2}`} key={category.id}>
							{children.length === 0 ? (
								<p className="w-full">
									"{selectedCategoryChain[index].name}" hasn`t subcategory
								</p>
							) : (
								<div className="flex">
									<p className="w-full">Select subcategory</p>
									<Select
										key={category.id}
										options={children.map(c => ({
											label: c.name,
											value: c.id.toString()
										}))}
										value={selectedCategoryChain[index + 1]?.id.toString()}
										onChange={value => handleChange(index + 1, value)}
									/>
								</div>
							)}
							<button
								type="button"
								className="text-sm text-emerald-500"
								onClick={() =>
									handleCreate(
										index + 1,
										selectedCategoryChain[selectedCategoryChain.length - 1].id
									)
								}
							>
								+ Create subcategory for "{selectedCategoryChain[index].name}"
							</button>
						</div>
					)
				})}
		</div>
	)
}

export default CategoryField
