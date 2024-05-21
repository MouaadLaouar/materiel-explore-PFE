import { Status } from "@prisma/client";
import { IsString, IsNotEmpty, IsEnum } from "class-validator";

export class MaterialDto {
    @IsString()
    @IsNotEmpty()
    Name: string

    @IsString()
    @IsNotEmpty()
    Description: string

    @IsString()
    @IsNotEmpty()
    Departement: string
}

export class UpdateMaterialDto extends MaterialDto {
    @IsString()
    @IsNotEmpty()
    Id: string;

    @IsEnum(Status)
    @IsNotEmpty()
    Status: Status;
}