import { IRepository, PagingDTO } from "devchu-common";
import { Product } from "../../../model";
import { ProductCondDTO, ProductUpdateDTO } from "../../../model/dto";

export default class ProductCjDropshippingRepository
    implements IRepository<Product, ProductCondDTO, ProductUpdateDTO>
{
    async get(id: string): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }

    async findByCond(cond: ProductCondDTO): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }

    async list(cond: ProductCondDTO, paging?: PagingDTO): Promise<Product[] | null> {
        throw new Error("Method not implemented.");
    }

    async insert(data: Product): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async update(id: string, data: Product): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    async delete(id: string, isHard: boolean): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
