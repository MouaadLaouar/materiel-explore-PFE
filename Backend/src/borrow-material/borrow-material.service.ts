import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BorrowMaterialDto, UpdateBorrowedMaterialDto, UpdateStatusDto } from './dto/borrow-material.dto';

@Injectable()
export class BorrowMaterialService {
    constructor(private prisma: PrismaService) {}

    async GetAll() {
        return await this.prisma.borrowedMaterial.findMany({
            orderBy: {
                CreatedAt: 'asc',
            },
            include: {
                User: {
                    select: {
                        FirstName: true,
                        LastName: true,
                    },
                },
                Material: {
                    select: {
                        Name: true,
                        Departement: {
                            select: {
                                Name: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async getByUserID(ID: string) {
        return await this.prisma.borrowedMaterial.findMany({
            where: {
                userId: ID,
            },
            orderBy: {
                CreatedAt: 'asc',
            },
            include: {
                User: {
                    select: {
                        FirstName: true,
                        LastName: true,
                    },
                },
                Material: {
                    select: {
                        Name: true,
                        Departement: {
                            select: {
                                Name: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async getByMaterialID(ID: string) {
        return await this.prisma.borrowedMaterial.findMany({
            where: {
                MaterialId: ID,
            },
            orderBy: {
                CreatedAt: 'desc',
            },
            include: {
                User: {
                    select: {
                        FirstName: true,
                        LastName: true,
                    },
                },
                Material: {
                    select: {
                        Name: true,
                        Departement: {
                            select: {
                                Name: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async GetByDeptID(ID: string) {
        return await this.prisma.borrowedMaterial.findMany({
            where: {
                Material: {
                    DepartementId: ID,
                },
            },
            orderBy: {
                CreatedAt: 'asc',
            },
            include: {
                User: {
                    select: {
                        FirstName: true,
                        LastName: true,
                    },
                },
                Material: {
                    select: {
                        Name: true,
                        Departement: {
                            select: {
                                Name: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async AddBorrowedMaterial(data: BorrowMaterialDto) {
        return await this.prisma.borrowedMaterial.create({
            data: {
                userId: data.UserId,
                MaterialId: data.MaterialId,
                DueDate: data.DueDate,
            },
        });
    }

    async UpdateBorrowedMaterial(ID: string, data: UpdateBorrowedMaterialDto) {
        return await this.prisma.borrowedMaterial.update({
            where: {
                ID: ID,
            },
            data: {
                Returned: data.Returned,
                DueDate: data.DueDate,
            },
        });
    }

    async UpdateStatus(ID: string, data: UpdateStatusDto) {
        return await this.prisma.borrowedMaterial.update({
            where: {
                ID: ID,
            },
            data: {
                BMStatus: data.BMStatus,
            },
        });
    }

    async DeleteBorrowedMaterial(ID: string) {
        return await this.prisma.borrowedMaterial.delete({
            where: {
                ID: ID,
            },
        });
    }
}
