import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guards/auth.guard';
import { MaterialService } from './material.service';
import { MaterialDto, UpdateMaterialDto } from './dto/create.material.dto';

@Controller('materials')
@UseGuards(AuthGuard)
export class MaterialController {
    constructor(private materialService: MaterialService) {}

    @Get('')
    GetAll() {
        return this.materialService.GetAll();
    }

    @Post('')
    CreateMaterial(@Body() Data: MaterialDto) {
        return this.materialService.CreateMaterial(Data);
    }

    @Get(':id')
    GetById(@Param() params: any) {
        return this.materialService.GetById(params.id);
    }

    @Put(':id')
    UpdateMaterial(@Param() params: any, @Body() Data:UpdateMaterialDto) {
        return this.materialService.UpdateMaterial(Data);
    }

    @Delete(':id')
    DeleteMaterial(@Param() params: any) {
        return this.materialService.DeleteMaterial(params.id)
    }
}