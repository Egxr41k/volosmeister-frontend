import { forwardRef } from 'react'

import { IField } from './field.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ placeholder, error, className, type = 'text', style, Icon, ...rest },
		ref
	) => {
		return (
			<div className={'mb-4'.concat(' ', className!)} style={style}>
				<label>
					<span className="mb-1 block">
						{Icon && <Icon className="mr-3" />}
						{placeholder}
					</span>
					<input
						ref={ref}
						type={type}
						placeholder={placeholder}
						{...rest}
						className={[
							'border-gray focus:border-primary placeholder:text-gray w-full rounded-lg border border-solid px-4 py-2 outline-none transition-all',
							!!error && 'border-red'
						].join(' ')}
					/>
				</label>
				{error && <div className="text-red mt-1 text-sm">{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
