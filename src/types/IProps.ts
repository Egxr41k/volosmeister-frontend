import React from 'react'

export interface IBtnProps {
	handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	children: React.ReactNode
}

export interface INavLinkProps {
	href: string
	children: React.ReactNode
}
