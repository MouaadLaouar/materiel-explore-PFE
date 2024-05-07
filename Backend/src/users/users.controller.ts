import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guards/auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto, RoleDto } from './dto/create.user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get('')
    GetAll() {
        return this.usersService.GetAll();
    }

    @Get('phd')
    GetUsers() {
        return this.usersService.GetUsers();
    }

    @Get('admin')
    GetAdmin() {
        return this.usersService.GetAdmin();
    }

    @Get('phdandadmin')
    GetUsersAndAdmin() {
        return this.usersService.GetUsersAndAdmin();
    }

    @Get(':id')
    GetUserById(@Param() params: any) {
        return this.usersService.GetUserById(params.id)
    }

    @Put(':id')
    UpdateUser(@Param() params: any, @Body() Data: UpdateUserDto) {
        return this.usersService.UpdateUser(Data);
    }

    @Put('UpdateRole/:id')
    UpdateRole(@Param() params: any, @Body() Data: RoleDto) {
        return this.UpdateRole(params.id, Data)
    }
}
