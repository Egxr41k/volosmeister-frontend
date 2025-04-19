'use client'
import FilledBtn from '@/ui/button/FilledBtn'
import Spinner from '@/ui/Spinner'
import { ProductService } from '@/services/product/product.service'
import { TypeProductData } from '@/services/product/product.types'
import { IProduct } from '@/types/product.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CategoryField } from './CategoryField'
import FeatureFields from './FeatureFields'
import { FormGallery } from './FormGallery'
import PropertyFields from './PropertyFields'
import { useImageFiles } from './useImageFiles'
import { useFormProduct } from './useProductFields'

interface IProductPage {
	initialProduct: IProduct
	slug?: string
}

const ProductForm = ({ initialProduct, slug = '' }: IProductPage) => {
	const { isLoading, error, data } = useQuery(
		['get product', initialProduct.id],
		() => ProductService.getBySlug(slug),
		{
			initialData: initialProduct,
			enabled: !!slug
		}
	)

	const { product, setProduct, setProductField } = useFormProduct(data)

	const {
		productImageFiles,
		setProductImageFiles,
		featureImageFiles,
		setFeatureImageFiles,
		setImagesToProduct
	} = useImageFiles()

	const formSubmit = async () => {
		const newProduct = await setImagesToProduct(product)
		const { id, category, ...productData } = newProduct

		setProduct(newProduct)

		updateMutation.mutate({ ...productData, categoryName: category.name })
	}

	const queryClient = useQueryClient()

	const updateMutation = useMutation({
		mutationFn: (updatedProduct: TypeProductData) =>
			ProductService.update(initialProduct.id, updatedProduct),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['products', initialProduct.id]
			})
		}
	})

	if (isLoading) return <Spinner />

	if (error) return <p>Error loading product</p>

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
							productImages={product.images}
							setProductImages={value => setProductField('images', value)}
							productImageFiles={productImageFiles}
							setProductImageFiles={setProductImageFiles}
						/>
						<div>
							<h2 className="text-xl font-semibold">Update product</h2>

							<input
								className="my-2 w-full rounded-md border border-solid border-gray-300"
								placeholder="name"
								type="text"
								onChange={event => setProductField('name', event.target.value)}
								value={product.name}
							/>

							<input
								className="my-2 w-full rounded-md border border-solid border-gray-300"
								placeholder="price"
								type="number"
								onChange={event =>
									setProductField('price', event.target.valueAsNumber)
								}
								value={product.price}
							/>

							<textarea
								className="my-2 h-20 w-full rounded-md border border-solid border-gray-300"
								placeholder="description"
								onChange={event =>
									setProductField('description', event.target.value)
								}
								value={product.description}
							/>

							<CategoryField
								category={product.category}
								setCategory={value => setProductField('category', value)}
							/>

							<PropertyFields
								properties={product.properties ?? []}
								setProperties={value => setProductField('properties', value)}
							/>
						</div>
					</div>

					<FeatureFields
						features={product.features ?? []}
						setFeatures={value => setProductField('features', value)}
						featureImageFiles={featureImageFiles}
						setFeatureImageFiles={setFeatureImageFiles}
					/>

					<FilledBtn handleClick={formSubmit}>Save</FilledBtn>
				</form>
			</div>
		</div>
	)
}

export default ProductForm
