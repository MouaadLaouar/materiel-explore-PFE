import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MaterialModule } from './material/material.module';
import { DepartementModule } from './departement/departement.module';
import PictureController from './picture/picture.controller';
// import { ThrottlerModule } from '@nestjs/throttler';
// import { ThrottlerGuard } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        MaterialModule,
        DepartementModule,
        // ThrottlerModule.forRoot([
        //     {
        //         ttl: 60000,
        //         limit: 10,
        //     },
        // ]),
    ],
    controllers: [PictureController],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: ThrottlerGuard,
        // },
    ],
})
export class AppModule {}
