import { Controller, Get, Param, Post, UseGuards, Body, Put, Delete } from '@nestjs/common';
import { AuthGuard } from 'src/Guards/auth.guard';
import { BorrowMaterialService } from './borrow-material.service';
import { BorrowMaterialDto, UpdateBorrowedMaterialDto } from './dto/borrow-material.dto';

@Controller('borrow-material')
@UseGuards(AuthGuard)
export class BorrowMaterialController {
    constructor(private borrowMaterialService: BorrowMaterialService) {}

    @Get('')
    GetAll() {
        return this.borrowMaterialService.GetAll();
    }

    @Get(':userID')
    getByUserID(@Param() param: any) {
        return this.borrowMaterialService.getByUserID(param.userID);
    }

    @Get(':materialID')
    getByMaterialID(@Param() param: any) {
        return this.borrowMaterialService.getByMaterialID(param.materialID);
    }

    @Get(':deptID')
    GetByDeptID(@Param() param: any) {
        return this.borrowMaterialService.GetByDeptID(param.deptID);
    }

    @Post('')
    AddBorrowedMaterial(@Body() data: BorrowMaterialDto) {
        return this.borrowMaterialService.AddBorrowedMaterial(data)
    }
 
    @Put(':id')
    UpdateBorrowedMaterial(@Param() param: any, @Body() data: UpdateBorrowedMaterialDto) {
        return this.borrowMaterialService.UpdateBorrowedMaterial(param.id, data);
    }

    @Delete(':id')
    DeleteBorrowedMaterial(@Param() param: any) {
        return this.borrowMaterialService.DeleteBorrowedMaterial(param.id);
    }
}
