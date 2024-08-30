'use client'
import BorderedBtn from '@/components/btns/BorderedBtn'
import FilledBtn from '@/components/btns/FilledBtn'
import Spinner from '@/components/Spinner'
import { ImageService } from '@/services/image.service'
import { ProductService } from '@/services/product/product.service'
import IFeature from '@/types/data/IFeature'
import IProduct from '@/types/data/IProduct'
import IProperty from '@/types/data/IProperty'
import { useEffect, useState } from 'react'

const ProductForm = ({ params }: { params: { id: string } }) => {
	const { id } = params

	const emptyProduct = {} as IProduct
	const [product, setProduct] = useState(emptyProduct)
	const [images, setImages] = useState<(File | undefined)[]>([])
	const [isImagesExist, setIsImagesExist] = useState([false])

	useEffect(() => {
		ProductService.getById(id).then(result => {
			setProduct(result.data)
			checkImagesExist(result.data).catch(error => console.log(error))
		})
	}, [])

	const formSubmit = async () => {
		const [productImagesSrc, ...featureImagesSrc] = await initImagesSrc()

		setProduct(product => ({
			...product,
			imageSrc: productImagesSrc,
			features: setImagesSrcToFeature(featureImagesSrc)
		}))

		await ProductService.update(id, product)
	}

	const checkImagesExist = async (product: IProduct) => {
		const isProductImageExist = await ImageService.checkImageExisting(
			product.imageSrc
		)
		const isFeaturesImagesExist = await Promise.all(
			product.features.map(async (feature: IFeature, index: number) => {
				return await ImageService.checkImageExisting(feature.imageSrc)
			})
		)
		setIsImagesExist([isProductImageExist, ...isFeaturesImagesExist])
	}

	const setImagesSrcToFeature = (featureImagesSrc: string[]) => {
		return product.features.map((feature: IFeature, index: number) => {
			if (index < featureImagesSrc.length) {
				return { ...feature, imageSrc: featureImagesSrc[index] }
			} else return feature
		})
	}

	const initImagesSrc = async () => {
		const [productImageFile, ...featureImageFiles] = images

		let productImagesSrc = await initProductImageSrc(productImageFile)

		let featureImagesSrc = await initFeatureImageSrc(featureImageFiles)

		setImages([])
		return [productImagesSrc, ...featureImagesSrc]
	}

	const initProductImageSrc = async (productImgFile: File | undefined) => {
		if (productImgFile) {
			return (await ImageService.saveImage(productImgFile)) as string
		} else {
			return product.imageSrc
		}
	}

	const initFeatureImageSrc = async (
		featureImageFiles: (File | undefined)[]
	) => {
		return await Promise.all(
			product.features.map(async (feature: IFeature, index: number) => {
				if (featureImageFiles[index]) {
					return (await ImageService.saveImage(
						featureImageFiles[index]!
					)) as string
				} else {
					return feature.imageSrc
				}
			})
		)
	}

	const setImageToPos = (image: File | undefined, i: number) => {
		const newImages = [...images]
		if (image) newImages[i] = image
		else return
		setImages(newImages)
	}

	return product == emptyProduct ? (
		<Spinner />
	) : (
		<div className="flex h-[90vh] items-center justify-center">
			<div className="h-160 w-80 overflow-y-auto bg-fuchsia-50">
				<form
					className="h-64 p-5"
					encType="multipart/form-data"
					method="post"
					onSubmit={event => event.preventDefault()}
				>
					<h2 className="text-xl font-semibold">Оновити товар</h2>

					<img
						src={
							images[0]
								? URL.createObjectURL(images[0])
								: isImagesExist[0]
									? product.imageSrc
									: '/NO_PHOTO_YET.png'
						}
						alt="Selected image"
						className="h-72 w-full object-cover"
					/>
					<input
						type="file"
						id="fileInput"
						accept=".jpg"
						className="my-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:duration-300 file:ease-in-out hover:file:bg-fuchsia-600"
						onChange={event => {
							setImageToPos(event.target.files?.[0], 0)
						}}
					/>

					<input
						className="my-2 w-48"
						placeholder="Посилання на зображення"
						type="text"
						onChange={event => {
							setProduct(prevState => ({
								...prevState,
								imageSrc: event.target.value
							}))
						}}
						value={product.imageSrc}
					/>

					<div className="flex flex-wrap justify-between">
						<input
							className="my-2 w-48"
							placeholder="назва"
							type="text"
							onChange={event => {
								setProduct(prevState => ({
									...prevState,
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
								setProduct(prevState => ({
									...prevState,
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
								setProduct(prevState => ({
									...prevState,
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
							setProduct(prevState => ({
								...prevState,
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
								handleClick={() => {
									setProduct(prevState => ({
										...prevState,
										features: [
											...prevState.features,
											{
												description: '',
												id: 0,
												imageSrc: '',
												productId: product.id,
												title: ''
											}
										]
									}))
									setImages([...images, undefined])
								}}
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
											handleClick={() => {
												setProduct(prevState => ({
													...prevState,
													features: [
														...prevState.features.filter(
															(_, i) => i !== prevState.features.length - 1
														)
													]
												}))

												setImages(
													images.filter((_, i) => i !== images.length - 1)
												)
											}}
										>
											-
										</BorderedBtn>
									</div>
									<img
										src={
											images[i + 1]
												? URL.createObjectURL(images[i + 1]!)
												: isImagesExist[0]
													? product.imageSrc
													: '/NO_PHOTO_YET.png'
										}
										alt="Selected image"
										className="h-72 w-full object-cover"
									/>
									<input
										type="file"
										id="fileInput"
										accept=".jpg"
										className="my-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:duration-300 file:ease-in-out hover:file:bg-fuchsia-600"
										onChange={event => {
											setImageToPos(event.target.files?.[0], i + 1)
										}}
									/>
									<input
										className="my-2 w-48"
										placeholder="послання на зображення"
										type="text"
										onChange={event => {
											const newFeatures = [...product.features]
											newFeatures[i].imageSrc = event.target.value

											setProduct(prevState => ({
												...prevState,
												features: newFeatures
											}))
										}}
										value={feature.imageSrc}
									/>
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
					<FilledBtn handleClick={formSubmit}>'Зберегти'</FilledBtn>
				</form>
			</div>
		</div>
	)
}
export default ProductForm
