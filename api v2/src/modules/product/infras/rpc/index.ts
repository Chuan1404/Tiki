import axios from "axios";
import { IBrandQueryRepository, ICategoryQueryRepository } from "../../interface";
import { Brand, BrandSchema, Category, CategorySchema } from "../../model";

export class RPCCategoryRepository implements ICategoryQueryRepository {
  constructor(private readonly baseURL: string) {}

  async get(id: string): Promise<Category | null> {
    try {
      const { data } = await axios.get(`${this.baseURL}/categories/${id}`);
      const category = CategorySchema.parse(data.data);

      return category;
    } catch (error) {
      return null;
    }
  }
}

export class RPCBrandRepository implements IBrandQueryRepository {
  constructor(private readonly baseURL: string) {}
  
  async get(id: string): Promise<Brand | null> {
    try {
      const { data } = await axios.get(`${this.baseURL}/brands/${id}`);
      const brand = BrandSchema.parse(data.data);

      return brand;
    } catch (error) {
      return null;
    }
  }
  
}