import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guards/auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/create.user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('')
    GetAll() {
        return this.usersService.GetAll();
    }

    @Get(':id')
    GetUserById(@Param() params: any) {
        return this.usersService.GetUserById(params.id)
    }

    @Put(':id')
    UpdateUser(@Param() pramas: any, @Body() Data: UpdateUserDto) {
        return this.usersService.UpdateUser(Data);
    }
}
