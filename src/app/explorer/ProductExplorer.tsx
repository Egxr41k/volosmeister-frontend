'use client'

import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import Button from '@/ui/button/Button'
import Catalog from '@/ui/catalog/Catalog'

import { TypePaginationProducts } from '@/types/product.interface'

import { ProductService } from '@/services/product/product.service'
import styles from './ProductExplorer.module.scss'
import Filters from './filters/Filters'
import Pagination from './pagination/Pagination'
import SortDropdown from './sort/SortDropdown'
import { useFilters } from './useFilters'
import Search from './Search'
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'

interface IProductExplorer {
	initialProducts: TypePaginationProducts
}

const ProductExplorer: FC<IProductExplorer> = ({ initialProducts }) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	const { isFilterUpdated, queryParams, updateQueryParams } = useFilters()

	const { data, isFetching } = useQuery(
		['product explorer', queryParams],
		() => ProductService.getAll(queryParams),
		{
			initialData: initialProducts,
			enabled: isFilterUpdated
		}
	)

	return (
		<>
			<div className="mb-7 flex items-center justify-between">
				<h1 className="text-3xl font-semibold">
					{queryParams.searchTerm
						? `Search by query "${queryParams.searchTerm}"`
						: 'Find something cozy for your home'}
				</h1>
				<Search />
			</div>
			<div className="mb-7 flex items-center justify-between">
				<Button
					variant="white"
					onClick={() => setIsFilterOpen(!isFilterOpen)}
					className="mb-7 flex items-center gap-2"
				>
					{isFilterOpen ? (
						<>
							<FaAnglesLeft /> <p>Close filters</p>
						</>
					) : (
						<>
							<FaAnglesRight /> <p>Open filters</p>
						</>
					)}
				</Button>
				<SortDropdown />
			</div>
			<div
				className={[styles.explorer, isFilterOpen && styles.filterOpened].join(
					' '
				)}
			>
				<aside>
					<Filters />
				</aside>

				<section>
					<Catalog products={data.products} isLoading={isFetching} />
					<Pagination
						changePage={page => updateQueryParams('page', page.toString())}
						currentPage={queryParams.page ?? 1}
						numberPages={Math.ceil(data.length / +queryParams.perPage)}
					/>
				</section>
			</div>
		</>
	)
}

export default ProductExplorer
