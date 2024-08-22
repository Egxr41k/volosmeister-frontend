'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import BorderedBtn from '../../../components/btns/BorderedBtn'
import FilledBtn from '../../../components/btns/FilledBtn'
import Spinner from '../../../components/Spinner'
import useAdmin from '../../../hooks/useAdmin'
import useProductInfo from '../../../hooks/useProductInfo'
import IFeature from '../../../types/IFeature'
import { emptyInfo } from '../../../types/IProductInfo'
import IProperty from '../../../types/IProperty'

const ProductDetails = ({ params }: { params: { id: string } }) => {
	const { id } = params
	const intId = parseInt(id ?? '')

	const { isAdmin } = useAdmin()
	const { productInfo } = useProductInfo(intId)

	useEffect(() => {
		console.log('ProductDetails component mount', productInfo)
	}, [])

	return productInfo == emptyInfo ? (
		<Spinner />
	) : (
		<div>
			<div className="relative">
				<img
					src="https://static.tildacdn.com/tild3461-3062-4839-a133-623333343030/kak-vibrat-mebel-dly.jpg"
					alt=""
					className="h-[93vh] w-full object-cover"
				/>
				<div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-2/4 -translate-y-2/4 items-center justify-center bg-fuchsia-950 bg-opacity-80">
					<div className="text-center text-white">
						<img
							src={productInfo.product.imageSrc}
							alt="ProductImage"
							className="mx-auto h-72"
						/>
						<h2 className="my-6 text-5xl font-semibold">
							{productInfo.product.name}!
						</h2>
						<p className="my-6 whitespace-pre-line font-light">
							{productInfo.product.description}
						</p>
						{productInfo.product.isSale && (
							<h2 className="my-6 text-4xl">
								АКЦІЙНА ЦІНА
								<br />
								<span className="font-semibold text-red-500">
									{' ' + productInfo.product.newPrice + ' ГРН!'}
								</span>
							</h2>
						)}

						{isAdmin ? (
							<BorderedBtn color="white" handleClick={() => {}}>
								<Link href={`/products/${id}`}>Редагувати</Link>
							</BorderedBtn>
						) : (
							<BorderedBtn color="white" handleClick={() => {}}>
								Замовити
							</BorderedBtn>
						)}
					</div>
				</div>
			</div>

			<div className="py-16">
				<h2 className="my-12 text-center text-3xl font-semibold">
					ЧОМУ ВАРТО ОБРАТИ {productInfo.product.name.toUpperCase()}?
				</h2>
				{productInfo.details.features.map(
					(feature: IFeature, index: number) => {
						return (
							<div key={feature.title} className="my-12">
								<div className="mx-auto w-96">
									<img
										src={feature.imageSrc}
										alt="ProductImage"
										className="h-72 w-full object-cover"
									/>
									<h3 className="my-3 text-xl font-semibold">
										{feature.title}
									</h3>
									<p className="whitespace-pre-line font-light">
										{feature.description}
									</p>
								</div>
							</div>
						)
					}
				)}
			</div>

			<div className="bg-fuchsia-50 py-24">
				<h2 className="my-12 text-center text-3xl font-semibold">
					ХАРАКТЕРИСТИКИ
				</h2>
				<div className="flex">
					<ul className="mx-auto list-disc">
						{productInfo.details.stats.map((property: IProperty) => {
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

			<div className="bg-fuchsia-50 py-10">
				<img
					src={productInfo.product.imageSrc}
					alt="ProductImage"
					className="mx-auto my-5 h-96"
				/>

				<h3 className="my-5 text-center font-bold">
					{productInfo.product.name}
				</h3>
				<p className="my-5 text-center">
					<span className="text-fuchsia-600">
						{productInfo.product.newPrice} грн. {'  '}
					</span>
					<span className="text-gray-400 line-through">
						{productInfo.product.oldPrice} грн.
					</span>
				</p>
				<div className="mx-auto my-5 w-fit">
					<FilledBtn handleClick={() => {}}>Замовити зараз</FilledBtn>
				</div>
			</div>

			{/*Todo: create a "Recent viewed" section*/}
		</div>
	)
}

export default ProductDetails
