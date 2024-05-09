import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MaterialDto, UpdateMaterialDto } from './dto/create.material.dto';

@Injectable()
export class MaterialService {
    constructor(private prisma: PrismaService) {}

    async GetAll() {
        try {
            return await this.prisma.material.findMany({
                include: {
                    Departement: {
                        select: {
                            Name: true,
                        },
                    },
                    Picture: true,
                },
            });
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(error),
                description: 'Some error description',
            });
        }
    }

    async CreateMaterial(Material: MaterialDto, PictureName: string) {
        try {
            const material = await this.prisma.material.create({
                data: {
                    Name: Material.Name,
                    Description: Material.Description,
                    Departement: {
                        connect: { ID: Material.Departement },
                    },
                },
            });

            const picture = await this.prisma.picture.create({
                data: {
                    Name: PictureName,
                    MaterialID: material.ID,
                },
            });

            return {
                material,
                picture,
            };
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
                include: {
                    Picture: true,
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
    async GetByDeptId(Id: string) {
        try {
            return await this.prisma.material.findMany({
                where: {
                    DepartementId: Id,
                },
                include: {
                    Picture: {
                        select: {
                            ID: true,
                            Name: true,
                        },
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
}
