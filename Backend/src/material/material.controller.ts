import { Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guards/auth.guard';

@Controller('materials')
@UseGuards(AuthGuard)
export class MaterialController {
    constructor() {}

    @Get('')
    GetAll() {
        return 'Get All';
    }

    @Post('')
    CreateMaterial() {
        return 'Post Create Material';
    }

    @Get(':id')
    GetById(@Param() params: any): string {
        return `Get By ID => ${params.id}`;
    }

    @Put(':id')
    UpdateMaterial(@Param() params: any): string {
        return `Update Material ID => ${params.id}`;
    }

    @Delete(':id')
    DeleteMaterial(@Param() params: any): string {
        return ` Delete Material With Id => ${params.id}`
    }
}