import Link from 'next/link'
import Cart from './Cart'
import SideBar from './SideBar'
import Navigation from './Navigation'

const Header = () => {
	return (
		<header className="py-auto flex h-[7vh] w-full justify-between bg-fuchsia-600 px-12 md:px-40">
			<div className="hidden md:block">
				<Navigation />
			</div>

			<div className="flex md:hidden">
				<SideBar position="left" btnIconSrc="/icons/menu.svg">
					<div className="mx-auto w-min">
						<Navigation />
					</div>
				</SideBar>
			</div>

			<div className="flex">
				<SideBar position="right" btnIconSrc="/icons/cart.svg">
					<Cart />
				</SideBar>
			</div>
		</header>
	)
}

export default Header
