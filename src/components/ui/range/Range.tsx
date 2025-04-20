import { useDebounds } from '@/hooks/useDebounds'
import { useEffect, useState } from 'react'
import styles from './Range.module.scss'

interface IRange {
	min?: number
	max?: number
	fromInitialValue?: string
	toInitialValue?: string
	onChangeFromValue: (value: string) => void
	onChangeToValue: (value: string) => void
}

const Range = ({
	min = 0,
	max,
	fromInitialValue,
	toInitialValue,
	onChangeFromValue,
	onChangeToValue
}: IRange) => {
	const [fromValue, setFromValue] = useState(fromInitialValue || '')
	const [toValue, setToValue] = useState(toInitialValue || '')

	const debouncedFromValue = useDebounds(fromValue, 500)
	const debouncedToValue = useDebounds(toValue, 500)

	useEffect(() => {
		onChangeFromValue(debouncedFromValue)
	}, [debouncedFromValue])

	useEffect(() => {
		onChangeToValue(debouncedToValue)
	}, [debouncedToValue])

	return (
		<div className={styles.range}>
			<input
				min={min}
				max={max}
				type="number"
				placeholder="From"
				value={fromValue}
				onChange={e => setFromValue(e.target.value)}
			/>
			{' - '}
			<input
				min={min}
				max={max}
				type="number"
				placeholder="To"
				value={toValue}
				onChange={e => setToValue(e.target.value)}
			/>
		</div>
	)
}

export default Range
