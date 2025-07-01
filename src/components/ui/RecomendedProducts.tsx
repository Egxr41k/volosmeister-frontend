import { ProductService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import Catalog from './catalog/Catalog'

const RecomendedProducts = ({ title }: { title: string }) => {
	const { data, isFetching } = useQuery({
		queryKey: ['recomended products'],
		queryFn: () => ProductService.getAll()
	})

	return (
		<main className="flex flex-grow items-center p-6 md:px-24 lg:px-48">
			<Catalog
				products={data?.products || []}
				title={title}
				isLoading={isFetching}
			/>
		</main>
	)
}

export default RecomendedProducts
