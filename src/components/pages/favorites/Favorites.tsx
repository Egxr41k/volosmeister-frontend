'use client'

import { useProfile } from '@/hooks/useProfile'
import Catalog from '@/ui/catalog/Catalog'
import RecomendedProducts from '@/ui/RecomendedProducts'
import { useTranslations } from 'next-intl'

export default function Favorites() {
	const t = useTranslations('favorites')

	const { profile } = useProfile()

	if (!profile?.favorites.length)
		return <RecomendedProducts title={t('alternativeTitle')} />

	return (
		<main className="flex-grow px-48">
			<Catalog products={profile?.favorites || []} title={t('title')} />
		</main>
	)
}
