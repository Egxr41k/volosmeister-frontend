import Spinner from '@/components/Spinner'
import FilledBtn from '@/components/btns/FilledBtn'
import { ProductService } from '@/services/product/product.service'
import { IProduct } from '@/types/product.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ProductForm = ({ id }: { id: string }) => {
	const queryClient = useQueryClient()

	const { register, handleSubmit, reset } = useForm<IProduct>()

	const { isLoading, isError, data, isSuccess } = useQuery({
		queryKey: ['product'],
		queryFn: () => ProductService.getById(id),
		select: data => data.data
	})

	//1. categories = CategoryService.getAll() + createNew

	useEffect(() => {
		if (isSuccess) reset(data)
	}, [isSuccess])

	const updateMutation = useMutation({
		mutationFn: (updatedProduct: IProduct) =>
			ProductService.update(id, {
				categoryId: updatedProduct.category.id,
				...updatedProduct
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products', id] })
		}
	})

	const onSubmit = (product: IProduct) => {
		updateMutation.mutate(product)
	}

	if (isLoading) return <Spinner />

	if (isError) return <p>Error loading product</p>

	return (
		<div className="flex h-[90vh] items-center justify-center bg-white text-black">
			<div className="h-[85vh] w-80 overflow-y-auto rounded-lg border border-solid border-gray-300 bg-white">
				<form
					className="h-64 p-5"
					encType="multipart/form-data"
					method="post"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h2 className="text-xl font-semibold">Оновити товар</h2>
					<div className="flex flex-wrap justify-between">
						<input
							className="my-2 w-48 rounded-lg border border-solid border-gray-300"
							placeholder="назва"
							type="text"
							{...register('name')}
						/>
						{/* <input
							className="my-2 w-32 rounded-lg border border-solid border-gray-300"
							placeholder="price"
							type="number"
							{...register('oldPrice', { valueAsNumber: true })}
						/> */}
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

					<FilledBtn handleClick={handleSubmit(onSubmit)}>Зберегти</FilledBtn>
				</form>
			</div>
		</div>
	)
}

export default ProductForm
