import { IconType } from 'react-icons'

interface ISquareButton {
	Icon: IconType
	onClick: () => void
	number?: number
}

const SquareButton = ({ Icon, onClick, number }: ISquareButton) => {
	return (
		<button
			onClick={onClick}
			className="relative flex h-10 w-10 items-center justify-center rounded border border-solid border-emerald-200/90 border-emerald-300 text-emerald-500 transition-colors duration-200 hover:bg-emerald-200/90"
		>
			{!!number && (
				<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-solid border-emerald-200/90 bg-white p-0.5 text-[0.75rem]">
					{number}
				</span>
			)}
			<Icon size={21} />
		</button>
	)
}

export default SquareButton
