import styles from './AdminList.module.scss'
import AdminActions from './admin-actions/AdminActions'
import { IAdminListItem } from './admin-list.interface'

const AdminListItem = ({ removeHandler, listItem }: IAdminListItem) => {
	return (
		<div className={styles.item}>
			{listItem.items.map(value => (
				<div key={value}>{value}</div>
			))}

			<AdminActions
				viewUrl={listItem.viewUrl}
				editUrl={listItem.editUrl}
				removeHandler={removeHandler}
			/>
		</div>
	)
}

export default AdminListItem
