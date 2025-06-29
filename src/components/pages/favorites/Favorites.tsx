'use client'

import { useProfile } from '@/hooks/useProfile'
import Catalog from '@/ui/catalog/Catalog'
import { useTranslations } from 'next-intl'

export default function Favorites() {
	const t = useTranslations('favorites')

	const { profile } = useProfile()

	return <Catalog products={profile?.favorites || []} title={t('title')} />
}
