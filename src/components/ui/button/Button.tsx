import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import styles from './Button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'active' | 'primary'
	size?: 'sm' | 'md' | 'lg'
}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variant,
	size = 'md',
	...rest
}) => {
	return (
		<button
			{...rest}
			className={[
				styles.btn,
				variant === 'active' && styles['btn-active'],
				variant === 'primary' && styles['btn-primary'],
				size === 'sm' && styles['btn-small'],
				size === 'md' && styles['btn-medium'],
				size === 'lg' && styles['btn-large'],
				className
			].join(' ')}
		>
			{children}
		</button>
	)
}

export default Button
