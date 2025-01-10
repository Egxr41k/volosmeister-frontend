'use client'

import cn from 'classNames'
import Link from 'next/link'
import { FC } from 'react'
import { FiLogOut } from 'react-icons/fi'

import Loader from '@/ui/Loader'

import { useCategories } from '@/hooks/queries/useCategory'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'

import { ADMIN_MENU } from './admin-menu.data'
import { convertToMenuItems } from './conver-to-menu-items'

const Sidebar: FC = () => {
	const { data, isLoading } = useCategories()

	const { isAdminPanel, pathname } = useIsAdminPanel()

	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<aside
			className="bg-secondary z-10 flex flex-col justify-between"
			style={{
				minHeight: 'calc(100vh - 91px)',
				height: 'calc(100vh - 91px)'
			}}
		>
			<div>
				{isLoading ? (
					<Loader />
				) : data ? (
					<>
						<div className="mb-6 ml-6 mt-4 text-xl text-white">
							{isAdminPanel ? 'Menu:' : 'Categoires 👇'}
						</div>
						<ul>
							{(isAdminPanel ? ADMIN_MENU : convertToMenuItems(data)).map(
								item => (
									<li key={item.href}>
										<Link
											className={cn(
												'hover:text-primary my-3 block px-10 text-lg transition-colors duration-200',
												pathname === item.href ? 'text-primary' : 'text-white'
											)}
											href={item.href}
										>
											{item.label}
										</Link>
									</li>
								)
							)}
						</ul>
					</>
				) : (
					<div>Categories not found!</div>
				)}
			</div>
			{!!user && (
				<button
					onClick={() => logout()}
					className="mb-10 ml-10 flex items-center text-white"
				>
					<FiLogOut />
					<span className="ml-2">Logout</span>
				</button>
			)}
		</aside>
	)
}

export default Sidebar
