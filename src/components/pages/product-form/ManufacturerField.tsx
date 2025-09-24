import { ManufacturerService } from '@/services/manufacturer.service'
import { IManufacturer } from '@/types/manufacturer.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2'
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
		<>
			<div className="flex gap-1">
				<Select
					options={manufacturers.map(m => ({
						label: m.name,
						value: m.id.toString()
					}))}
					value={selectedValue}
					onChange={handleChange}
				/>

				<div className="flex flex-col justify-between">
					<button
						type="button"
						className="hover:text-emerald-500"
						onClick={() => handleCreate}
					>
						<HiPlus size={16} />
					</button>
					<button type="button" className="hover:text-emerald-500">
						<HiMinus size={16} />
					</button>
				</div>
			</div>
			<div className="flex">
				<p className="m-auto">:</p>
			</div>
		</>
	)
}

export default ManufacturerField
