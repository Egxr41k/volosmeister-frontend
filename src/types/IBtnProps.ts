import React from 'react';

interface IBtnProps {
	handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	children: React.ReactNode
}

export default IBtnProps
