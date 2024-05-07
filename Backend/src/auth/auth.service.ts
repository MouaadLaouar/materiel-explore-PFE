import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signIn(Email: string, pass: string) {
        const user = await this.usersService.findOne(Email);

        const isMatch = await bcrypt.compare(pass, user?.Password);

        if (!user) {
            throw new NotFoundException();
        }

        if (!isMatch) {
            throw new UnauthorizedException();
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { Password, ...result } = user;

        return result;
    }

    async signUp(User: CreateUserDto) {
        const saltOrRounds = 10;
        const user = User;
        user.Password = await bcrypt.hash(User.Password, saltOrRounds);
        const userRes = await this.usersService.createUser(user);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { Password, ...result } = userRes;

        return result;
    }
}
