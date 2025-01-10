import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'

import Heading from '@/ui/Heading'
import Loader from '@/ui/Loader'
import Button from '@/ui/button/Button'

import { ReviewService } from '@/services/review.service'
import { IReviewFields } from './review-fields.interface'

const LeaveReviewForm: FC<{ productId: number }> = ({ productId }) => {
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm<IReviewFields>({
		mode: 'onChange'
	})

	const queryClient = useQueryClient()

	const { mutate, isSuccess, isLoading } = useMutation(
		['leave review'],
		(data: IReviewFields) => ReviewService.leave(productId, data),
		{
			onSuccess() {
				queryClient.refetchQueries(['get product', productId])
			}
		}
	)

	const onSubmit: SubmitHandler<IReviewFields> = data => {
		mutate(data)
		reset()
	}

	if (isSuccess) return <div>ReviewSuccessfully published!</div>

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading className="mb-4 text-center">Leave a review</Heading>

				{isLoading ? (
					<Loader />
				) : (
					<div>
						<Controller
							control={control}
							name="rating"
							render={({ field: { onChange, value } }) => (
								<Rating
									onClick={onChange}
									initialValue={value}
									SVGstyle={{
										display: 'inline-block'
									}}
									fillColor="#8b5cf6"
									size={20}
									transition
								/>
							)}
							rules={{
								required: 'Rating is required'
							}}
						/>
						<textarea
							{...formRegister('text', {
								required: 'Text is required'
							})}
							placeholder="your text here..."
							className="mt-4 block min-h-[110px] resize-none rounded-md border border-gray/70 bg-white p-3 text-sm"
						/>

						{Object.entries(errors) && (
							<ul className="animate-opacity mt-3 list-disc pl-4 text-sm text-red">
								{Object.entries(errors).map(([_, error]) => (
									<li>{error?.message}</li>
								))}
							</ul>
						)}

						<div className="mb-2 mt-8 text-center">
							<Button typeof="submit" variant="orange">
								Leave
							</Button>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}

export default LeaveReviewForm
