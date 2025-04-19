'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'
import { HiOutlineUser, HiUser } from 'react-icons/hi2'
import { useActions } from '@/hooks/useActions'
import { FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

const HeaderProfile: FC = () => {
	const { profile } = useProfile()
	const { isShow, ref, setIsShow } = useOutside(false)
	const { logout } = useActions()
	const { push } = useRouter()

	return (
		<div className="relative" ref={ref}>
			<button
				onClick={() => setIsShow(!isShow)}
				className="flex h-10 w-10 items-center justify-center"
			>
				{profile?.avatarPath ? (
					<Image
						width={43}
						height={43}
						src={profile?.avatarPath}
						alt="profile"
						className="border-primary animate opacity rounded-full border border-solid"
					/>
				) : (
					<div className="transition-colors duration-200 hover:text-violet-500">
						<HiOutlineUser size={28} />
					</div>
				)}
			</button>
			{isShow && (
				<div
					className="x-20 absolute right-2 z-20 w-40 rounded-md bg-white px-4 py-2 shadow"
					style={{ top: 'calc(100 + 1rem)' }}
				>
					<button
						onClick={() => push('/my-orders')}
						className="my-2 text-left transition-colors duration-300 hover:text-violet-500"
					>
						My orders
					</button>
					<button
						onClick={() => logout()}
						className="my-2 transition-colors duration-300 hover:text-violet-500"
					>
						Logout
					</button>
				</div>
			)}
		</div>
	)
}

export default HeaderProfile
