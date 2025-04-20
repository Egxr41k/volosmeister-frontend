'use client'

import Spinner from '@/ui/Spinner'
import styles from './AdminList.module.scss'
import AdminListItem from './AdminListItem'
import { IListItem } from './admin-list.interface'

interface IAdminList {
	listItems?: IListItem[]
	isLoading: boolean

	removeHandler?: (id: number) => void
}

const AdminList = ({
	isLoading,
	removeHandler,
	listItems = []
}: IAdminList) => {
	return (
		<>
			{isLoading ? (
				<Spinner />
			) : listItems.length ? (
				listItems.map(listItem => (
					<AdminListItem
						key={listItem.id}
						removeHandler={
							removeHandler ? () => removeHandler(listItem.id) : undefined
						}
						listItem={listItem}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</>
	)
}

export default AdminList
