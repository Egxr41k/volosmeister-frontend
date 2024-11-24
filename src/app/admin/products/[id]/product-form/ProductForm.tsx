'use client'
import FilledBtn from '@/components/btns/FilledBtn'
import Spinner from '@/components/Spinner'
import { ImageService } from '@/services/image.service'
import { ProductService } from '@/services/product/product.service'
import { TypeProductData } from '@/services/product/product.types'
import { IFeature } from '@/types/feature.interface'
import { IProduct } from '@/types/product.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { CategoryField } from './CategoryField'
import FeatureFields from './FeatureFields'
import { FormGallery } from './FormGallery'
import PropertyFields from './PropertyFields'

const ProductForm = ({ id }: { id: string }) => {
	const [product, setProduct] = useState({} as IProduct)

	const [productImageFiles, setProductImageFiles] = useState(
		[] as (File | undefined)[]
	)

	const [featureImageFiles, setFeatureImageFiles] = useState(
		[] as (File | undefined)[]
	)

	const { isLoading, isError, data, isSuccess } = useQuery({
		queryKey: ['product'],
		queryFn: () => ProductService.getById(id),
		select: data => data.data
	})

	useEffect(() => {
		if (isSuccess) setProduct(data)
	}, [isSuccess])

	const formSubmit = async () => {
		const newProduct = await setImagesToProduct()

		setProduct(newProduct)

		const productData = FormatProductData(product)
		updateMutation.mutate(productData)
	}

	const setImagesToProduct = async (): Promise<IProduct> => {
		const productImagesSrc = await initProductImageSrc(productImageFiles)
		const featureImagesSrc = await initFeatureImageSrc(featureImageFiles)

		setProductImageFiles([])
		setFeatureImageFiles([])

		return {
			...product,
			images: productImagesSrc,
			features: setImagesSrcToFeature(featureImagesSrc)
		}
	}

	const initProductImageSrc = async (
		productImageFiles: (File | undefined)[]
	) => {
		return await Promise.all(
			product.images.map(async (image: string, index: number) => {
				if (productImageFiles[index]) {
					return (await ImageService.saveImage(
						productImageFiles[index]!
					)) as string
				} else {
					return image
				}
			})
		)
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
					return feature.image
				}
			})
		)
	}

	const setImagesSrcToFeature = (featureImagesSrc: string[]) => {
		return product.features.map((feature: IFeature, index: number) => {
			if (index < featureImagesSrc.length) {
				return { ...feature, imageSrc: featureImagesSrc[index] }
			} else return feature
		})
	}

	const queryClient = useQueryClient()

	const FormatProductData = (product: IProduct): TypeProductData => {
		return {
			name: product.name,
			price: product.price,
			description: product.description,
			images: product.images,
			categoryId: product.category.id,
			features: product.features.map(feature => {
				return {
					title: feature.title,
					image: feature.image,
					description: feature.description
				}
			}),
			properties: product.properties.map(property => {
				return {
					name: property.name,
					value: property.value
				}
			})
		}
	}

	const updateMutation = useMutation({
		mutationFn: (updatedProduct: TypeProductData) =>
			ProductService.update(id, updatedProduct),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products', id] })
		}
	})

	if (isLoading) return <Spinner />

	if (isError) return <p>Error loading product</p>

	return (
		<div className="flex h-[90vh] items-center justify-center">
			<div className="h-160 w-80 overflow-y-auto bg-fuchsia-50">
				<form
					className="h-64 p-5"
					encType="multipart/form-data"
					method="post"
					onSubmit={event => event.preventDefault()}
				>
					<h2 className="text-xl font-semibold">Оновити товар</h2>

					<FormGallery
						productImages={product.images}
						setProductImages={value => {
							setProduct(prevState => ({
								...prevState,
								images: value
							}))
						}}
						productImageFiles={productImageFiles}
						setProductImageFiles={setProductImageFiles}
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
							className="my-2 w-32"
							placeholder="нова ціна"
							type="number"
							onChange={event => {
								setProduct(prevState => ({
									...prevState,
									newPrice: parseInt(event.target.value)
								}))
							}}
							value={product.price}
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

					<CategoryField
						category={product.category}
						setCategory={value => {
							setProduct(prevState => ({
								...prevState,
								category: value
							}))
						}}
					/>

					<FeatureFields
						features={product.features}
						setFeatures={value => {
							setProduct(prevState => ({
								...prevState,
								features: value
							}))
						}}
						featureImageFiles={featureImageFiles}
						setFeatureImageFiles={setProductImageFiles}
					/>

					<PropertyFields
						properties={product.properties}
						setProperties={value => {
							setProduct(prevState => ({
								...prevState,
								properties: value
							}))
						}}
					/>

					<FilledBtn handleClick={formSubmit}>Зберегти</FilledBtn>
				</form>
			</div>
		</div>
	)
}

export default ProductForm
