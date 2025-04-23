export interface Option {
	value: string
	label: string
}

interface SelectProps {
	options: Option[]
	value?: string
	onChange: (value: string) => void
	placeholder?: string
}

const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
	return (
		<select
			value={value ?? ''}
			onChange={e => onChange(e.target.value)}
			className="w-full rounded border border-gray-300 p-2"
		>
			<option value="">{placeholder || 'Выберите'}</option>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}

export default Select
