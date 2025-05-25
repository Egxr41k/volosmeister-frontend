'use client'

import { useGetStatistics } from '@/hooks/queries/useGetStatistics'
import Spinner from '@/ui/Spinner'
import { convertPrice } from '@/utils/convertPrice'
import styles from './Dashboard.module.scss'
import ExportDataButton from './ExportDataButton'
import ImportDataButton from './ImportDataButton'

const Dashboard = () => {
	const { data, isFetching } = useGetStatistics()

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
			<div className="m-5 flex gap-5">
				<ExportDataButton />
				<ImportDataButton />
			</div>
		</>
	)
}

export default Dashboard
