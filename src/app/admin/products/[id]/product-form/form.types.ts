import { Control, UseFormRegister } from 'react-hook-form'

export interface IFormField {
	control: Control<IFormProduct, any>
	register: UseFormRegister<IFormProduct>
}

export interface IFormProduct {
	name: string
	price: number
	description: string
	images: string[]
	categoryId: number
	features: IFormFeature[]
	properties: IFormProperty[]
}

interface IFormFeature {
	title: string
	image: string
	description: string
}

interface IFormProperty {
	name: string
	value: string
}
