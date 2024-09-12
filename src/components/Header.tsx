import Link from 'next/link'
import Cart from './Cart'
import SideBar from './SideBar'

const Navigation = () => {
	return (
		<ul className="flex flex-wrap">
			<li className="m-3">
				<Link className="text-black" href="/home">
					Головна
				</Link>
			</li>
			<li className="m-3">
				<Link className="text-black" href="/products">
					Каталог
				</Link>
			</li>
		</ul>
	)
}

const Header = () => {
	return (
		<header className="py-auto flex h-[10vh] w-full justify-between bg-white px-12 md:px-48">
			<div className="flex">
				<SideBar position="left" btnIconSrc="/icons/menu.svg">
					<div className="mx-auto w-min">
						<Navigation />
					</div>
				</SideBar>
			</div>

			<img src="/logo.svg" alt="The Blooming Home Logo" width={250} />

			<div className="flex">
				<SideBar position="right" btnIconSrc="/icons/cart.svg">
					<Cart />
				</SideBar>
			</div>
		</header>
	)
}

export default Header
