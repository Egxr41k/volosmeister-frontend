import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface INavLinkProps {
	href: string
	children: ReactNode
}

const NavLink = ({ href, children }: INavLinkProps) => {
	const { asPath } = useRouter()

	return (
		<Link
			className={[
				'my-3 block px-10 text-lg transition-colors duration-200 hover:text-violet-500',
				asPath === href ? 'text-violet-500' : 'text-black'
			].join(' ')}
			href={href}
		>
			{children}
		</Link>
	)
}

export default NavLink
