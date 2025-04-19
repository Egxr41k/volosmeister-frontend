import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'orange' | 'white'
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
				'btn',
				variant === 'orange' && 'btn-orange',
				variant === 'white' && 'btn-white',
				size === 'sm' && 'px-5 py-2 text-sm',
				size === 'lg' && 'btn-large',
				className
			].join(' ')}
		>
			{children}
		</button>
	)
}

export default Button
