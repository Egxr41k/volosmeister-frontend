import { useQuery } from '@tanstack/react-query'

import { errorCatch } from '@/api/api.helper'

import { UserService } from '@/services/user.service'
import { useEffect } from 'react'
import { useAuth } from './useAuth'

export const useProfile = () => {
	const { user } = useAuth()

	const { data, error } = useQuery({
		queryKey: ['get profile'],
		queryFn: () => UserService.getProfile(),
		select: ({ data }) => data,
		enabled: !!user
	})

	useEffect(() => {
		console.log(errorCatch(error))
	}, [error])

	return { profile: data }
}
