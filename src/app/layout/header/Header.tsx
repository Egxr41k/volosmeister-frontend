'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'

import Navigation from '@/components/old-ui/navigation/Navigation'
import HeaderProfile from './HeaderProfile'
import Search from './Search'
import HeaderCart from './cart/HeaderCart'

const Header: FC = () => {
	const { isAdminPanel } = useIsAdminPanel()
	const { user } = useAuth()

	return (
		<header className="flex w-full items-center justify-between gap-10 px-48 py-6">
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
			<Search />

			{user?.isAdmin && !isAdminPanel && (
				<Link
					href="/admin"
					className="hover:text-primary inline-block text-lg transition-colors duration-200"
				>
					<MdOutlineAdminPanelSettings size={29} />
				</Link>
			)}
			<Link href="/favorites" className="">
				<AiOutlineHeart size={28} />
			</Link>
			<HeaderCart />
			<HeaderProfile />
		</header>
	)
}

export default Header
