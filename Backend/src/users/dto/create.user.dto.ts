import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    FirstName: string

    @IsNotEmpty()
    @IsString()
    LastName: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    Email: string

    @IsNotEmpty()
    @IsString()
    Phone: string

    @IsNotEmpty()
    @IsString()
    Password: string

    @IsNotEmpty()
    @IsString()
    Role: "USER" | "ADMIN"
}