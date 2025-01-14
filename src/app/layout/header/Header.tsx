'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'

import HeaderProfile from './HeaderProfile'
import HeaderCart from './cart/HeaderCart'
import Navigation from '@/components/old-ui/navigation/Navigation'

const Header: FC = () => {
	const { isAdminPanel } = useIsAdminPanel()
	const { user } = useAuth()

	return (
		<header className="flex w-full items-center justify-between px-48 py-6">
			<Navigation />

			<Link href="/">
				{isAdminPanel ? (
					<h2 className="text-3xl font-semibold"> Admin Panel</h2>
				) : (
					<>
						<Image
							src="/logo.svg"
							alt="The Blooming Home Logo"
							width={250}
							height={50}
						/>
					</>
				)}
			</Link>
			<div className="flex items-center gap-10">
				<Link
					href="/favorites"
					className="transition-colors duration-200 hover:text-violet-500"
				>
					<AiOutlineHeart size={28} />
				</Link>
				{user ? (
					<HeaderProfile />
				) : (
					<Link
						href="/auth"
						className="transition-colors duration-200 hover:text-violet-500"
					>
						Sign in
					</Link>
				)}
				{user?.isAdmin && !isAdminPanel && (
					<Link
						href="/admin"
						className="inline-block text-lg transition-colors duration-200 hover:text-violet-500"
					>
						<MdOutlineAdminPanelSettings size={28} />
					</Link>
				)}
				<HeaderCart />
			</div>
		</header>
	)
}

export default Header
