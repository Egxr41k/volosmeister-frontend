'use client'

import { useCategories } from '@/hooks/queries/useCategory'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'
import { ADMIN_MENU } from '@/layout/sidebar/admin-menu.data'
import { convertToMenuItems } from '@/layout/sidebar/conver-to-menu-items'
import Spinner from '@/ui/Spinner'
import { FiLogOut } from 'react-icons/fi'
import { HiOutlineMenu } from 'react-icons/hi'
import Sidebar from '../../sidebar/Sidebar'
import NavLink from './NavLink'

const Navigation = () => {
	const { data, isLoading } = useCategories()

	const { isAdminPanel, pathname } = useIsAdminPanel()

	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<Sidebar position="left" Icon={HiOutlineMenu}>
			<aside
				className="z-10 flex flex-col justify-between"
				style={{
					minHeight: 'calc(100vh - 91px)',
					height: 'calc(100vh - 91px)'
				}}
			>
				<div>
					{isLoading ? (
						<Spinner />
					) : data ? (
						<>
							<div className="mb-6 ml-6 mt-4 text-xl">
								{isAdminPanel ? 'Menu:' : 'Categoires 👇'}
							</div>
							<ul>
								{(isAdminPanel ? ADMIN_MENU : convertToMenuItems(data)).map(
									item => (
										<li key={item.href}>
											<NavLink href={item.href}>{item.label}</NavLink>
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
		</Sidebar>
	)
}

export default Navigation
