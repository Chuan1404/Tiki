import bcrypt from "bcrypt";
import { IComparePassword, IHashPassword } from "devchu-common";

export class HashPassword implements IHashPassword {
  hash(rawPassword: string): string {
    return bcrypt.hashSync(rawPassword, 10);
  }
}

export class ComparePassword implements IComparePassword {
  compare(rawPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, hashedPassword);
  }
}
