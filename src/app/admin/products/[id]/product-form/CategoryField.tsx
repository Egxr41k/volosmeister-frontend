import { CategoryService } from '@/services/category.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { IFormField } from './form.types'

interface IOption {
	readonly label: string
	readonly value: string
}

export const CategoryField = ({ control, register }: IFormField) => {
	const [isLoading, setIsLoading] = useState(false)
	const [options, setOptions] = useState<IOption[]>([])

	const queryClient = useQueryClient()

	// Получение списка категорий
	const { data: categories, isSuccess } = useQuery({
		queryKey: ['categories'],
		queryFn: () => CategoryService.getAll(),
		select: data =>
			data.data.map(category => ({
				label: category.name,
				value: category.id.toString() // Используем id для связи с categoryId
			}))
	})

	useEffect(() => {
		if (isSuccess) setOptions(categories)
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
	const handleCreate = (inputValue: string) => {
		setIsLoading(true)
		createCategoryMutation.mutate(inputValue)
	}

	return (
		<Controller
			name="categoryId"
			control={control}
			render={({ field }) => {
				// Устанавливаем выбранную категорию на основе текущего значения в форме
				const selectedCategory =
					options.find(option => option.value === field.value.toString()) ||
					null

				return (
					<CreatableSelect
						isClearable
						isDisabled={isLoading}
						isLoading={isLoading}
						onChange={(newValue: IOption | null) => {
							// Синхронизация выбранной категории с формой
							field.onChange(newValue?.value || null)
						}}
						onCreateOption={handleCreate}
						options={options}
						value={selectedCategory}
						placeholder="Выберите или создайте категорию"
					/>
				)
			}}
		/>
	)
}
