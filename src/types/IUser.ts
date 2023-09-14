import {IComment} from "./IComment";

export interface IUser{
    id: number,
    name: string,
    //email: string,
    //password: string,
    comments: IComment[]
}