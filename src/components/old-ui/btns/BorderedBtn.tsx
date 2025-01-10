import IBtnProps from '@/components/old-ui/btns/IBtnProps'
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
				'min-h-[45px] min-w-[45px] rounded-md border px-4 py-2 duration-300 ease-in-out hover:border-violet-600 hover:text-violet-700 focus:border-violet-600 focus:text-violet-700',
				color === 'black'
					? 'border-gray-300 text-gray-500'
					: 'border-white text-white'
			].join(' ')}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}

export default BorderedBtn
