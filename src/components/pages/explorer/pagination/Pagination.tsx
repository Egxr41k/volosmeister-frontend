import PaginationButton from '@/ui/button/PaginationButton'

interface IPagination {
	numberPages: number // pagesCount
	changePage: (page: string) => void
	currentPage?: number | string
}

const Pagination = ({ numberPages, changePage, currentPage }: IPagination) => {
	return (
		<div className="my-16 text-center">
			{Array.from({ length: numberPages > 1 ? numberPages : 1 }).map(
				(_, index) => {
					const pageNumber = (index + 1).toString()
					return (
						<PaginationButton
							key={pageNumber}
							isActive={currentPage?.toString() === pageNumber}
							onClick={() => changePage(pageNumber)}
							className="mx-3"
						>
							{pageNumber}
						</PaginationButton>
					)
				}
			)}
		</div>
	)
}

export default Pagination
