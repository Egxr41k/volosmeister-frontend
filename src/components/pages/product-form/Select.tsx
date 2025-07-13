export interface Option {
	value: string
	label: string
}

interface SelectProps {
	options: Option[]
	value?: string
	onChange: (value: string) => void
}

const Select = ({ options, value, onChange }: SelectProps) => {
	return (
		<select
			value={value ?? ''}
			onChange={e => onChange(e.target.value)}
			className="w-min rounded border border-gray-300 bg-white p-2"
		>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}

export default Select
