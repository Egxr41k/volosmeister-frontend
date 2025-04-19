import type { FC, PropsWithChildren } from 'react'

import styles from './Checkbox.module.scss'

interface ICheckbox {
	isChecked: boolean
	onClick: () => void
	className?: string
}

const Checkbox: FC<PropsWithChildren<ICheckbox>> = ({
	isChecked,
	onClick,
	className,
	children
}) => {
	return (
		<button
			className={[styles.checkbox, className].join(' ')}
			onClick={onClick}
		>
			<span className={isChecked ? styles.active : ''} />
			<span>{children}</span>
		</button>
	)
}

export default Checkbox
