import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/create.user.dto';
import { Prisma } from '@prisma/client';

export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async GetAll() {
        return await this.prisma.user.findMany()
    }

    async findOne(Email: string) {
        return await this.prisma.user.findUnique({
            where: {
                Email: Email
            }
        })
    }

    async createUser(User:CreateUserDto) {
        try {
            return await this.prisma.user.create({
                data: {
                    FirstName: User.FirstName,
                    LastName: User.LastName,
                    Email: User.Email,
                    Password: User.Password,
                    Phone: User.Phone,
                    Role: User.Role
                }
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { // Unique constraint violation
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
        try {
            return this.prisma.user.update({
                where: {
                    ID: Data.Id
                },
                data: {
                    FirstName: Data.FirstName,
                    LastName: Data.LastName,
                    Email: Data.Email,
                    Phone: Data.Phone,
                    Password: Data.Password,
                    Role: Data.Role
                }
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { // Unique constraint violation
                  throw new BadRequestException('Email already exists');
                } else {
                  throw new InternalServerErrorException('Error creating user');
                }
              } else {
                throw new InternalServerErrorException('Unexpected error');
              }
        }
    }
}
