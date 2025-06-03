import { instance } from '@/services/api/api.intercepter'
import { IFullUser, IUser, TypeUserData } from '@/types/user.interface'

const USERS = '/users'

export const UserService = {
	async getProfile() {
		const { data } = await instance<IFullUser>({
			url: `${USERS}/profile`,
			method: 'GET'
		})

		return data
	},

	async updateProfile(dataToUpdate: TypeUserData) {
		const { data } = await instance<IUser>({
			url: `${USERS}/profile`,
			method: 'PUT',
			data: dataToUpdate
		})

		return data
	},

	async toggleFavorite(productId: string | number) {
		const { data } = await instance<IUser>({
			url: `${USERS}/profile/favorites/${productId}`,
			method: 'PATCH'
		})

		return data
	}
}
