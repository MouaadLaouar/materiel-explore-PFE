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

export class UpdateMaterialDto extends MaterialDto {
    @IsString()
    @IsNotEmpty()
    Id: string
}