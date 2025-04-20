'use client'

import { useProfile } from '@/hooks/useProfile'
import Catalog from '@/ui/catalog/Catalog'

export default function Favorites() {
	const { profile } = useProfile()

	return (
		<>
			<Catalog products={profile?.favorites || []} title="Favorites" />
		</>
	)
}
