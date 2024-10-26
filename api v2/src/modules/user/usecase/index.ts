import { v7 } from "uuid";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../../../share/model/baseError";
import { User, UserRole, UserSchema } from "../model";
import {
  UserCondDTO,
  UserCreateDTO,
  UserCreateSchema,
  UserUpdateDTO,
  UserUpdateSchema,
} from "../model/dto";
import { ModelStatus } from "../../../share/model/baseModel";
import { PagingDTO } from "../../../share/model/paging";
import { IUserReposity, IUserUseCase } from "../interface";
import { IHashPassword } from "../../../share/interface";

export class UserUsecase implements IUserUseCase {
  constructor(
    private readonly repository: IUserReposity,
    private readonly passwordHasher: IHashPassword
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
      role: UserRole.USER,
      status: ModelStatus.ACTIVE,
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

    if (!User || User.status === ModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }

  async get(id: string): Promise<User | null> {
    let data = await this.repository.get(id);

    if (!data || data.status === ModelStatus.DELETED) {
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
    if (!User || User.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
