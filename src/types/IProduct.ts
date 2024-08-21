interface IProduct {
	id: number
	name: string
	imageSrc: string
	description: string
	count: number
	isAvailable: boolean
	newPrice: number
	oldPrice: number
	isSale: boolean
}

export const emptyProduct: IProduct = {
	count: 0,
	description: '',
	id: 0,
	imageSrc: '',
	isAvailable: false,
	isSale: false,
	name: '',
	newPrice: 0,
	oldPrice: 0
}

export default IProduct
