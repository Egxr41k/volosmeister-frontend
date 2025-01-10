import { FC } from 'react'
import { IconType } from 'react-icons'

interface ISquareButton {
	Icon: IconType
	onClick: () => void
	number?: number
}

const SquareButton: FC<ISquareButton> = ({ Icon, onClick, number }) => {
	return (
		<button
			onClick={onClick}
			className="relative flex h-10 w-10 items-center justify-center rounded bg-violet-500 transition-colors duration-200 hover:bg-violet-500/90"
		>
			{!!number && (
				<span className="text-secondary absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5 text-[0.75rem]">
					{number}
				</span>
			)}
			<Icon className="text-secondary" size={21} />
		</button>
	)
}

export default SquareButton
