import Image from 'next/image'
import Cart from './cart/Cart'
import Navigation from './navigation/Navigation'

const Header = () => {
	return (
		<header className="py-auto flex h-[10vh] w-full justify-between bg-white px-12 md:px-48">
			<Navigation />

			<Image
				src="/logo.svg"
				alt="The Blooming Home Logo"
				width={250}
				height={50}
			/>

			<Cart />
		</header>
	)
}

export default Header
