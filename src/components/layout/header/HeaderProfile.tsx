'use client'

import { useActions } from '@/hooks/useActions'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { HiOutlineUser } from 'react-icons/hi2'

const HeaderProfile = () => {
	const { profile } = useProfile()
	const { isShow, ref, setIsShow } = useOutside(false)
	const { logout } = useActions()
	const { push } = useRouter()

	return (
		<div className="relative" ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				{profile?.avatarPath ? (
					<Image
						width={43}
						height={43}
						src={profile?.avatarPath}
						alt="profile"
						className="border-primary animate opacity rounded-full border border-solid"
						unoptimized
					/>
				) : (
					<div className="relative flex h-10 w-10 items-center justify-center rounded border border-solid border-emerald-200/90 border-emerald-300 text-emerald-500 transition-colors duration-200 hover:bg-emerald-200/90">
						<HiOutlineUser size={21} />
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
						className="my-2 text-left transition-colors duration-300 hover:text-emerald-500"
					>
						My orders
					</button>
					<button
						onClick={() => logout()}
						className="my-2 transition-colors duration-300 hover:text-emerald-500"
					>
						Logout
					</button>
				</div>
			)}
		</div>
	)
}

export default HeaderProfile
