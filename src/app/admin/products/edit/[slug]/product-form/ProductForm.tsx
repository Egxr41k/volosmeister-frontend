'use client'

import { ProductService } from '@/services/product/product.service'
import { TypeProductData } from '@/services/product/product.types'
import { IProduct } from '@/types/product.interface'
import FilledBtn from '@/ui/button/FilledBtn'
import Spinner from '@/ui/Spinner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { CategoryField } from './CategoryField'
import FeatureFields from './FeatureFields'
import { FormGallery } from './FormGallery'
import { ManufacturerField } from './ManufacturerField'
import PropertyFields from './PropertyFields'
import { useImageFiles } from './useImageFiles'
import { useFormProduct } from './useProductFields'

interface IProductPage {
	initialProduct?: IProduct
	similarProducts: IProduct[]
	slug?: string
}

const ProductForm = ({ initialProduct, slug = '' }: IProductPage) => {
	const router = useRouter()
	const queryClient = useQueryClient()

	const isEditMode = !!initialProduct

	const { product, setProduct, setProductField } =
		useFormProduct(initialProduct)

	const {
		productImageFiles,
		setProductImageFiles,
		featureImageFiles,
		setFeatureImageFiles,
		setImagesToProduct
	} = useImageFiles()

	const updateMutation = useMutation({
		mutationFn: (updatedProduct: TypeProductData) =>
			ProductService.update(product.id!, updatedProduct),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['products', product.id]
			})
		}
	})

	const createMutation = useMutation({
		mutationFn: (data: TypeProductData) => ProductService.create(data),
		onSuccess: created => {
			router.push(`/admin/products/edit/${created.data.slug}`)
		}
	})

	const formSubmit = async () => {
		const newProduct = await setImagesToProduct(product)
		const { id, category, ...productData } = newProduct
		const data: TypeProductData = {
			...productData,
			categoryName: category.name
		}

		isEditMode ? updateMutation.mutate(data) : createMutation.mutate(data)
	}

	if (isEditMode && !product.id) return <Spinner />

	//if (error) return <p>Error loading product</p>

	return (
		<div className="flex items-center justify-center">
			<div className="w-full rounded-md border border-solid border-gray-300">
				<form
					className="p-5"
					encType="multipart/form-data"
					method="post"
					onSubmit={event => event.preventDefault()}
				>
					<div className="flex gap-5">
						<FormGallery
							productImages={product.images ?? []}
							setProductImages={value => setProductField('images', value)}
							productImageFiles={productImageFiles}
							setProductImageFiles={setProductImageFiles}
						/>
						<div>
							<h2 className="text-xl font-semibold">Update product</h2>

							<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
								<input
									className="w-full px-4 py-2 outline-none"
									placeholder="name"
									type="text"
									onChange={event =>
										setProductField('name', event.target.value)
									}
									value={product.name}
								/>
							</div>

							<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
								<input
									className="w-full px-4 py-2 outline-none"
									placeholder="price"
									type="number"
									onChange={event =>
										setProductField('price', event.target.valueAsNumber)
									}
									value={product.price}
								/>
							</div>

							<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
								<textarea
									className="w-full px-4 py-2 outline-none"
									placeholder="description"
									onChange={event =>
										setProductField('description', event.target.value)
									}
									value={product.description}
								/>
							</div>

							<CategoryField
								category={product.category}
								setCategory={value => setProductField('category', value)}
							/>

							<ManufacturerField
								manufacturer={product.manufacturer}
								setManufacturer={value =>
									setProductField('manufacturer', value)
								}
							/>

							<PropertyFields
								properties={product.properties ?? []}
								setProperties={value => setProductField('properties', value)}
							/>
							<FeatureFields
								features={product.features ?? []}
								setFeatures={value => setProductField('features', value)}
								featureImageFiles={featureImageFiles}
								setFeatureImageFiles={setFeatureImageFiles}
							/>
						</div>
					</div>
					<div className="text-center">
						<FilledBtn handleClick={formSubmit}>Save</FilledBtn>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ProductForm
