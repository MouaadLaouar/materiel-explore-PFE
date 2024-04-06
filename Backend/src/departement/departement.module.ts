import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [DepartementService, PrismaService],
  controllers: [DepartementController]
})
export class DepartementModule {}
