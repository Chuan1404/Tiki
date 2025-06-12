import axios from "axios";
import { IBrandQueryRepository, ICategoryQueryRepository } from "../../interface";
import { Brand, BrandSchema, Category, CategorySchema } from "../../model";
import { BrandCondDTO, CategoryCondDTO } from "../../model/dto";

export class RPCCategoryRepository implements ICategoryQueryRepository {
    constructor(private readonly baseURL: string) {}
    async get(id: string): Promise<Category | null> {
        try {
            const { data } = await axios.get(`${this.baseURL}/category/${id}`);
            const category = CategorySchema.parse(data.data);

            return category;
        } catch (error) {
            return null;
        }
    }

    async list(cond: CategoryCondDTO): Promise<Category[]> {
        try {
            const { data } = await axios.get(`${this.baseURL}/rpc/category`, { data: cond });
            const categories = data.data.map((item: any) => CategorySchema.parse(item));

            return categories;
        } catch (error) {
            return [];
        }
    }
}

export class RPCBrandRepository implements IBrandQueryRepository {
    constructor(private readonly baseURL: string) {}

    async get(id: string): Promise<Brand | null> {
        try {
            const { data } = await axios.get(`${this.baseURL}/brand/${id}`);
            const brand = BrandSchema.parse(data.data);

            return brand;
        } catch (error) {
            return null;
        }
    }

    async list(cond: BrandCondDTO): Promise<Brand[]> {
        try {
            const { data } = await axios.get(`${this.baseURL}/rpc/brand`, { data: cond });
            const brands = data.data.map((item: any) => BrandSchema.parse(item));

            return brands;
        } catch (error) {
            return [];
        }
    }
}
