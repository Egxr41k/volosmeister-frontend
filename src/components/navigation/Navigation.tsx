'use client'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { CategoryService } from '@/services/category.service'
import { useQuery } from '@tanstack/react-query'
import { FiLogOut } from 'react-icons/fi'
import { HiOutlineMenu } from 'react-icons/hi'
import Sidebar from '../Sidebar'
import Spinner from '../Spinner'
import NavLink from './NavLink'

const Navigation = () => {
	const { data, isLoading } = useQuery(
		['get categories'],
		() => CategoryService.getAll(),
		{
			select: ({ data }) => data
		}
	)

	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<Sidebar position="left" Icon={HiOutlineMenu}>
			<aside
				className="bg-secondary flex flex-col justify-between"
				style={{
					height: 'calc(100vh - 91px)'
				}}
			>
				<ul>
					<li key={'home'}>
						<NavLink href="/home">Home</NavLink>
					</li>
					<li key={'Catalog'}>
						<NavLink href="/products">Catalog</NavLink>
					</li>
					<p className="my-3 text-lg text-black">Categoires:</p>
					{isLoading ? (
						<Spinner />
					) : data ? (
						data.map(category => (
							<li key={category.id}>
								<NavLink href={`category/${category.slug}`}>
									{category.name}
								</NavLink>
							</li>
						))
					) : (
						<div>Categories not found!</div>
					)}
				</ul>
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
