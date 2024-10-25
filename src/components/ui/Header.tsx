import logo from '../../assets/logo.svg'
import Cart from './cart/Cart'
import Navigation from './navigation/Navigation'

const Header = () => {
	return (
		<header className="flex justify-between bg-fuchsia-600 py-auto px-12 md:px-40 h-[7vh] w-full">
			<Navigation />

			<img src={logo} alt="The Blooming Home Logo" width={250} />

			<Cart />
		</header>
	)
}

export default Header
