import { Module } from '@nestjs/common';
import { BorrowMaterialController } from './borrow-material.controller';
import { BorrowMaterialService } from './borrow-material.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BorrowMaterialController],
  providers: [BorrowMaterialService, PrismaService],
})
export class BorrowMaterialModule {}
