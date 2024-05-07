import { Controller, Get, Param, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('picture')
export default class PictureController {
    @Get(':id')
    getFile(@Res() res: any, @Param() param: any) {
        const file = createReadStream(join(process.cwd(), 'upload', param.id));
        file.pipe(res);
    }
}

