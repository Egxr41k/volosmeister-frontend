import { HiOutlineMenu } from 'react-icons/hi'
import Sidebar from '../Sidebar'
import CustomNavLink from './CustomNavLink'

const Navigation = () => {
	return (
		<Sidebar position="left" Icon={HiOutlineMenu}>
			<ul className="">
				<CustomNavLink href="/">Головна</CustomNavLink>
				<CustomNavLink href="/catalog">Каталог</CustomNavLink>
				<CustomNavLink href="/product-form">Додати товар</CustomNavLink>
			</ul>
		</Sidebar>
	)
}

export default Navigation
