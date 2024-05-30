import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MaterialModule } from './material/material.module';
import { DepartementModule } from './departement/departement.module';
import PictureController from './picture/picture.controller';
import { BorrowMaterialModule } from './borrow-material/borrow-material.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        MaterialModule,
        DepartementModule,
        BorrowMaterialModule,
    ],
    controllers: [PictureController],
    providers: [],
})
export class AppModule {}
