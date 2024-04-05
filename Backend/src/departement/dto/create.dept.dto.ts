import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class DeptDto {
    @IsString()
    @IsNotEmpty()
    Name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    Email: string

    @IsString()
    @IsNotEmpty()
    Phone: string

    @IsString()
    @IsNotEmpty()
    Admin: string
}

export class UpdateDeptDto extends DeptDto {
    @IsNotEmpty()
    @IsString()
    Id: string
}