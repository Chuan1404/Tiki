export interface IHashPassword {
    hash(rawPassword: string): string;
}

export interface IComparePassword {
    compare(rawPassword: string, hashedPassword: string): boolean;
}
