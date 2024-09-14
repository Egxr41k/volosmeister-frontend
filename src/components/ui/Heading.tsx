import { FC, PropsWithChildren } from 'react'

interface IHeading {
	className?: string
}

const Heading: FC<PropsWithChildren<IHeading>> = ({ className, children }) => {
	return (
		<h1 className={'text-3xl font-semibold'.concat(className!)}>{children}</h1>
	)
}

export default Heading
