import IComment from "./IComment";

interface IUser{
    id: number,
    name: string,
    //email: string,
    //password: string,
    comments: IComment[]
}

export default IUser