'use client'

import { ProductService } from '@/services/product.service'
import { IProduct, TypeProductData } from '@/types/product.interface'
import FilledBtn from '@/ui/button/FilledBtn'
import Spinner from '@/ui/Spinner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { CategoryField } from './CategoryField'
import FeatureFields from './FeatureFields'
import { FormGallery } from './FormGallery'
import { IngredientsField } from './IngredientsField'
import { ManufacturerField } from './ManufacturerField'
import PropertyFields from './PropertyFields'
import { SizesPricesField } from './SizesPricesField'
import { useImageFiles } from './useImageFiles'
import { useFormProduct } from './useProductFields'

interface IProductPage {
	initialProduct?: IProduct
	slug?: string
}

const ProductForm = ({ initialProduct, slug }: IProductPage) => {
	const router = useRouter()

	const isEditMode = !!slug

	const { data, isFetching } = useQuery({
		queryKey: ['get product', slug],
		queryFn: () => ProductService.getBySlug(slug!),
		select: data => data,
		enabled: isEditMode,
		initialData: initialProduct
	})

	const { product, setProduct, setProductField } = useFormProduct(data)

	const {
		productImageFiles,
		setProductImageFiles,
		featureImageFiles,
		setFeatureImageFiles,
		setImagesToProduct
	} = useImageFiles()

	const queryClient = useQueryClient()

	const { mutate: update } = useMutation({
		mutationFn: (data: TypeProductData) =>
			ProductService.update(product.id, data),
		onSuccess: updated => {
			router.push(`/admin/products/edit/${updated.slug}`)
			queryClient.invalidateQueries({
				queryKey: ['products', product.id]
			})
		}
	})

	const { mutate: create } = useMutation({
		mutationFn: (data: TypeProductData) => ProductService.create(data),
		onSuccess: created => {
			router.push(`/admin/products/edit/${created.slug}`)
			queryClient.invalidateQueries({
				queryKey: ['products', product.id]
			})
		}
	})

	const formSubmit = async () => {
		const newProduct = await setImagesToProduct(product)
		setProduct(value => ({
			...value,
			images: newProduct.images,
			features: newProduct.features
		}))
		const { id, category, reviews, manufacturer, ...productData } = newProduct
		const data = {
			...productData,
			categoryName: category.name,
			manufacturerName: manufacturer.name
		} as TypeProductData

		isEditMode ? update(data) : create(data)
	}

	if (isFetching) return <Spinner />

	if (isEditMode && !product) return <p>Error loading product</p>

	return (
		<div className="flex items-center justify-center">
			<div className="rounded-md border border-solid border-gray-300">
				<form
					className="flex flex-col gap-5 p-5 sm:flex-row"
					encType="multipart/form-data"
					method="post"
					onSubmit={event => event.preventDefault()}
				>
					<FormGallery
						productImages={product.images ?? []}
						setProductImages={value => setProductField('images', value)}
						productImageFiles={productImageFiles}
						setProductImageFiles={setProductImageFiles}
					/>
					<div>
						<h2 className="text-xl font-semibold">
							{isEditMode ? 'Update product' : 'Create product'}
						</h2>

						<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
							<input
								className="w-full px-4 py-2 outline-none"
								placeholder="name"
								type="text"
								onChange={event => setProductField('name', event.target.value)}
								value={product.name}
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

						<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
							<textarea
								className="w-full px-4 py-2 outline-none"
								placeholder="instruction for use"
								onChange={event =>
									setProductField('instructionForUse', event.target.value)
								}
								value={product.instructionForUse}
							/>
						</div>

						<IngredientsField
							ingredients={product.ingredients ?? []}
							setIngredients={value => setProductField('ingredients', value)}
						/>

						<SizesPricesField
							sizes={product.sizes ?? []}
							setSizes={value => setProductField('sizes', value)}
							prices={product.prices ?? []}
							setPrices={value => setProductField('prices', value)}
						/>

						<CategoryField
							category={product.category}
							setCategory={value => setProductField('category', value)}
						/>

						<ManufacturerField
							manufacturer={product.manufacturer}
							setManufacturer={value => setProductField('manufacturer', value)}
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
				</form>
				<div className="text-center">
					<FilledBtn handleClick={formSubmit}>Save</FilledBtn>
				</div>
			</div>
		</div>
	)
}

export default ProductForm
