import { useCategoryCache } from '@/hooks/useCategoryCache'
import { CategoryService } from '@/services/category.service'
import { ICategory } from '@/types/category.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2'
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
				setSelectedCategoryChain([categories[0]])
			} else {
				const path = findPathToCategory(category.id)
				setSelectedCategoryChain(path)
			}
		}
	}, [categories])

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
		const created = await create({ name, parentId })
		console.log('created:', created)
		handleChange(created.id.toString())
	}

	const addSubcategory = () => {
		console.log('adding subcategory...')
		const lastInChain = selectedCategoryChain[selectedCategoryChain.length - 1]
		console.log('last in chain is: ', lastInChain)
		const children = cache[lastInChain.id]
		console.log('children: ', children)
		if (children.length === 0) {
			return handleCreate(lastInChain.id)
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
							key={category.id}
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
