import { Elasticsearch, IMessageListener } from "devchu-common";
import { Product, ProductUpdateDTO } from "../../model";

export class ProductCreatedListener implements IMessageListener<Product> {
    constructor(private readonly elasticClient: Elasticsearch) {}
    async handle(data: Product): Promise<void> {
        try {
            const { id, ...productData } = data;
            await this.elasticClient.index("products", id, productData);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export class ProductUpdatedListener implements IMessageListener<ProductUpdateDTO> {
    constructor(private readonly elasticClient: Elasticsearch) {}
    async handle(data: ProductUpdateDTO): Promise<void> {
        try {
            const { id, ...productData } = data;
            await this.elasticClient.update("products", id, productData);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export class ProductDeletedListener implements IMessageListener<string> {
    constructor(private readonly elasticClient: Elasticsearch) {}
    async handle(id: string): Promise<void> {
        try {
            await this.elasticClient.delete("products", id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
