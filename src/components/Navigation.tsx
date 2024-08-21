import { NavLink, Route, Routes } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'
import { INavLinkProps } from '../types/IProps'
import AboutUs from './screens/AboutUs'
import Admin from './screens/Admin'
import Contacts from './screens/Contacts'
import Home from './screens/Home'
import ProductDetails from './screens/ProductDetails'
import ProductForm from './screens/ProductForm'
import ProductList from './screens/ProductList'
import Questions from './screens/Questions'

const path = window.location.pathname

export const CurrentScreen = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Home" element={<Home />} />
			<Route path="/ProductList" element={<ProductList />} />
			<Route path="/AboutUs" element={<AboutUs />} />
			<Route path="/Questions" element={<Questions />} />
			<Route path="/Contacts" element={<Contacts />} />
			<Route path="/Admin" element={<Admin />} />
			<Route path="/ProductDetails/:id" element={<ProductDetails />} />
			<Route path="/ProductForm/:id" element={<ProductForm />} />
		</Routes>
	)
}

export const navigateTo = (pathname: string) => {
	window.location.pathname = pathname
}

const Navigation = () => {
	const { isAdmin } = useAdmin()

	return (
		<ul className="flex flex-wrap">
			<CustomLink href="/Home"> Головна</CustomLink>
			<CustomLink href="/ProductList"> Каталог</CustomLink>
			{isAdmin && <CustomLink href="/ProductForm/0"> Додати товар </CustomLink>}
			<CustomLink href="/AboutUs"> Про нас</CustomLink>
			<CustomLink href="/Questions"> Питання</CustomLink>
			<CustomLink href="/Contacts"> Контакти</CustomLink>
		</ul>
	)
}

const CustomLink = ({ href, children }: INavLinkProps) => {
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
export default Navigation
