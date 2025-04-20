'use client'

import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'
import Navigation from '@/layout/header/navigation/Navigation'
import Link from 'next/link'
import { AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import HeaderCart from './cart/HeaderCart'
import HeaderProfile from './HeaderProfile'

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

			<div className="flex items-center gap-4">
				{user ? (
					<HeaderProfile />
				) : (
					<Link
						href="/auth"
						className="transition-colors duration-200 hover:text-emerald-500"
					>
						Sign in
					</Link>
				)}
				{user?.isAdmin && !isAdminPanel && (
					<Link
						href="/admin"
						className="hover:text-primary inline-block text-lg transition-colors duration-200"
					>
						<MdOutlineAdminPanelSettings size={29} />
					</Link>
				)}
				<Link
					href="/favorites"
					className="relative flex h-10 w-10 items-center justify-center rounded border border-solid border-emerald-200/90 border-emerald-300 text-emerald-500 transition-colors duration-200 hover:bg-emerald-200/90"
				>
					<AiOutlineHeart size={21} />
				</Link>
				<HeaderCart />
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
