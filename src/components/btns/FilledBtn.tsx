import IBtnProps from '@/types/IBtnProps'

const FilledBtn = ({ handleClick, children }: IBtnProps) => {
	return (
		<button
			className={[
				'rounded-md border-0 bg-black px-4 py-2 font-semibold text-white duration-300 ease-in-out',
				children === 'Видалити' || children === 'Очистити кошик'
					? 'hover:bg-red-600 focus:bg-red-700'
					: 'hover:bg-fuchsia-600 focus:bg-fuchsia-700'
			].join(' ')}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}
export default FilledBtn
