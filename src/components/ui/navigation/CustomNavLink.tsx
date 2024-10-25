import { NavLink } from 'react-router-dom'

interface ICustomNavLink {
	href: string
	children: React.ReactNode
}

const CustomNavLink = ({ href, children }: ICustomNavLink) => {
	const setActive = (isActive: boolean) => {
		return ['text-white', isActive && 'font-bold'].join(' ')
	}

	return (
		<li className="m-3">
			<NavLink to={href} className={({ isActive }) => setActive(isActive)}>
				{children}
			</NavLink>
		</li>
	)
}
export default CustomNavLink
