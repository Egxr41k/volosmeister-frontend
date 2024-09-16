import IBtnProps from '@/components/btns/IBtnProps'
interface IBorderedBtnProps extends IBtnProps {
	color?: string
}

const BorderedBtn = ({
	handleClick,
	children,
	color = 'black'
}: IBorderedBtnProps) => {
	return (
		<button
			className={[
				'min-h-[45px] min-w-[45px] rounded-md border px-4 py-2 duration-300 ease-in-out hover:border-fuchsia-600 hover:text-fuchsia-700 focus:border-fuchsia-600 focus:text-fuchsia-700',
				color === 'black'
					? 'border-black text-black'
					: 'border-white text-white'
			].join(' ')}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}

export default BorderedBtn
