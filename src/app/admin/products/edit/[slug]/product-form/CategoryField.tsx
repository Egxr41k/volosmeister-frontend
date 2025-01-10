import { CategoryService } from '@/services/category.service'
import { ICategory } from '@/types/category.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'

interface IOption {
	readonly label: string
	readonly value: string
}

interface ICategoryField {
	category: ICategory
	setCategory: (value: ICategory) => void
}

export const CategoryField = ({ category, setCategory }: ICategoryField) => {
	const [isLoading, setIsLoading] = useState(false)
	const [options, setOptions] = useState<IOption[]>([])

	const queryClient = useQueryClient()

	// Получение списка категорий
	const { data: categories, isSuccess } = useQuery({
		queryKey: ['categories'],
		queryFn: () => CategoryService.getAll(),
		select: data => data.data
	})

	useEffect(() => {
		if (isSuccess)
			setOptions(
				categories.map(category => ({
					label: category.name,
					value: category.id.toString() // Используем id для связи с categoryId
				}))
			)
	}, [isSuccess])

	// Мутация для создания категории
	const createCategoryMutation = useMutation({
		mutationFn: (newCategoryName: string) =>
			CategoryService.create(newCategoryName),
		onSuccess: newCategory => {
			queryClient.invalidateQueries(['categories'])

			setIsLoading(false)
			const newOption: IOption = {
				label: newCategory.data.name,
				value: newCategory.data.id.toString() // Получаем id новой категории
			}
			// Обновляем список опций и устанавливаем новую категорию
			setOptions(prev => [...prev, newOption])
		}
	})

	// Обработка создания новой категории
	const handleChange = (newValue: IOption | null) => {
		if (!newValue) return

		const selectedCategory = categories?.find(
			category => category.id === +newValue.value
		)

		if (!selectedCategory) return
		setCategory(selectedCategory)
	}

	const handleCreate = (inputValue: string) => {
		setIsLoading(true)
		createCategoryMutation.mutate(inputValue)
	}

	return (
		<CreatableSelect
			isClearable
			isDisabled={isLoading}
			isLoading={isLoading}
			onChange={handleChange}
			onCreateOption={handleCreate}
			options={options}
			value={options.find(option => option.value === category.toString())}
			placeholder="Выберите или создайте категорию"
		/>
	)
}
