import { useQuery } from '@tanstack/react-query'
import { ProductService } from '../../services/ProductRequests'
import ProductItem from '../ui/ProductItem'
import Spinner from '../ui/Spinner'

const Catalog = () => {
	const {
		isLoading,
		isError,
		data: products
	} = useQuery({
		queryKey: ['products'],
		queryFn: () => ProductService.getAll()
	})

	if (isLoading) return <Spinner />

	if (isError) return <>Error</>

	return (
		<div className="flex flex-wrap justify-center items-center">
			{products?.map(item => (
				<ProductItem item={item} key={item.name} />
			))}
		</div>
	)
}

export default Catalog
