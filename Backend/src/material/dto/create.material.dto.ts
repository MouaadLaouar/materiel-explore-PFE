import { IsString, IsNotEmpty } from "class-validator";

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

export class UpdateMaterialDto {
    @IsString()
    @IsNotEmpty()
    Id: string

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