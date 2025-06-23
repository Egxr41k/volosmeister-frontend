import { ReviewService } from '@/services/review.service'
import Button from '@/ui/button/Button'
import Spinner from '@/ui/Spinner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'
import { IReviewFields } from './review-fields.interface'

const LeaveReviewForm = ({ productId }: { productId: number }) => {
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
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1 className="mb-4 text-center text-3xl font-semibold">
					Leave a review
				</h1>

				{isLoading ? (
					<Spinner />
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
							className="border-gray/70 mt-4 block min-h-[110px] resize-none rounded-md border bg-white p-3 text-sm"
						/>

						{Object.entries(errors) && (
							<ul className="animate-opacity text-red mt-3 list-disc pl-4 text-sm">
								{Object.entries(errors).map(([_, error]) => (
									<li>{error?.message}</li>
								))}
							</ul>
						)}

						<div className="mb-2 mt-8 text-center">
							<Button typeof="submit" variant="active">
								Leave
							</Button>
						</div>
					</div>
				)}
			</form>
		</>
	)
}

export default LeaveReviewForm
