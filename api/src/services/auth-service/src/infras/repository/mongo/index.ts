import { MongooseRepository } from "devchu-common";
import { Token, TokenCondDTO, TokenUpdateDTO } from "../../../model/dto";

export default class TokenMongooseRepository extends MongooseRepository<
    Token,
    TokenCondDTO,
    TokenUpdateDTO
> {
    async get(token: string): Promise<Token | null> {
        let data = await this.model.findOne({ token });
        if (!data) {
            return null;
        }

        return data;
    }
}
