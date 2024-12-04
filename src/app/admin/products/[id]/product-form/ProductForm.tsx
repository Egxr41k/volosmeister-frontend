'use client'
import FilledBtn from '@/components/btns/FilledBtn'
import Spinner from '@/components/Spinner'
import { ProductService } from '@/services/product/product.service'
import { TypeProductData } from '@/services/product/product.types'
import { IProduct } from '@/types/product.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { CategoryField } from './CategoryField'
import FeatureFields from './FeatureFields'
import { FormGallery } from './FormGallery'
import PropertyFields from './PropertyFields'
import { useImageFiles } from './useImageFiles'
import { useFormProduct } from './useProductFields'

const ProductForm = ({ id }: { id: string }) => {
	const { product, setProduct, setProductField } = useFormProduct()

	const {
		productImageFiles,
		setProductImageFiles,
		featureImageFiles,
		setFeatureImageFiles,
		setImagesToProduct
	} = useImageFiles()

	const { isLoading, isError, data, isSuccess } = useQuery({
		queryKey: ['product'],
		queryFn: () => ProductService.getById(id),
		select: data => data.data
	})

	useEffect(() => {
		if (isSuccess) setProduct(data)
	}, [isSuccess])

	const formSubmit = async () => {
		const newProduct = await setImagesToProduct(product)

		setProduct(newProduct)

		const productData = FormatProductData(product)
		updateMutation.mutate(productData)
	}

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

	const queryClient = useQueryClient()

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
						setProductImages={value => setProductField('images', value)}
						productImageFiles={productImageFiles}
						setProductImageFiles={setProductImageFiles}
					/>

					<input
						className="my-2 w-48"
						placeholder="назва"
						type="text"
						onChange={event => setProductField('name', event.target.value)}
						value={product.name}
					/>

					<input
						className="my-2 w-32"
						placeholder="нова ціна"
						type="number"
						onChange={event =>
							setProductField('price', event.target.valueAsNumber)
						}
						value={product.price}
					/>

					<textarea
						className="my-2 h-20 w-full"
						placeholder="опис"
						onChange={event =>
							setProductField('description', event.target.value)
						}
						value={product.description}
					/>

					<CategoryField
						category={product.category}
						setCategory={value => setProductField('category', value)}
					/>

					<FeatureFields
						features={product.features}
						setFeatures={value => setProductField('features', value)}
						featureImageFiles={featureImageFiles}
						setFeatureImageFiles={setFeatureImageFiles}
					/>

					<PropertyFields
						properties={product.properties}
						setProperties={value => setProductField('properties', value)}
					/>

					<FilledBtn handleClick={formSubmit}>Зберегти</FilledBtn>
				</form>
			</div>
		</div>
	)
}

export default ProductForm
