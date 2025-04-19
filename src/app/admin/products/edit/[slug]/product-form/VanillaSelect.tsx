import React, { useState } from 'react'
import './App.css' // Стили для анимаии

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
]

const App = () => {
	const [selectedValue, setSelectedValue] = useState('')
	return (
		<div>
			<select
				className="custom-select"
				value={selectedValue}
				onChange={e => setSelectedValue(e.target.value)}
			>
				<option disabled value="">
					Выберите вариант
				</option>{' '}
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}
