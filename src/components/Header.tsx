'use client'
import Cart from './Cart'
import Drawer from './Drawer'
import Navigation from './Navigation'

const Header = () => {
	return (
		<header className="py-auto flex h-[7vh] w-full justify-between bg-fuchsia-600 px-12 md:px-40">
			<div className="hidden md:block">
				<Navigation />
			</div>

			<div className="flex md:hidden">
				<Drawer position="left" btnIconSrc="/icons/menu.svg">
					<div className="mx-auto w-min">
						<Navigation />
					</div>
				</Drawer>
			</div>

			<div className="flex">
				<Drawer position="right" btnIconSrc="/icons/cart.svg">
					<Cart />
				</Drawer>
			</div>
		</header>
	)
}

export default Header
