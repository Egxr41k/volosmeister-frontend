'use client'
import BorderedBtn from '@/components/btns/BorderedBtn'
import FilledBtn from '@/components/btns/FilledBtn'
import Spinner from '@/components/Spinner'
import { ProductService } from '@/services/product/product.service'
import IFeature from '@/types/data/IFeature'
import IProduct from '@/types/data/IProduct'
import IProperty from '@/types/data/IProperty'
import { useEffect, useState } from 'react'

const ProductForm = ({ params }: { params: { id: string } }) => {
	const { id } = params

	const emptyProduct = {} as IProduct
	const [product, setProduct] = useState(emptyProduct)

	useEffect(() => {
		ProductService.getById(id).then(result => {
			setProduct(result.data)
		})
	}, [])

	const formSubmit = async () => {
		// if (isProductExist) await request.updateProductInfo()
		// else await request.createProductInfo()
	}

	const FilePicker = ({ position }: { position: number }) => {
		return (
			<input
				type="file"
				id="fileInput"
				accept=".jpg"
				className="my-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:duration-300 file:ease-in-out hover:file:bg-fuchsia-600"
				onChange={event => {
					//setImageToPos(event.target.files?.[0], position)
				}}
			/>
		)
	}

	return product == emptyProduct ? (
		<Spinner />
	) : (
		<div className="flex h-[90vh] items-center justify-center">
			<div className="h-160 w-80 overflow-y-auto bg-fuchsia-50">
				<img
					src={
						''
						// images[0]
						// 	? URL.createObjectURL(images[0]!)
						// 	: isImagesExist[0]
						// 		? productInfo.product.imageSrc
						// 		: ''
					}
					alt="Selected image"
					className="h-72 w-full object-cover"
				/>
				<form
					className="h-64 p-5"
					encType="multipart/form-data"
					method="post"
					onSubmit={event => event.preventDefault()}
				>
					<h2 className="text-xl font-semibold">Оновити товар</h2>
					<FilePicker position={0} />

					<div className="flex flex-wrap justify-between">
						<input
							className="my-2 w-48"
							placeholder="назва"
							type="text"
							onChange={event => {
								setProduct(product => ({
									...product,
									name: event.target.value
								}))
							}}
							value={product.name}
						/>
						<input
							className="my-2 w-16"
							placeholder="кількість"
							type="number"
							onChange={event => {
								setProduct(product => ({
									...product,
									count: parseInt(event.target.value)
								}))
							}}
							value={product.count}
						/>

						<input
							className="my-2 w-32"
							placeholder="стара ціна"
							type="number"
							onChange={event => {
								setProduct(product => ({
									...product,
									oldPrice: parseInt(event.target.value)
								}))
							}}
							value={product.oldPrice}
						/>

						<input
							className="my-2 w-32"
							placeholder="нова ціна"
							type="number"
							onChange={event => {
								setProduct(product => ({
									...product,
									newPrice: parseInt(event.target.value)
								}))
							}}
							value={product.newPrice}
						/>
					</div>
					<textarea
						className="my-2 h-20 w-full"
						placeholder="опис"
						onChange={event => {
							setProduct(product => ({
								...product,
								description: event.target.value
							}))
						}}
						value={product.description}
					/>
					<div className="my-2">
						<div className="flex justify-between">
							<h2 className="my-auto text-xl font-semibold">
								{product.features.length != 0
									? 'Оновити cекції'
									: 'Додати cекції'}
							</h2>
							<BorderedBtn
								handleClick={() =>
									setProduct(product => ({
										...product,
										features: [
											...product.features,
											{
												description: '',
												id: 0,
												imageSrc: '',
												productId: product.id,
												title: ''
											}
										]
									}))
								}
							>
								+
							</BorderedBtn>
						</div>

						{product.features.map((feature: IFeature, i: number) => {
							return (
								<div key={i} className="my-2">
									<div className="my-2 flex justify-between">
										<h4 className="font-medium">Ceкція {i + 1}</h4>
										<BorderedBtn
											handleClick={() =>
												setProduct(prevState => ({
													...prevState,
													features: [
														...prevState.features.filter(
															(_, i) => i !== prevState.features.length - 1
														)
													]
												}))
											}
										>
											-
										</BorderedBtn>
									</div>
									<img
										src={
											''
											// images[index + 1]
											// 	? URL.createObjectURL(images[index + 1]!)
											// 	: isImagesExist[index + 1]
											// 		? feature.imageSrc
											// 		: '/NO_PHOTO_YET.png'
										}
										alt="Selected image"
										className="h-72 w-full object-cover"
									/>
									<FilePicker position={i + 1} />
									<input
										className="my-2 w-48"
										placeholder="назва"
										type="text"
										onChange={event => {
											const newFeatures = [...product.features]
											newFeatures[i].title = event.target.value

											setProduct(prevState => ({
												...prevState,
												features: newFeatures
											}))
										}}
										value={feature.title}
									/>
									<textarea
										className="my-2 h-20 w-full"
										placeholder="опис"
										onChange={event => {
											const newFeatures = [...product.features]
											newFeatures[i].description = event.target.value

											setProduct(prevState => ({
												...prevState,
												features: newFeatures
											}))
										}}
										value={feature.description}
									/>
								</div>
							)
						})}
					</div>
					<div className="my-2">
						<div className="flex justify-between">
							<h2 className="my-auto text-lg font-semibold">
								{product.properies.length != 0
									? 'Оновити характеристики'
									: 'Додати характеристики'}
							</h2>
							<BorderedBtn
								handleClick={() => {
									setProduct(prevState => ({
										...prevState,
										properies: [
											...prevState.properies,
											{
												id: 0,
												productId: product.id,
												name: '',
												value: ''
											}
										]
									}))
								}}
							>
								+
							</BorderedBtn>
						</div>

						{product.properies.map((property: IProperty, i: number) => {
							return (
								<div key={i} className="my-2">
									<div className="my-2 flex justify-between">
										<h4 className="font-medium">Характеристика {i + 1}</h4>
										<BorderedBtn
											handleClick={() =>
												setProduct(prevState => ({
													...prevState,
													stats: [
														...prevState.properies.filter(
															(_, i) => i !== prevState.properies.length - 1
														)
													]
												}))
											}
										>
											-
										</BorderedBtn>
									</div>

									<input
										className="my-2 w-32"
										placeholder="назва"
										type="text"
										onChange={event => {
											const newStats = [...product.properies]
											newStats[i].name = event.target.value

											setProduct(prevState => ({
												...prevState,
												properies: newStats
											}))
										}}
										value={property.name}
									/>
									<input
										className="my-2 w-32"
										placeholder="значення"
										type="text"
										onChange={event => {
											const newStats = [...product.properies]
											newStats[i].value = event.target.value
											setProduct(prevState => ({
												...prevState,
												properies: newStats
											}))
										}}
										value={property.value}
									/>
								</div>
							)
						})}
					</div>
					<FilledBtn handleClick={formSubmit}>'Оновити'</FilledBtn>
				</form>
			</div>
		</div>
	)
}
export default ProductForm
