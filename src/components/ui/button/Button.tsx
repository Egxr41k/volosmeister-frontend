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
				'hover: rounded-2xl px-10 py-2 font-medium shadow-lg transition duration-300 ease-in-out',
				variant === 'orange' && 'bg-violet-500 text-white',
				variant === 'white' && 'bg-white text-violet-500',
				size === 'sm' && 'px-5 py-2 text-sm',
				className
			].join(' ')}
		>
			{children}
		</button>
	)
}

export default Button
