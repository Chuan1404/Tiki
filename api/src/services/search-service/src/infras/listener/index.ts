import { Elasticsearch, IMessageListener } from "devchu-common";
import { Product } from "../../model";

export class ProductCreatedListener implements IMessageListener<Product> {
    constructor(private readonly elasticClient: Elasticsearch) {}
    async handle(data: Product): Promise<void> {
        try {
            const { id, ...productData } = data;
            await this.elasticClient.index("products", id, productData);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}
