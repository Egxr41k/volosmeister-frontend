import { getAdminUrl } from '@/config/url.config'
import { useTranslations } from 'next-intl'
import { IMenuItem } from './menu.interface'

export const getAdminMenu = (): IMenuItem[] => {
	const t = useTranslations('navigation.adminMenu')

	return [
		{
			label: t('dashboard'),
			href: getAdminUrl('')
		},
		{
			label: t('products'),
			href: getAdminUrl('/products')
		},
		{
			label: t('navigation.adminMenu.categories'),
			href: getAdminUrl('/categories')
		},
		{
			label: t('navigation.adminMenu.reviews'),
			href: getAdminUrl('/reviews')
		},
		{
			label: t('navigation.adminMenu.orders'),
			href: getAdminUrl('/orders')
		}
	]
}
