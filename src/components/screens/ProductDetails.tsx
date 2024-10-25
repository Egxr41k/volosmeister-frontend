import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { ProductService } from '../../services/ProductRequests'
import IFeature from '../../types/IFeature'
import IProperty from '../../types/IProperty'
import { BorderedBtn, FilledBtn } from '../ui/Buttons'
import Spinner from '../ui/Spinner'

const ProductDetails = () => {
	const { id } = useParams()

	const {
		isLoading,
		error,
		data: product,
		isSuccess
	} = useQuery({
		queryKey: ['products', id],
		queryFn: () => ProductService.getById(id ?? ''),
		select: data => data.data
	})

	if (isLoading) return <Spinner />

	if (error || !product) return <p>Error loading product</p>

	return (
		<div>
			<div className="relative">
				<img
					src="https://static.tildacdn.com/tild3461-3062-4839-a133-623333343030/kak-vibrat-mebel-dly.jpg"
					alt=""
					className="w-full object-cover h-[93vh]"
				/>
				<div
					className="absolute flex -translate-x-2/4 -translate-y-2/4 bg-opacity-80 bg-fuchsia-950
                                left-1/2 top-1/2 w-full h-full justify-center items-center"
				>
					<div className="text-center text-white">
						<img
							src={product.imageSrc}
							alt="ProductImage"
							className="mx-auto h-72"
						/>
						<h2 className="font-semibold text-5xl my-6">{product.name}!</h2>
						<p className="font-light whitespace-pre-line my-6">
							{product.description}
						</p>
						{product.isSale && (
							<h2 className="text-4xl my-6">
								АКЦІЙНА ЦІНА
								<br />
								<span className="font-semibold text-red-500">
									{' ' + product.newPrice + ' ГРН!'}
								</span>
							</h2>
						)}
						<BorderedBtn color="white" onClick={() => {}}>
							Замовити
						</BorderedBtn>
					</div>
				</div>
			</div>

			<div className="py-16">
				<h2 className="font-semibold text-3xl my-12 text-center">
					ЧОМУ ВАРТО ОБРАТИ {product.name.toUpperCase()}?
				</h2>
				{product.features.map((feature: IFeature, index: number) => {
					return (
						<div key={feature.title} className="my-12">
							<div className="w-96 mx-auto">
								<img
									src={feature.imageSrc}
									alt="ProductImage"
									className=" h-72 w-full object-cover"
								/>
								<h3 className="font-semibold text-xl my-3">{feature.title}</h3>
								<p className="font-light whitespace-pre-line">
									{feature.description}
								</p>
							</div>
						</div>
					)
				})}
			</div>

			<div className="py-24 bg-fuchsia-50">
				<h2 className="font-semibold text-3xl my-12 text-center">
					ХАРАКТЕРИСТИКИ
				</h2>
				<div className="flex">
					<ul className="list-disc mx-auto">
						{product.properies.map((property: IProperty) => {
							return property.name == '' ? (
								<li>{property.value}</li>
							) : (
								<li>{property.name + ': ' + property.value}</li>
							)
						})}
					</ul>
				</div>
			</div>

			{/*Todo: create a image Slider*/}

			<div className="py-10 bg-fuchsia-50">
				<img
					src={product.imageSrc}
					alt="ProductImage"
					className="mx-auto h-96 my-5"
				/>

				<h3 className="font-bold text-center my-5">{product.name}</h3>
				<p className="text-center my-5">
					<span className="text-fuchsia-600">
						{product.newPrice} грн. {'  '}
					</span>
					<span className="line-through text-gray-400">
						{product.oldPrice} грн.
					</span>
				</p>
				<div className="mx-auto w-fit my-5">
					<FilledBtn onClick={() => {}}>Замовити зараз</FilledBtn>
				</div>
			</div>

			{/*Todo: create a "Recent viewed" section*/}
		</div>
	)
}

export default ProductDetails
