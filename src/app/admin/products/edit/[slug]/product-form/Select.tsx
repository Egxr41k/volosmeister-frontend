import { HTMLProps } from 'react'

export interface Option {
	value: string
	label: string
}

interface SelectProps extends Omit<HTMLProps<HTMLSelectElement>, 'onChange'> {
	options: Option[]
	value: string
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
}

export const cn = (...args: (string | undefined | false)[]) =>
	args.filter(Boolean).join(' ')

const Select = ({
	options,
	value,
	onChange,
	placeholder = 'Выберите вариант',
	disabled = false,
	className,
	...rest
}: SelectProps) => {
	return (
		<select
			className={cn(
				'mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200',
				className
			)}
			value={value}
			onChange={e => onChange(e.target.value)}
			disabled={disabled}
			{...rest}
		>
			<option disabled value="">
				{placeholder}
			</option>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}

export default Select
