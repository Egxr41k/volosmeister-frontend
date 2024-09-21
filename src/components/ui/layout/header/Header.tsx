import amazonLogo from '@/assets/amazon-logo.png'
import SearchPage from '@/pages/q'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import HeaderCart from './cart/HeaderCart'
import HeaderProfile from './HeaderProfile'

const Header: FC = () => {
	return (
		<header
			className="bg-secondary grid w-full px-6 py-6"
			style={{
				gridTemplateColumns: '1fr 3fr 1.2fr'
			}}
		>
			<Link href="/">
				<Image
					priority
					width={180}
					height={37}
					src={amazonLogo}
					alt="Amazon Icon"
				/>
			</Link>
			<SearchPage />
			<div className="flex items-center justify-end gap-10">
				<Link href="/favorites" className="text-white">
					<AiOutlineHeart size={28} />
				</Link>
				<HeaderCart />
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
