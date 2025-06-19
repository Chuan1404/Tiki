import { Client } from "@elastic/elasticsearch";

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

    async search(index: string, query: any): Promise<any> {
        if (!this.client) {
            return Promise.reject(new Error("Elasticsearch client is not connected"));
        }
        const res = await this.client.search({
            index: index,
            query: {
                match: query,
            },
        });

        return res;
    }

    async index(index: string, id: string, document: any): Promise<void> {
        await this.client.index({
            index: index,
            id,
            document,
        });
    }
}
