import IBtnProps from '@/ui/button/IBtnProps'

const FilledBtn = ({ handleClick, children }: IBtnProps) => {
	return (
		<button
			className={[
				'rounded-md border-0 bg-black px-4 py-2 font-semibold text-white duration-300 ease-in-out'
			].join(' ')}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}
export default FilledBtn
