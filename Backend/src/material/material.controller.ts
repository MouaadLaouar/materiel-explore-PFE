import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/Guards/auth.guard';
import { MaterialService } from './material.service';
import { MaterialDto, UpdateMaterialDto } from './dto/create.material.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFileName';
import { imageFileFilter } from 'src/utils/imageFileFilter';

@Controller('materials')
@UseGuards(AuthGuard)
export class MaterialController {

    constructor(private materialService: MaterialService) {}

    @Get('')
    GetAll() {
        return this.materialService.GetAll();
    }

    // FIXME: still working on this
    @Post('')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload',
            filename: editFileName
        }),
        fileFilter: imageFileFilter
    }))
    CreateMaterial(@Body() Data: MaterialDto, @UploadedFile() file: Express.Multer.File) {
        console.log('Data => ', Data);
        console.log('File => ', file.filename);
        return this.materialService.CreateMaterial(Data, file.filename);
        // return 'OK';
    }

    @Get(':id')
    GetById(@Param() params: any) {
        return this.materialService.GetById(params.id);
    }

    @Put(':id')
    UpdateMaterial(@Param() params: any, @Body() Data: UpdateMaterialDto) {
        return this.materialService.UpdateMaterial(Data);
    }

    @Delete(':id')
    DeleteMaterial(@Param() params: any) {
        return this.materialService.DeleteMaterial(params.id);
    }
}
