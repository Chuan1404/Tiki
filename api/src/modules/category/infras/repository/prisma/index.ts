import prisma from "../../../../../share/component/prisma";
import { EModelStatus } from "../../../../../share/model/enums";
import { PagingDTO } from "../../../../../share/model/paging";
import { convertQuery } from "../../../../../share/utils";
import { ICategoryRepository } from "../../../interface";
import { Category, CategorySchema } from "../../../model";
import {
    CategoryCondDTO,
    CategoryCreateDTO,
    CategoryUpdateDTO,
} from "../../../model/dto";

export default class CategoryPrismaRepository implements ICategoryRepository {
    async get(id: string): Promise<Category | null> {
        const data = await prisma.category.findFirst({
            where: {
                id,
            },
        });
        if (!data) {
            return null;
        }

        return CategorySchema.parse(data);
    }

    async findByCond(cond: CategoryCondDTO): Promise<Category | null> {
        const data = await prisma.category.findFirst(cond as any);
        if (!data) {
            return null;
        }

        return CategorySchema.parse(data);
    }

    async list(
        cond: CategoryCondDTO,
        paging?: PagingDTO
    ): Promise<Category[] | null> {
        const condSQL = convertQuery(cond);
        condSQL.status = { not: EModelStatus.DELETED };

        const rows = await prisma.category.findMany({
            where: condSQL,
            take: paging?.limit, // Limit the number of results
            skip: paging ? (paging.page - 1) * paging.limit : undefined, // Skip for pagination
        });

        return rows as Category[];
    }

    async insert(data: CategoryCreateDTO): Promise<boolean> {
        await prisma.category.create(data as any);

        return true;
    }

    async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
        await prisma.category.update({
            where: { id },
            data,
        });
        return true;
    }

    async delete(id: string, isHard: boolean): Promise<boolean> {
        if (isHard) {
            await prisma.category.delete({ where: { id } });
        } else {
            await prisma.category.update({
                where: { id },
                data: { status: EModelStatus.DELETED },
            });
        }

        return true;
    }
}
