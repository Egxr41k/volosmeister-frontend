import { ManufacturerService } from '@/services/manufacturer.service'
import { IManufacturer } from '@/types/manufacturer.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import Select from './Select'

interface IManufacturerField {
	manufacturer: IManufacturer
	setManufacturer: (value: IManufacturer) => void
}

const ManufacturerField = ({
	manufacturer,
	setManufacturer
}: IManufacturerField) => {
	const {
		data: manufacturers = [],
		isSuccess,
		refetch
	} = useQuery({
		queryKey: ['manufacturers'],
		queryFn: () => ManufacturerService.getAll()
	})

	const queryClient = useQueryClient()
	const { mutateAsync: create } = useMutation({
		mutationFn: (name: string) => ManufacturerService.create(name),
		onSuccess: () => {
			//queryClient.invalidateQueries(['manufacturers'])
			refetch()
		}
	})
	const selectedValue = manufacturer?.id?.toString() ?? ''

	useEffect(() => {
		if (isSuccess) {
			if (!manufacturer) {
				setManufacturer(manufacturers[0])
			}
		}
	}, [manufacturers])

	const handleChange = (manufacturerId: string) => {
		const found = manufacturers?.find(m => m.id.toString() === manufacturerId)
		if (found) setManufacturer(found)
	}

	const handleCreate = async () => {
		const name = prompt('Enter new manufacturer name')
		if (!name) return
		const created = await create(name)
		handleChange(created.id.toString())
		//refetch()
	}

	return (
		<div className="my-2">
			<div className="flex items-center gap-2">
				<h2>Select manufacturer</h2>
				<Select
					options={manufacturers.map(m => ({
						label: m.name,
						value: m.id.toString()
					}))}
					value={selectedValue}
					onChange={handleChange}
				/>
			</div>

			<button
				type="button"
				className="text-sm text-emerald-500"
				onClick={handleCreate}
			>
				+ Create new manufacturer
			</button>
		</div>
	)
}

export default ManufacturerField
