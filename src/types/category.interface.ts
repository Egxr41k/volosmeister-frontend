export interface ICategory {
	id: number
	name: string
	slug: string
	parentId?: number
}

export interface ICategoryWithChildren extends ICategory {
	children: ICategory[]
}
