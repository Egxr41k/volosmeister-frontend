export interface ICategory {
	id: number
	name: string
	slug: string
	parentId?: number
	manufacturerId: number
}

export interface ICategoryTree extends ICategory {
	children: ICategoryTree[]
}
