'use client'
import React, { useState } from 'react'
import { IconType } from 'react-icons/lib/iconBase'

interface ISidebarProps {
	position: 'left' | 'right'
	children: React.ReactNode
	Icon: IconType
}

const Sidebar = ({ position, children, Icon }: ISidebarProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const drawerPos = {
		right: 'fixed top-0 right-0',
		left: 'fixed top-0 left-0'
	}
	const closeBtnPos = {
		right: 'absolute top-3 left-3',
		left: 'absolute top-3 right-3'
	}

	const hider = {
		right: isOpen ? ' translate-x-0' : ' translate-x-full',
		left: isOpen ? '-translate-x-0' : '-translate-x-full'
	}

	return (
		<div className="z-10 flex">
			<button className="my-auto h-8 w-8" onClick={() => setIsOpen(true)}>
				<Icon color="black" size={24} />
			</button>
			<div
				className={[
					drawerPos[position],
					hider[position],
					'z-10 flex h-screen w-60 items-center justify-center bg-white shadow-md duration-300'
				].join(' ')}
			>
				<button
					className={closeBtnPos[position]}
					onClick={() => setIsOpen(false)}
				>
					<img src="/icons/close.svg" className="h-8 w-8" alt="" />
				</button>
				{children}
			</div>
		</div>
	)
}

export default Sidebar
