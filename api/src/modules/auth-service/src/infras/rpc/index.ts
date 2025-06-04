// import axios from "axios";
// import { IRefreshTokenQueryRepository } from "../../interface";
// import { RefreshTokenCondDTO } from "../../model/dto";
// import { RefreshToken, RefreshTokenSchema } from "../../model";



// export class RPCRefreshTokenRepository implements IRefreshTokenQueryRepository {
//   constructor(private readonly baseURL: string) { }
//   async create(cond: RefreshTokenCondDTO): Promise<RefreshToken> {
//     const { data } = await axios.post(`${this.baseURL}/refresh-token`, { data: cond });
//     const token = RefreshTokenSchema.parse(data.data);

//     return token;
//   }

//   async refresh(token: string): Promise<RefreshToken> {
//     const { data } = await axios.post(`${this.baseURL}/refresh-token/refresh`, { data: token });
//     const response = RefreshTokenSchema.parse(data.data);

//     return response;
//   }
// }