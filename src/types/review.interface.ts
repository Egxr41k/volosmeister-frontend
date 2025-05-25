import { IUser } from './user.interface'

export interface IReview {
	id: number
	user: IUser
	createAt: Date
	text: string
	rating: number
}

export type TypeReviewData = {
	text: string
	rating: number
}
