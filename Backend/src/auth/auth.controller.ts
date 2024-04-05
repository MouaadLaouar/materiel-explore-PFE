import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/Guards/auth.guard';
import { AuthSignInDto } from './dto/create.auth.dto';
import { CreateUserDto } from 'src/users/dto/create.user.dto';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    signIn(@Body() SignIn: AuthSignInDto) {
        return this.authService.signIn(SignIn.Email, SignIn.Password);
    }

    @Post('signUp')
    signUp(@Body() SignUp: CreateUserDto) {
        return this.authService.signUp(SignUp)
    }
}
