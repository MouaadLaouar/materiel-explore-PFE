import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DeptDto, UpdateDeptDto } from './dto/create.dept.dto';

@Injectable()
export class DepartementService {
    constructor(private prisma: PrismaClient) {}

    async GetAll() {
        return await this.prisma.departement.findMany();
    }

    async CreateDept(Data: DeptDto) {
        try {
            return await this.prisma.departement.create({
                data: {
                    Name: Data.Name,
                    Phone: Data.Phone,
                    Email: Data.Email,
                    Admin: {
                        connect: {
                            ID: Data.Admin,
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

    async GetDeptById(ID: string) {
        try {
            return await this.prisma.departement.findUnique({
                where: {
                    ID: ID,
                },
            });
        } catch (error) {
            throw new BadRequestException('Something bad happened', {
                cause: new Error(error),
                description: 'Some error description',
            });
        }
    }

    async UpdateDeptById(Data: UpdateDeptDto) {
        try {
            return await this.prisma.departement.update({
                where: {
                    ID: Data.Id,
                },
                data: {
                    Name: Data.Name,
                    Phone: Data.Phone,
                    Email: Data.Email,
                    Admin: {
                        connect: {
                            ID: Data.Admin,
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

    async DeleteById(ID: string) {
        try {
            return await this.prisma.departement.delete({
                where: {
                    ID: ID,
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
