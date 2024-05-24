import { BMStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class BorrowMaterialDto {
    @IsNotEmpty()
    @IsString()
    MaterialId: string;

    @IsNotEmpty()
    @IsString()
    UserId: string;

    @IsNotEmpty()
    @IsString()
    DueDate: string;
}

export class UpdateBorrowedMaterialDto {
    @IsNotEmpty()
    @IsString()
    Id: string;

    @IsBoolean()
    Returned: boolean;

    @IsNotEmpty()
    @IsString()
    DueDate: string;
}

export class UpdateStatusDto {
    @IsEnum(BMStatus)
    @IsNotEmpty()
    BMStatus: BMStatus;
}
