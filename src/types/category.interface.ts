export interface ICategory {
	id: number
	name: string
	slug: string
	parentId?: number
}

export interface ICategoryTree extends ICategory {
	children: ICategoryTree[]
}
