'use client'

import { ProductService } from '@/services/product.service'
import { TypePaginationProducts } from '@/types/product.interface'
import Spinner from '@/ui/Spinner'
import Button from '@/ui/button/Button'
import Catalog from '@/ui/catalog/Catalog'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'
import styles from './ProductExplorer.module.scss'
import Search from './Search'
import Filters from './filters/Filters'
import Pagination from './pagination/Pagination'
import SortDropdown from './sort/SortDropdown'
import { useFilters } from './useFilters'

interface IProductExplorer {
	initialProducts?: TypePaginationProducts
}

const ProductExplorer = ({ initialProducts }: IProductExplorer) => {
	const t = useTranslations('explorer')

	const [isFilterOpen, setIsFilterOpen] = useState(false)

	const { isFilterUpdated, queryParams, updateQueryParams } = useFilters()

	const { data, isFetching, isError } = useQuery({
		queryKey: ['product explorer', queryParams],
		queryFn: () => ProductService.getAll(queryParams),
		enabled: isFilterUpdated || !initialProducts,
		initialData: initialProducts
	})

	if (isError || !data)
		return <p className="text-2xl font-semibold">{t('error')}</p>

	if (isFetching) return <Spinner />

	return (
		<main className={styles.explorer}>
			<div className={styles.controls}>
				<h1 className={styles.header}>
					{queryParams.searchTerm
						? t('search') + queryParams.searchTerm
						: t('title')}
				</h1>
				<Search />
			</div>
			<div className={styles.controls}>
				<Button variant="active" onClick={() => setIsFilterOpen(!isFilterOpen)}>
					{isFilterOpen ? (
						<>
							<FaAnglesLeft /> <p>{t('closeFilters')}</p>
						</>
					) : (
						<>
							<FaAnglesRight /> <p>{t('openFilters')}</p>
						</>
					)}
				</Button>
				<SortDropdown />
			</div>
			<div
				className={[
					styles.content,
					isFilterOpen ? styles.filterOpened : ''
				].join(' ')}
			>
				<aside>
					<Filters />
				</aside>

				<section>
					<Catalog products={data.products} isLoading={isFetching} />
				</section>
			</div>
			<Pagination
				changePage={page => updateQueryParams('page', page.toString())}
				currentPage={queryParams.page ?? 1}
				numberPages={Math.ceil(data.length / +queryParams.perPage)}
			/>
		</main>
	)
}

export default ProductExplorer
