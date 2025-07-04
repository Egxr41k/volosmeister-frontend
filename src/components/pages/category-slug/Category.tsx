'use client'

import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'
import { ICategory } from '@/types/category.interface'
import { IProduct } from '@/types/product.interface'
import Catalog from '@/ui/catalog/Catalog'
import { useQuery } from '@tanstack/react-query'

interface ICategoryProps {
	slug: string
	initialCategory?: ICategory
	initialProducts?: IProduct[]
}

const Category = ({
	slug,
	initialCategory,
	initialProducts
}: ICategoryProps) => {
	const { data: category, isLoading: isLoadingCategory } = useQuery({
		queryKey: ['category', slug],
		queryFn: () => CategoryService.getBySlug(slug),
		initialData: initialCategory,
		enabled: !initialCategory
	})

	const { data: products, isLoading: isLoadingProducts } = useQuery({
		queryKey: ['products', slug],
		queryFn: () => ProductService.getByCategory(slug),
		initialData: initialProducts,
		enabled: !initialProducts
	})

	if (!category) {
		return (
			<div className="text-center text-red-500">
				Category or products not found
			</div>
		)
	}

	return (
		<main className="flex flex-grow items-center p-6 md:px-24 lg:px-48">
			<Catalog
				products={products ?? []}
				title={category.name}
				isLoading={isLoadingCategory || isLoadingProducts}
			/>
		</main>
	)
}

export default Category
