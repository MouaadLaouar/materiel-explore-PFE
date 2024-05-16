import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, RoleDto, UpdateUserDto } from './dto/create.user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async GetAll() {
        return await this.prisma.user.findMany({
            select: {
                ID: true,
                FirstName: true,
                LastName: true,
                Email: true,
                Phone: true,
                Role: true,
                CreatedAt: true,
            },
        });
    }

    async GetUsers() {
        return this.prisma.user.findMany({
            where: {
                Role: 'USER',
            },
            select: {
                ID: true,
                FirstName: true,
                LastName: true,
                Email: true,
                Phone: true,
                Role: true,
                CreatedAt: true,
            },
        });
    }

    async GetAdmin() {
        return this.prisma.user.findMany({
            where: {
                Role: 'ADMIN',
                Departement: {
                    none: {},
                },
            },
            select: {
                ID: true,
                FirstName: true,
                LastName: true,
                Email: true,
                Phone: true,
                Role: true,
                CreatedAt: true,
            },
        });
    }

    async GetUsersAndAdmin() {
        return this.prisma.user.findMany({
            where: {
                Role: 'USER' || 'ADMIN',
            },
            select: {
                ID: true,
                FirstName: true,
                LastName: true,
                Email: true,
                Phone: true,
                Role: true,
                CreatedAt: true,
            },
        });
    }

    async findOne(Email: string) {
        return await this.prisma.user.findUnique({
            where: {
                Email: Email,
            },
        });
    }

    async createUser(User: CreateUserDto) {
        try {
            return await this.prisma.user.create({
                data: {
                    FirstName: User.FirstName,
                    LastName: User.LastName,
                    Email: User.Email,
                    Password: User.Password,
                    Phone: User.Phone,
                    Role: User.Role,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    // Unique constraint violation
                    throw new BadRequestException('Email already exists');
                } else {
                    throw new InternalServerErrorException('Error creating user');
                }
            } else {
                throw new InternalServerErrorException('Unexpected error');
            }
        }
    }

    async UpdateUser(Data: UpdateUserDto) {
        // TODO: Need to be rethink
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(Data.Password, saltOrRounds);
        try {
            return this.prisma.user.update({
                where: {
                    ID: Data.Id,
                },
                data: {
                    FirstName: Data.FirstName,
                    LastName: Data.LastName,
                    Email: Data.Email,
                    Phone: Data.Phone,
                    Password: hashedPassword,
                    Role: Data.Role,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    // Unique constraint violation
                    throw new BadRequestException('Email already exists');
                } else {
                    throw new InternalServerErrorException('Error creating user');
                }
            } else {
                throw new InternalServerErrorException('Unexpected error');
            }
        }
    }

    async GetUserById(ID: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                ID: ID,
            },
            select: {
                ID: true,
                FirstName: true,
                LastName: true,
                Email: true,
                Phone: true,
                Role: true,
                CreatedAt: true,
                Password: true,
                Departement: true,
            },
        });

        if (!user) {
            throw new BadRequestException();
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { Password, ...result } = user;

        return result;
    }

    async UpdateRole(ID: string, Data: RoleDto) {
        return await this.prisma.user.update({
            where: {
                ID: ID,
            },
            data: {
                Role: Data.Role,
            },
        });
    }
}
