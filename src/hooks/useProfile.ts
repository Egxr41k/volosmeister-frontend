import { useGetProfile } from './queries/useGetProfile'
import { useAuth } from './useAuth'

export const useProfile = () => {
	const { user } = useAuth()

	const { data } = useGetProfile(!!user)

	return { profile: data }
}
