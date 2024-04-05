import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MaterialDto, UpdateMaterialDto } from './dto/create.material.dto';

@Injectable()
export class MaterialService {
    constructor(private prisma: PrismaClient) {}

    async GetAll() {
        try {
            return await this.prisma.material.findMany();
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(error),
                description: 'Some error description',
            });
        }
    }

    async CreateMaterial(Material: MaterialDto) {
        try {
            return await this.prisma.material.create({
                data: {
                    Name: Material.Name,
                    Description: Material.Description,
                    Departement: {
                        connect: { ID: Material.Departement },
                    },
                },
            });
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(error),
                description: 'Some error description',
            });
        }
    }

    async GetById(Id: string) {
        try {
            return await this.prisma.material.findUnique({
                where: {
                    ID: Id,
                },
            });
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(error),
                description: 'Some error description',
            });
        }
    }

    async UpdateMaterial(Data: UpdateMaterialDto) {
        try {
            return this.prisma.material.update({
                where: {
                    ID: Data.Id,
                },
                data: {
                    Name: Data.Name,
                    Description: Data.Description,
                    Departement: {
                        connect: { ID: Data.Departement },
                    },
                },
            });
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(error),
                description: 'Some error description',
            });
        }
    }

    async DeleteMaterial(Id: string) {
        try {
            return await this.prisma.material.delete({
                where: {
                    ID: Id,
                },
            });
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(error),
                description: 'Some error description',
            });
        }
    }
}
