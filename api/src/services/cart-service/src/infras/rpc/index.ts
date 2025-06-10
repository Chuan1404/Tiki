import axios from "axios";
import { IProductQueryRepository } from "../../interface";
import { Product, ProductSchema } from "../../model";
import { ProductCondDTO } from "../../model/dto";

export class RPCProductRepository implements IProductQueryRepository {
  constructor(private readonly baseURL: string) {}
  async get(id: string): Promise<Product | null> {
    try {
      const { data } = await axios.get(`${this.baseURL}/products/${id}`);
      const product = ProductSchema.parse(data.data);

      return product;
    } catch (error) {
      return null;
    }
  }

  async list(cond: ProductCondDTO): Promise<Product[]> {
    try {
      const { data } = await axios.get(`${this.baseURL}/rpc/products`, {
        data: cond,
      });
      const products = data.data.map((item: any) =>
        ProductSchema.parse(item)
      );

      return products;
    } catch (error) {
      return [];
    }
  }
}