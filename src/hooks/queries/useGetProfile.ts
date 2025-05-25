import { errorCatch } from '@/api/api.helper'
import { UserService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useGetProfile = (enabled: boolean) => {
	const { data } = useQuery(['get profile'], () => UserService.getProfile(), {
		onError: error => {
			console.log(errorCatch(error))
		},
		enabled,
		select: data => data.data
	})
	return { data }
}
