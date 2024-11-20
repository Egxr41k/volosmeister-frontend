'use client'
import FilledBtn from '@/components/btns/FilledBtn'
import Spinner from '@/components/Spinner'
import { ProductService } from '@/services/product/product.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FeaturesFields from './FeatureFields'
import { IFormProduct } from './form.types'
import PropertyFields from './PropertyFields'

const ProductForm = ({ id }: { id: string }) => {
	const queryClient = useQueryClient()

	const { register, handleSubmit, control, reset } = useForm<IFormProduct>({
		defaultValues: {
			features: [],
			properties: []
		}
	})

	const { isLoading, isError, data, isSuccess } = useQuery({
		queryKey: ['product'],
		queryFn: () => ProductService.getById(id),
		select: data => data.data
	})

	useEffect(() => {
		if (isSuccess) reset(data)
	}, [isSuccess])

	const updateMutation = useMutation({
		mutationFn: (updatedProduct: IFormProduct) =>
			ProductService.update(id, {
				...updatedProduct
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products', id] })
		}
	})

	const onSubmit = (product: IFormProduct) => {
		updateMutation.mutate(product)
	}

	if (isLoading) return <Spinner />

	if (isError) return <p>Error loading product</p>

	return (
		<div className="flex h-[90vh] items-center justify-center bg-white text-black">
			<div className="h-[85vh] w-80 overflow-y-auto rounded-lg border border-solid border-gray-300 bg-white">
				<form className="h-64 p-5" encType="multipart/form-data" method="post">
					<h2 className="text-xl font-semibold">Оновити товар</h2>
					<div className="flex flex-wrap justify-between">
						<input
							className="my-2 w-48 rounded-lg border border-solid border-gray-300"
							placeholder="назва"
							type="text"
							{...register('name')}
						/>
						<input
							className="my-2 w-32 rounded-lg border border-solid border-gray-300"
							placeholder="нова ціна"
							type="number"
							{...register('price', { valueAsNumber: true })}
						/>
					</div>

					<textarea
						className="my-2 h-20 w-full rounded-lg border border-solid border-gray-300"
						placeholder="опис"
						{...register('description')}
					/>

					<FeaturesFields register={register} control={control} />

					<PropertyFields register={register} control={control} />

					<FilledBtn handleClick={handleSubmit(onSubmit)}>Зберегти</FilledBtn>
				</form>
			</div>
		</div>
	)
}

export default ProductForm
