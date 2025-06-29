'use client'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'
import { getAdminMenu } from '@/layout/sidebar/admin-menu.data'
import { useTranslations } from 'next-intl'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { HiBars3, HiOutlineListBullet, HiOutlineUser } from 'react-icons/hi2'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import Sidebar from '../../sidebar/Sidebar'
import NavLink from './NavLink'
import ProductNavigation from './ProductNavigation'

const Navigation = () => {
	const t = useTranslations('navigation')

	const ADMIN_MENU = getAdminMenu()

	const { isAdminPanel } = useIsAdminPanel()

	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<Sidebar position="left" Icon={HiBars3}>
			<aside className="z-10 flex flex-col justify-between">
				<div>
					<ul>
						{user ? (
							<>
								<li className="my-2 items-center">
									<NavLink href="/profile">
										<HiOutlineUser size={21} /> <p>{t('profile')}</p>
									</NavLink>
								</li>
								<li className="my-2 flex items-center gap-2">
									<NavLink href="/profile/favorites">
										<AiOutlineHeart size={21} /> <p>{t('favorites')}</p>
									</NavLink>
								</li>
								<li className="my-2 flex items-center gap-2">
									<NavLink href="/profile/orders">
										<HiOutlineListBullet size={21} /> <p>{t('orders')}</p>
									</NavLink>
								</li>

								{user.isAdmin && (
									<>
										<li className="my-2 flex items-center gap-2">
											<NavLink href="/admin">
												<MdOutlineAdminPanelSettings size={21} />{' '}
												<p>{t('adminPanel')}</p>
											</NavLink>
										</li>
										<ul>
											{isAdminPanel &&
												ADMIN_MENU.map(item => (
													<li className="my-2 ml-10 text-sm" key={item.href}>
														<NavLink href={item.href}>{item.label}</NavLink>
													</li>
												))}
										</ul>
									</>
								)}
							</>
						) : (
							<li className="my-2 flex items-center gap-2">
								<NavLink href="/auth">
									<HiOutlineUser size={21} /> <p>{t('signIn')}</p>
								</NavLink>
							</li>
						)}
					</ul>
					<ProductNavigation />
				</div>
				{!!user && (
					<button
						onClick={() => logout()}
						className="flex items-center gap-2 text-black transition-colors duration-300 hover:text-emerald-500"
					>
						<FiLogOut />
						<p>{t('logout')}</p>
					</button>
				)}
			</aside>
		</Sidebar>
	)
}

export default Navigation
