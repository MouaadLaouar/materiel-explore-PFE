import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
@Module({
    providers: [MaterialService, PrismaService],
    controllers: [MaterialController],
    imports: [
        MulterModule.register({
            dest: './upload',
        }),
    ],
})
export class MaterialModule {}
