import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { TailSpin } from 'react-loader-spinner'

import { CategoryService } from '@/services/category.service'

const Sidebar: FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll(),
		select: ({ data }) => data
	})

	const pathname = usePathname()

	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<aside
			className="bg-secondary flex flex-col justify-between"
			style={{
				height: 'calc(100vh - 91px)'
			}}
		>
			<div>
				{isLoading ? (
					<TailSpin
						height="80"
						width="80"
						color="#4fa94d"
						ariaLabel="tail-spin-loading"
						radius="1"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
					/>
				) : data ? (
					<>
						<div className="mb-6 ml-6 mt-4 text-xl text-white">Categoires:</div>
						<ul>
							{data.map(category => (
								<li key={category.id}>
									<Link
										className={[
											'hover:text-primary my-3 block px-10 text-lg transition-colors duration-200',
											pathname === `category/${category.slug}`
												? 'text-primary'
												: 'text-white'
										].join(' ')}
										href={`category/${category.slug}`}
									>
										{category.name}
									</Link>
								</li>
							))}
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
