'use client'

import { useOutside } from '@/hooks/useOutside'
import React from 'react'
import { HiXMark } from 'react-icons/hi2'
import { IconType } from 'react-icons/lib/iconBase'

interface ISidebarProps {
	position: 'left' | 'right'
	children: React.ReactNode
	Icon: IconType
}

const Sidebar = ({ position, children, Icon }: ISidebarProps) => {
	const { isShow, setIsShow, ref } = useOutside(false)

	const drawerPos = {
		right: 'fixed top-0 right-0',
		left: 'fixed top-0 left-0'
	}

	const closeBtnPos = {
		right: 'absolute top-3 left-3',
		left: 'absolute top-3 right-3'
	}

	const justify = {
		right: 'justify-end',
		left: 'justify-start'
	}

	const hider = {
		right: isShow ? ' translate-x-0' : ' translate-x-full',
		left: isShow ? '-translate-x-0' : '-translate-x-full'
	}

	return (
		<div className="z-20 flex" ref={ref}>
			<button
				className="relative flex h-10 w-10 items-center justify-center rounded text-black transition-colors duration-300 hover:text-emerald-500"
				onClick={() => setIsShow(true)}
			>
				<Icon size={21} />
			</button>
			<div
				className={[
					drawerPos[position],
					hider[position],
					justify[position],
					'z-10 flex h-screen w-60 bg-white p-5 pt-10 shadow-md duration-300'
				].join(' ')}
			>
				<button
					className={[
						closeBtnPos[position],
						'flex h-10 w-10 items-center justify-center rounded text-black transition-colors duration-300 hover:text-emerald-500'
					].join(' ')}
					onClick={() => setIsShow(false)}
				>
					<HiXMark size={21} />
				</button>
				{children}
			</div>
		</div>
	)
}

export default Sidebar
