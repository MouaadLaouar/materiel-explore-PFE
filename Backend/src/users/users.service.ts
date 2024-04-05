import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { Prisma } from '@prisma/client';

export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(Email: string) {
        return this.prisma.user.findUnique({
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
}
