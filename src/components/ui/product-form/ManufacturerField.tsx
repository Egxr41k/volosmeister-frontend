import { ManufacturerService } from '@/services/manufacturer.service'
import { IManufacturer } from '@/types/manufacturer.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Select, { Option } from './Select'

interface IManufacturerField {
	manufacturer: IManufacturer
	setManufacturer: (value: IManufacturer) => void
}

export const ManufacturerField = ({
	manufacturer,
	setManufacturer
}: IManufacturerField) => {
	const [options, setOptions] = useState<Option[]>([])

	const {
		data: manufacturers,
		isSuccess,
		refetch
	} = useQuery({
		queryKey: ['manufacturers'],
		queryFn: () => ManufacturerService.getAll()
	})

	const queryClient = useQueryClient()
	const { mutate: create } = useMutation({
		mutationFn: (name: string) => ManufacturerService.create(name),
		onSuccess: () => {
			queryClient.invalidateQueries(['manufacturer'])
		}
	})
	const selectedValue = manufacturer?.id?.toString() ?? ''

	useEffect(() => {
		if (isSuccess) {
			setOptions(
				manufacturers.map(m => ({
					label: m.name,
					value: m.id.toString()
				}))
			)
		}
	}, [isSuccess])

	const handleChange = (value: string) => {
		const found = manufacturers?.find(m => m.id.toString() === value)
		if (found) setManufacturer(found)
	}

	return (
		<div className="mt-2">
			<Select
				options={options}
				value={selectedValue}
				onChange={handleChange}
				placeholder="Выберите производителя"
			/>
			<button
				type="button"
				className="mt-1 text-sm text-emerald-500"
				onClick={() => {
					const name = prompt('Введите название нового производителя')
					if (name) create(name)
					refetch()
				}}
			>
				+ Создать нового производителя
			</button>
		</div>
	)
}
