'use client'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'
import { ADMIN_MENU } from '@/layout/sidebar/admin-menu.data'
import { convertToMenuItems } from '@/layout/sidebar/conver-to-menu-items'
import { CategoryService } from '@/services/category.service'
import Spinner from '@/ui/Spinner'
import { useQuery } from '@tanstack/react-query'
import { FiLogOut } from 'react-icons/fi'
import { HiOutlineMenu } from 'react-icons/hi'
import Sidebar from '../../sidebar/Sidebar'
import NavLink from './NavLink'

const Navigation = () => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get all categories'],
		queryFn: () => CategoryService.getAll()
	})

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
					{isFetching ? (
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
