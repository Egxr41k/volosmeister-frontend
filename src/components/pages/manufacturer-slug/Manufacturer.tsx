'use client'

import { ManufacturerService } from '@/services/manufacturer.service'
import { ProductService } from '@/services/product.service'
import { IManufacturer } from '@/types/manufacturer.interface'
import { IProduct } from '@/types/product.interface'
import Catalog from '@/ui/catalog/Catalog'
import { useQuery } from '@tanstack/react-query'

interface IManufacturerProps {
	slug: string
	initialManufacturer?: IManufacturer
	initialProducts?: IProduct[]
}

const Manufacturer = ({
	slug,
	initialManufacturer,
	initialProducts
}: IManufacturerProps) => {
	const { data: manufacturer, isLoading: isLoadingManufacturer } = useQuery({
		queryKey: ['manufacturer', slug],
		queryFn: () => ManufacturerService.getBySlug(slug),
		initialData: initialManufacturer,
		enabled: !initialManufacturer
	})

	const { data: products, isLoading: isLoadingProducts } = useQuery({
		queryKey: ['products-by-manufacturer', slug],
		queryFn: () => ProductService.getByManufacturer(slug),
		initialData: initialProducts,
		enabled: !initialProducts
	})

	if (!manufacturer) {
		return (
			<div className="text-center text-red-500">
				Manufacturer or products not found
			</div>
		)
	}

	return (
		<main className="flex flex-grow items-center p-6 md:px-24 lg:px-48">
			<Catalog
				products={products ?? []}
				title={manufacturer.name}
				isLoading={isLoadingManufacturer || isLoadingProducts}
			/>
		</main>
	)
}

export default Manufacturer
