import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guards/auth.guard';
import { DepartementService } from './departement.service';
import { DeptDto, UpdateDeptDto } from './dto/create.dept.dto';

@Controller('departement')
@UseGuards(AuthGuard)
export class DepartementController {
    constructor(private deptService: DepartementService) {}

    @Get('')
    GetAll() {
        return this.deptService.GetAll()
    }

    @Post('')
    CreateDept(@Body() Data: DeptDto) {
        return this.deptService.CreateDept(Data)
    }

    @Get(':id')
    GetDeptById(@Param() params: any) {
        return this.deptService.GetDeptById(params.id)
    }

    @Put(':id')
    UpdateDeptById(@Body() Data: UpdateDeptDto) {
        return this.deptService.UpdateDeptById(Data)
    }

    @Delete(':id')
    DeleteById(@Param() paramas: any) {
        return this.deptService.DeleteById(paramas.id)
    }
}
