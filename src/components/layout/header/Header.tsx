'use client'

import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'
import Navigation from '@/layout/header/navigation/Navigation'
import Link from 'next/link'
import HeaderCart from './cart/HeaderCart'

const Header = () => {
	const { isAdminPanel } = useIsAdminPanel()
	const { user } = useAuth()

	return (
		<header className="flex w-full items-center justify-between px-48 py-6">
			<Navigation />

			<Link href="/">
				{isAdminPanel ? (
					<h2 className="text-3xl font-semibold"> Admin Panel</h2>
				) : (
					<h2 className="">volosmeister</h2>
				)}
			</Link>

			<HeaderCart />
		</header>
	)
}

export default Header
