import { IProduct } from "./IProduct";

export interface IItem
{
    id: number;
    productId: number;
    cantidad: number;
    product: IProduct;

}