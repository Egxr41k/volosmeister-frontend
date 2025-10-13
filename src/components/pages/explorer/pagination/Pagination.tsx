import PaginationButton from '@/ui/button/PaginationButton'

interface IPagination {
	numberPages: number
	changePage: (page: string) => void
	currentPage?: number | string
}

const Pagination = ({
	numberPages,
	changePage,
	currentPage = 1
}: IPagination) => {
	const showPaginationCount = 3
	const current = Number(currentPage)
	const pages: number[] = []

	// Calculate start and end page numbers
	let start = Math.max(1, current - Math.floor(showPaginationCount / 2))
	let end = start + showPaginationCount - 1

	if (end > numberPages) {
		end = numberPages
		start = Math.max(1, end - showPaginationCount + 1)
	}

	for (let i = start; i <= end; i++) {
		pages.push(i)
	}

	const isFirst = current === 1
	const isLast = current === numberPages

	return (
		<div className="my-16 text-center">
			{start > 1 && (
				<>
					<PaginationButton
						key={1}
						isActive={false}
						onClick={() => changePage('1')}
						className="mx-3"
					>
						{1}
					</PaginationButton>
					{start > 2 && '...'}
				</>
			)}

			{pages.map(page => (
				<PaginationButton
					key={page}
					isActive={current === page}
					onClick={() => changePage(page.toString())}
					className="mx-3"
				>
					{page}
				</PaginationButton>
			))}

			{end < numberPages && (
				<>
					{end < numberPages - 1 && '...'}
					<PaginationButton
						key={numberPages}
						isActive={false}
						onClick={() => changePage(numberPages.toString())}
						className="mx-3"
					>
						{numberPages}
					</PaginationButton>
				</>
			)}
		</div>
	)
}

export default Pagination
