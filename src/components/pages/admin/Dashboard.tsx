'use client'

import { usePriceConverter } from '@/hooks/usePriceConverter'
import { StatisticsService } from '@/services/statistics.service'
import Spinner from '@/ui/Spinner'
import { useQuery } from '@tanstack/react-query'
import styles from './Dashboard.module.scss'
import ExportDataButton from './ExportDataButton'
import ImportDataButton from './ImportDataButton'

const Dashboard = () => {
	const convertPrice = usePriceConverter()

	const { data, isFetching } = useQuery({
		queryKey: ['get statictics'],
		queryFn: () => StatisticsService.getMain()
	})

	return (
		<>
			<h1 className="mb-8 text-3xl font-semibold">Dashboard</h1>
			{isFetching ? (
				<Spinner />
			) : data?.length ? (
				<div className={styles.wrapper}>
					{data.map((item, index) => (
						<div key={item.name} className={styles.item}>
							<div>{item.name}</div>
							<div>
								{index === data.length - 1
									? convertPrice(item.value || 0)
									: item.value}
							</div>
						</div>
					))}
				</div>
			) : (
				<div>Statistics not loaded!</div>
			)}
			<div className={styles.btns}>
				<ExportDataButton />
				<ImportDataButton />
			</div>
		</>
	)
}

export default Dashboard
