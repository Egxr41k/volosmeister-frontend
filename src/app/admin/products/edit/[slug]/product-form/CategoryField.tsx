import { CategoryService } from '@/services/category.service'
import { ICategory } from '@/types/category.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Select, { Option } from './Select'

interface ICategoryField {
	category: ICategory
	setCategory: (value: ICategory) => void
}

export const CategoryField = ({ category, setCategory }: ICategoryField) => {
	const [options, setOptions] = useState<Option[]>([])

	const queryClient = useQueryClient()

	const { data: categories, isSuccess } = useQuery({
		queryKey: ['categories'],
		queryFn: () => CategoryService.getAll(),
		select: data => data.data
	})

	useEffect(() => {
		if (isSuccess) {
			setOptions(
				categories.map(category => ({
					label: category.name,
					value: category.id.toString()
				}))
			)
		}
	}, [isSuccess])

	const createCategoryMutation = useMutation({
		mutationFn: (newCategoryName: string) =>
			CategoryService.create(newCategoryName),
		onSuccess: newCategory => {
			queryClient.invalidateQueries(['categories'])

			const newOption: Option = {
				label: newCategory.data.name,
				value: newCategory.data.id.toString()
			}
			setOptions(prev => [...prev, newOption])
			const createdCategory = {
				id: newCategory.data.id,
				name: newCategory.data.name,
				slug: newCategory.data.slug // Ensure slug is included
			}
			setCategory(createdCategory)
		}
	})

	const selectedValue = category?.id?.toString() ?? ''

	const handleChange = (value: string) => {
		const found = categories?.find(c => c.id.toString() === value)
		if (found) setCategory(found)
	}

	return (
		<div className="mt-2">
			<Select
				options={options}
				value={selectedValue}
				onChange={handleChange}
				placeholder="Выберите категорию"
			/>
			{/* Пример создания новой категории — временно через prompt */}
			<button
				type="button"
				className="mt-1 text-sm text-emerald-500"
				onClick={() => {
					const name = prompt('Введите название новой категории')
					if (name) createCategoryMutation.mutate(name)
				}}
			>
				+ Создать новую категорию
			</button>
		</div>
	)
}
