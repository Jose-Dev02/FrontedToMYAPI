import { ICategory } from "./ICategory";

export interface IProduct
{
    id: number;
    name: string;
    categoryId: number;
    mediaURL: string;
    price:number;
    category: ICategory;
}