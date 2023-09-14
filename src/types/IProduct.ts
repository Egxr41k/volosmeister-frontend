export interface IProduct {
    id: number,
    name: string,
    imageSrc: string | File,
    description: string,
    count: number,
    isAvailable: boolean,
    newPrice: number,
    oldPrice: number,
    isSale: boolean,
    //comments: IComment[]
}


