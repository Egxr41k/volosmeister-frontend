'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface INavLinkProps {
	href: string
	children: ReactNode
}

const NavLink = ({ href, children }: INavLinkProps) => {
	const pathname = usePathname()

	return (
		<Link
			className={[
				'my-3 block px-10 text-lg transition-colors duration-200 hover:text-emerald-500',
				pathname === href ? 'text-emerald-500' : 'text-black'
			].join(' ')}
			href={href}
		>
			{children}
		</Link>
	)
}

export default NavLink
