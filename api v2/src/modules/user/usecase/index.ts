import jwt from "jsonwebtoken";
import { v7 } from "uuid";
import { IComparePassword, IHashPassword } from "../../../share/interface";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../../../share/model/errors";
import { EModelStatus, EUserRole } from "../../../share/model/enums";
import { PagingDTO } from "../../../share/model/paging";
import { IUserReposity, IUserUseCase } from "../interface";
import { User, UserSchema } from "../model";
import {
  UserCondDTO,
  UserCreateDTO,
  UserCreateSchema,
  UserLoginDTO,
  UserLoginSchema,
  UserPayloadDTO,
  UserUpdateDTO,
  UserUpdateSchema,
} from "../model/dto";
import {
  ErrLoginFail,
  ErrMissingToken,
  ErrUnAuthentication,
} from "../model/error";

export class UserUsecase implements IUserUseCase {
  constructor(
    private readonly repository: IUserReposity,
    private readonly passwordHasher: IHashPassword,
    private readonly comparePassword: IComparePassword
  ) {}

  async create(data: UserCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = UserCreateSchema.safeParse(data);

    if (!success) {
      throw new Error(error.message);
    }

    const isExisted = await this.repository.findByCond({
      email: parsedData.email,
    });

    if (isExisted) {
      throw ErrDataExisted;
    }

    let hashedPassword = this.passwordHasher.hash(parsedData.password);

    let newId = v7();
    const User: User = {
      id: newId,
      name: parsedData.name,
      email: parsedData.email,
      password: hashedPassword,
      role: EUserRole.USER,
      status: EModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.insert(User);

    return newId;
  }

  async update(id: string, data: UserUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = UserUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let User = await this.repository.get(id);

    if (!User || User.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async get(id: string): Promise<User | null> {
    let data = await this.repository.get(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return UserSchema.parse(data);
  }

  async list(cond: UserCondDTO, paging: PagingDTO): Promise<User[] | null> {
    let data = await this.repository.list(cond, paging);

    return data ? data.map((item) => UserSchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let User = await this.repository.get(id);
    if (!User || User.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }

  register(data: UserCreateDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async login(data: UserLoginDTO): Promise<string> {
    let { success, data: parsedData } = UserLoginSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    const user = await this.repository.findByCond({
      email: parsedData?.email,
      role: parsedData?.role,
    });

    if (!user) {
      throw ErrLoginFail;
    }

    const isValidPassword = this.comparePassword.compare(
      parsedData!.password,
      user.password
    );

    if (!isValidPassword) {
      throw ErrLoginFail;
    }

    const payload: UserPayloadDTO = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE ?? "24h";
    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";

    let accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenLife,
    });
    let refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshTokenLife,
    });

    return accessToken;
  }

  async verifyToken(token: string): Promise<UserPayloadDTO | null> {
    if (!token) {
      throw ErrMissingToken;
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
    let decoded = jwt.verify(token, accessTokenSecret) as UserPayloadDTO;

    if (!decoded) {
      throw ErrUnAuthentication;
    }

    return decoded;
  }
}
