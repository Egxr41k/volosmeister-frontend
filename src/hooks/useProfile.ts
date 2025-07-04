import { errorCatch } from '@/services/api/api.helper'
import { UserService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'

export const useProfile = () => {
	const { user } = useAuth()

	const { data } = useQuery(['get profile'], () => UserService.getProfile(), {
		onError: error => {
			console.log(errorCatch(error))
		},
		enabled: !!user,
		select: data => data
	})

	return { profile: data }
}
