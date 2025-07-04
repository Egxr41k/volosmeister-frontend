import { PropsWithChildren } from 'react'

interface IFilterWrapper {
	title: string
}

const FilterWrapper = ({
	title,
	children
}: PropsWithChildren<IFilterWrapper>) => {
	return (
		<div className="mb-6">
			<div className="mb-3 font-semibold">{title}</div>
			<div>{children}</div>
		</div>
	)
}

export default FilterWrapper
