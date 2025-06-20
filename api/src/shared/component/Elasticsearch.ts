import { Client } from "@elastic/elasticsearch";
import { PagingDTO } from "../model";

export class Elasticsearch {
    private client!: Client;
    constructor(private readonly url: string) {
        this.url = url;
    }

    async connect(): Promise<void> {
        try {
            this.client = new Client({ node: this.url });
            console.log(`Elasticsearch connected successfully - ${this.url}`);
        } catch (err) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            await this.connect();
        }
    }

    async search(index: string, query: any, paging?: PagingDTO): Promise<any> {
        if (!this.client) {
            return Promise.reject(new Error("Elasticsearch client is not connected"));
        }

        if (Object.keys(query).length === 0) {
            query.match_all = {};
        }

        const searchParams: any = {
            index: index,
            query: query,
        };

        if (!!paging) {
            const { page, limit } = paging;
            searchParams.from = (page - 1) * limit;
            searchParams.size = limit;
        }

        try {
            const res = await this.client.search(searchParams);
            return res;
        } catch (error) {
            return {
                hits: {
                    total: 0,
                    hits: [],
                },
            };
        }
    }

    async index(index: string, id: string, document: any): Promise<void> {
        if (!this.client) {
            return Promise.reject(new Error("Elasticsearch client is not connected"));
        }

        await this.client.index({
            index: index,
            id,
            document: {
                id,
                ...document,
            },
        });
    }

    async update(index: string, id: string, document: any): Promise<void> {
        if (!this.client) {
            return Promise.reject(new Error("Elasticsearch client is not connected"));
        }

        await this.client.update({ index: "products", id, doc: document });
    }

    async delete(index: string, id: string): Promise<void> {
        if (!this.client) {
            return Promise.reject(new Error("Elasticsearch client is not connected"));
        }

        await this.client.delete({ index, id });
    }
}
