'use client'

import { useOutside } from '@/hooks/useOutside'
import styles from './Select.module.scss'
import { ISelect } from './select.interface'

function Select<K>({ data, onChange, value, title }: ISelect<K>) {
	const { isShow, setIsShow, ref } = useOutside(false)

	return (
		<div ref={ref} className={styles.select}>
			<button onClick={() => setIsShow(!isShow)}>
				{title && <b>{title}:</b>}
				{value?.label || 'Default'}
			</button>
			{isShow && (
				<ul>
					{data.map(item => (
						<li
							key={item.key?.toString()}
							className={item.key === value?.key ? styles.active : ''}
						>
							<button
								onClick={() => {
									onChange(item)
									setIsShow(false)
								}}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Select
