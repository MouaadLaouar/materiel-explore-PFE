import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';

@Module({
  providers: [DepartementService],
  controllers: [DepartementController]
})
export class DepartementModule {}
