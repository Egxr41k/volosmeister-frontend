'use client'
import BorderedBtn from '@/components/btns/BorderedBtn'
import FilledBtn from '@/components/btns/FilledBtn'
import Spinner from '@/components/Spinner'
import { ProductService } from '@/services/product/product.service'
import IProduct from '@/types/data/IProduct'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import ServerImage from '../ServerImage'

const ProductForm = ({ id }: { id: string }) => {
	const queryClient = useQueryClient()

	const { register, handleSubmit, control, setValue, reset } =
		useForm<IProduct>({
			defaultValues: {
				features: [],
				properies: []
			}
		})

	const {
		fields: featureFields,
		append: appendFeature,
		remove: removeFeature
	} = useFieldArray({
		control,
		name: 'features'
	})

	const {
		fields: propertyFields,
		append: appendProperty,
		remove: removeProperty
	} = useFieldArray({
		control,
		name: 'properies'
	})

	const {
		isLoading,
		error,
		data: product,
		isSuccess
	} = useQuery({
		queryKey: ['product'],
		queryFn: () => ProductService.getById(id),
		select: data => data.data
	})

	useEffect(() => {
		if (isSuccess) reset(product)
	}, [isSuccess])

	const updateMutation = useMutation({
		mutationFn: (updatedProduct: IProduct) =>
			ProductService.update(id, updatedProduct),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products', id] })
		}
	})

	const onSubmit = (product: IProduct) => {
		updateMutation.mutate(product)
	}

	if (isLoading) return <Spinner />

	if (error || !product) return <p>Error loading product</p>

	return (
		<div className="flex h-[90vh] items-center justify-center bg-fuchsia-200 text-black">
			<div className="h-[85vh] w-80 overflow-y-auto bg-fuchsia-50">
				<form
					className="h-64 p-5"
					encType="multipart/form-data"
					method="post"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h2 className="text-xl font-semibold">Оновити товар</h2>

					<Controller
						name="imageSrc"
						control={control}
						render={({ field }) => (
							<>
								<div className="h-72">
									<ServerImage imageSrc={field.value} />
								</div>
								<input
									className="my-2 w-48"
									placeholder="Посилання на зображення"
									type="text"
									{...field}
								/>
							</>
						)}
					/>

					<div className="flex flex-wrap justify-between">
						<input
							className="my-2 w-48"
							placeholder="назва"
							type="text"
							{...register('name')}
						/>
						<input
							className="my-2 w-16"
							placeholder="кількість"
							type="number"
							{...register('count', { valueAsNumber: true })}
						/>
						<input
							className="my-2 w-32"
							placeholder="стара ціна"
							type="number"
							{...register('oldPrice', { valueAsNumber: true })}
						/>
						<input
							className="my-2 w-32"
							placeholder="нова ціна"
							type="number"
							{...register('newPrice', { valueAsNumber: true })}
						/>
					</div>

					<textarea
						className="my-2 h-20 w-full"
						placeholder="опис"
						{...register('description')}
					/>

					<div className="my-2">
						<div className="flex justify-between">
							<h2 className="my-auto text-xl font-semibold">
								{featureFields.length ? 'Оновити cекції' : 'Додати cекції'}
							</h2>
							<BorderedBtn
								handleClick={() =>
									appendFeature({
										id: 0,
										title: '',
										imageSrc: '',
										description: '',
										productId: parseInt(id)
									})
								}
							>
								+
							</BorderedBtn>
						</div>

						{featureFields.map((feature, index) => (
							<div key={feature.id} className="my-2">
								<div className="my-2 flex justify-between">
									<h4 className="font-medium">Ceкція {index + 1}</h4>
									<BorderedBtn handleClick={() => removeFeature(index)}>
										-
									</BorderedBtn>
								</div>
								<Controller
									name={`features.${index}.imageSrc`}
									control={control}
									render={({ field }) => (
										<>
											<div className="h-72">
												<ServerImage imageSrc={field.value} />
											</div>

											<input
												className="my-2 w-48"
												placeholder="послання на зображення"
												type="text"
												{...field}
											/>
										</>
									)}
								/>
								<input
									className="my-2 w-48"
									placeholder="назва"
									{...register(`features.${index}.title`)}
								/>
								<textarea
									className="my-2 h-20 w-full"
									placeholder="опис"
									{...register(`features.${index}.description`)}
								/>
							</div>
						))}
					</div>

					<div className="my-2">
						<div className="flex justify-between">
							<h2 className="my-auto text-lg font-semibold">
								{propertyFields.length
									? 'Оновити характеристики'
									: 'Додати характеристики'}
							</h2>
							<BorderedBtn
								handleClick={() =>
									appendProperty({
										id: 0,
										name: '',
										value: '',
										productId: parseInt(id)
									})
								}
							>
								+
							</BorderedBtn>
						</div>

						{propertyFields.map((property, index) => (
							<div key={property.id} className="my-2">
								<div className="my-2 flex justify-between">
									<h4 className="font-medium">Характеристика {index + 1}</h4>
									<BorderedBtn handleClick={() => removeProperty(index)}>
										-
									</BorderedBtn>
								</div>
								<input
									className="my-2 w-32"
									placeholder="назва"
									{...register(`properies.${index}.name`)}
								/>
								<input
									className="my-2 w-32"
									placeholder="значення"
									{...register(`properies.${index}.value`)}
								/>
							</div>
						))}
					</div>
					<FilledBtn handleClick={handleSubmit(onSubmit)}>'Зберегти'</FilledBtn>
				</form>
			</div>
		</div>
	)
}

export default ProductForm
