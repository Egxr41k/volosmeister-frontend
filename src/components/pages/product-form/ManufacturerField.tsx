import { ManufacturerService } from '@/services/manufacturer.service'
import { IManufacturer } from '@/types/manufacturer.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Select, { Option } from './Select'

interface IManufacturerField {
	manufacturer: IManufacturer
	setManufacturer: (value: IManufacturer) => void
}

const ManufacturerField = ({
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
			//queryClient.invalidateQueries(['manufacturers'])
			refetch()
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
	}, [manufacturers])

	const handleChange = (value: string) => {
		const found = manufacturers?.find(m => m.id.toString() === value)
		if (found) setManufacturer(found)
	}

	return (
		<div className="my-2">
			<div className="flex items-center gap-2">
				<h2>Select manufacturer</h2>
				<Select
					options={options}
					value={selectedValue}
					onChange={handleChange}
				/>
			</div>

			<button
				type="button"
				className="text-sm text-emerald-500"
				onClick={() => {
					const name = prompt('Enter new manufacturer name')
					if (name) create(name)
					refetch()
				}}
			>
				+ Create new manufacturer
			</button>
		</div>
	)
}

export default ManufacturerField
