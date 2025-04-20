import { TypePaginationProducts } from '@/types/product.interface'
import Carousel from '@/ui/carousel/Carousel'
import Catalog from '@/ui/catalog/Catalog'
import { FC } from 'react'
import { carouselItems } from '../carousel.data'

const Main: FC<TypePaginationProducts> = ({ products }) => {
	return (
		<div id="main">
			<Carousel items={carouselItems} className="mb-10" />
			<Catalog title="Freshed products" products={products} />
		</div>
	)
}

export default Main
