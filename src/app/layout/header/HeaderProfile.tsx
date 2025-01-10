'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

const HeaderProfile: FC = () => {
	const { profile } = useProfile()
	const { isShow, ref, setIsShow } = useOutside(false)

	if (!profile?.avatarPath) return null

	return (
		<div className="relative" ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				<Image
					width={43}
					height={43}
					src={profile?.avatarPath}
					alt="profile"
					className="border-primary animate opacity rounded-full border border-solid"
				/>
			</button>
			{isShow && (
				<div
					className="x-20 absolute right-2 w-40"
					style={{ top: 'calc(100 + 1rem)' }}
				>
					<Link
						href="/my-orders"
						className="hover:text-primary block w-full rounded-md bg-white px-4 py-2 shadow transition-colors duration-300"
					>
						My orders
					</Link>
				</div>
			)}
		</div>
	)
}

export default HeaderProfile
