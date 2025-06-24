import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styles from './Button.module.scss'

interface IPaginationButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	isActive: boolean
}

const PaginationButton = ({
	children,
	isActive,
	className,
	...rest
}: PropsWithChildren<IPaginationButton>) => (
	<button
		{...rest}
		className={[
			styles.btn,
			styles['btn-paginanation'],
			isActive && styles['btn-active'],
			className
		].join(' ')}
	>
		{children}
	</button>
)

export default PaginationButton
