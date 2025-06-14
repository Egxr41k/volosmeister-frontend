import { REFRESH_TOKEN } from '@/constants/token.constants'
import { axiosClassic } from '@/services/api/api.intercepter'
import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface'
import Cookies from 'js-cookie'
import { saveToStorage } from './auth.helper'

export const AuthService = {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await axiosClassic<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data
		})

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			'/auth/login/access-token',
			{ refreshToken }
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	}
}
