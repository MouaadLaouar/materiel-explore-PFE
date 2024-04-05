import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signIn(Email: string, pass: string) {
        const user = await this.usersService.findOne(Email);

        if(!user) {
            throw new NotFoundException();
        }

        if (user?.Password !== pass) {
            throw new UnauthorizedException();
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { Password, ...result } = user;

        return result
    }

    async signUp(User: CreateUserDto) {
        const user = await this.usersService.createUser(User)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { Password, ...result} = user;

        return result
    }
}
