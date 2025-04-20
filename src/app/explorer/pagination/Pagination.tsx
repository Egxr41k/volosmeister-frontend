import Button from '@/ui/button/Button'

interface IPagination {
	numberPages: number // pagesCount
	changePage: (page: string) => void
	currentPage?: number | string
}

const Pagination = ({ numberPages, changePage, currentPage }: IPagination) => {
	return (
		<div className="mt-16 text-center">
			{Array.from({ length: numberPages > 1 ? numberPages : 1 }).map(
				(_, index) => {
					const pageNumber = (index + 1).toString()
					const isActive = currentPage?.toString() === pageNumber
					return (
						<Button
							key={pageNumber}
							size="md"
							variant={isActive ? 'selected' : 'white'}
							onClick={() => changePage(pageNumber)}
							className="mx-3 text-emerald-500"
						>
							{pageNumber}
						</Button>
					)
				}
			)}
		</div>
	)
}

export default Pagination
